"use client";

import { motion } from "motion/react";
import { ReactNode } from "react";
import { staggerStandard } from "@/lib/motion";

interface AnimatedHeroProps {
  children: ReactNode;
  className?: string;
}

export function AnimatedHero({ children, className = "" }: AnimatedHeroProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerStandard,
            delayChildren: 0.1
          }
        }
      }}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedHeroItem({ children, className = "" }: AnimatedHeroProps) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 15 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: {
            duration: 0.6,
            ease: [0.4, 0, 0.2, 1]
          }
        }
      }}
    >
      {children}
    </motion.div>
  );
}
