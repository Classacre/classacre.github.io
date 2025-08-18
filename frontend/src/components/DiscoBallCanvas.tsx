"use client";

import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import DiscoBall from './DiscoBall';

const DiscoBallCanvas = () => {
  return (
    <Canvas>
      <ambientLight intensity={0.3} />
      <DiscoBall />
      <OrbitControls />
    </Canvas>
  );
};

export default DiscoBallCanvas;