import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { exoplanetsData, type ExoplanetData } from "@/data/exoplanetsData";
import FavoriteButton from "@/components/FavoriteButton";
import CartoonPlanet from "@/components/CartoonPlanet";
import HabitabilityChart from "@/components/HabitabilityChart";
import ExoplanetOrbitalChart from "@/components/ExoplanetOrbitalChart";
import ExoplanetFilters from "@/components/ExoplanetFilters";

const ExoplanetsSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedHabitability, setSelectedHabitability] = useState<string[]>([]);
  const [distanceRange, setDistanceRange] = useState<[number, number]>([0, 2000]);

  const toggleType = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const toggleHabitability = (hab: string) => {
    setSelectedHabitability((prev) =>
      prev.includes(hab) ? prev.filter((h) => h !== hab) : [...prev, hab]
    );
  };

  const clearAll = () => {
    setSearchQuery("");
    setSelectedTypes([]);
    setSelectedHabitability([]);
    setDistanceRange([0, 2000]);
  };

  const parseDistance = (distance: string): number => {
    const numValue = parseFloat(distance.replace(/,/g, ""));
    if (distance.toLowerCase().includes("light-year")) return numValue * 63241;
    return numValue;
  };

  const filteredExoplanets = useMemo(() => {
    return exoplanetsData.filter((exo) => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesSearch =
          exo.name.toLowerCase().includes(q) ||
          exo.description.toLowerCase().includes(q) ||
          exo.hostStar.name.toLowerCase().includes(q) ||
          exo.discoveryMethod.toLowerCase().includes(q) ||
          exo.type.toLowerCase().includes(q);
        if (!matchesSearch) return false;
      }

      // Type filter
      if (selectedTypes.length > 0 && !selectedTypes.includes(exo.type)) {
        return false;
      }

      // Habitability filter
      if (selectedHabitability.length > 0) {
        const habLevel = exo.habitabilityIndex.split(" — ")[0];
        if (!selectedHabitability.includes(habLevel)) return false;
      }

      // Distance range filter
      const exoDistance = parseDistance(exo.distance);
      if (exoDistance < distanceRange[0] || exoDistance > distanceRange[1]) {
        return false;
      }

      return true;
    });
  }, [searchQuery, selectedTypes, selectedHabitability, distanceRange]);

  return (
    <section id="exoplanets" className="py-20 px-6">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 opacity-0 animate-fade-in">
          <p className="font-display text-sm tracking-[0.3em] uppercase text-primary mb-2">
            Beyond Our Solar System
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">
            Notable <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Exoplanets</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Worlds orbiting distant stars, discovered by missions like Kepler, TESS, and ground-based observatories. 
            These are among the most important exoplanet discoveries in history.
          </p>
        </div>

        {/* Filters */}
        <ExoplanetFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedTypes={selectedTypes}
          onTypeToggle={toggleType}
          selectedHabitability={selectedHabitability}
          onHabitabilityToggle={toggleHabitability}
          distanceRange={distanceRange}
          onDistanceRangeChange={setDistanceRange}
          resultCount={filteredExoplanets.length}
          totalCount={exoplanetsData.length}
          onClearAll={clearAll}
        />

        {/* Exoplanet Cards Grid */}
        <AnimatePresence mode="popLayout">
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {filteredExoplanets.map((exo, index) => (
              <motion.div
                key={exo.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Link
                  to={`/exoplanet/${exo.id}`}
                  className="exoplanet-card group opacity-0 animate-fade-in block"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  {/* Planet glow effect */}
                  <div 
                    className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-20 transition-opacity duration-500 group-hover:opacity-40"
                    style={{ backgroundColor: exo.color }}
                  />
                  
                  {/* Action buttons */}
                  <div className="absolute top-4 right-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <FavoriteButton planetId={`exo:${exo.id}`} size="sm" />
                  </div>

                  {/* Type badge */}
                  <span className="absolute top-4 left-4 text-[10px] uppercase tracking-wider font-medium px-2 py-0.5 rounded-full bg-secondary/80 text-muted-foreground border border-border/50">
                    {exo.type}
                  </span>
                  
                  {/* Cartoon Planet */}
                  <div className="w-16 h-16 mb-4 mt-2">
                    <CartoonPlanet id={exo.id} name={exo.name} size={64} shadow={exo.color} delay={index * 0.05} />
                  </div>
                  
                  <h3 className="font-display text-2xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                    {exo.name}
                  </h3>

                  <p className="text-muted-foreground text-xs mb-3">
                    {exo.distance} from {exo.hostStar?.name || "Unknown"}
                  </p>

                  {/* Quick Stats Grid */}
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <div className="bg-secondary/40 rounded-lg px-2.5 py-1.5 border border-border/30">
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Diameter</p>
                      <p className="text-xs font-semibold text-foreground">{exo.diameter?.split("(")[0].trim() || "Unknown"}</p>
                    </div>
                    <div className="bg-secondary/40 rounded-lg px-2.5 py-1.5 border border-border/30">
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Orbit</p>
                      <p className="text-xs font-semibold text-foreground">{exo.yearLength || "Unknown"}</p>
                    </div>
                    <div className="bg-secondary/40 rounded-lg px-2.5 py-1.5 border border-border/30">
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Star Type</p>
                      <p className="text-xs font-semibold text-foreground">{exo.hostStar?.type?.split(" ")[0] || "Unknown"}</p>
                    </div>
                    <div className="bg-secondary/40 rounded-lg px-2.5 py-1.5 border border-border/30">
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Discovered</p>
                      <p className="text-xs font-semibold text-foreground">{exo.discoveredYear || "Unknown"}</p>
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-3 text-xs leading-relaxed line-clamp-2">
                    {exo.description}
                  </p>

                  {/* Habitability Badge */}
                  <div className="mb-4 flex items-center gap-2">
                    <span className="text-[10px] uppercase tracking-wider font-medium px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                      Hab: {exo.habitabilityIndex?.split(" — ")[0] || "Unknown"}
                    </span>
                  </div>

                  {/* Missions info */}
                  <div className="pt-3 border-t border-border/50 flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {exo.missions.length} missions
                    </span>
                    <span className="flex items-center gap-1 text-sm text-primary group-hover:gap-2 transition-all">
                      Explore <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredExoplanets.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg mb-2">No exoplanets found</p>
            <p className="text-muted-foreground/60 text-sm">
              Try adjusting your filters or search for "TRAPPIST", "rocky", or "Kepler"
            </p>
          </div>
        )}

        {/* Exoplanet Orbital Period Chart */}
        <ExoplanetOrbitalChart />

        {/* Habitability Comparison Chart */}
        <HabitabilityChart />
      </div>
    </section>
  );
};

export default ExoplanetsSection;
