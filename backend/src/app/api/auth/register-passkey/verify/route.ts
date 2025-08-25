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

    // Prefer the short-lived challenge stored in the HttpOnly cookie (set at registration start).
    // Fall back to the provided challenge if cookie is not present.
    const cookieHeader = request.headers.get('cookie') || '';
    const cookieMatch = cookieHeader.match(/webauthn_challenge=([^;]+)/);
    const expectedChallenge = cookieMatch ? cookieMatch[1] : challenge;
    const expectedOrigin = process.env.NEXTAUTH_URL || 'http://localhost:3000';
    const expectedRPID = process.env.NEXTAUTH_URL ? new URL(process.env.NEXTAUTH_URL).hostname : 'localhost';


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
      expectedChallenge
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
        user_id: user.id,
        hashed_token: hashedToken,
        user_agent: request.headers.get('user-agent') || 'unknown',
        ip_hash: request.headers.get('x-forwarded-for') || 'unknown',
        expires_at: expiresAt,
      },
    });

    // Create a secure session cookie. Use Secure flag only in production.
    const maxAge = 30 * 24 * 60 * 60; // 30 days in seconds
    const secureFlag = process.env.NODE_ENV === 'production' ? 'Secure; ' : '';
    const cookie = `session=${sessionToken}; Path=/; HttpOnly; ${secureFlag}SameSite=Strict; Max-Age=${maxAge}`;

    // Construct headers explicitly so we can set multiple Set-Cookie values reliably.
    const headers = new Headers();
    headers.set('Content-Type', 'application/json');
    // Set session cookie
    headers.append('Set-Cookie', cookie);
    // Clear the temporary challenge cookie (short-lived)
    headers.append('Set-Cookie', 'webauthn_challenge=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0');

    return new Response(JSON.stringify({ message: 'Registration successful' }), {
      status: 200,
      headers,
    });
  } catch (error: any) {
    console.error('[register-passkey/verify] error', error);
    return new Response(JSON.stringify({ error: error.message || 'Failed to verify registration' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}