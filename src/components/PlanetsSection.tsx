import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import PlanetCard from "./PlanetCard";
import PlanetSearch from "./PlanetSearch";
import CompareBar from "./CompareBar";
import CompareModal from "./CompareModal";
import { planetsData, PlanetData } from "@/data/planetsData";
import { useCompare } from "@/hooks/useCompare";
import { Button } from "@/components/ui/button";
import PlanetsComparisonChart from "@/components/PlanetsComparisonChart";

type SortKey = "default" | "distance" | "size" | "moons" | "missions";
type SortDir = "asc" | "desc";

const sortLabels: Record<SortKey, string> = {
  default: "Default",
  distance: "Distance",
  size: "Size",
  moons: "Moons",
  missions: "Missions",
};

const parseDistance = (d: string): number => {
  if (d === "Home") return 149.6; // Earth
  const num = parseFloat(d.replace(/,/g, ""));
  if (d.includes("billion")) return num * 1000;
  return num;
};

const parseDiameter = (d: string): number => {
  return parseFloat(d.replace(/,/g, ""));
};

const PlanetsSection = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("default");
  const [sortDir, setSortDir] = useState<SortDir>("asc");
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
    addToCompare,
  } = useCompare();

  // Auto-open comparison from shared link
  useEffect(() => {
    const compareParam = searchParams.get("compare");
    if (compareParam) {
      const ids = compareParam.split(",").slice(0, 2);
      if (ids.length === 2) {
        ids.forEach(id => addToCompare(id));
        setTimeout(() => openCompare(), 100);
        setSearchParams({}, { replace: true });
      }
    }
  }, []);

  const filteredPlanets = useMemo(() => {
    let result = [...planetsData];
    
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter((planet) => {
        if (planet.name.toLowerCase().includes(query)) return true;
        if (planet.description.toLowerCase().includes(query)) return true;
        if (planet.distance.toLowerCase().includes(query)) return true;
        if (planet.facts.some(fact => fact.toLowerCase().includes(query))) return true;
        if (planet.missions.some(m => m.name.toLowerCase().includes(query))) return true;
        if (planet.longDescription?.toLowerCase().includes(query)) return true;
        return false;
      });
    }

    if (sortKey !== "default") {
      const multiplier = sortDir === "asc" ? 1 : -1;
      result.sort((a, b) => {
        let valA = 0, valB = 0;
        switch (sortKey) {
          case "distance": valA = parseDistance(a.distance); valB = parseDistance(b.distance); break;
          case "size": valA = parseDiameter(a.diameter); valB = parseDiameter(b.diameter); break;
          case "moons": valA = a.moons; valB = b.moons; break;
          case "missions": valA = a.missions.length; valB = b.missions.length; break;
        }
        return (valA - valB) * multiplier;
      });
    }

    return result;
  }, [searchQuery, sortKey, sortDir]);

  const handleSort = (key: SortKey) => {
    if (key === sortKey) {
      setSortDir(d => d === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

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

        {/* Sort Controls */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          <span className="text-xs text-muted-foreground mr-1 flex items-center gap-1">
            <ArrowUpDown className="w-3.5 h-3.5" /> Sort:
          </span>
          {(Object.keys(sortLabels) as SortKey[]).map((key) => (
            <Button
              key={key}
              variant={sortKey === key ? "default" : "ghost"}
              size="sm"
              onClick={() => key === "default" ? (setSortKey("default"), setSortDir("asc")) : handleSort(key)}
              className="h-7 px-3 text-xs gap-1"
            >
              {sortLabels[key]}
              {sortKey === key && key !== "default" && (
                sortDir === "asc" ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />
              )}
            </Button>
          ))}
        </div>

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
                  diameter={planet.diameter}
                  gravity={planet.gravity}
                  temperature={planet.temperature}
                  moons={planet.moons}
                  type={planet.type}
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

        {/* Planets Comparison Chart */}
        <PlanetsComparisonChart />
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
