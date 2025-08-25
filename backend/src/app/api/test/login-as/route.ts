/**
 * backend/src/app/api/test/login-as/route.ts
 *
 * Test-only helper (enabled when PLAYWRIGHT_TESTING=true)
 * GET /api/test/login-as?userId=...
 *
 * Creates a session for the given user and sets the session cookie so E2E tests
 * can authenticate without exercising WebAuthn flows.
 *
 * WARNING: This route is only intended for local test environments. It is gated
 * by the PLAYWRIGHT_TESTING env var.
 */
import { getPrisma } from '../../../../lib/prisma';
import { randomBytes, createHash } from 'node:crypto';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  if (!process.env.PLAYWRIGHT_TESTING) {
    return new NextResponse(JSON.stringify({ error: 'Test helper disabled' }), { status: 403, headers: { 'Content-Type': 'application/json' } });
  }

  try {
    const url = new URL(req.url);
    const userId = url.searchParams.get('userId');
    if (!userId) {
      return new NextResponse(JSON.stringify({ error: 'Missing userId' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    const prisma = await getPrisma();
    const user = await prisma.users.findUnique({ where: { id: userId } });
    if (!user) {
      return new NextResponse(JSON.stringify({ error: 'User not found' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
    }

    const sessionToken = randomBytes(32).toString('hex');
    const hashedToken = createHash('sha256').update(sessionToken).digest('hex');
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

    await prisma.sessions.create({
      data: {
        user_id: user.id,
        hashed_token: hashedToken,
        user_agent: req.headers.get('user-agent') || 'playwright',
        ip_hash: req.headers.get('x-forwarded-for') || '127.0.0.1',
        expires_at: expiresAt,
      },
    });

    const secureFlag = process.env.NODE_ENV === 'production' ? 'Secure; ' : '';
    const maxAge = 30 * 24 * 60 * 60;
    const cookie = `session=${sessionToken}; Path=/; HttpOnly; ${secureFlag}SameSite=Strict; Max-Age=${maxAge}`;

    const headers = new Headers();
    headers.append('Set-Cookie', cookie);
    headers.set('Content-Type', 'application/json');

    return new NextResponse(JSON.stringify({ ok: true, userId: user.id }), { status: 200, headers });
  } catch (err: any) {
    console.error('[test/login-as] error', err);
    return new NextResponse(JSON.stringify({ error: err?.message || 'Internal' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}