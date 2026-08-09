"use client";

import { motion } from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function FloatingStars({ count = 10, night = false }: { count?: number; night?: boolean }) {
  const reduced = useReducedMotion();
  return (
    <div className={`stars-field ${night ? "night-stars" : ""}`} aria-hidden="true">
      {Array.from({ length: Math.min(count, 15) }).map((_, index) => (
        <motion.span
          key={index}
          className={`spark spark-${index + 1}`}
          animate={reduced ? undefined : { opacity: [0.28, 1, 0.28], scale: [0.75, 1.12, 0.75] }}
          transition={{ duration: 2.2 + (index % 4) * 0.7, repeat: Infinity, delay: index * 0.22 }}
        >{index % 3 === 0 ? "✦" : "•"}</motion.span>
      ))}
    </div>
  );
}
