"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useWizard } from "@/stores/wizard-store";
import {
  findDor,
  findInteresse,
  findPorte,
  findUrgencia,
} from "@/lib/catalogo";
import { cn } from "@/lib/utils";

function formatDateBR(iso: string | null): string {
  if (!iso) return "";
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}

type FounderProps = {
  name: string;
  role: string;
  edu: string;
  photo: string;
  achievements: string[];
};

function FounderMini({ name, role, edu, photo, achievements }: FounderProps) {
  return (
    <div className="bg-bg-dark/60 border border-white/10 rounded-xl p-3 md:p-4">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden bg-white/5 shrink-0 ring-2 ring-cyan/30">
          <Image
            src={`/images/${photo}`}
            alt={name}
            width={120}
            height={120}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="min-w-0">
          <p className="font-heading font-semibold text-sm md:text-base text-off-white leading-tight truncate">
            {name}
          </p>
          <p className="text-xs md:text-sm text-cyan-bright font-medium">{role}</p>
          <p className="text-[10px] md:text-xs text-off-white/50 leading-tight">
            {edu}
          </p>
        </div>
      </div>
      <ul className="space-y-1">
        {achievements.map((a) => (
          <li
            key={a}
            className="text-[11px] md:text-xs text-off-white/70 flex items-start gap-1.5 leading-tight"
          >
            <span className="text-cyan mt-0.5">✓</span>
            <span>{a}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ModalEnviar() {
  const closeModal = useWizard((s) => s.closeModal);
  const modalState = useWizard((s) => s.modalState);
  const setModalState = useWizard((s) => s.setModalState);
  const setConfirmation = useWizard((s) => s.setConfirmation);
  const reset = useWizard((s) => s.reset);

  const interesse = useWizard((s) => s.interesse);
  const dorId = useWizard((s) => s.dor);
  const observacaoLivre = useWizard((s) => s.observacaoLivre);
  const porte = useWizard((s) => s.porte);
  const urgencia = useWizard((s) => s.urgencia);
  const scheduledDate = useWizard((s) => s.scheduledDate);
  const scheduledSlot = useWizard((s) => s.scheduledSlot);
  const contact = useWizard((s) => s.contact);
  const meetLink = useWizard((s) => s.meetLink);
  const waUrl = useWizard((s) => s.waUrl);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const interesseObj = findInteresse(interesse);
  const dorObj = findDor(interesse, dorId);
  const porteObj = findPorte(porte);
  const urgenciaObj = findUrgencia(urgencia);

  async function handleSubmit() {
    if (!contact || !scheduledDate || !scheduledSlot || !interesse) return;
    setErrorMessage(null);
    setModalState("submitting");
    try {
      const res = await fetch("/api/agendar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          interesse,
          dor: dorId,
          observacaoLivre,
          porte,
          urgencia,
          data: scheduledDate,
          slot: scheduledSlot,
          nome: contact.nome,
          telefone: contact.telefone ?? "",
          email: contact.email,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Não consegui marcar agora. Tenta de novo.");
      }
      setConfirmation(data.meetLink, data.waUrl);
      setModalState("success");
      window.open(data.waUrl, "_blank");
    } catch (err) {
      setModalState("idle");
      setErrorMessage(err instanceof Error ? err.message : "Erro inesperado");
    }
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-bg-dark/85 backdrop-blur-2xl"
        onClick={modalState === "submitting" ? undefined : closeModal}
      />

      {/* Modal */}
      <motion.div
        initial={{ scale: 0.92, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.92, y: 10, opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative bg-gradient-to-br from-bg-mid via-navy to-bg-dark border-2 border-cyan/30 rounded-2xl shadow-2xl shadow-cyan/20 w-full max-w-lg max-h-[92vh] overflow-y-auto"
      >
        {/* Close */}
        {modalState !== "submitting" && (
          <button
            type="button"
            onClick={closeModal}
            className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center text-off-white/50 hover:text-off-white hover:bg-white/5 rounded-full transition-colors z-10"
            aria-label="Fechar"
          >
            ✕
          </button>
        )}

        <div className="p-5 md:p-7">
          {modalState !== "success" ? (
            <>
              {/* Quem é a gente */}
              <p className="text-center text-xs font-mono uppercase tracking-[0.22em] text-cyan/70 mb-3">
                Quem é a gente
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                <FounderMini
                  name="Murilo Narciso"
                  role="Co-fundador · CEO"
                  edu="Eng. Civil · IME"
                  photo="fotolinkedinmurilo.jfif"
                  achievements={[
                    "Hackathon IA 2025 (COPPE/UFRJ)",
                    "1º lugar Programa VALE 2025",
                    "4 anos em P&D (CNPq)",
                  ]}
                />
                <FounderMini
                  name="Jean Kairo"
                  role="Co-fundador · CTO"
                  edu="Eng. Telecom · IME"
                  photo="fotolinkedinjean.jfif"
                  achievements={[
                    "Hackathon IA 2025 (COPPE/UFRJ)",
                    "Cybersecurity · West Point",
                    "Especialista RAG e Agentes IA",
                  ]}
                />
              </div>

              <p className="text-sm md:text-base text-off-white/75 leading-relaxed text-center mb-5 px-2">
                Dois engenheiros formados pelo IME, atendendo PMEs com IA, apps e
                automação. Murilo e Jean tocam tudo direto, sem intermediário.
              </p>

              <div className="border-t border-white/10 pt-4 mb-5">
                <p className="text-center text-xs font-mono uppercase tracking-[0.22em] text-cyan/70 mb-3">
                  Resumo do que vai mandar
                </p>
                <div className="bg-bg-dark/50 border border-white/10 rounded-xl p-4 space-y-1.5 text-sm">
                  <p className="text-off-white">
                    <span className="text-off-white/50">Quando:</span>{" "}
                    <span className="text-cyan-bright font-mono">
                      {formatDateBR(scheduledDate)} às {scheduledSlot}
                    </span>
                  </p>
                  {interesseObj && (
                    <p className="text-off-white/80">
                      <span className="text-off-white/50">Interesse:</span> {interesseObj.label}
                    </p>
                  )}
                  {dorObj && (
                    <p className="text-off-white/80">
                      <span className="text-off-white/50">Dor:</span> {dorObj.label}
                    </p>
                  )}
                  {observacaoLivre && !dorObj && (
                    <p className="text-off-white/80">
                      <span className="text-off-white/50">Contexto:</span> {observacaoLivre}
                    </p>
                  )}
                  {porteObj && (
                    <p className="text-off-white/80">
                      <span className="text-off-white/50">Porte:</span> {porteObj.label}
                    </p>
                  )}
                  {urgenciaObj && (
                    <p className="text-off-white/80">
                      <span className="text-off-white/50">Urgência:</span> {urgenciaObj.label}
                    </p>
                  )}
                  {contact?.email && (
                    <p className="text-off-white/80">
                      <span className="text-off-white/50">Email:</span> {contact.email}
                    </p>
                  )}
                </div>
                <p className="text-xs text-off-white/40 mt-2 text-center">
                  Seu número vem comigo direto pelo WhatsApp.
                </p>
              </div>

              {errorMessage && (
                <div className="bg-red-500/15 border border-red-500/40 rounded-lg px-3 py-2 text-xs text-red-200 mb-3">
                  {errorMessage}
                </div>
              )}

              <button
                type="button"
                onClick={handleSubmit}
                disabled={modalState === "submitting"}
                className={cn(
                  "w-full px-5 py-4 rounded-xl font-heading font-bold text-base md:text-lg tracking-wide transition-all",
                  modalState === "submitting"
                    ? "bg-cyan/30 text-bg-dark/60 cursor-wait"
                    : "bg-gradient-to-r from-cyan via-cyan-bright to-cyan text-bg-dark hover:shadow-2xl hover:shadow-cyan/40 hover:scale-[1.02] active:scale-100",
                )}
              >
                {modalState === "submitting"
                  ? "Marcando reunião…"
                  : "Enviar pra Murilo no WhatsApp →"}
              </button>

              <button
                type="button"
                onClick={closeModal}
                disabled={modalState === "submitting"}
                className="w-full mt-2 px-4 py-2 text-xs text-off-white/40 hover:text-off-white/70 font-mono uppercase tracking-widest transition-colors disabled:opacity-30"
              >
                Voltar e revisar
              </button>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35 }}
              className="text-center py-2"
            >
              <div className="w-16 h-16 rounded-full bg-cyan/15 border-2 border-cyan/60 flex items-center justify-center mx-auto mb-4 text-3xl">
                ✓
              </div>
              <h3 className="font-heading font-bold text-xl md:text-2xl text-off-white mb-2">
                Reunião marcada
              </h3>
              <p className="text-sm md:text-base text-off-white/70 mb-5 leading-relaxed">
                Abri o WhatsApp do Murilo numa nova aba. Toca em{" "}
                <strong className="text-cyan-bright">Enviar</strong> lá pra confirmar
                comigo.
              </p>

              {meetLink && (
                <a
                  href={meetLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/15 rounded-lg text-cyan-bright font-mono text-xs md:text-sm break-all mb-3 transition-colors"
                >
                  🎥 {meetLink}
                </a>
              )}

              {waUrl && (
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full px-5 py-3 bg-whatsapp hover:bg-whatsapp/90 text-white font-heading font-semibold rounded-xl transition-colors mb-5"
                >
                  Reabrir WhatsApp
                </a>
              )}

              <div className="border-t border-white/10 pt-5 mt-2 space-y-3">
                <Link
                  href="/pt/sobre"
                  className="block w-full px-5 py-4 bg-gradient-to-r from-cyan via-cyan-bright to-cyan text-bg-dark font-heading font-bold text-base md:text-lg tracking-wide rounded-xl shadow-lg shadow-cyan/30 hover:shadow-xl hover:shadow-cyan/50 hover:scale-[1.02] active:scale-100 transition-all"
                >
                  Saiba mais sobre a Vertech →
                </Link>

                <button
                  type="button"
                  onClick={() => {
                    closeModal();
                    reset();
                  }}
                  className="block w-full px-5 py-4 bg-transparent text-cyan-bright font-heading font-bold text-base md:text-lg tracking-wide rounded-xl border-2 border-cyan-bright/70 hover:bg-cyan-bright/10 hover:border-cyan-bright hover:shadow-lg hover:shadow-cyan-bright/30 hover:scale-[1.02] active:scale-100 transition-all"
                >
                  Marcar outra conversa
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
