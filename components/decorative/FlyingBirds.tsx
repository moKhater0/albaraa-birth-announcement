"use client";

import { motion } from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

function Bird({ dove = false, reduced = false }: { dove?: boolean; reduced?: boolean }) {
  return (
    <svg viewBox="0 0 74 42" aria-hidden="true">
      <path d={dove ? "M7 27c12 0 19-6 27-9 8-3 16 0 21 7 6-4 10-5 16-4-5 6-11 10-20 10-10 10-24 10-33 2L7 27Z" : "M7 26c11 0 18-5 26-8 7-2 14 1 19 7 7-3 12-3 17-1-7 6-14 8-22 8-8 7-21 6-29 1L7 26Z"} fill="currentColor" />
      <motion.path d={dove ? "M20 25C11 17 8 8 10 3c11 5 20 10 28 19Z" : "M21 25C13 18 10 10 12 5c10 5 18 10 25 18Z"} fill="currentColor" style={{ transformOrigin: "30px 24px" }} animate={reduced ? undefined : { rotate: [-8, 13, -8], scaleY: [.82, 1.08, .82] }} transition={{ duration: dove ? .7 : .9, repeat: Infinity, ease: "easeInOut" }}/>
      <motion.path d={dove ? "M43 24C52 15 61 10 69 11c-2 9-9 15-20 18Z" : "M43 25c8-7 16-10 24-8-4 7-10 11-19 13Z"} fill="currentColor" opacity=".9" style={{ transformOrigin: "44px 25px" }} animate={reduced ? undefined : { rotate: [7, -9, 7] }} transition={{ duration: dove ? .7 : .9, repeat: Infinity, ease: "easeInOut" }}/>
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
    { top: "57%", delay: 5.5, duration: 24, dove: false },
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
          <Bird dove={bird.dove} reduced={reduced} />
        </motion.div>
      ))}
    </div>
  );
}
