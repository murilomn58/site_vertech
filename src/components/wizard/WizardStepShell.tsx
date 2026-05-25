"use client";

import { useWizard, stepIndex } from "@/stores/wizard-store";
import { cn } from "@/lib/utils";

type Props = {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
  showPrev?: boolean;
  showNext?: boolean;
  nextLabel?: string;
  nextDisabled?: boolean;
  onNext?: () => void;
};

/**
 * Layout puro: title + subtitle + body + footer com botoes.
 * Sem motion.div externo (a animacao agora vive no Wizard.tsx,
 * como filho direto do AnimatePresence).
 */
export function WizardStepShell({
  title,
  subtitle,
  children,
  showPrev = true,
  showNext = true,
  nextLabel = "Próximo →",
  nextDisabled = false,
  onNext,
}: Props) {
  const cur = useWizard((s) => s.currentStep);
  const next = useWizard((s) => s.next);
  const prev = useWizard((s) => s.prev);
  const idx = stepIndex(cur);
  const isFirst = idx === 0;

  const handleNext = onNext ?? next;

  return (
    <div className="flex flex-col min-h-[calc(100vh-160px)]">
      <div className="flex-1 flex flex-col items-center justify-start md:justify-center px-4 md:px-12 pt-6 md:pt-10 pb-6">
        <div className="w-full max-w-3xl">
          <h2 className="text-center font-heading font-bold text-2xl sm:text-3xl md:text-4xl text-off-white leading-tight mb-2 md:mb-3">
            {title}
          </h2>
          {subtitle && (
            <p className="text-center text-sm md:text-base text-off-white/60 mb-6 md:mb-8 max-w-xl mx-auto">
              {subtitle}
            </p>
          )}
          <div className="mt-2">{children}</div>
        </div>
      </div>

      <div className="sticky bottom-0 left-0 right-0 px-4 md:px-12 py-3 md:py-5 border-t border-white/10 bg-bg-dark/90 backdrop-blur-xl z-20">
        <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
          {showPrev ? (
            <button
              type="button"
              onClick={prev}
              disabled={isFirst}
              className="flex-1 md:flex-initial md:min-w-[140px] px-4 md:px-5 py-3 font-heading font-medium tracking-wide text-sm md:text-base text-off-white/70 hover:text-off-white border-2 border-white/15 hover:border-white/30 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              ← Voltar
            </button>
          ) : (
            <div className="flex-1 md:flex-initial md:min-w-[140px]" />
          )}
          {showNext && (
            <button
              type="button"
              onClick={handleNext}
              disabled={nextDisabled}
              className={cn(
                "flex-1 md:flex-initial md:min-w-[180px] px-4 md:px-5 py-3 font-heading font-semibold tracking-wide text-sm md:text-base rounded-lg transition-all",
                nextDisabled
                  ? "bg-white/5 text-off-white/30 cursor-not-allowed"
                  : "bg-gradient-to-r from-cyan via-cyan-bright to-cyan text-bg-dark hover:shadow-lg hover:shadow-cyan/40 hover:scale-[1.02] active:scale-100",
              )}
            >
              {nextLabel}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
