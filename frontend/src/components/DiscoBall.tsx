// DiscoBall.tsx
"use client";

import React, { useRef, useState, useMemo, useEffect, useCallback } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/**
 * DiscoBall
 * - Per-instance colors shift from brand base -> category as the cubes protrude.
 * - Uses StandardMaterial + correct sRGB color pipeline (no manual linear-conversion).
 * - Keeps additive overlays but ensures they ride above the base without z-fighting.
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

// Category palette in sRGB (do NOT pre-convert to linear; the renderer handles it)
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

// Brand base (sRGB)
const BASE_BALL = new THREE.Color(0x6b63ff);

// Tile depth so the globe looks solid with just cubes
const TILE_DEPTH = 1.2;

export default function DiscoBall({ tileCount = 2000, radius = 5 }: DiscoBallProps) {
  const meshRef = useRef<THREE.InstancedMesh | null>(null);
  const glowRef = useRef<THREE.InstancedMesh | null>(null);
  const colorRef = useRef<THREE.InstancedMesh | null>(null);
  const { camera, gl, clock } = useThree();

  const raycaster = useMemo(() => {
    const r = new THREE.Raycaster();
    (r.params as any).Mesh = (r.params as any).Mesh || {};
    (r.params as any).Mesh.threshold = 0.8;
    return r;
  }, []);
  const pointer = useMemo(() => new THREE.Vector2(), []);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const overlayDummy = useMemo(() => new THREE.Object3D(), []);
  const vOut = useMemo(() => new THREE.Vector3(), []);
  const vTarget = useMemo(() => new THREE.Vector3(), []);
  const vLocal = useMemo(() => new THREE.Vector3(), []);
  const vNudge = useMemo(() => new THREE.Vector3(), []);
  const pickSphere = useMemo(() => new THREE.Sphere(new THREE.Vector3(0, 0, 0), radius), [radius]);

  const [hovered, setHovered] = useState<number | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const [autoRotate, setAutoRotate] = useState(true);

  // Cube geometry to form a solid sphere shell
  const geom = useMemo(() => {
    const g = new THREE.BoxGeometry(0.34, 0.34, TILE_DEPTH);
    g.computeBoundingSphere();
    return g;
  }, []);

  // Physically-based material that honors instance colors
  const material = useMemo(() => {
    const m = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0xffffff),
      metalness: 0.15,
      roughness: 0.45,
      envMapIntensity: 1.2,
      vertexColors: true,
      side: THREE.FrontSide,
      dithering: true,
      // small emissive base so tiles are never crushed to black
      emissive: new THREE.Color(0x1f1f1f),
      emissiveIntensity: 0.35,
    });
    return m;
  }, []);

  // Additive glow overlay
  const glowMaterial = useMemo(() => {
    const gm = new THREE.MeshBasicMaterial({
      color: new THREE.Color(0xffffff),
      side: THREE.FrontSide,
      vertexColors: true,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      depthTest: false,
    } as any);
    return gm;
  }, []);

  // Color tint overlay to make the category color pop
  const colorMaterial = useMemo(() => {
    const cm = new THREE.MeshBasicMaterial({
      color: new THREE.Color(0xffffff),
      side: THREE.FrontSide,
      vertexColors: true,
      transparent: true,
      opacity: 1.0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      depthTest: false,
    } as any);
    return cm;
  }, []);

  // Parameters per tile
  const baseDirs = useRef<Float32Array | null>(null);
  const pulsePhase = useRef<Float32Array | null>(null);
  const pulseSpeed = useRef<Float32Array | null>(null);
  const pulseAmp = useRef<Float32Array | null>(null);
  const prevKRef = useRef<Float32Array | null>(null);

  const lastHoverRef = useRef<number | null>(null);
  const lastSelectRef = useRef<number | null>(null);

  const getClosestIndex = useCallback((dir: THREE.Vector3) => {
    const mesh = meshRef.current;
    const dirs = baseDirs.current;
    if (!mesh || !dirs) return null;
    let best = -1;
    let bestDot = -Infinity;
    for (let i = 0, n = mesh.count; i < n; i++) {
      const dx = dirs[i * 3 + 0];
      const dy = dirs[i * 3 + 1];
      const dz = dirs[i * 3 + 2];
      const dot = dir.x * dx + dir.y * dy + dir.z * dz;
      if (dot > bestDot) {
        bestDot = dot;
        best = i;
      }
    }
    return best;
  }, []);

  const basePos = radius - TILE_DEPTH * 0.5;

  // Initialize instanced mesh
  useEffect(() => {
    const mesh = meshRef.current;
    const glow = glowRef.current;
    const colorOverlay = colorRef.current;
    if (!mesh) return;

    mesh.frustumCulled = false;
    if (glow) glow.frustumCulled = false;
    if (colorOverlay) colorOverlay.frustumCulled = false;

    const count = tileCount;
    mesh.count = count;
    if (glow) glow.count = count;
    if (colorOverlay) colorOverlay.count = count;

    // Ensure instanceColor exists for each instanced mesh
    const ensureInstanceColor = (m: THREE.InstancedMesh | null) => {
      if (!m) return;
      if (!m.instanceColor) {
        m.instanceColor = new THREE.InstancedBufferAttribute(new Float32Array(count * 3), 3);
      }
    };
    ensureInstanceColor(mesh);
    ensureInstanceColor(glow);
    ensureInstanceColor(colorOverlay);

    const catAttr = new THREE.InstancedBufferAttribute(new Float32Array(count), 1);
    const compAttr = new THREE.InstancedBufferAttribute(new Float32Array(count), 1);
    const selAttr = new THREE.InstancedBufferAttribute(new Float32Array(count), 1);

    baseDirs.current = new Float32Array(count * 3);
    pulsePhase.current = new Float32Array(count);
    pulseSpeed.current = new Float32Array(count);
    pulseAmp.current = new Float32Array(count);
    prevKRef.current = new Float32Array(count);
    prevKRef.current.fill(-1);

    const outward = new THREE.Vector3();

    for (let i = 0; i < count; i++) {
      // Fibonacci distribution
      const t = i / Math.max(1, count - 1);
      const inc = Math.acos(1 - 2 * t);
      const azi = Math.PI * (1 + Math.sqrt(5)) * i;

      const x = Math.sin(inc) * Math.cos(azi);
      const y = Math.cos(inc);
      const z = Math.sin(inc) * Math.sin(azi);

      // store base directions
      baseDirs.current[i * 3 + 0] = x;
      baseDirs.current[i * 3 + 1] = y;
      baseDirs.current[i * 3 + 2] = z;

      // initial transform (center on shell)
      outward.set(x, y, z);
      dummy.position.copy(outward).normalize().multiplyScalar(basePos);
      dummy.lookAt(outward.clone().multiplyScalar(2));
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
      if (glow) glow.setMatrixAt(i, dummy.matrix);
      if (colorOverlay) colorOverlay.setMatrixAt(i, dummy.matrix);

      // category attribute
      const catIndex = i % CATEGORY_COUNT;
      catAttr.setX(i, catIndex);

      // initial color -> brand base (sRGB)
      mesh.setColorAt(i, BASE_BALL);
      if (glow) glow.setColorAt(i, BASE_BALL);
      if (colorOverlay) colorOverlay.setColorAt(i, BASE_BALL);

      // completeness (unused here but kept for extensibility)
      const completeness = Math.min(1, Math.max(0, Math.random() * 0.85 + 0.05));
      compAttr.setX(i, completeness);

      // selection flag init
      selAttr.setX(i, 0);

      // pulse params
      pulsePhase.current[i] = Math.random() * Math.PI * 2;
      pulseSpeed.current[i] = 0.6 + Math.random() * 1.0;
      const amp = 0.05 + Math.random() * 0.13;
      pulseAmp.current[i] = amp * (0.7 + 0.6 * (1 - completeness));
    }

    // Make the per-instance custom attributes available
    // (shared geometry; one write updates all three instanced meshes)
    mesh.geometry.setAttribute("aCategory", catAttr);
    mesh.geometry.setAttribute("aCompleteness", compAttr);
    mesh.geometry.setAttribute("aSelected", selAttr);

    mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    catAttr.setUsage(THREE.DynamicDrawUsage);
    compAttr.setUsage(THREE.DynamicDrawUsage);
    selAttr.setUsage(THREE.DynamicDrawUsage);

    // Generous bounding sphere for raycasting
    mesh.geometry.boundingSphere = new THREE.Sphere(new THREE.Vector3(0, 0, 0), radius + TILE_DEPTH * 0.8);

    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    catAttr.needsUpdate = true;
    compAttr.needsUpdate = true;
    selAttr.needsUpdate = true;

    if (glow) {
      glow.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
      glow.instanceMatrix.needsUpdate = true;
      if (glow.instanceColor) glow.instanceColor.needsUpdate = true;
    }
    if (colorOverlay) {
      colorOverlay.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
      colorOverlay.instanceMatrix.needsUpdate = true;
      if (colorOverlay.instanceColor) colorOverlay.instanceColor.needsUpdate = true;
    }
  }, [tileCount, radius]);

  // Animate alive + rotate
  useFrame((_, delta) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const glow = glowRef.current || null;
    const colorOverlay = colorRef.current || null;

    if (autoRotate) {
      mesh.rotation.y += 0.25 * delta;
      if (glow) glow.rotation.y = mesh.rotation.y;
      if (colorOverlay) colorOverlay.rotation.y = mesh.rotation.y;
    }

    const dirs = baseDirs.current;
    const phases = pulsePhase.current;
    const speeds = pulseSpeed.current;
    const amps = pulseAmp.current;
    const prevArr = prevKRef.current;
    if (!dirs || !phases || !speeds || !amps) return;

    const time = clock.getElapsedTime();
    const catAttr = mesh.geometry.getAttribute("aCategory") as THREE.InstancedBufferAttribute | null;

    for (let i = 0, n = mesh.count; i < n; i++) {
      const dx = dirs[i * 3 + 0];
      const dy = dirs[i * 3 + 1];
      const dz = dirs[i * 3 + 2];

      // base protrusion
      let out = Math.sin(time * speeds[i] + phases[i]) * amps[i];
      if (hovered === i) out += 0.12;
      if (selected === i) out += 0.22;

      // position + orientation (center on shell)
      vOut.set(dx, dy, dz);
      dummy.position.copy(vOut).multiplyScalar(basePos + out);
      vTarget.copy(vOut).multiplyScalar(2);
      dummy.lookAt(vTarget);
      dummy.scale.setScalar(selected === i ? 1.28 : hovered === i ? 1.16 : 1.0);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
      if (glow) glow.setMatrixAt(i, dummy.matrix);
      if (colorOverlay) colorOverlay.setMatrixAt(i, dummy.matrix);

      // color blend from brand base -> category on outward protrusion
      if (catAttr) {
        const catIndex = Math.floor(catAttr.getX(i)) % CATEGORY_COUNT;
        const catColor = CATEGORY_PALETTE[catIndex];

        const outwardOnly = Math.max(0, out);
        let k = THREE.MathUtils.clamp(outwardOnly / Math.max(0.001, amps[i] * 0.5), 0, 1);
        if (hovered === i) k = Math.min(1, k + 0.35);
        if (selected === i) k = Math.min(1, k + 0.6);

        const visibleK = Math.min(1, k * 1.8);
        const prevK = prevArr ? prevArr[i] : -1;
        if (!prevArr || Math.abs(prevK - visibleK) > 0.02 || hovered === i || selected === i) {
          const mixed = BASE_BALL.clone()
            .lerp(catColor, visibleK)
            .lerp(new THREE.Color(1, 1, 1), 0.12 * visibleK);

          mesh.setColorAt(i, mixed);
          if (glow) glow.setColorAt(i, mixed);

          if (colorOverlay) {
            // vivid tint color
            const overlayColor = catColor.clone().multiplyScalar(Math.max(0.35, visibleK));
            colorOverlay.setColorAt(i, overlayColor);

            // push overlay outward a hair to avoid any z-fighting
            vNudge.copy(vOut).multiplyScalar(0.03 + 0.06 * visibleK);
            overlayDummy.position.copy(dummy.position).add(vNudge);
            overlayDummy.quaternion.copy(dummy.quaternion);
            const baseScale = selected === i ? 1.28 : hovered === i ? 1.16 : 1.0;
            overlayDummy.scale.setScalar(baseScale * (1.02 + 0.08 * visibleK));
            overlayDummy.updateMatrix();
            colorOverlay.setMatrixAt(i, overlayDummy.matrix);
          }

          if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
          if (glow && glow.instanceColor) glow.instanceColor.needsUpdate = true;
          if (colorOverlay && colorOverlay.instanceColor) colorOverlay.instanceColor.needsUpdate = true;
          if (prevArr) prevArr[i] = visibleK;
        }
      }
    }

    mesh.instanceMatrix.needsUpdate = true;
    if (glow) glow.instanceMatrix.needsUpdate = true;
    if (colorOverlay) colorOverlay.instanceMatrix.needsUpdate = true;
  });

  // Selection attribute (compatibility)
  const updateSelectedAttr = useCallback((index: number, val: number) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const selAttr = mesh.geometry.getAttribute("aSelected") as THREE.InstancedBufferAttribute | null;
    if (!selAttr) return;
    selAttr.setX(index, val);
    selAttr.needsUpdate = true;
  }, []);

  // Pointer handlers (throttled)
  const lastPointer = useRef(0);
  const onPointerMove = useCallback(
    (e: PointerEvent) => {
      const now = performance.now();
      if (now - lastPointer.current < 33) return;
      lastPointer.current = now;

      const rect = gl.domElement.getBoundingClientRect();
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      const mesh = meshRef.current;
      if (!mesh) return;
      raycaster.setFromCamera(pointer, camera);

      const hits = raycaster.intersectObject(mesh, false) as Array<THREE.Intersection & { instanceId?: number }>;
      let id: number | null = null;
      if (hits.length > 0 && typeof hits[0].instanceId === "number") {
        id = hits[0].instanceId!;
      } else {
        if (raycaster.ray.intersectSphere(pickSphere, vTarget)) {
          vLocal.copy(vTarget);
          mesh.worldToLocal(vLocal);
          const dir = vLocal.normalize();
          const nearest = getClosestIndex(dir);
          if (nearest !== null) id = nearest;
        }
      }

      if (id !== null) {
        lastHoverRef.current = id;
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

      if (lastHoverRef.current !== null) lastHoverRef.current = null;
      setHovered((prev) => {
        if (prev !== null) updateSelectedAttr(prev, 0);
        try {
          window.dispatchEvent(new CustomEvent("legaci:tileHover", { detail: { instanceId: null } }));
        } catch {}
        return null;
      });
    },
    [camera, gl.domElement, pointer, raycaster, pickSphere, getClosestIndex, updateSelectedAttr]
  );

  const onPointerDown = useCallback(
    (e: PointerEvent) => {
      const rect = gl.domElement.getBoundingClientRect();
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      const mesh = meshRef.current;
      if (!mesh) return;
      raycaster.setFromCamera(pointer, camera);

      const hits = raycaster.intersectObject(mesh, false) as Array<THREE.Intersection & { instanceId?: number }>;
      let id: number | null = null;
      if (hits.length > 0 && typeof hits[0].instanceId === "number") {
        id = hits[0].instanceId!;
      } else {
        if (raycaster.ray.intersectSphere(pickSphere, vTarget)) {
          vLocal.copy(vTarget);
          mesh.worldToLocal(vLocal);
          const dir = vLocal.normalize();
          const nearest = getClosestIndex(dir);
          if (nearest !== null) id = nearest;
        }
      }
      if (id === null) return;

      setSelected((prev) => {
        const next = prev === id ? null : id;
        if (prev !== null) updateSelectedAttr(prev, 0);
        if (next !== null) {
          updateSelectedAttr(next, 1.5);
          setAutoRotate(false);
          lastSelectRef.current = next;

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
          lastSelectRef.current = null;
        }
        return next;
      });
    },
    [camera, gl.domElement, pointer, raycaster, pickSphere, getClosestIndex, updateSelectedAttr]
  );

  // Attach canvas listeners
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

  // External control: resume autorotation
  useEffect(() => {
    function onResume() {
      setAutoRotate(true);
    }
    window.addEventListener("legaci:resumeAutoRotate", onResume as EventListener);
    return () => window.removeEventListener("legaci:resumeAutoRotate", onResume as EventListener);
  }, []);

  return (
    <group>
      <instancedMesh ref={meshRef} args={[geom, material, tileCount]} castShadow receiveShadow />
      {/* Draw the additive tint last and slightly above the base */}
      <instancedMesh ref={colorRef} args={[geom, colorMaterial, tileCount]} renderOrder={10} />
      <instancedMesh ref={glowRef} args={[geom, glowMaterial, tileCount]} renderOrder={11} />
    </group>
  );
}