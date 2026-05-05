import { useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useSwipeNavigation } from "./useSwipeNavigation";

export const useExoplanetKeyboardNavigation = (
  prevId: string | null,
  nextId: string | null
) => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" && prevId) {
        navigate(`/exoplanet/${prevId}`, { state: { direction: "right" } });
      } else if (e.key === "ArrowRight" && nextId) {
        navigate(`/exoplanet/${nextId}`, { state: { direction: "left" } });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [prevId, nextId, navigate]);
};

export const useExoplanetSwipeNavigation = (
  currentId: string,
  ids: string[]
) => {
  const navigate = useNavigate();

  const currentIndex = ids.indexOf(currentId);
  const prevId = currentIndex > 0 ? ids[currentIndex - 1] : null;
  const nextId = currentIndex < ids.length - 1 ? ids[currentIndex + 1] : null;

  const goToPrev = useCallback(() => {
    if (prevId) navigate(`/exoplanet/${prevId}`, { state: { direction: "right" } });
  }, [prevId, navigate]);

  const goToNext = useCallback(() => {
    if (nextId) navigate(`/exoplanet/${nextId}`, { state: { direction: "left" } });
  }, [nextId, navigate]);

  const swipe = useSwipeNavigation({
    minSwipeDistance: 80,
    onSwipeLeft: goToNext,
    onSwipeRight: goToPrev,
    enableHaptics: true,
  });

  return {
    ...swipe,
    prevId,
    nextId,
    currentIndex,
    total: ids.length,
  };
};
