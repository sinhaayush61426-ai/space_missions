import { Link } from "react-router-dom";
import { Heart, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useFavorites } from "@/hooks/useFavorites";
import { getPlanetById } from "@/data/planetsData";

interface FavoritesPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const planetGradients: Record<string, string[]> = {
  mercury: ["#8c8c8c", "#5a5a5a"],
  venus: ["#f4d59e", "#c9a84a"],
  earth: ["#4a90d9", "#2d6a4f"],
  mars: ["#e25822", "#8b3a0e"],
  jupiter: ["#e8c89e", "#d4a574"],
  saturn: ["#f4d59e", "#c9a86c"],
  uranus: ["#7de3f4", "#38b2ac"],
  neptune: ["#6b8cce", "#1a3a8a"],
};

const FavoritesPanel = ({ isOpen, onClose }: FavoritesPanelProps) => {
  const { favorites } = useFavorites();
  const favoritePlanets = favorites.map((id) => getPlanetById(id)).filter(Boolean);

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

          {/* Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-80 max-w-full bg-card border-l border-border z-50 overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-primary fill-primary" />
                  <h2 className="font-display text-xl font-bold text-foreground">
                    Favorites
                  </h2>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-secondary transition-colors"
                >
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>

              {favoritePlanets.length === 0 ? (
                <div className="text-center py-12">
                  <Heart className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                  <p className="text-muted-foreground text-sm">
                    No favorite planets yet.
                  </p>
                  <p className="text-muted-foreground/60 text-xs mt-1">
                    Tap the heart icon on any planet to add it here.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {favoritePlanets.map((planet) => {
                    if (!planet) return null;
                    const gradient = planetGradients[planet.id] || [planet.color, planet.color];
                    
                    return (
                      <Link
                        key={planet.id}
                        to={`/planet/${planet.id}`}
                        onClick={onClose}
                        className="flex items-center gap-4 p-3 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors group"
                      >
                        <div
                          className="w-10 h-10 rounded-full shadow-lg flex-shrink-0"
                          style={{
                            background: `radial-gradient(circle at 30% 30%, ${gradient.join(", ")})`,
                            boxShadow: `0 0 15px ${gradient[0]}40`,
                          }}
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-display font-bold text-foreground group-hover:text-primary transition-colors truncate">
                            {planet.name}
                          </p>
                          <p className="text-xs text-muted-foreground truncate">
                            {planet.distance}
                          </p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default FavoritesPanel;
