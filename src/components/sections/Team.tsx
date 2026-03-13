"use client";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import FounderCard from "@/components/ui/FounderCard";
import { Zap, Shield, Medal, Lightbulb, CheckCircle, Users } from "lucide-react";

const VALUE_ICONS = [Zap, Shield, Medal, Lightbulb, CheckCircle, Users];

export default function Team() {
  const t = useTranslations();
  const members = t.raw("team.members") as Array<{
    name: string;
    role: string;
    education: string;
    educationFull: string;
    achievements: string[];
    photo: string;
    linkedin: string;
    linkedinText: string;
  }>;
  const values = t.raw("values.items") as Array<{
    title: string;
    description: string;
  }>;

  return (
    <section id="team" className="py-24 bg-bg-light">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-navy">
            {t("team.title")}
          </h2>
          <p className="mt-4 text-navy/60">{t("team.subtitle")}</p>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {members.map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
            >
              <FounderCard {...member} />
            </motion.div>
          ))}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {values.map((value, i) => {
            const Icon = VALUE_ICONS[i];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-4"
              >
                <Icon className="w-8 h-8 text-cyan mx-auto mb-2" />
                <p className="text-sm font-heading font-semibold text-navy">
                  {value.title}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
