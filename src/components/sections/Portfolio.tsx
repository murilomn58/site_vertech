"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import FilterTabs from "@/components/ui/FilterTabs";
import BentoCard from "@/components/ui/BentoCard";
import Counter from "@/components/ui/Counter";

export default function Portfolio() {
  const t = useTranslations("portfolio");
  const [activeFilter, setActiveFilter] = useState("all");

  const filters = t.raw("filters") as Record<string, string>;
  const badges = t.raw("badges") as string[];
  const projects = t.raw("projectsData") as Array<{
    id: number;
    category: string;
    categoryLabel: string;
    title: string;
    pain: string;
    solution: string;
    metrics: string[];
    tags: string[];
  }>;

  const tabs = Object.entries(filters).map(([key, label]) => ({ key, label }));
  const filterMap: Record<string, string> = {
    iaAgents: "ia-agentes",
    automation: "automacao",
    apps: "apps",
    sites: "sites",
    dashboards: "dashboards",
  };
  const filtered =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.category === filterMap[activeFilter]);

  return (
    <section id="portfolio" className="py-24 bg-bg-mid">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white">
            {t("title")}{" "}
            <span className="gradient-text">{t("titleHighlight")}</span>
          </h2>
          <p className="mt-4 text-off-white/60">{t("subtitle")}</p>
        </motion.div>
        <div className="flex justify-center gap-12 mb-12">
          <Counter target={6} suffix="+" label={badges[0]} />
          <Counter target={2} label={badges[1]} />
          <Counter target={100} suffix="%" label={badges[2]} />
        </div>
        <FilterTabs
          tabs={tabs}
          active={activeFilter}
          onChange={setActiveFilter}
        />
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid md:grid-cols-3 gap-4 mt-8"
          >
            {filtered.map((project, i) => (
              <BentoCard
                key={project.id}
                size={i < 2 ? "large" : "small"}
                category={project.categoryLabel}
                title={project.title}
                pain={project.pain}
                solution={project.solution}
                metrics={project.metrics}
                tags={project.tags}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
