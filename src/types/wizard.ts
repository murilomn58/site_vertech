export type WizardStep = "interesse" | "dor" | "sobreVoce" | "fechar";

export const WIZARD_ORDER: WizardStep[] = [
  "interesse",
  "dor",
  "sobreVoce",
  "fechar",
];

export type Interesse =
  | "atendimento-ia"
  | "app-dashboard"
  | "site-landing"
  | "automacao-rpa"
  | "registro-marca"
  | "outro";

export type Porte = "pessoa-fisica" | "pequena" | "media" | "grande";

export type Urgencia =
  | "pra-ontem"
  | "este-mes"
  | "tres-meses"
  | "explorando";

export type WizardAnswers = {
  interesse: Interesse | null;
  dor?: string | null;
  observacaoLivre?: string | null;
  porte?: Porte | null;
  urgencia?: Urgencia | null;
};

export type LeadTier = "hot" | "warm" | "cool";

export type MatchResult = {
  titulo: string;
  subtitulo: string;
  preco?: string;
  iconKey?: string;
  tier: LeadTier;
  cta?: { label: string; href: string };
};

export type ContactData = {
  nome: string;
  telefone?: string;
  email?: string;
  observacao?: string;
};

export type AgendamentoPayload = WizardAnswers & ContactData & {
  data: string;
  slot: string;
};

export type SlotResponse = {
  time: string;
  available: boolean;
};
