import { NextResponse } from "next/server";
import { CALENDAR_ID, TZ, getCalendar } from "@/lib/googleCalendar";
import { getBaseSlots, slotToDate, SLOT_DURATION_MIN } from "@/lib/slotConfig";
import { slotsQuerySchema } from "@/lib/schemas";

export const dynamic = "force-dynamic";

/**
 * GET /api/slots?date=YYYY-MM-DD
 *
 * Retorna lista de slots de 30min do dia, marcados como available/ocupado
 * comparando com eventos existentes no Calendar vertech2026.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const parsed = slotsQuerySchema.safeParse({ date: searchParams.get("date") });
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Parametro date invalido (YYYY-MM-DD)" },
      { status: 400 },
    );
  }
  const { date } = parsed.data;

  // Bloqueia datas passadas (em BRT)
  const todayBRT = new Date(
    new Date().toLocaleString("en-US", { timeZone: TZ }),
  )
    .toISOString()
    .slice(0, 10);
  if (date < todayBRT) {
    return NextResponse.json({ date, slots: [] });
  }

  const baseSlots = getBaseSlots(date);
  if (baseSlots.length === 0) {
    return NextResponse.json({ date, slots: [] });
  }

  let busyRanges: Array<{ start: Date; end: Date }> = [];
  try {
    const calendar = getCalendar();
    const timeMin = `${date}T00:00:00-03:00`;
    const timeMax = `${date}T23:59:59-03:00`;
    const { data } = await calendar.events.list({
      calendarId: CALENDAR_ID,
      timeMin,
      timeMax,
      singleEvents: true,
      orderBy: "startTime",
      maxResults: 50,
    });
    busyRanges =
      data.items
        ?.filter((e) => e.status !== "cancelled" && e.start?.dateTime && e.end?.dateTime)
        .map((e) => ({
          start: new Date(e.start!.dateTime!),
          end: new Date(e.end!.dateTime!),
        })) ?? [];
  } catch (err) {
    console.error("[/api/slots] Calendar fetch falhou:", err);
    // Falha graciosa: mostra todos os slots como livres, evita travar UX
    busyRanges = [];
  }

  const nowBRT = new Date();
  const slots = baseSlots.map((slot) => {
    const slotStart = slotToDate(date, slot);
    const slotEnd = new Date(slotStart.getTime() + SLOT_DURATION_MIN * 60_000);
    const overlaps = busyRanges.some(
      (b) => b.start < slotEnd && b.end > slotStart,
    );
    const isPast = slotStart < nowBRT;
    return { time: slot, available: !overlaps && !isPast };
  });

  return NextResponse.json({ date, slots });
}
