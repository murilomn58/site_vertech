import type { Metadata } from "next";
import { Wizard } from "@/components/wizard/Wizard";

export const metadata: Metadata = {
  title: "Vertech — Vamos conversar?",
  description:
    "Em 2 minutos a gente entende o que faz sentido pra você: atendimento IA, app, site, automação ou registro de marca. No final, agenda uma call de 30min direto pelo Meet.",
};

export default function WizardPage() {
  return <Wizard />;
}
