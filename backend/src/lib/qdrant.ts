/**
 * backend/src/lib/qdrant.ts
 *
 * Minimal Qdrant client wrapper using @qdrant/js-client-rest.
 * Exposes upsertVectors and searchVectors helpers.
 *
 * Environment:
 * - QDRANT_URL (e.g. https://your-cluster.a.qdrant.cloud)
 * - QDRANT_API_KEY
 * - QDRANT_COLLECTION (collection name to use)
 */

import { QdrantClient } from "@qdrant/js-client-rest";

const QDRANT_URL = process.env.QDRANT_URL || "";
const QDRANT_API_KEY = process.env.QDRANT_API_KEY || "";
const COLLECTION = process.env.QDRANT_COLLECTION || "legaci_vectors";
const VECTOR_SIZE = Number(process.env.QDRANT_VECTOR_SIZE || 1536);

const client = new QdrantClient({
  url: QDRANT_URL,
  apiKey: QDRANT_API_KEY || undefined,
});

export async function ensureCollection() {
  try {
    const info = await client.getCollections();
    const exists = (info.collections || []).some((c: any) => c.name === COLLECTION);
    if (!exists) {
      await client.createCollection(COLLECTION, {
        vectors: {
          size: VECTOR_SIZE,
          distance: "Cosine",
        },
      });
    }
  } catch (err) {
    console.warn("Qdrant ensureCollection error", err);
  }
}

/**
 * Upsert multiple vectors into Qdrant.
 * points: Array<{id: string, vector: number[], payload?: Record<string, any>}>
 */
export async function upsertVectors(points: { id: string; vector: number[]; payload?: Record<string, any> }[]) {
  await ensureCollection();
  return client.upsert(COLLECTION, {
    points: points.map((p) => ({
      id: p.id,
      vector: p.vector,
      payload: p.payload ?? {},
    })),
  });
}

/**
 * Search top-k similar vectors with optional filter.
 * Returns the raw response from Qdrant.
 */
export async function searchVectors({
  vector,
  topK = 5,
  filter,
}: {
  vector: number[];
  topK?: number;
  filter?: any;
}) {
  await ensureCollection();
  return client.search(COLLECTION, {
    vector,
    limit: topK,
    filter,
  });
}