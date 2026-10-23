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
export function getLeilaScript(t: (key: string) => string): ChatLine[] {
return [
  {
    from: "user",
    text: t("script.hiCanIStillBidOn"),
    delay: 500,
  },
  {
    from: "bot",
    text: t("script.hiYesBiddingOnLot47"),
    delay: 1300,
  },
  {
    from: "user",
    text: t("script.isFinancingAvailableOrDoI"),
    delay: 1000,
  },
  {
    from: "bot",
    text: t("script.bankFinancingAndDirectInstalmentsAre"),
    delay: 1600,
  },
  { from: "user", text: t("script.yesPlease"), delay: 900 },
  {
    from: "bot",
    text: t("script.ofCourseIllSendTheDocuments"),
    delay: 1500,
  },
];
}
