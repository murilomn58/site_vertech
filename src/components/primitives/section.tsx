import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  id?: string;
  children: ReactNode;
  className?: string;
  /** largura do container interno */
  width?: "default" | "wide" | "narrow";
};

const widths = {
  narrow: "max-w-3xl",
  default: "max-w-6xl",
  wide: "max-w-7xl",
};

/** Seção com container centralizado e padding vertical/horizontal consistentes. */
export function Section({ id, children, className, width = "default" }: Props) {
  return (
    <section id={id} className={cn("relative w-full px-5 py-20 sm:px-8 sm:py-28", className)}>
      <div className={cn("mx-auto w-full", widths[width])}>{children}</div>
    </section>
  );
}

type EyebrowProps = { children: ReactNode; className?: string };

/** Rótulo pequeno cyan em caixa alta acima de um título de seção. */
export function Eyebrow({ children, className }: EyebrowProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.25em] text-cyan",
        className,
      )}
    >
      <span className="h-px w-6 bg-cyan/60" />
      {children}
    </span>
  );
}
