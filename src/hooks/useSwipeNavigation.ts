import { useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useHapticFeedback } from "./useHapticFeedback";

interface SwipeConfig {
  minSwipeDistance?: number;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  enableHaptics?: boolean;
}

export const useSwipeNavigation = (config: SwipeConfig = {}) => {
  const { minSwipeDistance = 50, onSwipeLeft, onSwipeRight, enableHaptics = true } = config;
  const navigate = useNavigate();
  const haptics = useHapticFeedback();
  
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const [isSwiping, setIsSwiping] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState<"left" | "right" | null>(null);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchEndX.current = null;
    touchStartX.current = e.targetTouches[0].clientX;
    setIsSwiping(true);
    setSwipeDirection(null);
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
      if (enableHaptics) haptics.medium();
      setSwipeDirection("left");
      onSwipeLeft();
    } else if (isRightSwipe && onSwipeRight) {
      if (enableHaptics) haptics.medium();
      setSwipeDirection("right");
      onSwipeRight();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  }, [minSwipeDistance, onSwipeLeft, onSwipeRight, enableHaptics, haptics]);

  return {
    handlers: {
      onTouchStart: handleTouchStart,
      onTouchMove: handleTouchMove,
      onTouchEnd: handleTouchEnd,
    },
    isSwiping,
    swipeDirection,
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
      navigate(`/planet/${prevPlanet}`, { state: { direction: "right" } });
    }
  }, [prevPlanet, navigate]);

  const goToNextPlanet = useCallback(() => {
    if (nextPlanet) {
      navigate(`/planet/${nextPlanet}`, { state: { direction: "left" } });
    }
  }, [nextPlanet, navigate]);

  const swipe = useSwipeNavigation({
    minSwipeDistance: 80,
    onSwipeLeft: goToNextPlanet,
    onSwipeRight: goToPrevPlanet,
    enableHaptics: true,
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