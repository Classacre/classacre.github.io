// DiscoBall.tsx
"use client";

import React, { useRef, useState, useMemo, useEffect, useCallback } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

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

const CATEGORY_PALETTE = [
  0x7ac7ff, 0xff9ed1, 0x9be8ff, 0xffc78a, 0x9dffa1, 0xf6ff7a, 0xc3a3ff, 0xffa8f2,
].map((hex) => new THREE.Color(hex));

// Dark neutral base
const BASE_BALL = new THREE.Color(0x232833);
const TILE_DEPTH = 1.2;

export default function DiscoBall({ tileCount = 2000, radius = 5 }: DiscoBallProps) {
  const meshRef = useRef<THREE.InstancedMesh | null>(null);
  const overlayRef = useRef<THREE.InstancedMesh | null>(null);
  const glowRef = useRef<THREE.InstancedMesh | null>(null);
  const baseSphereRef = useRef<THREE.Mesh | null>(null);
  const { camera, gl, clock } = useThree();

  // Ray + helpers
  const raycaster = useMemo(() => new THREE.Raycaster(), []);
  const pointer = useMemo(() => new THREE.Vector2(), []);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const overlayDummy = useMemo(() => new THREE.Object3D(), []);
  const vOut = useMemo(() => new THREE.Vector3(), []);
  const vTarget = useMemo(() => new THREE.Vector3(), []);
  const vLocal = useMemo(() => new THREE.Vector3(), []);
  const vNudge = useMemo(() => new THREE.Vector3(), []);
  const [hovered, setHovered] = useState<number | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const [autoRotate] = useState(true);

  // Geometry
  const geom = useMemo(() => new THREE.BoxGeometry(0.34, 0.34, TILE_DEPTH), []);
  const sphereGeom = useMemo(
    () => new THREE.SphereGeometry(radius - TILE_DEPTH * 0.66, 80, 80),
    [radius]
  );

  // Materials
  const cubeMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(0xffffff),
        metalness: 0.36,
        roughness: 0.34,
        envMapIntensity: 1.2,
        vertexColors: true,
        side: THREE.FrontSide,
        dithering: true,
        emissive: new THREE.Color(0x0b0e12),
        emissiveIntensity: 0.09,
      }),
    []
  );

  const baseSphereMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(0x12151d),
        metalness: 0.08,
        roughness: 0.82,
        envMapIntensity: 0.32,
        emissive: new THREE.Color(0x06080b),
        emissiveIntensity: 0.07,
      }),
    []
  );

  const overlayMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: new THREE.Color(1, 1, 1),
        transparent: true,
        opacity: 0.14,
        blending: THREE.NormalBlending,
        depthWrite: false,
        depthTest: true,
      } as any),
    []
  );

  const glowMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: new THREE.Color(1, 1, 1),
        transparent: true,
        opacity: 0.055,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        depthTest: true,
      } as any),
    []
  );

  // Per-instance arrays
  const baseDirs = useRef<Float32Array | null>(null);
  const catAttr = useRef<THREE.InstancedBufferAttribute | null>(null);

  // Random oscillators (3 per tile)
  const f1 = useRef<Float32Array | null>(null);
  const f2 = useRef<Float32Array | null>(null);
  const f3 = useRef<Float32Array | null>(null);
  const p1 = useRef<Float32Array | null>(null);
  const p2 = useRef<Float32Array | null>(null);
  const p3 = useRef<Float32Array | null>(null);
  const a1 = useRef<Float32Array | null>(null);
  const a2 = useRef<Float32Array | null>(null);
  const a3 = useRef<Float32Array | null>(null);

  // Jitter bursts (calmer)
  const burstAmp = useRef<Float32Array | null>(null);
  const burstEnds = useRef<Float32Array | null>(null);

  // Tint gating
  const active = useRef<Float32Array | null>(null);
  const targetActive = useRef<Float32Array | null>(null);
  const lastToggle = useRef<Float32Array | null>(null);
  const toggleInterval = useRef<Float32Array | null>(null);
  const maxActiveCount = useRef<number>(0);
  const currentActiveCount = useRef<number>(0);

  const currentCategory = useRef<number>(0);
  const nextCategoryAt = useRef<number>(0);

  const basePos = radius - TILE_DEPTH * 0.5;
  const pickSphere = useMemo(() => new THREE.Sphere(new THREE.Vector3(0, 0, 0), radius), [radius]);

  const arraysReady = () =>
    baseDirs.current &&
    catAttr.current &&
    f1.current && f2.current && f3.current &&
    p1.current && p2.current && p3.current &&
    a1.current && a2.current && a3.current &&
    burstAmp.current && burstEnds.current &&
    active.current && targetActive.current && lastToggle.current && toggleInterval.current;

  // Init
  useEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;

    const overlay = overlayRef.current;
    const glow = glowRef.current;

    const count = tileCount;
    mesh.count = count;
    mesh.frustumCulled = false;
    overlay && (overlay.count = count, overlay.frustumCulled = false);
    glow && (glow.count = count, glow.frustumCulled = false);

    const ensureIC = (m: THREE.InstancedMesh | null) => {
      if (!m) return;
      if (!m.instanceColor) {
        m.instanceColor = new THREE.InstancedBufferAttribute(new Float32Array(count * 3), 3);
      }
      m.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    };
    ensureIC(mesh);
    ensureIC(overlay);
    ensureIC(glow);

    baseDirs.current = new Float32Array(count * 3);

    f1.current = new Float32Array(count);
    f2.current = new Float32Array(count);
    f3.current = new Float32Array(count);
    p1.current = new Float32Array(count);
    p2.current = new Float32Array(count);
    p3.current = new Float32Array(count);
    a1.current = new Float32Array(count);
    a2.current = new Float32Array(count);
    a3.current = new Float32Array(count);

    burstAmp.current = new Float32Array(count);
    burstEnds.current = new Float32Array(count);

    active.current = new Float32Array(count);
    targetActive.current = new Float32Array(count);
    lastToggle.current = new Float32Array(count);
    toggleInterval.current = new Float32Array(count);

    // Cap for tinted tiles (faint anyway)
    maxActiveCount.current = Math.max(16, Math.floor(count * 0.012)); // ~1.2%

    const cat = new THREE.InstancedBufferAttribute(new Float32Array(count), 1);
    catAttr.current = cat;

    const outward = new THREE.Vector3();
    const now = performance.now() / 1000;

    for (let i = 0; i < count; i++) {
      // Fibonacci on sphere
      const t = i / Math.max(1, count - 1);
      const inc = Math.acos(1 - 2 * t);
      const azi = Math.PI * (1 + Math.sqrt(5)) * i;

      const x = Math.sin(inc) * Math.cos(azi);
      const y = Math.cos(inc);
      const z = Math.sin(inc) * Math.sin(azi);

      baseDirs.current[i * 3 + 0] = x;
      baseDirs.current[i * 3 + 1] = y;
      baseDirs.current[i * 3 + 2] = z;

      outward.set(x, y, z);
      dummy.position.copy(outward).normalize().multiplyScalar(basePos);
      dummy.lookAt(outward.clone().multiplyScalar(2));
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
      overlay?.setMatrixAt(i, dummy.matrix);
      glow?.setMatrixAt(i, dummy.matrix);

      const c = i % CATEGORY_COUNT;
      cat.setX(i, c);

      // Start near-black
      mesh.setColorAt(i, BASE_BALL.clone().multiplyScalar(0.97));
      overlay?.setColorAt(i, new THREE.Color(0, 0, 0));
      glow?.setColorAt(i, BASE_BALL);

      // Oscillators — halved speeds and amplitudes vs previous version
      f1.current[i] = 0.22 + Math.random() * 0.25;
      f2.current[i] = 0.12 + Math.random() * 0.18;
      f3.current[i] = 0.3 + Math.random() * 0.32;

      p1.current[i] = Math.random() * Math.PI * 2;
      p2.current[i] = Math.random() * Math.PI * 2;
      p3.current[i] = Math.random() * Math.PI * 2;

      a1.current[i] = 0.05 + Math.random() * 0.07;
      a2.current[i] = 0.04 + Math.random() * 0.06;
      a3.current[i] = 0.06 + Math.random() * 0.08;

      // Bursts — softer and rarer
      burstAmp.current[i] = 0;
      burstEnds.current[i] = now + Math.random() * 6;

      // Tint gating
      active.current[i] = Math.random() * 0.1;
      targetActive.current[i] = active.current[i];
      lastToggle.current[i] = now - Math.random() * 4;
      toggleInterval.current[i] = 3.5 + Math.random() * 7; // 3.5–10.5s
    }

    mesh.geometry.setAttribute("aCategory", cat);
    mesh.geometry.boundingSphere = new THREE.Sphere(new THREE.Vector3(0, 0, 0), radius + TILE_DEPTH * 0.8);

    // Category focus rotation
    currentCategory.current = Math.floor(Math.random() * CATEGORY_COUNT);
    nextCategoryAt.current = now + 6 + Math.random() * 6; // slower

    mesh.instanceMatrix.needsUpdate = true;
    mesh.instanceColor && (mesh.instanceColor.needsUpdate = true);
    overlay && overlay.instanceMatrix && (overlay.instanceMatrix.needsUpdate = true);
    overlay && overlay.instanceColor && (overlay.instanceColor.needsUpdate = true);
    glow && glow.instanceMatrix && (glow.instanceMatrix.needsUpdate = true);
    glow && glow.instanceColor && (glow.instanceColor.needsUpdate = true);
  }, [tileCount, radius]);

  // Animation
  useFrame((_, delta) => {
    const mesh = meshRef.current;
    if (!mesh) return;

    // Guard
    if (
      !(
        baseDirs.current &&
        catAttr.current &&
        f1.current && f2.current && f3.current &&
        p1.current && p2.current && p3.current &&
        a1.current && a2.current && a3.current &&
        burstAmp.current && burstEnds.current &&
        active.current && targetActive.current && lastToggle.current && toggleInterval.current
      )
    ) return;

    const overlay = overlayRef.current || null;
    const glow = glowRef.current || null;

    if (autoRotate) {
      mesh.rotation.y += 0.18 * delta; // slower
      overlay && (overlay.rotation.y = mesh.rotation.y);
      glow && (glow.rotation.y = mesh.rotation.y);
      baseSphereRef.current && (baseSphereRef.current.rotation.y = mesh.rotation.y);
    }

    const dirs = baseDirs.current!;
    const cat = catAttr.current!;

    const tf1 = f1.current!, tf2 = f2.current!, tf3 = f3.current!;
    const tp1 = p1.current!, tp2 = p2.current!, tp3 = p3.current!;
    const ta1 = a1.current!, ta2 = a2.current!, ta3 = a3.current!;
    const bA = burstAmp.current!, bEnd = burstEnds.current!;
    const act = active.current!, tgt = targetActive.current!, last = lastToggle.current!, intervals = toggleInterval.current!;

    const now = performance.now() / 1000;
    const t = clock.getElapsedTime();

    // Rotate category focus (calmer)
    if (now >= nextCategoryAt.current) {
      currentCategory.current = (currentCategory.current + 1) % CATEGORY_COUNT;
      nextCategoryAt.current = now + 6 + Math.random() * 6;
    }
    const focusCat = currentCategory.current;

    // Count active for cap
    let countActive = 0;
    for (let i = 0; i < mesh.count; i++) if (act[i] > 0.6 || tgt[i] > 0.5) countActive++;
    currentActiveCount.current = countActive;

    // Random toggles (calmer)
    const tries = Math.max(1, Math.floor(mesh.count * 0.001)); // ~0.1% per frame
    for (let k = 0; k < tries; k++) {
      const i = (Math.random() * mesh.count) | 0;
      if (now - last[i] < intervals[i]) continue;
      const tileCat = (cat.getX(i) | 0) % CATEGORY_COUNT;
      const eligible = tileCat === focusCat || i === hovered || i === selected;

      if (eligible && currentActiveCount.current < maxActiveCount.current && Math.random() < 0.45) {
        tgt[i] = 1;
        currentActiveCount.current++;
      } else {
        tgt[i] = 0;
      }

      // Softer, rarer bursts
      if (Math.random() < 0.14) {
        bA[i] = 0.03 + Math.random() * 0.05;
        bEnd[i] = now + 0.35 + Math.random() * 0.45;
      }
      last[i] = now;
      intervals[i] = 3.5 + Math.random() * 7;
    }

    // Activity easing (calmer)
    const ease = 1 - Math.pow(0.0018, delta);

    // Selection pop — brighter solid color and more extrusion
    const selOutBoost = 0.42;
    const selScale = 1.36;
    const hovScale = 1.07;

    for (let i = 0, n = mesh.count; i < n; i++) {
      act[i] += (tgt[i] - act[i]) * ease;

      const dx = dirs[i * 3 + 0];
      const dy = dirs[i * 3 + 1];
      const dz = dirs[i * 3 + 2];
      const dir = vOut.set(dx, dy, dz);

      // Halved motion: sum of 3 oscillators + optional soft burst
      let out =
        Math.sin(t * tf1[i] * 2 * Math.PI + tp1[i]) * ta1[i] +
        Math.sin(t * tf2[i] * 2 * Math.PI + tp2[i]) * ta2[i] +
        Math.sin(t * tf3[i] * 2 * Math.PI + tp3[i]) * ta3[i];

      if (now < bEnd[i]) {
        const remain = bEnd[i] - now;
        const k = THREE.MathUtils.smoothstep(remain, 0, 0.75);
        out += bA[i] * (1 - k) * Math.sin(t * 8 + tp3[i]);
      } else {
        bA[i] = 0;
      }

      out *= 0.9 + 0.5 * act[i]; // calmer modulation
      if (hovered === i) out += 0.045;

      const isSelected = selected === i;
      if (isSelected) out += selOutBoost;

      // Transform
      dummy.position.copy(dir).multiplyScalar(basePos + out);
      vTarget.copy(dir).multiplyScalar(2);
      dummy.lookAt(vTarget);
      dummy.scale.setScalar(isSelected ? selScale : hovered === i ? hovScale : 1.0);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
      overlay?.setMatrixAt(i, dummy.matrix);
      glow?.setMatrixAt(i, dummy.matrix);

      // Colors
      const tileCat = (cat.getX(i) | 0) % CATEGORY_COUNT;
      const catColor = CATEGORY_PALETTE[tileCat];

      // Edge accent factor (rim)
      const worldPos = dummy.position;
      const toCam = vTarget.copy(camera.position).sub(worldPos).normalize();
      const rim = 1.0 - Math.abs(dir.dot(toCam));
      const rimPow = Math.pow(THREE.MathUtils.clamp(rim, 0, 1), 2.0);

      // Subtle face tint (still very dark)
      const outwardOnly = Math.max(0, out);
      const baseK = THREE.MathUtils.clamp(outwardOnly / 0.22, 0, 1);
      const activity = Math.max(act[i], hovered === i ? 0.22 : 0.0);
      const visibleK = THREE.MathUtils.clamp(baseK * (0.32 + 0.55 * activity), 0, 0.25);

      if (isSelected) {
        // Solid, bright category color (no dark metal look)
        const solid = catColor.clone(); // pure color
        mesh.setColorAt(i, solid);

        if (overlay) {
          const selOverlay = solid.clone().multiplyScalar(0.6);
          overlay.setColorAt(i, selOverlay);
          overlayDummy.position.copy(dummy.position).add(vNudge.copy(dir).multiplyScalar(0.05));
          overlayDummy.quaternion.copy(dummy.quaternion);
          overlayDummy.scale.setScalar(selScale * 1.03);
          overlayDummy.updateMatrix();
          overlay.setMatrixAt(i, overlayDummy.matrix);
        }

        if (glow) {
          const g = solid.clone().multiplyScalar(0.48);
          glow.setColorAt(i, g);
        }
      } else {
        // Near-black face with tiny tint
        const faceMixed = BASE_BALL.clone().multiplyScalar(0.988).lerp(catColor, visibleK * 0.14);
        mesh.setColorAt(i, faceMixed);

        if (overlay) {
          const edgeStrength = visibleK * rimPow;
          const overlayAlpha = THREE.MathUtils.clamp(edgeStrength * 0.32, 0, 0.10);
          const overlayColor = catColor.clone().multiplyScalar(overlayAlpha);
          overlay.setColorAt(i, overlayColor);

          vNudge.copy(dir).multiplyScalar(0.01 + 0.025 * edgeStrength);
          overlayDummy.position.copy(dummy.position).add(vNudge);
          overlayDummy.quaternion.copy(dummy.quaternion);
          const s = hovered === i ? hovScale : 1.0;
          overlayDummy.scale.setScalar(s * (1.003 + 0.02 * edgeStrength));
          overlayDummy.updateMatrix();
          overlay.setMatrixAt(i, overlayDummy.matrix);
        }

        if (glow) {
          const g = faceMixed.clone().multiplyScalar(0.1);
          glow.setColorAt(i, g);
        }
      }
    }

    mesh.instanceMatrix.needsUpdate = true;
    mesh.instanceColor && (mesh.instanceColor.needsUpdate = true);
    if (overlay) {
      overlay.instanceMatrix.needsUpdate = true;
      overlay.instanceColor && (overlay.instanceColor.needsUpdate = true);
    }
    if (glow) {
      glow.instanceMatrix.needsUpdate = true;
      glow.instanceColor && (glow.instanceColor.needsUpdate = true);
    }
  });

  // Picking helpers
  const getClosestIndex = useCallback((dir: THREE.Vector3) => {
    const mesh = meshRef.current;
    const dirs = baseDirs.current;
    if (!mesh || !dirs) return null;
    let best = -1;
    let bestDot = -Infinity;
    for (let i = 0, n = mesh.count; i < n; i++) {
      const dot = dir.x * dirs[i * 3 + 0] + dir.y * dirs[i * 3 + 1] + dir.z * dirs[i * 3 + 2];
      if (dot > bestDot) {
        bestDot = dot;
        best = i;
      }
    }
    return best;
  }, []);

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
      } else if (raycaster.ray.intersectSphere(pickSphere, vTarget)) {
        vLocal.copy(vTarget);
        mesh.worldToLocal(vLocal);
        const dir = vLocal.normalize();
        const nearest = getClosestIndex(dir);
        if (nearest !== null) id = nearest;
      }
      if (id === null) return;

      setSelected((prev) => (prev === id ? null : id));

      // Dispatch details
      const cAttr = catAttr.current!;
      const categoryIndex = (cAttr.getX(id) | 0) % CATEGORY_COUNT;
      const category = CATEGORY_NAMES[categoryIndex];
      const colorHex = "#" + CATEGORY_PALETTE[categoryIndex].getHexString();
      try {
        window.dispatchEvent(
          new CustomEvent("legaci:tileSelect", {
            detail: { instanceId: id, category, categoryIndex, colorHex },
          })
        );
      } catch {}
    },
    [camera, gl.domElement, pointer, raycaster]
  );

  const onPointerMove = useCallback(
    (e: PointerEvent) => {
      const rect = gl.domElement.getBoundingClientRect();
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      const mesh = meshRef.current;
      if (!mesh) return;
      raycaster.setFromCamera(pointer, camera);

      const hits = raycaster.intersectObject(mesh, false) as Array<THREE.Intersection & { instanceId?: number }>;
      let id: number | null = null;
      if (hits.length > 0 && typeof hits[0].instanceId === "number") id = hits[0].instanceId!;
      else if (raycaster.ray.intersectSphere(pickSphere, vTarget)) {
        vLocal.copy(vTarget);
        mesh.worldToLocal(vLocal);
        const dir = vLocal.normalize();
        const nearest = getClosestIndex(dir);
        if (nearest !== null) id = nearest;
      }
      setHovered(id);
    },
    [camera, gl.domElement, pointer, raycaster]
  );

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

  return (
    <group>
      <mesh ref={baseSphereRef} geometry={sphereGeom} material={baseSphereMat} renderOrder={0} />
      <instancedMesh ref={meshRef} args={[geom, cubeMat, tileCount]} castShadow receiveShadow renderOrder={1} />
      <instancedMesh ref={overlayRef} args={[geom, overlayMat, tileCount]} renderOrder={10} />
      <instancedMesh ref={glowRef} args={[geom, glowMat, tileCount]} renderOrder={11} />
    </group>
  );
}