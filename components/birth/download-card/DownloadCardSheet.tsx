"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { toPng } from "html-to-image";
import { birthData } from "@/data/birth";
import { BirthDownloadCard, CARD_DIMENSIONS, type DownloadCardFormat } from "./BirthDownloadCard";

async function waitForCardAssets(node: HTMLElement) {
  await document.fonts.ready;
  const images = Array.from(node.querySelectorAll("img"));
  await Promise.all(images.map(async (image) => {
    if (image.complete && image.naturalWidth > 0) {
      await image.decode().catch(() => undefined);
      return;
    }
    await new Promise<void>((resolve) => {
      image.addEventListener("load", () => resolve(), { once: true });
      image.addEventListener("error", () => resolve(), { once: true });
    });
  }));
}

async function verifyPngDimensions(dataUrl: string, width: number, height: number) {
  await new Promise<void>((resolve, reject) => {
    const image = new window.Image();
    image.onload = () => image.naturalWidth === width && image.naturalHeight === height ? resolve() : reject(new Error("INVALID_PNG_SIZE"));
    image.onerror = () => reject(new Error("INVALID_PNG"));
    image.src = dataUrl;
  });
}

export function DownloadCardSheet() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<DownloadCardFormat>("story");
  const [exporting, setExporting] = useState(false);
  const [exportError, setExportError] = useState("");
  const dialogRef = useRef<HTMLDivElement>(null);
  const exportRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dimensions = CARD_DIMENSIONS[selected];

  useEffect(() => {
    if (!open) return;
    closeButtonRef.current?.focus();
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
      if (event.key === "Tab" && dialogRef.current) {
        const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>("button:not([disabled])"));
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  async function exportPng() {
    const node = exportRef.current;
    if (!node || exporting) return;
    setExporting(true);
    setExportError("");
    try {
      await waitForCardAssets(node);
      const dataUrl = await toPng(node, {
        width: dimensions.width,
        height: dimensions.height,
        canvasWidth: dimensions.width,
        canvasHeight: dimensions.height,
        pixelRatio: 1,
        cacheBust: true,
        backgroundColor: "#FFF9EF",
      });
      await verifyPngDimensions(dataUrl, dimensions.width, dimensions.height);
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `albaraa-birth-announcement-${selected}.png`;
      link.click();
      setExportError(birthData.downloadCard.downloaded);
    } catch {
      setExportError("تعذر تجهيز الكارت حاليًا. حاول مرة تانية.");
    } finally {
      setExporting(false);
    }
  }

  const sheet = (
    <AnimatePresence>
      {open && (
        <motion.div className="download-sheet-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(event) => { if (event.target === event.currentTarget) setOpen(false); }}>
          <motion.div ref={dialogRef} className="download-sheet" role="dialog" aria-modal="true" aria-labelledby="download-sheet-title" initial={{ opacity: 0, y: 45, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 35, scale: .98 }} transition={{ duration: .35, ease: [0.22, 1, 0.36, 1] }}>
            <div className="sheet-handle" aria-hidden="true"/>
            <button ref={closeButtonRef} className="sheet-close" type="button" onClick={() => setOpen(false)} aria-label={birthData.downloadCard.close}>×</button>
            <div className="sheet-heading"><span aria-hidden="true">✦</span><h2 id="download-sheet-title">{birthData.downloadCard.sheetTitle}</h2><p>{birthData.final.download}</p></div>

            <div className="download-sheet-layout">
              <div className={`download-preview-frame preview-${selected}`} aria-hidden="true">
                <BirthDownloadCard format={selected} preview/>
              </div>
              <div className="format-options" role="radiogroup" aria-label={birthData.downloadCard.sheetTitle}>
                {(["story", "post"] as const).map((format) => {
                  const option = birthData.downloadCard[format];
                  return (
                    <button key={format} type="button" role="radio" aria-checked={selected === format} className={`format-option ${selected === format ? "is-selected" : ""}`} onClick={() => { setSelected(format); setExportError(""); }}>
                      <span className={`format-thumbnail thumb-${format}`} aria-hidden="true"><i/><b>ا</b></span>
                      <span className="format-copy"><strong>{option.label}</strong><bdi>{option.size}</bdi><small>{option.subtitle}</small></span>
                      <i className="format-check" aria-hidden="true">✓</i>
                    </button>
                  );
                })}
                <button className="primary-button export-button" type="button" disabled={exporting} onClick={exportPng}>{exporting ? <><i className="button-spinner" aria-hidden="true"/>{birthData.downloadCard.preparing}</> : <><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v12m0 0 5-5m-5 5-5-5M5 20h14"/></svg>{birthData.downloadCard.downloadAction}</>}</button>
                <span className="export-status" role="status">{exportError}</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <button className="secondary-button" type="button" onClick={() => setOpen(true)}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v12m0 0 5-5m-5 5-5-5M5 20h14"/></svg>{birthData.final.download}</button>
      {typeof document !== "undefined" && createPortal(sheet, document.body)}
      <div className="export-stage" aria-hidden="true"><BirthDownloadCard ref={exportRef} format={selected}/></div>
    </>
  );
}
