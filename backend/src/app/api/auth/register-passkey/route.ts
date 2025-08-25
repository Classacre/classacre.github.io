// backend/src/app/api/auth/register-passkey/route.ts
import { registerPasskey } from '../../../../lib/auth';
import { getPrisma } from '../../../../lib/prisma';
import { randomBytes } from 'node:crypto';

export async function POST(request: Request) {
  try {
    const prisma = await getPrisma();
    const { email } = await request.json();

    // 1. Create or find the user in the database
    let user = await prisma.users.findUnique({
      where: { email },
    });

    if (!user) {
      user = await prisma.users.create({
        data: { email },
      });
    }

    // 2. Generate registration options (includes challenge)
    const registrationOptions = await registerPasskey(email);
    
    // Use the generated challenge (fallback to random if absent)
    const challenge = (registrationOptions as any)?.challenge ?? randomBytes(32).toString('hex');
    // CSRF double-submit token (client-readable cookie)
    const csrf = randomBytes(16).toString('hex');
    const maxAge = 5 * 60; // 5 minutes
    const secureFlag = process.env.NODE_ENV === 'production' ? 'Secure; ' : '';
    const challengeCookie = `webauthn_challenge=${challenge}; Path=/; HttpOnly; ${secureFlag}SameSite=Strict; Max-Age=${maxAge}`;
    // csrf_token is intentionally NOT HttpOnly so frontend can read it and include it as a header for verification
    const csrfCookie = `csrf_token=${csrf}; Path=/; ${secureFlag}SameSite=Strict; Max-Age=${maxAge}`;
    
    const headers = new Headers();
    headers.set("Content-Type", "application/json");
    headers.append("Set-Cookie", challengeCookie);
    headers.append("Set-Cookie", csrfCookie);
    
    return new Response(JSON.stringify({ challenge: "stored-in-cookie", registrationOptions, csrf }), {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error('[register-passkey] error', error);
    return new Response(JSON.stringify({ error: 'Failed to generate registration options' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}