// UserDiscoBall.tsx
"use client";

import React, { useRef, useState, useMemo, useEffect, useCallback } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { discoBallVertexShader, discoBallFragmentShader } from "../lib/shaders/discoBall";

interface UserDiscoBallProps {
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
  0x60a5fa,
  0x34d399,
  0xf59e0b,
  0xf472b6,
  0x84cc16,
  0xa78bfa,
  0x22d3ee,
  0x94a3b8,
].map((hex) => new THREE.Color(hex));

const BASE_BALL = new THREE.Color(0x232833);
const TILE_DEPTH = 1.2;

export default function UserDiscoBall({ tileCount = 2000, radius = 5 }: UserDiscoBallProps) {
  const meshRef = useRef<THREE.InstancedMesh | null>(null);
  const overlayRef = useRef<THREE.InstancedMesh | null>(null);
  const baseSphereRef = useRef<THREE.Mesh | null>(null);
  const { camera, gl, clock } = useThree();

  const raycaster = useMemo(() => new THREE.Raycaster(), []);
  const pointer = useMemo(() => new THREE.Vector2(), []);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const overlayDummy = useMemo(() => new THREE.Object3D(), []);
  const dirsRef = useRef<Float32Array | null>(null);

  const [hovered, setHovered] = useState<number | null>(null);
  const [selected, setSelected] = useState<number | null>(null);

  const geom = useMemo(() => new THREE.BoxGeometry(0.34, 0.34, TILE_DEPTH), []);
  const sphereGeom = useMemo(() => new THREE.SphereGeometry(radius - TILE_DEPTH * 0.66, 64, 64), [radius]);

  const shaderMat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: discoBallVertexShader,
        fragmentShader: discoBallFragmentShader,
        uniforms: { uTime: { value: 0 }, uMaxOffset: { value: TILE_DEPTH * 1.25 } },
        side: THREE.FrontSide,
      } as any),
    []
  );

  const ensureInstanceColor = (m: THREE.InstancedMesh | null, count: number) => {
    if (!m) return;
    if (!m.instanceColor) {
      m.instanceColor = new THREE.InstancedBufferAttribute(new Float32Array(count * 3), 3);
    }
    m.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  };

  // per-instance attrs
  const categoryAttr = useRef<THREE.InstancedBufferAttribute | null>(null);
  const completenessAttr = useRef<THREE.InstancedBufferAttribute | null>(null);
  const selectedAttr = useRef<THREE.InstancedBufferAttribute | null>(null);

  useEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const overlay = overlayRef.current;
    const count = tileCount;
    mesh.count = count;
    mesh.frustumCulled = false;
    overlay && (overlay.count = count, overlay.frustumCulled = false);
    ensureInstanceColor(mesh, count);
    ensureInstanceColor(overlay, count);

    dirsRef.current = new Float32Array(count * 3);
    const cat = new THREE.InstancedBufferAttribute(new Float32Array(count), 1);
    categoryAttr.current = cat;
    const comp = new THREE.InstancedBufferAttribute(new Float32Array(count), 1);
    completenessAttr.current = comp;
    const sel = new THREE.InstancedBufferAttribute(new Float32Array(count), 1);
    selectedAttr.current = sel;

    const outward = new THREE.Vector3();

    for (let i = 0; i < count; i++) {
      const t = i / Math.max(1, count - 1);
      const inc = Math.acos(1 - 2 * t);
      const azi = Math.PI * (1 + Math.sqrt(5)) * i;
      const x = Math.sin(inc) * Math.cos(azi);
      const y = Math.cos(inc);
      const z = Math.sin(inc) * Math.sin(azi);
      dirsRef.current[i * 3 + 0] = x;
      dirsRef.current[i * 3 + 1] = y;
      dirsRef.current[i * 3 + 2] = z;

      outward.set(x, y, z);
      dummy.position.copy(outward).normalize().multiplyScalar(radius - TILE_DEPTH * 0.5);
      dummy.lookAt(outward.clone().multiplyScalar(2));
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
      overlay?.setMatrixAt(i, dummy.matrix);

      const c = i % CATEGORY_COUNT;
      cat.setX(i, c);
      completenessAttr.current!.setX(i, 0);
      selectedAttr.current!.setX(i, 0);

      mesh.setColorAt(i, BASE_BALL.clone().multiplyScalar(0.98));
      overlay?.setColorAt(i, new THREE.Color(0, 0, 0));
    }

    mesh.geometry.setAttribute("aCategory", cat);
    mesh.geometry.setAttribute("aCompleteness", comp);
    mesh.geometry.setAttribute("aSelected", sel);
    mesh.geometry.boundingSphere = new THREE.Sphere(new THREE.Vector3(0, 0, 0), radius + TILE_DEPTH * 0.8);

    mesh.instanceMatrix.needsUpdate = true;
    mesh.instanceColor && (mesh.instanceColor.needsUpdate = true);
    comp.needsUpdate = true;
    sel.needsUpdate = true;
  }, [tileCount, radius]);

  useFrame((_, delta) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const t = clock.getElapsedTime();
    try {
      (shaderMat as any).uniforms.uTime.value = t;
    } catch {}
    const dirs = dirsRef.current;
    const comp = completenessAttr.current;
    const sel = selectedAttr.current;
    if (!dirs || !comp || !sel) return;

    // simple hover/selection visual updates to instanceColor
    const catAttrLocalForFrame = categoryAttr.current;
    for (let i = 0; i < mesh.count; i++) {
      const idx = catAttrLocalForFrame ? ((catAttrLocalForFrame.getX(i) | 0) % CATEGORY_COUNT) : 0;
      const catColor = CATEGORY_PALETTE[idx];
      const vc = comp.getX(i) ?? 0;
      const isSel = sel.getX(i) > 0.5;
      const color = isSel ? catColor.clone() : BASE_BALL.clone().lerp(catColor, vc * 0.4);
      mesh.setColorAt(i, color);
    }

    mesh.instanceColor && (mesh.instanceColor.needsUpdate = true);
  });

  const getClosestIndex = useCallback((dir: THREE.Vector3) => {
    const dirs = dirsRef.current;
    const mesh = meshRef.current;
    if (!dirs || !mesh) return null;
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
      if (hits.length > 0 && typeof hits[0].instanceId === "number") id = hits[0].instanceId!;
      else if (raycaster.ray.intersectSphere(new THREE.Sphere(new THREE.Vector3(0, 0, 0), radius), new THREE.Vector3())) {
        const v = new THREE.Vector3();
        raycaster.ray.at(8, v);
        const dir = v.normalize();
        const nearest = getClosestIndex(dir);
        if (nearest !== null) id = nearest;
      }
      if (id === null) return;
      setSelected((p) => (p === id ? null : id));

      const catAttrLocal = categoryAttr.current;
      const cIdx = catAttrLocal ? ((catAttrLocal.getX(id) | 0) % CATEGORY_COUNT) : 0;
      const category = CATEGORY_NAMES[cIdx];
      const colorHex = "#" + CATEGORY_PALETTE[cIdx].getHexString();
      try {
        window.dispatchEvent(
          new CustomEvent("legaci:tileSelect", { detail: { instanceId: id, category, categoryIndex: cIdx, colorHex } })
        );
      } catch {}
    },
    [camera, gl.domElement, pointer, raycaster, radius]
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
      setHovered(id);
    },
    [camera, gl.domElement]
  );

  useEffect(() => {
    const c = meshRef.current;
    if (!c) return;
    c.geometry.setAttribute("aCategory", categoryAttr.current!);
    c.geometry.setAttribute("aCompleteness", completenessAttr.current!);
    c.geometry.setAttribute("aSelected", selectedAttr.current!);
  }, []);

  useEffect(() => {
    const canvas = gl.domElement;
    canvas.style.touchAction = "none";
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerdown", onPointerDown);
    return () => {
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerdown", onPointerDown);
    };
  }, [onPointerMove, onPointerDown]);

  // Load traits summary and patch completeness per category
  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const res = await fetch("/api/traits");
        if (!res.ok) return;
        const body = await res.json().catch(() => null);
        if (!body || !mounted) return;
        const summary = body.summary ?? {};
        const mesh = meshRef.current;
        const cat = categoryAttr.current;
        const comp = completenessAttr.current;
        if (!mesh || !cat || !comp) return;
        for (let i = 0; i < mesh.count; i++) {
          const idx = (cat.getX(i) | 0) % CATEGORY_COUNT;
          const name = CATEGORY_NAMES[idx];
          const s = summary[name];
          const avg = s ? Number(s.avgCompleteness || 0) : 0;
          comp.setX(i, Math.max(0, Math.min(1, avg)));
        }
        comp.needsUpdate = true;
      } catch (e) {
        console.warn("user disco load traits error", e);
      }
    }
    load();

    function onTraitUpsert(e: Event) {
      const detail = (e as CustomEvent).detail as any;
      const payload = detail?.trait ?? detail;
      if (!payload) return;
      const cat = payload.category;
      const completeness = Number(payload.completeness ?? 0);
      if (typeof cat !== "string") return;
      const ci = CATEGORY_NAMES.indexOf(cat);
      if (ci < 0) return;
      const mesh = meshRef.current;
      const catAttrLocal = categoryAttr.current;
      const compAttrLocal = completenessAttr.current;
      if (!mesh || !catAttrLocal || !compAttrLocal) return;
      for (let i = 0; i < mesh.count; i++) {
        const idx = (catAttrLocal.getX(i) | 0) % CATEGORY_COUNT;
        if (idx === ci) compAttrLocal.setX(i, Math.max(0, Math.min(1, completeness)));
      }
      compAttrLocal.needsUpdate = true;
    }

    function onTraitUpdated(e: Event) {
      const d = (e as CustomEvent).detail as any;
      const category = d?.category;
      const completeness = Number(d?.completeness ?? 0);
      const instanceId = typeof d?.instanceId === "number" ? d.instanceId : null;
      const mesh = meshRef.current;
      const catAttrLocal = categoryAttr.current;
      const compAttrLocal = completenessAttr.current;
      if (!mesh || !catAttrLocal || !compAttrLocal) return;
      if (typeof instanceId === "number" && instanceId >= 0 && instanceId < mesh.count) {
        compAttrLocal.setX(instanceId, Math.max(0, Math.min(1, completeness)));
      } else if (typeof category === "string") {
        const ci = CATEGORY_NAMES.indexOf(category);
        if (ci < 0) return;
        for (let i = 0; i < mesh.count; i++) {
          const idx = (catAttrLocal.getX(i) | 0) % CATEGORY_COUNT;
          if (idx === ci) compAttrLocal.setX(i, Math.max(0, Math.min(1, completeness)));
        }
      }
      compAttrLocal.needsUpdate = true;
    }

    window.addEventListener("legaci:traitUpsert", onTraitUpsert as EventListener);
    window.addEventListener("legaci:traitUpdated", onTraitUpdated as EventListener);
    return () => {
      mounted = false;
      window.removeEventListener("legaci:traitUpsert", onTraitUpsert as EventListener);
      window.removeEventListener("legaci:traitUpdated", onTraitUpdated as EventListener);
    };
  }, []);

  // reflect selection into selectedAttr for shader
  useEffect(() => {
    const mesh = meshRef.current;
    const sel = selectedAttr.current;
    if (!mesh || !sel) return;
    for (let i = 0; i < mesh.count; i++) sel.setX(i, 0);
    if (selected !== null && selected >= 0 && selected < mesh.count) {
      sel.setX(selected, 1);
    }
    sel.needsUpdate = true;
  }, [selected]);

  return (
    <group>
      <mesh
        ref={baseSphereRef}
        geometry={sphereGeom}
        material={new THREE.MeshStandardMaterial({ color: 0x12151d, metalness: 0.08, roughness: 0.82 })}
      />
      <instancedMesh ref={meshRef} args={[geom, shaderMat, tileCount]} castShadow receiveShadow />
      <instancedMesh
        ref={overlayRef}
        args={[
          geom,
          new THREE.MeshBasicMaterial({ color: new THREE.Color(1, 1, 1), transparent: true, opacity: 0.12 }),
          tileCount,
        ]}
      />
    </group>
  );
}