// backend/src/app/api/auth/register-passkey/verify/route.ts
import { verifyPasskeyRegistration } from '../../../../../lib/auth';
import { getPrisma } from '../../../../../lib/prisma';
import { randomBytes, createHash } from 'node:crypto';

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
    const expectedOrigin = process.env.NEXTAUTH_URL || 'http://localhost:3000'; // Replace with your origin
    const expectedRPID = process.env.NEXTAUTH_URL ? new URL(process.env.NEXTAUTH_URL).hostname : 'localhost'; // Replace with your RP ID


    const verificationResult = await verifyPasskeyRegistration(
      email,
      {
        id,
        rawId,
        response,
        type,
        authenticatorAttachment,
        clientDataJSON,
        attestationObject,
      },
      challenge
    );

    if (!verificationResult.success) {
      return new Response(JSON.stringify({ error: verificationResult.error }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Create session and set cookie
    const sessionToken = randomBytes(32).toString('hex');
    const hashedToken = createHash('sha256').update(sessionToken).digest('hex');
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days

    await prisma.sessions.create({
      data: {
        userId: user.id,
        hashedToken,
        user_agent: request.headers.get('user-agent') || 'unknown',
        ip_hash: request.headers.get('x-forwarded-for') || 'unknown',
        expires_at: expiresAt,
      },
    });

    return new Response(
      JSON.stringify({ message: 'Registration successful' }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Set-Cookie': `session=${sessionToken}; HttpOnly; Secure; SameSite=strict`,
        },
      }
    );
  } catch (error: any) {
    console.error('[register-passkey/verify] error', error);
    return new Response(JSON.stringify({ error: error.message || 'Failed to verify registration' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}