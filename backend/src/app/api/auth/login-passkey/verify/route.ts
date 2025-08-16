// backend/src/app/api/auth/login-passkey/verify/route.ts
import { verifyPasskeyLogin } from '../../../../../lib/auth';
import { getPrisma } from '../../../../../lib/prisma';

export async function POST(request: Request) {
  try {
    const prisma = await getPrisma();
    const {
      email,
      id,
      rawId,
      response,
      type,
      authenticatorAttachment,
      clientDataJSON,
      challenge,
    } = await request.json();

    const verification = await verifyPasskeyLogin(email, {
      id,
      rawId,
      response,
      type,
      authenticatorAttachment,
      clientDataJSON,
    }, challenge);

    if (!verification.success) {
      return new Response(JSON.stringify({ error: 'Failed to verify authentication' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ message: 'Login successful' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('[login-passkey/verify] error', error);
    return new Response(JSON.stringify({ error: error.message || 'Failed to verify authentication' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}