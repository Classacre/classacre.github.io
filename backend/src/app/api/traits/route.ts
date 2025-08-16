// backend/src/app/api/traits/route.ts
import { getPrisma } from '../../../../src/lib/prisma';
import { z } from 'zod';

const QuerySchema = z.object({
  category: z.string(),
});

export async function GET(request: Request) {
  try {
    const prisma = await getPrisma();
    const { searchParams } = new URL(request.url);
    const { category } = QuerySchema.parse(Object.fromEntries(searchParams));

    const traits = await prisma.traits.findMany({
      where: {
        category: category,
      },
    });

    return new Response(JSON.stringify({ traits }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('[traits/route] error', error);
    return new Response(JSON.stringify({ error: error.message || 'Failed to get traits' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}