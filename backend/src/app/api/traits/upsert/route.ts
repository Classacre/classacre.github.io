// backend/src/app/api/traits/upsert/route.ts
import { getPrisma } from '../../../../lib/prisma';
import { z } from 'zod';

const BodySchema = z.object({
  userId: z.string(),
  category: z.string(),
  key: z.string(),
  value_json: z.any(),
  confidence: z.number(),
  completeness: z.number(),
  provenance: z.string(),
});

export async function POST(request: Request) {
  try {
    const prisma = await getPrisma();
    const body = await request.json();
    const { userId, category, key, value_json, confidence, completeness, provenance } = BodySchema.parse(body);

    const trait = await prisma.traits.upsert({
      where: {
        user_id_category_key: {
          user_id: userId,
          category: category,
          key: key,
        },
      },
      update: {
        value_json: value_json,
        confidence: confidence,
        completeness: completeness,
        provenance: provenance,
        updated_at: new Date(),
      },
      create: {
        user_id: userId,
        category: category,
        key: key,
        value_json: value_json,
        confidence: confidence,
        completeness: completeness,
        provenance: provenance,
      },
    });

    return new Response(JSON.stringify({ message: 'Trait upserted successfully', trait }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('[traits/upsert] error', error);
    return new Response(JSON.stringify({ error: error.message || 'Failed to upsert trait' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}