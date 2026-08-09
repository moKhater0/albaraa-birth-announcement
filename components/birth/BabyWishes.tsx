"use client";

import { FormEvent, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { birthData, type Wish } from "@/data/birth";
import { WISHES_STORAGE_KEY } from "@/lib/constants";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { SectionTitle } from "@/components/ui/SectionTitle";

export function BabyWishes() {
  const [wishes, setWishes] = useState<Wish[]>([...birthData.wishes.samples]);
  const [author, setAuthor] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const stored = localStorage.getItem(WISHES_STORAGE_KEY);
        if (stored) setWishes([...birthData.wishes.samples, ...(JSON.parse(stored) as Wish[])]);
      } catch { /* storage is optional */ }
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  function submitWish(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const cleanAuthor = author.trim();
    const cleanMessage = message.trim();
    if (!cleanAuthor || !cleanMessage) return;
    const wish: Wish = { id: crypto.randomUUID(), author: cleanAuthor, message: cleanMessage };
    setWishes((current) => [...current, wish]);
    try {
      const stored = JSON.parse(localStorage.getItem(WISHES_STORAGE_KEY) ?? "[]") as Wish[];
      localStorage.setItem(WISHES_STORAGE_KEY, JSON.stringify([...stored, wish]));
    } catch { /* storage is optional */ }
    setAuthor(""); setMessage(""); setStatus(birthData.wishes.success);
    window.setTimeout(() => setStatus(""), 2600);
  }

  return (
    <section className="wishes-section">
      <SectionContainer>
        <SectionTitle>{birthData.wishes.title}</SectionTitle>
        <div className="wish-notes" aria-live="polite">
          <AnimatePresence initial={false}>
            {wishes.map((wish, index) => (
              <motion.article key={wish.id} className={`wish-note shape-${(index % 3) + 1}`} initial={{ opacity: 0, y: 24, scale: 0.94 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.55 }}>
                <span className="quote-mark" aria-hidden="true">“</span><p>{wish.message}</p><strong>— {wish.author}</strong>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
        <form className="wish-form" onSubmit={submitWish}>
          <div className="input-wrap"><label htmlFor="wish-name">{birthData.wishes.namePlaceholder}</label><input id="wish-name" value={author} onChange={(event) => setAuthor(event.target.value)} placeholder={birthData.wishes.namePlaceholder} required maxLength={40}/></div>
          <div className="input-wrap wide"><label htmlFor="wish-message">{birthData.wishes.messagePlaceholder}</label><textarea id="wish-message" value={message} onChange={(event) => setMessage(event.target.value)} placeholder={birthData.wishes.messagePlaceholder} required maxLength={220} rows={3}/></div>
          <button className="primary-button" type="submit">{birthData.wishes.submit}<span aria-hidden="true">↗</span></button>
          <span className="form-status" role="status">{status}</span>
        </form>
      </SectionContainer>
    </section>
  );
}
