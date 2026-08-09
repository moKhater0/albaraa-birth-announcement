"use client";

import { motion } from "motion/react";
import { birthData } from "@/data/birth";
import { EveningMoon } from "@/components/decorative/EveningMoon";
import { FloatingStars } from "@/components/decorative/FloatingStars";
import { SectionContainer } from "@/components/ui/SectionContainer";

export function PrayerSection() {
  return (
    <section className="prayer-section" aria-labelledby="prayer-title">
      <FloatingStars count={15} night />
      <EveningMoon />
      <div className="distant-bird" aria-hidden="true">⌁</div>
      <SectionContainer>
        <motion.div className="prayer-copy" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.45 }} variants={{ show: { transition: { staggerChildren: 0.24 } } }}>
          <motion.span className="prayer-kicker" variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}>✦ ✦ ✦</motion.span>
          <motion.h2 id="prayer-title" variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}>{birthData.prayer.title}</motion.h2>
          {birthData.prayer.text.map((line) => <motion.p key={line} variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: 0.65 } } }}>{line}</motion.p>)}
        </motion.div>
      </SectionContainer>
      <div className="evening-cloud-floor" aria-hidden="true" />
    </section>
  );
}
