"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { VertechMark } from "@/components/primitives/icons";
import { WaCta } from "@/components/primitives/wa-cta";

const LINKS = [
  { href: "#vitrine", label: "Exemplos" },
  { href: "#cases", label: "Cases" },
  { href: "#seguranca", label: "Segurança" },
  { href: "#contato", label: "Contato" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled ? "py-2" : "py-4",
      )}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div
          className={cn(
            "flex items-center justify-between rounded-full px-4 py-2.5 transition-all duration-500 sm:px-5",
            scrolled ? "glass shadow-[0_8px_30px_-12px_rgba(0,0,0,0.6)]" : "border border-transparent",
          )}
        >
          <a href="#top" className="flex items-center gap-2.5">
            <VertechMark className="h-7 w-7" />
            <span className="font-display text-base font-bold tracking-tight text-ink">
              Vertech<span className="text-cyan">.</span>
            </span>
          </a>

          <nav className="hidden items-center gap-7 md:flex">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-ink-muted transition-colors hover:text-ink"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <WaCta intent="outro" size="md" className="hidden sm:inline-flex" icon>
              Falar agora
            </WaCta>
            <button
              type="button"
              aria-label="Menu"
              onClick={() => setOpen((v) => !v)}
              className="glass flex h-10 w-10 items-center justify-center rounded-full md:hidden"
            >
              <span className="relative block h-3 w-4">
                <span
                  className={cn(
                    "absolute left-0 h-0.5 w-4 bg-ink transition-all",
                    open ? "top-1.5 rotate-45" : "top-0",
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 top-1.5 h-0.5 w-4 bg-ink transition-all",
                    open ? "opacity-0" : "opacity-100",
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 h-0.5 w-4 bg-ink transition-all",
                    open ? "top-1.5 -rotate-45" : "top-3",
                  )}
                />
              </span>
            </button>
          </div>
        </div>

        {/* Menu mobile */}
        <div
          className={cn(
            "mt-2 overflow-hidden rounded-3xl transition-all duration-300 md:hidden",
            open ? "max-h-80 opacity-100" : "max-h-0 opacity-0",
          )}
        >
          <div className="glass flex flex-col gap-1 p-3">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-2xl px-4 py-3 text-sm font-medium text-ink-muted transition-colors hover:bg-white/5 hover:text-ink"
              >
                {l.label}
              </a>
            ))}
            <WaCta intent="outro" size="lg" className="mt-1 w-full" icon>
              Chamar no WhatsApp
            </WaCta>
          </div>
        </div>
      </div>
    </header>
  );
}
