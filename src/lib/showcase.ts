import type { Intent } from "@/lib/whatsappIntents";

/**
 * Fonte única dos cases reais EXIBÍVEIS no site.
 * Regra (vault): só Leila IA, OdontoConnect, Messiê Forró e VertechNews podem
 * ser divulgados nominalmente. Maracujá, Berlim, Arte Trigo etc. são VETADOS.
 * Métricas: só o que é verdadeiro/defensável — nunca inventar número.
 */
export type Caso = {
  id: string;
  nome: string;
  tipo: Intent;
  categoria: string;
  tagline: string;
  descricao: string;
  destaques: string[];
  url?: string;
  urlLabel?: string;
};

export const CASES: Caso[] = [
  {
    id: "leila",
    nome: "Leila IA",
    tipo: "assistente-ia",
    categoria: "Assistente de IA",
    tagline: "Atende compradores de leilão 24 horas por dia.",
    descricao:
      "Assistente de IA no WhatsApp para leiloeiros. Responde dúvidas sobre editais, lotes, documentação e prazos sozinha, treinada nos dados de cada leiloeiro.",
    destaques: ["No WhatsApp, 24/7", "Treinada por leiloeiro", "Já em produção"],
    url: "https://assistenteleilao.com.br",
    urlLabel: "assistenteleilao.com.br",
  },
  {
    id: "odontoconnect",
    nome: "OdontoConnect",
    tipo: "app",
    categoria: "Aplicativo",
    tagline: "Paciente e dentista conectados no celular.",
    descricao:
      "Aplicativo de agendamento paciente-dentista: marca consulta sem ligação, confirma pelo WhatsApp, organiza prontuário e avaliações. Em produção com cliente real.",
    destaques: ["Agendamento sem ligação", "Confirmação no WhatsApp", "App em produção"],
  },
  {
    id: "messie",
    nome: "Messiê Forró",
    tipo: "site",
    categoria: "Site imersivo",
    tagline: "Nosso primeiro case internacional, em Lille (França).",
    descricao:
      "Site da associação de música brasileira em Lille. Redesign cinematográfico, deploy próprio e manutenção recorrente. Cliente que continua com a Vertech.",
    destaques: ["França", "Redesign cinematográfico", "Cliente recorrente"],
    url: "https://messieforro.fr",
    urlLabel: "messieforro.fr",
  },
  {
    id: "vertechnews",
    nome: "VertechNews",
    tipo: "outro",
    categoria: "Portal de IA",
    tagline: "Notícias de IA com produção e distribuição automatizadas.",
    descricao:
      "Portal de notícias de inteligência artificial, com geração de conteúdo e distribuição multicanal. Produto próprio da Vertech, no ar.",
    destaques: ["Conteúdo por IA", "Multicanal", "Produto próprio"],
    url: "https://vertechnews.com",
    urlLabel: "vertechnews.com",
  },
];

/**
 * Slot do vídeo hero (Higgsfield/Kling). Enquanto null, o hero usa o mesh
 * gradient (shader) como fundo. Quando o mp4 estiver pronto, basta apontar
 * HERO_VIDEO para o arquivo em /public e definir o poster.
 */
export const HERO_VIDEO: string | null = null;
export const HERO_POSTER: string | null = null;
