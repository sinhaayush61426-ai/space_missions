import { Scale, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getPlanetById } from "@/data/planetsData";
import { cn } from "@/lib/utils";

interface CompareBarProps {
  compareIds: string[];
  onRemove: (id: string) => void;
  onCompare: () => void;
  canCompare: boolean;
}

const planetGradients: Record<string, { colors: string[]; shadow: string }> = {
  mercury: { colors: ["#8c8c8c", "#5a5a5a"], shadow: "#5a5a5a" },
  venus: { colors: ["#f4d59e", "#c9a84a"], shadow: "#c9a84a" },
  earth: { colors: ["#4a90d9", "#2d6a4f"], shadow: "#4a90d9" },
  mars: { colors: ["#e25822", "#c1440e"], shadow: "#c1440e" },
  jupiter: { colors: ["#e8c89e", "#d4a574"], shadow: "#d4a574" },
  saturn: { colors: ["#f4d59e", "#c9a86c"], shadow: "#f4d59e" },
  uranus: { colors: ["#7de3f4", "#4fd1c5"], shadow: "#4fd1c5" },
  neptune: { colors: ["#6b8cce", "#3d5fc4"], shadow: "#3d5fc4" },
};

const CompareBar = ({ compareIds, onRemove, onCompare, canCompare }: CompareBarProps) => {
  if (compareIds.length === 0) return null;

  const planets = compareIds.map((id) => getPlanetById(id)).filter(Boolean);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-20 md:bottom-6 left-1/2 -translate-x-1/2 z-40"
      >
        <div className="bg-card/95 backdrop-blur-xl border border-border rounded-2xl shadow-2xl px-4 py-3 flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Scale className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground hidden sm:inline">Compare</span>
          </div>

          <div className="flex items-center gap-2">
            {planets.map((planet) => {
              if (!planet) return null;
              const gradient = planetGradients[planet.id] || { colors: [planet.color], shadow: planet.color };
              return (
                <motion.div
                  key={planet.id}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="flex items-center gap-1.5 bg-secondary/50 rounded-full pl-1.5 pr-2 py-1"
                >
                  <div
                    className="w-6 h-6 rounded-full"
                    style={{
                      background: `radial-gradient(circle at 30% 30%, ${gradient.colors.join(", ")})`,
                    }}
                  />
                  <span className="text-sm text-foreground font-medium">{planet.name}</span>
                  <button
                    onClick={() => onRemove(planet.id)}
                    className="p-0.5 rounded-full hover:bg-muted transition-colors"
                  >
                    <X className="w-3 h-3 text-muted-foreground" />
                  </button>
                </motion.div>
              );
            })}

            {compareIds.length < 2 && (
              <div className="w-8 h-8 rounded-full border-2 border-dashed border-muted-foreground/30 flex items-center justify-center">
                <span className="text-xs text-muted-foreground">+</span>
              </div>
            )}
          </div>

          <button
            onClick={onCompare}
            disabled={!canCompare}
            className={cn(
              "flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all",
              canCompare
                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                : "bg-muted text-muted-foreground cursor-not-allowed"
            )}
          >
            Compare
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CompareBar;
