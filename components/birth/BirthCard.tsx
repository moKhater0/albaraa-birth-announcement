"use client";

import { motion } from "motion/react";
import { birthData } from "@/data/birth";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { SectionTitle } from "@/components/ui/SectionTitle";

export function BirthCard() {
  const { baby, birthCard } = birthData;
  return (
    <section className="birth-card-section">
      <SectionContainer>
        <SectionTitle>{birthCard.title}</SectionTitle>
        <div className="floating-facts">
          <motion.article className="fact-cloud" initial={{ opacity: 0, x: 45 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} animate={{ y: [0, -6, 0] }} transition={{ y: { repeat: Infinity, duration: 4.8 } }}>
            <span>{birthCard.nameLabel}</span><strong className="display-name-small">{baby.name}</strong>
          </motion.article>
          <motion.article className="fact-calendar" initial={{ opacity: 0, x: -45 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} animate={{ y: [0, 7, 0] }} transition={{ y: { repeat: Infinity, duration: 5.6, delay: 0.4 } }}>
            <div className="calendar-rings" aria-hidden="true"><i/><i/></div><span>{birthCard.dateLabel}</span><strong>{baby.day} · {baby.date}</strong>
          </motion.article>
          <motion.div className="fact-star" aria-hidden="true" animate={{ rotate: [-4, 4, -4], y: [0, -8, 0] }} transition={{ duration: 5, repeat: Infinity }}>★</motion.div>
          <motion.div className="fact-balloon" aria-hidden="true" animate={{ y: [0, -15, 0] }} transition={{ duration: 5.8, repeat: Infinity }}><span /></motion.div>
        </div>
      </SectionContainer>
    </section>
  );
}
