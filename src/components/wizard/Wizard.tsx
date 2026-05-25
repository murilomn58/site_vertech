"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useWizard } from "@/stores/wizard-store";
import { WizardProgress } from "./WizardProgress";
import { WizardHeader } from "./WizardHeader";
import { Step1Interesse } from "./Step1Interesse";
import { Step2Dor } from "./Step2Dor";
import { Step3SobreVoce } from "./Step3SobreVoce";
import { Step4Fechar } from "./Step4Fechar";
import { ModalEnviar } from "./ModalEnviar";

export function Wizard() {
  const cur = useWizard((s) => s.currentStep);
  const modalOpen = useWizard((s) => s.modalOpen);

  return (
    <main className="relative min-h-screen text-off-white flex flex-col overflow-x-hidden">
      {/* Background gradient + glow */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-bg-dark via-navy/95 to-bg-dark" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-cyan/10 blur-[120px] rounded-full -z-10" />

      <WizardHeader />
      <WizardProgress />

      <div className="flex-1 flex flex-col">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={cur}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1 flex flex-col"
          >
            {cur === "interesse" && <Step1Interesse />}
            {cur === "dor" && <Step2Dor />}
            {cur === "sobreVoce" && <Step3SobreVoce />}
            {cur === "fechar" && <Step4Fechar />}
          </motion.div>
        </AnimatePresence>
      </div>

      <AnimatePresence>{modalOpen && <ModalEnviar />}</AnimatePresence>
    </main>
  );
}
