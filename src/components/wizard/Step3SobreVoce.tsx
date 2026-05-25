"use client";

import { motion } from "framer-motion";
import { WizardStepShell } from "./WizardStepShell";
import { useWizard } from "@/stores/wizard-store";
import { PORTES, URGENCIAS } from "@/lib/catalogo";
import { matchProduto } from "@/lib/matchEngine";
import { cn } from "@/lib/utils";
import type { Porte, Urgencia } from "@/types/wizard";

type ChipProps = {
  label: string;
  selected: boolean;
  badge?: string;
  onClick: () => void;
};

function Chip({ label, selected, badge, onClick }: ChipProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={{ scale: 0.96 }}
      className={cn(
        "relative px-4 py-3 rounded-xl font-heading font-medium text-sm md:text-base transition-all duration-200 backdrop-blur-md border-2",
        selected
          ? "bg-cyan/20 border-cyan text-cyan-bright shadow-lg shadow-cyan/20"
          : "bg-bg-mid/40 border-white/10 text-off-white/80 hover:border-white/30 hover:bg-bg-mid/60",
      )}
    >
      {label}
      {badge && (
        <span className="absolute -top-2 -right-2 text-[10px] font-mono uppercase tracking-wider bg-cyan-bright text-bg-dark px-1.5 py-0.5 rounded-full">
          {badge}
        </span>
      )}
    </motion.button>
  );
}

export function Step3SobreVoce() {
  const porte = useWizard((s) => s.porte);
  const urgencia = useWizard((s) => s.urgencia);
  const setPorte = useWizard((s) => s.setPorte);
  const setUrgencia = useWizard((s) => s.setUrgencia);
  const setMatch = useWizard((s) => s.setMatch);
  const next = useWizard((s) => s.next);
  const interesse = useWizard((s) => s.interesse);
  const dor = useWizard((s) => s.dor);

  const canAdvance = !!porte && !!urgencia;

  function handleNext() {
    const result = matchProduto({ interesse, dor, porte, urgencia });
    setMatch(result);
    next();
  }

  return (
    <WizardStepShell
      title="Sobre o seu negócio"
      subtitle="Pra dimensionar a solução e priorizar o follow-up."
      nextLabel="Continuar →"
      nextDisabled={!canAdvance}
      onNext={handleNext}
    >
      <div className="space-y-8 md:space-y-10">
        {/* Porte */}
        <div>
          <p className="font-heading font-semibold text-base md:text-lg text-off-white mb-3 flex items-center gap-2">
            <span className="text-xl">🏢</span> Qual o porte da operação?
          </p>
          <div className="grid grid-cols-2 gap-2 md:gap-3">
            {PORTES.map((opt) => (
              <Chip
                key={opt.id}
                label={opt.label}
                selected={porte === opt.id}
                onClick={() => setPorte(opt.id as Porte)}
              />
            ))}
          </div>
        </div>

        {/* Urgência */}
        <div>
          <p className="font-heading font-semibold text-base md:text-lg text-off-white mb-3 flex items-center gap-2">
            <span className="text-xl">⏰</span> Quando precisa rodando?
          </p>
          <div className="grid grid-cols-2 gap-2 md:gap-3">
            {URGENCIAS.map((opt) => (
              <Chip
                key={opt.id}
                label={opt.label}
                badge={opt.id === "pra-ontem" ? "🔥" : undefined}
                selected={urgencia === opt.id}
                onClick={() => setUrgencia(opt.id as Urgencia)}
              />
            ))}
          </div>
        </div>
      </div>
    </WizardStepShell>
  );
}
