"use client";

import { motion } from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

function Bird({ dove = false }: { dove?: boolean }) {
  return (
    <svg viewBox="0 0 74 42" aria-hidden="true">
      <path d={dove ? "M4 27c16-1 19-14 31-16 8-2 14 3 17 8 5-4 10-5 17-4-5 6-11 10-18 11-7 13-20 17-32 8-6-4-10-6-15-7Z" : "M3 25c9-1 14-8 20-14 5 7 9 11 14 12 6-4 12-7 21-5-7 5-11 10-20 11-8 1-13-3-16-6-5 3-11 4-19 2Z"} fill="currentColor" />
      {dove && <circle cx="48" cy="17" r="1.5" fill="#344A45" />}
    </svg>
  );
}

export function FlyingBirds({ calm = false }: { calm?: boolean }) {
  const reduced = useReducedMotion();
  const birds = [
    { top: "18%", delay: 0, duration: 15, dove: true },
    { top: "31%", delay: 3.5, duration: 19, dove: false },
    { top: "12%", delay: 7, duration: 22, dove: false },
    { top: "43%", delay: 10, duration: 18, dove: true },
  ];
  return (
    <div className={`birds-layer ${calm ? "birds-calm" : ""}`} aria-hidden="true">
      {birds.map((bird, index) => (
        <motion.div
          key={index}
          className={`flying-bird bird-${index + 1}`}
          style={{ top: bird.top }}
          initial={{ x: "-15vw", y: 0 }}
          animate={reduced ? { x: `${18 + index * 18}vw` } : { x: ["-15vw", "112vw"], y: [0, -10, 5, -4, 0] }}
          transition={{ x: { duration: bird.duration, repeat: Infinity, delay: bird.delay, ease: "linear" }, y: { duration: 5, repeat: Infinity, ease: "easeInOut" } }}
        >
          <Bird dove={bird.dove} />
        </motion.div>
      ))}
    </div>
  );
}
