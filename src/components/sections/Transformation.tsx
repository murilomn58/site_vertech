"use client";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function Transformation() {
  const t = useTranslations("solutions");
  const pains = t.raw("painPoints") as Array<{
    title: string;
    description: string;
  }>;
  const solutions = t.raw("solutionPoints") as Array<{
    title: string;
    description: string;
  }>;

  return (
    <section className="py-24 bg-gradient-to-b from-bg-mid to-bg-light">
      <div className="max-w-5xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-heading font-bold text-center text-navy mb-16"
        >
          {t("title")}
        </motion.h2>
        <div className="space-y-6">
          {pains.map((pain, i) => (
            <div
              key={i}
              className="grid md:grid-cols-[1fr_auto_1fr] gap-4 items-center"
            >
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="bg-red-50 rounded-xl p-5 border border-red-200"
              >
                <h4 className="font-heading font-semibold text-red-700">
                  {pain.title}
                </h4>
                <p className="text-red-600/70 text-sm mt-1">
                  {pain.description}
                </p>
              </motion.div>
              <div className="hidden md:flex items-center text-2xl text-cyan font-bold">
                &rarr;
              </div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 + 0.1 }}
                className="bg-cyan/5 rounded-xl p-5 border border-cyan/20"
              >
                <h4 className="font-heading font-semibold text-navy">
                  {solutions[i].title}
                </h4>
                <p className="text-navy/70 text-sm mt-1">
                  {solutions[i].description}
                </p>
              </motion.div>
            </div>
          ))}
        </div>
        <div className="mt-16 h-px bg-gradient-to-r from-transparent via-cyan/30 to-transparent" />
      </div>
    </section>
  );
}
