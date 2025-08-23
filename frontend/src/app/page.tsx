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
              className="brand-logo"
              draggable={false}
            />
            <h1 className="brand-heading">Legaci</h1>
            <p className="brand-sub">Capture what matters. Remember better.</p>
          </motion.div>

          <p className="brand-lead">
            A modern, privacy-first memory companion. Explore your story on a living, colorful 3D
            globe. Sign in securely with a passkey, add traits and moments, and see your progress
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
                {loading ? "Authenticating..." : "Sign in"}
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
              <div className="stage-badge">Interactive memory globe</div>

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

      <footer className="landing-footer">
        Built with privacy-first defaults • © {new Date().getFullYear()} Legaci
      </footer>
    </div>
  );
}