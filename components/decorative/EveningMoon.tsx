"use client";

import { motion } from "motion/react";

export function EveningMoon() {
  return (
    <motion.div className="evening-moon" aria-hidden="true" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1.1 }}>
      <svg viewBox="0 0 120 120"><path d="M84 99A49 49 0 0 1 58 7a45 45 0 1 0 26 92Z" fill="currentColor"/><circle cx="91" cy="31" r="4" fill="currentColor"/><circle cx="102" cy="49" r="2.5" fill="currentColor"/></svg>
    </motion.div>
  );
}
