// backend/src/app/api/auth/oauth/github/route.ts
import { randomBytes } from 'node:crypto';

export const runtime = 'nodejs';

// GET /api/auth/oauth/github -> redirect to GitHub OAuth consent
export async function GET(request: Request) {
  const CLIENT_ID = process.env.GITHUB_CLIENT_ID || '';
  const base = process.env.NEXTAUTH_URL || 'http://localhost:3000';
  const REDIRECT_URI = process.env.GITHUB_REDIRECT_URI || `${base}/api/auth/oauth/github/callback`;

  if (!CLIENT_ID) {
    return new Response(JSON.stringify({ error: 'GitHub OAuth not configured (GITHUB_CLIENT_ID missing)' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const state = randomBytes(16).toString('hex');
  const maxAge = 5 * 60;
  const secureFlag = process.env.NODE_ENV === 'production' ? 'Secure; ' : '';
  const stateCookie = `oauth_state=${state}; Path=/; HttpOnly; ${secureFlag}SameSite=Strict; Max-Age=${maxAge}`;

  const url = new URL('https://github.com/login/oauth/authorize');
  url.searchParams.set('client_id', CLIENT_ID);
  url.searchParams.set('redirect_uri', REDIRECT_URI);
  url.searchParams.set('state', state);
  url.searchParams.set('scope', 'read:user user:email');

  const headers = new Headers();
  headers.append('Set-Cookie', stateCookie);
  headers.append('Location', url.toString());

  return new Response(null, { status: 302, headers });
}