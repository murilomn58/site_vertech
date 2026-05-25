import type { Interesse } from "@/types/wizard";

export type InteresseOption = {
  id: Interesse;
  icon: string;
  label: string;
  desc: string;
};

export type DorOption = {
  id: string;
  label: string;
};

/**
 * Step 1: 6 opções de tipo de interesse.
 */
export const INTERESSES: InteresseOption[] = [
  {
    id: "atendimento-ia",
    icon: "🤖",
    label: "Atendimento IA no WhatsApp",
    desc: "Responder cliente 24/7 sem contratar equipe",
  },
  {
    id: "app-dashboard",
    icon: "📱",
    label: "App + Dashboard",
    desc: "Gestão, clínica, serviço, controle no celular",
  },
  {
    id: "site-landing",
    icon: "🌐",
    label: "Site / Landing",
    desc: "Institucional, vendas, alta performance",
  },
  {
    id: "automacao-rpa",
    icon: "⚙️",
    label: "Automação / RPA",
    desc: "Tarefa repetitiva, integração de sistemas",
  },
  {
    id: "registro-marca",
    icon: "™️",
    label: "Registro de Marca (INPI)",
    desc: "Proteger nome ou logo da sua empresa",
  },
  {
    id: "outro",
    icon: "💬",
    label: "Outro / Falar com Murilo",
    desc: "Quero conversar primeiro pra decidir",
  },
];

/**
 * Step 2: dor ramificada por interesse.
 */
export const DORES_BY_INTERESSE: Record<Interesse, DorOption[]> = {
  "atendimento-ia": [
    { id: "perco-cliente-fora-horario", label: "Perco cliente fora de horário" },
    { id: "atendo-manualmente-todo-dia", label: "Atendo manualmente todo dia" },
    { id: "sem-equipe-para-responder", label: "Não tenho equipe pra responder" },
  ],
  "app-dashboard": [
    { id: "tudo-em-planilha", label: "Tudo em planilha hoje" },
    { id: "processos-nao-conversam", label: "Processos não se comunicam" },
    { id: "nao-consigo-medir", label: "Não consigo medir resultado" },
  ],
  "site-landing": [
    { id: "site-feio-lento", label: "Meu site é feio ou lento" },
    { id: "nao-converte-visita", label: "Não converte visita em cliente" },
    { id: "sem-site-ainda", label: "Não tenho site ainda" },
  ],
  "automacao-rpa": [
    { id: "tarefa-consome-tempo", label: "Tarefa que consome muito tempo" },
    { id: "erros-manuais", label: "Muitos erros manuais" },
    { id: "integrar-sistemas", label: "Preciso integrar 2+ sistemas" },
  ],
  "registro-marca": [
    { id: "primeira-marca", label: "Primeira marca, não sei por onde começar" },
    { id: "marca-em-uso", label: "Marca em uso, preciso proteger" },
    { id: "cliente-exigiu", label: "Cliente exigiu CNPJ com marca registrada" },
  ],
  outro: [],
};

/**
 * Step 3: porte da empresa.
 */
export const PORTES = [
  { id: "pessoa-fisica", label: "Pessoa física / autônomo" },
  { id: "pequena", label: "Pequena (1-10 pessoas)" },
  { id: "media", label: "Média (11-50)" },
  { id: "grande", label: "Grande (51+)" },
] as const;

/**
 * Step 4: urgência.
 */
export const URGENCIAS = [
  { id: "pra-ontem", label: "Pra ontem (orçamento já planejado)" },
  { id: "este-mes", label: "Este mês" },
  { id: "tres-meses", label: "Próximos 3 meses" },
  { id: "explorando", label: "Só explorando, sem pressa" },
] as const;

export function findInteresse(id: string | null | undefined): InteresseOption | null {
  if (!id) return null;
  return INTERESSES.find((i) => i.id === id) ?? null;
}

export function findDor(
  interesse: Interesse | null | undefined,
  dorId: string | null | undefined,
): DorOption | null {
  if (!interesse || !dorId) return null;
  return DORES_BY_INTERESSE[interesse]?.find((d) => d.id === dorId) ?? null;
}

export function findPorte(
  id: string | null | undefined,
): { id: string; label: string } | null {
  if (!id) return null;
  return PORTES.find((p) => p.id === id) ?? null;
}

export function findUrgencia(
  id: string | null | undefined,
): { id: string; label: string } | null {
  if (!id) return null;
  return URGENCIAS.find((u) => u.id === id) ?? null;
}
