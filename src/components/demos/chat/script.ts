export type ChatLine = {
  from: "user" | "bot";
  text: string;
  /** ms de espera antes desta mensagem (no bot = tempo "digitando") */
  delay?: number;
};

/**
 * Roteiro da demo (assistente de IA estilo Leila, no nicho de leilões).
 * Mostra a IA resolvendo uma dúvida real de comprador, ponta a ponta.
 * Acentuação PT-BR correta, sem emoji, tom de gente.
 */
export const LEILA_SCRIPT: ChatLine[] = [
  {
    from: "user",
    text: "Oi! O apartamento do lote 47 ainda dá pra dar lance?",
    delay: 500,
  },
  {
    from: "bot",
    text: "Oi! Dá sim. O lote 47 (apartamento de 2 quartos no centro) está com lances abertos até dia 24/06, às 14h.",
    delay: 1300,
  },
  {
    from: "user",
    text: "E aceita financiamento ou só à vista?",
    delay: 1000,
  },
  {
    from: "bot",
    text: "Aceita financiamento bancário e também parcelamento direto. O lance inicial está em R$ 182.000. Quer que eu te mande a lista de documentos?",
    delay: 1600,
  },
  { from: "user", text: "Quero sim, por favor", delay: 900 },
  {
    from: "bot",
    text: "Perfeito. Já te envio a documentação e te aviso 30 minutos antes do leilão começar. Qualquer dúvida sobre o edital, é só me chamar.",
    delay: 1500,
  },
];
