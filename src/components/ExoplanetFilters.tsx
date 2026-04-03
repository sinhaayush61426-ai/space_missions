import { useState } from "react";
import { Search, Filter, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ExoplanetFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedTypes: string[];
  onTypeToggle: (type: string) => void;
  selectedHabitability: string[];
  onHabitabilityToggle: (hab: string) => void;
  distanceRange: [number, number];
  onDistanceRangeChange: (range: [number, number]) => void;
  resultCount: number;
  totalCount: number;
  onClearAll: () => void;
}

const TYPES = ["rocky", "super-earth", "sub-neptune", "gas giant"];
const HABITABILITY_LEVELS = ["High", "Moderate", "Low"];

const ExoplanetFilters = ({
  searchQuery,
  onSearchChange,
  selectedTypes,
  onTypeToggle,
  selectedHabitability,
  onHabitabilityToggle,
  resultCount,
  totalCount,
  onClearAll,
}: ExoplanetFiltersProps) => {
  const [showFilters, setShowFilters] = useState(false);
  const hasActiveFilters = selectedTypes.length > 0 || selectedHabitability.length > 0 || searchQuery.trim().length > 0;

  return (
    <div className="mb-8 space-y-4">
      {/* Search Bar */}
      <div className="relative max-w-md mx-auto">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search exoplanets, stars, methods..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 pr-10 bg-card border-border/50 focus:border-primary/50"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Filter Toggle */}
      <div className="flex items-center justify-center gap-3">
        <Button
          variant={showFilters ? "default" : "outline"}
          size="sm"
          onClick={() => setShowFilters(!showFilters)}
          className="gap-1.5 text-xs"
        >
          <Filter className="w-3.5 h-3.5" />
          Filters
          {hasActiveFilters && (
            <span className="ml-1 w-4 h-4 rounded-full bg-primary-foreground text-primary text-[10px] flex items-center justify-center font-bold">
              {selectedTypes.length + selectedHabitability.length}
            </span>
          )}
        </Button>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={onClearAll} className="text-xs text-muted-foreground">
            Clear all
          </Button>
        )}
        <span className="text-xs text-muted-foreground">
          {resultCount === totalCount ? `${totalCount} exoplanets` : `${resultCount} of ${totalCount}`}
        </span>
      </div>

      {/* Filter Chips */}
      {showFilters && (
        <div className="space-y-3 bg-card/50 border border-border/30 rounded-xl p-4 max-w-lg mx-auto animate-fade-in">
          {/* Type Filter */}
          <div>
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2 font-medium">Planet Type</p>
            <div className="flex flex-wrap gap-2">
              {TYPES.map((type) => (
                <Badge
                  key={type}
                  variant={selectedTypes.includes(type) ? "default" : "outline"}
                  className="cursor-pointer capitalize text-xs"
                  onClick={() => onTypeToggle(type)}
                >
                  {type}
                </Badge>
              ))}
            </div>
          </div>

          {/* Habitability Filter */}
          <div>
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2 font-medium">Habitability</p>
            <div className="flex flex-wrap gap-2">
              {HABITABILITY_LEVELS.map((level) => (
                <Badge
                  key={level}
                  variant={selectedHabitability.includes(level) ? "default" : "outline"}
                  className="cursor-pointer text-xs"
                  onClick={() => onHabitabilityToggle(level)}
                >
                  {level}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExoplanetFilters;
