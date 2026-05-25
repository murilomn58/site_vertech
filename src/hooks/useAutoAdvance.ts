"use client";

import { useEffect, useRef } from "react";

/**
 * Hook utilitario: agenda um callback com delay e o cancela no unmount
 * (evita race condition quando o user clica Voltar antes do auto-advance).
 *
 * Retorna uma funcao 'schedule' — chama com o callback que deve rodar apos delay.
 */
export function useAutoAdvance(delayMs = 500) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, []);

  return (callback: () => void) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      callback();
      timerRef.current = null;
    }, delayMs);
  };
}
