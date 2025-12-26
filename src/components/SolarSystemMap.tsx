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
  { id: "mercury", name: "Mercury", orbitRadius: 60, size: 6, color: "#B5B5B5", orbitSpeed: 0.004, angle: 0 },
  { id: "venus", name: "Venus", orbitRadius: 90, size: 10, color: "#E6C77A", orbitSpeed: 0.003, angle: 45 },
  { id: "earth", name: "Earth", orbitRadius: 120, size: 12, color: "#6B93D6", orbitSpeed: 0.002, angle: 90 },
  { id: "mars", name: "Mars", orbitRadius: 160, size: 8, color: "#C1440E", orbitSpeed: 0.0015, angle: 135 },
  { id: "jupiter", name: "Jupiter", orbitRadius: 220, size: 28, color: "#D4A574", orbitSpeed: 0.0008, angle: 180 },
  { id: "saturn", name: "Saturn", orbitRadius: 290, size: 24, color: "#F4D59E", orbitSpeed: 0.0006, angle: 225 },
  { id: "uranus", name: "Uranus", orbitRadius: 360, size: 16, color: "#93CCEA", orbitSpeed: 0.0004, angle: 270 },
  { id: "neptune", name: "Neptune", orbitRadius: 420, size: 14, color: "#5B7FDE", orbitSpeed: 0.0003, angle: 315 },
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
  
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [hoveredItem, setHoveredItem] = useState<{ type: "planet" | "spacecraft"; data: Planet | Spacecraft } | null>(null);
  const [planetAngles, setPlanetAngles] = useState<Record<string, number>>({});
  const [showTrajectories, setShowTrajectories] = useState(true);

  // Initialize planet angles
  useEffect(() => {
    const angles: Record<string, number> = {};
    planets.forEach((p) => {
      angles[p.id] = (p.angle * Math.PI) / 180;
    });
    setPlanetAngles(angles);
  }, []);

  const getPlanetPosition = useCallback((planet: Planet) => {
    const angle = planetAngles[planet.id] || 0;
    return {
      x: Math.cos(angle) * planet.orbitRadius,
      y: Math.sin(angle) * planet.orbitRadius,
    };
  }, [planetAngles]);

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

    // Clear canvas
    ctx.fillStyle = "#030712";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw stars
    ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
    for (let i = 0; i < 200; i++) {
      const x = (Math.sin(i * 12345.6789) * 0.5 + 0.5) * canvas.width;
      const y = (Math.cos(i * 98765.4321) * 0.5 + 0.5) * canvas.height;
      const size = Math.random() * 1.5;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    }

    // Draw orbits
    planets.forEach((planet) => {
      ctx.beginPath();
      ctx.arc(centerX, centerY, planet.orbitRadius * zoom, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
      ctx.lineWidth = 1;
      ctx.stroke();
    });

    // Draw asteroid belt between Mars and Jupiter
    const asteroidBeltInnerRadius = 175;
    const asteroidBeltOuterRadius = 205;
    const asteroidCount = 300;
    
    for (let i = 0; i < asteroidCount; i++) {
      // Use seeded random for consistent asteroid positions
      const seed = i * 9876.54321;
      const randomAngle = (Math.sin(seed) * 0.5 + 0.5) * Math.PI * 2;
      const randomRadius = asteroidBeltInnerRadius + (Math.cos(seed * 2) * 0.5 + 0.5) * (asteroidBeltOuterRadius - asteroidBeltInnerRadius);
      const randomSize = 0.5 + (Math.sin(seed * 3) * 0.5 + 0.5) * 1.5;
      const randomBrightness = 0.3 + (Math.cos(seed * 4) * 0.5 + 0.5) * 0.5;
      
      // Slow orbit animation for asteroids
      const asteroidAngle = randomAngle + (planetAngles["mars"] || 0) * 0.3;
      
      const asteroidX = centerX + Math.cos(asteroidAngle) * randomRadius * zoom;
      const asteroidY = centerY + Math.sin(asteroidAngle) * randomRadius * zoom;
      
      ctx.beginPath();
      ctx.arc(asteroidX, asteroidY, randomSize * zoom, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(180, 160, 140, ${randomBrightness})`;
      ctx.fill();
    }
    
    // Draw asteroid belt boundary hints (subtle rings)
    ctx.beginPath();
    ctx.arc(centerX, centerY, asteroidBeltInnerRadius * zoom, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(180, 160, 140, 0.1)";
    ctx.lineWidth = 1;
    ctx.setLineDash([3, 6]);
    ctx.stroke();
    ctx.setLineDash([]);
    
    ctx.beginPath();
    ctx.arc(centerX, centerY, asteroidBeltOuterRadius * zoom, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(180, 160, 140, 0.1)";
    ctx.lineWidth = 1;
    ctx.setLineDash([3, 6]);
    ctx.stroke();
    ctx.setLineDash([]);

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

    // Draw Sun
    const sunGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 25 * zoom);
    sunGradient.addColorStop(0, "#FDB813");
    sunGradient.addColorStop(0.5, "#F9A602");
    sunGradient.addColorStop(1, "#F97306");
    ctx.beginPath();
    ctx.arc(centerX, centerY, 20 * zoom, 0, Math.PI * 2);
    ctx.fillStyle = sunGradient;
    ctx.fill();

    // Draw sun glow
    const glowGradient = ctx.createRadialGradient(centerX, centerY, 15 * zoom, centerX, centerY, 40 * zoom);
    glowGradient.addColorStop(0, "rgba(249, 166, 2, 0.4)");
    glowGradient.addColorStop(1, "rgba(249, 166, 2, 0)");
    ctx.beginPath();
    ctx.arc(centerX, centerY, 40 * zoom, 0, Math.PI * 2);
    ctx.fillStyle = glowGradient;
    ctx.fill();

    // Draw planets
    planets.forEach((planet) => {
      const pos = getPlanetPosition(planet);
      const x = centerX + pos.x * zoom;
      const y = centerY + pos.y * zoom;
      const size = planet.size * zoom * 0.5;

      // Planet glow
      const planetGlow = ctx.createRadialGradient(x, y, 0, x, y, size * 2);
      planetGlow.addColorStop(0, planet.color + "40");
      planetGlow.addColorStop(1, "transparent");
      ctx.beginPath();
      ctx.arc(x, y, size * 2, 0, Math.PI * 2);
      ctx.fillStyle = planetGlow;
      ctx.fill();

      // Planet body
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fillStyle = planet.color;
      ctx.fill();

      // Saturn rings
      if (planet.id === "saturn") {
        ctx.beginPath();
        ctx.ellipse(x, y, size * 1.8, size * 0.4, 0, 0, Math.PI * 2);
        ctx.strokeStyle = "#D4A574";
        ctx.lineWidth = 2;
        ctx.stroke();
      }

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

  }, [zoom, offset, planetAngles, showTrajectories, getPlanetPosition, getSpacecraftPosition]);

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
    }
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const newZoom = Math.max(0.3, Math.min(3, zoom - e.deltaY * 0.001));
    setZoom(newZoom);
  };

  const resetView = () => {
    setZoom(1);
    setOffset({ x: 0, y: 0 });
  };

  return (
    <div
      ref={containerRef}
      className={`${isFullscreen ? "fixed inset-0 z-50" : "relative w-full h-[600px]"} bg-background`}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onClick={handleClick}
        onWheel={handleWheel}
      />

      {/* Controls */}
      <div className="absolute top-4 right-4 flex flex-col gap-2">
        {isFullscreen && onClose && (
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-card/80 backdrop-blur-sm border border-border/50 text-foreground hover:bg-primary/20 hover:border-primary/50 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        )}
        <button
          onClick={() => setZoom((z) => Math.min(3, z + 0.2))}
          className="p-2 rounded-lg bg-card/80 backdrop-blur-sm border border-border/50 text-foreground hover:bg-primary/20 hover:border-primary/50 transition-all"
        >
          <ZoomIn className="w-5 h-5" />
        </button>
        <button
          onClick={() => setZoom((z) => Math.max(0.3, z - 0.2))}
          className="p-2 rounded-lg bg-card/80 backdrop-blur-sm border border-border/50 text-foreground hover:bg-primary/20 hover:border-primary/50 transition-all"
        >
          <ZoomOut className="w-5 h-5" />
        </button>
        <button
          onClick={resetView}
          className="p-2 rounded-lg bg-card/80 backdrop-blur-sm border border-border/50 text-foreground hover:bg-primary/20 hover:border-primary/50 transition-all"
        >
          <RotateCcw className="w-5 h-5" />
        </button>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 p-4 rounded-xl bg-card/80 backdrop-blur-sm border border-border/50 max-w-xs">
        <div className="flex items-center gap-2 mb-3">
          <Info className="w-4 h-4 text-primary" />
          <span className="font-display font-semibold text-foreground">Map Legend</span>
        </div>
        
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary" />
            <span className="text-muted-foreground">Planets (click to view)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-0 h-0 border-l-[5px] border-r-[5px] border-b-[8px] border-l-transparent border-r-transparent border-b-primary" />
            <span className="text-muted-foreground">Spacecraft</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 border-t-2 border-dashed border-muted-foreground" />
            <span className="text-muted-foreground">Trajectories</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex gap-0.5">
              <div className="w-1 h-1 rounded-full bg-[#B4A08C]" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#B4A08C]/70" />
              <div className="w-1 h-1 rounded-full bg-[#B4A08C]/50" />
            </div>
            <span className="text-muted-foreground">Asteroid Belt</span>
          </div>
        </div>

        <button
          onClick={() => setShowTrajectories(!showTrajectories)}
          className={`mt-3 w-full py-1.5 px-3 rounded-lg text-xs font-medium transition-all ${
            showTrajectories
              ? "bg-primary/20 text-primary border border-primary/50"
              : "bg-muted/50 text-muted-foreground border border-border/50"
          }`}
        >
          {showTrajectories ? "Hide" : "Show"} Trajectories
        </button>
      </div>

      {/* Spacecraft List */}
      <div className="absolute top-4 left-4 p-4 rounded-xl bg-card/80 backdrop-blur-sm border border-border/50 max-w-xs max-h-[300px] overflow-y-auto">
        <h3 className="font-display font-semibold text-foreground mb-3">Active Missions</h3>
        <div className="space-y-2">
          {initialSpacecraft.map((s) => (
            <div
              key={s.id}
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted/30 transition-colors"
            >
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: s.color }}
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{s.name}</p>
                <p className="text-xs text-muted-foreground">{s.status}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hover tooltip */}
      {hoveredItem && (
        <div className="absolute bottom-4 right-4 p-4 rounded-xl bg-card/90 backdrop-blur-sm border border-primary/30 min-w-[200px]">
          {hoveredItem.type === "planet" ? (
            <>
              <h3 className="font-display font-bold text-lg text-foreground">
                {(hoveredItem.data as Planet).name}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">Click to view missions</p>
            </>
          ) : (
            <>
              <h3 className="font-display font-bold text-lg text-foreground">
                {(hoveredItem.data as Spacecraft).name}
              </h3>
              <p className="text-sm text-muted-foreground">
                Launched: {(hoveredItem.data as Spacecraft).launchYear}
              </p>
              <p className="text-sm text-primary">
                {(hoveredItem.data as Spacecraft).status}
              </p>
            </>
          )}
        </div>
      )}

      {/* Title */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 text-center">
        <h1 className="font-display text-2xl font-bold text-foreground">
          Solar System <span className="text-primary">Explorer</span>
        </h1>
        <p className="text-sm text-muted-foreground">
          Drag to pan • Scroll to zoom • Click planets for details
        </p>
      </div>
    </div>
  );
};

export default SolarSystemMap;
