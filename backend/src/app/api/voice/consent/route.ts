// backend/src/app/api/voice/consent/route.ts
import { getPrisma } from '../../../../lib/prisma';
import { z } from 'zod';

const BodySchema = z.object({
  userId: z.string(),
  consentGiven: z.boolean(),
});

export async function POST(request: Request) {
  try {
    const prisma = await getPrisma();
    const { userId, consentGiven } = BodySchema.parse(await request.json());

    // Update user's consent status
    // Assuming user model has a consentGiven field
    const user = await prisma.user.update({
      where: { id: userId },
      data: { consentGiven },
    });

    return new Response(JSON.stringify({ message: 'Consent updated successfully' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('[voice/consent] error', error);
    return new Response(JSON.stringify({ error: error.message || 'Failed to update consent' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}