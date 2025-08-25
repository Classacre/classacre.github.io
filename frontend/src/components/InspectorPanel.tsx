"use client";

import React, { useEffect, useState } from "react";

/**
 * frontend/src/components/InspectorPanel.tsx
 *
 * Listens for global "legaci:tileSelect" events emitted by the DiscoBall.
 * - When a tile is selected we derive the category (by instanceId -> category assignment
 *   used by the DiscoBall) by asking the backend for traits grouped by category. For now
 *   DiscoBall evenly assigns categories across instances, so we request traits for the
 *   category and surface them for editing.
 *
 * API interactions:
 * - GET /api/traits?category=CategoryName
 * - POST /api/traits/upsert  { category, key, value_json, confidence, completeness, provenance }
 *
 * Accessibility:
 * - All interactive controls keyboard-focusable and labelled.
 */

type Trait = {
  id: string;
  category: string;
  key: string;
  value_json: unknown;
  confidence: number;
  completeness: number;
  provenance?: string | null;
  updated_at?: string;
};

const CATEGORIES = [
  "Childhood",
  "Personality",
  "Career",
  "Relationships",
  "Health",
  "Habits",
  "Location",
  "Misc/Notes",
] as const;
type Category = (typeof CATEGORIES)[number];

export default function InspectorPanel() {
  const [selectedInstance, setSelectedInstance] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [traits, setTraits] = useState<Trait[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Sources shown for the selected category (lightweight metadata only)
  const [sources, setSources] = useState<{ id: string; type: string; title: string; created_at: string }[]>([]);
  const [loadingSources, setLoadingSources] = useState(false);

  const [editing, setEditing] = useState<Trait | null>(null);
  const [newTraitKey, setNewTraitKey] = useState("");
  const [newTraitValue, setNewTraitValue] = useState("");
  const [newTraitCompleteness, setNewTraitCompleteness] = useState<number>(0.5);
  const [newTraitConfidence, setNewTraitConfidence] = useState<number>(0.6);

  // Listen for DiscoBall selection events
  useEffect(() => {
    function onSelect(e: Event) {
      const detail = (e as CustomEvent<Record<string, unknown>>).detail ?? {};
      const instanceId = typeof detail.instanceId === "number" ? detail.instanceId : undefined;
      if (typeof instanceId === "number") {
        setSelectedInstance(instanceId);
        // Heuristic: map instanceId -> category by modulo used by DiscoBall
        const catIndex = instanceId % CATEGORIES.length;
        const category = CATEGORIES[catIndex];
        setSelectedCategory(category);
      }
    }
    window.addEventListener("legaci:tileSelect", onSelect as EventListener);
    return () => window.removeEventListener("legaci:tileSelect", onSelect as EventListener);
  }, []);

  // Fetch traits and sources for selectedCategory
  useEffect(() => {
    let mounted = true;

    async function loadTraitsAndSources() {
      if (!selectedCategory) {
        setTraits([]);
        setSources([]);
        return;
      }

      setLoading(true);
      setLoadingSources(true);
      setError(null);

      try {
        // traits
        const tRes = await fetch(`/api/traits?category=${encodeURIComponent(selectedCategory)}`);
        if (!tRes.ok) throw new Error("Failed to fetch traits");
        const tBody = await tRes.json();
        const t = (tBody.traits ?? []) as Trait[];
        if (mounted) setTraits(t);
      } catch (err: unknown) {
        console.error("InspectorPanel load traits error", err);
        if (mounted) {
          const msg = err instanceof Error ? err.message : String(err);
          setError(msg);
          setTraits([]);
        }
      } finally {
        if (mounted) setLoading(false);
      }

      try {
        // lightweight sources metadata
        const sRes = await fetch(`/api/sources/list?category=${encodeURIComponent(selectedCategory)}`);
        if (!sRes.ok) {
          // don't surface a hard error for missing sources endpoint; just empty
          setSources([]);
        } else {
          const sBody = await sRes.json();
          if (mounted) setSources(sBody.sources ?? []);
        }
      } catch (err: unknown) {
        console.warn("InspectorPanel load sources error", err);
        if (mounted) setSources([]);
      } finally {
        if (mounted) setLoadingSources(false);
      }
    }

    loadTraitsAndSources();

    return () => {
      mounted = false;
    };
  }, [selectedCategory]);

  async function upsertTrait(
    category: Category,
    key: string,
    value_json: unknown,
    confidence = 0.6,
    completeness = 0.5,
    provenance = "inspector"
  ) {
    try {
      const payload = { category, key, value_json, confidence, completeness, provenance };
      const res = await fetch("/api/traits/upsert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.error || "Failed to upsert trait");
      }

      // server response (created/updated trait)
      const updated = await res.json();

      // refresh trait list for the currently selected category
      if (selectedCategory) {
        const r = await fetch(`/api/traits?category=${encodeURIComponent(selectedCategory)}`);
        const body = await r.json();
        setTraits(body.traits ?? []);
      }

      // Emit a global event so the DiscoBall can update instance attributes live.
      // Provide category and completeness; include instanceId when available from the UI selection.
      try {
        const detail: Record<string, unknown> = { category, completeness };
        if (typeof selectedInstance === "number") (detail as any).instanceId = selectedInstance;
        window.dispatchEvent(new CustomEvent("legaci:traitUpdated", { detail }));
      } catch (e) {
        console.warn("Could not dispatch legaci:traitUpdated event", e);
      }

      return { success: true, result: updated };
    } catch (err: unknown) {
      console.error("upsertTrait error", err);
      const msg = err instanceof Error ? err.message : String(err);
      setError(msg);
      return { success: false, error: err };
    }
  }

  function openEdit(tr: Trait) {
    setEditing(tr);
    setNewTraitKey(tr.key);
    try {
      setNewTraitValue(JSON.stringify(tr.value_json, null, 2));
    } catch {
      setNewTraitValue(String(tr.value_json));
    }
    setNewTraitCompleteness(tr.completeness ?? 0.5);
    setNewTraitConfidence(tr.confidence ?? 0.6);
  }

  function closeEdit() {
    setEditing(null);
    setNewTraitKey("");
    setNewTraitValue("");
  }

  async function saveEdit() {
    if (!selectedCategory) return;
    try {
      const parsed = JSON.parse(newTraitValue);
      await upsertTrait(selectedCategory, newTraitKey, parsed, newTraitConfidence, newTraitCompleteness, "inspector-edit");
      closeEdit();
    } catch (err: unknown) {
      setError("Invalid JSON in trait value");
    }
  }

  async function addNewTrait() {
    if (!selectedCategory) return;
    if (!newTraitKey || !newTraitValue) {
      setError("Please provide key and value for the new trait");
      return;
    }
    try {
      const parsed = JSON.parse(newTraitValue);
      await upsertTrait(selectedCategory, newTraitKey, parsed, newTraitConfidence, newTraitCompleteness, "inspector-new");
      // clear inputs
      setNewTraitKey("");
      setNewTraitValue("");
    } catch (err: unknown) {
      setError("Invalid JSON in trait value");
    }
  }

  // Open a lightweight viewer for a source (fetch metadata). Content remains encrypted server-side.
  async function viewSource(id: string) {
    try {
      const res = await fetch(`/api/sources/get?id=${encodeURIComponent(id)}`);
      if (!res.ok) {
        const text = await res.text().catch(() => "Failed to fetch");
        alert(`Failed to load source: ${text}`);
        return;
      }
      const body = await res.json();
      const pretty = JSON.stringify(body.source ?? body, null, 2);
      // open in new window as text
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

  // Quick log a source using prompt dialogs (small UX, avoids extra state).
  async function logSource() {
    try {
      const type = window.prompt("Source type (survey, chat, file, link)", "file");
      if (!type) return;
      const title = window.prompt("Title for source", "Untitled source");
      if (!title) return;
      const content = window.prompt("Paste plaintext content (will be encrypted before storage)");
      if (!content) return;

      const payload = { type, title, content };
      const res = await fetch("/api/sources/log", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.error || "Failed to log source");
      }
      const body = await res.json();
      // refresh source list if a category is selected
      if (selectedCategory) {
        try {
          const sRes = await fetch(`/api/sources/list?category=${encodeURIComponent(selectedCategory)}`);
          if (sRes.ok) {
            const sBody = await sRes.json();
            setSources(sBody.sources ?? []);
          }
        } catch {}
      }
      // emit event so UI can react
      try {
        window.dispatchEvent(new CustomEvent("legaci:sourceLogged", { detail: { source: body.source } }));
      } catch {}
      alert("Source logged");
    } catch (err: unknown) {
      console.error("logSource error", err);
      alert("Failed to log source");
    }
  }

  return (
    <aside
      aria-labelledby="inspector-title"
      className="w-full md:w-96 bg-surface text-textPrimary p-4 overflow-auto border-l border-surface/60"
    >
      <h2 id="inspector-title" className="text-lg font-medium mb-2">
        Inspector
      </h2>

      {selectedInstance === null ? (
        <div className="text-textSecondary">Select a tile on the disco ball to inspect traits.</div>
      ) : (
        <div className="space-y-3">
          <div className="text-sm text-textSecondary">Selected tile: <span className="font-mono text-textPrimary ml-2">{selectedInstance}</span></div>
          <div className="text-sm">Category: <strong className="ml-2">{selectedCategory}</strong></div>

          <div className="mt-2">
            <h3 className="text-sm font-semibold">Traits</h3>
            {loading ? (
              <div className="text-textSecondary">Loading…</div>
            ) : error ? (
              <div className="text-red-400 text-sm">{error}</div>
            ) : traits.length === 0 ? (
              <div className="text-textSecondary text-sm">No traits found for this category.</div>
            ) : (
              <ul className="space-y-2">
                {traits.map((t) => (
                  <li key={t.id} className="p-2 bg-surface/50 rounded-md">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="text-sm font-medium">{t.key}</div>
                        <div className="text-xs text-textSecondary mt-1">{JSON.stringify(t.value_json)}</div>
                        <div className="text-xs text-textSecondary mt-1">Completeness: {(t.completeness ?? 0).toFixed(2)} • Confidence: {(t.confidence ?? 0).toFixed(2)}</div>
                        {t.provenance ? <div className="text-xs text-textSecondary">Source: {t.provenance}</div> : null}
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <button
                          className="text-xs px-2 py-1 rounded bg-primary text-white"
                          onClick={() => openEdit(t)}
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="mt-3">
            <h3 className="text-sm font-semibold">Sources</h3>
            {loadingSources ? (
              <div className="text-textSecondary">Loading sources…</div>
            ) : sources.length === 0 ? (
              <div className="text-textSecondary text-sm">No sources found for this category.</div>
            ) : (
              <ul className="space-y-2">
                {sources.map((s) => (
                  <li key={s.id} className="p-2 bg-surface/40 rounded-md flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium">{s.title}</div>
                      <div className="text-xs text-textSecondary">{s.type} • {new Date(s.created_at).toLocaleString()}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="text-xs px-2 py-1 rounded bg-primary text-white" onClick={() => viewSource(s.id)}>View</button>
                      <button className="text-xs px-2 py-1 rounded bg-accent text-white" onClick={() => { try { navigator.clipboard?.writeText(s.id); alert('Source id copied'); } catch { viewSource(s.id); } }}>Copy ID</button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
            <div className="mt-2">
              <button className="px-3 py-1 rounded bg-accent text-white text-sm" onClick={logSource}>Log source</button>
            </div>
          </div>

          <div className="mt-3">
            <h3 className="text-sm font-semibold">Add / Edit</h3>
            <div className="space-y-2">
              <label className="block text-xs text-textSecondary">Key</label>
              <input className="w-full px-2 py-1 rounded bg-bg text-textPrimary border border-surface/60" value={newTraitKey} onChange={(e) => setNewTraitKey(e.target.value)} />

              <label className="block text-xs text-textSecondary mt-1">Value (JSON)</label>
              <textarea rows={4} className="w-full px-2 py-1 rounded bg-bg text-textPrimary border border-surface/60 font-mono text-xs" value={newTraitValue} onChange={(e) => setNewTraitValue(e.target.value)} />

              <div className="flex gap-2">
                <div className="flex-1">
                  <label className="block text-xs text-textSecondary">Completeness</label>
                  <input type="range" min={0} max={1} step={0.01} value={newTraitCompleteness} onChange={(e) => setNewTraitCompleteness(Number(e.target.value))} />
                </div>
                <div className="flex-1">
                  <label className="block text-xs text-textSecondary">Confidence</label>
                  <input type="range" min={0} max={1} step={0.01} value={newTraitConfidence} onChange={(e) => setNewTraitConfidence(Number(e.target.value))} />
                </div>
              </div>

              <div className="flex gap-2">
                <button className="px-3 py-1 rounded bg-accent text-white text-sm" onClick={addNewTrait}>Add Trait</button>
                {editing ? (
                  <>
                    <button className="px-3 py-1 rounded bg-primary text-white text-sm" onClick={saveEdit}>Save</button>
                    <button className="px-3 py-1 rounded bg-surface text-textSecondary text-sm" onClick={closeEdit}>Cancel</button>
                  </>
                ) : null}
              </div>

              {error ? <div className="text-red-400 text-sm mt-2">{error}</div> : null}
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}