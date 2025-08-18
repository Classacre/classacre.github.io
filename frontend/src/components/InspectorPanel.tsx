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

  // Fetch traits for selectedCategory
  useEffect(() => {
    let mounted = true;
    async function load() {
      if (!selectedCategory) {
        setTraits([]);
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/traits?category=${encodeURIComponent(selectedCategory)}`);
        if (!res.ok) throw new Error("Failed to fetch traits");
        const body = await res.json();
        const t = (body.traits ?? []) as Trait[];
        if (!mounted) return;
        setTraits(t);
      } catch (err: unknown) {
        console.error("InspectorPanel load error", err);
        if (!mounted) return;
        const msg = err instanceof Error ? err.message : String(err);
        setError(msg);
        setTraits([]);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
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