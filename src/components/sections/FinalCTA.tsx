"use client";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Button from "@/components/ui/Button";
import { WHATSAPP_URL } from "@/lib/constants";

export default function FinalCTA() {
  const t = useTranslations("finalCta");

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
          <div className="mt-8">
            <Button href={WHATSAPP_URL} className="text-lg px-8 py-4">
              {t("button")}
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
