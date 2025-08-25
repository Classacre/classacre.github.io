/**
 * backend/src/app/api/voice/profiles/[id]/route.ts
 *
 * DELETE /api/voice/profiles/:id
 * - Requires authenticated session
 * - Verifies the voice_profile belongs to the user
 * - Enqueues a "voice-delete" background job that will call provider delete (best-effort)
 *   and purge local samples (worker handles heuristics).
 * - Returns 202 Accepted with jobId for tracking.
 */
import { NextResponse } from 'next/server';
import { requireSession } from '../../../../lib/session';
import { getPrisma } from '../../../../lib/prisma';
import { Queue } from 'bullmq';
import IORedis from 'ioredis';
import { v4 as uuidv4 } from 'uuid';

const REDIS_URL = process.env.REDIS_URL || process.env.UPSTASH_REDIS_REST_URL || '';

export async function DELETE(req: Request) {
  try {
    const { user } = await requireSession(req as any);
    if (!user) {
      return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { 'Content-Type': 'application/json' } });
    }

    // Extract id from URL path
    const url = new URL(req.url);
    const pathParts = url.pathname.split('/');
    const id = pathParts[pathParts.length - 1];
    if (!id) {
      return new NextResponse(JSON.stringify({ error: 'Missing voice profile id' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    const prisma = await getPrisma();
    const vp = await prisma.voice_profiles.findUnique({ where: { id } });
    if (!vp || vp.user_id !== user.id) {
      return new NextResponse(JSON.stringify({ error: 'Voice profile not found' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
    }

    // Enqueue background deletion job handled by worker/voiceWorker.ts
    const connection = REDIS_URL ? new IORedis(REDIS_URL) : new IORedis();
    const queue = new Queue('voice-delete', { connection });
    const jobId = uuidv4();
    await queue.add(
      'voice-delete',
      {
        jobId,
        voiceProfileId: id,
        userId: user.id,
      },
      { jobId }
    );

    // Mark voice_profile as pending-delete to avoid further usage (optional)
    await prisma.voice_profiles.update({
      where: { id },
      data: { provider: vp.provider ?? 'pending-delete' },
    });

    return new NextResponse(JSON.stringify({ ok: true, enqueued: true, jobId }), {
      status: 202,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    if ((err as Error).message === 'Unauthorized') {
      return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { 'Content-Type': 'application/json' } });
    }
    console.error('[voice/profiles/delete] error', err);
    return new NextResponse(JSON.stringify({ error: err?.message || 'Failed to enqueue deletion' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}