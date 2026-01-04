import { useCallback } from "react";

type HapticPattern = "light" | "medium" | "heavy" | "success" | "warning" | "error";

const patterns: Record<HapticPattern, number | number[]> = {
  light: 10,
  medium: 25,
  heavy: 50,
  success: [10, 50, 10],
  warning: [25, 50, 25],
  error: [50, 100, 50],
};

export const useHapticFeedback = () => {
  const isSupported = typeof navigator !== "undefined" && "vibrate" in navigator;

  const vibrate = useCallback(
    (pattern: HapticPattern = "light") => {
      if (!isSupported) return false;

      try {
        return navigator.vibrate(patterns[pattern]);
      } catch {
        return false;
      }
    },
    [isSupported]
  );

  const cancel = useCallback(() => {
    if (!isSupported) return;
    navigator.vibrate(0);
  }, [isSupported]);

  return {
    isSupported,
    vibrate,
    cancel,
    // Convenience methods
    light: useCallback(() => vibrate("light"), [vibrate]),
    medium: useCallback(() => vibrate("medium"), [vibrate]),
    heavy: useCallback(() => vibrate("heavy"), [vibrate]),
    success: useCallback(() => vibrate("success"), [vibrate]),
    warning: useCallback(() => vibrate("warning"), [vibrate]),
    error: useCallback(() => vibrate("error"), [vibrate]),
  };
};
