import { useLoader, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

interface PlanetRingProps {
  texturePath: string;
  transparencyMap: string;
}

export default function PlanetRing({ texturePath, transparencyMap }: PlanetRingProps) {
  const ringRef = useRef<THREE.Mesh>(null);

  const ringTexture = useLoader(THREE.TextureLoader as any, texturePath);
  const alphaMap = useLoader(THREE.TextureLoader as any, transparencyMap);

  useFrame(() => {
    if (ringRef.current) {
      ringRef.current.rotation.z += 0.002;
    }
  });

  return (
    <mesh ref={ringRef} rotation={[-Math.PI / 2, 0, 0]}>
      <ringGeometry args={[2.5, 5.1, 64]} />
      <meshStandardMaterial
        map={ringTexture}
        alphaMap={alphaMap}
        transparent
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}
