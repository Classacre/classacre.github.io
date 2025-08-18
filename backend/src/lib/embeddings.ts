/**
 * backend/src/lib/embeddings.ts
 *
 * Small wrapper around the OpenRouter/OpenAI client to create embeddings.
 *
 * Environment:
 * - OPENROUTER_API_KEY or OPENAI_API_KEY (openrouter wrapper uses OPENROUTER_API_KEY in backend/src/lib/openrouter.ts)
 * - EMBEDDING_MODEL (e.g., "voyageai/voyage-2" or "text-embedding-3-large")
 *
 * Exports:
 * - createEmbeddings(texts: string[] | string): Promise<number[][]>
 *
 * Note: This module is intentionally minimal so it can be replaced depending on
 * which embedding provider/model you choose.
 */

import openai from "./openrouter";

export async function createEmbeddings(input: string | string[], model?: string) {
  const texts = Array.isArray(input) ? input : [input];
  const modelName = model || process.env.EMBEDDING_MODEL || "text-embedding-3-large";

  // openai (OpenRouter wrapper) compatibility: call embeddings.create
  // The exact SDK method may vary; this code uses the standard OpenAI shape and should
  // work with the openrouter "openai" wrapper exposing embeddings.create.
  const resp = await (openai as any).embeddings.create({
    model: modelName,
    input: texts,
  });

  // Normalize response -> array of vectors
  // Response shape: { data: [{embedding: number[], index: 0}, ...] }
  const vectors: number[][] = (resp?.data ?? []).map((d: any) => d.embedding ?? d.vector ?? []);
  return vectors;
}