"use client";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Accordion from "@/components/ui/Accordion";

export default function FAQ() {
  const t = useTranslations("faq");
  const items = t.raw("items") as Array<{
    question: string;
    answer: string;
  }>;

  return (
    <section id="faq" className="py-24 bg-bg-light">
      <div className="max-w-3xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-heading font-bold text-navy text-center mb-12"
        >
          {t("title")}
        </motion.h2>
        <div>
          {items.map((item, i) => (
            <Accordion
              key={i}
              question={item.question}
              answer={item.answer}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
