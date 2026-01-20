import { X, Rocket, Calendar, Globe, Moon, Clock, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { PlanetData } from "@/data/planetsData";
import { cn } from "@/lib/utils";

interface CompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  planets: (PlanetData | undefined)[];
  onClear: () => void;
}

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

const StatRow = ({ 
  label, 
  value1, 
  value2, 
  icon: Icon,
  highlight 
}: { 
  label: string; 
  value1: string; 
  value2: string; 
  icon: React.ElementType;
  highlight?: "first" | "second" | null;
}) => (
  <div className="grid grid-cols-3 gap-4 py-3 border-b border-border/30">
    <div className="flex items-center gap-2 text-muted-foreground">
      <Icon className="w-4 h-4" />
      <span className="text-sm font-medium">{label}</span>
    </div>
    <div className={cn(
      "text-sm text-center",
      highlight === "first" ? "text-primary font-semibold" : "text-foreground"
    )}>
      {value1}
    </div>
    <div className={cn(
      "text-sm text-center",
      highlight === "second" ? "text-primary font-semibold" : "text-foreground"
    )}>
      {value2}
    </div>
  </div>
);

const PlanetHeader = ({ planet }: { planet: PlanetData }) => {
  const gradient = planetGradients[planet.id] || { colors: [planet.color], shadow: planet.color };
  const gradientStyle = `radial-gradient(circle at 30% 30%, ${gradient.colors.join(", ")})`;

  return (
    <Link to={`/planet/${planet.id}`} className="flex flex-col items-center gap-3 group">
      <div
        className="w-16 h-16 md:w-20 md:h-20 rounded-full shadow-lg transition-transform group-hover:scale-110"
        style={{
          background: gradientStyle,
          boxShadow: `0 0 30px ${gradient.shadow}40, inset -4px -4px 8px rgba(0,0,0,0.4)`,
        }}
      />
      <h3 className="font-display text-lg md:text-xl font-bold text-foreground group-hover:text-primary transition-colors flex items-center gap-1">
        {planet.name}
        <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
      </h3>
    </Link>
  );
};

const CompareModal = ({ isOpen, onClose, planets, onClear }: CompareModalProps) => {
  const [planet1, planet2] = planets;

  if (!planet1 || !planet2) return null;

  const compareMoons = () => {
    if (planet1.moons > planet2.moons) return "first";
    if (planet2.moons > planet1.moons) return "second";
    return null;
  };

  const compareMissions = () => {
    if (planet1.missions.length > planet2.missions.length) return "first";
    if (planet2.missions.length > planet1.missions.length) return "second";
    return null;
  };

  const getActiveMissions = (planet: PlanetData) => 
    planet.missions.filter(m => m.status === "active").length;

  const compareActiveMissions = () => {
    const active1 = getActiveMissions(planet1);
    const active2 = getActiveMissions(planet2);
    if (active1 > active2) return "first";
    if (active2 > active1) return "second";
    return null;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-4 md:inset-10 lg:inset-20 bg-card border border-border rounded-2xl z-50 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 md:p-6 border-b border-border">
              <h2 className="font-display text-xl md:text-2xl font-bold text-foreground">
                Planet Comparison
              </h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    onClear();
                    onClose();
                  }}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-lg hover:bg-muted"
                >
                  Clear
                </button>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-muted transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6">
              {/* Planet Headers */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div /> {/* Empty space for labels column */}
                <PlanetHeader planet={planet1} />
                <PlanetHeader planet={planet2} />
              </div>

              {/* Stats Comparison */}
              <div className="space-y-1 mb-8">
                <h4 className="text-sm font-display uppercase tracking-wider text-primary mb-4">
                  Physical Characteristics
                </h4>
                <StatRow
                  label="Distance"
                  value1={planet1.distance}
                  value2={planet2.distance}
                  icon={Globe}
                />
                <StatRow
                  label="Diameter"
                  value1={planet1.diameter}
                  value2={planet2.diameter}
                  icon={Globe}
                />
                <StatRow
                  label="Day Length"
                  value1={planet1.dayLength}
                  value2={planet2.dayLength}
                  icon={Clock}
                />
                <StatRow
                  label="Year Length"
                  value1={planet1.yearLength}
                  value2={planet2.yearLength}
                  icon={Calendar}
                />
                <StatRow
                  label="Moons"
                  value1={String(planet1.moons)}
                  value2={String(planet2.moons)}
                  icon={Moon}
                  highlight={compareMoons()}
                />
              </div>

              {/* Missions Comparison */}
              <div className="space-y-1 mb-8">
                <h4 className="text-sm font-display uppercase tracking-wider text-primary mb-4">
                  Mission Statistics
                </h4>
                <StatRow
                  label="Total Missions"
                  value1={String(planet1.missions.length)}
                  value2={String(planet2.missions.length)}
                  icon={Rocket}
                  highlight={compareMissions()}
                />
                <StatRow
                  label="Active Missions"
                  value1={String(getActiveMissions(planet1))}
                  value2={String(getActiveMissions(planet2))}
                  icon={Rocket}
                  highlight={compareActiveMissions()}
                />
              </div>

              {/* Key Facts */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[planet1, planet2].map((planet) => (
                  <div key={planet.id} className="bg-secondary/30 rounded-xl p-4">
                    <h4 className="text-sm font-display uppercase tracking-wider text-primary mb-3 flex items-center gap-2">
                      {planet.name} Facts
                    </h4>
                    <ul className="space-y-2">
                      {planet.facts.slice(0, 3).map((fact, i) => (
                        <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          {fact}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Recent Missions */}
              <div className="mt-8">
                <h4 className="text-sm font-display uppercase tracking-wider text-primary mb-4">
                  Recent & Active Missions
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[planet1, planet2].map((planet) => (
                    <div key={planet.id} className="space-y-2">
                      <h5 className="text-sm font-medium text-foreground">{planet.name}</h5>
                      {planet.missions
                        .filter(m => m.status === "active" || m.status === "upcoming")
                        .slice(0, 3)
                        .map((mission, i) => (
                          <div
                            key={i}
                            className="flex items-center justify-between text-sm bg-secondary/30 rounded-lg px-3 py-2"
                          >
                            <div className="flex items-center gap-2">
                              <span
                                className={cn(
                                  "w-2 h-2 rounded-full",
                                  mission.status === "active" ? "bg-primary" : "bg-accent"
                                )}
                              />
                              <span className="text-foreground">{mission.name}</span>
                            </div>
                            <span className="text-muted-foreground">{mission.year}</span>
                          </div>
                        ))}
                      {planet.missions.filter(m => m.status === "active" || m.status === "upcoming").length === 0 && (
                        <p className="text-sm text-muted-foreground italic">No active missions</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CompareModal;
