// backend/src/app/api/auth/register-passkey/verify/route.ts
import { verifyRegistrationResponse } from '@simplewebauthn/server';
import { getPrisma } from '../../../../../lib/prisma';

export async function POST(request: Request) {
  try {
    const prisma = await getPrisma();
    const {
      email,
      id,
      rawId,
      response,
      type,
      authenticatorAttachment,
      clientDataJSON,
      attestationObject,
      challenge,
    } = await request.json();

    const user = await prisma.users.findUnique({
      where: { email },
    });

    if (!user) {
      return new Response(JSON.stringify({ error: 'User not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const expectedChallenge = challenge;
    const expectedOrigin = 'http://localhost:3000'; // Replace with your origin
    const expectedRPID = 'localhost'; // Replace with your RP ID

    const verification = await verifyRegistrationResponse({
      response: {
        attestationObject: Buffer.from(attestationObject, 'base64'),
        clientDataJSON: Buffer.from(clientDataJSON, 'base64'),
      },
      expectedChallenge,
      expectedOrigin,
      expectedRPID,
    });

    const { registrationInfo } = verification;

    if (!registrationInfo) {
      return new Response(JSON.stringify({ error: 'Failed to verify registration' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    await prisma.credentials.create({
      data: {
        user_id: user.id,
        webauthn_credential_id: rawId,
        public_key: registrationInfo.publicKey,
        sign_count: 0,
      },
    });

    return new Response(JSON.stringify({ message: 'Registration successful' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('[register-passkey/verify] error', error);
    return new Response(JSON.stringify({ error: error.message || 'Failed to verify registration' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}