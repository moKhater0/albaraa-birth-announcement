"use client";

import { motion } from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function SoftSun() {
  const reduced = useReducedMotion();
  return (
    <motion.div className="soft-sun" aria-hidden="true" animate={reduced ? undefined : { scale: [1, 1.045, 1] }} transition={{ duration: 6, repeat: Infinity }}>
      <span />
    </motion.div>
  );
}
