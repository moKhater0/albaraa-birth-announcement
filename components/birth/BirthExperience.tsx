"use client";

import { useEffect, useRef, useState } from "react";
import { HeroBirthReveal } from "./HeroBirthReveal";
import { WelcomeSection } from "./WelcomeSection";
import { BabyReveal } from "./BabyReveal";
import { BirthCard } from "./BirthCard";
import { ParentsMessage } from "./ParentsMessage";
import { BabyWishes } from "./BabyWishes";
import { PrayerSection } from "./PrayerSection";
import { FinalCelebration } from "./FinalCelebration";

function MusicControl() {
  const [available, setAvailable] = useState(false);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  useEffect(() => { fetch("/albaraa/audio/optional-background-music.mp3", { method: "HEAD" }).then((res) => setAvailable(res.ok)).catch(() => setAvailable(false)); }, []);
  if (!available) return null;
  async function toggle() {
    if (!audioRef.current) return;
    audioRef.current.volume = 0.3;
    if (playing) audioRef.current.pause(); else await audioRef.current.play();
    setPlaying(!playing);
  }
  return <div className="music-control"><audio ref={audioRef} src="/albaraa/audio/optional-background-music.mp3" loop/><button type="button" onClick={toggle} aria-label={playing ? "إيقاف الموسيقى" : "تشغيل الموسيقى"}>{playing ? "❚❚" : "♪"}</button></div>;
}

export function BirthExperience() {
  return (
    <main className="birth-experience">
      <HeroBirthReveal/><WelcomeSection/><BabyReveal/><BirthCard/><ParentsMessage/><BabyWishes/><PrayerSection/><FinalCelebration/><MusicControl/>
    </main>
  );
}
