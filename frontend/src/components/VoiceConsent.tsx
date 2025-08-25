/**
 * frontend/src/components/VoiceConsent.tsx
 *
 * Client-side consent flow for voice cloning.
 *
 * - Shows consent copy and checkbox.
 * - Records a short audio sample using MediaRecorder (user gesture required).
 * - Uploads sample + consent metadata to POST /api/voice/consent as multipart/form-data.
 * - Sends X-CSRF-Token header using csrf_token cookie (double-submit CSRF).
 *
 * Usage:
 * <VoiceConsent />
 */

"use client";

import React, { useState, useRef } from "react";

function readCookie(name: string) {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? decodeURIComponent(match[2]) : null;
}

export default function VoiceConsent() {
  const [consentChecked, setConsentChecked] = useState(false);
  const [recording, setRecording] = useState(false);
  const [mediaPerm, setMediaPerm] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const audioElRef = useRef<HTMLAudioElement | null>(null);

  async function startRecording() {
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setMediaPerm(true);
      const mr = new MediaRecorder(stream, { mimeType: "audio/webm" });
      recorderRef.current = mr;
      chunksRef.current = [];
      mr.ondataavailable = (ev) => {
        if (ev.data && ev.data.size) chunksRef.current.push(ev.data);
      };
      mr.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        const url = URL.createObjectURL(blob);
        setPreviewUrl(url);
      };
      mr.start();
      setRecording(true);
      // auto stop after 30s max
      setTimeout(() => {
        try {
          if (recorderRef.current && recorderRef.current.state === "recording") recorderRef.current.stop();
        } catch {}
        setRecording(false);
      }, 30_000);
    } catch (e: any) {
      setMediaPerm(false);
      setError("Microphone access denied or unavailable.");
    }
  }

  function stopRecording() {
    try {
      if (recorderRef.current && recorderRef.current.state === "recording") {
        recorderRef.current.stop();
      }
    } catch {}
    setRecording(false);
  }

  async function uploadSample() {
    setError(null);
    setUploading(true);
    try {
      if (!previewUrl) {
        setError("No recording available. Please record a short sample first.");
        setUploading(false);
        return;
      }
      // fetch blob from previewUrl
      const resp = await fetch(previewUrl);
      const blob = await resp.blob();
      const form = new FormData();
      form.append("type", "file");
      form.append("title", `voice-sample-${Date.now()}.webm`);
      form.append("content", blob, "sample.webm");
      form.append("consent", JSON.stringify({ accepted: true }));
      // double-submit CSRF
      const csrf = readCookie("csrf_token");
      const headers: Record<string, string> = {};
      if (csrf) headers["X-CSRF-Token"] = csrf;

      const res = await fetch("/api/voice/consent", {
        method: "POST",
        body: form,
        headers,
      });
      if (!res.ok) {
        const txt = await res.text().catch(() => "");
        throw new Error(txt || "Upload failed");
      }
      setUploaded(true);
    } catch (e: any) {
      console.error("uploadSample error", e);
      setError(e?.message ? String(e.message) : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  return (
    <section className="p-4 bg-surface rounded-md text-textPrimary">
      <h3 className="text-lg font-semibold mb-2">Create a voice that sounds like you</h3>
      <p className="text-sm text-textSecondary mb-3">
        With your permission, Legaci will use short audio samples you record to create a custom voice model for
        speaking replies. You can revoke consent and delete your voice at any time.
      </p>

      <ul className="text-xs text-textSecondary mb-3 list-disc pl-5 space-y-1">
        <li>We collect a short audio sample (30s max).</li>
        <li>Samples are stored encrypted and used only to create your voice model after consent.</li>
        <li>You can revoke consent and request deletion at any time.</li>
      </ul>

      <label className="flex items-center gap-2 mb-3">
        <input
          type="checkbox"
          checked={consentChecked}
          onChange={(e) => setConsentChecked(e.target.checked)}
          className="w-4 h-4"
        />
        <span className="text-sm">I understand and consent to create a voice model using my audio samples.</span>
      </label>

      <div className="flex gap-2 items-center mb-3">
        <button
          disabled={!consentChecked || recording}
          onClick={startRecording}
          className="px-3 py-2 rounded bg-primary text-black text-sm disabled:opacity-50"
        >
          Record sample
        </button>
        <button
          disabled={!recording}
          onClick={stopRecording}
          className="px-3 py-2 rounded bg-accent text-white text-sm disabled:opacity-50"
        >
          Stop
        </button>
        <div className="text-xs text-textSecondary ml-2">{recording ? "Recording… (auto stop 30s)" : mediaPerm === false ? "Microphone blocked" : ""}</div>
      </div>

      {previewUrl ? (
        <div className="mb-3">
          <audio ref={audioElRef} src={previewUrl} controls className="w-full" />
        </div>
      ) : null}

      <div className="flex gap-2">
        <button
          disabled={!consentChecked || !previewUrl || uploading}
          onClick={uploadSample}
          className="px-3 py-2 rounded bg-accent text-white text-sm disabled:opacity-50"
        >
          {uploading ? "Uploading…" : "Upload & Consent"}
        </button>
        <button
          onClick={() => {
            setPreviewUrl(null);
            setUploaded(false);
            setError(null);
          }}
          className="px-3 py-2 rounded bg-surface text-textSecondary text-sm"
        >
          Reset
        </button>
      </div>

      {uploaded ? <div className="text-sm text-textSecondary mt-3">Sample uploaded and consent recorded.</div> : null}
      {error ? <div className="text-sm text-red-400 mt-3">{error}</div> : null}
    </section>
  );
}