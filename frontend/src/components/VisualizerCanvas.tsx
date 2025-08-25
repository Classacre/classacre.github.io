/**
 * frontend/src/components/VisualizerCanvas.tsx
 *
 * Canvas 2D radial audio visualizer for streaming TTS playback.
 *
 * Usage:
 * - The visualizer must be enabled by a user gesture to create an AudioContext. Click the "Enable audio"
 *   button rendered by this component, or call the global event:
 *     window.dispatchEvent(new CustomEvent('legaci:enableAudio'))
 *
 * - To connect a playing audio element (e.g. streamed TTS):
 *     window.dispatchEvent(new CustomEvent('legaci:connectAudio', { detail: { audioElement: HTMLAudioElement }}))
 *
 * - To connect an already-available MediaStream:
 *     window.dispatchEvent(new CustomEvent('legaci:connectAudio', { detail: { mediaStream: MediaStream }}))
 *
 * - The app can also dispatch a streaming response to play directly:
 *     window.dispatchEvent(new CustomEvent('legaci:playAudioStream', { detail: { stream: ReadableStream | Blob }}))
 *
 * - To disconnect / stop visualizer:
 *     window.dispatchEvent(new CustomEvent('legaci:disconnectAudio'))
 *
 * The component draws a radial ring of bars mapped to frequency bins. Colors interpolate across
 * Legaci brand gradient: primary -> accent -> accent2.
 *
 * Accessibility:
 * - All controls are keyboard-focusable.
 *
 */

"use client";

import React, { useEffect, useRef, useState } from "react";

const PRIMARY = "#5B5BD6";
const ACCENT = "#00C2C7";
const ACCENT2 = "#E254FF";

function hexToRgb(hex: string) {
  const h = hex.replace("#", "");
  const bigint = parseInt(h, 16);
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255,
  };
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function lerpColor(c1: string, c2: string, t: number) {
  const A = hexToRgb(c1);
  const B = hexToRgb(c2);
  const r = Math.round(lerp(A.r, B.r, t));
  const g = Math.round(lerp(A.g, B.g, t));
  const b = Math.round(lerp(A.b, B.b, t));
  return `rgb(${r}, ${g}, ${b})`;
}

export default function VisualizerCanvas({
  ringRadius = 160,
  ringThickness = 40,
  barCount = 96,
}: {
  ringRadius?: number;
  ringThickness?: number;
  barCount?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [enabled, setEnabled] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | MediaStreamAudioSourceNode | null>(null);
  const rafRef = useRef<number | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  const dprRef = useRef<number>(1);

  // create AudioContext on user gesture
  async function enableAudioContext() {
    if (audioCtxRef.current) return;
    const win: any = window;
    const Ctx = win.AudioContext || win.webkitAudioContext;
    if (!Ctx) {
      console.warn("AudioContext not supported");
      return;
    }
    const ctx = new Ctx();
    audioCtxRef.current = ctx;
    const analyser = ctx.createAnalyser();
    analyser.fftSize = 2048;
    analyser.smoothingTimeConstant = 0.8;
    analyserRef.current = analyser;
    const dataArray = new Uint8Array(analyser.frequencyBinCount);
    dataArrayRef.current = dataArray;

    setEnabled(true);
  }

  function stopVisualizer() {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    if (sourceRef.current) {
      try {
        sourceRef.current.disconnect();
      } catch {}
      sourceRef.current = null;
    }
    if (analyserRef.current) {
      try {
        analyserRef.current.disconnect();
      } catch {}
      analyserRef.current = null;
    }
    // don't close the AudioContext to allow re-attach without gesture in some browsers;
    setEnabled(false);
  }

  function connectMediaElement(el: HTMLAudioElement) {
    if (!audioCtxRef.current) enableAudioContext();
    const ctx = audioCtxRef.current!;
    if (!ctx) return;
    // create or reuse analyser
    const analyser = analyserRef.current ?? ctx.createAnalyser();
    analyser.fftSize = 2048;
    analyser.smoothingTimeConstant = 0.8;
    analyserRef.current = analyser;
    // create source
    try {
      const src = ctx.createMediaElementSource(el);
      sourceRef.current = src;
      src.connect(analyser);
      // route to speakers
      try {
        analyser.connect(ctx.destination);
      } catch {}
      dataArrayRef.current = new Uint8Array(analyser.frequencyBinCount);
      if (!rafRef.current) renderLoop();
    } catch (e) {
      console.warn("Could not connect media element to AudioContext", e);
    }
  }

  function connectMediaStream(stream: MediaStream) {
    if (!audioCtxRef.current) enableAudioContext();
    const ctx = audioCtxRef.current!;
    if (!ctx) return;
    const analyser = analyserRef.current ?? ctx.createAnalyser();
    analyser.fftSize = 2048;
    analyser.smoothingTimeConstant = 0.8;
    analyserRef.current = analyser;
    try {
      const src = ctx.createMediaStreamSource(stream);
      sourceRef.current = src;
      src.connect(analyser);
      // do not connect analyser to destination for streams (may be already playing)
      dataArrayRef.current = new Uint8Array(analyser.frequencyBinCount);
      if (!rafRef.current) renderLoop();
    } catch (e) {
      console.warn("Could not connect media stream to AudioContext", e);
    }
  }

  // Accept a ReadableStream or Blob and play it, then connect to visualizer
  async function playStreamOrBlob(streamOrBlob: ReadableStream<Uint8Array> | Blob | undefined) {
    if (!streamOrBlob) return;
    try {
      let blob: Blob | null = null;
      if (streamOrBlob instanceof Blob) {
        blob = streamOrBlob;
      } else {
        // Convert ReadableStream -> Blob
        const response = new Response(streamOrBlob as ReadableStream<Uint8Array>);
        blob = await response.blob();
      }
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      audio.crossOrigin = "anonymous";
      // autoplay may be blocked; ensure user gesture or call play safely
      try {
        await audio.play();
      } catch {
        // ignore; still dispatch so user can click play manually
      }
      try {
        window.dispatchEvent(new CustomEvent("legaci:connectAudio", { detail: { audioElement: audio } }));
      } catch {}
      // cleanup object URL when audio ends
      audio.addEventListener("ended", () => {
        try {
          URL.revokeObjectURL(url);
        } catch {}
      });
    } catch (e) {
      console.warn("playStreamOrBlob error", e);
    }
  }

  // rendering loop
  function renderLoop() {
    const canvas = canvasRef.current;
    const analyser = analyserRef.current;
    const dataArray = dataArrayRef.current;
    if (!canvas || !analyser || !dataArray) {
      rafRef.current = requestAnimationFrame(renderLoop);
      return;
    }
    const ctx = canvas.getContext("2d")!;
    const dpr = dprRef.current || 1;
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    // Some TS DOM lib versions type Uint8Array with ArrayBuffer-like generics (e.g. SharedArrayBuffer).
    // Cast through unknown to the exact Uint8Array<ArrayBuffer> expected by getByteFrequencyData
    // to avoid incompatible-generic errors while leaving runtime behavior unchanged.
    analyser.getByteFrequencyData(dataArray as unknown as Uint8Array<ArrayBuffer>);

    // center
    const cx = w / 2;
    const cy = h / 2;

    // ring parameters
    const bars = Math.min(barCount, dataArray.length);
    const innerR = ringRadius * dpr;
    const outerR = innerR + ringThickness * dpr;
    const maxBar = outerR - innerR;

    // draw bars around circle
    for (let i = 0; i < bars; i++) {
      const v = dataArray[i] / 255; // 0..1
      const angle = (i / bars) * Math.PI * 2 - Math.PI / 2;
      const barLength = Math.max(2, v * maxBar * (0.75 + Math.sin(i * 0.3 + (performance.now() / 300)) * 0.25));
      const x1 = cx + Math.cos(angle) * innerR;
      const y1 = cy + Math.sin(angle) * innerR;
      const x2 = cx + Math.cos(angle) * (innerR + barLength);
      const y2 = cy + Math.sin(angle) * (innerR + barLength);

      // compute color across gradient primary -> accent -> accent2
      const t = i / (bars - 1);
      const color =
        t < 0.5 ? lerpColor(PRIMARY, ACCENT, t * 2) : lerpColor(ACCENT, ACCENT2, (t - 0.5) * 2);

      ctx.strokeStyle = color;
      ctx.lineWidth = Math.max(2 * dpr, 1.0);
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }

    // ring glow center
    const g = ctx.createRadialGradient(cx, cy, innerR * 0.2, cx, cy, outerR * 1.2);
    g.addColorStop(0, "rgba(91,91,214,0.08)");
    g.addColorStop(1, "rgba(0,0,0,0.0)");
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(cx, cy, outerR * 1.25, 0, Math.PI * 2);
    ctx.fill();

    rafRef.current = requestAnimationFrame(renderLoop);
  }

  // handle resizing with DPR awareness
  useEffect(() => {
    function resize() {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const parent = canvas.parentElement ?? document.body;
      const rect = parent.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      dprRef.current = dpr;
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
    }
    resize();
    const ro = new ResizeObserver(resize);
    if (canvasRef.current?.parentElement) ro.observe(canvasRef.current.parentElement);
    window.addEventListener("resize", resize);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, []);

  // global event listeners to connect / disconnect audio sources and play streams
  useEffect(() => {
    function onEnable() {
      enableAudioContext();
    }
    function onConnect(e: Event) {
      const detail = (e as CustomEvent<Record<string, unknown>>).detail ?? {};
      if (detail?.audioElement) {
        connectMediaElement(detail.audioElement as HTMLAudioElement);
      } else if (detail?.mediaStream) {
        connectMediaStream(detail.mediaStream as MediaStream);
      }
    }
    function onPlayStream(e: Event) {
      const detail = (e as CustomEvent<Record<string, unknown>>).detail ?? {};
      // detail.stream may be a ReadableStream or Blob
      const maybeStream = detail.stream as ReadableStream<Uint8Array> | Blob | undefined;
      playStreamOrBlob(maybeStream);
    }
    function onDisconnect() {
      stopVisualizer();
    }

    window.addEventListener("legaci:enableAudio", onEnable as EventListener);
    window.addEventListener("legaci:connectAudio", onConnect as EventListener);
    window.addEventListener("legaci:playAudioStream", onPlayStream as EventListener);
    window.addEventListener("legaci:disconnectAudio", onDisconnect as EventListener);

    return () => {
      window.removeEventListener("legaci:enableAudio", onEnable as EventListener);
      window.removeEventListener("legaci:connectAudio", onConnect as EventListener);
      window.removeEventListener("legaci:playAudioStream", onPlayStream as EventListener);
      window.removeEventListener("legaci:disconnectAudio", onDisconnect as EventListener);
      stopVisualizer();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // UI: small control overlay
  return (
    <div className="relative w-full h-full select-none">
      <canvas ref={canvasRef} className="w-full h-full block" aria-hidden />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="pointer-events-auto bg-surface/40 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-2">
          <button
            onClick={() => {
              window.dispatchEvent(new CustomEvent("legaci:enableAudio"));
            }}
            className="px-3 py-1 rounded bg-primary text-white text-xs focus:outline-none focus:ring-2 focus:ring-accent"
            aria-pressed={enabled}
          >
            Enable audio
          </button>
          <button
            onClick={() => {
              window.dispatchEvent(new CustomEvent("legaci:disconnectAudio"));
            }}
            className="px-3 py-1 rounded bg-transparent text-textSecondary text-xs focus:outline-none focus:ring-2 focus:ring-accent"
          >
            Stop
          </button>
          <div className="text-xs text-textSecondary">Visualizer</div>
        </div>
      </div>
    </div>
  );
}