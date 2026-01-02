import { useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";

interface SwipeConfig {
  minSwipeDistance?: number;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
}

export const useSwipeNavigation = (config: SwipeConfig = {}) => {
  const { minSwipeDistance = 50, onSwipeLeft, onSwipeRight } = config;
  const navigate = useNavigate();
  
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const [isSwiping, setIsSwiping] = useState(false);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchEndX.current = null;
    touchStartX.current = e.targetTouches[0].clientX;
    setIsSwiping(true);
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(() => {
    setIsSwiping(false);
    
    if (!touchStartX.current || !touchEndX.current) return;
    
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && onSwipeLeft) {
      onSwipeLeft();
    } else if (isRightSwipe && onSwipeRight) {
      onSwipeRight();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  }, [minSwipeDistance, onSwipeLeft, onSwipeRight]);

  return {
    handlers: {
      onTouchStart: handleTouchStart,
      onTouchMove: handleTouchMove,
      onTouchEnd: handleTouchEnd,
    },
    isSwiping,
  };
};

// Planet navigation helper
export const usePlanetSwipeNavigation = (
  currentPlanetId: string,
  planetIds: string[]
) => {
  const navigate = useNavigate();
  
  const currentIndex = planetIds.indexOf(currentPlanetId);
  const prevPlanet = currentIndex > 0 ? planetIds[currentIndex - 1] : null;
  const nextPlanet = currentIndex < planetIds.length - 1 ? planetIds[currentIndex + 1] : null;

  const goToPrevPlanet = useCallback(() => {
    if (prevPlanet) {
      navigate(`/planet/${prevPlanet}`);
    }
  }, [prevPlanet, navigate]);

  const goToNextPlanet = useCallback(() => {
    if (nextPlanet) {
      navigate(`/planet/${nextPlanet}`);
    }
  }, [nextPlanet, navigate]);

  const swipe = useSwipeNavigation({
    minSwipeDistance: 80,
    onSwipeLeft: goToNextPlanet,
    onSwipeRight: goToPrevPlanet,
  });

  return {
    ...swipe,
    prevPlanet,
    nextPlanet,
    currentIndex,
    totalPlanets: planetIds.length,
    goToPrevPlanet,
    goToNextPlanet,
  };
};