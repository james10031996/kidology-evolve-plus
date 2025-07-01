import { useRef, useState, useMemo } from 'react';
import { useCursor } from '@react-three/drei';
import { useLoader, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface PlanetMashProps {
  colorMapPath: string;
  bumpMapPath?: string;
  normalMapPath?: string;
  bumpScale?: number;
  setLoading: (loading: boolean) => void;
}

export default function PlanetMash({
  colorMapPath,
  bumpMapPath,
  normalMapPath,
  bumpScale = 0.05,
  setLoading,
}: PlanetMashProps) {
  const planetRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHovered] = useState(false);

  useCursor(hovered);

  const colorMap = useLoader(THREE.TextureLoader as any, colorMapPath, (loader) => {
    loader.manager.onLoad = () => setLoading(false);
  });

  const bumpMap = useMemo(
    () => (bumpMapPath ? useLoader(THREE.TextureLoader as any, bumpMapPath) : null),
    [bumpMapPath]
  );

  const normalMap = useMemo(
    () => (normalMapPath ? useLoader(THREE.TextureLoader as any, normalMapPath) : null),
    [normalMapPath]
  );

  useFrame(() => {
    if (planetRef.current) {
      planetRef.current.rotation.y += 0.002;
    }
  });

  return (
    <mesh
      ref={planetRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <sphereGeometry args={[2.2, 64, 64]} />
      <meshStandardMaterial
        map={colorMap}
        bumpMap={bumpMap || undefined}
        bumpScale={bumpScale}
        normalMap={normalMap || undefined}
        metalness={0.1}
        roughness={0.3}
      />
    </mesh>
  );
}
