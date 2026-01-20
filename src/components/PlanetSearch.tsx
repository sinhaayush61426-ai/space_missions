import { useState, useMemo } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface PlanetSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  resultCount: number;
  totalCount: number;
}

const PlanetSearch = ({ searchQuery, onSearchChange, resultCount, totalCount }: PlanetSearchProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="w-full max-w-md mx-auto mb-8">
      <div
        className={cn(
          "relative flex items-center transition-all duration-300",
          isFocused && "scale-[1.02]"
        )}
      >
        <Search className="absolute left-3 w-4 h-4 text-muted-foreground pointer-events-none z-10" />
        <Input
          type="text"
          placeholder="Search planets by name, distance, or characteristics..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={cn(
            "pl-10 pr-10 py-3 bg-card/50 border-border/50 rounded-xl",
            "placeholder:text-muted-foreground/60 text-foreground",
            "focus:bg-card focus:border-primary/50 focus:ring-primary/20",
            "transition-all duration-300"
          )}
        />
        <AnimatePresence>
          {searchQuery && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={() => onSearchChange("")}
              className="absolute right-3 p-1 rounded-full hover:bg-muted/50 transition-colors"
            >
              <X className="w-4 h-4 text-muted-foreground" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
      
      <AnimatePresence>
        {searchQuery && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-center text-sm text-muted-foreground mt-3"
          >
            {resultCount === 0 ? (
              <span>No planets found matching "{searchQuery}"</span>
            ) : (
              <span>
                Showing <span className="text-primary font-medium">{resultCount}</span> of{" "}
                <span className="font-medium">{totalCount}</span> planets
              </span>
            )}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PlanetSearch;
