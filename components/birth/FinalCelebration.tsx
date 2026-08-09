"use client";

import { motion } from "motion/react";
import { birthData } from "@/data/birth";
import { Balloons } from "@/components/decorative/Balloons";
import { DecorativeLeaves } from "@/components/decorative/DecorativeLeaves";
import { ShareButton } from "./ShareButton";

function downloadCard() {
  const { baby, hero } = birthData;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1920" viewBox="0 0 1080 1920">
  <defs><linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#CDEAF4"/><stop offset="1" stop-color="#FFF9EF"/></linearGradient><filter id="shadow"><feDropShadow dx="0" dy="16" stdDeviation="18" flood-color="#344A45" flood-opacity=".14"/></filter></defs>
  <rect width="1080" height="1920" fill="url(#sky)"/><circle cx="840" cy="250" r="125" fill="#F7DEA1" opacity=".8"/>
  <g fill="#FFFEFA" filter="url(#shadow)"><ellipse cx="210" cy="330" rx="190" ry="80"/><ellipse cx="350" cy="310" rx="155" ry="110"/><ellipse cx="835" cy="535" rx="220" ry="95"/><ellipse cx="700" cy="510" rx="130" ry="100"/><ellipse cx="270" cy="1530" rx="250" ry="110"/><ellipse cx="520" cy="1580" rx="280" ry="130"/></g>
  <g fill="#749888"><path d="M105 560q55-60 110 0-55-28-110 0Zm130-25q42-46 84 0-42-21-84 0Z"/><path d="M790 370q45-50 90 0-45-23-90 0Z"/></g>
  <g text-anchor="middle" fill="#344A45" font-family="Cairo,Arial,sans-serif"><text x="540" y="730" font-size="48">${hero.topText}</text><text x="540" y="1010" font-size="220" font-weight="700" font-family="'Aref Ruqaa',serif">${baby.name}</text><path d="M290 1065Q540 1115 790 1065" fill="none" stroke="#749888" stroke-width="14" stroke-linecap="round"/><text x="540" y="1210" font-size="76" font-weight="700">${hero.subtitle}</text><text x="540" y="1350" font-size="52">${baby.day} · ${baby.date}</text></g>
  <g fill="#F7DEA1"><path d="m130 910 13 27 30 4-22 21 5 30-26-14-27 14 5-30-21-21 29-4 14-27Z"/><circle cx="900" cy="930" r="15"/><circle cx="835" cy="1050" r="9"/></g><path d="M0 1750Q260 1620 540 1760t540-15v175H0Z" fill="#BFE3D0"/></svg>`;
  const blob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a"); link.href = url; link.download = "albaraa-birth-card-1080x1920.svg"; link.click();
  URL.revokeObjectURL(url);
}

export function FinalCelebration() {
  const { baby, final } = birthData;
  return (
    <footer className="final-section">
      <Balloons /><DecorativeLeaves className="final-leaves" />
      <div className="final-cloud final-cloud-one" aria-hidden="true"/><div className="final-cloud final-cloud-two" aria-hidden="true"/>
      <motion.div className="final-copy" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <span className="final-spark" aria-hidden="true">✦</span><h2>{final.title}</h2>
        <p>{baby.day} · {baby.date}</p>
        <div className="final-actions"><ShareButton/><button className="secondary-button" type="button" onClick={downloadCard}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v12m0 0 5-5m-5 5-5-5M5 20h14"/></svg>{final.download}</button></div>
      </motion.div>
      <p className="made-with">صُنعت بكل الحب لاستقبال {baby.name} 🤍</p>
    </footer>
  );
}
