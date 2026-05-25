"use client";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { CanvasErrorBoundary } from "@/components/3d/ErrorBoundary";
import Button from "@/components/ui/Button";

const HeroMesh = dynamic(() => import("@/components/3d/HeroMesh"), {
  ssr: false,
});

const GradientFallback = () => (
  <div className="absolute inset-0 bg-gradient-to-br from-bg-dark via-navy to-bg-dark" />
);

export default function Hero() {
  const t = useTranslations("hero");
  const locale = useLocale();
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center bg-bg-dark overflow-clip"
    >
      <div className="absolute inset-0 z-0">
        <CanvasErrorBoundary fallback={<GradientFallback />}>
          <Suspense fallback={<GradientFallback />}>
            <HeroMesh />
          </Suspense>
        </CanvasErrorBoundary>
      </div>
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full glass text-cyan text-sm font-heading mb-6">
            {t("badge")}
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white leading-tight">
            {t("title")}{" "}
            <span className="gradient-text">{t("titleHighlight")}</span>{" "}
            {t("titleEnd")}
          </h1>
          <p className="mt-6 text-lg text-off-white/70 max-w-2xl mx-auto leading-relaxed">
            {t("description")}
          </p>
          <div className="mt-10">
            <Button
              href={`/${locale}`}
              className="!text-lg md:!text-xl !px-10 md:!px-14 !py-5 md:!py-6 !rounded-xl"
            >
              {t("cta")} →
            </Button>
            <p className="mt-4 text-xs md:text-sm text-off-white/40 font-mono uppercase tracking-widest">
              2min · descobre o melhor caminho pra você
            </p>
          </div>
        </motion.div>
      </div>
      <motion.div
        animate={{ y: [0, 12, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center pt-2">
          <div className="w-1.5 h-1.5 rounded-full bg-cyan" />
        </div>
      </motion.div>
    </section>
  );
}
