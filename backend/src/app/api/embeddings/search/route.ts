// backend/src/app/api/embeddings/search/route.ts
import { z } from "zod";
import { requireSession } from "../../../../lib/session";
import { createEmbeddings } from "../../../../lib/embeddings";
import { searchVectors } from "../../../../lib/qdrant";
import { getPrisma } from "../../../../lib/prisma";
import { decryptEnvelope } from "../../../../lib/crypto";

export const runtime = "nodejs";

const BodySchema = z.object({
  query: z.string().min(1),
  topK: z.number().int().min(1).max(50).optional(),
  category: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const { session } = await requireSession(request as any);
    const userId: string = (session as any).user_id;

    const body = await request.json();
    const { query, topK = 8, category } = BodySchema.parse(body);

    // 1) Embed the query text
    const vectors = await createEmbeddings(query);
    const vector = vectors?.[0];
    if (!vector || !Array.isArray(vector) || vector.length === 0) {
      return new Response(JSON.stringify({ error: "Failed to embed query" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    // 2) Build Qdrant filter to scope results to user (and optional category)
    const filter: any = {
      must: [
        { key: "user_id", match: { value: userId } },
      ],
    };
    if (category) {
      filter.must.push({ key: "category", match: { value: category } });
    }

    // 3) Search vectors
    const res: any = await searchVectors({ vector, topK, filter });

    // Shape: res is an array of scored points for js-client-rest (depending on version)
    const hits: Array<{
      id: string | number;
      score: number;
      payload?: Record<string, any>;
    }> = Array.isArray(res) ? res : (res?.result ?? []);

    // 4) Hydrate source info + decrypt content for UI snippet
    const prisma = await getPrisma();

    const results = await Promise.all(
      hits.map(async (h) => {
        const payload = h?.payload ?? {};
        const sourceId = payload.source_id as string | undefined;
        let sourceMeta: any = null;
        let plaintext: string | null = null;

        if (sourceId) {
          const src = await prisma.sources.findUnique({
            where: { id: sourceId },
            select: {
              id: true,
              title: true,
              type: true,
              iv: true,
              content_encrypted: true,
              created_at: true,
            },
          });

          if (src) {
            sourceMeta = {
              id: src.id,
              title: src.title,
              type: src.type,
              created_at: src.created_at,
            };
            // decrypt envelope for content snippet
            try {
              const iv = src.iv;
              const hex = Buffer.from(src.content_encrypted).toString("hex");
              const text = await decryptEnvelope(iv, hex);
              plaintext = text || null;
            } catch {
              plaintext = null;
            }
          }
        }

        return {
          id: String(h.id),
          score: h.score,
          payload,
          source: sourceMeta,
          text: plaintext,
        };
      })
    );

    return new Response(
      JSON.stringify({
        ok: true,
        count: results.length,
        results,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err: any) {
    const status = err?.message === "Unauthorized" ? 401 : 500;
    return new Response(JSON.stringify({ error: err?.message || "Search failed" }), {
      status,
      headers: { "Content-Type": "application/json" },
    });
  }
}