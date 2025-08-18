"use client";

import React, { useRef, useState, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { discoBallVertexShader, discoBallFragmentShader } from '../lib/shaders/discoBall';

interface DiscoBallProps {
  categories?: string[];
  tileSize?: number;
  tileCount?: number;
}

const DiscoBall = ({ categories = ['Childhood', 'Personality', 'Career', 'Relationships', 'Health', 'Habits', 'Location', 'Misc/Notes'], tileSize = 0.5, tileCount = 1000 }: DiscoBallProps) => {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const [hoveredTile, setHoveredTile] = useState<number | null>(null);
  const [completeness, setCompleteness] = useState<number[]>(Array(categories.length).fill(0.5));
  const { scene } = useThree();

  const geometry = useMemo(() => new THREE.BoxGeometry(tileSize, tileSize, tileSize), [tileSize]);
  const material = useMemo(() => {
    const shaderMaterial = new THREE.ShaderMaterial({
      vertexShader: discoBallVertexShader,
      fragmentShader: discoBallFragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uMaxOffset: { value: 0.2 },
      },
    });
    return shaderMaterial;
  }, []);

  useEffect(() => {
    if (meshRef.current) {
      const instanceCount = tileCount;
      meshRef.current.count = instanceCount;

      const categoryAttribute = new THREE.InstancedBufferAttribute(new Float32Array(instanceCount), 1);
      const completenessAttribute = new THREE.InstancedBufferAttribute(new Float32Array(instanceCount), 1);
      const selectedAttribute = new THREE.InstancedBufferAttribute(new Float32Array(instanceCount), 1);

      meshRef.current.geometry.setAttribute('aCategory', categoryAttribute);
      meshRef.current.geometry.setAttribute('aCompleteness', completenessAttribute);
      meshRef.current.geometry.setAttribute('aSelected', selectedAttribute);

      const dummy = new THREE.Object3D();
      for (let i = 0; i < instanceCount; i++) {
        // Calculate position on a sphere
        const phi = Math.random() * Math.PI;
        const theta = Math.random() * 2 * Math.PI;

        const x = Math.sin(phi) * Math.cos(theta);
        const y = Math.cos(phi);
        const z = Math.sin(phi) * Math.sin(theta);

        dummy.position.set(x, y, z).normalize().multiplyScalar(5);
        dummy.updateMatrix();
        meshRef.current.setMatrixAt(i, dummy.matrix);

        // Assign random category, completeness, and selected values
        categoryAttribute.setX(i, Math.floor(Math.random() * categories.length));
        completenessAttribute.setX(i, Math.random());
        selectedAttribute.setX(i, 0);
      }

      meshRef.current.instanceMatrix.needsUpdate = true;
      categoryAttribute.needsUpdate = true;
      completenessAttribute.needsUpdate = true;
      selectedAttribute.needsUpdate = true;
    }
  }, [categories, geometry, tileCount]);

  useFrame(({ clock }) => {
    if (meshRef.current && material instanceof THREE.ShaderMaterial) {
      (meshRef.current.material as THREE.ShaderMaterial).uniforms.uTime.value = clock.getElapsedTime();
      meshRef.current.rotation.y += 0.005;
    }
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[geometry, material, tileCount]}
    />
  );
};

export default DiscoBall;