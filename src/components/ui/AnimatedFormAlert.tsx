"use client";

import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { ReactNode } from "react";

interface AnimatedFormAlertProps {
  isVisible: boolean;
  children: ReactNode;
  className?: string;
  role?: string;
  "aria-live"?: "polite" | "assertive" | "off";
}

export function AnimatedFormAlert({ 
  isVisible, 
  children, 
  className = "", 
  role = "alert", 
  "aria-live": ariaLive = "polite" 
}: AnimatedFormAlertProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return isVisible ? (
      <div className={className} role={role} aria-live={ariaLive}>
        {children}
      </div>
    ) : null;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={className}
          role={role}
          aria-live={ariaLive}
          initial={{ opacity: 0, height: 0, overflow: "hidden" }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
