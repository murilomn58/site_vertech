"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";

/* Mini-site de padaria (nicho quente) — o conteúdo que rola dentro do browser */
function MiniSitePadaria() {
  return (
    <div className="font-display text-[#f3e7d3]" style={{ background: "#180f08" }}>
      {/* hero */}
      <div className="relative flex h-[26rem] flex-col items-center justify-center overflow-hidden px-6 text-center">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 80% at 50% 10%, rgba(232,163,61,0.35), transparent 55%), radial-gradient(80% 60% at 50% 110%, rgba(193,80,33,0.5), transparent 60%)",
          }}
        />
        <div className="relative">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#e8a33d]">
            Desde 1987 · Bagé
          </p>
          <h3 className="mt-3 text-4xl font-bold leading-none text-[#f8ecd8]">
            Padaria
            <br />
            <span style={{ color: "#e8a33d" }}>da Vila</span>
          </h3>
          <p className="mt-3 text-xs text-[#d8c4a4]">
            Pão quentinho saindo do forno, todo dia às 6h.
          </p>
          <span className="mt-5 inline-block rounded-full bg-[#e8a33d] px-5 py-2 text-xs font-semibold text-[#180f08]">
            Ver o cardápio
          </span>
        </div>
      </div>

      {/* produtos */}
      <div className="px-6 pb-8 pt-2">
        <p className="text-center text-[10px] uppercase tracking-[0.25em] text-[#e8a33d]">
          Saídos do forno
        </p>
        <div className="mt-4 grid grid-cols-2 gap-3">
          {[
            { n: "Pão na chapa", g: "linear-gradient(135deg,#c97f2e,#8a4a1d)" },
            { n: "Sonho de creme", g: "linear-gradient(135deg,#e8a33d,#b06a22)" },
            { n: "Croissant", g: "linear-gradient(135deg,#d79544,#9c5a24)" },
            { n: "Pão de queijo", g: "linear-gradient(135deg,#e2b15a,#a9742d)" },
          ].map((p) => (
            <div key={p.n} className="overflow-hidden rounded-2xl bg-[#21140a]">
              <div className="h-16 w-full" style={{ background: p.g }} />
              <p className="px-3 py-2 text-[11px] font-semibold text-[#f3e7d3]">{p.n}</p>
            </div>
          ))}
        </div>
      </div>

      {/* cta */}
      <div className="px-6 pb-10">
        <div className="rounded-3xl border border-[#e8a33d]/30 bg-[#21140a] p-6 text-center">
          <p className="text-lg font-bold text-[#f8ecd8]">Encomende pelo WhatsApp</p>
          <p className="mt-1 text-[11px] text-[#d8c4a4]">
            A gente separa quentinho pra você buscar.
          </p>
          <span className="mt-4 inline-block rounded-full bg-[#25D366] px-5 py-2 text-xs font-semibold text-white">
            Fazer pedido
          </span>
        </div>
      </div>
    </div>
  );
}

export function BrowserDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  return (
    <div ref={ref} className="mx-auto w-full max-w-md">
      <div className="overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_40px_90px_-25px_rgba(0,0,0,0.8)]">
        {/* chrome */}
        <div className="flex items-center gap-2 border-b border-line bg-navy-deep px-4 py-2.5">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
          </div>
          <div className="ml-2 flex flex-1 items-center gap-2 rounded-md bg-surface-2 px-3 py-1">
            <svg viewBox="0 0 24 24" className="h-3 w-3 fill-none stroke-ink-faint" strokeWidth="2">
              <rect x="5" y="11" width="14" height="9" rx="2" />
              <path d="M8 11V7a4 4 0 0 1 8 0v4" />
            </svg>
            <span className="font-mono text-[10px] text-ink-muted">padaria-da-vila.com.br</span>
          </div>
        </div>

        {/* viewport com auto-scroll (tour) */}
        <div className="relative h-[26rem] overflow-hidden bg-[#180f08]">
          <motion.div
            className="absolute inset-x-0 top-0"
            animate={inView && !reduced ? { y: ["0%", "-56%", "-56%", "0%"] } : { y: "0%" }}
            transition={{
              duration: 13,
              repeat: Infinity,
              ease: "easeInOut",
              times: [0, 0.45, 0.55, 1],
            }}
          >
            <MiniSitePadaria />
          </motion.div>
          {/* brilho de varredura */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#180f08]/40 to-transparent" />
        </div>
      </div>

      <p className="mt-4 text-center font-mono text-[11px] uppercase tracking-[0.2em] text-ink-faint">
        Cada nicho ganha a sua própria cara
      </p>
    </div>
  );
}
