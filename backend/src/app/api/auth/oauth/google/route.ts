// backend/src/app/api/auth/oauth/google/route.ts
import { randomBytes } from 'node:crypto';

export const runtime = 'nodejs';

// GET /api/auth/oauth/google -> redirects to Google OAuth consent screen
export async function GET(request: Request) {
  const CLIENT_ID = process.env.GOOGLE_CLIENT_ID || '';
  const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || '';
  const base = process.env.NEXTAUTH_URL || 'http://localhost:3000';
  const REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI || `${base}/api/auth/oauth/google/callback`;

  if (!CLIENT_ID || !CLIENT_SECRET) {
    return new Response(JSON.stringify({ error: 'Google OAuth not configured (GOOGLE_CLIENT_ID/SECRET missing)' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // CSRF state cookie
  const state = randomBytes(16).toString('hex');
  const maxAge = 5 * 60;
  const secureFlag = process.env.NODE_ENV === 'production' ? 'Secure; ' : '';
  const stateCookie = `oauth_state=${state}; Path=/; HttpOnly; ${secureFlag}SameSite=Strict; Max-Age=${maxAge}`;

  const url = new URL('https://accounts.google.com/o/oauth2/v2/auth');
  url.searchParams.set('client_id', CLIENT_ID);
  url.searchParams.set('redirect_uri', REDIRECT_URI);
  url.searchParams.set('response_type', 'code');
  url.searchParams.set('scope', 'openid email profile');
  url.searchParams.set('state', state);
  // Optional niceties
  url.searchParams.set('access_type', 'offline');
  url.searchParams.set('include_granted_scopes', 'true');
  // url.searchParams.set('prompt', 'consent'); // enable if you want refresh_token every time

  const headers = new Headers();
  headers.append('Set-Cookie', stateCookie);
  headers.append('Location', url.toString());

  return new Response(null, { status: 302, headers });
}