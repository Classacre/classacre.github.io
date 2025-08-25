import { NextResponse } from 'next/server';
import { requireSession } from '../../../../lib/session';
import { getPrisma } from '../../../../lib/prisma';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    const { session } = await requireSession(req as any);
    const prisma = await getPrisma();

    if (!session) {
      return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Delete the current session record
    await prisma.sessions.deleteMany({
      where: { id: session.id },
    });

    // Clear session cookie
    const secureFlag = process.env.NODE_ENV === 'production' ? 'Secure; ' : '';
    const cookie = `session=; Path=/; HttpOnly; ${secureFlag}SameSite=Strict; Max-Age=0`;
    const headers = new Headers();
    headers.append('Set-Cookie', cookie);
    headers.set('Content-Type', 'application/json');

    return new NextResponse(JSON.stringify({ ok: true }), { status: 200, headers });
  } catch (err: any) {
    if ((err as Error).message === 'Unauthorized') {
      return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    console.error('[auth/logout] error', err);
    return new NextResponse(JSON.stringify({ error: err?.message || 'Failed to logout' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}