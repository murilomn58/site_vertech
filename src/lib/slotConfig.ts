/**
 * Horarios fixos de atendimento Vertech para o wizard de agendamento.
 * Murilo definiu 24/05/2026.
 *
 * Slots de 30 min. Domingo bloqueado.
 */

type Weekday = 0 | 1 | 2 | 3 | 4 | 5 | 6; // 0=dom, 1=seg, ..., 6=sab

const SEMANA_BASE = ["12:00", "12:30", "13:00", "18:30", "19:00", "19:30"];
const SABADO = ["14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00"];

export const SLOTS_BY_WEEKDAY: Record<Weekday, string[]> = {
  0: [], // domingo: bloqueado
  1: SEMANA_BASE,
  2: SEMANA_BASE,
  3: SEMANA_BASE,
  4: SEMANA_BASE,
  5: SEMANA_BASE,
  6: SABADO,
};

/**
 * Retorna slots base de um dia (YYYY-MM-DD) em horario de Brasilia.
 */
export function getBaseSlots(isoDate: string): string[] {
  // Forca interpretacao em BRT pra weekday correto independente do server tz
  const d = new Date(`${isoDate}T12:00:00-03:00`);
  return SLOTS_BY_WEEKDAY[d.getDay() as Weekday];
}

/**
 * Converte slot string ("12:30") + isoDate em Date BRT.
 */
export function slotToDate(isoDate: string, slot: string): Date {
  return new Date(`${isoDate}T${slot}:00-03:00`);
}

/**
 * Adiciona N minutos a uma Date e retorna ISO string com offset BRT.
 */
export function addMinutesISO(date: Date, minutes: number): string {
  const d = new Date(date.getTime() + minutes * 60_000);
  // ISO com -03:00 offset
  const pad = (n: number) => String(n).padStart(2, "0");
  const tzOffsetMin = 3 * 60; // BRT = UTC-3
  const local = new Date(d.getTime() - tzOffsetMin * 60_000);
  return `${local.getUTCFullYear()}-${pad(local.getUTCMonth() + 1)}-${pad(
    local.getUTCDate(),
  )}T${pad(local.getUTCHours())}:${pad(local.getUTCMinutes())}:00-03:00`;
}

export const SLOT_DURATION_MIN = 30;
