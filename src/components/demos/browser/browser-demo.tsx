"use client";

import Image from "next/image";
import { motion, useInView } from "motion/react";
import { useRef } from "react";

const serif = { fontFamily: "Georgia, 'Times New Roman', serif" } as const;

const PRODUTOS = [
  { img: "/images/mock/padaria/paes.jpg", n: "Pães artesanais", p: "R$ 9" },
  { img: "/images/mock/padaria/cesta.jpg", n: "Cesta da manhã", p: "R$ 39" },
  { img: "/images/mock/padaria/tortas.jpg", n: "Tortas e bolos", p: "R$ 18" },
  { img: "/images/mock/padaria/salgados.jpg", n: "Salgados assados", p: "R$ 7" },
];

/* Mini-site de padaria com fotos reais — o conteúdo que rola dentro do browser */
function MiniSitePadaria() {
  return (
    <div className="text-[#f3e7d3]" style={{ background: "#180f08" }}>
      {/* hero com foto */}
      <div className="relative h-[23rem] overflow-hidden">
        <Image
          src="/images/mock/padaria/hero.jpg"
          alt="Pães saindo do forno a lenha"
          fill
          sizes="500px"
          className="object-cover"
          priority
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, #180f08 6%, rgba(24,15,8,0.5) 48%, rgba(24,15,8,0.25))",
          }}
        />
        <div className="absolute inset-x-0 bottom-0 p-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#e8a33d]">
            Desde 1987 · Bagé
          </p>
          <h3 className="mt-2 text-4xl font-bold leading-[0.95] text-[#f8ecd8]" style={serif}>
            Padaria
            <br />
            da Vila
          </h3>
          <p className="mt-2 text-xs text-[#e7d4b4]">
            Pão quentinho saindo do forno, todo dia às 6h.
          </p>
          <span className="mt-4 inline-block rounded-full bg-[#e8a33d] px-5 py-2 text-xs font-semibold text-[#180f08]">
            Ver o cardápio
          </span>
        </div>
      </div>

      {/* produtos com foto */}
      <div className="px-5 pb-8 pt-7">
        <p className="text-center font-mono text-[10px] uppercase tracking-[0.25em] text-[#e8a33d]">
          Saídos do forno
        </p>
        <div className="mt-4 grid grid-cols-2 gap-3">
          {PRODUTOS.map((p) => (
            <div key={p.n} className="overflow-hidden rounded-2xl bg-[#21140a]">
              <div className="relative h-24 w-full">
                <Image src={p.img} alt={p.n} fill sizes="240px" className="object-cover" />
              </div>
              <div className="flex items-center justify-between px-3 py-2.5">
                <span className="text-[11px] font-semibold text-[#f3e7d3]">{p.n}</span>
                <span className="text-[11px] font-bold text-[#e8a33d]">{p.p}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* cta */}
      <div className="px-5 pb-10">
        <div className="rounded-3xl border border-[#e8a33d]/30 bg-[#21140a] p-6 text-center">
          <p className="text-lg font-bold text-[#f8ecd8]" style={serif}>
            Encomende pelo WhatsApp
          </p>
          <p className="mt-1 text-[11px] text-[#e7d4b4]">
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
            animate={inView && !reduced ? { y: ["0%", "-55%", "-55%", "0%"] } : { y: "0%" }}
            transition={{
              duration: 14,
              repeat: Infinity,
              ease: "easeInOut",
              times: [0, 0.45, 0.55, 1],
            }}
          >
            <MiniSitePadaria />
          </motion.div>
        </div>
      </div>

      <p className="mt-4 text-center font-mono text-[11px] uppercase tracking-[0.2em] text-ink-faint">
        Cada nicho ganha a sua própria cara
      </p>
    </div>
  );
}
