import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere } from "@react-three/drei";
import * as THREE from "three";

interface PlanetMeshProps {
  color: string;
  hasRings?: boolean;
}

const PlanetMesh = ({ color, hasRings = false }: PlanetMeshProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringsRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;
    }
    if (ringsRef.current) {
      ringsRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.1) * 0.02;
    }
  });

  const planetMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: color,
      metalness: 0.1,
      roughness: 0.8,
    });
  }, [color]);

  const ringGeometry = useMemo(() => {
    return new THREE.RingGeometry(2.2, 3.5, 64);
  }, []);

  const ringMaterial = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: "#e6b84a",
      transparent: true,
      opacity: 0.6,
      side: THREE.DoubleSide,
    });
  }, []);

  return (
    <group>
      <Sphere ref={meshRef} args={[1.5, 64, 64]}>
        <primitive object={planetMaterial} attach="material" />
      </Sphere>
      {hasRings && (
        <mesh ref={ringsRef} rotation={[Math.PI / 2.5, 0, 0]}>
          <primitive object={ringGeometry} attach="geometry" />
          <primitive object={ringMaterial} attach="material" />
        </mesh>
      )}
      <pointLight position={[10, 10, 10]} intensity={1.5} />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#4169e1" />
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
        <ambientLight intensity={0.3} />
        <PlanetMesh color={color} hasRings={hasRings} />
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
