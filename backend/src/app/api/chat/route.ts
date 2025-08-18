/**
 * backend/src/app/api/chat/route.ts
 *
 * Simple streaming chat route that proxies to the configured OpenRouter/OpenAI client.
 * For now this implementation calls the configured OpenAI client, retrieves the assistant
 * reply, and streams it back to the client in small chunks to simulate token streaming.
 *
 * Future improvements:
 * - Use real streaming from the LLM provider (SSE / streaming responses) when available.
 * - Attach tool hooks (upsert_trait, log_source, request_followups) and RAG context.
 */

import { z } from "zod";
import openai from "../../../lib/openrouter";

export const runtime = "nodejs";

const BodySchema = z.object({
  messages: z.array(
    z.object({
      role: z.string(),
      content: z.any(),
    })
  ),
  mode: z.enum(["normal", "fill-gaps"]).optional(),
  speak: z.boolean().optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = BodySchema.parse(body);

    // Build system prompt (minimal here; expand with SAFETY / persona later)
    const systemPrompt = "You are Legaci, a warm, privacy-first assistant. Answer concisely.";

    // Compose messages for the model
    const modelMessages = [
      { role: "system", content: systemPrompt },
      ...parsed.messages.map((m: any) => ({ role: m.role, content: String(m.content) })),
    ];

    // Call the configured OpenRouter/OpenAI client
    // This code uses the official OpenAI client configured in backend/src/lib/openrouter.ts
    // Note: model selection can be changed via env/config
    const model = process.env.CHAT_MODEL || "gpt-4o-mini";
    const completion = await openai.chat.completions.create({
      model,
      messages: modelMessages,
    });

    // Extract assistant text (best-effort)
    const assistantText =
      completion?.choices?.[0]?.message?.content ??
      (typeof completion === "string" ? completion : "") ??
      "";

    // Stream back the assistant text in small chunks
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      start(controller) {
        try {
          const chunkSize = 256;
          for (let i = 0; i < assistantText.length; i += chunkSize) {
            const part = assistantText.slice(i, i + chunkSize);
            controller.enqueue(encoder.encode(part));
          }
          controller.close();
        } catch (err) {
          controller.error(err);
        }
      },
    });

    return new Response(stream, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  } catch (error: any) {
    console.error("[chat/route] error", error);
    return new Response(JSON.stringify({ error: error?.message ?? "Failed to generate chat response" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}