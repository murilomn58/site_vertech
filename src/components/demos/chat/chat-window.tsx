"use client";

import { AnimatePresence, motion, useInView } from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { ChatLine } from "./script";

type Shown = { from: "user" | "bot"; text: string; id: number };

type Props = {
  script: ChatLine[];
  name?: string;
  status?: string;
};

/**
 * Janela de chat animada (demo client-only, zero backend). Começa quando entra
 * na viewport: digita, mostra o typing indicator e empurra as bolhas. Reduced
 * motion: mostra o transcript inteiro de uma vez.
 */
export function ChatWindow({
  script,
  name = "Leila IA",
  status = "online · responde na hora",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const [shown, setShown] = useState<Shown[]>([]);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    if (!inView) return;
    let cancelled = false;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setShown(script.map((l, i) => ({ from: l.from, text: l.text, id: i })));
      return;
    }
    const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));
    (async () => {
      for (let i = 0; i < script.length; i++) {
        const line = script[i];
        if (cancelled) return;
        if (line.from === "bot") {
          setTyping(true);
          await wait(line.delay ?? 1200);
          if (cancelled) return;
          setTyping(false);
        } else {
          await wait(line.delay ?? 700);
        }
        if (cancelled) return;
        setShown((p) => [...p, { from: line.from, text: line.text, id: i }]);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [inView, script]);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [shown, typing]);

  return (
    <div
      ref={ref}
      className="relative mx-auto flex h-[30rem] w-full max-w-sm flex-col overflow-hidden rounded-[2rem] border border-line bg-navy-deep shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)]"
    >
      {/* halo cyan */}
      <div className="pointer-events-none absolute -inset-px rounded-[2rem] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]" />

      {/* header */}
      <div className="flex items-center gap-3 border-b border-line bg-surface/60 px-4 py-3 backdrop-blur">
        <div className="relative h-9 w-9 flex-none">
          <Image
            src="/images/leila-avatar.jpg"
            alt="Leila IA"
            fill
            sizes="36px"
            className="rounded-full object-cover"
          />
          <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-navy-deep bg-whatsapp" />
        </div>
        <div className="min-w-0">
          <p className="truncate font-display text-sm font-semibold text-ink">{name}</p>
          <p className="truncate text-[11px] text-cyan-bright">{status}</p>
        </div>
      </div>

      {/* corpo */}
      <div
        ref={scrollRef}
        className="flex-1 space-y-2.5 overflow-y-auto px-4 py-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <AnimatePresence initial={false}>
          {shown.map((m) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 10, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className={
                m.from === "user" ? "flex justify-end" : "flex justify-start"
              }
            >
              <div
                className={
                  m.from === "user"
                    ? "max-w-[78%] rounded-2xl rounded-br-md bg-cyan px-3.5 py-2 text-sm leading-snug text-navy-deep"
                    : "max-w-[80%] rounded-2xl rounded-bl-md bg-surface-2 px-3.5 py-2 text-sm leading-snug text-ink"
                }
              >
                {m.text}
              </div>
            </motion.div>
          ))}
          {typing && (
            <motion.div
              key="typing"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex justify-start"
            >
              <div className="flex items-center gap-1 rounded-2xl rounded-bl-md bg-surface-2 px-4 py-3">
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    className="h-1.5 w-1.5 rounded-full bg-ink-muted"
                    animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: i * 0.18,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* input decorativo */}
      <div className="flex items-center gap-2 border-t border-line bg-surface/40 px-3 py-2.5">
        <div className="flex-1 rounded-full bg-surface-2 px-4 py-2 text-xs text-ink-faint">
          Pergunte alguma coisa...
        </div>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan text-navy-deep">
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
            <path d="M2 21l21-9L2 3v7l15 2-15 2z" />
          </svg>
        </div>
      </div>
    </div>
  );
}
