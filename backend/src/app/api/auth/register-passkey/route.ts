// backend/src/app/api/auth/register-passkey/route.ts
import { registerPasskey } from '../../../../lib/auth';
import { getPrisma } from '../../../../lib/prisma';
import { randomBytes } from 'node:crypto';

export async function POST(request: Request) {
  try {
    const prisma = await getPrisma();
    const { email } = await request.json();

    // 1. Create a new user in the database
    let user = await prisma.user.findUnique({
      where: {
        email
      }
    })

    if (!user) {
      user = await prisma.user.create({
        data: { email: email },
      });
    }
    
    // 2. Generate registration options
    const registrationOptions = await registerPasskey(email);

    // Generate a challenge and set it in a short-lived HttpOnly cookie (used to verify the client response)
    const challenge = randomBytes(32).toString('hex');
    const maxAge = 5 * 60; // 5 minutes
    const secureFlag = process.env.NODE_ENV === 'production' ? 'Secure; ' : '';
    const challengeCookie = `webauthn_challenge=${challenge}; Path=/; HttpOnly; ${secureFlag}SameSite=Strict; Max-Age=${maxAge}`;

    return new Response(
      JSON.stringify({ challenge: "stored-in-cookie", registrationOptions }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Set-Cookie': challengeCookie,
        },
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