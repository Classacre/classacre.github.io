"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function AuthPage() {
  const [mode, setMode] = useState<"login" | "signup">("signup");
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleAction() {
    if (!email) {
      setError("Please enter your email");
      return;
    }
    setBusy(true);
    setError(null);
    try {
      const endpoint = mode === "signup" ? "/api/auth/register-passkey" : "/api/auth/login-passkey";
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error(await res.text());
      // In a real flow we'd follow with navigator.credentials (WebAuthn)
      // and then verify via the corresponding /verify endpoints.
      console.log(`${mode} request created`);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main
      style={{
        minHeight: "100svh",
        padding: "clamp(16px, 3vw, 28px)",
        display: "grid",
        alignItems: "center",
        justifyItems: "center",
        background:
          "radial-gradient(1200px 600px at 10% -10%, rgba(107,99,255,0.16), transparent 60%), radial-gradient(1200px 600px at 110% 10%, rgba(0,194,199,0.18), transparent 60%), linear-gradient(180deg, #070c16 0%, #0b0f14 100%)",
      }}
    >
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          width: "min(680px, 96vw)",
          background: "linear-gradient(180deg, rgba(18,22,38,0.68), rgba(10,12,22,0.56))",
          border: "1px solid rgba(255,255,255,0.06)",
          boxShadow: "0 24px 60px rgba(8,10,18,0.55)",
          borderRadius: 14,
          padding: 18,
          color: "var(--textPrimary, #E5E7EB)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
          <Link href="/" style={{ color: "#9CA3AF", textDecoration: "none", fontWeight: 700 }}>
            ← Back
          </Link>
          <div style={{ display: "flex", gap: 8 }}>
            <button
              onClick={() => setMode("login")}
              className="nav-link"
              style={{
                color: mode === "login" ? "#fff" : "var(--textSecondary, #9CA3AF)",
                background: mode === "login" ? "rgba(255,255,255,0.06)" : "transparent",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 8,
                padding: "6px 10px",
                fontWeight: 800,
              }}
            >
              Log in
            </button>
            <button
              onClick={() => setMode("signup")}
              className="nav-link"
              style={{
                color: mode === "signup" ? "#0b0f14" : "var(--textPrimary, #E5E7EB)",
                background:
                  mode === "signup"
                    ? "linear-gradient(90deg, #6b63ff, #00c2c7)"
                    : "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03))",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 8,
                padding: "6px 10px",
                fontWeight: 800,
              }}
            >
              Sign up
            </button>
          </div>
        </div>

        <h1
          style={{
            margin: "12px 0 0 0",
            fontSize: "clamp(26px, 5vw, 42px)",
            fontWeight: 900,
            background: "linear-gradient(90deg, #ffffff 0%, #dcd6ff 60%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {mode === "signup" ? "Create your account" : "Welcome back"}
        </h1>

        <p style={{ color: "var(--textSecondary, #9CA3AF)", marginTop: 8, maxWidth: 720, lineHeight: 1.6 }}>
          Use your email to start a passkey-based {mode}. No passwords. You'll confirm using your device
          credentials on the next step.
        </p>

        <div style={{ marginTop: 16, display: "grid", gap: 10 }}>
          <label htmlFor="email" style={{ color: "var(--textSecondary, #9CA3AF)" }}>
            Email
          </label>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <input
              id="email"
              type="email"
              value={email}
              placeholder="you@domain.com"
              onChange={(e) => setEmail(e.target.value)}
              style={{
                flex: 1,
                minWidth: 0,
                background: "rgba(8,10,18,0.5)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 10,
                padding: "10px 12px",
                color: "#E5E7EB",
              }}
            />
            <button
              onClick={handleAction}
              disabled={busy}
              style={{
                whiteSpace: "nowrap",
                border: 0,
                borderRadius: 10,
                padding: "10px 14px",
                fontWeight: 800,
                background: "linear-gradient(90deg, #6b63ff, #00c2c7)",
                color: "#0b0f14",
                boxShadow: "0 8px 26px rgba(107,99,255,0.18)",
                cursor: "pointer",
                opacity: busy ? 0.7 : 1,
              }}
            >
              {busy ? "Processing..." : mode === "signup" ? "Sign up" : "Log in"}
            </button>
          </div>
          {error ? (
            <div style={{ color: "#ff8a8a", fontSize: "0.9rem" }}>{error}</div>
          ) : null}
        </div>

        <div style={{ marginTop: 16, display: "grid", gap: 8 }}>
          <strong>What you get</strong>
          <ul style={{ margin: 0, paddingLeft: 18, color: "var(--textSecondary, #9CA3AF)" }}>
            <li>Personal memory globe, traits and sources</li>
            <li>Uploaded Intelligence: your voice, style and knowledge base</li>
            <li>Privacy-first defaults, encryption for sensitive data</li>
          </ul>
        </div>
      </motion.section>
    </main>
  );
}