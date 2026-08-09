"use client";

import { motion } from "motion/react";
import { birthData } from "@/data/birth";
import { DecorativeLeaves } from "@/components/decorative/DecorativeLeaves";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { SectionTitle } from "@/components/ui/SectionTitle";

function BranchBirds() {
  return (
    <svg className="branch-birds" viewBox="0 0 520 180" aria-hidden="true">
      <path d="M25 138c127-30 291-25 468 9" fill="none" stroke="#749888" strokeWidth="7" strokeLinecap="round"/>
      <path d="M119 119c-14-27-49-33-68-15 22 4 31 17 36 34 13 1 23-5 32-19Zm78 5c16-30 52-34 72-12-23 1-35 15-41 32-13 0-23-7-31-20Z" fill="#CDEAF4" stroke="#344A45" strokeWidth="4"/>
      <circle cx="104" cy="111" r="3" fill="#344A45"/><circle cx="213" cy="115" r="3" fill="#344A45"/>
      <path d="M93 98c5-9 13-12 21-10M206 101c-4-9-11-13-20-12" fill="none" stroke="#344A45" strokeWidth="4" strokeLinecap="round"/>
      <path d="M332 142c17-33 45-48 73-56-4 30-27 47-73 56Zm58-3c23-28 52-34 80-31-14 28-41 37-80 31Z" fill="#BFE3D0"/>
      <path d="m163 55 7 12 14 3-10 10 2 14-13-7-13 7 3-14-10-10 14-3 6-12Z" fill="#F7DEA1"/>
    </svg>
  );
}

export function ParentsMessage() {
  return (
    <section className="parents-section">
      <SectionContainer>
        <motion.div className="parents-copy" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }}>
          <SectionTitle>{birthData.parentsMessage.title}</SectionTitle>
          <div className="parents-lines">{birthData.parentsMessage.lines.map((line) => <p key={line}>{line}</p>)}</div>
        </motion.div>
        <BranchBirds />
        <DecorativeLeaves className="parents-leaves" />
      </SectionContainer>
    </section>
  );
}
