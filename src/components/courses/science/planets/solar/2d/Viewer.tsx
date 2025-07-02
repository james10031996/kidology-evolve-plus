
import { useState, startTransition, Suspense } from 'react';
import texture from './Data/texture.json';
import { Canvas, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import {
  Loading,
  PlanetMash,
  Controllers,
  PlanetRing,
  Information,
} from './viewer/index';
import ResponsiveCamera from './Hooks/ResponsiveCamera';
import { OrbitControls } from '@react-three/drei';
import { useParams } from 'react-router-dom';

interface Planet {
  name: string;
  texture: string;
  bump?: string;
  bumpScale?: number;
  normal?: string;
  hasRing?: boolean;
  ringTexture?: string;
  ringAlpha?: string;
  tagline?: string;
  radius?: number;
  moons?: number;
  orbit?: string;
  description?: string;
  [key: string]: any;
}

interface TextureData {
  planets: Planet[];
}

const typedTexture = texture as TextureData;

export default function Viewer() {
  const { planet } = useParams<{ planet: string }>();

  const currentPlanetIndex = typedTexture.planets.findIndex(
    (p) => p.name.toLowerCase() === planet?.toLowerCase()
  );

  const [current, setCurrent] = useState(
    currentPlanetIndex === -1 ? 2 : currentPlanetIndex
  );

  
  const starTexture = useLoader(THREE.TextureLoader as any, '/textures/star.webp');
  const [isNotMobile] = useState(() => window.innerWidth > 640);
  const [showInfo, setShowInfo] = useState(false);
  const [loading, setLoading] = useState(true);

  const currentPlanet = typedTexture.planets[current];

  // Wrap current planet change in startTransition
  const handleSetCurrent = (index: number) => {
    startTransition(() => {
      setCurrent(index);
    });
  };

  return (
    <Suspense fallback={<Loading />}>
      <div className="relative w-dvw h-dvh overflow-y-auto bg-gray-900 text-white">
        <div className="absolute z-10 h-full w-full inset-0">
          <Canvas>
            <ResponsiveCamera />
            <OrbitControls
              enablePan={isNotMobile}
              enableZoom={true}
              minDistance={isNotMobile ? 3 : 4}
              maxDistance={isNotMobile ? 50 : 30}
            />
            <color attach="background" args={['black']} />
            <ambientLight intensity={0.3} color={0x8888aa} />
            <directionalLight intensity={1.5} position={[0, 2, 4]} />

            <mesh>
              <sphereGeometry args={[500, 64, 64]} />
              <meshBasicMaterial map={starTexture} side={THREE.BackSide} />
            </mesh>

            <PlanetMash
              colorMapPath={currentPlanet.texture}
              bumpMapPath={currentPlanet.bump}
              bumpScale={currentPlanet.bumpScale}
              normalMapPath={currentPlanet.normal}
              setLoading={setLoading}
            />

            {currentPlanet.hasRing && currentPlanet.ringTexture && (
              <PlanetRing
                texturePath={currentPlanet.ringTexture}
                transparencyMap={currentPlanet.ringAlpha || ''}
              />
            )}
          </Canvas>

          <Information
            currentPlanet={currentPlanet}
            showInfo={showInfo}
            setShowInfo={setShowInfo}
          />

          <Controllers
            setCurrent={handleSetCurrent}
            current={current}
            isNotMobile={isNotMobile}
          />
        </div>
      </div>
    </Suspense>
  );
}
