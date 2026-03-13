"use client";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import ServiceCard from "@/components/ui/ServiceCard";
import { Smartphone, Bot, Cog, Monitor } from "lucide-react";

const ICONS = [
  <Smartphone key="0" className="w-6 h-6" />,
  <Bot key="1" className="w-6 h-6" />,
  <Cog key="2" className="w-6 h-6" />,
  <Monitor key="3" className="w-6 h-6" />,
];

export default function Services() {
  const t = useTranslations("features");
  const cards = t.raw("cards") as Array<{
    title: string;
    description: string;
  }>;

  return (
    <section
      id="services"
      className="py-24 bg-gradient-to-b from-bg-dark to-bg-mid"
    >
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white">
            {t("title")}{" "}
            <span className="gradient-text">{t("titleHighlight")}</span>
          </h2>
          <p className="mt-4 text-off-white/60 max-w-2xl mx-auto">
            {t("description")}
          </p>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-6">
          {cards.map((card, i) => (
            <ServiceCard
              key={i}
              icon={ICONS[i]}
              title={card.title}
              description={card.description}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
