"use client";

import { motion } from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function Balloons() {
  const reduced = useReducedMotion();
  return (
    <div className="balloons" aria-hidden="true">
      {["mint", "butter", "sky"].map((color, index) => (
        <motion.span key={color} className={`balloon ${color}`} animate={reduced ? undefined : { y: [0, -12 - index * 3, 0], rotate: [0, index - 1, 0] }} transition={{ duration: 4.2 + index, repeat: Infinity, delay: index * 0.6 }}><i /></motion.span>
      ))}
    </div>
  );
}
