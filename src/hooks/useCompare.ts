import { useState, useCallback } from "react";
import { getPlanetById, PlanetData } from "@/data/planetsData";

const MAX_COMPARE = 2;

export const useCompare = () => {
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [isCompareOpen, setIsCompareOpen] = useState(false);

  const addToCompare = useCallback((planetId: string) => {
    setCompareIds((prev) => {
      if (prev.includes(planetId)) return prev;
      if (prev.length >= MAX_COMPARE) {
        // Replace the first one if we already have 2
        return [prev[1], planetId];
      }
      return [...prev, planetId];
    });
  }, []);

  const removeFromCompare = useCallback((planetId: string) => {
    setCompareIds((prev) => prev.filter((id) => id !== planetId));
  }, []);

  const toggleCompare = useCallback((planetId: string) => {
    setCompareIds((prev) => {
      if (prev.includes(planetId)) {
        return prev.filter((id) => id !== planetId);
      }
      if (prev.length >= MAX_COMPARE) {
        return [prev[1], planetId];
      }
      return [...prev, planetId];
    });
  }, []);

  const isInCompare = useCallback(
    (planetId: string) => compareIds.includes(planetId),
    [compareIds]
  );

  const clearCompare = useCallback(() => {
    setCompareIds([]);
  }, []);

  const openCompare = useCallback(() => {
    if (compareIds.length >= 2) {
      setIsCompareOpen(true);
    }
  }, [compareIds.length]);

  const closeCompare = useCallback(() => {
    setIsCompareOpen(false);
  }, []);

  const comparePlanets: (PlanetData | undefined)[] = compareIds.map((id) =>
    getPlanetById(id)
  );

  return {
    compareIds,
    comparePlanets,
    addToCompare,
    removeFromCompare,
    toggleCompare,
    isInCompare,
    clearCompare,
    isCompareOpen,
    openCompare,
    closeCompare,
    canCompare: compareIds.length >= 2,
  };
};
