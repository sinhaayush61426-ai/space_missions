import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
  direction?: "left" | "right" | "none";
}

const variants: Variants = {
  initial: (direction: "left" | "right" | "none") => ({
    x: direction === "none" ? 0 : direction === "left" ? "100%" : "-100%",
    opacity: direction === "none" ? 1 : 0,
  }),
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      x: { type: "spring" as const, stiffness: 300, damping: 30 },
      opacity: { duration: 0.2 },
    },
  },
  exit: (direction: "left" | "right" | "none") => ({
    x: direction === "none" ? 0 : direction === "left" ? "-100%" : "100%",
    opacity: direction === "none" ? 1 : 0,
    transition: {
      x: { type: "spring" as const, stiffness: 300, damping: 30 },
      opacity: { duration: 0.2 },
    },
  }),
};

const PageTransition = ({ children, direction = "none" }: PageTransitionProps) => {
  return (
    <motion.div
      custom={direction}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants}
      className="w-full"
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
