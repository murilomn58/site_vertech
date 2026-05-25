"use client";

import { WizardStepShell } from "./WizardStepShell";
import { WizardOptionCard } from "./WizardOptionCard";
import { useWizard } from "@/stores/wizard-store";
import { useAutoAdvance } from "@/hooks/useAutoAdvance";
import { INTERESSES } from "@/lib/catalogo";
import type { Interesse } from "@/types/wizard";

export function Step1Interesse() {
  const interesse = useWizard((s) => s.interesse);
  const setInteresse = useWizard((s) => s.setInteresse);
  const next = useWizard((s) => s.next);
  const schedule = useAutoAdvance(500);

  function pick(id: Interesse) {
    setInteresse(id);
    schedule(() => next());
  }

  return (
    <WizardStepShell
      title="No que você precisa de ajuda hoje?"
      subtitle="Clica no que mais se aproxima. A gente refina nas próximas perguntas."
      showPrev={false}
      showNext={false}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
        {INTERESSES.map((opt) => (
          <WizardOptionCard
            key={opt.id}
            icon={opt.icon}
            label={opt.label}
            description={opt.desc}
            selected={interesse === opt.id}
            onClick={() => pick(opt.id)}
          />
        ))}
      </div>
    </WizardStepShell>
  );
}
