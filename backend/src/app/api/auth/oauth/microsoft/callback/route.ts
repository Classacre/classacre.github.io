// backend/src/app/api/auth/oauth/microsoft/callback/route.ts
import { getPrisma } from '../../../../../../lib/prisma';
import { randomBytes, createHash } from 'node:crypto';

export const runtime = 'nodejs';

// Helper: parse cookies
function getCookie(req: Request, name: string): string | null {
  const cookieHeader = req.headers.get('cookie') || '';
  const m = cookieHeader.match(new RegExp('(?:^|;\\s*)' + name + '=([^;]+)'));
  return m ? m[1] : null;
}

export async function GET(request: Request) {
  try {
    const prisma = await getPrisma();
    const url = new URL(request.url);
    const code = url.searchParams.get('code');
    const state = url.searchParams.get('state');

    const expectedState = getCookie(request, 'oauth_state');
    if (!code || !state || !expectedState || state !== expectedState) {
      return new Response(JSON.stringify({ error: 'Invalid OAuth state or code' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const base = process.env.NEXTAUTH_URL || 'http://localhost:3000';
    const CLIENT_ID = process.env.MS_CLIENT_ID || '';
    const CLIENT_SECRET = process.env.MS_CLIENT_SECRET || '';
    const REDIRECT_URI = process.env.MS_REDIRECT_URI || `${base}/api/auth/oauth/microsoft/callback`;

    if (!CLIENT_ID || !CLIENT_SECRET) {
      return new Response(JSON.stringify({ error: 'Microsoft OAuth not configured' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Exchange code for tokens
    const tokenRes = await fetch('https://login.microsoftonline.com/common/oauth2/v2.0/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: CLIENT_ID,
        scope: 'openid email profile offline_access User.Read',
        code,
        redirect_uri: REDIRECT_URI,
        grant_type: 'authorization_code',
        client_secret: CLIENT_SECRET,
      }),
    });

    if (!tokenRes.ok) {
      const txt = await tokenRes.text().catch(() => '');
      return new Response(JSON.stringify({ error: 'Token exchange failed', detail: txt }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const tokenJson: any = await tokenRes.json();
    const access_token = tokenJson.access_token as string;

    // Fetch user info from Microsoft Graph
    let email = '';
    let sub = '';
    let displayName = '';

    const meRes = await fetch('https://graph.microsoft.com/v1.0/me', {
      headers: { Authorization: `Bearer ${access_token}` },
    });
    if (meRes.ok) {
      const me: any = await meRes.json();
      // email can be under mail or userPrincipalName; prioritize verified mail
      email = me?.mail || me?.userPrincipalName || '';
      sub = me?.id || '';
      displayName = me?.displayName || '';
    }

    if (!sub) {
      return new Response(JSON.stringify({ error: 'Microsoft userinfo missing' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Upsert user and oauth account
    let user = null;
    if (email) {
      user = await prisma.users.findUnique({ where: { email } });
    }
    if (!user) {
      user = await prisma.users.create({
        data: { email: email || `ms_${sub}@placeholder.local` },
      });
    }

    const existing = await prisma.oauth_accounts.findFirst({
      where: { provider: 'microsoft', provider_user_id: sub },
    });
    if (!existing) {
      await prisma.oauth_accounts.create({
        data: {
          user_id: (user as any).id,
          provider: 'microsoft',
          provider_user_id: sub,
          access_token: access_token || null,
        },
      });
    }

    // Create session
    const sessionToken = randomBytes(32).toString('hex');
    const hashedToken = createHash('sha256').update(sessionToken).digest('hex');
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

    await prisma.sessions.create({
      data: {
        user_id: (user as any).id,
        hashed_token: hashedToken,
        user_agent: request.headers.get('user-agent') || 'unknown',
        ip_hash: request.headers.get('x-forwarded-for') || 'unknown',
        expires_at: expiresAt,
      },
    });

    // Clear oauth_state cookie and set session
    const secureFlag = process.env.NODE_ENV === 'production' ? 'Secure; ' : '';
    const headers = new Headers();
    headers.append('Set-Cookie', `oauth_state=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0`);
    headers.append('Set-Cookie', `session=${sessionToken}; Path=/; HttpOnly; ${secureFlag}SameSite=Strict; Max-Age=${30 * 24 * 60 * 60}`);
    headers.append('Location', '/');

    return new Response(null, { status: 302, headers });
  } catch (err: any) {
    console.error('[oauth/microsoft/callback] error', err);
    return new Response(JSON.stringify({ error: err?.message || 'OAuth failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}