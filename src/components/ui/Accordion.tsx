"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type AccordionProps = { question: string; answer: string };

export default function Accordion({ question, answer }: AccordionProps) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-navy/10">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-5 text-left">
        <span className="font-heading font-semibold text-navy text-lg">{question}</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }} className="text-cyan text-sm">
          &#9660;
        </motion.span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-navy/70 leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
