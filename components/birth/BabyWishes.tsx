"use client";

import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { birthData } from "@/data/birth";
import { WISH_COOLDOWN_KEY, WISH_COOLDOWN_MS } from "@/lib/constants";
import { fetchApprovedWishes, insertWish, subscribeToWishInserts, type Wish } from "@/lib/supabase/wishes";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { SectionTitle } from "@/components/ui/SectionTitle";

type LoadState = "loading" | "ready" | "error";

function WishesState({ state, onRetry }: { state: LoadState; onRetry: () => void }) {
  if (state === "ready") return null;
  return (
    <motion.div className={`wishes-state wishes-${state}`} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} role={state === "error" ? "alert" : "status"}>
      <div className="state-sky" aria-hidden="true"><span className="state-cloud"/><motion.span className="state-star" animate={{ opacity: [.3, 1, .3], rotate: [0, 8, 0] }} transition={{ duration: 2.2, repeat: Infinity }}>✦</motion.span><motion.span className="state-bird" animate={{ x: [-10, 18, -10], y: [0, -5, 0] }} transition={{ duration: 4, repeat: Infinity }}>⌁</motion.span></div>
      <p>{state === "loading" ? birthData.wishes.loading : birthData.wishes.loadError}</p>
      {state === "error" && <button type="button" onClick={onRetry}>{birthData.wishes.retry}</button>}
    </motion.div>
  );
}

function EmptyWishes() {
  return (
    <motion.div className="wishes-empty" initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }}>
      <div className="empty-cloud-art" aria-hidden="true"><span>✦</span><i/></div>
      <p>{birthData.wishes.empty}</p>
    </motion.div>
  );
}

export function BabyWishes() {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [loadState, setLoadState] = useState<LoadState>("loading");
  const [author, setAuthor] = useState("");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [coolingDown, setCoolingDown] = useState(false);
  const cooldownTimer = useRef<number | null>(null);

  const loadWishes = useCallback(async () => {
    setLoadState("loading");
    try {
      const rows = await fetchApprovedWishes();
      setWishes(rows);
      setLoadState("ready");
    } catch {
      setLoadState("error");
    }
  }, []);

  useEffect(() => {
    let active = true;
    void fetchApprovedWishes()
      .then((rows) => {
        if (!active) return;
        setWishes(rows);
        setLoadState("ready");
      })
      .catch(() => {
        if (active) setLoadState("error");
      });
    return () => { active = false; };
  }, []);

  useEffect(() => {
    const unsubscribe = subscribeToWishInserts((wish) => {
      setWishes((current) => current.some((item) => item.id === wish.id) ? current : [wish, ...current].slice(0, 50));
      setLoadState("ready");
    });
    return unsubscribe;
  }, []);

  useEffect(() => () => {
    if (cooldownTimer.current) window.clearTimeout(cooldownTimer.current);
  }, []);

  function beginCooldown(duration: number) {
    setCoolingDown(true);
    if (cooldownTimer.current) window.clearTimeout(cooldownTimer.current);
    cooldownTimer.current = window.setTimeout(() => setCoolingDown(false), duration);
  }

  async function submitWish(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting || honeypot.trim()) return;

    const cleanAuthor = author.trim();
    const cleanMessage = message.trim();
    if (!cleanAuthor || !cleanMessage || cleanAuthor.length > 50 || cleanMessage.length > 300) return;

    const cooldownUntil = Number(localStorage.getItem(WISH_COOLDOWN_KEY) ?? 0);
    if (cooldownUntil > Date.now()) {
      beginCooldown(cooldownUntil - Date.now());
      setStatus(birthData.wishes.cooldown);
      return;
    }

    setSubmitting(true);
    setStatus("");
    try {
      const inserted = await insertWish({ name: cleanAuthor, message: cleanMessage });
      setWishes((current) => current.some((item) => item.id === inserted.id) ? current : [inserted, ...current].slice(0, 50));
      setLoadState("ready");
      setAuthor("");
      setMessage("");
      setStatus(birthData.wishes.success);
      const until = Date.now() + WISH_COOLDOWN_MS;
      localStorage.setItem(WISH_COOLDOWN_KEY, String(until));
      beginCooldown(WISH_COOLDOWN_MS);
    } catch {
      setStatus(birthData.wishes.submitError);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="wishes-section">
      <SectionContainer>
        <SectionTitle>{birthData.wishes.title}</SectionTitle>
        <WishesState state={loadState} onRetry={loadWishes}/>
        {loadState === "ready" && wishes.length === 0 && <EmptyWishes/>}
        {loadState === "ready" && wishes.length > 0 && (
          <div className="wish-notes" aria-live="polite">
            <AnimatePresence initial={false}>
              {wishes.map((wish, index) => (
                <motion.article key={wish.id} className={`wish-note shape-${(index % 3) + 1}`} initial={{ opacity: 0, y: 24, scale: .94 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: .55 }}>
                  <span className="quote-mark" aria-hidden="true">“</span><p>{wish.message}</p><strong>— {wish.name}</strong>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
        )}
        <form className="wish-form" onSubmit={submitWish} noValidate>
          <div className="honeypot-field" aria-hidden="true"><label htmlFor="wish-website">Website</label><input id="wish-website" name="website" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(event) => setHoneypot(event.target.value)}/></div>
          <div className="input-wrap"><label htmlFor="wish-name">{birthData.wishes.namePlaceholder}</label><input id="wish-name" value={author} onChange={(event) => setAuthor(event.target.value)} placeholder={birthData.wishes.namePlaceholder} required maxLength={50}/></div>
          <div className="input-wrap wide"><label htmlFor="wish-message">{birthData.wishes.messagePlaceholder}</label><textarea id="wish-message" value={message} onChange={(event) => setMessage(event.target.value)} placeholder={birthData.wishes.messagePlaceholder} required maxLength={300} rows={3}/><span className="character-count">{message.length} / 300</span></div>
          <button className="primary-button" type="submit" disabled={submitting || coolingDown || !author.trim() || !message.trim()}>{submitting ? <><i className="button-spinner" aria-hidden="true"/>{birthData.wishes.submitting}</> : <>{birthData.wishes.submit}<span aria-hidden="true">↗</span></>}</button>
          <span className="form-status" role="status">{status}</span>
        </form>
      </SectionContainer>
    </section>
  );
}
