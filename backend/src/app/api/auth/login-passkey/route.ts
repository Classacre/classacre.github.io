// backend/src/app/api/auth/login-passkey/route.ts
import { generateAuthenticationOptions } from '@simplewebauthn/server';
import { getPrisma } from '../../../../lib/prisma';

export async function POST(request: any) {
  try {
    const prisma = await getPrisma();
    const { email } = await (request as any).json();

    // 1. Find the user in the database
    const user = await prisma.users.findUnique({
      where: { email },
    });

    if (!user) {
      return new Response(JSON.stringify({ error: 'User not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // 2. Generate authentication options
    const authenticationOptions = await generateAuthenticationOptions({
      rpID: 'localhost', // replace with your real domain in prod
      allowCredentials: [], // populate with user's registered credential IDs when ready
      userVerification: 'preferred',
    });

    // 3. Return the options to the client
    return new Response(JSON.stringify(authenticationOptions), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('[login-passkey] error', error);
    return new Response(JSON.stringify({ error: 'Failed to generate authentication options' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}