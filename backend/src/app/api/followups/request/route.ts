// backend/src/app/api/followups/request/route.ts
import { getPrisma } from '../../../../lib/prisma';
import { z } from 'zod';

const BodySchema = z.object({
  userId: z.string(),
  category: z.string(),
  gaps: z.array(z.string()),
});

export async function POST(request: Request) {
  try {
    const prisma = await getPrisma();
    const { userId, category, gaps } = BodySchema.parse(await request.json());

    // TODO: Implement "Fill gaps" planner logic here
    const followups = [
      "What is your favorite memory from this category?",
      "Can you provide more detail about this topic?",
      "What are some of the challenges you have faced in this area?",
    ];

    return new Response(JSON.stringify({ message: 'Followups requested successfully', followups }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('[followups/request] error', error);
    return new Response(JSON.stringify({ error: error.message || 'Failed to request followups' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}