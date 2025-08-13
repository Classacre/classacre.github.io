// backend/src/app/api/auth/register-passkey/route.ts
import { generateRegistrationOptions } from '@simplewebauthn/server';
import { getPrisma } from '../../../../lib/prisma';
import { randomBytes } from 'crypto';

export async function POST(request: Request) {
  try {
    const prisma = await getPrisma();
    const { email } = await request.json();

    // 1. Create a new user in the database
    const user = await prisma.users.create({
      data: { email: email },
    });

    // 2. Generate registration options
    const registrationOptions = await generateRegistrationOptions({
      rpName: 'Legaci',
      rpID: 'localhost', // Replace with your actual domain
      // Use user.id as the user identifier (string)
      userID: user.id,
      userName: email,
      // Exclude existing credentials (populate when storing credentials)
      excludeCredentials: [],
    });

    // Generate a challenge
    const challenge = randomBytes(32).toString('hex');

    // 3. Return the options and challenge to the client
    return new Response(
      JSON.stringify({ registrationOptions, challenge }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  } catch (error) {
    console.error('[register-passkey] error', error);
    return new Response(JSON.stringify({ error: 'Failed to generate registration options' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}