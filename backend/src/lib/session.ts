import { createHash } from 'node:crypto';
import { getPrisma } from './prisma';

type AnyRequest = Request & { cookies?: any };

/**
 * Parse the 'session' cookie from various Request shapes (Next Request or standard Request).
 */
function getSessionCookieValue(req: AnyRequest): string | null {
  try {
    // Prefer raw Cookie header if present (works in standard Request)
    const cookieHeader = (req as any).headers?.get ? (req as any).headers.get('cookie') : undefined;
    if (cookieHeader) {
      const m = cookieHeader.match(/(?:^|;\s*)session=([^;]+)/);
      if (m) return m[1];
    }

    // Next.js NextRequest exposes cookies via .cookies.get('name')
    if (typeof req.cookies === 'function') {
      const c = (req as any).cookies('session');
      if (c && typeof c === 'object') return c.value || null;
    } else if (req.cookies && typeof req.cookies.get === 'function') {
      const c = req.cookies.get('session');
      if (c) return c.value || null;
    } else if (req.cookies && typeof req.cookies === 'object') {
      // Some runtimes expose cookies as a Map-like object
      const c = (req.cookies as any)['session'];
      if (c && typeof c === 'object') return c.value || c;
      if (typeof c === 'string') return c;
    }
  } catch (err) {
    // swallow and return null below
  }
  return null;
}

/**
 * Resolve a session record and user from an incoming Request.
 * Returns { session, user } when found, otherwise null.
 */
export async function getSessionFromRequest(req: AnyRequest) {
  const prisma = await getPrisma();

  const sessionToken = getSessionCookieValue(req);
  if (!sessionToken) return null;

  const hashed = createHash('sha256').update(sessionToken).digest('hex');

  const session = await prisma.sessions.findFirst({
    where: {
      hashed_token: hashed,
      revoked_at: null,
    },
    include: { user: true },
  });

  if (!session) return null;

  // Optionally check expires_at
  if (session.expires_at && new Date(session.expires_at) < new Date()) {
    return null;
  }

  return { session, user: (session as any).user || null };
}

/**
 * Require a valid session. Throws an Error if not authenticated.
 */
export async function requireSession(req: AnyRequest) {
  const resolved = await getSessionFromRequest(req);
  if (!resolved) throw new Error('Unauthorized');
  return resolved;
}