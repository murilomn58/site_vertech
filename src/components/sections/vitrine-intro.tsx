import type { ReactNode } from "react";
import { Section, Eyebrow } from "@/components/primitives/section";
import { Reveal } from "@/components/primitives/reveal";
import { TiltCard } from "@/components/primitives/tilt-card";
import { ArrowRight } from "@/components/primitives/icons";

type Card = {
  n: string;
  href: string;
  titulo: string;
  desc: string;
  icon: ReactNode;
};

const ChatGlyph = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-7 w-7">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);
const PhoneGlyph = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-7 w-7">
    <rect x="6" y="2" width="12" height="20" rx="3" />
    <path d="M11 18h2" />
  </svg>
);
const SiteGlyph = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-7 w-7">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="M2 9h20M6 6.5h.01M9 6.5h.01" />
  </svg>
);

const CARDS: Card[] = [
  {
    n: "01",
    href: "#demo-chat",
    titulo: "Assistente de IA",
    desc: "Atende e vende no WhatsApp, 24 horas por dia, sem você precisar estar online.",
    icon: ChatGlyph,
  },
  {
    n: "02",
    href: "#demo-app",
    titulo: "Aplicativo sob medida",
    desc: "Seu negócio na mão do cliente: agendamento, gestão e controle no celular.",
    icon: PhoneGlyph,
  },
  {
    n: "03",
    href: "#demo-site",
    titulo: "Site que impressiona",
    desc: "Não é site de modelo. É uma experiência que faz o visitante virar cliente.",
    icon: SiteGlyph,
  },
];

export function VitrineIntro() {
  return (
    <Section id="vitrine" width="wide" className="pt-28">
      <div className="mx-auto max-w-2xl text-center">
        <Reveal>
          <Eyebrow className="justify-center">Veja funcionando, ao vivo</Eyebrow>
          <h2 className="mt-5 font-display text-3xl font-bold leading-tight text-ink sm:text-5xl">
            Três jeitos de pôr a IA{" "}
            <span className="text-gradient">pra trabalhar</span> pra você.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-ink-muted">
            Tudo aqui embaixo é de verdade, rodando agora nesta página. Mexa,
            role, experimente. Quando gostar de um, é só chamar no WhatsApp que a
            gente faz o seu.
          </p>
        </Reveal>
      </div>

      <div className="mt-14 grid gap-5 md:grid-cols-3">
        {CARDS.map((c, i) => (
          <Reveal key={c.n} delay={i * 0.1}>
            <a href={c.href} className="block h-full">
              <TiltCard className="h-full rounded-3xl" max={5}>
                <div className="glass flex h-full flex-col rounded-3xl p-7 transition-colors duration-300 hover:border-cyan/30">
                  <div className="flex items-center justify-between">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan/10 text-cyan">
                      {c.icon}
                    </span>
                    <span className="font-mono text-xs text-ink-faint">{c.n}</span>
                  </div>
                  <h3 className="mt-6 font-display text-xl font-semibold text-ink">
                    {c.titulo}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-ink-muted">
                    {c.desc}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-cyan">
                    Ver demonstração
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </TiltCard>
            </a>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
