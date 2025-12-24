import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere } from "@react-three/drei";
import * as THREE from "three";

// Moon configurations for each planet
interface MoonConfig {
  name: string;
  size: number;
  distance: number;
  speed: number;
  color: string;
  secondaryColor?: string;
}

const planetMoons: Record<string, MoonConfig[]> = {
  earth: [
    { name: "Moon", size: 0.27, distance: 2.8, speed: 0.5, color: "#c0c0c0", secondaryColor: "#808080" },
  ],
  mars: [
    { name: "Phobos", size: 0.08, distance: 2.2, speed: 1.2, color: "#8b7355" },
    { name: "Deimos", size: 0.05, distance: 2.6, speed: 0.8, color: "#a09080" },
  ],
  jupiter: [
    { name: "Io", size: 0.18, distance: 2.5, speed: 0.8, color: "#f4e04d", secondaryColor: "#e67e22" },
    { name: "Europa", size: 0.15, distance: 3.0, speed: 0.6, color: "#e8dcc8", secondaryColor: "#c4a882" },
    { name: "Ganymede", size: 0.22, distance: 3.5, speed: 0.4, color: "#a0a0a0", secondaryColor: "#707070" },
    { name: "Callisto", size: 0.2, distance: 4.0, speed: 0.3, color: "#606060", secondaryColor: "#404040" },
  ],
  saturn: [
    { name: "Titan", size: 0.25, distance: 4.2, speed: 0.35, color: "#e6a040", secondaryColor: "#c88030" },
    { name: "Enceladus", size: 0.08, distance: 3.6, speed: 0.7, color: "#ffffff", secondaryColor: "#e0e0e0" },
    { name: "Mimas", size: 0.06, distance: 3.4, speed: 0.9, color: "#c0c0c0" },
  ],
  uranus: [
    { name: "Miranda", size: 0.08, distance: 2.4, speed: 0.8, color: "#a0a0a0" },
    { name: "Ariel", size: 0.1, distance: 2.8, speed: 0.6, color: "#b0b0b0" },
    { name: "Titania", size: 0.12, distance: 3.4, speed: 0.4, color: "#909090" },
  ],
  neptune: [
    { name: "Triton", size: 0.18, distance: 2.8, speed: 0.5, color: "#d4a0a0", secondaryColor: "#c08080" },
  ],
};

// Realistic planet configurations
const planetConfigs: Record<string, {
  baseColor: string;
  secondaryColor?: string;
  emissive?: string;
  emissiveIntensity?: number;
  metalness: number;
  roughness: number;
  hasAtmosphere?: boolean;
  atmosphereColor?: string;
  banding?: boolean;
  bandColors?: string[];
}> = {
  mercury: {
    baseColor: "#8c8c8c",
    secondaryColor: "#5a5a5a",
    metalness: 0.3,
    roughness: 0.9,
  },
  venus: {
    baseColor: "#e6c87a",
    secondaryColor: "#c9a84a",
    metalness: 0.1,
    roughness: 0.7,
    hasAtmosphere: true,
    atmosphereColor: "#ffd699",
  },
  earth: {
    baseColor: "#4a90d9",
    secondaryColor: "#2d6a4f",
    metalness: 0.1,
    roughness: 0.6,
    hasAtmosphere: true,
    atmosphereColor: "#87ceeb",
  },
  mars: {
    baseColor: "#c1440e",
    secondaryColor: "#8b3a0e",
    metalness: 0.15,
    roughness: 0.85,
    hasAtmosphere: true,
    atmosphereColor: "#ffb380",
  },
  jupiter: {
    baseColor: "#d4a574",
    metalness: 0.05,
    roughness: 0.8,
    banding: true,
    bandColors: ["#c9a56c", "#8b6914", "#d4a574", "#e8c89e", "#a67c52"],
  },
  saturn: {
    baseColor: "#f4d59e",
    metalness: 0.05,
    roughness: 0.75,
    banding: true,
    bandColors: ["#f4d59e", "#c9a86c", "#e8d4a8", "#d4b896", "#f0e0c0"],
  },
  uranus: {
    baseColor: "#7de3f4",
    secondaryColor: "#4fd1c5",
    metalness: 0.1,
    roughness: 0.6,
    hasAtmosphere: true,
    atmosphereColor: "#a8e6cf",
  },
  neptune: {
    baseColor: "#3d5fc4",
    secondaryColor: "#1a3a8a",
    metalness: 0.1,
    roughness: 0.6,
    hasAtmosphere: true,
    atmosphereColor: "#6b8cce",
  },
};

// Moon component with orbit
interface MoonProps {
  config: MoonConfig;
  initialAngle: number;
}

const Moon = ({ config, initialAngle }: MoonProps) => {
  const moonRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (moonRef.current) {
      moonRef.current.rotation.y = initialAngle + state.clock.elapsedTime * config.speed;
    }
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
    }
  });

  const moonMaterial = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 64;
    const ctx = canvas.getContext('2d')!;
    
    // Base color
    ctx.fillStyle = config.color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Add craters/surface detail
    for (let i = 0; i < 30; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const radius = Math.random() * 8 + 2;
      ctx.fillStyle = config.secondaryColor || `rgba(0,0,0,${0.1 + Math.random() * 0.2})`;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    }
    
    const texture = new THREE.CanvasTexture(canvas);
    
    return new THREE.MeshStandardMaterial({
      map: texture,
      metalness: 0.1,
      roughness: 0.9,
    });
  }, [config]);

  return (
    <group ref={moonRef}>
      <Sphere ref={meshRef} args={[config.size, 32, 32]} position={[config.distance, 0, 0]}>
        <primitive object={moonMaterial} attach="material" />
      </Sphere>
    </group>
  );
};

// Earth with day/night cycle and city lights
const EarthMesh = () => {
  const dayRef = useRef<THREE.Mesh>(null);
  const nightRef = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (dayRef.current) dayRef.current.rotation.y += 0.002;
    if (nightRef.current) nightRef.current.rotation.y += 0.002;
    if (cloudsRef.current) cloudsRef.current.rotation.y += 0.0025;
    if (atmosphereRef.current) atmosphereRef.current.rotation.y += 0.001;
  });

  // Day side texture with continents
  const dayMaterial = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;
    
    // Ocean
    ctx.fillStyle = '#1a5fb4';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Continents (simplified shapes)
    ctx.fillStyle = '#2d6a4f';
    
    // North America
    ctx.beginPath();
    ctx.ellipse(200, 120, 80, 60, 0.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(180, 180, 50, 40, -0.3, 0, Math.PI * 2);
    ctx.fill();
    
    // South America
    ctx.beginPath();
    ctx.ellipse(280, 320, 40, 80, 0.1, 0, Math.PI * 2);
    ctx.fill();
    
    // Europe
    ctx.beginPath();
    ctx.ellipse(520, 130, 50, 30, 0.3, 0, Math.PI * 2);
    ctx.fill();
    
    // Africa
    ctx.beginPath();
    ctx.ellipse(530, 260, 60, 80, -0.1, 0, Math.PI * 2);
    ctx.fill();
    
    // Asia
    ctx.beginPath();
    ctx.ellipse(700, 140, 120, 70, 0.1, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(780, 200, 60, 40, 0.2, 0, Math.PI * 2);
    ctx.fill();
    
    // Australia
    ctx.beginPath();
    ctx.ellipse(820, 340, 50, 35, 0.3, 0, Math.PI * 2);
    ctx.fill();
    
    // Antarctica
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 480, canvas.width, 32);
    
    // Arctic
    ctx.beginPath();
    ctx.ellipse(512, 15, 200, 20, 0, 0, Math.PI * 2);
    ctx.fill();
    
    const texture = new THREE.CanvasTexture(canvas);
    
    return new THREE.MeshStandardMaterial({
      map: texture,
      metalness: 0.1,
      roughness: 0.7,
    });
  }, []);

  // Night side with city lights
  const nightMaterial = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;
    
    // Dark ocean
    ctx.fillStyle = '#0a0a15';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Dark continents
    ctx.fillStyle = '#0f1510';
    
    // Draw same continent shapes
    ctx.beginPath();
    ctx.ellipse(200, 120, 80, 60, 0.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(180, 180, 50, 40, -0.3, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(280, 320, 40, 80, 0.1, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(520, 130, 50, 30, 0.3, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(530, 260, 60, 80, -0.1, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(700, 140, 120, 70, 0.1, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(780, 200, 60, 40, 0.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(820, 340, 50, 35, 0.3, 0, Math.PI * 2);
    ctx.fill();
    
    // City lights - clusters of bright dots
    const cities = [
      // North America
      { x: 160, y: 140, intensity: 40 }, // East Coast
      { x: 120, y: 150, intensity: 25 }, // West Coast
      { x: 180, y: 180, intensity: 20 }, // Mexico
      // Europe
      { x: 500, y: 120, intensity: 50 }, // Western Europe
      { x: 540, y: 130, intensity: 35 }, // Eastern Europe
      // Asia
      { x: 680, y: 160, intensity: 45 }, // India
      { x: 750, y: 140, intensity: 60 }, // China
      { x: 820, y: 150, intensity: 55 }, // Japan
      { x: 720, y: 200, intensity: 30 }, // SE Asia
      // South America
      { x: 290, y: 300, intensity: 25 }, // Brazil
      // Africa
      { x: 530, y: 230, intensity: 15 }, // North Africa
      { x: 550, y: 320, intensity: 20 }, // South Africa
      // Australia
      { x: 840, y: 350, intensity: 20 },
    ];
    
    cities.forEach(city => {
      for (let i = 0; i < city.intensity; i++) {
        const offsetX = (Math.random() - 0.5) * 40;
        const offsetY = (Math.random() - 0.5) * 25;
        const brightness = 0.5 + Math.random() * 0.5;
        ctx.fillStyle = `rgba(255, ${200 + Math.random() * 55}, ${150 + Math.random() * 50}, ${brightness})`;
        ctx.beginPath();
        ctx.arc(city.x + offsetX, city.y + offsetY, Math.random() * 2 + 0.5, 0, Math.PI * 2);
        ctx.fill();
      }
    });
    
    const texture = new THREE.CanvasTexture(canvas);
    
    return new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      blending: THREE.AdditiveBlending,
    });
  }, []);

  // Cloud layer
  const cloudMaterial = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 256;
    const ctx = canvas.getContext('2d')!;
    
    ctx.fillStyle = 'rgba(0,0,0,0)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw cloud patches
    for (let i = 0; i < 50; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const width = 30 + Math.random() * 60;
      const height = 15 + Math.random() * 30;
      const alpha = 0.3 + Math.random() * 0.4;
      
      ctx.fillStyle = `rgba(255,255,255,${alpha})`;
      ctx.beginPath();
      ctx.ellipse(x, y, width, height, Math.random() * Math.PI, 0, Math.PI * 2);
      ctx.fill();
    }
    
    const texture = new THREE.CanvasTexture(canvas);
    
    return new THREE.MeshStandardMaterial({
      map: texture,
      transparent: true,
      opacity: 0.4,
      depthWrite: false,
    });
  }, []);

  // Atmosphere glow
  const atmosphereMaterial = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: '#87ceeb',
      transparent: true,
      opacity: 0.15,
      side: THREE.BackSide,
    });
  }, []);

  return (
    <group>
      {/* Day side */}
      <Sphere ref={dayRef} args={[1.5, 64, 64]}>
        <primitive object={dayMaterial} attach="material" />
      </Sphere>
      
      {/* Night side with city lights (slightly larger to show through) */}
      <Sphere ref={nightRef} args={[1.502, 64, 64]}>
        <primitive object={nightMaterial} attach="material" />
      </Sphere>
      
      {/* Cloud layer */}
      <Sphere ref={cloudsRef} args={[1.52, 48, 48]}>
        <primitive object={cloudMaterial} attach="material" />
      </Sphere>
      
      {/* Atmosphere */}
      <Sphere ref={atmosphereRef} args={[1.65, 32, 32]}>
        <primitive object={atmosphereMaterial} attach="material" />
      </Sphere>
    </group>
  );
};

interface PlanetMeshProps {
  planetId: string;
  hasRings?: boolean;
}

const PlanetMesh = ({ planetId, hasRings = false }: PlanetMeshProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringsRef = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);

  const config = planetConfigs[planetId] || planetConfigs.earth;
  const moons = planetMoons[planetId] || [];

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;
    }
    if (ringsRef.current) {
      ringsRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.1) * 0.02;
    }
    if (atmosphereRef.current) {
      atmosphereRef.current.rotation.y += 0.001;
    }
  });

  // Create procedural texture for banded planets (Jupiter, Saturn)
  const planetMaterial = useMemo(() => {
    if (config.banding && config.bandColors) {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 256;
      const ctx = canvas.getContext('2d')!;
      
      const bandCount = config.bandColors.length * 3;
      const bandHeight = canvas.height / bandCount;
      
      for (let i = 0; i < bandCount; i++) {
        const colorIndex = i % config.bandColors.length;
        ctx.fillStyle = config.bandColors[colorIndex];
        const yOffset = Math.sin(i * 0.5) * 2;
        ctx.fillRect(0, i * bandHeight + yOffset, canvas.width, bandHeight + 2);
      }
      
      // Add storm spots for Jupiter
      if (planetId === 'jupiter') {
        ctx.fillStyle = '#d45a3a';
        ctx.beginPath();
        ctx.ellipse(350, 150, 30, 20, 0, 0, Math.PI * 2);
        ctx.fill();
      }
      
      const texture = new THREE.CanvasTexture(canvas);
      texture.wrapS = THREE.RepeatWrapping;
      
      return new THREE.MeshStandardMaterial({
        map: texture,
        metalness: config.metalness,
        roughness: config.roughness,
      });
    }
    
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 256;
    const ctx = canvas.getContext('2d')!;
    
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, config.baseColor);
    gradient.addColorStop(0.5, config.secondaryColor || config.baseColor);
    gradient.addColorStop(1, config.baseColor);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    for (let i = 0; i < 2000; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const radius = Math.random() * 3 + 1;
      const alpha = Math.random() * 0.3;
      ctx.fillStyle = `rgba(0,0,0,${alpha})`;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    }
    
    if (planetId === 'mars') {
      ctx.fillStyle = 'rgba(255,255,255,0.7)';
      ctx.beginPath();
      ctx.ellipse(256, 10, 80, 15, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(256, 246, 60, 12, 0, 0, Math.PI * 2);
      ctx.fill();
    }
    
    if (planetId === 'uranus' || planetId === 'neptune') {
      for (let i = 0; i < 5; i++) {
        ctx.strokeStyle = `rgba(255,255,255,${0.1 + Math.random() * 0.2})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, 50 + i * 40);
        ctx.bezierCurveTo(
          128, 45 + i * 40 + Math.random() * 10,
          384, 55 + i * 40 - Math.random() * 10,
          512, 50 + i * 40
        );
        ctx.stroke();
      }
    }
    
    const texture = new THREE.CanvasTexture(canvas);
    
    return new THREE.MeshStandardMaterial({
      map: texture,
      metalness: config.metalness,
      roughness: config.roughness,
      emissive: config.emissive ? new THREE.Color(config.emissive) : undefined,
      emissiveIntensity: config.emissiveIntensity || 0,
    });
  }, [planetId, config]);

  const ringGeometry = useMemo(() => {
    return new THREE.RingGeometry(2.0, 3.2, 128);
  }, []);

  const ringMaterial = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 64;
    const ctx = canvas.getContext('2d')!;
    
    const ringColors = planetId === 'saturn' 
      ? ['#c9a86c', '#e8d4a8', '#a67c52', '#f4d59e', '#8b6914', '#d4b896']
      : ['#7de3f4', '#4fd1c5', '#5ce0d8'];
    
    for (let i = 0; i < canvas.width; i++) {
      const colorIndex = Math.floor((i / canvas.width) * ringColors.length * 4) % ringColors.length;
      const alpha = 0.3 + Math.random() * 0.5;
      ctx.fillStyle = ringColors[colorIndex];
      ctx.globalAlpha = alpha;
      ctx.fillRect(i, 0, 1, canvas.height);
    }
    
    ctx.globalAlpha = 1;
    ctx.fillStyle = 'rgba(0,0,0,0.8)';
    ctx.fillRect(100, 0, 8, canvas.height);
    ctx.fillRect(250, 0, 4, canvas.height);
    ctx.fillRect(380, 0, 6, canvas.height);
    
    const texture = new THREE.CanvasTexture(canvas);
    
    return new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      opacity: 0.85,
      side: THREE.DoubleSide,
    });
  }, [planetId]);

  const atmosphereMaterial = useMemo(() => {
    if (!config.hasAtmosphere) return null;
    return new THREE.MeshBasicMaterial({
      color: config.atmosphereColor,
      transparent: true,
      opacity: 0.15,
      side: THREE.BackSide,
    });
  }, [config]);

  return (
    <group>
      {/* Main planet */}
      <Sphere ref={meshRef} args={[1.5, 64, 64]}>
        <primitive object={planetMaterial} attach="material" />
      </Sphere>
      
      {/* Atmosphere glow */}
      {config.hasAtmosphere && atmosphereMaterial && (
        <Sphere ref={atmosphereRef} args={[1.65, 32, 32]}>
          <primitive object={atmosphereMaterial} attach="material" />
        </Sphere>
      )}
      
      {/* Rings */}
      {hasRings && (
        <mesh ref={ringsRef} rotation={[Math.PI / 2.2, 0, 0.1]}>
          <primitive object={ringGeometry} attach="geometry" />
          <primitive object={ringMaterial} attach="material" />
        </mesh>
      )}
      
      {/* Moons */}
      {moons.map((moon, index) => (
        <Moon 
          key={moon.name} 
          config={moon} 
          initialAngle={(index / moons.length) * Math.PI * 2} 
        />
      ))}
      
      {/* Lighting */}
      <pointLight position={[10, 5, 10]} intensity={1.8} color="#fff5e0" />
      <pointLight position={[-5, -5, -5]} intensity={0.3} color="#4169e1" />
    </group>
  );
};

interface Planet3DProps {
  color: string;
  planetId: string;
}

const Planet3D = ({ color, planetId }: Planet3DProps) => {
  const hasRings = planetId === "saturn" || planetId === "uranus";
  const isEarth = planetId === "earth";
  const moons = planetMoons[planetId] || [];

  return (
    <div className="w-full h-[300px] md:h-[400px]">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <ambientLight intensity={0.4} />
        
        {isEarth ? (
          <group>
            <EarthMesh />
            {moons.map((moon, index) => (
              <Moon 
                key={moon.name} 
                config={moon} 
                initialAngle={(index / moons.length) * Math.PI * 2} 
              />
            ))}
            <pointLight position={[10, 5, 10]} intensity={1.8} color="#fff5e0" />
            <pointLight position={[-5, -5, -5]} intensity={0.3} color="#4169e1" />
          </group>
        ) : (
          <PlanetMesh planetId={planetId} hasRings={hasRings} />
        )}
        
        <OrbitControls 
          enableZoom={true} 
          enablePan={false}
          minDistance={3}
          maxDistance={10}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
};

export default Planet3D;
