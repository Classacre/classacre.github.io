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
import { createEmbeddings } from "../../../lib/embeddings";
import { searchVectors } from "../../../lib/qdrant";
import { getPrisma } from "../../../lib/prisma";

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

    // Build retrieval context from last user message
    let retrievalBlock = "";
    let contextMeta: Array<{ source_id: string; title: string; type: string; category?: string; score: number }> = [];
    try {
      const lastUser = [...parsed.messages].reverse().find((m) => m.role === "user")?.content ?? "";
      const queryText = String(lastUser || "").slice(0, 4000).trim();
      if (queryText) {
        const embeds = await createEmbeddings(queryText);
        const vector = embeds?.[0];
        if (Array.isArray(vector) && vector.length) {
          const filter: any = { must: [{ key: "user_id", match: { value: userId } }] };
          const results: any = await searchVectors({ vector, topK: 6, filter });
          const hits: Array<any> = Array.isArray(results) ? results : (results?.result ?? []);
          if (hits?.length) {
            const prisma = await getPrisma();
            const sourceIds = Array.from(new Set(hits.map((h: any) => h?.payload?.source_id))).filter(Boolean);
            const titleMap: Record<string, { title: string; type: string }> = {};
            if (sourceIds.length) {
              const rows = await prisma.sources.findMany({
                where: { id: { in: sourceIds } },
                select: { id: true, title: true, type: true },
              });
              for (const r of rows) titleMap[r.id] = { title: r.title, type: r.type as any };
            }
            const lines: string[] = [];
            contextMeta = hits.map((h: any) => {
              const p = h?.payload ?? {};
              const sid = String(p?.source_id ?? "");
              const t = titleMap[sid]?.title ?? (p?.title ?? p?.source_title ?? "Source");
              const ty = titleMap[sid]?.type ?? "";
              const cat = p?.category ?? "";
              const sc = Number(h?.score ?? 0);
              lines.push(`- [${t}]${cat ? ` (${cat})` : ""} • score=${sc.toFixed(3)}`);
              return { source_id: sid, title: t, type: ty, category: cat || undefined, score: sc };
            });
            retrievalBlock =
              "Retrieved context (top matches):\n" +
              lines.join("\n") +
              "\nUse these references to answer. If insufficient, ask a brief follow‑up.\n";
          }
        }
      }
    } catch (e) {
      console.warn("[chat/retrieval] failed", e);
    }

    const systemPrompt =
      "You are Legaci — warm, respectful, privacy‑first. Keep answers concise and clear. " +
      "Only request sensitive info with explicit consent. Prefer follow‑ups when context is sparse.";

    const modelMessages = [
      { role: "system", content: systemPrompt },
      ...(retrievalBlock ? [{ role: "system", content: retrievalBlock }] : []),
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
          // Emit retrieval context first for richer UX panels
          if (Array.isArray(contextMeta) && contextMeta.length > 0) {
            const cmeta = JSON.stringify({ context: contextMeta });
            controller.enqueue(encoder.encode(`[CONTEXT]${cmeta}\n\n`));
          }
          if (toolResults.length > 0) {
            const meta = JSON.stringify({ toolResults });
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