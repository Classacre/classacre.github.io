// backend/src/lib/jobs.ts
// Enqueue embedding jobs and shared helpers for the RAG pipeline.

import { Queue } from "bullmq";
import IORedis from "ioredis";
import { chunkText, ChunkOptions } from "./chunk";

const REDIS_URL = process.env.REDIS_URL || process.env.UPSTASH_REDIS_REST_URL || "";
const connection = REDIS_URL ? new IORedis(REDIS_URL) : new IORedis();

// Dedicated queue client for producers (API routes)
export const embeddingsQueue = new Queue("embeddings", { connection });

export interface EnqueueEmbeddingsParams {
  sourceId: string;
  userId: string;
  text: string;
  category?: string;
  chunkOptions?: ChunkOptions;
}

/**
 * Produce chunked texts and enqueue a job for the worker.
 * The plaintext is not persisted to DB; it only exists in the job payload.
 */
export async function enqueueEmbeddings({
  sourceId,
  userId,
  text,
  category,
  chunkOptions,
}: EnqueueEmbeddingsParams) {
  const chunks = chunkText(text, {
    maxChars: 1000,
    overlap: 200,
    minChars: 200,
    ...(chunkOptions || {}),
  });

  if (!chunks || chunks.length === 0) {
    return { ok: false, reason: "no_chunks" as const };
  }

  const job = await embeddingsQueue.add(
    "embed",
    {
      sourceId,
      userId,
      texts: chunks,
      category: category || null,
    },
    {
      removeOnComplete: true,
      removeOnFail: false,
      attempts: 2,
      backoff: { type: "exponential", delay: 2000 },
    }
  );

  return { ok: true, jobId: job.id, chunks: chunks.length };
}