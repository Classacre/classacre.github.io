/**
 * backend/src/worker/embeddingsWorker.ts
 *
 * BullMQ worker that creates embeddings and upserts them into Qdrant, then records
 * embedding metadata in Postgres (via Prisma).
 *
 * Expected environment:
 * - REDIS_URL (for BullMQ connection)
 * - QDRANT_URL, QDRANT_API_KEY, QDRANT_COLLECTION
 * - EMBEDDING_MODEL (optional)
 *
 * Note: Install dependencies in backend:
 *   pnpm -C backend add bullmq ioredis
 *
 * Run this worker as a separate process (node or ts-node) in production:
 *   node ./dist/worker/embeddingsWorker.js
 */

import { Worker, Queue, QueueScheduler } from "bullmq";
import IORedis from "ioredis";
import { createEmbeddings } from "../lib/embeddings";
import { upsertVectors } from "../lib/qdrant";
import { getPrisma } from "../lib/prisma";
import { v4 as uuidv4 } from "uuid";

const REDIS_URL = process.env.REDIS_URL || process.env.UPSTASH_REDIS_REST_URL || "";

if (!REDIS_URL) {
  console.warn("REDIS_URL is not set. Worker will not start.");
}

const connection = REDIS_URL ? new IORedis(REDIS_URL) : new IORedis();

const queueName = "embeddings";
const queue = new Queue(queueName, { connection });
const scheduler = new QueueScheduler(queueName, { connection });

// Define worker
const worker = new Worker(
  queueName,
  async (job) => {
    const prisma = await getPrisma();
    const { sourceId, userId, texts, category } = job.data as {
      sourceId: string;
      userId: string;
      texts: string[]; // array of chunks
      category?: string;
    };

    // Create embeddings in batches
    const vectors = await createEmbeddings(texts);

    // Build points for Qdrant
    const points = vectors.map((vec: number[], idx: number) => ({
      id: `${sourceId}::${idx}::${uuidv4()}`,
      vector: vec,
      payload: {
        user_id: userId,
        source_id: sourceId,
        category: category ?? null,
        chunk_index: idx,
      },
    }));

    // Upsert into Qdrant
    await upsertVectors(points);

    // Persist embedding refs in Postgres
    for (let i = 0; i < points.length; i++) {
      const p = points[i];
      await prisma.embeddings.create({
        data: {
          id: p.id,
          user_id: userId,
          vector_ref: p.id,
          source_id: sourceId,
          category: category ?? "",
          chunk_meta: { index: i },
        },
      });
    }

    return { ok: true, upserted: points.length };
  },
  { connection, concurrency: 2 }
);

worker.on("completed", async (job) => {
  console.log("Embedding job completed", job.id, job.returnvalue);
  try {
    const prisma = await getPrisma();
    await prisma.embedding_jobs.create({
      data: {
        job_id: String(job.id),
        user_id: (job.data as any)?.userId ?? null,
        source_id: (job.data as any)?.sourceId ?? null,
        status: "completed",
        result: job.returnvalue ?? {},
      },
    });
  } catch (e) {
    console.warn("Failed to persist embedding job completion", e);
  }
});
worker.on("failed", async (job, err) => {
  console.error("Embedding job failed", job?.id, err);
  try {
    const prisma = await getPrisma();
    await prisma.embedding_jobs.create({
      data: {
        job_id: String((job as any)?.id ?? ""),
        user_id: (job as any)?.data?.userId ?? null,
        source_id: (job as any)?.data?.sourceId ?? null,
        status: "failed",
        result: { error: String(err) },
      },
    });
  } catch (e) {
    console.warn("Failed to persist embedding job failure", e);
  }
});

export { queue, worker, scheduler };