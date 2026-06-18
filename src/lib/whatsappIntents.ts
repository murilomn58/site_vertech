import { buildWhatsAppURL } from "@/lib/whatsappBuilder";

/**
 * Deep-links de WhatsApp por INTENÇÃO da vitrine.
 *
 * O caminho principal do funil: o visitante vê uma demo (assistente IA, app,
 * site) e clica num CTA que abre o WhatsApp do Murilo com a mensagem JÁ escrita,
 * dizendo o que ele quer. Reaproveita buildWhatsAppURL (numero institucional
 * 5549999551051, via NEXT_PUBLIC_WHATSAPP_NUMBER).
 *
 * Regras: sem emojis (alguns clientes WhatsApp renderizam como lixo),
 * acentuacao PT-BR correta, tom de gente. NUNCA o numero da Leila (98916-7594).
 */
export type Intent =
  | "assistente-ia"
  | "app"
  | "site"
  | "automacao"
  | "outro";

const MESSAGES: Record<Intent, string> = {
  "assistente-ia":
    "Oi Murilo! Vi a demonstracao do assistente de IA no site da Vertech e quero um assim no meu WhatsApp. Como funciona?",
  app: "Oi Murilo! Vi o app de exemplo no site da Vertech e quero um aplicativo assim pro meu negocio.",
  site: "Oi Murilo! Vi os sites que a Vertech faz e quero um site assim, com essa cara, pra minha empresa.",
  automacao:
    "Oi Murilo! Quero automatizar uma tarefa repetitiva no meu negocio. Vi no site da Vertech que voces fazem isso.",
  outro:
    "Oi Murilo! Cheguei pelo site da Vertech e queria conversar sobre um projeto.",
};

/**
 * Monta a URL wa.me com a mensagem da intenção. `ref` opcional adiciona o nome
 * do case de origem ("vim pelo case Leila IA").
 */
export function buildIntentURL(intent: Intent, ref?: string): string {
  const base = MESSAGES[intent] ?? MESSAGES.outro;
  const msg = ref ? `${base} (vim pelo case ${ref})` : base;
  return buildWhatsAppURL(msg);
}
