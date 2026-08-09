"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { birthData } from "@/data/birth";
import { ConfettiBurst } from "@/components/decorative/ConfettiBurst";
import { CloudShape } from "@/components/decorative/AnimatedClouds";
import { SectionContainer } from "@/components/ui/SectionContainer";

export function BabyReveal() {
  const [revealed, setRevealed] = useState(false);
  const [imageMissing, setImageMissing] = useState(false);
  const { baby, reveal } = birthData;
  return (
    <section className="baby-reveal-section" aria-labelledby="reveal-heading">
      <SectionContainer>
        <motion.div className="reveal-intro" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <span aria-hidden="true">☁</span>
          <h2 id="reveal-heading">{reveal.teaser}</h2>
        </motion.div>
        <div className={`photo-stage ${revealed ? "is-revealed" : ""}`}>
          <motion.div className="photo-organic-frame" animate={revealed ? { opacity: 1, scale: 1 } : { opacity: 0.7, scale: 0.94 }} transition={{ duration: 0.75 }}>
            <div className="photo-placeholder"><strong>{reveal.placeholderTitle}</strong><span>{reveal.placeholderText}</span></div>
            {!imageMissing && <Image src={baby.photo} alt={baby.photoAlt} fill sizes="(max-width: 700px) 90vw, 560px" priority={false} onError={() => setImageMissing(true)} />}
          </motion.div>
          <AnimatePresence>
            {!revealed && (
              <>
                <motion.div className="cover-cloud cover-right" exit={{ x: "74%", opacity: 0 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}><CloudShape /></motion.div>
                <motion.div className="cover-cloud cover-left" exit={{ x: "-74%", opacity: 0 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}><CloudShape /></motion.div>
              </>
            )}
          </AnimatePresence>
          {revealed && <ConfettiBurst />}
        </div>
        {!revealed && <motion.button className="primary-button reveal-button" type="button" onClick={() => setRevealed(true)} whileTap={{ scale: 0.97 }}>{reveal.button}<span aria-hidden="true">✦</span></motion.button>}
      </SectionContainer>
    </section>
  );
}
