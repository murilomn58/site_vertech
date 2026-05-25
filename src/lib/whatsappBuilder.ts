import {
  findDor,
  findInteresse,
  findPorte,
  findUrgencia,
} from "@/lib/catalogo";
import type { AgendamentoPayload, MatchResult } from "@/types/wizard";

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "5549999551051";

function formatDateBR(iso: string): string {
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}

/**
 * Monta a mensagem que o lead envia pelo wa.me pro Murilo.
 *
 * POV: o LEAD se apresenta — tom conversacional, sem emojis (alguns clientes
 * WhatsApp renderizam como caracteres invalidos), sem repetir telefone (Murilo
 * ja ve o numero no header da conversa do WhatsApp).
 *
 * Tier nao vai na mensagem (Murilo ve no titulo do evento Calendar). Match
 * tambem nao — fica como contexto interno.
 */
export function buildWhatsAppMessage(
  payload: AgendamentoPayload & {
    meetLink: string;
    match: MatchResult | null;
    pending?: boolean;
  },
): string {
  const interesse = findInteresse(payload.interesse);
  const dor = findDor(payload.interesse, payload.dor);
  const porte = findPorte(payload.porte);
  const urgencia = findUrgencia(payload.urgencia);
  const dataBR = formatDateBR(payload.data);

  const meetLinha = payload.pending
    ? "Meet: a marcar (me confirma e cria o evento, por favor)"
    : `Meet: ${payload.meetLink}`;

  const linhas = [
    `Oi Murilo, sou ${payload.nome}. Cheguei pelo site da Vertech.`,
    "",
    "Acabei de marcar uma call de 30min com você:",
    `Data: ${dataBR} às ${payload.slot}`,
    meetLinha,
    "",
    "O que me trouxe pra essa conversa:",
    `- Interesse: ${interesse?.label ?? payload.interesse ?? "-"}`,
    dor
      ? `- Minha dor hoje: ${dor.label.toLowerCase()}`
      : payload.observacaoLivre
      ? `- Contexto: ${payload.observacaoLivre}`
      : "",
    porte ? `- Porte da empresa: ${porte.label.toLowerCase()}` : "",
    urgencia ? `- Urgência: ${urgencia.label.toLowerCase()}` : "",
    payload.email ? "" : null,
    payload.email ? `Email pra convite Meet: ${payload.email}` : "",
    payload.observacao ? "" : null,
    payload.observacao ? `Mais um detalhe: ${payload.observacao}` : "",
    "",
    "Te aguardo lá no Meet. Qualquer coisa, me chama por aqui.",
  ]
    .filter((l) => l !== null)
    .filter((l) => l !== "" || true);

  return (linhas as string[]).join("\n").replace(/\n{3,}/g, "\n\n").trim();
}

export function buildWhatsAppURL(message: string, numberOverride?: string): string {
  const number = numberOverride || WHATSAPP_NUMBER;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
