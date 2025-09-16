// backend/src/app/api/auth/oauth/github/callback/route.ts
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
    const CLIENT_ID = process.env.GITHUB_CLIENT_ID || '';
    const CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET || '';
    const REDIRECT_URI = process.env.GITHUB_REDIRECT_URI || `${base}/api/auth/oauth/github/callback`;

    if (!CLIENT_ID || !CLIENT_SECRET) {
      return new Response(JSON.stringify({ error: 'GitHub OAuth not configured' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Exchange code for tokens
    const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code,
        redirect_uri: REDIRECT_URI,
        state,
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

    // Fetch user info
    let email = '';
    let id = '';
    let login = '';

    // Primary user info
    const userRes = await fetch('https://api.github.com/user', {
      headers: { Authorization: `Bearer ${access_token}`, 'Accept': 'application/vnd.github+json' },
    });
    if (userRes.ok) {
      const u: any = await userRes.json();
      id = String(u?.id || '');
      login = u?.login || '';
    }

    // Emails (to get primary verified email)
    const emailsRes = await fetch('https://api.github.com/user/emails', {
      headers: { Authorization: `Bearer ${access_token}`, 'Accept': 'application/vnd.github+json' },
    });
    if (emailsRes.ok) {
      const emails: any[] = await emailsRes.json();
      const primary = emails.find((e: any) => e?.primary && e?.verified) || emails[0];
      email = primary?.email || '';
    }

    if (!id) {
      return new Response(JSON.stringify({ error: 'GitHub userinfo missing' }), {
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
        data: { email: email || `github_${id}@placeholder.local` },
      });
    }

    const existing = await prisma.oauth_accounts.findFirst({
      where: { provider: 'github', provider_user_id: id },
    });
    if (!existing) {
      await prisma.oauth_accounts.create({
        data: {
          user_id: (user as any).id,
          provider: 'github',
          provider_user_id: id,
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
    console.error('[oauth/github/callback] error', err);
    return new Response(JSON.stringify({ error: err?.message || 'OAuth failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}