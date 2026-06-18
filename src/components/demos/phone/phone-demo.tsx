"use client";

import { AnimatePresence, motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { TiltCard } from "@/components/primitives/tilt-card";

/* ------------------------------------------------------------------ */
/* Telas do app (UI clara, estilo OdontoConnect — paciente/dentista)   */
/* ------------------------------------------------------------------ */

function StatusBar() {
  return (
    <div className="flex items-center justify-between px-5 pt-3 text-[10px] font-semibold text-slate-700">
      <span>9:41</span>
      <div className="flex items-center gap-1">
        <svg viewBox="0 0 18 12" className="h-2.5 w-4 fill-slate-700">
          <rect x="0" y="7" width="3" height="5" rx="1" />
          <rect x="5" y="4" width="3" height="8" rx="1" />
          <rect x="10" y="1" width="3" height="11" rx="1" />
          <rect x="15" y="0" width="3" height="12" rx="1" opacity="0.4" />
        </svg>
        <svg viewBox="0 0 24 12" className="h-2.5 w-5 fill-slate-700">
          <rect x="0" y="2" width="20" height="9" rx="2" opacity="0.35" />
          <rect x="1.5" y="3.5" width="14" height="6" rx="1" />
          <rect x="21" y="4.5" width="2" height="4" rx="1" />
        </svg>
      </div>
    </div>
  );
}

function BottomNav({ active }: { active: number }) {
  const items = [
    { d: "M3 11l9-8 9 8v8a2 2 0 0 1-2 2h-4v-6H9v6H5a2 2 0 0 1-2-2z", label: "Início" },
    { d: "M7 2v3M17 2v3M4 8h16M5 4h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z", label: "Agenda" },
    { d: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21a8 8 0 0 1 16 0", label: "Perfil" },
  ];
  return (
    <div className="mt-auto flex items-center justify-around border-t border-slate-100 bg-white px-2 py-2.5">
      {items.map((it, i) => (
        <div key={it.label} className="flex flex-col items-center gap-1">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`h-5 w-5 ${i === active ? "text-cyan-dark" : "text-slate-300"}`}
          >
            <path d={it.d} />
          </svg>
          <span className={`text-[8px] font-medium ${i === active ? "text-cyan-dark" : "text-slate-300"}`}>
            {it.label}
          </span>
        </div>
      ))}
    </div>
  );
}

function ScreenAgendar() {
  return (
    <div className="flex h-full flex-col bg-slate-50">
      <StatusBar />
      <div className="px-5 pt-3">
        <p className="text-[11px] text-slate-400">Bom dia,</p>
        <p className="font-display text-lg font-bold text-slate-800">Marina Souza</p>
        <div className="mt-3 flex items-center gap-2 rounded-2xl bg-white px-3 py-2.5 shadow-sm">
          <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-slate-400" strokeWidth="2">
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4-4" strokeLinecap="round" />
          </svg>
          <span className="text-[11px] text-slate-400">Buscar especialidade</span>
        </div>
      </div>
      <div className="mt-4 px-5">
        <p className="text-[11px] font-semibold text-slate-500">Especialidades</p>
        <div className="mt-2 grid grid-cols-3 gap-2">
          {["Clínico", "Ortodontia", "Limpeza"].map((e, i) => (
            <div
              key={e}
              className={`flex flex-col items-center gap-1.5 rounded-2xl px-2 py-3 ${
                i === 0 ? "bg-cyan-dark text-white" : "bg-white text-slate-600 shadow-sm"
              }`}
            >
              <div className={`h-5 w-5 rounded-full ${i === 0 ? "bg-white/30" : "bg-cyan/20"}`} />
              <span className="text-[9px] font-medium">{e}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 px-5">
        <p className="text-[11px] font-semibold text-slate-500">Dentistas perto de você</p>
        <div className="mt-2 space-y-2">
          {[
            { n: "Dra. Helena Reis", e: "Clínico geral", r: "4.9" },
            { n: "Dr. Paulo Antunes", e: "Ortodontia", r: "4.8" },
          ].map((d) => (
            <div key={d.n} className="flex items-center gap-3 rounded-2xl bg-white p-2.5 shadow-sm">
              <div className="h-9 w-9 flex-none rounded-full bg-gradient-to-br from-cyan to-cyan-dark" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-[11px] font-semibold text-slate-800">{d.n}</p>
                <p className="text-[9px] text-slate-400">{d.e}</p>
              </div>
              <span className="rounded-full bg-amber-50 px-1.5 py-0.5 text-[9px] font-semibold text-amber-600">
                ★ {d.r}
              </span>
            </div>
          ))}
        </div>
      </div>
      <BottomNav active={0} />
    </div>
  );
}

function ScreenConfirmacao() {
  return (
    <div className="flex h-full flex-col bg-slate-50">
      <StatusBar />
      <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 14 }}
          className="flex h-16 w-16 items-center justify-center rounded-full bg-cyan-dark"
        >
          <svg viewBox="0 0 24 24" className="h-8 w-8 fill-none stroke-white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12l5 5L20 7" />
          </svg>
        </motion.div>
        <p className="mt-4 font-display text-base font-bold text-slate-800">Consulta confirmada</p>
        <p className="mt-1 text-[11px] text-slate-400">Você vai receber o lembrete no WhatsApp</p>
        <div className="mt-5 w-full rounded-2xl bg-white p-4 text-left shadow-sm">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 flex-none rounded-full bg-gradient-to-br from-cyan to-cyan-dark" />
            <div>
              <p className="text-[11px] font-semibold text-slate-800">Dra. Helena Reis</p>
              <p className="text-[9px] text-slate-400">Clínico geral</p>
            </div>
          </div>
          <div className="mt-3 space-y-1.5 border-t border-slate-100 pt-3 text-[10px] text-slate-500">
            <p>Quinta, 26 de junho</p>
            <p className="font-semibold text-slate-800">14:30 · Consulta de rotina</p>
          </div>
        </div>
        <div className="mt-3 flex w-full items-center gap-2 rounded-2xl bg-whatsapp/10 px-3 py-2.5">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-whatsapp text-white text-[9px]">✓</span>
          <span className="text-[10px] font-medium text-emerald-700">Lembrete automático ativado</span>
        </div>
      </div>
      <BottomNav active={1} />
    </div>
  );
}

function ScreenAgenda() {
  return (
    <div className="flex h-full flex-col bg-slate-50">
      <StatusBar />
      <div className="px-5 pt-3">
        <p className="font-display text-lg font-bold text-slate-800">Minhas consultas</p>
      </div>
      <div className="mt-3 space-y-2 px-5">
        {[
          { d: "26 jun", h: "14:30", n: "Dra. Helena Reis", s: "Confirmada", c: "text-cyan-dark bg-cyan/10" },
          { d: "10 jul", h: "09:00", n: "Dr. Paulo Antunes", s: "Agendada", c: "text-amber-600 bg-amber-50" },
          { d: "02 mai", h: "16:00", n: "Dra. Helena Reis", s: "Concluída", c: "text-slate-400 bg-slate-100" },
        ].map((c) => (
          <div key={c.d + c.h} className="flex items-center gap-3 rounded-2xl bg-white p-3 shadow-sm">
            <div className="flex h-12 w-12 flex-none flex-col items-center justify-center rounded-xl bg-slate-50">
              <span className="text-[8px] uppercase text-slate-400">{c.d.split(" ")[1]}</span>
              <span className="text-sm font-bold text-slate-800">{c.d.split(" ")[0]}</span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[11px] font-semibold text-slate-800">{c.n}</p>
              <p className="text-[9px] text-slate-400">{c.h}</p>
            </div>
            <span className={`rounded-full px-2 py-0.5 text-[8px] font-semibold ${c.c}`}>{c.s}</span>
          </div>
        ))}
      </div>
      <BottomNav active={1} />
    </div>
  );
}

const SCREENS = [ScreenAgendar, ScreenConfirmacao, ScreenAgenda];

export function PhoneDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % SCREENS.length), 3200);
    return () => clearInterval(t);
  }, [inView]);

  const Screen = SCREENS[idx];

  return (
    <div ref={ref} className="mx-auto w-full max-w-[17rem]">
      <TiltCard className="rounded-[2.7rem]" max={7} glare={false}>
        <div className="relative rounded-[2.7rem] border-[6px] border-navy bg-navy p-0 shadow-[0_40px_90px_-25px_rgba(0,0,0,0.8)]">
          {/* glow cyan atras */}
          <div className="pointer-events-none absolute -inset-4 -z-10 rounded-[3rem] bg-cyan/20 blur-2xl" />
          {/* notch */}
          <div className="absolute left-1/2 top-0 z-20 h-5 w-24 -translate-x-1/2 rounded-b-2xl bg-navy" />
          <div className="relative h-[33rem] overflow-hidden rounded-[2.2rem] bg-white">
            <AnimatePresence mode="wait">
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="h-full"
              >
                <Screen />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </TiltCard>

      {/* dots de progresso */}
      <div className="mt-5 flex justify-center gap-1.5">
        {SCREENS.map((_, i) => (
          <span
            key={i}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === idx ? "w-5 bg-cyan" : "w-1.5 bg-ink-faint/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
