"use client";

import Link from "next/link";
import { useLocale } from "next-intl";

export function WizardHeader() {
  const locale = useLocale();

  return (
    <header className="px-4 md:px-12 py-4 md:py-5 flex items-center justify-between gap-4">
      <Link
        href={`/${locale}`}
        className="font-heading font-bold text-xl md:text-2xl text-white select-none"
      >
        VERTECH <span className="text-cyan">Soluções</span>
      </Link>

      <Link
        href={`/${locale}/sobre`}
        className="text-xs md:text-sm font-medium text-off-white/60 hover:text-cyan transition-colors border border-white/10 hover:border-cyan/40 rounded-full px-3 md:px-4 py-1.5"
      >
        Conhecer a Vertech →
      </Link>
    </header>
  );
}
