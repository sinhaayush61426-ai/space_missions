import { Link } from "react-router-dom";
import { Rocket, ArrowRight, Thermometer, Scale, Wind } from "lucide-react";
import FavoriteButton from "@/components/FavoriteButton";
import CompareButton from "@/components/CompareButton";

interface Mission {
  name: string;
  year: string;
  agency: string;
  status: "completed" | "active" | "upcoming";
}

interface PlanetCardProps {
  id: string;
  name: string;
  description: string;
  color: string;
  missions: Mission[];
  distance: string;
  delay: number;
  isInCompare?: boolean;
  onToggleCompare?: (id: string) => void;
  diameter?: string;
  gravity?: string;
  temperature?: string;
  moons?: number;
  type?: string;
}

// Realistic planet gradient configurations
const planetGradients: Record<string, { colors: string[]; shadow: string }> = {
  mercury: { colors: ["#8c8c8c", "#5a5a5a", "#3d3d3d"], shadow: "#5a5a5a" },
  venus: { colors: ["#f4d59e", "#e6c87a", "#c9a84a"], shadow: "#c9a84a" },
  earth: { colors: ["#4a90d9", "#2d6a4f", "#1a4731"], shadow: "#4a90d9" },
  mars: { colors: ["#e25822", "#c1440e", "#8b3a0e"], shadow: "#c1440e" },
  jupiter: { colors: ["#e8c89e", "#d4a574", "#8b6914", "#c9a56c"], shadow: "#d4a574" },
  saturn: { colors: ["#f4d59e", "#e8d4a8", "#c9a86c"], shadow: "#f4d59e" },
  uranus: { colors: ["#7de3f4", "#4fd1c5", "#38b2ac"], shadow: "#4fd1c5" },
  neptune: { colors: ["#6b8cce", "#3d5fc4", "#1a3a8a"], shadow: "#3d5fc4" },
};

const PlanetCard = ({ 
  id, name, description, color, missions, distance, delay,
  isInCompare = false, onToggleCompare,
  diameter, gravity, temperature, moons, type,
}: PlanetCardProps) => {
  const statusColors = {
    completed: "bg-planet-earth",
    active: "bg-primary",
    upcoming: "bg-accent",
  };

  const gradient = planetGradients[id] || { colors: [color, color], shadow: color };
  const gradientStyle = `radial-gradient(circle at 30% 30%, ${gradient.colors.join(", ")})`;

  return (
    <Link 
      to={`/planet/${id}`}
      className="planet-card group opacity-0 animate-fade-in block"
      style={{ animationDelay: `${delay}s` }}
    >
      {/* Planet glow effect */}
      <div 
        className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-20 transition-opacity duration-500 group-hover:opacity-40"
        style={{ backgroundColor: gradient.shadow }}
      />
      
      {/* Action buttons */}
      <div className="absolute top-4 right-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        {onToggleCompare && (
          <CompareButton planetId={id} isInCompare={isInCompare} onToggle={onToggleCompare} size="sm" />
        )}
        <FavoriteButton planetId={id} size="sm" />
      </div>

      {/* Type badge */}
      {type && (
        <span className="absolute top-4 left-4 text-[10px] uppercase tracking-wider font-medium px-2 py-0.5 rounded-full bg-secondary/80 text-muted-foreground border border-border/50">
          {type}
        </span>
      )}
      
      {/* Realistic planet sphere */}
      <div 
        className="w-14 h-14 rounded-full mb-4 shadow-lg animate-float relative mt-2"
        style={{ 
          background: gradientStyle,
          boxShadow: `0 0 30px ${gradient.shadow}40, inset -4px -4px 8px rgba(0,0,0,0.4), inset 2px 2px 6px rgba(255,255,255,0.2)`,
          animationDelay: `${delay * 0.5}s`
        }}
      >
        {(id === 'saturn' || id === 'uranus') && (
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-3 rounded-full border-2 opacity-60"
            style={{ 
              borderColor: id === 'saturn' ? '#c9a86c' : '#7de3f4',
              transform: 'translate(-50%, -50%) rotateX(70deg)',
            }}
          />
        )}
      </div>

      <h3 className="font-display text-2xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
        {name}
      </h3>

      <p className="text-muted-foreground text-xs mb-3">
        {distance} from Sun
      </p>

      {/* Quick Stats Grid */}
      {(diameter || gravity || temperature || moons !== undefined) && (
        <div className="grid grid-cols-2 gap-2 mb-4">
          {diameter && (
            <div className="bg-secondary/40 rounded-lg px-2.5 py-1.5 border border-border/30">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Diameter</p>
              <p className="text-xs font-semibold text-foreground">{diameter}</p>
            </div>
          )}
          {moons !== undefined && (
            <div className="bg-secondary/40 rounded-lg px-2.5 py-1.5 border border-border/30">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Moons</p>
              <p className="text-xs font-semibold text-foreground">{moons}</p>
            </div>
          )}
          {gravity && (
            <div className="bg-secondary/40 rounded-lg px-2.5 py-1.5 border border-border/30 flex items-start gap-1.5">
              <Scale className="w-3 h-3 text-primary mt-0.5 shrink-0" />
              <div>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Gravity</p>
                <p className="text-xs font-semibold text-foreground">{gravity}</p>
              </div>
            </div>
          )}
          {temperature && (
            <div className="bg-secondary/40 rounded-lg px-2.5 py-1.5 border border-border/30 flex items-start gap-1.5">
              <Thermometer className="w-3 h-3 text-primary mt-0.5 shrink-0" />
              <div>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Temp</p>
                <p className="text-xs font-semibold text-foreground truncate">{temperature}</p>
              </div>
            </div>
          )}
        </div>
      )}
      
      <p className="text-muted-foreground mb-4 text-sm leading-relaxed line-clamp-2">
        {description}
      </p>

      <div className="space-y-3">
        <h4 className="font-display text-xs uppercase tracking-wider text-primary flex items-center gap-2">
          <Rocket className="w-4 h-4" />
          Key Missions
        </h4>
        
        <ul className="space-y-2">
          {missions.slice(0, 3).map((mission, index) => (
            <li 
              key={index}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm bg-secondary/50 rounded-lg px-3 py-2 gap-1 sm:gap-0"
            >
              <div className="flex items-center gap-3">
                <span className={`w-2 h-2 rounded-full flex-shrink-0 ${statusColors[mission.status]}`} />
                <span className="text-foreground font-medium text-sm">{mission.name}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground text-xs pl-5 sm:pl-0">
                <span>{mission.agency}</span>
                <span className="text-primary">{mission.year}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* View More indicator */}
      <div className="mt-4 pt-4 border-t border-border/50 flex items-center justify-between">
        <span className="text-sm text-muted-foreground">
          {missions.length} total missions
        </span>
        <span className="flex items-center gap-1 text-sm text-primary group-hover:gap-2 transition-all">
          Explore <ArrowRight className="w-4 h-4" />
        </span>
      </div>
    </Link>
  );
};

export default PlanetCard;
