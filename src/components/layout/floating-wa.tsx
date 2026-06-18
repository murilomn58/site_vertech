"use client";

import { useEffect, useState } from "react";
import { buildIntentURL } from "@/lib/whatsappIntents";
import { WhatsAppIcon } from "@/components/primitives/icons";
import { cn } from "@/lib/utils";

/** Botão flutuante de WhatsApp, persistente. Aparece depois do primeiro scroll. */
export function FloatingWa() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href={buildIntentURL("outro")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className={cn(
        "fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-[0_10px_40px_-6px_rgba(37,211,102,0.6)] transition-all duration-500 hover:scale-110",
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-16 opacity-0",
      )}
    >
      <span className="absolute inset-0 animate-ping rounded-full bg-whatsapp/40" />
      <WhatsAppIcon className="relative h-7 w-7" />
    </a>
  );
}
