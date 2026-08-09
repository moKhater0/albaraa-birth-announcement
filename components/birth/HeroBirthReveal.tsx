"use client";

import { motion } from "motion/react";
import { birthData } from "@/data/birth";
import { MOTION_EASE } from "@/lib/constants";
import { AnimatedClouds } from "@/components/decorative/AnimatedClouds";
import { FlyingBirds } from "@/components/decorative/FlyingBirds";
import { FloatingStars } from "@/components/decorative/FloatingStars";
import { SoftSun } from "@/components/decorative/SoftSun";

export function HeroBirthReveal() {
  const { hero, baby } = birthData;
  return (
    <section className="hero" aria-labelledby="hero-name">
      <SoftSun />
      <FloatingStars count={10} />
      <AnimatedClouds count={6} />
      <FlyingBirds />
      <motion.div className="hero-copy" initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.18, delayChildren: 0.35 } } }}>
        <motion.p variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: MOTION_EASE } } }} className="hero-basmala">{hero.topText}</motion.p>
        <motion.p variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: MOTION_EASE } } }} className="hero-announcement">{hero.announcement}</motion.p>
        <motion.div variants={{ hidden: { opacity: 0, y: 26, scale: 0.94 }, show: { opacity: 1, y: 0, scale: 1, transition: { duration: 1.05, ease: MOTION_EASE } } }} className="name-lockup">
          <span className="name-kicker" aria-hidden="true">✦</span>
          <h1 id="hero-name">{baby.name}</h1>
          <svg className="name-trail" viewBox="0 0 430 58" aria-hidden="true">
            <motion.path d="M18 31C94 9 143 48 216 28c66-18 124-12 195 2" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ delay: 1.28, duration: 1.3, ease: MOTION_EASE }}/>
            <path d="m396 21 19 8-16 12" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.div>
        <motion.p variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.7 } } }} className="hero-subtitle">{hero.subtitle}</motion.p>
        <motion.div variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }} className="date-pill">{baby.day}<span>·</span>{baby.date}</motion.div>
      </motion.div>
      <a className="scroll-cue" href="#welcome" aria-label="انتقل إلى رسالة الترحيب"><span />مرّر واكتشف الحكاية</a>
      <div className="hero-cloud-floor" aria-hidden="true" />
    </section>
  );
}
