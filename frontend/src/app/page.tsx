"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import DiscoBallCanvas from "../components/DiscoBallCanvas";
import "../app/globals.css";

/**
 * Ground-up landing page remake
 * - Full-viewport, two-column layout (no vertical growth)
 * - Vivid brand gradient, motion CTAs
 * - Right: fixed-height canvas stage with overlays (no layout shift)
 * - Login CTA (email + passkey trigger)
 */
export default function Home() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Selected tile info from DiscoBall
  const [selectedTile, setSelectedTile] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  useEffect(() => {
    function onTileSelect(e: Event) {
      const detail = (e as CustomEvent<Record<string, unknown>>).detail ?? {};
      const id = typeof detail?.instanceId === "number" ? (detail.instanceId as number) : null;
      const cat = typeof detail?.category === "string" ? (detail.category as string) : null;
      const color = typeof detail?.colorHex === "string" ? (detail.colorHex as string) : null;
      setSelectedTile(id);
      setSelectedCategory(cat);
      setSelectedColor(color);
    }
    window.addEventListener("legaci:tileSelect", onTileSelect as EventListener);
    return () => window.removeEventListener("legaci:tileSelect", onTileSelect as EventListener);
  }, []);

  async function handleLogin() {
    if (!email) {
      setError("Please enter your email");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/auth/login-passkey", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      if (!data?.success) throw new Error(data?.message || "Authentication failed");
      // TODO: handle verification step and then redirect
      console.log("Login request created");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="landing-root">
      {/* Top navigation */}
      <header className="landing-nav">
        <div className="nav-left">
          <img src="/brand/legaci-mark.svg" alt="Legaci mark" className="nav-logo" />
          <span className="nav-brand">Legaci</span>
        </div>
        <nav className="nav-right" aria-label="Primary">
          <a className="nav-link" href="#about">About</a>
          <a className="nav-link" href="#contact">Contact</a>
          <a className="nav-link strong" href="/auth">Log in / Sign up</a>
        </nav>
      </header>
      <main className="landing-viewport">
        {/* Left column: brand + message + CTA */}
        <section className="landing-left">
          <motion.div
            className="brand-stack"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <img
              src="/brand/legaci-mark.svg"
              alt="Legaci mark"
              className="brand-logo brand-logo-lg"
              draggable={false}
            />
            <h1 className="brand-heading brand-heading-tight">Legaci</h1>
            <p className="brand-sub">Capture what matters. Remember better.</p>
          </motion.div>

          <p className="brand-lead">
            A modern, privacy-first memory companion. Explore your story on a living, colorful 3D
            globe. Sign up securely with a passkey, add traits and moments, and see your progress
            come to life.
          </p>

          <div className="cta-row">
            <motion.button
              className="cta primary"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                const el = document.getElementById("email");
                if (el) (el as HTMLInputElement).focus();
              }}
            >
              Get started
            </motion.button>

            <motion.button
              className="cta ghost"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => alert("Demo coming soon")}
            >
              View demo
            </motion.button>
          </div>

          <div className="login-card">
            <label htmlFor="email" className="login-label">
              Email
            </label>
            <div className="login-row">
              <input
                id="email"
                type="email"
                value={email}
                placeholder="you@domain.com"
                className="login-input"
                onChange={(e) => setEmail(e.target.value)}
              />
              <button className="login-btn" onClick={handleLogin} disabled={loading}>
                {loading ? "Authenticating..." : "Sign up"}
              </button>
            </div>
            {error ? <div className="login-error">{error}</div> : null}
          </div>
        </section>

        {/* Right column: fixed, full-viewport stage (no vertical growth) */}
        <section className="landing-right">
          <div className="canvas-stage">
            <DiscoBallCanvas />
            <div className="stage-overlay">

              {selectedTile !== null && (
                <div style={{ pointerEvents: "auto", marginLeft: "auto" }}>
                  <div className="login-card" style={{ minWidth: 240, borderRadius: 12 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                      <span
                        aria-hidden
                        style={{
                          width: 12,
                          height: 12,
                          borderRadius: 999,
                          background: selectedColor || "#ffffff",
                          boxShadow: "0 0 12px rgba(255,255,255,0.25)",
                          border: "1px solid rgba(255,255,255,0.35)",
                        }}
                      />
                      <div style={{ fontWeight: 800, fontSize: "0.95rem" }}>
                        {selectedCategory || "Trait"} • #{selectedTile}
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
                      <button
                        className="cta ghost"
                        onClick={() => {
                          window.dispatchEvent(new CustomEvent("legaci:resumeAutoRotate"));
                        }}
                      >
                        Resume
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* Scroll sections */}
      <section id="about" className="site-section">
        <motion.div
          className="section-inner"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Uploaded Intelligence</h2>
          <p className="section-lead">
            The world is obsessed with artificial intelligence. Legaci is about Uploaded Intelligence:
            using AI to capture, organize and evolve the knowledge, voice and choices that make you, you.
          </p>
          <div className="feature-grid">
            <div className="feature-card">
              <h3>Clone your personality</h3>
              <p>
                Build a living model of how you think and respond. Add traits and moments, and train it
                with your perspectives as you chat. Your globe becomes a personalized map of what matters.
              </p>
            </div>
            <div className="feature-card">
              <h3>Train from your knowledge base</h3>
              <p>
                Connect notes, docs and links. We chunk, embed, encrypt and index safely. Your assistant
                learns your references and writing style without exposing sensitive data.
              </p>
            </div>
            <div className="feature-card">
              <h3>Voice that sounds like you</h3>
              <p>
                With consent, upload a short sample to enable an on-device-like voice that mirrors your tone.
                Stream answers with text and audio in real time.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      <section id="uploaded-intel" className="site-section alt">
        <motion.div
          className="section-inner"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.6, delay: 0.05 }}
        >
          <h2 className="section-title">Your story, continuously</h2>
          <p className="section-lead">
            Legaci blends your memories, decisions and references into an evolving model. It highlights gaps,
            asks better follow‑ups, and helps you remember with context.
          </p>
          <div className="bullets">
            <div className="bullet">
              <span className="dot" />
              <div>
                <strong>Personal memory globe</strong>
                <p>Interact with a dynamic 3D map of your life. Hover and select to explore categories.</p>
              </div>
            </div>
            <div className="bullet">
              <span className="dot" />
              <div>
                <strong>Privacy-first</strong>
                <p>Client-side encryption for sensitive payloads and minimal required metadata on the server.</p>
              </div>
            </div>
            <div className="bullet">
              <span className="dot" />
              <div>
                <strong>Realtime learning</strong>
                <p>New sources and chats update your traits and completeness live—watch tiles shift as you grow.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <section id="voice" className="site-section">
        <motion.div
          className="section-inner"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.6, delay: 0.05 }}
        >
          <h2 className="section-title">Sound like yourself</h2>
          <p className="section-lead">
            Optional voice cloning produces a natural, familiar voice for answers and summaries. Consent‑gated and revocable.
          </p>
          <div className="cta-row">
            <motion.button
              className="cta primary"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              Try the demo
            </motion.button>
            <a className="nav-link strong" href="/auth">Log in / Sign up</a>
          </div>
        </motion.div>
      </section>

      <section id="contact" className="site-section alt">
        <motion.div
          className="section-inner"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.6, delay: 0.05 }}
        >
          <h2 className="section-title">Contact</h2>
          <p className="section-lead">
            Questions, ideas, or partnering? We’d love to hear from you.
          </p>
          <div className="contact-row">
            <a href="mailto:hello@legaci.app" className="contact-chip">hello@legaci.app</a>
            <a href="https://x.com" target="_blank" rel="noreferrer" className="contact-chip">X / Twitter</a>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="contact-chip">GitHub</a>
          </div>
        </motion.div>
      </section>

      <footer className="landing-footer">
        Built with privacy-first defaults • © {new Date().getFullYear()} Legaci
      </footer>
    </div>
  );
}