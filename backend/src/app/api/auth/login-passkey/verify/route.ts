// backend/src/app/api/auth/login-passkey/verify/route.ts
import { verifyPasskeyLogin } from '../../../../../lib/auth';
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
      challenge,
    } = await request.json();

    // Read short-lived challenge from HttpOnly cookie; fallback to provided body value
    const cookieHeader = request.headers.get('cookie') || '';
    const cookieMatch = cookieHeader.match(/webauthn_challenge=([^;]+)/);
    const expectedChallenge = cookieMatch ? cookieMatch[1] : challenge;

    const verification = await verifyPasskeyLogin(email, {
      id,
      rawId,
      response,
      type,
      authenticatorAttachment,
      clientDataJSON,
    }, expectedChallenge);

    if (!verification.success) {
      return new Response(JSON.stringify({ error: 'Failed to verify authentication' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Create session and set cookie
    const sessionToken = randomBytes(32).toString('hex');
    const hashedToken = createHash('sha256').update(sessionToken).digest('hex');
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days
    const user = await prisma.users.findUnique({
      where: { email },
    });

    if (!user) {
      return new Response(JSON.stringify({ error: 'User not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    await prisma.sessions.create({
      data: {
        user_id: user.id,
        hashed_token: hashedToken,
        user_agent: request.headers.get('user-agent') || 'unknown',
        ip_hash: request.headers.get('x-forwarded-for') || 'unknown',
        expires_at: expiresAt,
      },
    });

    // Build headers so we can append Set-Cookie safely and mirror registration behavior
    const headers = new Headers();
    headers.set('Content-Type', 'application/json');
    const maxAge = 30 * 24 * 60 * 60; // 30 days
    const secureFlag = process.env.NODE_ENV === 'production' ? 'Secure; ' : '';
    const sessionCookie = `session=${sessionToken}; Path=/; HttpOnly; ${secureFlag}SameSite=Strict; Max-Age=${maxAge}`;
    headers.append('Set-Cookie', sessionCookie);
    // Optionally clear challenge cookie if present
    headers.append('Set-Cookie', 'webauthn_challenge=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0');

    return new Response(JSON.stringify({ message: 'Login successful' }), {
      status: 200,
      headers,
    });
  } catch (error: any) {
    console.error('[login-passkey/verify] error', error);
    return new Response(JSON.stringify({ error: error.message || 'Failed to verify authentication' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}