"use client";

import { motion } from "motion/react";
import { ReactNode } from "react";
import { durationStandard, easeEnter } from "@/lib/motion";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  type?: "fadeUp" | "fade";
  id?: string;
}

export function AnimatedSection({ 
  children, 
  className = "", 
  delay = 0,
  type = "fadeUp",
  id
}: AnimatedSectionProps) {
  const hidden = type === "fadeUp" 
    ? { opacity: 0, y: 15 } 
    : { opacity: 0 };

  const visible = type === "fadeUp"
    ? { opacity: 1, y: 0, transition: { duration: durationStandard, ease: easeEnter, delay } }
    : { opacity: 1, transition: { duration: durationStandard, ease: easeEnter, delay } };

  return (
    <motion.section
      id={id}
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={{ hidden, visible }}
    >
      {children}
    </motion.section>
  );
}
