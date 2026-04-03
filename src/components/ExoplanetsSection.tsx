import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Star, Telescope, MapPin } from "lucide-react";
import { exoplanetsData } from "@/data/exoplanetsData";
import FavoriteButton from "@/components/FavoriteButton";
import HabitabilityChart from "@/components/HabitabilityChart";
import ExoplanetFilters from "@/components/ExoplanetFilters";

import proximaCentauriBImage from "@/assets/proxima-centauri-b.png";
import trappist1eImage from "@/assets/trappist-1e.png";
import trappist1fImage from "@/assets/trappist-1f.png";
import trappist1gImage from "@/assets/trappist-1g.png";
import kepler452bImage from "@/assets/kepler-452b.png";
import toi700dImage from "@/assets/toi-700d.png";

const exoplanetImages: Record<string, string> = {
  "proxima-centauri-b": proximaCentauriBImage,
  "trappist-1e": trappist1eImage,
  "trappist-1f": trappist1fImage,
  "trappist-1g": trappist1gImage,
  "kepler-452b": kepler452bImage,
  "toi-700d": toi700dImage,
};

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

      return true;
    });
  }, [searchQuery, selectedTypes, selectedHabitability]);

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExoplanets.map((exo, index) => (
            <Link
              key={exo.id}
              to={`/exoplanet/${exo.id}`}
              className="group relative bg-card border border-border/50 rounded-2xl overflow-hidden hover:border-border transition-all duration-300 opacity-0 animate-fade-in block"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <div 
                  className="absolute inset-0 opacity-20"
                  style={{ backgroundColor: exo.color }}
                />
                <img
                  src={exoplanetImages[exo.id]}
                  alt={exo.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                
                {/* Badges */}
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="text-[10px] uppercase tracking-wider font-medium px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 backdrop-blur-sm">
                    {exo.type}
                  </span>
                </div>
                <div className="absolute top-3 right-3 flex items-center gap-2">
                  <span className="text-[10px] uppercase tracking-wider font-medium px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 backdrop-blur-sm">
                    {exo.habitabilityIndex.split(" — ")[0]}
                  </span>
                  <FavoriteButton planetId={`exo:${exo.id}`} size="sm" />
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-display text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                  {exo.name}
                </h3>

                <div className="flex items-center gap-4 mb-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {exo.distance}
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="w-3 h-3" />
                    {exo.hostStar.type.split(" ")[0]}
                  </span>
                  <span className="flex items-center gap-1">
                    <Telescope className="w-3 h-3" />
                    {exo.discoveredYear}
                  </span>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-2 mb-3">
                  <div className="bg-secondary/40 rounded-lg px-2.5 py-1.5 border border-border/30">
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Diameter</p>
                    <p className="text-xs font-semibold text-foreground">{exo.diameter.split("(")[0].trim()}</p>
                  </div>
                  <div className="bg-secondary/40 rounded-lg px-2.5 py-1.5 border border-border/30">
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Year</p>
                    <p className="text-xs font-semibold text-foreground">{exo.yearLength}</p>
                  </div>
                </div>

                <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2 mb-4">
                  {exo.description}
                </p>

                {/* View More */}
                <div className="flex items-center justify-between pt-3 border-t border-border/50">
                  <span className="text-xs text-muted-foreground">
                    {exo.missions.length} observation missions
                  </span>
                  <span className="flex items-center gap-1 text-sm text-primary group-hover:gap-2 transition-all">
                    Explore <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredExoplanets.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg mb-2">No exoplanets found</p>
            <p className="text-muted-foreground/60 text-sm">
              Try adjusting your filters or search for "TRAPPIST", "rocky", or "Kepler"
            </p>
          </div>
        )}

        {/* Habitability Comparison Chart */}
        <HabitabilityChart />
      </div>
    </section>
  );
};

export default ExoplanetsSection;
