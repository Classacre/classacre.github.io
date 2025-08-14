// backend/src/app/api/auth/login-passkey/route.ts
import { generateAuthenticationOptions } from '@simplewebauthn/server';
import { getPrisma } from '../../../../lib/prisma';
import { randomBytes } from 'crypto';

export async function POST(request: Request) {
  try {
    const prisma = await getPrisma();
    const { email } = await request.json();

    // 1. Find the user in the database
    const user = await prisma.users.findUnique({
      where: { email },
      include: {
        credentials: true,
      },
    });

    if (!user) {
      return new Response(JSON.stringify({ error: 'User not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (!user.credentials || user.credentials.length === 0) {
      return new Response(JSON.stringify({ error: 'No credentials found for this user' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Generate a challenge
    const challenge = randomBytes(32).toString('hex');

    // 2. Generate authentication options
    const authenticationOptions = await generateAuthenticationOptions({
      rpID: process.env.NEXTAUTH_URL ? new URL(process.env.NEXTAUTH_URL).hostname : 'localhost',
      // Allow the user to sign in with any credential they have registered
      allowCredentials: user.credentials.map((credential: any) => ({
        id: credential.webauthn_credential_id,
        type: 'public-key',
      })),
      userVerification: 'required',
      challenge: challenge,
    });

    // 3. Return the options and challenge to the client
    return new Response(
      JSON.stringify({ authenticationOptions, challenge }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  } catch (error: any) {
    console.error('[login-passkey] error', error);
    return new Response(JSON.stringify({ error: error.message || 'Failed to generate authentication options' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}