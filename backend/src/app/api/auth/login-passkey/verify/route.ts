// backend/src/app/api/auth/login-passkey/verify/route.ts
import { verifyAuthenticationResponse } from '@simplewebauthn/server';
import { getPrisma } from '../../../../../lib/prisma';
import { cookies } from 'next/headers';
import { randomBytes, createHash } from 'crypto';

export async function POST(request: Request) {
  try {
    const prisma = await getPrisma();
    const {
      email,
      id,
      rawId,
      response,
      type,
      authenticatorData,
      clientDataJSON,
      signature,
      challenge,
    } = await request.json();

    const user = await prisma.users.findUnique({
      where: { email },
      include: {
        credentials: true,
      },
    });

    if (!user) {
      return new Response(JSON.stringify({ error: 'User not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (!user.credentials || user.credentials.length === 0) {
      return new Response(JSON.stringify({ error: 'No credentials found for this user' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const credential = user.credentials[0];

    const expectedChallenge = challenge;
    const expectedOrigin = process.env.NEXTAUTH_URL || 'http://localhost:3000';
    const expectedRPID = process.env.NEXTAUTH_URL ? new URL(process.env.NEXTAUTH_URL).hostname : 'localhost';

    const { authenticationInfo } = await verifyAuthenticationResponse({
      response: {
        authenticatorData: Buffer.from(authenticatorData, 'base64'),
        clientDataJSON: Buffer.from(clientDataJSON, 'base64'),
        signature: Buffer.from(signature, 'base64'),
      },
      expectedChallenge,
      expectedOrigin,
      expectedRPID,
      authenticator: {
        credentialID: credential.webauthn_credential_id,
        publicKey: credential.public_key,
        counter: credential.sign_count,
      },
    });

    await prisma.credentials.update({
      where: { id: credential.id },
      data: { sign_count: authenticationInfo.newCounter },
    });

    const sessionToken = randomBytes(32).toString('hex');
    const hashedToken = createHash('sha256').update(sessionToken).digest('hex');

    await prisma.sessions.create({
      data: {
        user_id: user.id,
        hashed_token: hashedToken,
        user_agent: request.headers.get('user-agent') || 'unknown',
        ip_hash: '', // Hash the IP address for security
        expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      },
    });

    (await cookies()).set({
      name: 'session_token',
      value: sessionToken,
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    });

    return new Response(JSON.stringify({ message: 'Login successful' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('[login-passkey/verify] error', error);
    return new Response(JSON.stringify({ error: error.message || 'Failed to verify authentication' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}