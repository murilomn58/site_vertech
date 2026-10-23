import type { Intent } from "@/lib/whatsappIntents";

/**
 * Fonte única dos cases reais EXIBÍVEIS no site.
 * Regra (vault): só Leila IA, OdontoConnect, Messiê Forró, VertechNews e
 * Padaria Dona Rosa podem ser divulgados nominalmente (todos com contrato
 * assinado). Maracujá, Berlim, Arte Trigo etc. são VETADOS.
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

export function getCases(t: (key: string) => string): Caso[] {
return [
  {
    id: "leila",
    nome: "Leila IA",
    tipo: "assistente-ia",
    categoria: t("showcase.aiAssistant"),
    tagline: t("showcase.helpsAuctionBuyers24HoursA"),
    descricao:
      t("showcase.aWhatsappAiAssistantForAuctioneers"),
    destaques: [t("showcase.onWhatsapp247"), t("showcase.trainedForEachAuctioneer"), t("showcase.inProduction")],
    url: "https://assistenteleilao.com.br",
    urlLabel: "assistenteleilao.com.br",
  },
  {
    id: "odontoconnect",
    nome: "OdontoConnect",
    tipo: "app",
    categoria: t("showcase.mobileApp"),
    tagline: t("showcase.connectingPatientsAndDentistsOnMobile"),
    descricao:
      t("showcase.aPatientdentistBookingAppBookWithout"),
    destaques: [t("showcase.bookingWithoutCalls"), t("showcase.whatsappConfirmations"), t("showcase.appInProduction")],
  },
  {
    id: "messie",
    nome: "Messiê Forró",
    tipo: "site",
    categoria: t("demoSite.category"),
    tagline: t("showcase.ourFirstInternationalProjectInLille"),
    descricao:
      t("showcase.aWebsiteForABrazilianMusic"),
    destaques: [t("showcase.france"), t("showcase.cinematicRedesign"), t("showcase.ongoingClient")],
    url: "https://messieforro.fr",
    urlLabel: "messieforro.fr",
  },
  {
    id: "vertechnews",
    nome: "VertechNews",
    tipo: "outro",
    categoria: t("showcase.aiNewsPlatform"),
    tagline: t("showcase.aiNewsWithAutomatedContentProduction"),
    descricao:
      t("showcase.anArtificialIntelligenceNewsPlatformWith"),
    destaques: [t("showcase.aigeneratedContent"), t("showcase.multipleChannels"), t("showcase.ourOwnProduct")],
    url: "https://vertechnews.com",
    urlLabel: "vertechnews.com",
  },
  {
    id: "dona-rosa",
    nome: "Padaria Dona Rosa",
    tipo: "site",
    categoria: t("showcase.websiteOrderingSystem"),
    tagline: t("showcase.aBakeryInFlorianpolisSellingLunch"),
    descricao:
      t("showcase.aWebsiteOnTheBakerysOwn"),
    destaques: [t("showcase.onlineLunchBoxBuilder"), t("showcase.kitchenDisplaySystem"), t("showcase.ongoingClient")],
    url: "https://padariadonarosa.com.br",
    urlLabel: "padariadonarosa.com.br",
  },
];
}

/**
 * Slot do vídeo hero (Higgsfield/Kling). Enquanto null, o hero usa o mesh
 * gradient (shader) como fundo. Quando o mp4 estiver pronto, basta apontar
 * HERO_VIDEO para o arquivo em /public e definir o poster.
 */
export const HERO_VIDEO: string | null = null;
export const HERO_POSTER: string | null = null;
