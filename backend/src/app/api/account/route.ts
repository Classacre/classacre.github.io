// backend/src/app/api/account/route.ts
import { getPrisma } from '../../../../src/lib/prisma';
import { cookies } from 'next/headers';
//import { createHash } from 'crypto';

export async function DELETE(request: Request) {
  try {
    const prisma = await getPrisma();
    //const sessionToken = (await cookies().get('session_token'))?.value;

    //if (!sessionToken) {
    //  return new Response(JSON.stringify({ error: 'Unauthorized' }), {
    //    status: 401,
    //    headers: { 'Content-Type': 'application/json' },
    //  });
    //}

    // Verify session token
    //const session = await prisma.sessions.findUnique({
    //  where: { hashed_token: createHash('sha256').update(sessionToken).digest('hex') },
    //  include: { user: true },
    //});

    //if (!session) {
    //  return new Response(JSON.stringify({ error: 'Unauthorized' }), {
    //    status: 401,
    //    headers: { 'Content-Type': 'application/json' },
    //  });
    //}

    const userId = 'test'; //session.user.id;

    // Delete all data associated with the user
    await prisma.users.delete({
      where: { id: userId },
    });

    // Invalidate the user's session
    await prisma.sessions.deleteMany({
      where: { user_id: userId },
    });

    // Clear the session cookie
    //await (await cookies()).delete('session_token');

    return new Response(JSON.stringify({ message: 'Account deleted successfully' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('[account/delete] error', error);
    return new Response(JSON.stringify({ error: error.message || 'Failed to delete account' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}