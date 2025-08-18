"use client";

import React, { useRef, useState, useMemo, useEffect, useCallback } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import * as THREE from "three";
import { discoBallVertexShader, discoBallFragmentShader } from "../lib/shaders/discoBall";

/**
 * frontend/src/components/DiscoBall.tsx
 *
 * Instanced disco ball made of square mirror tiles.
 * - Instanced attributes: aCategory (int), aCompleteness (float), aSelected (float)
 * - Pointer + keyboard interaction:
 *    * hover highlights tile
 *    * click selects tile -> dispatches window 'legaci:tileSelect' CustomEvent with details
 * - Performance: DynamicDrawUsage for instanceMatrix and attributes, pointermove throttled (~30Hz)
 */

interface DiscoBallProps {
  tileCount?: number; // total tiles (1k-4k recommended)
  radius?: number;
  maxOffset?: number;
}

const CATEGORY_COUNT = 8;

export default function DiscoBall({ tileCount = 2000, radius = 5, maxOffset = 0.22 }: DiscoBallProps) {
  const meshRef = useRef<THREE.InstancedMesh | null>(null);
  const { camera, gl } = useThree();
  const raycaster = useMemo(() => new THREE.Raycaster(), []);
  const pointer = useMemo(() => new THREE.Vector2(), []);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const [hovered, setHovered] = useState<number | null>(null);
  const [selected, setSelected] = useState<number | null>(null);

  // Build geometry and shader material
  const geom = useMemo(() => new THREE.PlaneGeometry(0.45, 0.45), []);
  const material = useMemo(() => {
    const mat = new THREE.ShaderMaterial({
      vertexShader: discoBallVertexShader,
      fragmentShader: discoBallFragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uMaxOffset: { value: maxOffset },
      },
      glslVersion: THREE.GLSL3,
    });
    return mat;
  }, [maxOffset]);

  // Initialize instanced attributes
  useEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;

    const count = tileCount;
    mesh.count = count;

    // create attributes
    const catAttr = new THREE.InstancedBufferAttribute(new Float32Array(count), 1);
    const compAttr = new THREE.InstancedBufferAttribute(new Float32Array(count), 1);
    const selAttr = new THREE.InstancedBufferAttribute(new Float32Array(count), 1);

    // Position tiles on sphere and orient them outward
    for (let i = 0; i < count; i++) {
      // Fibonacci sphere distribution for even packing
      const t = i / Math.max(1, count - 1);
      const inclination = Math.acos(1 - 2 * t);
      const azimuth = Math.PI * (1 + Math.sqrt(5)) * i;

      const x = Math.sin(inclination) * Math.cos(azimuth);
      const y = Math.cos(inclination);
      const z = Math.sin(inclination) * Math.sin(azimuth);

      dummy.position.set(x, y, z).normalize().multiplyScalar(radius);
      // orient tile to face outward
      dummy.lookAt(dummy.position.clone().multiplyScalar(2)); // face away from center
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);

      // assign categories evenly across tiles to map them to category buckets
      catAttr.setX(i, i % CATEGORY_COUNT);
      // placeholder completeness until we fetch real values
      compAttr.setX(i, 0.01);
      selAttr.setX(i, 0);
    }

    // attach attributes to geometry
    mesh.geometry.setAttribute("aCategory", catAttr);
    mesh.geometry.setAttribute("aCompleteness", compAttr);
    mesh.geometry.setAttribute("aSelected", selAttr);

    // performance usage hints
    mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    catAttr.setUsage(THREE.DynamicDrawUsage);
    compAttr.setUsage(THREE.DynamicDrawUsage);
    selAttr.setUsage(THREE.DynamicDrawUsage);

    mesh.instanceMatrix.needsUpdate = true;
    catAttr.needsUpdate = true;
    compAttr.needsUpdate = true;
    selAttr.needsUpdate = true;

    // cleanup on unmount
    return () => {
      // keep buffers for reuse; three will handle disposal when scene disposed
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tileCount, radius]);

  // Helper to update aSelected attribute
  const updateSelectedAttr = useCallback((index: number, val: number) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const selAttr = mesh.geometry.getAttribute("aSelected") as THREE.InstancedBufferAttribute | null;
    if (!selAttr) return;
    selAttr.setX(index, val);
    selAttr.needsUpdate = true;
  }, []);

  // Autorotate & shader time
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.0035;
    }
    if (meshRef.current && material instanceof THREE.ShaderMaterial) {
      (meshRef.current.material as THREE.ShaderMaterial).uniforms.uTime.value = clock.getElapsedTime();
    }
  });

  // Throttled pointer move to ~30 Hz (stable callback)
  const lastPointerTime = useRef<number>(0);
  const onPointerMove = useCallback((e: PointerEvent) => {
    const now = performance.now();
    if (now - lastPointerTime.current < 33) return; // ~30Hz
    lastPointerTime.current = now;

    const rect = gl.domElement.getBoundingClientRect();
    pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    const mesh = meshRef.current;
    if (!mesh) return;
    raycaster.setFromCamera(pointer, camera);
    const intersects = raycaster.intersectObject(mesh) as Array<THREE.Intersection & { instanceId?: number }>;
    if (intersects.length > 0) {
      const instId = intersects[0].instanceId;
      if (typeof instId === "number") {
        setHovered((prev) => {
          if (prev !== instId) {
            updateSelectedAttr(instId, 1); // temporarily highlight
            return instId;
          }
          return prev;
        });
        return;
      }
    }
    setHovered((prev) => {
      if (prev !== null) updateSelectedAttr(prev, 0);
      return null;
    });
  }, [camera, gl.domElement, pointer, raycaster, updateSelectedAttr]);

  // click handler to select tile (persistent) - stable via useCallback
  const onPointerDown = useCallback((e: PointerEvent) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const rect = gl.domElement.getBoundingClientRect();
    pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    raycaster.setFromCamera(pointer, camera);
    const intersects = raycaster.intersectObject(mesh) as Array<THREE.Intersection & { instanceId?: number }>;
    if (intersects.length > 0) {
      const instId = intersects[0].instanceId;
      if (typeof instId === "number") {
        setSelected((prevSelected) => {
          const newSel = prevSelected === instId ? null : instId;
          if (prevSelected !== null) updateSelectedAttr(prevSelected, 0);
          if (newSel !== null) updateSelectedAttr(newSel, 1.5);
          return newSel;
        });

        // emit global event for InspectorPanel / app to consume
        const detail = { instanceId: instId };
        window.dispatchEvent(new CustomEvent("legaci:tileSelect", { detail }));
      }
    }
  }, [camera, gl.domElement, pointer, raycaster, updateSelectedAttr]);

  // keyboard navigation: arrow keys rotate ball; Enter triggers select on hovered
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Enter" && hovered != null) {
        // emulate click
        if (meshRef.current) {
          if (selected != null) updateSelectedAttr(selected, 0);
          updateSelectedAttr(hovered, 1.5);
          setSelected(hovered);
          window.dispatchEvent(new CustomEvent("legaci:tileSelect", { detail: { instanceId: hovered } }));
        }
      } else if (e.key === "ArrowLeft") {
        if (meshRef.current) meshRef.current.rotation.y -= 0.15;
      } else if (e.key === "ArrowRight") {
        if (meshRef.current) meshRef.current.rotation.y += 0.15;
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [hovered, selected, updateSelectedAttr]);

  // attach pointer listeners to canvas DOM element
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

  // Listen for trait updates from Inspector and update instance attributes live
  useEffect(() => {
    function onTraitUpdated(e: Event) {
      const detail = (e as CustomEvent).detail ?? {};
      const { category, completeness, instanceId } = detail as { category?: string; completeness?: number; instanceId?: number };
      const mesh = meshRef.current;
      if (!mesh) return;
      const catAttr = mesh.geometry.getAttribute("aCategory") as THREE.InstancedBufferAttribute | null;
      const compAttr = mesh.geometry.getAttribute("aCompleteness") as THREE.InstancedBufferAttribute | null;
      if (!catAttr || !compAttr) return;

      // If an explicit instanceId is provided update that instance
      if (typeof instanceId === "number") {
        compAttr.setX(instanceId, typeof completeness === "number" ? completeness : compAttr.getX(instanceId));
        compAttr.needsUpdate = true;
        mesh.instanceMatrix.needsUpdate = true;
        return;
      }

      // If category provided, update all instances belonging to that category
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
            if (typeof completeness === "number") {
              compAttr.setX(i, completeness);
            }
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
      <instancedMesh ref={meshRef} args={[geom, material, tileCount]} />
      <OrbitControls enablePan={false} enableZoom={true} rotateSpeed={0.6} />
      <Html center style={{ pointerEvents: "none" }}>
        <div className="text-sm text-textSecondary select-none">
          {selected !== null ? `Selected tile: ${selected}` : hovered !== null ? `Hovering: ${hovered}` : "Legaci Disco"}
        </div>
      </Html>
    </>
  );
}