// backend/src/app/api/auth/login-passkey/route.ts
import { loginPasskey } from '../../../../lib/auth';
import { getPrisma } from '../../../../lib/prisma';
import { randomBytes } from 'node:crypto';

export async function POST(request: Request) {
  try {
    const prisma = await getPrisma();
    const { email } = await request.json();

    const options = await loginPasskey(email);
    const challenge = randomBytes(32).toString('hex');

    return new Response(
      JSON.stringify({ challenge, authenticationOptions: options }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
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