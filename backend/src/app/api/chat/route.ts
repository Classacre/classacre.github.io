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

    const systemPrompt = "You are Legaci, a warm, privacy-first assistant. Answer concisely.";

    const modelMessages = [
      { role: "system", content: systemPrompt },
      ...parsed.messages.map((m: any) => ({ role: m.role, content: String(m.content) })),
    ];

    const model = process.env.CHAT_MODEL || "gpt-4o-mini";
    const completion = await openai.chat.completions.create({
      model,
      messages: modelMessages,
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
          if (c.name === "upsert_trait") {
            const r = await tools.upsertTrait(c.payload);
            toolResults.push({ tool: c.name, result: r });
          } else if (c.name === "log_source") {
            const r = await tools.logSource(c.payload);
            toolResults.push({ tool: c.name, result: r });
          } else if (c.name === "request_followups") {
            const r = await tools.requestFollowups(c.payload);
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
            controller.enqueue(encoder.encode(`[TOOL_RESULTS]${meta}\n`));
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
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  } catch (err: any) {
    console.error("[chat/route] error", err);
    return new Response(JSON.stringify({ error: err?.message ?? "Failed" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}