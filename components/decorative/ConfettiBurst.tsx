"use client";

import { motion } from "motion/react";

export function ConfettiBurst() {
  return (
    <div className="confetti" aria-hidden="true">
      {Array.from({ length: 12 }).map((_, index) => (
        <motion.i key={index} style={{ rotate: `${index * 30}deg` }} initial={{ x: 0, y: 0, opacity: 1, scale: 0.5 }} animate={{ x: Math.cos(index * 0.52) * (55 + (index % 3) * 16), y: Math.sin(index * 0.52) * (55 + (index % 3) * 16), opacity: 0, scale: 1 }} transition={{ duration: 0.8, ease: "easeOut" }} />
      ))}
    </div>
  );
}
