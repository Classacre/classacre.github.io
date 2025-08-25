/**
 * backend/src/app/api/voice/clone/route.ts
 *
 * Endpoint to initiate a voice cloning job.
 * - Requires authenticated session
 * - Accepts JSON body: { voiceProfileId: string, sourceId?: string }
 * - Enqueues a background job (BullMQ queue "voice-clone") which performs provider calls
 *   and updates the `voice_profiles` row with provider/voice_id when complete.
 *
 * This file intentionally enqueues a job and returns immediately so long-running provider
 * calls are handled by the worker process.
 */
import { z } from 'zod';
import { requireSession } from '../../../../lib/session';
import { getPrisma } from '../../../../lib/prisma';
import { Queue } from 'bullmq';
import IORedis from 'ioredis';
import { v4 as uuidv4 } from 'uuid';

const BodySchema = z.object({
  voiceProfileId: z.string().min(1),
  sourceId: z.string().optional(),
});

const REDIS_URL = process.env.REDIS_URL || process.env.UPSTASH_REDIS_REST_URL || '';

export async function POST(req: Request) {
  try {
    // require authenticated user
    const { user } = await requireSession(req as any);
    if (!user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { 'Content-Type': 'application/json' } });
    }

    const body = await req.json();
    const { voiceProfileId, sourceId } = BodySchema.parse(body);

    const prisma = await getPrisma();

    // Verify voice profile exists and belongs to user
    const vp = await prisma.voice_profiles.findUnique({
      where: { id: voiceProfileId },
    });

    if (!vp || vp.user_id !== user.id) {
      return new Response(JSON.stringify({ error: 'Voice profile not found' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
    }

    // Optionally validate provided sourceId belongs to the user
    let src = null;
    if (sourceId) {
      src = await prisma.sources.findUnique({ where: { id: sourceId } });
      if (!src || src.user_id !== user.id) {
        return new Response(JSON.stringify({ error: 'Source not found or not owned by user' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
      }
    }

    // Enqueue a background voice clone job (worker will perform provider integration)
    const connection = REDIS_URL ? new IORedis(REDIS_URL) : new IORedis();
    const queue = new Queue('voice-clone', { connection });

    const jobId = uuidv4();
    await queue.add(
      'voice-clone',
      {
        jobId,
        userId: user.id,
        voiceProfileId,
        sourceId: sourceId ?? null,
      },
      { jobId }
    );

    // Update voice_profiles to indicate cloning is in progress
    await prisma.voice_profiles.update({
      where: { id: voiceProfileId },
      data: { provider: 'pending', voice_id: '' },
    });

    return new Response(JSON.stringify({ ok: true, enqueued: true, jobId, voiceProfileId }), {
      status: 202,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    console.error('[voice/clone] error', err);
    return new Response(JSON.stringify({ error: err?.message || 'Failed to initiate voice cloning' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}