"use client";

import { motion } from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type Props = { className?: string; count?: number; calm?: boolean };

export function CloudShape({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 250 110" aria-hidden="true">
      <path d="M19 94c-10 0-18-8-18-18s8-18 18-18c3 0 6 1 8 2 6-20 24-34 46-34 8 0 16 2 23 6C107 13 127 1 150 1c31 0 57 23 61 53h6c18 0 32 14 32 31 0 6-2 12-5 17H27c-3-2-6-5-8-8Z" fill="currentColor"/>
    </svg>
  );
}

export function AnimatedClouds({ className = "", count = 5, calm = false }: Props) {
  const reduced = useReducedMotion();
  return (
    <div className={`cloud-field ${className}`} aria-hidden="true">
      {Array.from({ length: Math.min(count, 6) }).map((_, index) => (
        <motion.div
          className={`drift-cloud cloud-${index + 1}`}
          key={index}
          animate={reduced ? undefined : { x: [0, index % 2 ? -24 : 28, 0], y: [0, index % 2 ? 4 : -5, 0] }}
          transition={{ duration: (calm ? 24 : 17) + index * 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <CloudShape />
        </motion.div>
      ))}
    </div>
  );
}
