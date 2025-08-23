// DiscoBallCanvas.tsx
"use client";

import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import * as THREE from "three";
import DiscoBall from "./DiscoBall";

const DiscoBallCanvas = () => {
  return (
    <Canvas
      shadows
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 12], fov: 45 }}
      gl={{
        antialias: true,
        alpha: true,
        outputColorSpace: THREE.SRGBColorSpace,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 0.9, // darker overall
      }}
      onCreated={({ gl }) => {
        (gl as any).physicallyCorrectLights = true;
      }}
      style={{ background: "transparent" }}
    >
      {/* darker lighting setup */}
      <hemisphereLight color={0x6b86ff} groundColor={0x2a1f32} intensity={0.35} />
      <ambientLight intensity={0.15} />

      <directionalLight
        position={[6, 10, 6]}
        intensity={1.2}
        color={0xffffff}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <pointLight position={[8, 8, 6]} intensity={0.7} color={0xffe4a3} />
      <pointLight position={[-6, -8, 4]} intensity={0.55} color={0x9be8ff} />
      <pointLight position={[0, 6, 10]} intensity={0.6} color={0xff88ff} />

      <Environment preset="city" />

      <DiscoBall />

      <OrbitControls enablePan={false} enableZoom={true} rotateSpeed={0.6} />
    </Canvas>
  );
};

export default DiscoBallCanvas;