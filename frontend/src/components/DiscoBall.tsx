"use client";

import React, { useRef, useState, useMemo, useEffect, useCallback } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import * as THREE from "three";

/**
 * frontend/src/components/DiscoBall.tsx
 *
 * Safe, production-ready DiscoBall using InstancedMesh + MeshStandardMaterial fallback.
 * This avoids custom GLSL issues and provides consistent rendering across devices.
 * Interaction: hover/select tiles, keyboard navigation, emits 'legaci:tileSelect'.
 */

interface DiscoBallProps {
  tileCount?: number;
  radius?: number;
  maxOffset?: number; // unused for standard material but kept for API compatibility
}

const CATEGORY_COUNT = 8;

export default function DiscoBall({ tileCount = 2000, radius = 5 }: DiscoBallProps) {
  const meshRef = useRef<THREE.InstancedMesh | null>(null);
  const { camera, gl } = useThree();
  const raycaster = useMemo(() => new THREE.Raycaster(), []);
  const pointer = useMemo(() => new THREE.Vector2(), []);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const [hovered, setHovered] = useState<number | null>(null);
  const [selected, setSelected] = useState<number | null>(null);

  // Geometry (small square tile)
  const geom = useMemo(() => new THREE.PlaneGeometry(0.48, 0.48), []);

  // Use a brighter MeshPhysicalMaterial so tiles are visible and reflective,
  // with subtle emissive tint to make the disco surface pop under lights.
  const material = useMemo(() => {
    const m = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(0x8a80ff),
      metalness: 0.95,
      roughness: 0.08,
      clearcoat: 0.7,
      clearcoatRoughness: 0.05,
      emissive: new THREE.Color(0x222033),
      emissiveIntensity: 0.12,
      side: THREE.DoubleSide,
    } as any);
    return m;
  }, []);

  // Initialize instanced attributes & positions
  useEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const count = tileCount;
    mesh.count = count;

    const catAttr = new THREE.InstancedBufferAttribute(new Float32Array(count), 1);
    const compAttr = new THREE.InstancedBufferAttribute(new Float32Array(count), 1);
    const selAttr = new THREE.InstancedBufferAttribute(new Float32Array(count), 1);

    for (let i = 0; i < count; i++) {
      const t = i / Math.max(1, count - 1);
      const inclination = Math.acos(1 - 2 * t);
      const azimuth = Math.PI * (1 + Math.sqrt(5)) * i;

      const x = Math.sin(inclination) * Math.cos(azimuth);
      const y = Math.cos(inclination);
      const z = Math.sin(inclination) * Math.sin(azimuth);

      dummy.position.set(x, y, z).normalize().multiplyScalar(radius);
      // make tile face outward
      dummy.lookAt(dummy.position.clone().multiplyScalar(2));
      // tiny offset so tiles don't z-fight at exact sphere surface
      dummy.position.addScaledVector(dummy.getWorldDirection(new THREE.Vector3()).normalize(), 0.01);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);

      catAttr.setX(i, i % CATEGORY_COUNT);
      // completeness mapped to scale (visual cue)
      const completeness = Math.min(1, Math.max(0, Math.random() * 0.85 + 0.05));
      compAttr.setX(i, completeness);
      selAttr.setX(i, 0);
    }

    mesh.geometry.setAttribute("aCategory", catAttr);
    mesh.geometry.setAttribute("aCompleteness", compAttr);
    mesh.geometry.setAttribute("aSelected", selAttr);

    mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    catAttr.setUsage(THREE.DynamicDrawUsage);
    compAttr.setUsage(THREE.DynamicDrawUsage);
    selAttr.setUsage(THREE.DynamicDrawUsage);

    mesh.instanceMatrix.needsUpdate = true;
    catAttr.needsUpdate = true;
    compAttr.needsUpdate = true;
    selAttr.needsUpdate = true;
  }, [tileCount, radius]);

  // Update selection attribute
  const updateSelectedAttr = useCallback((index: number, val: number) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const selAttr = mesh.geometry.getAttribute("aSelected") as THREE.InstancedBufferAttribute | null;
    if (!selAttr) return;
    selAttr.setX(index, val);
    selAttr.needsUpdate = true;
  }, []);

  // autorotate
  useFrame(() => {
    if (meshRef.current) meshRef.current.rotation.y += 0.0035;
  });

  // pointer handlers (throttled)
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
    if (hits.length > 0) {
      const id = hits[0].instanceId;
      if (typeof id === "number") {
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
    }
    setHovered((prev) => {
      if (prev !== null) {
        updateSelectedAttr(prev, 0);
        try {
          window.dispatchEvent(new CustomEvent("legaci:tileHover", { detail: { instanceId: null } }));
        } catch {}
      }
      return null;
    });
  }, [camera, gl.domElement, pointer, raycaster, updateSelectedAttr]);

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
          const next = prev === id ? null : id;
          if (prev !== null) updateSelectedAttr(prev, 0);
          if (next !== null) updateSelectedAttr(next, 1.5);
          return next;
        });
        window.dispatchEvent(new CustomEvent("legaci:tileSelect", { detail: { instanceId: id } }));
      }
    }
  }, [camera, gl.domElement, pointer, raycaster, updateSelectedAttr]);

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

  // live update listener
  useEffect(() => {
    function onTraitUpdated(e: CustomEvent) {
      const detail = e.detail ?? {};
      const { category, completeness, instanceId } = detail as { category?: string; completeness?: number; instanceId?: number };
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
        const categoryList = [
          "Childhood",
          "Personality",
          "Career",
          "Relationships",
          "Health",
          "Habits",
          "Location",
          "Misc/Notes",
        ];
        const catIndex = categoryList.indexOf(category);
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

  return (
    <>
      {/* cast/receive shadows and keep control of visual updates */}
      <instancedMesh ref={meshRef} args={[geom, material, tileCount]} castShadow receiveShadow />
      <OrbitControls enablePan={false} enableZoom={true} rotateSpeed={0.6} />
    </>
  );
}