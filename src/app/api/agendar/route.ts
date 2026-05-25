import { NextResponse } from "next/server";
import { CALENDAR_ID, TZ, getCalendar } from "@/lib/googleCalendar";
import { getBaseSlots, slotToDate, SLOT_DURATION_MIN } from "@/lib/slotConfig";
import { agendarSchema } from "@/lib/schemas";
import { findInteresse, findPorte, findUrgencia, findDor } from "@/lib/catalogo";
import { matchProduto } from "@/lib/matchEngine";
import { buildWhatsAppMessage, buildWhatsAppURL } from "@/lib/whatsappBuilder";

export const dynamic = "force-dynamic";

/**
 * POST /api/agendar
 *
 * Cria evento Calendar com Google Meet auto-gerado + retorna URL WhatsApp
 * com mensagem pre-formatada pra cliente confirmar com o Murilo.
 */
export async function POST(request: Request) {
  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json({ error: "Body JSON invalido" }, { status: 400 });
  }

  const parsed = agendarSchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Dados invalidos", issues: parsed.error.flatten() },
      { status: 400 },
    );
  }
  const data = parsed.data;

  // Confirma que o slot existe no slotConfig (anti tampering)
  const baseSlots = getBaseSlots(data.data);
  if (!baseSlots.includes(data.slot)) {
    return NextResponse.json(
      { error: "Slot fora do horario de atendimento" },
      { status: 422 },
    );
  }

  const slotStart = slotToDate(data.data, data.slot);
  const slotEnd = new Date(slotStart.getTime() + SLOT_DURATION_MIN * 60_000);

  // Bloqueia agendamento no passado
  if (slotStart < new Date()) {
    return NextResponse.json(
      { error: "Slot ja passou — escolha outro horario" },
      { status: 422 },
    );
  }

  const match = matchProduto({
    interesse: data.interesse,
    dor: data.dor ?? null,
    porte: data.porte ?? null,
    urgencia: data.urgencia ?? null,
  });
  const tierEmoji =
    match.tier === "hot" ? "🔥" : match.tier === "warm" ? "🌡️" : "❄️";

  let meetLink: string | null = null;
  let eventId: string | null = null;

  try {
    const calendar = getCalendar();

    // Re-verifica race condition: slot ja ocupado?
    const list = await calendar.events.list({
      calendarId: CALENDAR_ID,
      timeMin: slotStart.toISOString(),
      timeMax: slotEnd.toISOString(),
      singleEvents: true,
      maxResults: 5,
    });
    const occupied = list.data.items?.some(
      (e) =>
        e.status !== "cancelled" &&
        e.start?.dateTime &&
        e.end?.dateTime &&
        new Date(e.start.dateTime) < slotEnd &&
        new Date(e.end.dateTime) > slotStart,
    );
    if (occupied) {
      return NextResponse.json(
        { error: "Slot ja foi reservado por outra pessoa nesse minuto. Escolha outro." },
        { status: 409 },
      );
    }

    const interesse = findInteresse(data.interesse);
    const porte = findPorte(data.porte ?? null);
    const urgencia = findUrgencia(data.urgencia ?? null);
    const dor = findDor(data.interesse, data.dor ?? null);

    const summary = `[Vertech Lead ${tierEmoji}] ${interesse?.label ?? data.interesse}, ${data.nome}`;
    const description = [
      `Lead chegou via wizard vertechsolucoes.com.br`,
      ``,
      `Interesse: ${interesse?.label ?? data.interesse}`,
      dor ? `Dor: ${dor.label}` : null,
      data.observacaoLivre ? `Contexto livre: ${data.observacaoLivre}` : null,
      porte ? `Porte: ${porte.label}` : null,
      urgencia ? `Urgencia: ${urgencia.label}` : null,
      ``,
      `Contato:`,
      `Nome: ${data.nome}`,
      `Telefone: ${data.telefone}`,
      data.email ? `Email: ${data.email}` : null,
      data.observacao ? `Observacao: ${data.observacao}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    const insert = await calendar.events.insert({
      calendarId: CALENDAR_ID,
      conferenceDataVersion: 1,
      sendUpdates: data.email ? "all" : "none",
      requestBody: {
        summary,
        description,
        start: { dateTime: slotStart.toISOString(), timeZone: TZ },
        end: { dateTime: slotEnd.toISOString(), timeZone: TZ },
        attendees: data.email ? [{ email: data.email, displayName: data.nome }] : [],
        conferenceData: {
          createRequest: {
            requestId: `vertech-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
            conferenceSolutionKey: { type: "hangoutsMeet" },
          },
        },
      },
    });

    meetLink = insert.data.hangoutLink ?? null;
    eventId = insert.data.id ?? null;
  } catch (err) {
    console.error("[/api/agendar] Calendar insert falhou:", err);
    return NextResponse.json(
      {
        error:
          "Nao consegui criar o evento no Calendar — manda mensagem pelo WhatsApp do site que a gente resolve.",
      },
      { status: 502 },
    );
  }

  if (!meetLink) {
    return NextResponse.json(
      { error: "Evento criado mas Meet nao foi gerado. Tenta de novo." },
      { status: 502 },
    );
  }

  const whatsappMessage = buildWhatsAppMessage({ ...data, meetLink, match });
  const waUrl = buildWhatsAppURL(whatsappMessage);

  return NextResponse.json({
    ok: true,
    eventId,
    meetLink,
    waUrl,
    tier: match.tier,
  });
}
