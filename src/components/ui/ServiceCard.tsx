"use client";
import { motion } from "framer-motion";

type ServiceCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
};

export default function ServiceCard({ icon, title, description, index }: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="glass rounded-2xl p-6 hover:border-cyan/50 hover:shadow-[0_0_30px_rgba(34,211,238,0.15)] transition-all duration-300"
    >
      <div className="w-12 h-12 rounded-xl bg-cyan/10 flex items-center justify-center text-cyan mb-4">
        {icon}
      </div>
      <h3 className="font-heading font-semibold text-xl text-white mb-2">{title}</h3>
      <p className="text-off-white/70 text-sm leading-relaxed">{description}</p>
    </motion.div>
  );
}
