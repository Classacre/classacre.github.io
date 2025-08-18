/**
 * backend/src/app/api/voice/speak/route.ts
 *
 * ElevenLabs TTS integration (server-side proxy/stream).
 *
 * - Requires ELEVENLABS_API_KEY in environment (xi-api-key header).
 * - Optional ELEVENLABS_VOICE_ID to pick a voice; defaults to a common voice id.
 * - Streams audio binary directly from ElevenLabs to the client to enable the frontend
 *   visualizer to consume the audio stream or create an <audio> element.
 *
 * Security & privacy notes:
 * - Ensure ELEVENLABS_API_KEY is stored in a secure KMS / env in production.
 * - This proxy avoids exposing the API key to the browser.
 */

import { z } from "zod";

const BodySchema = z.object({
  text: z.string().min(1),
  voiceId: z.string().optional(),
});

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { text, voiceId: voiceFromBody } = BodySchema.parse(body);

    const apiKey = process.env.ELEVENLABS_API_KEY;
    if (!apiKey) {
      return new Response(JSON.stringify({ error: "TTS provider not configured (ELEVENLABS_API_KEY missing)" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    const voiceId = voiceFromBody || process.env.ELEVENLABS_VOICE_ID || "21m00Tcm4TlvDq8ikWAM";

    // ElevenLabs text-to-speech REST endpoint (returns binary audio)
    const url = `https://api.elevenlabs.io/v1/text-to-speech/${encodeURIComponent(voiceId)}`;

    // ElevenLabs uses 'xi-api-key' header for auth
    const resp = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "audio/mpeg, audio/wav, audio/*",
        "xi-api-key": apiKey,
      },
      body: JSON.stringify({
        text,
        // optional params can be added here (voice settings, stability, similarity_boost, etc.)
      }),
    });

    if (!resp.ok) {
      const errText = await resp.text().catch(() => "");
      console.error("[voice/speak] ElevenLabs error", resp.status, errText);
      return new Response(JSON.stringify({ error: "TTS provider error", details: errText }), {
        status: 502,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Stream the binary audio back to the client preserving content-type
    const contentType = resp.headers.get("content-type") ?? "audio/mpeg";
    const downstream = resp.body;
    if (!downstream) {
      return new Response(JSON.stringify({ error: "TTS provider returned no body" }), {
        status: 502,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(downstream, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "no-cache",
      },
    });
  } catch (err: any) {
    console.error("[voice/speak] unexpected error", err);
    return new Response(JSON.stringify({ error: err?.message ?? "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}