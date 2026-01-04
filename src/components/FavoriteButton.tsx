import { Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useFavorites } from "@/hooks/useFavorites";
import { useHapticFeedback } from "@/hooks/useHapticFeedback";

interface FavoriteButtonProps {
  planetId: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const FavoriteButton = ({ planetId, size = "md", className = "" }: FavoriteButtonProps) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const haptics = useHapticFeedback();
  const favorite = isFavorite(planetId);

  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
  };

  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24,
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    haptics.light();
    toggleFavorite(planetId);
  };

  return (
    <button
      onClick={handleClick}
      className={`${sizeClasses[size]} rounded-full bg-background/80 backdrop-blur-sm border border-border/50 flex items-center justify-center transition-all hover:bg-background hover:scale-110 ${className}`}
      aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={favorite ? "filled" : "empty"}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          <Heart
            size={iconSizes[size]}
            className={favorite ? "fill-primary text-primary" : "text-muted-foreground"}
          />
        </motion.div>
      </AnimatePresence>
    </button>
  );
};

export default FavoriteButton;
