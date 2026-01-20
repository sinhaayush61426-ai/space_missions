import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PlanetCard from "./PlanetCard";
import PlanetSearch from "./PlanetSearch";
import CompareBar from "./CompareBar";
import CompareModal from "./CompareModal";
import { planetsData } from "@/data/planetsData";
import { useCompare } from "@/hooks/useCompare";

const PlanetsSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const {
    compareIds,
    comparePlanets,
    toggleCompare,
    removeFromCompare,
    isInCompare,
    clearCompare,
    isCompareOpen,
    openCompare,
    closeCompare,
    canCompare,
  } = useCompare();

  const filteredPlanets = useMemo(() => {
    if (!searchQuery.trim()) return planetsData;
    
    const query = searchQuery.toLowerCase();
    return planetsData.filter((planet) => {
      if (planet.name.toLowerCase().includes(query)) return true;
      if (planet.description.toLowerCase().includes(query)) return true;
      if (planet.distance.toLowerCase().includes(query)) return true;
      if (planet.facts.some(fact => fact.toLowerCase().includes(query))) return true;
      if (planet.missions.some(m => m.name.toLowerCase().includes(query))) return true;
      if (planet.longDescription?.toLowerCase().includes(query)) return true;
      return false;
    });
  }, [searchQuery]);

  return (
    <section id="planets" className="relative py-12 sm:py-16 md:py-24 px-4 sm:px-6">
      <div className="container mx-auto">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <p className="text-primary font-display text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] uppercase mb-3 sm:mb-4">
            Inner & Outer Worlds
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-display font-bold text-foreground mb-3 sm:mb-4">
            Planetary <span className="gold-gradient">Expeditions</span>
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto px-2">
            Discover the missions that have unveiled the secrets of every planet in our solar system, 
            from scorching Mercury to frigid Neptune.
          </p>
        </div>

        <PlanetSearch
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          resultCount={filteredPlanets.length}
          totalCount={planetsData.length}
        />

        <AnimatePresence mode="popLayout">
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {filteredPlanets.map((planet, index) => (
              <motion.div
                key={planet.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <PlanetCard
                  id={planet.id}
                  name={planet.name}
                  description={planet.description}
                  color={planet.color}
                  distance={planet.distance}
                  missions={planet.missions.map(m => ({
                    name: m.name,
                    year: m.year,
                    agency: m.agency,
                    status: m.status,
                  }))}
                  delay={0}
                  isInCompare={isInCompare(planet.id)}
                  onToggleCompare={toggleCompare}
                />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredPlanets.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-muted-foreground text-lg mb-2">No planets found</p>
            <p className="text-muted-foreground/60 text-sm">
              Try searching for "rings", "mars", "jupiter", or mission names like "voyager"
            </p>
          </motion.div>
        )}
      </div>

      {/* Compare Bar */}
      <CompareBar
        compareIds={compareIds}
        onRemove={removeFromCompare}
        onCompare={openCompare}
        canCompare={canCompare}
      />

      {/* Compare Modal */}
      <CompareModal
        isOpen={isCompareOpen}
        onClose={closeCompare}
        planets={comparePlanets}
        onClear={clearCompare}
      />
    </section>
  );
};

export default PlanetsSection;
