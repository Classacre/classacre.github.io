import { getPrisma } from '../../../lib/prisma';
import { v4 as uuidv4 } from 'uuid';

export async function GET(req: Request) {
  try {
    const prisma = await getPrisma();
    const userId = uuidv4();

    const user = await prisma.users.create({
      data: {
        id: userId,
        email: `test${Date.now()}@example.com`,
      },
    });

    return new Response(JSON.stringify({ user }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('[create-user] error', error);
    return new Response(JSON.stringify({ error: 'Failed to create user' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}