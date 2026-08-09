"use client";

import { AnimatePresence, motion } from "motion/react";
import { birthData } from "@/data/birth";
import { useShare } from "@/hooks/useShare";

export function ShareButton() {
  const { share, toast } = useShare();
  return (
    <>
      <button className="primary-button" type="button" onClick={share}>
        <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.6 10.5 6.8-4M8.6 13.5l6.8 4"/></svg>{birthData.final.share}
      </button>
      <AnimatePresence>{toast && <motion.div className="toast" role="status" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>{toast}</motion.div>}</AnimatePresence>
    </>
  );
}
