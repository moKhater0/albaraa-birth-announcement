"use client";

import { motion } from "motion/react";
import { birthData } from "@/data/birth";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { SectionTitle } from "@/components/ui/SectionTitle";

function Bassinet() {
  return (
    <motion.div className="bassinet-wrap" initial={{ opacity: 0, x: -35 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.35 }} transition={{ duration: 0.85 }}>
      <svg viewBox="0 0 430 340" aria-hidden="true">
        <path d="M111 111c17-54 57-83 111-84 63-2 106 32 122 89" fill="none" stroke="#749888" strokeWidth="7" strokeLinecap="round"/>
        <path d="M218 29v50M172 73l15 20m82-20-15 20" stroke="#749888" strokeWidth="5" strokeLinecap="round"/>
        <path d="M204 89c-14 8-18 25-8 38 11 14 33 10 39-5-20 4-33-12-31-33Z" fill="#F7DEA1"/>
        <path d="m161 105 6 12 13 2-10 9 3 13-12-6-11 6 2-13-10-9 14-2 5-12Zm116 6 4 9 10 1-8 7 2 10-8-5-9 5 2-10-7-7 10-1 4-9Z" fill="#FFF9EF"/>
        <path d="M75 168h284c-8 84-59 126-142 126-86 0-133-45-142-126Z" fill="#CDEAF4" stroke="#344A45" strokeWidth="6"/>
        <path d="M84 179c49 28 208 28 266-1" fill="none" stroke="#fff" strokeWidth="9" opacity=".7"/>
        <path d="M126 295h181M143 295l-18 27m164-27 18 27" fill="none" stroke="#749888" strokeWidth="7" strokeLinecap="round"/>
        <path d="M144 226c36-24 106-29 150 7-14 34-44 54-79 54-33 0-58-20-71-61Z" fill="#BFE3D0"/>
        <circle cx="221" cy="218" r="34" fill="#F3C8B5"/><path d="M206 220c7 6 16 6 23 0" fill="none" stroke="#344A45" strokeWidth="3" strokeLinecap="round"/>
      </svg>
    </motion.div>
  );
}

export function WelcomeSection() {
  return (
    <section id="welcome" className="welcome-section">
      <SectionContainer className="welcome-grid">
        <motion.div className="welcome-copy" initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }}>
          <SectionTitle>{birthData.welcome.title}</SectionTitle>
          <p>{birthData.welcome.text}</p>
          <div className="hanging-stars" aria-hidden="true"><span>✦</span><span>★</span><span>✦</span></div>
        </motion.div>
        <Bassinet />
      </SectionContainer>
    </section>
  );
}
