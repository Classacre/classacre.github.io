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

    const verification = await verifyPasskeyLogin(email, {
      id,
      rawId,
      response,
      type,
      authenticatorAttachment,
      clientDataJSON,
    }, challenge);

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
        userId: user.id,
        hashedToken: hashedToken,
        user_agent: request.headers.get('user-agent') || 'unknown',
        ip_hash: request.headers.get('x-forwarded-for') || 'unknown',
        expires_at: expiresAt,
      },
    });

    return new Response(
      JSON.stringify({ message: 'Login successful' }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Set-Cookie': `session=${sessionToken}; HttpOnly; Secure; SameSite=strict`,
        },
      }
    );
  } catch (error: any) {
    console.error('[login-passkey/verify] error', error);
    return new Response(JSON.stringify({ error: error.message || 'Failed to verify authentication' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}