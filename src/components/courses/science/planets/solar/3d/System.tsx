
import * as THREE from "three";
import { OrbitControls } from 'three-stdlib';
import { useEffect, useRef } from 'react';

export default function ThreeDSolarSystem() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, containerRef.current.clientWidth / containerRef.current.clientHeight, 0.1, 3000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    const loader = new THREE.TextureLoader();
    
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    containerRef.current.appendChild(renderer.domElement);
    
    camera.position.set(200, 20, 50);

    sceneRef.current = scene;
    rendererRef.current = renderer;
    cameraRef.current = camera;

    let timestamp = 0;
    let orbitFactor = 0.1;
    let rotateFactor = 0.1;

    // Lights
    const pointLight = new THREE.PointLight(0xffffff, 2, 0, 2);
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
    pointLight.position.set(0, 0, 0);
    scene.add(pointLight, ambientLight);

    // Mouse controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.minDistance = 50;
    controls.maxDistance = 900;
    controls.enabled = true;
    controlsRef.current = controls;

    const minPan = new THREE.Vector3(-400, -400, -400);
    const maxPan = new THREE.Vector3(400, 400, 400);
    const _v = new THREE.Vector3();

    controls.addEventListener("change", function () {
      _v.copy(controls.target);
      controls.target.clamp(minPan, maxPan);
      _v.sub(controls.target);
      camera.position.sub(_v);
    });

    // Set background image
    const bg = loader.load('/assets/stars.jpg');
    const bgSphere = new THREE.Mesh(
      new THREE.BoxGeometry(2800, 2800, 2800),
      new THREE.MeshBasicMaterial({
        map: bg,
        side: THREE.DoubleSide,
      })
    );
    scene.add(bgSphere);

    // Create all planets and add them to the scene
    // sun
    const sunTexture = loader.load('/assets/sun.jpeg');
    const sun = new THREE.Mesh(new THREE.SphereGeometry(40, 32, 32), new THREE.MeshBasicMaterial({ map: sunTexture }));
    scene.add(sun);

    // mercury
    const mercuryGeo = new THREE.SphereGeometry(2, 32, 32);
    const mercuryTexture = loader.load('/assets/mercury.jpeg');
    const mercuryMaterial = new THREE.MeshStandardMaterial({ map: mercuryTexture });
    const mercury = new THREE.Mesh(mercuryGeo, mercuryMaterial);
    mercury.position.set(0, 0, 60);
    scene.add(mercury);
    
    // mercury orbit path visualization
    const mercuryPath = new THREE.RingGeometry(60, 60.5, 100);
    const mercuryPathMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      opacity: 0.5,
      transparent: true,
      side: THREE.DoubleSide,
    });
    const mercuryPathMesh = new THREE.Mesh(mercuryPath, mercuryPathMaterial);
    mercuryPathMesh.rotateX(Math.PI / 2);
    mercuryPathMesh.rotateY(-0.15);
    scene.add(mercuryPathMesh);

    // venus
    const venusGeo = new THREE.SphereGeometry(4, 32, 32);
    const venusTexture = loader.load('/assets/venus.jpeg');
    const venusMaterial = new THREE.MeshStandardMaterial({ map: venusTexture });
    const venus = new THREE.Mesh(venusGeo, venusMaterial);
    venus.position.set(0, 0, 80);
    scene.add(venus);
    
    // venus orbit path visualization
    const venusPath = new THREE.RingGeometry(80, 80.5, 100);
    const venusPathMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      opacity: 0.5,
      transparent: true,
      side: THREE.DoubleSide,
    });
    const venusPathMesh = new THREE.Mesh(venusPath, venusPathMaterial);
    venusPathMesh.rotateX(Math.PI / 2);
    scene.add(venusPathMesh);

    // earth
    const earthGeo = new THREE.SphereGeometry(4, 32, 32);
    const earthTexture = loader.load('/assets/earth.jpeg');
    const earthMaterial = new THREE.MeshStandardMaterial({ map: earthTexture });
    const earth = new THREE.Mesh(earthGeo, earthMaterial);
    earth.position.set(0, 0, 100);
    earth.rotateX(0.5);
    scene.add(earth);
    
    // earth orbit path visualization
    const earthPath = new THREE.RingGeometry(100, 100.5, 100);
    const earthPathMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      opacity: 0.5,
      transparent: true,
      side: THREE.DoubleSide,
    });
    const earthPathMesh = new THREE.Mesh(earthPath, earthPathMaterial);
    earthPathMesh.rotateX(Math.PI / 2);
    earth.rotateY(-0.09);
    scene.add(earthPathMesh);

    // mars
    const marsGeo = new THREE.SphereGeometry(3, 32, 32);
    const marsTexture = loader.load('/assets/mars.jpeg');
    const marsMaterial = new THREE.MeshStandardMaterial({ map: marsTexture });
    const mars = new THREE.Mesh(marsGeo, marsMaterial);
    mars.position.set(0, 0, 120);
    mars.rotateX(0.5);
    scene.add(mars);
    
    // mars orbit path visualization
    const marsPath = new THREE.RingGeometry(120, 120.5, 100);
    const marsPathMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      opacity: 0.5,
      transparent: true,
      side: THREE.DoubleSide,
    });
    const marsPathMesh = new THREE.Mesh(marsPath, marsPathMaterial);
    marsPathMesh.rotateX(Math.PI / 2);
    scene.add(marsPathMesh);

    // jupiter
    const jupiterGeo = new THREE.SphereGeometry(10, 32, 32);
    const jupiterTexture = loader.load('/assets/jupiter.jpeg');
    const jupiterMaterial = new THREE.MeshStandardMaterial({ map: jupiterTexture });
    const jupiter = new THREE.Mesh(jupiterGeo, jupiterMaterial);
    jupiter.position.set(0, 0, 160);
    scene.add(jupiter);
    
    // jupiter orbit path visualization
    const jupiterPath = new THREE.RingGeometry(160, 160.5, 100);
    const jupiterPathMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      opacity: 0.5,
      transparent: true,
      side: THREE.DoubleSide,
    });
    const jupiterPathMesh = new THREE.Mesh(jupiterPath, jupiterPathMaterial);
    jupiterPathMesh.rotateX(Math.PI / 2);
    scene.add(jupiterPathMesh);

    // saturn
    const saturnGeo = new THREE.SphereGeometry(9.5, 32, 32);
    const saturnTexture = loader.load('/assets/saturn.jpeg');
    const saturnMaterial = new THREE.MeshStandardMaterial({ map: saturnTexture });
    const saturn = new THREE.Mesh(saturnGeo, saturnMaterial);
    saturn.position.set(0, 0, 200);
    saturn.rotateX(0.55);
    scene.add(saturn);
    
    // saturn orbit path visualization
    const saturnPath = new THREE.RingGeometry(200, 200.5, 100);
    const saturnPathMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      opacity: 0.5,
      transparent: true,
      side: THREE.DoubleSide,
    });
    const saturnPathMesh = new THREE.Mesh(saturnPath, saturnPathMaterial);
    saturnPathMesh.rotateX(Math.PI / 2);
    scene.add(saturnPathMesh);

    // uranus
    const uranusGeo = new THREE.SphereGeometry(6, 32, 32);
    const uranusTexture = loader.load('/assets/uranus.jpeg');
    const uranusMaterial = new THREE.MeshStandardMaterial({ map: uranusTexture });
    const uranus = new THREE.Mesh(uranusGeo, uranusMaterial);
    uranus.position.set(0, 0, 240);
    uranus.rotateX(1);
    scene.add(uranus);
    
    // uranus orbit path visualization
    const uranusPath = new THREE.RingGeometry(240, 240.5, 100);
    const uranusPathMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      opacity: 0.5,
      transparent: true,
      side: THREE.DoubleSide,
    });
    const uranusPathMesh = new THREE.Mesh(uranusPath, uranusPathMaterial);
    uranusPathMesh.rotateX(Math.PI / 2);
    uranusPathMesh.rotateY(Math.sin(0.1) * -0.5);
    scene.add(uranusPathMesh);

    // neptune
    const neptuneGeo = new THREE.SphereGeometry(6, 32, 32);
    const neptuneTexture = loader.load('/assets/neptune.jpeg');
    const neptuneMaterial = new THREE.MeshStandardMaterial({ map: neptuneTexture });
    const neptune = new THREE.Mesh(neptuneGeo, neptuneMaterial);
    neptune.rotateX(0.6);
    neptune.position.set(0, 0, 280);
    scene.add(neptune);
    
    // neptune orbit path visualization
    const neptunePath = new THREE.RingGeometry(280, 280.5, 100);
    const neptunePathMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      opacity: 0.5,
      transparent: true,
      side: THREE.DoubleSide,
    });
    const neptunePathMesh = new THREE.Mesh(neptunePath, neptunePathMaterial);
    neptunePathMesh.rotateX(Math.PI / 2);
    scene.add(neptunePathMesh);

    // pluto
    const plutoGeo = new THREE.SphereGeometry(2, 32, 32);
    const plutoTexture = loader.load('/assets/pluto.png');
    const plutoMaterial = new THREE.MeshStandardMaterial({ map: plutoTexture });
    const pluto = new THREE.Mesh(plutoGeo, plutoMaterial);
    pluto.position.set(0, 0, 340);
    scene.add(pluto);
    
    // pluto orbit path visualization
    const plutoPath = new THREE.RingGeometry(340, 340.5, 100);
    const plutoPathMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      opacity: 0.5,
      transparent: true,
      side: THREE.DoubleSide,
    });
    const plutoPathMesh = new THREE.Mesh(plutoPath, plutoPathMaterial);
    plutoPathMesh.rotateX(Math.PI / 2);
    plutoPathMesh.rotateY(Math.sin(0.1) * 0.55);
    scene.add(plutoPathMesh);

    // saturn ring
    const saturnRingGeo = new THREE.RingGeometry(15, 20, 32);
    const saturnRingTexture = loader.load('/assets/saturn-ring.png');
    const saturnRingMaterial = new THREE.MeshStandardMaterial({
      map: saturnRingTexture,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.8,
    });
    const saturnRing = new THREE.Mesh(saturnRingGeo, saturnRingMaterial);
    saturnRing.rotateX(45);
    saturnRing.position.set(0, 0, 200);
    scene.add(saturnRing);

    // Animation loop
    const animate = () => {
      if (!sceneRef.current || !rendererRef.current || !cameraRef.current) return;
      
      animationRef.current = requestAnimationFrame(animate);
      
      const EARTH_YEAR = rotateFactor * (50 * Math.PI * (1 / 60) * (1 / 60));
      
      // Planet rotations
      sun.rotation.y += EARTH_YEAR * 0.25;
      mercury.rotation.y += EARTH_YEAR * 0.5;
      venus.rotation.y -= EARTH_YEAR * 0.1;
      earth.rotation.y += EARTH_YEAR;
      mars.rotation.y += EARTH_YEAR * 1.05;
      jupiter.rotation.y += EARTH_YEAR * 4;
      saturn.rotation.y += EARTH_YEAR * 4;
      uranus.rotation.y -= EARTH_YEAR * 3;
      neptune.rotation.y += EARTH_YEAR * 3;
      pluto.rotation.y += EARTH_YEAR * 0.75;

      timestamp = orbitFactor * (Date.now() * 0.0001);

      // Planet orbits
      mercury.position.x = Math.sin(timestamp * 5) * 60;
      mercury.position.z = Math.cos(timestamp * 5) * 60;
      mercury.position.y = Math.sin(timestamp * 5) * -10;

      venus.position.x = Math.sin(timestamp * 4) * 80;
      venus.position.z = Math.cos(timestamp * 4) * 80;

      earth.position.x = Math.sin(timestamp * 3) * 100;
      earth.position.z = Math.cos(timestamp * 3) * 100;

      mars.position.x = Math.sin(timestamp * 2) * 120;
      mars.position.z = Math.cos(timestamp * 2) * 120;

      jupiter.position.x = Math.sin(timestamp * 0.8) * 160;
      jupiter.position.z = Math.cos(timestamp * 0.8) * 160;

      saturn.position.x = Math.sin(timestamp * 0.5) * 200;
      saturn.position.z = Math.cos(timestamp * 0.5) * 200;
      saturnRing.position.x = Math.sin(timestamp * 0.5) * 200;
      saturnRing.position.z = Math.cos(timestamp * 0.5) * 200;

      uranus.position.x = Math.sin(timestamp * 0.4) * 240;
      uranus.position.z = Math.cos(timestamp * 0.4) * 240;
      uranus.position.y = Math.sin(timestamp * 0.4) * -10;

      neptune.position.x = Math.sin(timestamp * 0.2) * 280;
      neptune.position.z = Math.cos(timestamp * 0.2) * 280;

      pluto.position.x = Math.sin(timestamp * 0.1) * 340;
      pluto.position.z = Math.cos(timestamp * 0.1) * 340;
      pluto.position.y = Math.sin(timestamp * 0.1) * 20;

      rendererRef.current.render(sceneRef.current, cameraRef.current);
    };

    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current || !cameraRef.current || !rendererRef.current) return;
      
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      
      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Start animation
    animate();

    // Cleanup function
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      
      window.removeEventListener('resize', handleResize);
      
      if (controlsRef.current) {
        controlsRef.current.dispose();
      }
      
      if (rendererRef.current && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
        rendererRef.current.dispose();
      }
      
      // Clean up scene
      if (sceneRef.current) {
        sceneRef.current.traverse((object) => {
          if (object instanceof THREE.Mesh) {
            object.geometry.dispose();
            if (Array.isArray(object.material)) {
              object.material.forEach(material => material.dispose());
            } else {
              object.material.dispose();
            }
          }
        });
      }
    };
  }, []);

  return (
    <div className="w-full h-full">
      <div ref={containerRef} className="w-full h-full bg-black" />
      <div className="absolute top-4 left-4 text-white text-sm bg-black bg-opacity-50 p-3 rounded-lg">
        <p>🌟 Use mouse to rotate and zoom</p>
        <p>🪐 Explore our solar system in 3D!</p>
      </div>
    </div>
  );
}
