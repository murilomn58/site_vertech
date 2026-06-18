"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  /** atraso em segundos (use index * 0.08 para stagger em grids) */
  delay?: number;
  /** deslocamento vertical inicial em px */
  y?: number;
  once?: boolean;
};

/**
 * Reveal on scroll. Conteudo entra com fade + subida suave quando vira a
 * viewport. SEO-safe: o texto esta no DOM (SSR), so a opacidade anima.
 * Reduced-motion: o motion respeita automaticamente via CSS global.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 26,
  once = true,
}: Props) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.2 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
