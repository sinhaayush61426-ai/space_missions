import { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { X, ZoomIn, ZoomOut, RotateCcw, Info } from "lucide-react";

interface Planet {
  id: string;
  name: string;
  orbitRadius: number;
  size: number;
  color: string;
  orbitSpeed: number;
  angle: number;
  gradientColors?: string[];
  hasRings?: boolean;
  ringColor?: string;
}

interface DwarfPlanet {
  id: string;
  name: string;
  orbitRadius: number;
  size: number;
  color: string;
  orbitSpeed: number;
  angle: number;
  region: "asteroid-belt" | "kuiper-belt";
  description: string;
  discoveredYear: number;
}

interface MajorAsteroid {
  id: string;
  name: string;
  size: number;
  color: string;
  angleOffset: number;
  radiusOffset: number;
  description: string;
  diameter: string;
  discoveredYear: number;
}

interface Spacecraft {
  id: string;
  name: string;
  type: "orbiter" | "flyby" | "active";
  targetPlanet?: string;
  currentPosition: { x: number; y: number };
  trajectory: { x: number; y: number }[];
  color: string;
  launchYear: number;
  status: string;
}

const planets: Planet[] = [
  { 
    id: "mercury", name: "Mercury", orbitRadius: 60, size: 6, color: "#B5B5B5", orbitSpeed: 0.004, angle: 0,
    gradientColors: ["#D4D4D4", "#B5B5B5", "#8A8A8A", "#5C5C5C"]
  },
  { 
    id: "venus", name: "Venus", orbitRadius: 90, size: 10, color: "#E6C77A", orbitSpeed: 0.003, angle: 45,
    gradientColors: ["#F5E6B8", "#E6C77A", "#D4A84B", "#C49332"]
  },
  { 
    id: "earth", name: "Earth", orbitRadius: 120, size: 12, color: "#6B93D6", orbitSpeed: 0.002, angle: 90,
    gradientColors: ["#8FB5E6", "#6B93D6", "#4A7AC7", "#3D6BA8"]
  },
  { 
    id: "mars", name: "Mars", orbitRadius: 160, size: 8, color: "#C1440E", orbitSpeed: 0.0015, angle: 135,
    gradientColors: ["#E85D3A", "#C1440E", "#A83708", "#8B2D06"]
  },
  { 
    id: "jupiter", name: "Jupiter", orbitRadius: 220, size: 28, color: "#D4A574", orbitSpeed: 0.0008, angle: 180,
    gradientColors: ["#E8C9A0", "#D4A574", "#C9945E", "#B87D4A", "#A86B3D"]
  },
  { 
    id: "saturn", name: "Saturn", orbitRadius: 290, size: 24, color: "#F4D59E", orbitSpeed: 0.0006, angle: 225,
    gradientColors: ["#FAEAC9", "#F4D59E", "#E8C47D", "#D4A85C"],
    hasRings: true,
    ringColor: "#C9B896"
  },
  { 
    id: "uranus", name: "Uranus", orbitRadius: 360, size: 16, color: "#93CCEA", orbitSpeed: 0.0004, angle: 270,
    gradientColors: ["#B8E4F5", "#93CCEA", "#6BB8D9", "#4AA8C9"],
    hasRings: true,
    ringColor: "#7AC4DE"
  },
  { 
    id: "neptune", name: "Neptune", orbitRadius: 420, size: 14, color: "#5B7FDE", orbitSpeed: 0.0003, angle: 315,
    gradientColors: ["#8BA5EE", "#5B7FDE", "#4A6BC9", "#3A58B4"]
  },
];

const dwarfPlanets: DwarfPlanet[] = [
  {
    id: "ceres",
    name: "Ceres",
    orbitRadius: 190,
    size: 4,
    color: "#A8A8A8",
    orbitSpeed: 0.0012,
    angle: 60,
    region: "asteroid-belt",
    description: "Largest object in the asteroid belt",
    discoveredYear: 1801
  },
  {
    id: "pluto",
    name: "Pluto",
    orbitRadius: 480,
    size: 5,
    color: "#E8D4B8",
    orbitSpeed: 0.00015,
    angle: 200,
    region: "kuiper-belt",
    description: "Largest known dwarf planet in the Kuiper Belt",
    discoveredYear: 1930
  },
  {
    id: "eris",
    name: "Eris",
    orbitRadius: 560,
    size: 4.5,
    color: "#F0E6D6",
    orbitSpeed: 0.0001,
    angle: 320,
    region: "kuiper-belt",
    description: "Most massive known dwarf planet",
    discoveredYear: 2005
  },
  {
    id: "makemake",
    name: "Makemake",
    orbitRadius: 520,
    size: 4,
    color: "#E8C9A8",
    orbitSpeed: 0.00012,
    angle: 80,
    region: "kuiper-belt",
    description: "Third-largest dwarf planet in the Kuiper Belt",
    discoveredYear: 2005
  },
  {
    id: "haumea",
    name: "Haumea",
    orbitRadius: 500,
    size: 3.5,
    color: "#FFFFFF",
    orbitSpeed: 0.00013,
    angle: 150,
    region: "kuiper-belt",
    description: "Elongated dwarf planet with two moons",
    discoveredYear: 2004
  }
];

const majorAsteroids: MajorAsteroid[] = [
  {
    id: "vesta",
    name: "Vesta",
    size: 3,
    color: "#C4B8A8",
    angleOffset: 0.5,
    radiusOffset: 0.3,
    description: "Second-largest asteroid, visited by Dawn spacecraft",
    diameter: "525 km",
    discoveredYear: 1807
  },
  {
    id: "pallas",
    name: "Pallas",
    size: 2.8,
    color: "#B8B0A0",
    angleOffset: 2.1,
    radiusOffset: 0.7,
    description: "Third-largest asteroid with highly inclined orbit",
    diameter: "512 km",
    discoveredYear: 1802
  },
  {
    id: "hygiea",
    name: "Hygiea",
    size: 2.5,
    color: "#A09890",
    angleOffset: 3.8,
    radiusOffset: 0.5,
    description: "Fourth-largest asteroid, nearly spherical",
    diameter: "434 km",
    discoveredYear: 1849
  }
];

const generateTrajectory = (
  startAngle: number,
  startRadius: number,
  endRadius: number,
  curveIntensity: number = 0.5
): { x: number; y: number }[] => {
  const points: { x: number; y: number }[] = [];
  const steps = 50;
  
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const radius = startRadius + (endRadius - startRadius) * t;
    const angle = startAngle + (curveIntensity * Math.PI * t);
    points.push({
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
    });
  }
  
  return points;
};

const initialSpacecraft: Spacecraft[] = [
  {
    id: "voyager1",
    name: "Voyager 1",
    type: "flyby",
    currentPosition: { x: 480, y: -120 },
    trajectory: generateTrajectory(Math.PI * 0.8, 120, 500, 0.8),
    color: "#FFD700",
    launchYear: 1977,
    status: "Interstellar Space",
  },
  {
    id: "voyager2",
    name: "Voyager 2",
    type: "flyby",
    currentPosition: { x: -400, y: 320 },
    trajectory: generateTrajectory(Math.PI * 1.5, 120, 520, 1.2),
    color: "#FFA500",
    launchYear: 1977,
    status: "Interstellar Space",
  },
  {
    id: "newhorizons",
    name: "New Horizons",
    type: "flyby",
    currentPosition: { x: 380, y: 280 },
    trajectory: generateTrajectory(Math.PI * 0.3, 120, 480, 0.6),
    color: "#00CED1",
    launchYear: 2006,
    status: "Kuiper Belt",
  },
  {
    id: "juno",
    name: "Juno",
    type: "orbiter",
    targetPlanet: "jupiter",
    currentPosition: { x: 0, y: 0 },
    trajectory: generateTrajectory(Math.PI * 0.5, 120, 220, 0.4),
    color: "#FF6B6B",
    launchYear: 2011,
    status: "Jupiter Orbit",
  },
  {
    id: "perseverance",
    name: "Perseverance",
    type: "active",
    targetPlanet: "mars",
    currentPosition: { x: 0, y: 0 },
    trajectory: generateTrajectory(Math.PI * 0.7, 120, 160, 0.2),
    color: "#E74C3C",
    launchYear: 2020,
    status: "Mars Surface",
  },
  {
    id: "cassini",
    name: "Cassini (Historical)",
    type: "orbiter",
    targetPlanet: "saturn",
    currentPosition: { x: 0, y: 0 },
    trajectory: generateTrajectory(Math.PI * 1.1, 120, 290, 0.7),
    color: "#9B59B6",
    launchYear: 1997,
    status: "Mission Ended 2017",
  },
];

interface SolarSystemMapProps {
  isFullscreen?: boolean;
  onClose?: () => void;
}

const SolarSystemMap = ({ isFullscreen = true, onClose }: SolarSystemMapProps) => {
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  
  const [zoom, setZoom] = useState(0.8);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [hoveredItem, setHoveredItem] = useState<{ 
    type: "planet" | "spacecraft" | "dwarf" | "asteroid-belt"; 
    data: Planet | Spacecraft | DwarfPlanet | null;
  } | null>(null);
  const [planetAngles, setPlanetAngles] = useState<Record<string, number>>({});
  const [dwarfAngles, setDwarfAngles] = useState<Record<string, number>>({});
  const [showTrajectories, setShowTrajectories] = useState(true);
  const [showAsteroidInfo, setShowAsteroidInfo] = useState(false);

  // Initialize planet angles
  useEffect(() => {
    const angles: Record<string, number> = {};
    planets.forEach((p) => {
      angles[p.id] = (p.angle * Math.PI) / 180;
    });
    setPlanetAngles(angles);
    
    const dAngles: Record<string, number> = {};
    dwarfPlanets.forEach((d) => {
      dAngles[d.id] = (d.angle * Math.PI) / 180;
    });
    setDwarfAngles(dAngles);
  }, []);

  const getPlanetPosition = useCallback((planet: Planet) => {
    const angle = planetAngles[planet.id] || 0;
    return {
      x: Math.cos(angle) * planet.orbitRadius,
      y: Math.sin(angle) * planet.orbitRadius,
    };
  }, [planetAngles]);

  const getDwarfPosition = useCallback((dwarf: DwarfPlanet) => {
    const angle = dwarfAngles[dwarf.id] || 0;
    return {
      x: Math.cos(angle) * dwarf.orbitRadius,
      y: Math.sin(angle) * dwarf.orbitRadius,
    };
  }, [dwarfAngles]);

  const getSpacecraftPosition = useCallback((spacecraft: Spacecraft) => {
    if (spacecraft.targetPlanet) {
      const planet = planets.find((p) => p.id === spacecraft.targetPlanet);
      if (planet) {
        const planetPos = getPlanetPosition(planet);
        return { x: planetPos.x + 15, y: planetPos.y - 15 };
      }
    }
    return spacecraft.currentPosition;
  }, [getPlanetPosition]);

  // Animation loop
  useEffect(() => {
    const animate = () => {
      setPlanetAngles((prev) => {
        const newAngles = { ...prev };
        planets.forEach((planet) => {
          newAngles[planet.id] = (prev[planet.id] || 0) + planet.orbitSpeed;
        });
        return newAngles;
      });
      setDwarfAngles((prev) => {
        const newAngles = { ...prev };
        dwarfPlanets.forEach((dwarf) => {
          newAngles[dwarf.id] = (prev[dwarf.id] || 0) + dwarf.orbitSpeed;
        });
        return newAngles;
      });
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // Canvas rendering
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = container.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    const centerX = rect.width / 2 + offset.x;
    const centerY = rect.height / 2 + offset.y;

    // Clear canvas with deep space gradient
    const spaceGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, Math.max(rect.width, rect.height));
    spaceGradient.addColorStop(0, "#0a0a15");
    spaceGradient.addColorStop(0.3, "#050510");
    spaceGradient.addColorStop(1, "#020208");
    ctx.fillStyle = spaceGradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw distant stars with varying brightness
    for (let i = 0; i < 300; i++) {
      const x = (Math.sin(i * 12345.6789) * 0.5 + 0.5) * canvas.width;
      const y = (Math.cos(i * 98765.4321) * 0.5 + 0.5) * canvas.height;
      const size = (Math.sin(i * 1234) * 0.5 + 0.5) * 1.5 + 0.3;
      const brightness = 0.3 + (Math.cos(i * 5678) * 0.5 + 0.5) * 0.7;
      
      // Star color variation
      const colorIndex = i % 5;
      let starColor = `rgba(255, 255, 255, ${brightness})`;
      if (colorIndex === 0) starColor = `rgba(255, 240, 220, ${brightness})`; // warm
      if (colorIndex === 1) starColor = `rgba(220, 240, 255, ${brightness})`; // cool
      if (colorIndex === 2) starColor = `rgba(255, 255, 220, ${brightness})`; // yellow
      
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fillStyle = starColor;
      ctx.fill();
      
      // Add twinkle effect to some stars
      if (i % 7 === 0) {
        const time = Date.now() * 0.001;
        const twinkle = 0.5 + Math.sin(time + i) * 0.5;
        ctx.beginPath();
        ctx.arc(x, y, size * 1.5 * twinkle, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${brightness * 0.3 * twinkle})`;
        ctx.fill();
      }
    }

    // Draw orbits with gradient effect
    planets.forEach((planet) => {
      const gradient = ctx.createRadialGradient(centerX, centerY, (planet.orbitRadius - 2) * zoom, centerX, centerY, (planet.orbitRadius + 2) * zoom);
      gradient.addColorStop(0, "rgba(255, 255, 255, 0)");
      gradient.addColorStop(0.5, "rgba(255, 255, 255, 0.08)");
      gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
      
      ctx.beginPath();
      ctx.arc(centerX, centerY, planet.orbitRadius * zoom, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
      ctx.lineWidth = 1;
      ctx.stroke();
    });

    // Draw Oort Cloud (outermost region - very distant)
    const oortCloudInnerRadius = 700;
    const oortCloudOuterRadius = 900;
    const oortObjectCount = 500;
    
    // Oort Cloud subtle outer glow
    const oortGlow = ctx.createRadialGradient(
      centerX, centerY, oortCloudInnerRadius * zoom,
      centerX, centerY, oortCloudOuterRadius * zoom
    );
    oortGlow.addColorStop(0, "rgba(80, 100, 140, 0)");
    oortGlow.addColorStop(0.2, "rgba(80, 100, 140, 0.015)");
    oortGlow.addColorStop(0.5, "rgba(60, 80, 120, 0.02)");
    oortGlow.addColorStop(0.8, "rgba(60, 80, 120, 0.015)");
    oortGlow.addColorStop(1, "rgba(40, 60, 100, 0)");
    
    ctx.beginPath();
    ctx.arc(centerX, centerY, oortCloudOuterRadius * zoom, 0, Math.PI * 2);
    ctx.fillStyle = oortGlow;
    ctx.fill();
    
    // Oort Cloud boundary hints
    ctx.beginPath();
    ctx.arc(centerX, centerY, oortCloudInnerRadius * zoom, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(100, 130, 180, 0.06)";
    ctx.lineWidth = 1;
    ctx.setLineDash([2, 10]);
    ctx.stroke();
    ctx.setLineDash([]);
    
    // Draw Oort Cloud objects (very distant, faint icy bodies)
    for (let i = 0; i < oortObjectCount; i++) {
      const seed = i * 7654.32109;
      const randomAngle = (Math.sin(seed) * 0.5 + 0.5) * Math.PI * 2;
      // More objects toward edges (shell-like distribution)
      const shellFactor = Math.pow(Math.cos(seed * 2) * 0.5 + 0.5, 0.3);
      const randomRadius = oortCloudInnerRadius + shellFactor * (oortCloudOuterRadius - oortCloudInnerRadius);
      const randomSize = 0.2 + (Math.sin(seed * 3) * 0.5 + 0.5) * 0.8;
      const randomBrightness = 0.1 + (Math.cos(seed * 4) * 0.5 + 0.5) * 0.25;
      
      // Very slow drift animation
      const oortAngle = randomAngle + (planetAngles["neptune"] || 0) * 0.02;
      const oortX = centerX + Math.cos(oortAngle) * randomRadius * zoom;
      const oortY = centerY + Math.sin(oortAngle) * randomRadius * zoom;
      
      // Very pale icy blue-white colors
      const iceColors = ["rgba(160, 180, 220,", "rgba(140, 160, 200,", "rgba(180, 190, 210,", "rgba(120, 140, 180,"];
      const colorChoice = iceColors[i % 4];
      
      ctx.beginPath();
      ctx.arc(oortX, oortY, randomSize * zoom, 0, Math.PI * 2);
      ctx.fillStyle = `${colorChoice} ${randomBrightness})`;
      ctx.fill();
      
      // Occasional larger, brighter objects (potential long-period comets)
      if (i % 50 === 0) {
        const cometSize = randomSize * 2;
        const cometGlow = ctx.createRadialGradient(oortX, oortY, 0, oortX, oortY, cometSize * 3 * zoom);
        cometGlow.addColorStop(0, "rgba(200, 220, 255, 0.3)");
        cometGlow.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.arc(oortX, oortY, cometSize * 3 * zoom, 0, Math.PI * 2);
        ctx.fillStyle = cometGlow;
        ctx.fill();
        
        ctx.beginPath();
        ctx.arc(oortX, oortY, cometSize * zoom, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(220, 235, 255, 0.5)";
        ctx.fill();
      }
    }

    // Draw Kuiper Belt (beyond Neptune)
    const kuiperBeltInnerRadius = 450;
    const kuiperBeltOuterRadius = 600;
    const kuiperObjectCount = 400;
    
    // Kuiper Belt glow
    const kuiperGlow = ctx.createRadialGradient(
      centerX, centerY, kuiperBeltInnerRadius * zoom,
      centerX, centerY, kuiperBeltOuterRadius * zoom
    );
    kuiperGlow.addColorStop(0, "rgba(100, 150, 200, 0)");
    kuiperGlow.addColorStop(0.3, "rgba(100, 150, 200, 0.03)");
    kuiperGlow.addColorStop(0.7, "rgba(100, 150, 200, 0.02)");
    kuiperGlow.addColorStop(1, "rgba(100, 150, 200, 0)");
    
    ctx.beginPath();
    ctx.arc(centerX, centerY, kuiperBeltOuterRadius * zoom, 0, Math.PI * 2);
    ctx.fillStyle = kuiperGlow;
    ctx.fill();
    
    for (let i = 0; i < kuiperObjectCount; i++) {
      const seed = i * 5432.12345;
      const randomAngle = (Math.sin(seed) * 0.5 + 0.5) * Math.PI * 2;
      const randomRadius = kuiperBeltInnerRadius + (Math.cos(seed * 2) * 0.5 + 0.5) * (kuiperBeltOuterRadius - kuiperBeltInnerRadius);
      const randomSize = 0.3 + (Math.sin(seed * 3) * 0.5 + 0.5) * 1.2;
      const randomBrightness = 0.2 + (Math.cos(seed * 4) * 0.5 + 0.5) * 0.4;
      
      const kuiperAngle = randomAngle + (planetAngles["neptune"] || 0) * 0.1;
      const kuiperX = centerX + Math.cos(kuiperAngle) * randomRadius * zoom;
      const kuiperY = centerY + Math.sin(kuiperAngle) * randomRadius * zoom;
      
      // Icy blue-white colors for Kuiper Belt objects
      const iceColors = ["rgba(200, 220, 255,", "rgba(180, 200, 240,", "rgba(220, 230, 255,"];
      const colorChoice = iceColors[i % 3];
      
      ctx.beginPath();
      ctx.arc(kuiperX, kuiperY, randomSize * zoom, 0, Math.PI * 2);
      ctx.fillStyle = `${colorChoice} ${randomBrightness})`;
      ctx.fill();
    }

    // Draw asteroid belt between Mars and Jupiter
    const asteroidBeltInnerRadius = 175;
    const asteroidBeltOuterRadius = 205;
    const asteroidCount = 350;
    
    // Asteroid belt glow
    const beltGlow = ctx.createRadialGradient(
      centerX, centerY, asteroidBeltInnerRadius * zoom,
      centerX, centerY, asteroidBeltOuterRadius * zoom
    );
    beltGlow.addColorStop(0, "rgba(180, 160, 140, 0)");
    beltGlow.addColorStop(0.5, "rgba(180, 160, 140, 0.05)");
    beltGlow.addColorStop(1, "rgba(180, 160, 140, 0)");
    
    ctx.beginPath();
    ctx.arc(centerX, centerY, (asteroidBeltInnerRadius + asteroidBeltOuterRadius) / 2 * zoom, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(180, 160, 140, 0.08)";
    ctx.lineWidth = (asteroidBeltOuterRadius - asteroidBeltInnerRadius) * zoom;
    ctx.stroke();
    
    for (let i = 0; i < asteroidCount; i++) {
      const seed = i * 9876.54321;
      const randomAngle = (Math.sin(seed) * 0.5 + 0.5) * Math.PI * 2;
      const randomRadius = asteroidBeltInnerRadius + (Math.cos(seed * 2) * 0.5 + 0.5) * (asteroidBeltOuterRadius - asteroidBeltInnerRadius);
      const randomSize = 0.4 + (Math.sin(seed * 3) * 0.5 + 0.5) * 1.8;
      const randomBrightness = 0.25 + (Math.cos(seed * 4) * 0.5 + 0.5) * 0.55;
      
      const asteroidAngle = randomAngle + (planetAngles["mars"] || 0) * 0.3;
      const asteroidX = centerX + Math.cos(asteroidAngle) * randomRadius * zoom;
      const asteroidY = centerY + Math.sin(asteroidAngle) * randomRadius * zoom;
      
      // Rocky brownish colors
      const rockColors = ["rgba(180, 160, 140,", "rgba(160, 140, 120,", "rgba(200, 180, 160,"];
      const colorChoice = rockColors[i % 3];
      
      ctx.beginPath();
      ctx.arc(asteroidX, asteroidY, randomSize * zoom, 0, Math.PI * 2);
      ctx.fillStyle = `${colorChoice} ${randomBrightness})`;
      ctx.fill();
    }
    
    // Draw major asteroids
    majorAsteroids.forEach((asteroid) => {
      const baseAngle = (planetAngles["mars"] || 0) * 0.3 + asteroid.angleOffset;
      const radius = asteroidBeltInnerRadius + (asteroidBeltOuterRadius - asteroidBeltInnerRadius) * asteroid.radiusOffset;
      const x = centerX + Math.cos(baseAngle) * radius * zoom;
      const y = centerY + Math.sin(baseAngle) * radius * zoom;
      const size = asteroid.size * zoom;
      
      // Glow
      const glow = ctx.createRadialGradient(x, y, 0, x, y, size * 3);
      glow.addColorStop(0, asteroid.color + "60");
      glow.addColorStop(1, "transparent");
      ctx.beginPath();
      ctx.arc(x, y, size * 3, 0, Math.PI * 2);
      ctx.fillStyle = glow;
      ctx.fill();
      
      // Body
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fillStyle = asteroid.color;
      ctx.fill();
      
      // Label
      ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
      ctx.font = `${8 * zoom}px 'Space Grotesk', sans-serif`;
      ctx.textAlign = "center";
      ctx.fillText(asteroid.name, x, y + size + 10 * zoom);
    });

    // Draw spacecraft trajectories
    if (showTrajectories) {
      initialSpacecraft.forEach((spacecraft) => {
        if (spacecraft.trajectory.length > 1) {
          ctx.beginPath();
          ctx.moveTo(
            centerX + spacecraft.trajectory[0].x * zoom,
            centerY + spacecraft.trajectory[0].y * zoom
          );
          
          spacecraft.trajectory.forEach((point, i) => {
            if (i > 0) {
              ctx.lineTo(centerX + point.x * zoom, centerY + point.y * zoom);
            }
          });
          
          ctx.strokeStyle = spacecraft.color + "60";
          ctx.lineWidth = 2;
          ctx.setLineDash([5, 5]);
          ctx.stroke();
          ctx.setLineDash([]);
        }
      });
    }

    // Draw Sun with enhanced visuals
    const sunGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 25 * zoom);
    sunGradient.addColorStop(0, "#FFFFFF");
    sunGradient.addColorStop(0.2, "#FFF5E0");
    sunGradient.addColorStop(0.5, "#FDB813");
    sunGradient.addColorStop(0.8, "#F97306");
    sunGradient.addColorStop(1, "#E85D04");
    ctx.beginPath();
    ctx.arc(centerX, centerY, 20 * zoom, 0, Math.PI * 2);
    ctx.fillStyle = sunGradient;
    ctx.fill();

    // Sun corona layers
    for (let i = 3; i >= 1; i--) {
      const coronaGradient = ctx.createRadialGradient(centerX, centerY, 15 * zoom, centerX, centerY, (25 + i * 15) * zoom);
      coronaGradient.addColorStop(0, `rgba(255, 200, 100, ${0.15 / i})`);
      coronaGradient.addColorStop(1, "rgba(255, 150, 50, 0)");
      ctx.beginPath();
      ctx.arc(centerX, centerY, (25 + i * 15) * zoom, 0, Math.PI * 2);
      ctx.fillStyle = coronaGradient;
      ctx.fill();
    }

    // Draw dwarf planets
    dwarfPlanets.forEach((dwarf) => {
      const pos = getDwarfPosition(dwarf);
      const x = centerX + pos.x * zoom;
      const y = centerY + pos.y * zoom;
      const size = dwarf.size * zoom * 0.5;
      
      // Dwarf planet orbit (faint)
      ctx.beginPath();
      ctx.arc(centerX, centerY, dwarf.orbitRadius * zoom, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(255, 255, 255, 0.03)";
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 8]);
      ctx.stroke();
      ctx.setLineDash([]);
      
      // Glow
      const dwarfGlow = ctx.createRadialGradient(x, y, 0, x, y, size * 2.5);
      dwarfGlow.addColorStop(0, dwarf.color + "50");
      dwarfGlow.addColorStop(1, "transparent");
      ctx.beginPath();
      ctx.arc(x, y, size * 2.5, 0, Math.PI * 2);
      ctx.fillStyle = dwarfGlow;
      ctx.fill();
      
      // Body with gradient
      const bodyGradient = ctx.createRadialGradient(x - size * 0.3, y - size * 0.3, 0, x, y, size);
      bodyGradient.addColorStop(0, "#FFFFFF");
      bodyGradient.addColorStop(0.3, dwarf.color);
      bodyGradient.addColorStop(1, dwarf.color.replace(/[^,]+(?=\))/, "0.7"));
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fillStyle = bodyGradient;
      ctx.fill();
      
      // Diamond marker for dwarf planets
      ctx.beginPath();
      ctx.moveTo(x, y - size - 6 * zoom);
      ctx.lineTo(x + 4 * zoom, y - size - 10 * zoom);
      ctx.lineTo(x, y - size - 14 * zoom);
      ctx.lineTo(x - 4 * zoom, y - size - 10 * zoom);
      ctx.closePath();
      ctx.fillStyle = dwarf.color;
      ctx.fill();
      
      // Label
      ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
      ctx.font = `${9 * zoom}px 'Space Grotesk', sans-serif`;
      ctx.textAlign = "center";
      ctx.fillText(dwarf.name, x, y + size + 12 * zoom);
    });

    // Draw planets with enhanced visuals
    planets.forEach((planet) => {
      const pos = getPlanetPosition(planet);
      const x = centerX + pos.x * zoom;
      const y = centerY + pos.y * zoom;
      const size = planet.size * zoom * 0.5;

      // Planet atmosphere glow
      const atmosphereGlow = ctx.createRadialGradient(x, y, size * 0.8, x, y, size * 2.5);
      atmosphereGlow.addColorStop(0, planet.color + "30");
      atmosphereGlow.addColorStop(0.5, planet.color + "15");
      atmosphereGlow.addColorStop(1, "transparent");
      ctx.beginPath();
      ctx.arc(x, y, size * 2.5, 0, Math.PI * 2);
      ctx.fillStyle = atmosphereGlow;
      ctx.fill();

      // Planet rings (Saturn, Uranus)
      if (planet.hasRings) {
        ctx.save();
        ctx.translate(x, y);
        if (planet.id === "uranus") {
          ctx.rotate(Math.PI / 2);
        }
        
        // Multiple ring layers
        for (let r = 0; r < 3; r++) {
          const ringGradient = ctx.createLinearGradient(-size * 2, 0, size * 2, 0);
          ringGradient.addColorStop(0, "transparent");
          ringGradient.addColorStop(0.2, planet.ringColor + "60");
          ringGradient.addColorStop(0.5, planet.ringColor + "90");
          ringGradient.addColorStop(0.8, planet.ringColor + "60");
          ringGradient.addColorStop(1, "transparent");
          
          ctx.beginPath();
          ctx.ellipse(0, 0, size * (1.6 + r * 0.2), size * (0.3 + r * 0.05), 0, 0, Math.PI * 2);
          ctx.strokeStyle = ringGradient;
          ctx.lineWidth = 2;
          ctx.stroke();
        }
        ctx.restore();
      }

      // Planet body with 3D gradient
      const planetGradient = ctx.createRadialGradient(
        x - size * 0.3, y - size * 0.3, 0,
        x, y, size
      );
      
      if (planet.gradientColors) {
        const colors = planet.gradientColors;
        colors.forEach((color, i) => {
          planetGradient.addColorStop(i / (colors.length - 1), color);
        });
      } else {
        planetGradient.addColorStop(0, "#FFFFFF");
        planetGradient.addColorStop(0.3, planet.color);
        planetGradient.addColorStop(1, planet.color);
      }
      
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fillStyle = planetGradient;
      ctx.fill();
      
      // Add surface detail for gas giants
      if (planet.id === "jupiter") {
        // Jupiter bands
        ctx.save();
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.clip();
        
        for (let band = -4; band <= 4; band++) {
          const bandY = y + band * size * 0.2;
          ctx.beginPath();
          ctx.moveTo(x - size, bandY);
          ctx.lineTo(x + size, bandY);
          ctx.strokeStyle = band % 2 === 0 ? "rgba(180, 120, 80, 0.3)" : "rgba(220, 180, 140, 0.2)";
          ctx.lineWidth = size * 0.15;
          ctx.stroke();
        }
        
        // Great Red Spot
        ctx.beginPath();
        ctx.ellipse(x + size * 0.3, y + size * 0.2, size * 0.25, size * 0.15, 0, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(200, 80, 60, 0.5)";
        ctx.fill();
        ctx.restore();
      }
      
      // Highlight
      const highlight = ctx.createRadialGradient(
        x - size * 0.4, y - size * 0.4, 0,
        x - size * 0.4, y - size * 0.4, size * 0.6
      );
      highlight.addColorStop(0, "rgba(255, 255, 255, 0.4)");
      highlight.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fillStyle = highlight;
      ctx.fill();

      // Planet label
      ctx.fillStyle = "#ffffff";
      ctx.font = `${10 * zoom}px 'Space Grotesk', sans-serif`;
      ctx.textAlign = "center";
      ctx.fillText(planet.name, x, y + size + 15 * zoom);
    });

    // Draw spacecraft
    initialSpacecraft.forEach((spacecraft) => {
      const pos = getSpacecraftPosition(spacecraft);
      const x = centerX + pos.x * zoom;
      const y = centerY + pos.y * zoom;

      // Spacecraft marker
      ctx.beginPath();
      ctx.moveTo(x, y - 6 * zoom);
      ctx.lineTo(x + 5 * zoom, y + 4 * zoom);
      ctx.lineTo(x - 5 * zoom, y + 4 * zoom);
      ctx.closePath();
      ctx.fillStyle = spacecraft.color;
      ctx.fill();

      // Spacecraft glow
      ctx.beginPath();
      ctx.arc(x, y, 8 * zoom, 0, Math.PI * 2);
      ctx.fillStyle = spacecraft.color + "30";
      ctx.fill();
    });

  }, [zoom, offset, planetAngles, dwarfAngles, showTrajectories, getPlanetPosition, getDwarfPosition, getSpacecraftPosition]);

  // Mouse handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - offset.x, y: e.clientY - offset.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setOffset({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }

    // Check for hover
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const rect = container.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const centerX = rect.width / 2 + offset.x;
    const centerY = rect.height / 2 + offset.y;

    let found = false;

    // Check planets
    for (const planet of planets) {
      const pos = getPlanetPosition(planet);
      const x = centerX + pos.x * zoom;
      const y = centerY + pos.y * zoom;
      const dist = Math.sqrt((mouseX - x) ** 2 + (mouseY - y) ** 2);
      
      if (dist < planet.size * zoom + 10) {
        setHoveredItem({ type: "planet", data: planet });
        found = true;
        break;
      }
    }

    // Check dwarf planets
    if (!found) {
      for (const dwarf of dwarfPlanets) {
        const pos = getDwarfPosition(dwarf);
        const x = centerX + pos.x * zoom;
        const y = centerY + pos.y * zoom;
        const dist = Math.sqrt((mouseX - x) ** 2 + (mouseY - y) ** 2);
        
        if (dist < dwarf.size * zoom + 10) {
          setHoveredItem({ type: "dwarf", data: dwarf });
          found = true;
          break;
        }
      }
    }
    
    // Check asteroid belt region
    if (!found) {
      const distFromCenter = Math.sqrt((mouseX - centerX) ** 2 + (mouseY - centerY) ** 2);
      const asteroidBeltInner = 175 * zoom;
      const asteroidBeltOuter = 205 * zoom;
      
      if (distFromCenter >= asteroidBeltInner && distFromCenter <= asteroidBeltOuter) {
        setHoveredItem({ type: "asteroid-belt", data: null });
        found = true;
      }
    }

    // Check spacecraft
    if (!found) {
      for (const spacecraft of initialSpacecraft) {
        const pos = getSpacecraftPosition(spacecraft);
        const x = centerX + pos.x * zoom;
        const y = centerY + pos.y * zoom;
        const dist = Math.sqrt((mouseX - x) ** 2 + (mouseY - y) ** 2);
        
        if (dist < 15 * zoom) {
          setHoveredItem({ type: "spacecraft", data: spacecraft });
          found = true;
          break;
        }
      }
    }

    if (!found) {
      setHoveredItem(null);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleClick = () => {
    if (hoveredItem?.type === "planet") {
      navigate(`/planet/${(hoveredItem.data as Planet).id}`);
    } else if (hoveredItem?.type === "asteroid-belt") {
      setShowAsteroidInfo(true);
    }
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const newZoom = Math.max(0.3, Math.min(3, zoom - e.deltaY * 0.001));
    setZoom(newZoom);
  };

  const resetView = () => {
    setZoom(0.8);
    setOffset({ x: 0, y: 0 });
  };

  // Touch event handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      setDragStart({
        x: e.touches[0].clientX - offset.x,
        y: e.touches[0].clientY - offset.y,
      });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging && e.touches.length === 1) {
      setOffset({
        x: e.touches[0].clientX - dragStart.x,
        y: e.touches[0].clientY - dragStart.y,
      });
    }
    
    // Pinch to zoom
    if (e.touches.length === 2) {
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const dist = Math.sqrt(
        Math.pow(touch2.clientX - touch1.clientX, 2) +
        Math.pow(touch2.clientY - touch1.clientY, 2)
      );
      
      if (!pinchStartRef.current) {
        pinchStartRef.current = { dist, zoom };
      } else {
        const scale = dist / pinchStartRef.current.dist;
        const newZoom = Math.max(0.3, Math.min(3, pinchStartRef.current.zoom * scale));
        setZoom(newZoom);
      }
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    pinchStartRef.current = null;
  };

  const pinchStartRef = useRef<{ dist: number; zoom: number } | null>(null);

  return (
    <div
      ref={containerRef}
      className={`${isFullscreen ? "fixed inset-0 z-50" : "relative w-full h-[400px] sm:h-[500px] md:h-[600px]"} bg-background`}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-grab active:cursor-grabbing touch-none"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onClick={handleClick}
        onWheel={handleWheel}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      />

      {/* Controls */}
      <div className="absolute top-2 sm:top-4 right-2 sm:right-4 flex flex-col gap-1.5 sm:gap-2">
        {isFullscreen && onClose && (
          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 rounded-lg bg-card/80 backdrop-blur-sm border border-border/50 text-foreground hover:bg-primary/20 hover:border-primary/50 transition-all"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        )}
        <button
          onClick={() => setZoom((z) => Math.min(3, z + 0.2))}
          className="p-1.5 sm:p-2 rounded-lg bg-card/80 backdrop-blur-sm border border-border/50 text-foreground hover:bg-primary/20 hover:border-primary/50 transition-all"
        >
          <ZoomIn className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
        <button
          onClick={() => setZoom((z) => Math.max(0.3, z - 0.2))}
          className="p-1.5 sm:p-2 rounded-lg bg-card/80 backdrop-blur-sm border border-border/50 text-foreground hover:bg-primary/20 hover:border-primary/50 transition-all"
        >
          <ZoomOut className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
        <button
          onClick={resetView}
          className="p-1.5 sm:p-2 rounded-lg bg-card/80 backdrop-blur-sm border border-border/50 text-foreground hover:bg-primary/20 hover:border-primary/50 transition-all"
        >
          <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>

      {/* Legend - hidden on small mobile, collapsible on tablet */}
      <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 p-2 sm:p-4 rounded-lg sm:rounded-xl bg-card/80 backdrop-blur-sm border border-border/50 max-w-[180px] sm:max-w-xs hidden sm:block">
        <div className="flex items-center gap-2 mb-2 sm:mb-3">
          <Info className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
          <span className="font-display font-semibold text-foreground text-xs sm:text-sm">Map Legend</span>
        </div>
        
        <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-primary" />
            <span className="text-muted-foreground">Planets (tap to view)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rotate-45 bg-[#E8D4B8]" />
            <span className="text-muted-foreground">Dwarf Planets</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-0 h-0 border-l-[4px] sm:border-l-[5px] border-r-[4px] sm:border-r-[5px] border-b-[6px] sm:border-b-[8px] border-l-transparent border-r-transparent border-b-primary" />
            <span className="text-muted-foreground">Spacecraft</span>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <div className="w-6 border-t-2 border-dashed border-muted-foreground" />
            <span className="text-muted-foreground">Trajectories</span>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <div className="flex gap-0.5">
              <div className="w-1 h-1 rounded-full bg-[#B4A08C]" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#B4A08C]/70" />
              <div className="w-1 h-1 rounded-full bg-[#B4A08C]/50" />
            </div>
            <span className="text-muted-foreground">Asteroid Belt (tap)</span>
          </div>
          <div className="hidden lg:flex items-center gap-2">
            <div className="flex gap-0.5">
              <div className="w-1 h-1 rounded-full bg-[#C8DCFF]" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#B4C8F0]/70" />
              <div className="w-1 h-1 rounded-full bg-[#DCE6FF]/50" />
            </div>
            <span className="text-muted-foreground">Kuiper Belt</span>
          </div>
          <div className="hidden lg:flex items-center gap-2">
            <div className="flex gap-0.5">
              <div className="w-0.5 h-0.5 rounded-full bg-[#A0B4DC]/40" />
              <div className="w-1 h-1 rounded-full bg-[#8CA0C8]/30" />
              <div className="w-0.5 h-0.5 rounded-full bg-[#B4BED2]/20" />
            </div>
            <span className="text-muted-foreground">Oort Cloud</span>
          </div>
        </div>

        <button
          onClick={() => setShowTrajectories(!showTrajectories)}
          className={`mt-2 sm:mt-3 w-full py-1 sm:py-1.5 px-2 sm:px-3 rounded-lg text-xs font-medium transition-all ${
            showTrajectories
              ? "bg-primary/20 text-primary border border-primary/50"
              : "bg-muted/50 text-muted-foreground border border-border/50"
          }`}
        >
          {showTrajectories ? "Hide" : "Show"} Trajectories
        </button>
      </div>

      {/* Spacecraft List - hide on mobile */}
      <div className="absolute top-12 sm:top-4 left-2 sm:left-4 p-2 sm:p-4 rounded-lg sm:rounded-xl bg-card/80 backdrop-blur-sm border border-border/50 max-w-[160px] sm:max-w-xs max-h-[200px] sm:max-h-[300px] overflow-y-auto hidden md:block">
        <h3 className="font-display font-semibold text-foreground text-xs sm:text-base mb-2 sm:mb-3">Active Missions</h3>
        <div className="space-y-1.5 sm:space-y-2">
          {initialSpacecraft.map((s) => (
            <div
              key={s.id}
              className="flex items-center gap-1.5 sm:gap-2 p-1.5 sm:p-2 rounded-lg hover:bg-muted/30 transition-colors"
            >
              <div
                className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full flex-shrink-0"
                style={{ backgroundColor: s.color }}
              />
              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm font-medium text-foreground truncate">{s.name}</p>
                <p className="text-[10px] sm:text-xs text-muted-foreground hidden sm:block">{s.status}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hover tooltip - positioned for mobile */}
      {hoveredItem && (
        <div className="absolute bottom-14 sm:bottom-4 right-2 sm:right-4 p-3 sm:p-4 rounded-lg sm:rounded-xl bg-card/90 backdrop-blur-sm border border-primary/30 min-w-[150px] sm:min-w-[200px]">
          {hoveredItem.type === "planet" ? (
            <>
              <h3 className="font-display font-bold text-base sm:text-lg text-foreground">
                {(hoveredItem.data as Planet).name}
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">Tap to view missions</p>
            </>
          ) : hoveredItem.type === "dwarf" ? (
            <>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rotate-45" style={{ backgroundColor: (hoveredItem.data as DwarfPlanet).color }} />
                <h3 className="font-display font-bold text-base sm:text-lg text-foreground">
                  {(hoveredItem.data as DwarfPlanet).name}
                </h3>
              </div>
              <p className="text-xs text-primary mt-1">Dwarf Planet</p>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1 line-clamp-2">
                {(hoveredItem.data as DwarfPlanet).description}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Discovered: {(hoveredItem.data as DwarfPlanet).discoveredYear}
              </p>
            </>
          ) : hoveredItem.type === "asteroid-belt" ? (
            <>
              <h3 className="font-display font-bold text-base sm:text-lg text-foreground">Asteroid Belt</h3>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">Tap for detailed info</p>
              <p className="text-xs text-primary mt-1">Between Mars & Jupiter</p>
            </>
          ) : (
            <>
              <h3 className="font-display font-bold text-base sm:text-lg text-foreground">
                {(hoveredItem.data as Spacecraft).name}
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Launched: {(hoveredItem.data as Spacecraft).launchYear}
              </p>
              <p className="text-xs sm:text-sm text-primary">
                {(hoveredItem.data as Spacecraft).status}
              </p>
            </>
          )}
        </div>
      )}

      {/* Asteroid Belt Info Popup */}
      {showAsteroidInfo && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-10 p-4">
          <div className="bg-card/95 backdrop-blur-md border border-border rounded-xl sm:rounded-2xl p-4 sm:p-6 max-w-md w-full max-h-[80vh] overflow-y-auto animate-scale-in">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <h2 className="font-display text-lg sm:text-xl font-bold text-foreground">
                Asteroid Belt
              </h2>
              <button
                onClick={() => setShowAsteroidInfo(false)}
                className="p-1 sm:p-1.5 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
              </button>
            </div>
            
            <p className="text-muted-foreground text-xs sm:text-sm mb-3 sm:mb-4">
              The asteroid belt is a torus-shaped region in the Solar System, located roughly between the orbits of Mars and Jupiter. 
              It contains millions of rocky objects, from small debris to dwarf planet Ceres.
            </p>
            
            <h3 className="font-display font-semibold text-foreground text-sm sm:text-base mb-2 sm:mb-3">Major Asteroids</h3>
            <div className="space-y-2 sm:space-y-3">
              {majorAsteroids.map((asteroid) => (
                <div key={asteroid.id} className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg bg-muted/30 border border-border/50">
                  <div 
                    className="w-3 h-3 sm:w-4 sm:h-4 rounded-full mt-0.5 flex-shrink-0"
                    style={{ backgroundColor: asteroid.color }}
                  />
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="font-medium text-foreground text-sm">{asteroid.name}</h4>
                      <span className="text-xs text-primary">{asteroid.diameter}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{asteroid.description}</p>
                    <p className="text-[10px] sm:text-xs text-muted-foreground/70 mt-1">Discovered: {asteroid.discoveredYear}</p>
                  </div>
                </div>
              ))}
              
              {/* Ceres - special mention as dwarf planet in asteroid belt */}
              <div className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg bg-primary/10 border border-primary/30">
                <div className="w-3 h-3 sm:w-4 sm:h-4 rotate-45 bg-[#A8A8A8] mt-0.5 flex-shrink-0" />
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="font-medium text-foreground text-sm">Ceres</h4>
                    <span className="text-xs text-primary">939 km (Dwarf Planet)</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Largest object in the asteroid belt, classified as a dwarf planet</p>
                  <p className="text-[10px] sm:text-xs text-muted-foreground/70 mt-1">Discovered: 1801</p>
                </div>
              </div>
            </div>
            
            <div className="mt-3 sm:mt-4 p-2 sm:p-3 rounded-lg bg-muted/20 border border-border/30">
              <p className="text-[10px] sm:text-xs text-muted-foreground">
                <span className="text-primary font-medium">Fun Fact:</span> Despite containing millions of objects, 
                the total mass of the asteroid belt is only about 4% of Earth's Moon.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Title */}
      <div className="absolute top-2 sm:top-4 left-1/2 -translate-x-1/2 text-center px-4">
        <h1 className="font-display text-lg sm:text-xl md:text-2xl font-bold text-foreground">
          Solar System <span className="text-primary">Explorer</span>
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground hidden sm:block">
          Drag to pan • Scroll to zoom • Tap planets for details
        </p>
        <p className="text-xs text-muted-foreground sm:hidden">
          Drag to pan • Pinch to zoom
        </p>
      </div>
    </div>
  );
};

export default SolarSystemMap;
