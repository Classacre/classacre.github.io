// backend/src/app/api/export/route.ts
import { getPrisma } from '../../../../src/lib/prisma';
import { cookies } from 'next/headers';
import { createHash } from 'crypto';

export async function GET(request: Request) {
  try {
    const prisma = await getPrisma();
    const sessionToken = await (cookies().get('session_token'))?.value;

    if (!sessionToken) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Verify session token
    const session = await prisma.sessions.findUnique({
      where: { hashed_token: createHash('sha256').update(sessionToken).digest('hex') },
      include: { user: true },
    });

    if (!session) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const userId = session.user.id;

    const user = await prisma.users.findUnique({
      where: { id: userId },
      include: {
        credentials: true,
        sessions: true,
        profiles: true,
        traits: true,
        sources: true,
        messages: true,
        voice_profiles: true,
      },
    });

    if (!user) {
      return new Response(JSON.stringify({ error: 'User not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const userData = JSON.stringify(user, null, 2);

    return new Response(userData, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Content-Disposition': 'attachment; filename="legaci_data.json"',
      },
    });
  } catch (error: any) {
    console.error('[export] error', error);
    return new Response(JSON.stringify({ error: error.message || 'Failed to export data' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}