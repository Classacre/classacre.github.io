// backend/src/app/api/auth/oauth/microsoft/route.ts
import { randomBytes } from 'node:crypto';

export const runtime = 'nodejs';

// GET /api/auth/oauth/microsoft -> redirect to Microsoft OAuth (AAD v2) consent
export async function GET(request: Request) {
  const CLIENT_ID = process.env.MS_CLIENT_ID || '';
  const base = process.env.NEXTAUTH_URL || 'http://localhost:3000';
  const REDIRECT_URI = process.env.MS_REDIRECT_URI || `${base}/api/auth/oauth/microsoft/callback`;

  if (!CLIENT_ID) {
    return new Response(JSON.stringify({ error: 'Microsoft OAuth not configured (MS_CLIENT_ID missing)' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const state = randomBytes(16).toString('hex');
  const maxAge = 5 * 60;
  const secureFlag = process.env.NODE_ENV === 'production' ? 'Secure; ' : '';
  const stateCookie = `oauth_state=${state}; Path=/; HttpOnly; ${secureFlag}SameSite=Strict; Max-Age=${maxAge}`;

  // Azure AD v2 authorize endpoint
  const url = new URL('https://login.microsoftonline.com/common/oauth2/v2.0/authorize');
  url.searchParams.set('client_id', CLIENT_ID);
  url.searchParams.set('response_type', 'code');
  url.searchParams.set('redirect_uri', REDIRECT_URI);
  // "offline_access" for refresh token; "User.Read" to get profile via MS Graph
  url.searchParams.set('scope', 'openid email profile offline_access User.Read');
  url.searchParams.set('response_mode', 'query');
  url.searchParams.set('state', state);

  const headers = new Headers();
  headers.append('Set-Cookie', stateCookie);
  headers.append('Location', url.toString());

  return new Response(null, { status: 302, headers });
}