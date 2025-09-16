// backend/src/app/api/auth/oauth/google/callback/route.ts
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
    const CLIENT_ID = process.env.GOOGLE_CLIENT_ID || '';
    const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || '';
    const REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI || `${base}/api/auth/oauth/google/callback`;

    if (!CLIENT_ID || !CLIENT_SECRET) {
      return new Response(JSON.stringify({ error: 'Google OAuth not configured' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Exchange code for tokens
    const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code: code,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        redirect_uri: REDIRECT_URI,
        grant_type: 'authorization_code',
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
    const id_token = tokenJson.id_token as string | undefined;

    // Fetch userinfo
    let email = '';
    let sub = '';
    let name = '';
    let picture = '';

    const userInfoRes = await fetch('https://openidconnect.googleapis.com/v1/userinfo', {
      headers: { Authorization: `Bearer ${access_token}` },
    });
    if (userInfoRes.ok) {
      const info: any = await userInfoRes.json();
      email = info?.email || '';
      sub = info?.sub || '';
      name = info?.name || '';
      picture = info?.picture || '';
    } else if (id_token) {
      // Fallback decode (in a real system verify the id_token via jose)
      try {
        const payloadB64 = id_token.split('.')[1];
        const payload = JSON.parse(Buffer.from(payloadB64, 'base64').toString('utf8'));
        email = payload?.email || '';
        sub = payload?.sub || '';
        name = payload?.name || '';
        picture = payload?.picture || '';
      } catch {
        // ignore
      }
    }

    if (!sub) {
      return new Response(JSON.stringify({ error: 'Google userinfo missing' }), {
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
        data: { email: email || `google_${sub}@placeholder.local` },
      });
    }

    // Upsert oauth account record
    const existing = await prisma.oauth_accounts.findFirst({
      where: { provider: 'google', provider_user_id: sub },
    });
    if (!existing) {
      await prisma.oauth_accounts.create({
        data: {
          user_id: (user as any).id,
          provider: 'google',
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

    // Set cookies: clear oauth_state, set session
    const secureFlag = process.env.NODE_ENV === 'production' ? 'Secure; ' : '';
    const headers = new Headers();
    headers.append('Set-Cookie', `oauth_state=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0`);
    headers.append('Set-Cookie', `session=${sessionToken}; Path=/; HttpOnly; ${secureFlag}SameSite=Strict; Max-Age=${30 * 24 * 60 * 60}`);
    headers.append('Location', '/');

    return new Response(null, { status: 302, headers });
  } catch (err: any) {
    console.error('[oauth/google/callback] error', err);
    return new Response(JSON.stringify({ error: err?.message || 'OAuth failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}