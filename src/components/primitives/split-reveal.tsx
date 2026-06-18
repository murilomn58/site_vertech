"use client";

import { motion } from "motion/react";

type Props = {
  text: string;
  className?: string;
  /** atraso base antes do primeiro pedaco */
  delay?: number;
  /** divide por palavra (default) ou por linha inteira */
  by?: "word";
  as?: "h1" | "h2" | "p" | "span";
};

/**
 * Reveal cinematografico de headline: divide o texto em palavras e sobe cada
 * uma com stagger (clip mascara). Feito em React (nao GSAP SplitText) para ser
 * SSR-safe e sem risco de hydration: as palavras sao texto real no DOM.
 */
export function SplitReveal({
  text,
  className,
  delay = 0,
  as = "h1",
}: Props) {
  const words = text.split(" ");
  const Tag = motion[as];

  return (
    <Tag
      className={className}
      initial="hidden"
      animate="visible"
      transition={{ staggerChildren: 0.06, delayChildren: delay }}
      aria-label={text}
    >
      {words.map((word, i) => (
        <span
          key={i}
          aria-hidden
          style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top" }}
        >
          <motion.span
            style={{ display: "inline-block", willChange: "transform" }}
            variants={{
              hidden: { y: "115%" },
              visible: { y: 0 },
            }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
