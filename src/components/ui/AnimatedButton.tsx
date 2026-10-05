"use client";

import { motion, useReducedMotion, HTMLMotionProps } from "motion/react";
import { ReactNode } from "react";

interface AnimatedButtonProps extends HTMLMotionProps<"button"> {
  children: ReactNode;
  className?: string;
}

export function AnimatedButton({ children, className = "", ...props }: AnimatedButtonProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.button
      className={className}
      whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
      transition={{ duration: 0.1 }}
      {...props}
    >
      {children}
    </motion.button>
  );
}
