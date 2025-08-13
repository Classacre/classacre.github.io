import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { BufferGeometry, MeshStandardMaterial } from 'three';

interface TileMaterialProps {
  color: [number, number, number];
  time: number;
}

interface Tile {
  position: [number, number, number];
  category: number;
  completeness: number;
}

const categoryColors: [number, number, number][] = [
  [0.6, 0.74, 0.83],    // Childhood
  [0.34, 0.61, 0.61],   // Personality
  [0.94, 0.6, 0.29],    // Career
  [0.4, 0.31, 0.67],    // Relationships
  [0.34, 0.61, 0.61],   // Health
  [0.67, 0.4, 0.8],     // Habits
  [0.29, 0.6, 0.94],    // Location
  [0.5, 0.5, 0.5]       // Misc/Notes
];

const TileMaterial = (props: TileMaterialProps): MeshStandardMaterial => {
  return new THREE.MeshStandardMaterial({
    color: new THREE.Color(props.color[0], props.color[1], props.color[2]),
    metalness: 0.8,
    roughness: 0.2,
    transparent: true,
    opacity: 0.8,
  });
};

const Tile = ({ position, category, completeness }: Tile) => {
  const meshRef = React.useRef<THREE.Mesh>(null);

  React.useEffect(() => {
    if (meshRef.current) {
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const material = TileMaterial({
        color: categoryColors[category],
        time: Date.now() / 1000,
      });

      meshRef.current.geometry = geometry;
      meshRef.current.material = material;
    }
  }, [position, category, completeness]);

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[1, 1, 1]} />
    </mesh>
  );
};

const DiscoBall = () => {
  const [tiles, setTiles] = React.useState<Tile[]>([]);

  React.useEffect(() => {
    // Generate grid of positions
    const positions: [number, number, number][] = [];
    for (let x = -5; x < 5; x++) {
      for (let z = -5; z < 5; z++) {
        positions.push([x, 0, z]);
      }
    }

    // Create tiles with random categories and positions
    const generatedTiles = positions.map((pos, index) => ({
      position: pos,
      category: Math.floor(Math.random() * 8),
      completeness: Math.random(),
    }));

    setTiles(generatedTiles);
  }, []);

  return (
    <Canvas camera={{ position: [0, 5, 10], fov: 75 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      
      <group>
        {tiles.map((tile, index) => (
          <Tile key={index} {...tile} />
        ))}
        
        {/* Central sphere */}
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshStandardMaterial color={[0.5, 0.5, 0.5]} />
        </mesh>
      </group>
      
      <OrbitControls 
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        zoomSpeed={0.6}
        panSpeed={0.5}
        rotateSpeed={0.4}
      />
    </Canvas>
  );
};

export default DiscoBall;