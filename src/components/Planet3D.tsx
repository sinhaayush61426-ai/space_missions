import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere } from "@react-three/drei";
import * as THREE from "three";

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

interface PlanetMeshProps {
  planetId: string;
  hasRings?: boolean;
}

const PlanetMesh = ({ planetId, hasRings = false }: PlanetMeshProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringsRef = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);

  const config = planetConfigs[planetId] || planetConfigs.earth;

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
        // Add some noise/variation
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
    
    // For rocky/icy planets, create a gradient-like appearance
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 256;
    const ctx = canvas.getContext('2d')!;
    
    // Base gradient
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, config.baseColor);
    gradient.addColorStop(0.5, config.secondaryColor || config.baseColor);
    gradient.addColorStop(1, config.baseColor);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Add surface detail noise
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
    
    // Add polar caps for Mars
    if (planetId === 'mars') {
      ctx.fillStyle = 'rgba(255,255,255,0.7)';
      ctx.beginPath();
      ctx.ellipse(256, 10, 80, 15, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(256, 246, 60, 12, 0, 0, Math.PI * 2);
      ctx.fill();
    }
    
    // Add ice patterns for Uranus/Neptune
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

  // Ring geometry and material for Saturn/Uranus
  const ringGeometry = useMemo(() => {
    return new THREE.RingGeometry(2.0, 3.2, 128);
  }, []);

  const ringMaterial = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 64;
    const ctx = canvas.getContext('2d')!;
    
    // Create ringed texture
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
    
    // Add gaps
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

  // Atmosphere material
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

  return (
    <div className="w-full h-[300px] md:h-[400px]">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.4} />
        <PlanetMesh planetId={planetId} hasRings={hasRings} />
        <OrbitControls 
          enableZoom={true} 
          enablePan={false}
          minDistance={3}
          maxDistance={8}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
};

export default Planet3D;
