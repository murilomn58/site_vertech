import {
  findDor,
  findInteresse,
  findPorte,
  findUrgencia,
} from "@/lib/catalogo";
import type { AgendamentoPayload, LeadTier, MatchResult } from "@/types/wizard";

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "5549999551051";

function formatDateBR(iso: string): string {
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}

function tierLabel(tier: LeadTier): string {
  if (tier === "hot") return "Lead quente (urgência + porte definido)";
  if (tier === "warm") return "Lead morno (3 meses pra rodar)";
  return "Lead frio (explorando)";
}

/**
 * Monta a mensagem do WhatsApp final do wizard.
 *
 * Mínimo de emojis pra evitar `�` em WhatsApp Web Desktop. Só 3 emojis no
 * total (data, Meet, telefone), o resto é texto plain.
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

  const tierLine = payload.match ? tierLabel(payload.match.tier) : "";
  const matchLine = payload.match ? `Match: ${payload.match.titulo}` : "";
  const meetLine = payload.pending
    ? "🎥 Meet a marcar (cria o evento e me manda o link)"
    : `🎥 ${payload.meetLink}`;

  const linhas = [
    "Olá Murilo! Lead novo pelo site.",
    "",
    tierLine,
    matchLine,
    "",
    `📅 ${dataBR} às ${payload.slot}`,
    meetLine,
    "",
    `Interesse: ${interesse?.label ?? payload.interesse ?? "-"}`,
    dor
      ? `Dor: ${dor.label}`
      : payload.observacaoLivre
      ? `Contexto: ${payload.observacaoLivre}`
      : "",
    porte ? `Porte: ${porte.label}` : "",
    urgencia ? `Urgência: ${urgencia.label}` : "",
    "",
    `📞 ${payload.telefone}`,
    payload.email ? `Email: ${payload.email}` : "",
    payload.observacao ? `Obs: ${payload.observacao}` : "",
  ].filter((l) => l !== "" || true);

  return linhas.join("\n").replace(/\n{3,}/g, "\n\n").trim();
}

export function buildWhatsAppURL(message: string, numberOverride?: string): string {
  const number = numberOverride || WHATSAPP_NUMBER;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
