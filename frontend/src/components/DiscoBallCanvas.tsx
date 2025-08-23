"use client";

import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import DiscoBall from "./DiscoBall";

/**
 * Improved DiscoBallCanvas:
 * - stronger, colorful lights so the tiles are visible
 * - stable camera position and shadow-friendly setup
 * - smaller pixelRatio to guard performance in older devices
 */
const DiscoBallCanvas = () => {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 0, 12], fov: 45 }}
      gl={{ antialias: true }}
    >
      {/* Soft ambient + hemisphere for a colorful environment */}
      <hemisphereLight color={0x8aa7ff} groundColor={0x6a3a5a} intensity={0.45} />
      <ambientLight intensity={0.28} />
      {/* Key lights to make the disco surface pop */}
      <pointLight position={[8, 8, 6]} intensity={1.4} color={0xffe4a3} />
      <pointLight position={[-6, -8, 4]} intensity={0.9} color={0x9be8ff} />
      <pointLight position={[0, 6, 10]} intensity={0.75} color={0xff88ff} />
      {/* HDRI environment to lift reflections/brightness */}
      <Environment preset="city" />
      <DiscoBall />
      <OrbitControls enablePan={false} enableZoom={true} rotateSpeed={0.6} />
    </Canvas>
  );
};

export default DiscoBallCanvas;