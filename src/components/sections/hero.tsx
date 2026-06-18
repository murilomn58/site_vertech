"use client";

import { motion } from "motion/react";
import { MeshBg } from "@/components/primitives/mesh-bg";
import { HeroVideo } from "@/components/primitives/hero-video";
import { SplitReveal } from "@/components/primitives/split-reveal";
import { WaCta } from "@/components/primitives/wa-cta";
import { ArrowRight } from "@/components/primitives/icons";

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: 0.5 + i * 0.12, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-5 pt-28 pb-16 text-center sm:px-8"
    >
      {/* z-0: fundo mesh gradient (shader) */}
      <div className="absolute inset-0 z-0">
        <MeshBg />
      </div>
      {/* z-1: slot do vídeo IA (null por enquanto) */}
      <HeroVideo />
      {/* z-10: overlays de legibilidade */}
      <div className="absolute inset-0 z-10 bg-bg-dark/55" />
      <div className="absolute inset-0 z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_45%,transparent,rgba(8,13,26,0.85))]" />
      <div className="absolute inset-x-0 bottom-0 z-10 h-40 bg-gradient-to-t from-bg-dark to-transparent" />

      {/* z-30: conteúdo */}
      <div className="relative z-30 mx-auto flex max-w-4xl flex-col items-center">
        <motion.span
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="glass mb-7 inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-mono text-xs uppercase tracking-[0.18em] text-cyan-bright"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-cyan" />
          </span>
          Assistentes de IA · Apps · Sites
        </motion.span>

        <h1 className="font-display text-[2.6rem] font-bold leading-[1.05] tracking-tight text-ink sm:text-6xl lg:text-[4.5rem]">
          <SplitReveal
            as="span"
            text="Sua empresa atendendo e vendendo"
            delay={0.15}
            className="block"
          />
          <motion.span
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="mt-1 block text-gradient"
          >
            no piloto automático.
          </motion.span>
        </h1>

        <motion.p
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mt-7 max-w-2xl text-balance text-base leading-relaxed text-ink-muted sm:text-lg"
        >
          A Vertech constrói assistentes de IA, aplicativos e sites que trabalham
          pela sua empresa. Role e veja os exemplos funcionando de verdade.
          Gostou de um? Chama no WhatsApp que a gente faz o seu.
        </motion.p>

        <motion.div
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mt-9 flex flex-col items-center gap-3 sm:flex-row"
        >
          <a
            href="#vitrine"
            className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-cyan px-7 py-3.5 font-display text-base font-semibold tracking-tight text-navy-deep shadow-[0_8px_30px_-6px_rgba(34,211,238,0.5)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-cyan-bright hover:shadow-[0_12px_44px_-4px_rgba(34,211,238,0.75)]"
          >
            Ver os exemplos ao vivo
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
          <WaCta intent="outro" variant="whatsapp" size="lg">
            Chamar no WhatsApp
          </WaCta>
        </motion.div>

        <motion.p
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mt-10 font-mono text-xs uppercase tracking-[0.15em] text-ink-faint"
        >
          Já em produção · Leila IA · OdontoConnect · Messiê Forró · VertechNews
        </motion.p>
      </div>

      {/* indicador de scroll */}
      <motion.a
        href="#vitrine"
        aria-label="Rolar para os exemplos"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-6 left-1/2 z-30 -translate-x-1/2"
      >
        <span className="flex h-9 w-5 items-start justify-center rounded-full border border-ink-muted/40 p-1">
          <motion.span
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="h-1.5 w-1 rounded-full bg-cyan"
          />
        </span>
      </motion.a>
    </section>
  );
}
