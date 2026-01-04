import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useKeyboardNavigation = (
  prevId: string | null,
  nextId: string | null
) => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" && prevId) {
        navigate(`/planet/${prevId}`, { state: { direction: "right" } });
      } else if (e.key === "ArrowRight" && nextId) {
        navigate(`/planet/${nextId}`, { state: { direction: "left" } });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [prevId, nextId, navigate]);
};
