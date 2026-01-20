import { Scale } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useHapticFeedback } from "@/hooks/useHapticFeedback";

interface CompareButtonProps {
  planetId: string;
  isInCompare: boolean;
  onToggle: (planetId: string) => void;
  size?: "sm" | "md";
}

const CompareButton = ({
  planetId,
  isInCompare,
  onToggle,
  size = "sm",
}: CompareButtonProps) => {
  const haptics = useHapticFeedback();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    haptics.light();
    onToggle(planetId);
  };

  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
  };

  const iconSizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
  };

  return (
    <motion.button
      onClick={handleClick}
      whileTap={{ scale: 0.9 }}
      className={cn(
        "rounded-full flex items-center justify-center transition-all duration-200",
        sizeClasses[size],
        isInCompare
          ? "bg-accent text-accent-foreground"
          : "bg-muted/80 text-muted-foreground hover:bg-muted hover:text-foreground"
      )}
      title={isInCompare ? "Remove from comparison" : "Add to comparison"}
    >
      <Scale className={iconSizes[size]} />
    </motion.button>
  );
};

export default CompareButton;
