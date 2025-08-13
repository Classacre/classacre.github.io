"use client";

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const Box = (props: any) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.005;
      meshRef.current.rotation.y += 0.005;
    }
  });

  return (
    <mesh {...props} ref={meshRef}>
      <boxGeometry args={[0.5, 0.5, 0.5]} />
      <meshStandardMaterial color="hotpink" />
    </mesh>
  );
};

const DiscoBallCanvas = () => {
  return (
    <Canvas>
      <ambientLight intensity={0.3} />
      <Box position={[0, 0, 0]} />
      <OrbitControls />
    </Canvas>
  );
};

export default DiscoBallCanvas;