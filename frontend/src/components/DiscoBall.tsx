"use client";

import React, { useRef, useState, useMemo, useEffect, useCallback } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/**
 * DiscoBall (homepage demo version)
 * - Instanced tiles distributed on a sphere (Fibonacci)
 * - Continuous "alive" pulsing: each tile moves in/out along its normal with its own phase/speed
 * - Category-based per-instance colors
 * - Hover highlight, click to select:
 *   - stops autorotation
 *   - pops the tile out more
 *   - dispatches: window.dispatchEvent(new CustomEvent("legaci:tileSelect", { detail: { instanceId, category, categoryIndex } }))
 * - No shaders required; uses MeshPhysicalMaterial + instanced colors for robustness
 */

interface DiscoBallProps {
  tileCount?: number;
  radius?: number;
}

const CATEGORY_COUNT = 8;
const CATEGORY_NAMES = [
  "Childhood",
  "Personality",
  "Career",
  "Relationships",
  "Health",
  "Habits",
  "Location",
  "Misc/Notes",
];

// Color palette for categories (feel free to tweak)
const CATEGORY_PALETTE = [
  0x7ac7ff, // Childhood
  0xff9ed1, // Personality
  0x9be8ff, // Career
  0xffc78a, // Relationships
  0x9dffa1, // Health
  0xf6ff7a, // Habits
  0xc3a3ff, // Location
  0xffa8f2, // Misc
].map((hex) => new THREE.Color(hex));

// Slightly darker variant for idle state (multiplied)
const DARKEN = 0.75;

export default function DiscoBall({ tileCount = 2000, radius = 5 }: DiscoBallProps) {
  const meshRef = useRef<THREE.InstancedMesh | null>(null);
  const { camera, gl, clock } = useThree();

  const raycaster = useMemo(() => new THREE.Raycaster(), []);
  const pointer = useMemo(() => new THREE.Vector2(), []);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // States
  const [hovered, setHovered] = useState<number | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const [autoRotate, setAutoRotate] = useState(true);

  // Geometry - smaller to increase visible gaps between tiles
  const geom = useMemo(() => new THREE.PlaneGeometry(0.36, 0.36), []);

  // Robust physical material that respects instanced colors
  const material = useMemo(() => {
    const m = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(0xffffff), // base white so instance colors show
      metalness: 0.95,
      roughness: 0.08,
      clearcoat: 0.7,
      clearcoatRoughness: 0.05,
      emissive: new THREE.Color(0x151520),
      emissiveIntensity: 0.08,
      side: THREE.DoubleSide,
      vertexColors: true,
    } as any);
    return m;
  }, []);

  // Per-instance base directions and pulse params
  const baseDirs = useRef<Float32Array | null>(null); // length = count * 3
  const pulsePhase = useRef<Float32Array | null>(null); // 0..2π
  const pulseSpeed = useRef<Float32Array | null>(null); // 0.6..1.6
  const pulseAmp = useRef<Float32Array | null>(null); // 0.02..0.18

  // Track colored selection/hover updates efficiently
  const lastHoverRef = useRef<number | null>(null);
  const lastSelectRef = useRef<number | null>(null);

  // Initialize instances
  useEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const count = tileCount;
    mesh.count = count;

    // Ensure per-instance color buffer exists for setColorAt/vertexColors
    if (!(mesh as any).instanceColor) {
      (mesh as any).instanceColor = new THREE.InstancedBufferAttribute(
        new Float32Array(count * 3),
        3
      );
    }

    // attributes for external integrations (kept for compatibility)
    const catAttr = new THREE.InstancedBufferAttribute(new Float32Array(count), 1);
    const compAttr = new THREE.InstancedBufferAttribute(new Float32Array(count), 1);
    const selAttr = new THREE.InstancedBufferAttribute(new Float32Array(count), 1);

    // allocate dirs and pulse params
    baseDirs.current = new Float32Array(count * 3);
    pulsePhase.current = new Float32Array(count);
    pulseSpeed.current = new Float32Array(count);
    pulseAmp.current = new Float32Array(count);

    // assign category colors and base transforms
    for (let i = 0; i < count; i++) {
      const t = i / Math.max(1, count - 1);
      const inc = Math.acos(1 - 2 * t);
      const azi = Math.PI * (1 + Math.sqrt(5)) * i;

      const x = Math.sin(inc) * Math.cos(azi);
      const y = Math.cos(inc);
      const z = Math.sin(inc) * Math.sin(azi);

      // store base directions (unit)
      baseDirs.current[i * 3 + 0] = x;
      baseDirs.current[i * 3 + 1] = y;
      baseDirs.current[i * 3 + 2] = z;

      // initial transform
      const outward = new THREE.Vector3(x, y, z);
      dummy.position.copy(outward).normalize().multiplyScalar(radius + 0.03);
      dummy.lookAt(outward.clone().multiplyScalar(2));
      // slight outward to avoid z-fighting
      dummy.position.addScaledVector(outward, 0.01);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);

      // category + instance colors
      const cat = i % CATEGORY_COUNT;
      catAttr.setX(i, cat);

      const baseColor = CATEGORY_PALETTE[cat].clone().multiplyScalar(DARKEN);
      mesh.setColorAt(i, baseColor);

      // completeness - later could map to pulse amp/brightness
      const completeness = Math.min(1, Math.max(0, Math.random() * 0.85 + 0.05));
      compAttr.setX(i, completeness);

      // selection flag init
      selAttr.setX(i, 0);

      // pulse params
      pulsePhase.current[i] = Math.random() * Math.PI * 2;
      pulseSpeed.current[i] = 0.6 + Math.random() * 1.0; // 0.6..1.6 Hz-ish
      // amplitude scaled a bit by completeness so more complete = more subtle
      const amp = 0.05 + Math.random() * 0.13;
      pulseAmp.current[i] = amp * (0.7 + 0.6 * (1 - completeness));
    }

    mesh.geometry.setAttribute("aCategory", catAttr);
    mesh.geometry.setAttribute("aCompleteness", compAttr);
    mesh.geometry.setAttribute("aSelected", selAttr);

    mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    catAttr.setUsage(THREE.DynamicDrawUsage);
    compAttr.setUsage(THREE.DynamicDrawUsage);
    selAttr.setUsage(THREE.DynamicDrawUsage);

    mesh.instanceMatrix.needsUpdate = true;
    if ((mesh as any).instanceColor) {
      (mesh as any).instanceColor.needsUpdate = true;
    }
    catAttr.needsUpdate = true;
    compAttr.needsUpdate = true;
    selAttr.needsUpdate = true;
  }, [tileCount, radius]);

  // Utility: safely set instance color and mark update
  const setInstanceColor = useCallback((i: number, color: THREE.Color) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    mesh.setColorAt(i, color);
    (mesh.instanceColor as any).needsUpdate = true;
  }, []);

  // Utility: restore category color
  const restoreCategoryColor = useCallback((i: number) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const catAttr = mesh.geometry.getAttribute("aCategory") as THREE.InstancedBufferAttribute | null;
    if (!catAttr) return;
    const catIndex = Math.floor(catAttr.getX(i)) % CATEGORY_COUNT;
    const baseColor = CATEGORY_PALETTE[catIndex].clone().multiplyScalar(DARKEN);
    setInstanceColor(i, baseColor);
  }, [setInstanceColor]);

  // Animate tiles "alive" and autorotation
  useFrame((_, delta) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const count = mesh.count;

    if (autoRotate) {
      mesh.rotation.y += 0.25 * delta; // ~0.25 rad/s
    }

    const dirs = baseDirs.current;
    const phases = pulsePhase.current;
    const speeds = pulseSpeed.current;
    const amps = pulseAmp.current;
    if (!dirs || !phases || !speeds || !amps) return;

    const time = clock.getElapsedTime();

    for (let i = 0; i < count; i++) {
      const dx = dirs[i * 3 + 0];
      const dy = dirs[i * 3 + 1];
      const dz = dirs[i * 3 + 2];
      const outward = new THREE.Vector3(dx, dy, dz);

      // base pulse
      let out = Math.sin(time * speeds[i] + phases[i]) * amps[i];

      // gentle hover boost
      if (hovered === i) out += 0.08;

      // selection boost
      if (selected === i) out += 0.18;

      dummy.position.copy(outward).multiplyScalar(radius + 0.03 + out);
      dummy.lookAt(outward.clone().multiplyScalar(2));
      dummy.position.addScaledVector(outward, 0.01);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }

    mesh.instanceMatrix.needsUpdate = true;
  });

  // Update selection attribute + visual color highlight
  const updateSelectedAttr = useCallback((index: number, val: number) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const selAttr = mesh.geometry.getAttribute("aSelected") as THREE.InstancedBufferAttribute | null;
    if (!selAttr) return;
    selAttr.setX(index, val);
    selAttr.needsUpdate = true;
  }, []);

  const highlightInstance = useCallback((i: number, factor = 1.25) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const catAttr = mesh.geometry.getAttribute("aCategory") as THREE.InstancedBufferAttribute | null;
    if (!catAttr) return;
    const catIndex = Math.floor(catAttr.getX(i)) % CATEGORY_COUNT;
    const base = CATEGORY_PALETTE[catIndex];
    const c = base.clone().multiplyScalar(factor);
    setInstanceColor(i, c);
  }, [setInstanceColor]);

  // Pointer handlers (throttled)
  const lastPointer = useRef(0);
  const onPointerMove = useCallback((e: PointerEvent) => {
    const now = performance.now();
    if (now - lastPointer.current < 33) return;
    lastPointer.current = now;

    const rect = gl.domElement.getBoundingClientRect();
    pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    const mesh = meshRef.current;
    if (!mesh) return;
    raycaster.setFromCamera(pointer, camera);
    const hits = raycaster.intersectObject(mesh) as Array<THREE.Intersection & { instanceId?: number }>;

    if (hits.length > 0 && typeof hits[0].instanceId === "number") {
      const id = hits[0].instanceId!;

      // restore previous hover color
      if (lastHoverRef.current !== null && lastHoverRef.current !== id) {
        restoreCategoryColor(lastHoverRef.current);
      }

      if (lastHoverRef.current !== id) {
        highlightInstance(id, 1.5);
        lastHoverRef.current = id;
      }

      setHovered((prev) => {
        if (prev !== id) {
          updateSelectedAttr(id, 1);
          try {
            window.dispatchEvent(new CustomEvent("legaci:tileHover", { detail: { instanceId: id } }));
          } catch {}
          return id;
        }
        return prev;
      });
      return;
    }

    // nothing hovered
    if (lastHoverRef.current !== null) {
      restoreCategoryColor(lastHoverRef.current);
      lastHoverRef.current = null;
    }
    setHovered((prev) => {
      if (prev !== null) updateSelectedAttr(prev, 0);
      try {
        window.dispatchEvent(new CustomEvent("legaci:tileHover", { detail: { instanceId: null } }));
      } catch {}
      return null;
    });
  }, [camera, gl.domElement, pointer, raycaster, updateSelectedAttr, highlightInstance, restoreCategoryColor]);

  const onPointerDown = useCallback((e: PointerEvent) => {
    const rect = gl.domElement.getBoundingClientRect();
    pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    const mesh = meshRef.current;
    if (!mesh) return;
    raycaster.setFromCamera(pointer, camera);
    const hits = raycaster.intersectObject(mesh) as Array<THREE.Intersection & { instanceId?: number }>;
    if (hits.length > 0) {
      const id = hits[0].instanceId;
      if (typeof id === "number") {
        setSelected((prev) => {
          // restore previous selection color
          if (lastSelectRef.current !== null && lastSelectRef.current !== id) {
            restoreCategoryColor(lastSelectRef.current);
          }

          const next = prev === id ? null : id;
          if (prev !== null) updateSelectedAttr(prev, 0);
          if (next !== null) {
            updateSelectedAttr(next, 1.5);
            setAutoRotate(false); // stop autorotation on selection
            lastSelectRef.current = next;

            // amplify the selected color
            highlightInstance(next, 1.8);

            // Emit event with category info and color for landing overlay
            const catAttr = mesh.geometry.getAttribute("aCategory") as THREE.InstancedBufferAttribute | null;
            let categoryIndex = 0;
            let category = "Unknown";
            if (catAttr) {
              categoryIndex = Math.floor(catAttr.getX(next)) % CATEGORY_COUNT;
              category = CATEGORY_NAMES[categoryIndex];
            }
            const colorHex = "#" + CATEGORY_PALETTE[categoryIndex].getHexString();
            window.dispatchEvent(
              new CustomEvent("legaci:tileSelect", {
                detail: { instanceId: next, category, categoryIndex, colorHex },
              })
            );
          } else {
            // deselected
            lastSelectRef.current = null;
          }
          return next;
        });
      }
    }
  }, [camera, gl.domElement, pointer, raycaster, updateSelectedAttr, highlightInstance, restoreCategoryColor]);

  // Attach DOM listeners to the canvas
  useEffect(() => {
    const canvas = gl.domElement;
    canvas.style.touchAction = "none";
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerdown", onPointerDown);
    return () => {
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerdown", onPointerDown);
    };
  }, [gl.domElement, onPointerMove, onPointerDown]);

  // External updates (kept for compatibility)
  useEffect(() => {
    function onTraitUpdated(e: CustomEvent) {
      const detail = e.detail ?? {};
      const { category, completeness, instanceId } = detail as {
        category?: string;
        completeness?: number;
        instanceId?: number;
      };
      const mesh = meshRef.current;
      if (!mesh) return;
      const catAttr = mesh.geometry.getAttribute("aCategory") as THREE.InstancedBufferAttribute | null;
      const compAttr = mesh.geometry.getAttribute("aCompleteness") as THREE.InstancedBufferAttribute | null;
      if (!catAttr || !compAttr) return;

      if (typeof instanceId === "number") {
        compAttr.setX(instanceId, typeof completeness === "number" ? completeness : compAttr.getX(instanceId));
        compAttr.needsUpdate = true;
        mesh.instanceMatrix.needsUpdate = true;
        return;
      }

      if (typeof category === "string") {
        const list = CATEGORY_NAMES;
        const catIndex = list.indexOf(category);
        if (catIndex === -1) return;
        for (let i = 0; i < mesh.count; i++) {
          const instCat = Math.floor(catAttr.getX(i));
          if (instCat === catIndex) {
            if (typeof completeness === "number") compAttr.setX(i, completeness);
          }
        }
        compAttr.needsUpdate = true;
        mesh.instanceMatrix.needsUpdate = true;
      }
    }

    window.addEventListener("legaci:traitUpdated", onTraitUpdated as EventListener);
    return () => window.removeEventListener("legaci:traitUpdated", onTraitUpdated as EventListener);
  }, []);

  // External control: resume autorotation from UI
  useEffect(() => {
    function onResumeAutoRotate() {
      setAutoRotate(true);
    }
    window.addEventListener("legaci:resumeAutoRotate", onResumeAutoRotate as EventListener);
    return () => window.removeEventListener("legaci:resumeAutoRotate", onResumeAutoRotate as EventListener);
  }, []);

  return (
    <instancedMesh ref={meshRef} args={[geom, material, tileCount]} castShadow receiveShadow />
  );
}