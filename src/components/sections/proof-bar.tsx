import { Section } from "@/components/primitives/section";
import { Reveal } from "@/components/primitives/reveal";
import { Counter } from "@/components/primitives/counter";

type Stat = {
  value: number | null;
  display?: string;
  prefix?: string;
  suffix?: string;
  label: string;
};

const STATS: Stat[] = [
  { value: 5, label: "projetos no ar" },
  { value: 4, label: "clientes com mensalidade recorrente" },
  { value: 2, label: "países atendidos (Brasil e França)" },
  { value: null, display: "24/7", label: "atendimento que não para" },
];

export function ProofBar() {
  return (
    <Section width="wide" className="border-y border-line bg-navy-deep/40 py-14 sm:py-16">
      <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
        {STATS.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.1}>
            <div className="text-center">
              <span className="block font-display text-4xl font-bold tracking-tight text-cyan sm:text-5xl">
                {s.value === null ? (
                  s.display
                ) : (
                  <Counter to={s.value} prefix={s.prefix} suffix={s.suffix} />
                )}
              </span>
              <span className="mt-2.5 block text-sm leading-snug text-ink-muted">
                {s.label}
              </span>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
