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

export default function ChatPanel() {
  const [messages, setMessages] = useState<{ role: Role; content: string }[]>([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [mode, setMode] = useState<"normal" | "fill-gaps">("normal");
  const [speak, setSpeak] = useState(false);
  const [toolResults, setToolResults] = useState<unknown[] | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  async function sendMessage() {
    const content = input.trim();
    if (!content) return;
    setMessages((m) => [...m, { role: "user", content }]);
    setInput("");
    setIsStreaming(true);
    setToolResults(null);

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
            // handle possible TOOL_RESULTS prefix which ends with a newline
            const combined = prefixBuffer + chunk;
            const TOOL_PREFIX = "[TOOL_RESULTS]";
            if (combined.startsWith(TOOL_PREFIX)) {
              const newlineIdx = combined.indexOf("\n");
              if (newlineIdx !== -1) {
                const jsonPart = combined.slice(TOOL_PREFIX.length, newlineIdx);
                try {
                  const parsed = JSON.parse(jsonPart);
                  const tools = parsed.toolResults ?? parsed;
                  setToolResults(tools);
                  // Dispatch events so other UI (DiscoBall, inspector) can react in real-time
                  try {
                    (tools as any[]).forEach((t) => {
                      if (!t || !t.tool) return;
                      if (t.tool === "upsert_trait") {
                        // trait upsert happened server-side — notify UI
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
                } catch (e) {
                  console.warn("Failed to parse TOOL_RESULTS JSON", e);
                }
                const remainder = combined.slice(newlineIdx + 1);
                if (remainder.length > 0) {
                  // append remainder to assistant content
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
                }
                firstChunk = false;
                prefixBuffer = "";
                continue;
              } else {
                // no newline yet, buffer and continue
                prefixBuffer = combined;
                continue;
              }
            } else {
              // no prefix, just append normally
              setMessages((prev) => {
                const copy = [...prev];
                const lastIdx = copy.map((x) => x.role).lastIndexOf("assistant");
                if (lastIdx >= 0) {
                  copy[lastIdx] = { ...copy[lastIdx], content: copy[lastIdx].content + combined };
                } else {
                  copy.push({ role: "assistant", content: combined });
                }
                return copy;
              });
              firstChunk = false;
              prefixBuffer = "";
              continue;
            }
          } else {
            // normal streaming append
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
        <ul className="space-y-2">
          {messages.map((m, i) => (
            <li key={i} className={`p-2 rounded ${m.role === "user" ? "bg-primary/10" : "bg-surface/60"}`}>
              <div className="text-sm whitespace-pre-wrap">{m.content}</div>
              <div className="text-xs text-textSecondary mt-1">{m.role}</div>
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