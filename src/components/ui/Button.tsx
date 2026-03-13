"use client";
import { cn } from "@/lib/utils";

type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  href?: string;
  className?: string;
  onClick?: () => void;
};

export default function Button({ children, variant = "primary", href, className, onClick }: ButtonProps) {
  const base = "inline-flex items-center justify-center px-6 py-3 rounded-lg font-heading font-semibold text-sm transition-all duration-300";
  const variants = {
    primary: "bg-cyan text-bg-dark hover:bg-cyan-bright shadow-lg shadow-cyan/25 hover:shadow-cyan/40",
    secondary: "border border-cyan text-cyan hover:bg-cyan/10",
  };
  const cls = cn(base, variants[variant], className);
  if (href) {
    return <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className={cls}>{children}</a>;
  }
  return <button onClick={onClick} className={cls}>{children}</button>;
}
