/**
 * backend/src/app/api/embeddings/status/[id]/route.ts
 *
 * Simple status endpoint for embedding jobs enqueued in the BullMQ "embeddings" queue.
 * Returns job state, progress and result (when available).
 *
 * GET /api/embeddings/status/:id
 */

import { Queue } from "bullmq";
import IORedis from "ioredis";

export const runtime = "nodejs";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params?.id;
    if (!id) {
      return new Response(JSON.stringify({ error: "Missing job id" }), { status: 400, headers: { "Content-Type": "application/json" } });
    }

    const redisUrl = process.env.REDIS_URL || process.env.UPSTASH_REDIS_REST_URL || "";
    const connection = redisUrl ? new IORedis(redisUrl) : new IORedis();

    const queue = new Queue("embeddings", { connection });

    const job = await queue.getJob(id);
    if (!job) {
      return new Response(JSON.stringify({ error: "Job not found" }), { status: 404, headers: { "Content-Type": "application/json" } });
    }

    const state = await job.getState();
    const progress = job.progress;
    const returnvalue = job.returnvalue ?? null;
    const failedReason = job.failedReason ?? null;

    return new Response(JSON.stringify({ id, state, progress, returnvalue, failedReason }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    console.error("[embeddings/status] error", err);
    return new Response(JSON.stringify({ error: err?.message ?? "Failed to fetch job status" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}