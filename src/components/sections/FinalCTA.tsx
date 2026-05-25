"use client";
import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import Button from "@/components/ui/Button";

export default function FinalCTA() {
  const t = useTranslations("finalCta");
  const locale = useLocale();

  return (
    <section className="py-24 bg-bg-dark relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan/5 via-transparent to-cyan/5" />
      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold">
            <span className="gradient-text">{t("title")}</span>
          </h2>
          <p className="mt-4 text-off-white/60 text-lg">{t("description")}</p>
          <div className="mt-10">
            <Button
              href={`/${locale}`}
              className="!text-lg md:!text-xl !px-10 md:!px-14 !py-5 md:!py-6 !rounded-xl"
            >
              {t("button")} →
            </Button>
            <p className="mt-4 text-xs md:text-sm text-off-white/40 font-mono uppercase tracking-widest">
              2min · descobre o melhor caminho pra você
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
