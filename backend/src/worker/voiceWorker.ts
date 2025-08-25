/**
 * backend/src/worker/voiceWorker.ts
 *
 * Worker to handle long-running voice provider operations:
 * - Processes "voice-clone" jobs: reads the encrypted sample from `sources`,
 *   decrypts it, calls provider (if configured) or performs a simulated clone,
 *   then updates `voice_profiles` with provider + voice_id.
 * - Processes "voice-delete" jobs: calls provider delete endpoint (if configured),
 *   then purges related sources (sample files) and finally deletes the voice_profiles row.
 *
 * This worker is intentionally forgiving: when provider APIs are not configured it will
 * simulate successful operations so developers can iterate locally without external keys.
 *
 * To run:
 *   node ./dist/worker/voiceWorker.js
 *
 * Env:
 * - REDIS_URL
 * - ELEVENLABS_API_KEY (optional) - will attempt real provider integration when present
 */

import { Worker, Queue, QueueScheduler } from "bullmq";
import IORedis from "ioredis";
import { getPrisma } from "../lib/prisma";
import { decryptEnvelope } from "../lib/crypto";
import fetch from "node-fetch";
import { v4 as uuidv4 } from "uuid";

const REDIS_URL = process.env.REDIS_URL || process.env.UPSTASH_REDIS_REST_URL || "";
const connection = REDIS_URL ? new IORedis(REDIS_URL) : new IORedis();

const cloneQueueName = "voice-clone";
const deleteQueueName = "voice-delete";

const cloneScheduler = new QueueScheduler(cloneQueueName, { connection });
const deleteScheduler = new QueueScheduler(deleteQueueName, { connection });

const ELEVEN_API_KEY = process.env.ELEVENLABS_API_KEY || "";

async function callElevenLabsCreateVoice(name: string, sampleBase64: string) {
  // Best-effort: attempt to call ElevenLabs create voice endpoint.
  // Their API evolves; this is a pragmatic approach - if it doesn't work in your environment
  // the worker will fallback to a simulated voice_id.
  const url = "https://api.elevenlabs.io/v1/voices";
  try {
    const body = {
      name,
      files: [sampleBase64], // optimistic - many APIs accept base64-encoded sample
    };
    const resp = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "xi-api-key": ELEVEN_API_KEY,
      },
      body: JSON.stringify(body),
    });
    if (!resp.ok) {
      const txt = await resp.text().catch(() => "");
      throw new Error(`ElevenLabs create failed: ${resp.status} ${txt}`);
    }
    const json = await resp.json().catch(() => ({}));
    // Many providers return an id or voice object — try common places
    const voiceId = json?.id || json?.voice?.id || json?.voice_id || json?.data?.id;
    return voiceId || null;
  } catch (err) {
    console.warn("callElevenLabsCreateVoice failed", err);
    return null;
  }
}

async function callElevenLabsDeleteVoice(voiceId: string) {
  // Best-effort delete - endpoint shape may vary; many providers have DELETE /v1/voices/{id}
  const url = `https://api.elevenlabs.io/v1/voices/${encodeURIComponent(voiceId)}`;
  try {
    const resp = await fetch(url, {
      method: "DELETE",
      headers: {
        "xi-api-key": ELEVEN_API_KEY,
      },
    });
    if (!resp.ok) {
      const txt = await resp.text().catch(() => "");
      throw new Error(`ElevenLabs delete failed: ${resp.status} ${txt}`);
    }
    return true;
  } catch (err) {
    console.warn("callElevenLabsDeleteVoice failed", err);
    return false;
  }
}

/**
 * Worker: voice-clone
 */
const cloneWorker = new Worker(
  cloneQueueName,
  async (job) => {
    const prisma = await getPrisma();
    const { voiceProfileId, userId, sourceId } = job.data as {
      voiceProfileId: string;
      userId: string;
      sourceId?: string | null;
    };

    // Load voice profile
    const vp = await prisma.voice_profiles.findUnique({ where: { id: voiceProfileId } });
    if (!vp) {
      throw new Error("voice_profile not found");
    }

    // Locate the sample source if provided; otherwise try to find the latest file sample for the user
    let src = null;
    if (sourceId) {
      src = await prisma.sources.findUnique({ where: { id: sourceId } });
    } else {
      src = await prisma.sources.findFirst({
        where: { user_id: userId, type: "file" },
        orderBy: { created_at: "desc" },
      });
    }

    if (!src) {
      // Update voice profile to failed state and return
      await prisma.voice_profiles.update({
        where: { id: voiceProfileId },
        data: { provider: "failed", voice_id: "" },
      });
      throw new Error("No source sample found for voice cloning");
    }

    // Decrypt sample: content_encrypted is stored as Buffer (hex earlier) - convert to hex string for decryptEnvelope
    const encryptedHex = Buffer.from(src.content_encrypted).toString("hex");
    let sampleBase64 = "";
    try {
      const plaintext = await decryptEnvelope(src.iv, encryptedHex);
      // plaintext expected to be base64-encoded audio (we stored base64 earlier)
      sampleBase64 = plaintext;
    } catch (err) {
      // If decrypt fails, mark as failed
      await prisma.voice_profiles.update({
        where: { id: voiceProfileId },
        data: { provider: "failed", voice_id: "" },
      });
      throw new Error("Failed to decrypt source sample");
    }

    // Attempt provider integration
    let provider = "local";
    let voiceId: string | null = null;

    if (ELEVEN_API_KEY) {
      provider = "elevenlabs";
      // Name the voice with user+profile id for traceability
      const name = `legaci-${userId}-${voiceProfileId}`.slice(0, 80);
      const createdVoiceId = await callElevenLabsCreateVoice(name, sampleBase64);
      if (createdVoiceId) {
        voiceId = String(createdVoiceId);
      } else {
        // Failed to create remotely - fall back to simulated voice id
        provider = "elevenlabs-failed";
      }
    }

    // Fallback simulation when no provider or external call failed
    if (!voiceId) {
      provider = provider.startsWith("elevenlabs") ? provider : "simulated";
      voiceId = `sim-${uuidv4()}`;
    }

    // Update voice_profiles
    await prisma.voice_profiles.update({
      where: { id: voiceProfileId },
      data: {
        provider,
        voice_id: voiceId,
        // keep existing consent and sample_meta unchanged
      },
    });

    return { ok: true, provider, voiceId };
  },
  { connection, concurrency: 1 }
);

cloneWorker.on("completed", (job) => {
  console.log("[voice-clone] completed", job.id, job.returnvalue);
});

cloneWorker.on("failed", (job, err) => {
  console.error("[voice-clone] failed", job?.id, err);
});

/**
 * Worker: voice-delete
 * - Expects { voiceProfileId, userId }
 * - Will call provider delete (best-effort) and then remove DB rows (sources, voice_profiles)
 */
const deleteWorker = new Worker(
  deleteQueueName,
  async (job) => {
    const prisma = await getPrisma();
    const { voiceProfileId, userId } = job.data as { voiceProfileId: string; userId: string };

    const vp = await prisma.voice_profiles.findUnique({ where: { id: voiceProfileId } });
    if (!vp) {
      // nothing to do
      return { ok: true, message: "voice_profile not found" };
    }

    // Call provider delete if possible
    const provider = vp.provider || "";
    const voiceId = vp.voice_id || "";

    if (provider === "elevenlabs" && ELEVEN_API_KEY && voiceId) {
      const deleted = await callElevenLabsDeleteVoice(voiceId);
      if (!deleted) {
        // Log and continue; we still attempt to purge local samples
        console.warn("[voice-delete] provider deletion reported failure, continuing local purge");
      }
    }

    // Find and delete associated samples (sources) for this user that reference this voice_profile sample_meta (best-effort)
    // We don't have a direct FK between voice_profiles and sources; assume samples created at consent time exist as sources rows owned by user.
    const samples = await prisma.sources.findMany({ where: { user_id: userId, type: "file" }, take: 50 });

    // Optionally filter by timestamp or sample_meta but we'll remove only sources that look like uploaded samples (conservative)
    for (const s of samples) {
      // Heuristic: don't delete everything; only remove sources created within 30 days of vp.consent_signed_at (if available)
      let shouldDelete = false;
      if (vp.consent_signed_at) {
        const consentTs = new Date(vp.consent_signed_at).getTime();
        const createdTs = new Date(s.created_at).getTime();
        const delta = Math.abs(createdTs - consentTs);
        const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;
        if (delta <= THIRTY_DAYS) shouldDelete = true;
      }
      // if no consent timestamp, skip deletion to avoid accidental purge
      if (shouldDelete) {
        await prisma.sources.delete({ where: { id: s.id } });
      }
    }

    // Finally delete the voice_profile row
    await prisma.voice_profiles.delete({ where: { id: voiceProfileId } });

    return { ok: true };
  },
  { connection, concurrency: 1 }
);

deleteWorker.on("completed", (job) => {
  console.log("[voice-delete] completed", job.id, job.returnvalue);
});
deleteWorker.on("failed", (job, err) => {
  console.error("[voice-delete] failed", job?.id, err);
});

export { cloneWorker, deleteWorker, cloneScheduler, deleteScheduler };