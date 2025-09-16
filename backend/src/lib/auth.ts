/**
 * backend/src/lib/auth.ts
 *
 * WebAuthn passkey helpers (register/login + verify) adapted to the project's Prisma schema.
 * Uses getPrisma() from ./prisma and base64 helpers from ./crypto.
 *
 * Notes:
 * - This module avoids strict typing for library return shapes to remain resilient against
 *   version mismatches. Route handlers are responsible for session creation and cookie flags.
 * - Make sure environment variables RP_ID, RP_NAME and NEXTAUTH_URL are set in production.
 */
import {
  generateRegistrationOptions,
  verifyRegistrationResponse,
  generateAuthenticationOptions,
  verifyAuthenticationResponse,
} from '@simplewebauthn/server';
import { getPrisma } from './prisma';
import { base64ToBuffer, bufferToBase64 } from './crypto';

const RP_NAME = process.env.RP_NAME || 'Legaci';
const RP_ID = process.env.RP_ID || 'localhost';
const ORIGIN = process.env.NEXTAUTH_URL || 'http://localhost:3000';

export async function registerPasskey(email: string) {
  const prisma = await getPrisma();
  const user = await prisma.users.findUnique({
    where: { email },
  });

  if (!user) throw new Error('User not found');

  const existingCredentials = await prisma.credentials.findMany({
    where: { user_id: user.id },
  });

  const options = generateRegistrationOptions({
    rpName: RP_NAME,
    rpID: RP_ID,
    userID: user.id,
    userName: email,
    attestationType: 'none',
    excludeCredentials: existingCredentials.map((cred: any) => {
      const id = cred.webauthn_credential_id ? base64ToBuffer(cred.webauthn_credential_id) : undefined;
      return {
        id,
        type: 'public-key',
        transports: [] as string[],
      };
    }),
  });

  return options;
}

/**
 * Verify registration response and persist credential record.
 * We accept the full client response (which may include rawId) and the original expected challenge.
 */
export async function verifyPasskeyRegistration(email: string, registrationResponse: any, expectedChallenge: string) {
  const prisma = await getPrisma();
  const user = await prisma.users.findUnique({ where: { email } });
  if (!user) throw new Error('User not found');

  // Use any typing - library types may vary between versions
  const { verified, registrationInfo }: any = await verifyRegistrationResponse({
    response: registrationResponse as any,
    expectedChallenge,
    expectedOrigin: ORIGIN,
    expectedRPID: RP_ID,
  } as any);

  if (!verified) {
    return { success: false, error: 'Failed to verify registration' };
  }

  // Determine credential id (prefer rawId from client response if present)
  let credentialIdBase64: string | undefined = undefined;
  try {
    if (registrationResponse?.rawId) {
      // rawId may be ArrayBuffer encoded as base64-url; convert if needed
      if (typeof registrationResponse.rawId === 'string') {
        credentialIdBase64 = registrationResponse.rawId;
      } else if (registrationResponse.rawId instanceof ArrayBuffer) {
        credentialIdBase64 = bufferToBase64(Buffer.from(registrationResponse.rawId));
      }
    } else if (registrationInfo?.credentialID) {
      credentialIdBase64 = bufferToBase64(Buffer.from(registrationInfo.credentialID));
    } else if (registrationInfo?.credential?.rawId) {
      credentialIdBase64 = bufferToBase64(Buffer.from(registrationInfo.credential.rawId));
    }
  } catch (e) {
    // best-effort; continue with undefined id fallback
    console.warn('Could not canonicalize credential id', e);
  }

  const publicKeyStr = (() => {
    try {
      if (registrationInfo?.credentialPublicKey) {
        // credentialPublicKey may be Buffer/ArrayBuffer; store base64 to keep a reversible form
        return typeof registrationInfo.credentialPublicKey === 'string'
          ? registrationInfo.credentialPublicKey
          : bufferToBase64(Buffer.from(registrationInfo.credentialPublicKey));
      }
    } catch (e) {
      // fall through
    }
    return '';
  })();

  const counter = (registrationInfo && typeof registrationInfo.counter === 'number') ? registrationInfo.counter : 0;

  await prisma.credentials.create({
    data: {
      user_id: user.id,
      webauthn_credential_id: credentialIdBase64 || '',
      public_key: publicKeyStr || '',
      sign_count: counter,
    },
  });

  return { success: true };
}

export async function loginPasskey(email: string) {
  const prisma = await getPrisma();
  const user = await prisma.users.findUnique({ where: { email } });
  if (!user) throw new Error('User not found');

  const existingCredentials = await prisma.credentials.findMany({
    where: { user_id: user.id },
  });

  const options = generateAuthenticationOptions({
    rpID: RP_ID,
    allowCredentials: existingCredentials.map((cred: any) => ({
      id: base64ToBuffer(cred.webauthn_credential_id || ''),
      type: 'public-key',
      transports: [] as string[],
    })),
    userVerification: 'preferred',
  });

  return options;
}

/**
 * Verify an authentication (login) response.
 * Returns { success: boolean, error?: string }.
 */
export async function verifyPasskeyLogin(email: string, authenticationResponse: any, expectedChallenge: string) {
  const prisma = await getPrisma();
  const user = await prisma.users.findUnique({ where: { email } });
  if (!user) throw new Error('User not found');

  // Normalize the incoming credential id to standard base64 to match stored DB records
  let normalizedCredIdB64 = '';
  try {
    const raw = authenticationResponse?.id || authenticationResponse?.rawId || '';
    if (typeof raw === 'string') {
      // Accept base64 or base64url and canonicalize to standard base64
      const buf = base64ToBuffer(raw);
      normalizedCredIdB64 = bufferToBase64(Buffer.from(buf));
    } else if (raw && (raw as any).byteLength) {
      normalizedCredIdB64 = bufferToBase64(Buffer.from(raw as ArrayBuffer));
    }
  } catch {
    // best-effort; keep empty and rely on DB search below to fail fast
  }

  const credential = await prisma.credentials.findFirst({
    where: {
      user_id: user.id,
      ...(normalizedCredIdB64 ? { webauthn_credential_id: normalizedCredIdB64 } : {}),
    },
  });

  if (!credential) throw new Error('Credential not found');

  // verifyAuthenticationResponse typing can vary; cast to any to avoid TS mismatch
  const verifyResult: any = await verifyAuthenticationResponse({
    response: authenticationResponse as any,
    expectedChallenge,
    expectedOrigin: ORIGIN,
    expectedRPID: RP_ID,
    // Provide raw forms from DB (public key stored as base64)
    authenticator: {
      credentialPublicKey: base64ToBuffer(credential.public_key || ''),
      credentialID: base64ToBuffer(credential.webauthn_credential_id || ''),
      counter: Number(credential.sign_count || 0),
    } as any,
  } as any).catch((err: any) => {
    console.error('verifyAuthenticationResponse error', err);
    return { verified: false };
  });

  if (!verifyResult || !verifyResult.verified) {
    return { success: false, error: 'Failed to verify authentication' };
  }

  const newCounter = verifyResult.authenticationInfo?.newCounter ?? credential.sign_count ?? 0;

  await prisma.credentials.update({
    where: { id: credential.id },
    data: { sign_count: Number(newCounter) },
  });

  return { success: true };
}