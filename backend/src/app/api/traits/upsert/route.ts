// backend/src/app/api/traits/upsert/route.ts
import { getPrisma } from '../../../../lib/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      userId,
      category,
      key,
      value_json,
      confidence,
      completeness,
      provenance,
      source_id,
    } = body as {
      userId: string;
      category: string;
      key: string;
      value_json: any;
      confidence: number;
      completeness: number;
      provenance: string;
      source_id?: string | null;
    };

    if (!userId || !category || !key) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    const prisma = await getPrisma();

    // Try to find existing trait by user + category + key
    const existing = await prisma.traits.findFirst({
      where: {
        user_id: userId,
        category,
        key,
      },
    });

    let trait;
    if (existing) {
      trait = await prisma.traits.update({
        where: { id: existing.id },
        data: {
          value_json,
          confidence,
          completeness,
          provenance,
          source_id: source_id ?? undefined,
          // updated_at is handled by @updatedAt
        },
      });
    } else {
      trait = await prisma.traits.create({
        data: {
          user_id: userId,
          category,
          key,
          value_json,
          confidence,
          completeness,
          provenance,
          source_id: source_id ?? undefined,
        },
      });
    }

    return new Response(JSON.stringify({ trait }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('[traits/upsert] error', error);
    return new Response(JSON.stringify({ error: 'Failed to upsert trait' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}