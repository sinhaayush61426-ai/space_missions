import { useState, useEffect, useCallback } from "react";

const FAVORITES_KEY = "favorite-planets";

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(FAVORITES_KEY);
    if (stored) {
      try {
        setFavorites(JSON.parse(stored));
      } catch {
        setFavorites([]);
      }
    }
  }, []);

  const toggleFavorite = useCallback((planetId: string) => {
    setFavorites((prev) => {
      const newFavorites = prev.includes(planetId)
        ? prev.filter((id) => id !== planetId)
        : [...prev, planetId];
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
      return newFavorites;
    });
  }, []);

  const isFavorite = useCallback(
    (planetId: string) => favorites.includes(planetId),
    [favorites]
  );

  return { favorites, toggleFavorite, isFavorite };
};
