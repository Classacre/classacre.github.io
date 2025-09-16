/**
 * backend/src/app/api/chat/route.ts
 *
 * Streaming chat route with lightweight tool-hook support.
 * - Calls OpenRouter (via backend/src/lib/openrouter.ts)
 * - After receiving assistant text, scans for inline tool calls:
 *     <<tool:upsert_trait>{"userId":"...","category":"...","key":"...","value_json":{...}}</>
 *     <<tool:log_source>{"userId":"...","type":"chat","title":"...","content":"..."}</>
 *     <<tool:request_followups>{"userId":"...","maxQuestions":2}</>
 * - Executes tool calls via backend/src/lib/tools.ts and returns a streaming text response
 *   prefixed with a [TOOL_RESULTS] JSON line if any tools ran.
 */
import { z } from "zod";
import openai from "../../../lib/openrouter";
import { requireSession } from "../../../lib/session";

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

    // Require auth; derive user id for tools and retrieval
    const { session, user } = await requireSession(req as any);
    const userId: string = (session as any)?.user_id || (user as any)?.id;

    const systemPrompt =
      "You are Legaci — warm, respectful, privacy‑first. Keep answers concise and clear. " +
      "Only request sensitive info with explicit consent. Prefer follow‑ups when context is sparse.";

    const modelMessages = [
      { role: "system", content: systemPrompt },
      ...parsed.messages.map((m: any) => ({ role: m.role, content: String(m.content) })),
    ];

    // Default per requirements: Anthropic Sonnet via OpenRouter; configurable via CHAT_MODEL
    const model = process.env.CHAT_MODEL || "anthropic/claude-3.5-sonnet";
    const completion = await (openai as any).chat.completions.create({
      model,
      messages: modelMessages,
      // Could set stream: true later; for now we chunk the full text into a ReadableStream
    });

    const assistantText =
      completion?.choices?.[0]?.message?.content ??
      (typeof completion === "string" ? completion : "") ??
      "";

    // Parse inline tool calls of the form <<tool:name>{json}</>
    const toolRegex = /<<tool:([a-zA-Z_]+)>([\s\S]*?)<\\\/>/g;
    const calls: { name: string; payload: any }[] = [];
    let match: RegExpExecArray | null;
    while ((match = toolRegex.exec(assistantText)) !== null) {
      const name = match[1];
      try {
        const payload = JSON.parse(match[2]);
        calls.push({ name, payload });
      } catch (e) {
        console.warn("[chat/route] invalid tool payload", e);
      }
    }

    const toolResults: any[] = [];
    if (calls.length > 0) {
      const tools = await import("../../../lib/tools");
      for (const c of calls) {
        try {
          // Enforce current user id; ignore any userId passed from the model
          const payload = { ...(c.payload || {}), userId };
          if (c.name === "upsert_trait") {
            const r = await (tools as any).upsertTrait(payload);
            toolResults.push({ tool: c.name, result: r });
          } else if (c.name === "log_source") {
            const r = await (tools as any).logSource(payload);
            toolResults.push({ tool: c.name, result: r });
          } else if (c.name === "request_followups") {
            const r = await (tools as any).requestFollowups(payload);
            toolResults.push({ tool: c.name, result: r });
          } else {
            toolResults.push({ tool: c.name, error: "unknown tool" });
          }
        } catch (err: any) {
          toolResults.push({ tool: c.name, error: err?.message ?? String(err) });
        }
      }
    }

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          if (toolResults.length > 0) {
            const meta = JSON.stringify({ toolResults });
            // Emit a robust prefix line for parsers, include a blank line after meta
            controller.enqueue(encoder.encode(`[TOOL_RESULTS]${meta}\n\n`));
          }
          const chunkSize = 256;
          for (let i = 0; i < assistantText.length; i += chunkSize) {
            const part = assistantText.slice(i, i + chunkSize);
            controller.enqueue(encoder.encode(part));
          }
          controller.close();
        } catch (e) {
          controller.error(e);
        }
      },
    });
    
    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
        "X-Accel-Buffering": "no"
      },
    });
  } catch (err: any) {
    console.error("[chat/route] error", err);
    const status = err?.message === "Unauthorized" ? 401 : 500;
    return new Response(JSON.stringify({ error: err?.message ?? "Failed" }), {
      status,
      headers: { "Content-Type": "application/json" },
    });
  }
}