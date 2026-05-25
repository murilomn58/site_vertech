"use client";

import { useState } from "react";
import { WizardStepShell } from "./WizardStepShell";
import { WizardOptionCard } from "./WizardOptionCard";
import { useWizard } from "@/stores/wizard-store";
import { useAutoAdvance } from "@/hooks/useAutoAdvance";
import { DORES_BY_INTERESSE } from "@/lib/catalogo";

export function Step2Dor() {
  const interesse = useWizard((s) => s.interesse);
  const dor = useWizard((s) => s.dor);
  const observacaoLivre = useWizard((s) => s.observacaoLivre);
  const setDor = useWizard((s) => s.setDor);
  const setObservacaoLivre = useWizard((s) => s.setObservacaoLivre);
  const next = useWizard((s) => s.next);
  const schedule = useAutoAdvance(500);

  const [textLocal, setTextLocal] = useState(observacaoLivre ?? "");

  if (!interesse) {
    return (
      <WizardStepShell
        title="Volta pra começar"
        subtitle="Precisamos saber o que tu busca antes de continuar."
        showNext={false}
      />
    );
  }

  const dores = DORES_BY_INTERESSE[interesse];

  const handleNextOutro = () => {
    setObservacaoLivre(textLocal.trim() || null);
    next();
  };

  // "outro" -> textarea livre
  if (interesse === "outro" || dores.length === 0) {
    return (
      <WizardStepShell
        title="Conta o que tá rolando"
        subtitle="Sem formalidade. Quanto mais contexto, melhor a call."
        nextDisabled={textLocal.trim().length < 5}
        onNext={handleNextOutro}
      >
        <textarea
          value={textLocal}
          onChange={(e) => setTextLocal(e.target.value.slice(0, 300))}
          placeholder="Ex: quero entender o que faz sentido pra minha empresa antes de fechar..."
          rows={5}
          className="w-full bg-bg-mid/80 backdrop-blur border-2 border-white/10 focus:border-cyan rounded-xl px-4 py-3 text-off-white placeholder-off-white/30 outline-none transition-colors font-body"
        />
        <p className="text-right text-xs font-mono text-off-white/40 mt-2">
          {textLocal.length} / 300
        </p>
      </WizardStepShell>
    );
  }

  function pick(id: string) {
    setDor(id);
    schedule(() => next());
  }

  return (
    <WizardStepShell
      title="Qual seu maior incômodo hoje?"
      subtitle="Marca o que mais bate com sua dor. É o que vou priorizar na call."
      showNext={false}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
        {dores.map((opt) => (
          <WizardOptionCard
            key={opt.id}
            label={opt.label}
            selected={dor === opt.id}
            onClick={() => pick(opt.id)}
          />
        ))}
      </div>
    </WizardStepShell>
  );
}
