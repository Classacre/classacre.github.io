// backend/src/app/api/auth/email/login/route.ts
import { z } from 'zod';
import { randomBytes, createHash } from 'node:crypto';
import bcrypt from 'bcryptjs';
import { getPrisma } from '../../../../../lib/prisma';

export const runtime = 'nodejs';

const BodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(200),
});

export async function POST(request: Request) {
  try {
    const prisma = await getPrisma();
    const body = await request.json();
    const { email, password } = BodySchema.parse(body);

    const user = await prisma.users.findUnique({ where: { email } });
    if (!user || !user.password_hash) {
      return new Response(JSON.stringify({ error: 'Invalid credentials' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) {
      return new Response(JSON.stringify({ error: 'Invalid credentials' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Create session
    const sessionToken = randomBytes(32).toString('hex');
    const hashedToken = createHash('sha256').update(sessionToken).digest('hex');
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

    await prisma.sessions.create({
      data: {
        user_id: user.id,
        hashed_token: hashedToken,
        user_agent: request.headers.get('user-agent') || 'unknown',
        ip_hash: request.headers.get('x-forwarded-for') || 'unknown',
        expires_at: expiresAt,
      },
    });

    const maxAge = 30 * 24 * 60 * 60;
    const secureFlag = process.env.NODE_ENV === 'production' ? 'Secure; ' : '';
    const cookie = `session=${sessionToken}; Path=/; HttpOnly; ${secureFlag}SameSite=Strict; Max-Age=${maxAge}`;

    const headers = new Headers();
    headers.set('Content-Type', 'application/json');
    headers.append('Set-Cookie', cookie);

    return new Response(JSON.stringify({ ok: true }), { status: 200, headers });
  } catch (err: any) {
    console.error('[auth/email/login] error', err);
    return new Response(JSON.stringify({ error: err?.message || 'Login failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}