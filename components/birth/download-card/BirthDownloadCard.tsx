"use client";

import Image from "next/image";
import { forwardRef, useState } from "react";
import { birthData } from "@/data/birth";

export type DownloadCardFormat = "story" | "post";

export const CARD_DIMENSIONS: Record<DownloadCardFormat, { width: number; height: number }> = {
  story: { width: 1080, height: 1920 },
  post: { width: 1080, height: 1350 },
};

export const BirthDownloadCard = forwardRef<HTMLDivElement, { format: DownloadCardFormat; preview?: boolean }>(
  function BirthDownloadCard({ format, preview = false }, ref) {
    const [imageMissing, setImageMissing] = useState(false);
    const { baby, hero, downloadCard } = birthData;
    const dimensions = CARD_DIMENSIONS[format];

    return (
      <div
        ref={ref}
        className={`download-art download-art-${format} ${preview ? "download-art-preview" : ""}`}
        style={{ width: dimensions.width, height: dimensions.height }}
        dir="rtl"
        aria-label={`${downloadCard[format].label} بشارة ميلاد ${baby.name}`}
      >
        <div className="download-paper-grain" aria-hidden="true"/>
        <div className="download-sun" aria-hidden="true"/>
        <div className="download-cloud download-cloud-one" aria-hidden="true"><i/><i/></div>
        <div className="download-cloud download-cloud-two" aria-hidden="true"><i/><i/></div>
        <div className="download-cloud download-cloud-three" aria-hidden="true"><i/><i/></div>
        <div className="download-birds" aria-hidden="true"><span>⌁</span><span>⌁</span><span>⌁</span></div>
        <div className="download-stars" aria-hidden="true"><span>✦</span><span>•</span><span>✦</span><span>•</span></div>

        <header className="download-card-header">
          <p>{hero.topText}</p>
          <span aria-hidden="true"/>
        </header>

        <section className="download-name-lockup">
          <h2>{baby.name}</h2>
          <svg viewBox="0 0 520 64" aria-hidden="true"><path d="M22 34c91-28 162 24 239 0 76-23 148-17 237 2"/><path d="m476 26 22 10-19 14"/></svg>
          <p>{hero.subtitle}<span aria-hidden="true">✦</span></p>
        </section>

        <div className="download-photo-wrap">
          <div className="download-photo-placeholder"><strong>{birthData.reveal.placeholderTitle}</strong><span>{birthData.reveal.placeholderText}</span></div>
          {!imageMissing && <Image src={baby.photo} alt={baby.photoAlt} width={880} height={815} unoptimized onError={() => setImageMissing(true)}/>} 
          <div className="photo-edge-cloud photo-edge-cloud-a" aria-hidden="true"/>
          <div className="photo-edge-cloud photo-edge-cloud-b" aria-hidden="true"/>
          <span className="photo-star photo-star-a" aria-hidden="true">✦</span>
          <span className="photo-star photo-star-b" aria-hidden="true">✦</span>
        </div>

        <div className="download-date"><span>{baby.day}</span><i aria-hidden="true">·</i><span>{baby.date}</span></div>
        <footer className="download-card-footer">
          <p>{downloadCard.prayer}</p>
          <div><span>{downloadCard.brandArabic}</span><i>|</i><span>{downloadCard.brandEnglish}</span></div>
        </footer>
      </div>
    );
  },
);
