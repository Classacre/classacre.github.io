// backend/src/app/api/traits/upsert/route.ts
import { getPrisma } from '../../../../lib/prisma';
import { z } from 'zod';
import { encrypt } from '../../../../lib/crypto';
import { requireSession } from '../../../../lib/session';

const BodySchema = z.object({
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
    const { session } = await requireSession(request as any);
    const userId: string = (session as any).user_id;
    const body = await request.json();
    const { category, key, value_json, confidence, completeness, provenance } = BodySchema.parse(body);

    // Encrypt the JSON payload and store an envelope in the Json column.
    // The Prisma schema stores `value_json` as Json so we persist { iv, ciphertext }.
    const { iv, encryptedData } = await encrypt(JSON.stringify(value_json));
    const envelope = { iv, ciphertext: encryptedData };
    
    const trait = await prisma.traits.upsert({
      where: {
        user_id_category_key: {
          user_id: userId,
          category: category,
          key: key,
        },
      },
      update: {
        // store envelope object in the Json column
        value_json: envelope as any,
        confidence: confidence,
        completeness: completeness,
        provenance: provenance,
        updated_at: new Date(),
      },
      create: {
        user_id: userId,
        category: category,
        key: key,
        // store envelope object in the Json column
        value_json: envelope as any,
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