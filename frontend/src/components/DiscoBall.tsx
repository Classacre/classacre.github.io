// DiscoBall.tsx
import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Define the DiscoBall component
export default function DiscoBall({ categories = ['Childhood', 'Personality', 'Career', 'Relationships', 'Health', 'Habits', 'Location', 'Misc/Notes'], tileSize = 0.5 }) {
  const discoBallRef = useRef<THREE.Group>(null);
  const [hoveredTile, setHoveredTile] = useState<number | null>(null);
  const [completeness, setCompleteness] = useState<number[]>(categories.map(() => 0.5));

  useFrame(() => {
    if (discoBallRef.current) {
      // Slow auto-rotation
      discoBallRef.current.rotation.y += 0.005;
    }
  });

  const handleHover = (index: number) => {
    setHoveredTile(index);
  };

  const handleLeave = () => {
    setHoveredTile(null);
  };

  return (
    <group>
      {/* Disco ball container */}
      <group ref={discoBallRef} position={[0, 0, 0]}>
        {categories.map((category, index) => {
          const hue = index % 4; // Assign a hue group for the color transition
          const color = hoveredTile === index ? '#ffffff' : `hsl(${hue * 60}, 80%, 60%)`;
          const baseColor = hoveredTile === index ? '#ffffff' : `hsl(${hue * 60}, 80%, 50%)`;
          const size = 1 + completeness[index] * 0.5;

          return (
            <mesh
              key={index}
              position={[0, 0, 0]}
              scale={[size, size, size]}
              onPointerOver={() => handleHover(index)}
              onPointerOut={handleLeave}
            >
              {/* Base material */}
              <boxGeometry args={[1, 1, 1]} />
              <meshStandardMaterial
                color={color}
                metalness={0.3}
                roughness={0.4}
                emissive={baseColor}
                emissiveIntensity={0.2}
              />
            </mesh>
          );
        })}
      </group>
    </group>
  );
}