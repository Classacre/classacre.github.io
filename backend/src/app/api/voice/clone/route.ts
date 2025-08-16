// backend/src/app/api/voice/clone/route.ts
import { getPrisma } from '../../../../lib/prisma';
import { z } from 'zod';

const BodySchema = z.object({
  userId: z.string(),
});

export async function POST(request: Request) {
  try {
    const prisma = await getPrisma();
    const { userId } = BodySchema.parse(await request.json());

    // Check if user has consented to voice cloning
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { consentGiven: true },
    });

    if (!user || !user.consentGiven) {
      return new Response(JSON.stringify({ error: 'Voice cloning consent not granted' }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Proceed with voice cloning logic
    // Add the actual voice cloning implementation here

    return new Response(JSON.stringify({ message: 'Voice cloning initiated successfully' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('[voice/clone] error', error);
    return new Response(JSON.stringify({ error: error.message || 'Failed to initiate voice cloning' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}