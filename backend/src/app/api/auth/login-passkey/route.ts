// backend/src/app/api/auth/login-passkey/route.ts
import { loginPasskey } from '../../../../lib/auth';
import { getPrisma } from '../../../../lib/prisma';
import { randomBytes } from 'node:crypto';

export async function POST(request: Request) {
  try {
    const prisma = await getPrisma();
    const { email } = await request.json();

    // Generate authentication options from helper (may include challenge)
    const options = await loginPasskey(email);
    const challenge = (options as any)?.challenge ?? randomBytes(32).toString('hex');

    // Store short-lived challenge in an HttpOnly cookie for verification step
    const maxAge = 5 * 60; // 5 minutes
    const secureFlag = process.env.NODE_ENV === 'production' ? 'Secure; ' : '';
    const challengeCookie = `webauthn_challenge=${challenge}; Path=/; HttpOnly; ${secureFlag}SameSite=Strict; Max-Age=${maxAge}`;

    const headers = new Headers();
    headers.set('Content-Type', 'application/json');
    headers.append('Set-Cookie', challengeCookie);

    return new Response(
      JSON.stringify({ challenge: 'stored-in-cookie', authenticationOptions: options }),
      {
        status: 200,
        headers,
      },
    );
  } catch (error) {
    console.error('[login-passkey] error', error);
    return new Response(JSON.stringify({ error: 'Failed to generate authentication options' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}