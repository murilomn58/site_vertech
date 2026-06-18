import { Section, Eyebrow } from "@/components/primitives/section";
import { Reveal } from "@/components/primitives/reveal";
import { TiltCard } from "@/components/primitives/tilt-card";
import { WaCta } from "@/components/primitives/wa-cta";
import { ArrowRight } from "@/components/primitives/icons";
import { CASES } from "@/lib/showcase";

export function CasesGallery() {
  return (
    <Section id="cases" width="wide">
      <div className="mx-auto max-w-2xl text-center">
        <Reveal>
          <Eyebrow className="justify-center">Cases reais</Eyebrow>
          <h2 className="mt-5 font-display text-3xl font-bold leading-tight text-ink sm:text-5xl">
            Não é promessa. <span className="text-gradient">Já está no ar.</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-ink-muted">
            Coisas que a Vertech construiu e que funcionam de verdade, com
            clientes de verdade, no Brasil e na França.
          </p>
        </Reveal>
      </div>

      <div className="mt-14 grid gap-5 sm:grid-cols-2">
        {CASES.map((c, i) => (
          <Reveal key={c.id} delay={(i % 2) * 0.1}>
            <TiltCard className="h-full rounded-3xl" max={4} glare={false}>
              <div className="glass flex h-full flex-col rounded-3xl p-7 transition-colors duration-300 hover:border-cyan/30">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-cyan/10 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-cyan">
                    {c.categoria}
                  </span>
                  {c.url && (
                    <a
                      href={c.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-ink-muted transition-colors hover:text-cyan"
                    >
                      {c.urlLabel}
                      <svg viewBox="0 0 24 24" className="h-3 w-3 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M7 17L17 7M7 7h10v10" />
                      </svg>
                    </a>
                  )}
                </div>

                <h3 className="mt-5 font-display text-2xl font-bold text-ink">{c.nome}</h3>
                <p className="mt-1.5 text-sm font-medium text-cyan-bright">{c.tagline}</p>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">{c.descricao}</p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {c.destaques.map((d) => (
                    <span
                      key={d}
                      className="rounded-full border border-line px-2.5 py-1 text-[11px] text-ink-muted"
                    >
                      {d}
                    </span>
                  ))}
                </div>

                <div className="mt-7 flex items-center gap-4 border-t border-line pt-5">
                  <WaCta intent={c.tipo} from={c.nome} size="md">
                    Quero algo assim
                  </WaCta>
                </div>
              </div>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
