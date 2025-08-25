import { NextResponse } from 'next/server';
import { requireSession } from '../../../../lib/session';
import { getPrisma } from '../../../../lib/prisma';

export const runtime = 'nodejs';

/**
 * POST /api/auth/sessions/revoke
 * Body (optional): { sessionId?: string }
 *
 * - If sessionId is provided, revokes that session if it belongs to the authenticated user.
 * - If sessionId is omitted, revokes all sessions for the authenticated user.
 * - Clears the session cookie when the current session is revoked (or when revoking all sessions).
 */
export async function POST(req: Request) {
  try {
    const { session, user } = await requireSession(req as any);
    if (!user) {
      return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const prisma = await getPrisma();
    const body = await req.json().catch(() => ({}));
    const sessionId: string | undefined = body?.sessionId;

    if (sessionId) {
      // Revoke a single session (only if it belongs to the user)
      const toDelete = await prisma.sessions.deleteMany({
        where: {
          id: sessionId,
          user_id: user.id,
        },
      });

      // If the revoked session is the current one, clear the cookie
      const clearingCurrent = sessionId === session?.id;

      const headers = new Headers();
      if (clearingCurrent) {
        const secureFlag = process.env.NODE_ENV === 'production' ? 'Secure; ' : '';
        headers.append('Set-Cookie', `session=; Path=/; HttpOnly; ${secureFlag}SameSite=Strict; Max-Age=0`);
      }
      headers.set('Content-Type', 'application/json');
      return new NextResponse(JSON.stringify({ revoked: toDelete.count }), { status: 200, headers });
    } else {
      // Revoke all sessions for the user
      const deleted = await prisma.sessions.deleteMany({
        where: { user_id: user.id },
      });

      // Clear cookie for current browser
      const secureFlag = process.env.NODE_ENV === 'production' ? 'Secure; ' : '';
      const headers = new Headers();
      headers.append('Set-Cookie', `session=; Path=/; HttpOnly; ${secureFlag}SameSite=Strict; Max-Age=0`);
      headers.set('Content-Type', 'application/json');

      return new NextResponse(JSON.stringify({ revoked: deleted.count }), { status: 200, headers });
    }
  } catch (err: any) {
    if ((err as Error).message === 'Unauthorized') {
      return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    console.error('[auth/sessions/revoke] error', err);
    return new NextResponse(JSON.stringify({ error: err?.message || 'Failed to revoke sessions' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}