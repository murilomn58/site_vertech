"use client";

import { useWizard, stepIndex } from "@/stores/wizard-store";
import { WIZARD_ORDER } from "@/types/wizard";
import { cn } from "@/lib/utils";

const LABELS: Record<string, string> = {
  interesse: "Interesse",
  dor: "Dor",
  sobreVoce: "Sobre você",
  fechar: "Marcar",
};

export function WizardProgress() {
  const cur = useWizard((s) => s.currentStep);
  const idx = stepIndex(cur);

  return (
    <div className="w-full max-w-2xl mx-auto px-4 pt-4 md:pt-6">
      <div className="flex items-center justify-between gap-1 md:gap-2">
        {WIZARD_ORDER.map((step, i) => {
          const done = i < idx;
          const active = i === idx;
          return (
            <div key={step} className="flex flex-col items-center gap-1.5 flex-1">
              <div
                className={cn(
                  "h-1 w-full rounded-full transition-all duration-300",
                  done && "bg-cyan",
                  active && "bg-cyan-bright shadow-[0_0_12px_rgba(103,232,249,0.6)]",
                  !done && !active && "bg-white/10",
                )}
              />
              <span
                className={cn(
                  "text-[10px] md:text-xs font-mono uppercase tracking-wider transition-colors",
                  active
                    ? "text-cyan-bright"
                    : done
                    ? "text-cyan/70"
                    : "text-white/30",
                )}
              >
                {LABELS[step]}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
