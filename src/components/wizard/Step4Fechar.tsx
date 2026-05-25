"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { WizardStepShell } from "./WizardStepShell";
import { useWizard } from "@/stores/wizard-store";
import { findDor } from "@/lib/catalogo";
import { cn } from "@/lib/utils";

const MONTHS = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];
const WEEK = ["D", "S", "T", "Q", "Q", "S", "S"];

function pad(n: number): string {
  return String(n).padStart(2, "0");
}
function isoOf(year: number, month: number, day: number): string {
  return `${year}-${pad(month + 1)}-${pad(day)}`;
}
function daysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}
function todayISO(): string {
  return new Date(
    new Date().toLocaleString("en-US", { timeZone: "America/Sao_Paulo" }),
  )
    .toISOString()
    .slice(0, 10);
}

type Slot = { time: string; available: boolean };

export function Step4Fechar() {
  const match = useWizard((s) => s.match);
  const interesse = useWizard((s) => s.interesse);
  const dorId = useWizard((s) => s.dor);
  const observacaoLivre = useWizard((s) => s.observacaoLivre);
  const scheduledDate = useWizard((s) => s.scheduledDate);
  const scheduledSlot = useWizard((s) => s.scheduledSlot);
  const setScheduledDate = useWizard((s) => s.setScheduledDate);
  const setScheduledSlot = useWizard((s) => s.setScheduledSlot);
  const setContact = useWizard((s) => s.setContact);
  const openModal = useWizard((s) => s.openModal);

  // Calendário
  const today = todayISO();
  const initial = scheduledDate ?? today;
  const [year, setYear] = useState<number>(parseInt(initial.slice(0, 4)));
  const [month, setMonth] = useState<number>(parseInt(initial.slice(5, 7)) - 1);

  // Slots
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [slotsError, setSlotsError] = useState<string | null>(null);

  // Form
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");

  const grid = useMemo(() => {
    const firstDow = new Date(year, month, 1).getDay();
    const total = daysInMonth(year, month);
    const cells: ({ day: number; iso: string; weekday: number } | null)[] = [];
    for (let i = 0; i < firstDow; i++) cells.push(null);
    for (let d = 1; d <= total; d++) {
      const iso = isoOf(year, month, d);
      const weekday = new Date(year, month, d).getDay();
      cells.push({ day: d, iso, weekday });
    }
    while (cells.length % 7 !== 0) cells.push(null);
    return cells;
  }, [year, month]);

  useEffect(() => {
    if (!scheduledDate) return;
    let alive = true;
    setLoadingSlots(true);
    setSlotsError(null);
    fetch(`/api/slots?date=${scheduledDate}`)
      .then((r) => r.json())
      .then((data) => {
        if (!alive) return;
        if (data.error) {
          setSlotsError(data.error);
          setSlots([]);
        } else {
          setSlots(data.slots || []);
        }
      })
      .catch(() => {
        if (!alive) return;
        setSlotsError("Erro ao carregar horários. Tenta de novo.");
        setSlots([]);
      })
      .finally(() => {
        if (alive) setLoadingSlots(false);
      });
    return () => {
      alive = false;
    };
  }, [scheduledDate]);

  function changeMonth(delta: number) {
    let m = month + delta;
    let y = year;
    if (m < 0) {
      m = 11;
      y -= 1;
    } else if (m > 11) {
      m = 0;
      y += 1;
    }
    setMonth(m);
    setYear(y);
  }

  function pickDay(iso: string, weekday: number) {
    if (iso < today) return;
    if (weekday === 0) return;
    setScheduledDate(iso);
    setScheduledSlot(null);
  }

  const dor = findDor(interesse, dorId);
  const diagnoseFrase = dor
    ? `Você marcou "${dor.label.toLowerCase()}".`
    : observacaoLivre
    ? "Anotei o contexto que você descreveu."
    : "";

  const canSubmit =
    !!scheduledDate && !!scheduledSlot && nome.trim().length >= 3;

  function handleSubmit() {
    if (!canSubmit) return;
    setContact({
      nome: nome.trim(),
      email: email.trim() || undefined,
    });
    openModal();
  }

  return (
    <WizardStepShell
      title="Quase pronto"
      subtitle={
        diagnoseFrase
          ? `${diagnoseFrase} Escolhe um horário e me passa seu contato.`
          : "Escolhe um horário e me passa seu contato."
      }
      nextLabel="Marcar conversa de 30min com Murilo →"
      nextDisabled={!canSubmit}
      onNext={handleSubmit}
    >
      <div className="space-y-6 max-w-3xl mx-auto">
        {/* Match card */}
        {match && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35 }}
            className="relative bg-gradient-to-br from-bg-mid/90 via-bg-mid/70 to-bg-dark/90 border-2 border-cyan/40 rounded-2xl p-5 md:p-6 shadow-xl shadow-cyan/10 backdrop-blur-xl"
          >
            <span className="absolute -top-3 left-5 md:left-6 bg-cyan text-bg-dark px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest font-bold">
              Recomendação
            </span>
            {match.tier === "hot" && (
              <span className="absolute -top-3 right-5 md:right-6 bg-gradient-to-r from-cyan-bright to-cyan text-bg-dark px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest font-bold">
                ⚡ Match forte
              </span>
            )}
            <h3 className="font-heading font-bold text-xl md:text-2xl text-off-white leading-tight mt-1 mb-2">
              {match.titulo}
            </h3>
            <p className="text-sm md:text-base text-off-white/75 leading-relaxed">
              {match.subtitulo}
            </p>
            {match.preco && (
              <p className="mt-3 pt-3 border-t border-white/10 font-heading text-sm md:text-base text-cyan-bright">
                {match.preco}
              </p>
            )}
            {match.cta && (
              <a
                href={match.cta.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1.5 text-xs md:text-sm text-cyan-bright hover:text-cyan font-medium underline underline-offset-4 decoration-cyan/40 hover:decoration-cyan transition-colors"
              >
                {match.cta.label}
              </a>
            )}
          </motion.div>
        )}

        {/* Calendar + slots */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-bg-mid/40 backdrop-blur-xl border border-white/10 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <button
                type="button"
                onClick={() => changeMonth(-1)}
                className="w-9 h-9 flex items-center justify-center text-off-white/60 hover:text-cyan border border-white/10 hover:border-cyan/40 rounded transition-colors"
                aria-label="Mês anterior"
              >
                ←
              </button>
              <p className="font-heading font-semibold text-base text-off-white">
                {MONTHS[month]} {year}
              </p>
              <button
                type="button"
                onClick={() => changeMonth(1)}
                className="w-9 h-9 flex items-center justify-center text-off-white/60 hover:text-cyan border border-white/10 hover:border-cyan/40 rounded transition-colors"
                aria-label="Próximo mês"
              >
                →
              </button>
            </div>
            <div className="grid grid-cols-7 gap-1 mb-1">
              {WEEK.map((w, i) => (
                <div
                  key={`w-${i}`}
                  className="text-center text-[10px] font-mono uppercase tracking-widest text-off-white/40 py-1"
                >
                  {w}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {grid.map((cell, i) => {
                if (!cell) return <div key={`empty-${i}`} className="aspect-square" />;
                const isToday = cell.iso === today;
                const isPast = cell.iso < today;
                const isSunday = cell.weekday === 0;
                const isDisabled = isPast || isSunday;
                const isSelected = scheduledDate === cell.iso;
                return (
                  <button
                    key={cell.iso}
                    type="button"
                    onClick={() => pickDay(cell.iso, cell.weekday)}
                    disabled={isDisabled}
                    className={cn(
                      "aspect-square flex items-center justify-center text-sm font-mono transition-all rounded-lg",
                      isSelected
                        ? "bg-cyan text-bg-dark font-bold shadow-lg shadow-cyan/40"
                        : isToday
                        ? "border-2 border-cyan/60 text-cyan hover:bg-cyan/10"
                        : isDisabled
                        ? "text-off-white/15 cursor-not-allowed"
                        : "text-off-white/70 hover:bg-white/5 hover:text-off-white border border-transparent hover:border-white/20",
                    )}
                  >
                    {cell.day}
                  </button>
                );
              })}
            </div>
            <p className="mt-3 text-[10px] font-mono uppercase tracking-widest text-off-white/40">
              Dom indisponível · Seg-sex 12h-13h e 18h30-19h30 · Sáb 14h-17h
            </p>
          </div>

          <div className="bg-bg-mid/40 backdrop-blur-xl border border-white/10 rounded-xl p-4 min-h-[200px]">
            <p className="font-heading font-semibold text-base text-off-white mb-3">
              {scheduledDate ? "Horários disponíveis" : "Escolhe um dia →"}
            </p>
            {!scheduledDate && (
              <p className="text-sm text-off-white/40">
                Clica numa data no calendário pra ver os horários livres.
              </p>
            )}
            {scheduledDate && loadingSlots && (
              <p className="text-sm text-off-white/50 font-mono">Buscando…</p>
            )}
            {scheduledDate && slotsError && (
              <p className="text-sm text-red-300">{slotsError}</p>
            )}
            {scheduledDate && !loadingSlots && !slotsError && slots.length === 0 && (
              <p className="text-sm text-off-white/50">
                Sem horário nesse dia. Escolhe outro.
              </p>
            )}
            {slots.length > 0 && (
              <div className="grid grid-cols-3 gap-2">
                {slots.map((s) => (
                  <motion.button
                    key={s.time}
                    type="button"
                    onClick={() => s.available && setScheduledSlot(s.time)}
                    disabled={!s.available}
                    whileTap={s.available ? { scale: 0.95 } : undefined}
                    className={cn(
                      "px-2 py-2.5 rounded-lg text-sm font-mono transition-all",
                      !s.available
                        ? "bg-white/5 text-off-white/25 cursor-not-allowed line-through"
                        : scheduledSlot === s.time
                        ? "bg-cyan text-bg-dark font-bold shadow-lg shadow-cyan/30"
                        : "bg-white/5 text-off-white hover:bg-cyan/15 hover:text-cyan-bright border border-white/10 hover:border-cyan/40",
                    )}
                  >
                    {s.time}
                  </motion.button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Form mínimo */}
        <div className="bg-bg-mid/40 backdrop-blur-xl border border-white/10 rounded-xl p-4 md:p-5 space-y-3">
          <p className="font-heading font-semibold text-base text-off-white mb-1">
            Como posso te chamar?
          </p>
          <p className="text-xs text-off-white/40 mb-2">
            Seu WhatsApp já vem comigo quando você clicar pra enviar. Sem endereço, sem repetir telefone.
          </p>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Seu nome"
            className="w-full bg-bg-dark/60 border-2 border-white/10 focus:border-cyan rounded-lg px-4 py-3 text-off-white placeholder-off-white/30 outline-none transition-colors"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email (opcional, pra receber convite Meet)"
            className="w-full bg-bg-dark/60 border-2 border-white/10 focus:border-cyan rounded-lg px-4 py-3 text-off-white placeholder-off-white/30 outline-none transition-colors"
          />
        </div>
      </div>
    </WizardStepShell>
  );
}
