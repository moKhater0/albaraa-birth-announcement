"use client";

import { motion } from "motion/react";
import { birthData } from "@/data/birth";
import { Balloons } from "@/components/decorative/Balloons";
import { DecorativeLeaves } from "@/components/decorative/DecorativeLeaves";
import { ShareButton } from "./ShareButton";
import { DownloadCardSheet } from "./download-card/DownloadCardSheet";

export function FinalCelebration() {
  const { baby, final } = birthData;
  return (
    <footer className="final-section">
      <Balloons/><DecorativeLeaves className="final-leaves"/>
      <div className="final-cloud final-cloud-one" aria-hidden="true"/><div className="final-cloud final-cloud-two" aria-hidden="true"/>
      <motion.div className="final-copy" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <span className="final-spark" aria-hidden="true">✦</span><h2>{final.title}</h2>
        <p>{baby.day} · {baby.date}</p>
        <div className="final-actions"><ShareButton/><DownloadCardSheet/></div>
      </motion.div>
      <p className="made-with">{final.madeWith} <a href={final.qissetnaWhatsapp} target="_blank" rel="noreferrer" aria-label="تواصل مع قصتنا عبر واتساب">{final.qissetna}</a></p>
    </footer>
  );
}
