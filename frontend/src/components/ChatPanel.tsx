"use client";

import React, { useState, useRef } from "react";

/**
 * frontend/src/components/ChatPanel.tsx
 *
 * Streaming chat UI that posts to /api/chat and streams assistant tokens.
 * This version parses an initial "[TOOL_RESULTS]{...}\\n" line (if present) emitted
 * by the backend and surfaces those results in the UI.
 */

type Role = "system" | "user" | "assistant";

type ContextItem = {
  id: string;
  title?: string;
  category?: string;
  type?: string;
  score?: number;
  snippet?: string;
  source_id?: string;
  timestamp?: string;
};

export default function ChatPanel() {
  const [messages, setMessages] = useState<{ role: Role; content: string }[]>([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [mode, setMode] = useState<"normal" | "fill-gaps">("normal");
  const [speak, setSpeak] = useState(false);
  const [toolResults, setToolResults] = useState<unknown[] | null>(null);
  const [contextItems, setContextItems] = useState<ContextItem[] | null>(null);
  const [previews, setPreviews] = useState<Record<string, { open: boolean; loading: boolean; data?: any; error?: string }>>({});
  const abortRef = useRef<AbortController | null>(null);

  async function sendMessage() {
    const content = input.trim();
    if (!content) return;
    setMessages((m) => [...m, { role: "user", content }]);
    setInput("");
    setIsStreaming(true);
    setToolResults(null);
    setContextItems(null);

    if (abortRef.current) {
      try {
        abortRef.current.abort();
      } catch {}
    }
    const ac = new AbortController();
    abortRef.current = ac;

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [{ role: "user", content }], mode, speak }),
        signal: ac.signal,
      });

      if (!res.ok || !res.body) {
        const text = await res.text().catch(() => "Assistant error");
        setMessages((m) => [...m, { role: "assistant", content: `Error: ${text}` }]);
        setIsStreaming(false);
        return;
      }

      // add assistant placeholder
      setMessages((m) => [...m, { role: "assistant", content: "" }]);

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let done = false;
      let firstChunk = true;
      let prefixBuffer = "";

      while (!done) {
        const { value, done: d } = await reader.read();
        done = d;
        if (value) {
          const chunk = decoder.decode(value, { stream: !done });
          if (firstChunk) {
            // Accumulate and process any number of prefixed metadata lines in any order.
            prefixBuffer += chunk;

            // Attempt to consume [CONTEXT] and [TOOL_RESULTS] lines if fully received (newline-terminated)
            const tryConsumePrefixLine = (prefix: string, onJSON: (obj: any) => void): boolean => {
              if (!prefixBuffer.startsWith(prefix)) return false;
              const nl = prefixBuffer.indexOf("\n");
              if (nl === -1) return false; // need more data
              const jsonPart = prefixBuffer.slice(prefix.length, nl);
              try {
                const parsed = JSON.parse(jsonPart);
                onJSON(parsed);
              } catch (e) {
                console.warn(`Failed to parse ${prefix} JSON`, e);
              }
              prefixBuffer = prefixBuffer.slice(nl + 1);
              return true;
            };

            // Loop to consume multiple prefix lines if present
            let consumedSomething = false;
            while (true) {
              let didConsume = false;

              // [CONTEXT]{...}\n
              didConsume = tryConsumePrefixLine("[CONTEXT]", (parsed) => {
                const arr =
                  parsed?.context ??
                  parsed?.items ??
                  parsed?.results ??
                  [];
                const items: ContextItem[] = Array.isArray(arr)
                  ? arr
                  : Array.isArray(arr?.items)
                  ? arr.items
                  : [];
                setContextItems(items);
                // Emit global for other UI parts
                try {
                  window.dispatchEvent(new CustomEvent("legaci:context", { detail: { items, raw: parsed } }));
                } catch {}
              });
              consumedSomething = consumedSomething || didConsume;
              if (didConsume) continue;

              // [TOOL_RESULTS]{...}\n
              didConsume = tryConsumePrefixLine("[TOOL_RESULTS]", (parsed) => {
                const tools = parsed?.toolResults ?? parsed;
                setToolResults(tools);
                try {
                  (tools as any[]).forEach((t) => {
                    if (!t || !t.tool) return;
                    if (t.tool === "upsert_trait") {
                      window.dispatchEvent(new CustomEvent("legaci:traitUpsert", { detail: t }));
                    } else if (t.tool === "log_source") {
                      window.dispatchEvent(new CustomEvent("legaci:sourceLogged", { detail: t }));
                    } else if (t.tool === "request_followups") {
                      window.dispatchEvent(new CustomEvent("legaci:requestFollowups", { detail: t }));
                    } else {
                      window.dispatchEvent(new CustomEvent("legaci:toolResult", { detail: t }));
                    }
                  });
                } catch (e) {
                  console.warn("Failed to dispatch tool events", e);
                }
              });
              consumedSomething = consumedSomething || didConsume;

              if (!didConsume) break;
            }

            // If we have any remainder (non-prefixed assistant text), append and exit first-chunk mode
            if (prefixBuffer.length > 0) {
              const remainder = prefixBuffer;
              setMessages((prev) => {
                const copy = [...prev];
                const lastIdx = copy.map((x) => x.role).lastIndexOf("assistant");
                if (lastIdx >= 0) {
                  copy[lastIdx] = { ...copy[lastIdx], content: copy[lastIdx].content + remainder };
                } else {
                  copy.push({ role: "assistant", content: remainder });
                }
                return copy;
              });
              firstChunk = false;
              prefixBuffer = "";
            } else if (consumedSomething) {
              // Consumed prefixes but no assistant text yet; keep waiting in first-chunk mode
              continue;
            } else {
              // No prefixes at all; treat this chunk as normal assistant text
              setMessages((prev) => {
                const copy = [...prev];
                const lastIdx = copy.map((x) => x.role).lastIndexOf("assistant");
                if (lastIdx >= 0) {
                  copy[lastIdx] = { ...copy[lastIdx], content: copy[lastIdx].content + chunk };
                } else {
                  copy.push({ role: "assistant", content: chunk });
                }
                return copy;
              });
              firstChunk = false;
              prefixBuffer = "";
            }
          } else {
            // Normal streaming append
            setMessages((prev) => {
              const copy = [...prev];
              const lastIdx = copy.map((x) => x.role).lastIndexOf("assistant");
              if (lastIdx >= 0) {
                copy[lastIdx] = { ...copy[lastIdx], content: copy[lastIdx].content + chunk };
              } else {
                copy.push({ role: "assistant", content: chunk });
              }
              return copy;
            });
          }
        }
      }

      setIsStreaming(false);

      // TTS flow if requested (best-effort)
      if (speak) {
        try {
          const assistantMsgs = [...messages].filter((m) => m.role === "assistant");
          const finalAssistant = assistantMsgs.length ? assistantMsgs[assistantMsgs.length - 1].content : "";
          const speakRes = await fetch("/api/voice/speak", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text: finalAssistant }),
          });
          if (speakRes.ok) {
            const ct = speakRes.headers.get("content-type") ?? "";
            if (ct.includes("application/json")) {
              const body = await speakRes.json().catch(() => null);
              if (body?.audioUrl) {
                const audio = new Audio(body.audioUrl);
                audio.crossOrigin = "anonymous";
                audio.play().catch(() => {});
                window.dispatchEvent(new CustomEvent("legaci:connectAudio", { detail: { audioElement: audio } }));
              }
            } else {
              const reader2 = speakRes.body?.getReader();
              if (reader2) {
                const parts: Uint8Array[] = [];
                while (true) {
                  const { done, value } = await reader2.read();
                  if (done) break;
                  if (value) parts.push(value);
                }
                const size = parts.reduce((s, p) => s + p.length, 0);
                const merged = new Uint8Array(size);
                let off = 0;
                for (const p of parts) {
                  merged.set(p, off);
                  off += p.length;
                }
                const blob = new Blob([merged.buffer], { type: speakRes.headers.get("content-type") ?? "audio/mpeg" });
                window.dispatchEvent(new CustomEvent("legaci:playAudioStream", { detail: { stream: blob } }));
              }
            }
          } else {
            console.warn("TTS failed", await speakRes.text().catch(() => ""));
          }
        } catch (e) {
          console.warn("TTS request failed", e);
        }
      }
    } catch (err: unknown) {
      const maybeName = (err as any)?.name;
      const errMsg = err instanceof Error ? err.message : String(err);
      if (maybeName === "AbortError") {
        setMessages((m) => [...m, { role: "assistant", content: "[aborted]" }]);
      } else {
        setMessages((m) => [...m, { role: "assistant", content: `Error: ${errMsg}` }]);
      }
      setIsStreaming(false);
    } finally {
      abortRef.current = null;
    }
  }

  function stopStreaming() {
    if (abortRef.current) {
      try {
        abortRef.current.abort();
      } catch {}
    }
    setIsStreaming(false);
  }

  async function viewSource(id: string) {
    if (!id) return;
    try {
      const res = await fetch(`/api/sources/get?id=${encodeURIComponent(id)}`);
      if (!res.ok) {
        const text = await res.text().catch(() => "Failed to fetch");
        alert(`Failed to load source: ${text}`);
        return;
      }
      const body = await res.json();
      const pretty = JSON.stringify(body.source ?? body, null, 2);
      const w = window.open("", "_blank", "noopener,noreferrer");
      if (w) {
        w.document.title = `Source ${id}`;
        const pre = w.document.createElement("pre");
        pre.style.whiteSpace = "pre-wrap";
        pre.style.fontFamily = "monospace";
        pre.textContent = pretty;
        w.document.body.appendChild(pre);
      } else {
        alert(pretty);
      }
    } catch (e) {
      console.warn("viewSource error", e);
      alert("Failed to open source");
    }
  }

  function scrollToContext(index: number) {
    const el = document.getElementById(`ctx-${index}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      try {
        (el as HTMLElement).animate?.([{ outlineColor: "transparent" }, { outlineColor: "rgba(255,255,255,0.6)" }, { outlineColor: "transparent" }], { duration: 900 });
      } catch {}
    }
  }

  async function togglePreview(it: ContextItem, idx: number) {
    const key = (it.id || it.source_id || String(idx)).toString();
    const current = previews[key];
    // Toggle close
    if (current?.open) {
      setPreviews((p) => ({ ...p, [key]: { ...(p[key] || {}), open: false } }));
      return;
    }
    // Open (and fetch if needed)
    setPreviews((p) => ({ ...p, [key]: { ...(p[key] || {}), open: true, loading: !p[key]?.data } }));
    if (!current?.data) {
      try {
        const res = await fetch(`/api/sources/get?id=${encodeURIComponent(it.id || it.source_id || "")}`);
        if (!res.ok) {
          const text = await res.text().catch(() => "Failed to fetch");
          setPreviews((p) => ({ ...p, [key]: { open: true, loading: false, error: text } }));
          return;
        }
        const body = await res.json().catch(() => ({}));
        setPreviews((p) => ({ ...p, [key]: { open: true, loading: false, data: body } }));
      } catch (e) {
        setPreviews((p) => ({ ...p, [key]: { open: true, loading: false, error: "Failed to load" } }));
      }
    }
  }

  function inspectCategory(cat?: string) {
    if (!cat) return;
    try {
      window.dispatchEvent(new CustomEvent("legaci:inspectCategory", { detail: { category: cat } }));
    } catch {}
  }

  return (
    <section aria-labelledby="chat-title" className="w-full md:w-96 bg-surface text-textPrimary p-4 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h2 id="chat-title" className="text-lg font-medium">Agent Chat</h2>
        <div className="flex items-center gap-2">
          <select value={mode} onChange={(e) => setMode(e.target.value as "normal" | "fill-gaps")} className="rounded bg-bg px-2 py-1 text-sm">
            <option value="normal">Normal</option>
            <option value="fill-gaps">Fill gaps</option>
          </select>
          <label className="text-xs text-textSecondary flex items-center gap-1">
            <input type="checkbox" checked={speak} onChange={(e) => setSpeak(e.target.checked)} />
            Speak replies
          </label>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-2 bg-bg/40 rounded">
        {toolResults ? (
          <div className="mb-2 p-2 bg-surface/60 rounded text-xs text-textSecondary">
            <div className="font-medium text-sm mb-1">Tool results</div>
            <pre className="whitespace-pre-wrap">{JSON.stringify(toolResults, null, 2)}</pre>
          </div>
        ) : null}

        {contextItems && contextItems.length > 0 ? (
          <div className="mb-2 p-2 bg-surface/60 rounded text-xs text-textSecondary">
            <div className="font-medium text-sm mb-1">Context</div>
            <ol className="space-y-2 list-decimal list-inside">
              {contextItems.map((it, idx) => (
                <li id={`ctx-${idx + 1}`} key={it.id || `${idx}`} className="p-2 bg-surface/40 rounded outline outline-0 outline-offset-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="text-sm font-medium">{it.title || it.id}</div>
                      <div className="text-[11px] text-textSecondary">
                        {(it.category || it.type || "Source")}{typeof it.score === "number" ? ` • ${it.score.toFixed(2)}` : ""}
                      </div>
                      {it.snippet ? (
                        <div className="text-xs mt-1 whitespace-pre-line">
                          {it.snippet.length > 240 ? `${it.snippet.slice(0, 240)}…` : it.snippet}
                        </div>
                      ) : null}
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        className="text-xs px-2 py-1 rounded bg-primary text-white"
                        onClick={() => viewSource(it.id || it.source_id || "")}
                        title="View source"
                      >
                        View
                      </button>
                      <button
                        className="text-xs px-2 py-1 rounded bg-accent text-white"
                        onClick={() => togglePreview(it, idx)}
                        title="Preview inline"
                      >
                        Preview
                      </button>
                      <button
                        className="text-xs px-2 py-1 rounded bg-surface text-textSecondary border border-surface/60"
                        onClick={() => inspectCategory(it.category)}
                        title="Inspect category"
                      >
                        Inspect
                      </button>
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-surface/80 border border-surface/60 text-[11px] text-textSecondary">
                        {idx + 1}
                      </span>
                    </div>
                  </div>

                  {/* Inline preview area */}
                  {(() => {
                    const key = (it.id || it.source_id || String(idx)).toString();
                    const pv = previews[key];
                    if (!pv?.open) return null;
                    return (
                      <div className="mt-2 p-2 rounded bg-bg/40 border border-surface/60">
                        {pv.loading ? (
                          <div className="text-xs text-textSecondary">Loading…</div>
                        ) : pv.error ? (
                          <div className="text-xs text-red-400">Error: {pv.error}</div>
                        ) : pv.data ? (
                          <pre className="text-[11px] whitespace-pre-wrap">
                            {JSON.stringify(pv.data?.source ?? pv.data, null, 2)}
                          </pre>
                        ) : (
                          <div className="text-xs text-textSecondary">No preview available.</div>
                        )}
                      </div>
                    );
                  })()}
                </li>
              ))}
            </ol>
          </div>
        ) : null}

        <ul className="space-y-2">
          {messages.map((m, i) => (
            <li key={i} className={`p-2 rounded ${m.role === "user" ? "bg-primary/10" : "bg-surface/60"}`}>
              <div className="text-sm whitespace-pre-wrap">{m.content}</div>
              <div className="text-xs text-textSecondary mt-1">{m.role}</div>

              {m.role === "assistant" && contextItems && contextItems.length > 0 ? (
                <div className="mt-1 text-[11px] text-textSecondary flex items-center flex-wrap gap-1">
                  <span className="opacity-80">Citations:</span>
                  {contextItems.map((_, idx) => (
                    <button
                      key={idx}
                      className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-surface/80 border border-surface/60 text-[11px] text-textSecondary hover:bg-surface"
                      onClick={() => scrollToContext(idx + 1)}
                      title={`Go to context [${idx + 1}]`}
                    >
                      {idx + 1}
                    </button>
                  ))}
                </div>
              ) : null}
            </li>
          ))}
          {isStreaming ? <li className="text-sm text-textSecondary">Streaming…</li> : null}
        </ul>
      </div>

      <div className="flex items-center gap-2">
        <input
          className="flex-1 px-3 py-2 rounded bg-bg text-textPrimary border border-surface/60"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              sendMessage();
            }
          }}
          placeholder="Say something…"
        />
        {isStreaming ? (
          <button className="px-3 py-2 rounded bg-red-500 text-white" onClick={stopStreaming}>Stop</button>
        ) : (
          <button className="px-3 py-2 rounded bg-primary text-white" onClick={sendMessage}>Send</button>
        )}
      </div>
    </section>
  );
}