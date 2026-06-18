import type { ReactNode } from "react";
import { buildIntentURL, type Intent } from "@/lib/whatsappIntents";
import { cn } from "@/lib/utils";
import { WhatsAppIcon } from "./icons";

type Variant = "primary" | "whatsapp" | "ghost";
type Size = "md" | "lg";

type Props = {
  /** intenção do funil — define a mensagem pré-preenchida no WhatsApp */
  intent?: Intent;
  /** nome do case de origem ("vim pelo case Leila IA") */
  from?: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  /** mostra o glifo do WhatsApp */
  icon?: boolean;
};

const base =
  "group relative inline-flex items-center justify-center gap-2.5 rounded-full font-display font-semibold tracking-tight transition-all duration-300 will-change-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan/60 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-dark";

const sizes: Record<Size, string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

const variants: Record<Variant, string> = {
  primary:
    "bg-cyan text-navy-deep shadow-[0_8px_30px_-6px_rgba(34,211,238,0.5)] hover:bg-cyan-bright hover:shadow-[0_10px_40px_-4px_rgba(34,211,238,0.7)] hover:-translate-y-0.5",
  whatsapp:
    "bg-whatsapp text-white shadow-[0_8px_30px_-6px_rgba(37,211,102,0.5)] hover:brightness-110 hover:-translate-y-0.5",
  ghost:
    "glass text-ink hover:border-cyan/40 hover:text-cyan-bright hover:-translate-y-0.5",
};

/**
 * CTA de WhatsApp por intenção. Abre wa.me/5549999551051 com a mensagem do
 * funil já escrita. É o caminho principal de conversão do site.
 */
export function WaCta({
  intent = "outro",
  from,
  children,
  variant = "primary",
  size = "md",
  className,
  icon = true,
}: Props) {
  return (
    <a
      href={buildIntentURL(intent, from)}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(base, sizes[size], variants[variant], className)}
    >
      {icon && (
        <WhatsAppIcon className="h-[1.05em] w-[1.05em] transition-transform duration-300 group-hover:scale-110" />
      )}
      {children}
    </a>
  );
}
