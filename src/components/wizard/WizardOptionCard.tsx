"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = {
  icon?: string;
  label: string;
  description?: string;
  badge?: string;
  selected: boolean;
  disabled?: boolean;
  onClick: () => void;
};

export function WizardOptionCard({
  icon,
  label,
  description,
  badge,
  selected,
  disabled,
  onClick,
}: Props) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={disabled}
      whileHover={disabled ? undefined : { scale: 1.02, y: -2 }}
      whileTap={disabled ? undefined : { scale: 0.98 }}
      animate={
        selected
          ? {
              borderColor: "rgba(34,211,238,1)",
              boxShadow:
                "0 0 0 1px rgba(34,211,238,0.5), 0 20px 40px rgba(8,145,178,0.15)",
            }
          : {
              borderColor: "rgba(255,255,255,0.1)",
              boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
            }
      }
      transition={{ duration: 0.25 }}
      className={cn(
        "relative w-full text-left p-4 md:p-5 bg-bg-mid/80 backdrop-blur-md border-2 rounded-xl transition-opacity",
        disabled ? "opacity-35 cursor-not-allowed" : "cursor-pointer",
      )}
    >
      {selected && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-2.5 right-2.5 md:top-3 md:right-3 w-5 h-5 md:w-6 md:h-6 rounded-full bg-cyan text-bg-dark flex items-center justify-center text-xs font-bold shadow-lg shadow-cyan/30"
        >
          ✓
        </motion.span>
      )}

      {badge && !selected && (
        <span className="absolute top-2.5 right-2.5 md:top-3 md:right-3 text-[10px] font-mono uppercase tracking-wider text-cyan-bright bg-cyan/15 border border-cyan/40 px-1.5 py-0.5 rounded">
          {badge}
        </span>
      )}

      <div className="flex items-start gap-3 pr-8">
        {icon && (
          <span className="text-2xl md:text-3xl shrink-0 leading-none">{icon}</span>
        )}
        <div className="min-w-0">
          <h3 className="font-heading font-semibold text-base md:text-lg text-off-white leading-tight">
            {label}
          </h3>
          {description && (
            <p className="mt-1 text-xs md:text-sm text-off-white/60 leading-snug">
              {description}
            </p>
          )}
        </div>
      </div>
    </motion.button>
  );
}
