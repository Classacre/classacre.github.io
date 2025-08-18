"use client";

import React, { useState, useRef } from "react";

/**
 * frontend/src/components/ChatPanel.tsx
 *
 * Lightweight streaming chat UI that posts to /api/chat and reads a text stream.
 * After the assistant reply completes, if `speak` is true it calls /api/voice/speak
 * and connects the returned audio (URL or streamed bytes) to the Visualizer via
 * global events:
 *  - legaci:connectAudio { detail: { audioElement } }
 *  - legaci:playAudioStream { detail: { stream: Blob } }
 */

type Role = "system" | "user" | "assistant";

export default function ChatPanel(): JSX.Element {
  const [messages, setMessages] = useState<{ role: Role; content: string }[]>([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [mode, setMode] = useState<"normal" | "fill-gaps">("normal");
  const [speak, setSpeak] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  async function sendMessage() {
    const content = input.trim();
    if (!content) return;
    setMessages((m) => [...m, { role: "user", content }]);
    setInput("");
    setIsStreaming(true);

    // abort previous
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

      // placeholder assistant
      setMessages((m) => [...m, { role: "assistant", content: "" }]);

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let done = false;
      while (!done) {
        const { value, done: d } = await reader.read();
        done = d;
        if (value) {
          const chunk = decoder.decode(value, { stream: !done });
          setMessages((prev) => {
            const copy = [...prev];
            const last = copy.map((x) => x.role).lastIndexOf("assistant");
            if (last >= 0) {
              copy[last] = { ...copy[last], content: copy[last].content + chunk };
            } else {
              copy.push({ role: "assistant", content: chunk });
            }
            return copy;
          });
        }
      }

      setIsStreaming(false);

      // Get the final assistant text (best-effort)
      const assistantMsgs = messages.concat([]).filter((m) => m.role === "assistant");
      const finalAssistant = assistantMsgs.length ? assistantMsgs[assistantMsgs.length - 1].content : "";

      // If speak requested, call voice API
      if (speak) {
        try {
          const speakRes = await fetch("/api/voice/speak", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text: finalAssistant }),
          });

          if (!speakRes.ok) {
            const err = await speakRes.text().catch(() => "TTS failed");
            console.warn("TTS /api/voice/speak error:", err);
          } else {
            const ct = speakRes.headers.get("content-type") ?? "";
            if (ct.includes("application/json")) {
              const body = await speakRes.json().catch(() => null);
              if (body?.audioUrl) {
                const audio = new Audio(body.audioUrl);
                audio.crossOrigin = "anonymous";
                audio.play().catch(() => {});
                try {
                  window.dispatchEvent(new CustomEvent("legaci:connectAudio", { detail: { audioElement: audio } }));
                } catch {}
              }
            } else {
              // streaming binary audio -> collect into Blob and dispatch
              const r2 = speakRes.body?.getReader();
              if (r2) {
                const parts: Uint8Array[] = [];
                while (true) {
                  const { done, value } = await r2.read();
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
                try {
                  window.dispatchEvent(new CustomEvent("legaci:playAudioStream", { detail: { stream: blob } }));
                } catch {}
              }
            }
          }
        } catch (e) {
          console.warn("TTS request failed", e);
        }
      }
    } catch (err) {
      if ((err as any)?.name === "AbortError") {
        setMessages((m) => [...m, { role: "assistant", content: "[aborted]" }]);
      } else {
        setMessages((m) => [...m, { role: "assistant", content: `Error: ${(err as any)?.message ?? String(err)}` }]);
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