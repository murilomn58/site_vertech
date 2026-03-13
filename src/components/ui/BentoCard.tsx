"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type BentoCardProps = {
  size: "large" | "small";
  category: string;
  title: string;
  pain: string;
  solution: string;
  metrics: string[];
  tags: string[];
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function BentoCard({ size, category, title, pain, solution, metrics, tags }: BentoCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={cn(
        "group relative glass rounded-2xl p-6 overflow-hidden cursor-pointer transition-all duration-300",
        size === "large" ? "md:col-span-2 md:row-span-2" : ""
      )}
    >
      <span className="text-xs font-heading text-cyan uppercase tracking-wider">{category}</span>
      <h3 className={cn("font-heading font-bold text-white mt-2", size === "large" ? "text-2xl" : "text-lg")}>{title}</h3>
      <p className="text-off-white/60 text-sm mt-2">{solution}</p>
      {/* Hover overlay with metrics */}
      <div className="absolute inset-0 bg-bg-dark/90 flex flex-col items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6">
        <div className="flex flex-wrap gap-2 justify-center">
          {metrics.map((m, i) => (
            <span key={i} className="px-3 py-1 rounded-full bg-cyan/20 text-cyan text-sm font-heading font-semibold">{m}</span>
          ))}
        </div>
        <div className="flex flex-wrap gap-1 justify-center mt-2">
          {tags.map((tag, i) => (
            <span key={i} className="text-xs text-off-white/50">{tag}{i < tags.length - 1 ? " · " : ""}</span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
