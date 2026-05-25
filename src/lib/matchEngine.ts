import type {
  Interesse,
  LeadTier,
  MatchResult,
  Porte,
  Urgencia,
} from "@/types/wizard";

type AnswersForMatch = {
  interesse: Interesse | null;
  dor: string | null;
  porte: Porte | null;
  urgencia: Urgencia | null;
};

const LEILA_CTA = {
  label: "Ver exemplo: Leila IA →",
  href: "https://assistenteleilao.com.br",
};

export function calcTier(a: AnswersForMatch): LeadTier {
  if (a.interesse === "outro") return "cool";
  if (a.urgencia === "explorando") return "cool";
  if (a.urgencia === "tres-meses") return "warm";
  if (a.urgencia === "pra-ontem" || a.urgencia === "este-mes") {
    if (a.porte && a.porte !== "pessoa-fisica") return "hot";
    return "warm";
  }
  return "warm";
}

const FALLBACK = (tier: LeadTier): MatchResult => ({
  titulo: "Murilo vai te orientar na call",
  subtitulo:
    "A gente conversa, entende seu cenário e fecha o escopo certo na hora. 30 minutos sem compromisso.",
  tier,
});

/**
 * Match engine: regras por interesse. Subtitle foca em diagnose + outcome.
 *
 * Cases concretos só aparecem como EXEMPLO (Leila IA, com link clicável),
 * não como afirmação de portfolio público.
 */
export function matchProduto(a: AnswersForMatch): MatchResult {
  const tier = calcTier(a);
  if (!a.interesse) return FALLBACK(tier);

  const altaUrgencia = a.urgencia === "pra-ontem" || a.urgencia === "este-mes";

  switch (a.interesse) {
    case "atendimento-ia":
      if (a.porte === "pequena" || a.porte === "media") {
        return {
          titulo: "Assistente IA",
          subtitulo: altaUrgencia
            ? "Assistente WhatsApp 24/7 com RAG treinado pra sua vertical. Setup em até 7 dias, sem precisar de equipe pra responder cliente. Exemplo rodando há mais de 1 ano: Leila IA pra leiloeiros."
            : "Assistente WhatsApp 24/7 com RAG treinado pra sua vertical. Começamos com piloto e ajustamos sem pressão. Exemplo em produção: Leila IA pra leiloeiros.",
          preco: "R$ 299/mês (Plano Base) ou R$ 1.000+/mês (Premium white-label)",
          iconKey: "bot",
          tier,
          cta: LEILA_CTA,
        };
      }
      if (a.porte === "grande") {
        return {
          titulo: "Assistente IA Premium",
          subtitulo:
            "Número WhatsApp Business dedicado, integração no seu site, capacitação presencial e branding próprio. Atendimento que escala sem perder a cara da empresa. Exemplo rodando: Leila IA pra leiloeiros.",
          preco: "A partir de R$ 1.000/mês (sob consulta)",
          iconKey: "bot",
          tier,
          cta: LEILA_CTA,
        };
      }
      return {
        titulo: "Assistente IA",
        subtitulo:
          "Pra autônomo a gente costuma sugerir o Plano Base. Alinha 30min e a gente vê se faz sentido pro seu fluxo. Exemplo rodando: Leila IA pra leiloeiros.",
        preco: "R$ 299/mês",
        iconKey: "bot",
        tier,
        cta: LEILA_CTA,
      };

    case "app-dashboard":
      return {
        titulo: "App + Dashboard sob medida",
        subtitulo:
          "Levantamos seu processo atual, mapeamos o que tira tempo da equipe e construímos um app + painel sob medida. Foco em reduzir trabalho manual e centralizar gestão.",
        preco:
          a.porte === "grande"
            ? "A partir de R$ 15k pontual + R$ 500/mês manutenção"
            : "A partir de R$ 5k pontual + R$ 200/mês manutenção",
        iconKey: "smartphone",
        tier,
      };

    case "site-landing":
      return {
        titulo: altaUrgencia ? "Site Vertech em ~3 semanas" : "Site Vertech custom",
        subtitulo:
          "Site rápido, animado e pensado pra conversão. Next.js + Tailwind + Motion, com SEO base, formulário direto pro WhatsApp e métricas no Analytics.",
        preco: "R$ 1.000 a R$ 5.000 pontual + R$ 100-200/mês manutenção (opcional)",
        iconKey: "globe",
        tier,
      };

    case "automacao-rpa":
      return {
        titulo: "Automação / RPA sob medida",
        subtitulo:
          "Mapeamos a tarefa que consome tempo da equipe e construímos a automação (Python, n8n, integrações via API). Cliente típico ganha 60-80% do tempo de volta no fluxo automatizado.",
        preco: "A partir de R$ 2.000 (orçamento por escopo)",
        iconKey: "cogs",
        tier,
      };

    case "registro-marca":
      return {
        titulo: "Registro de Marca INPI",
        subtitulo:
          "Análise de viabilidade da marca, classes recomendadas, petição e acompanhamento até o registro. Sem letra miúda, com transparência de prazos do INPI.",
        preco: "A partir de R$ 350 + taxas INPI (R$ 142 por classe)",
        iconKey: "shield",
        tier,
      };

    case "outro":
      return FALLBACK(tier);

    default:
      return FALLBACK(tier);
  }
}
