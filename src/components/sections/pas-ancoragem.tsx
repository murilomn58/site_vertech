import { Section, Eyebrow } from "@/components/primitives/section";
import { Reveal } from "@/components/primitives/reveal";
import { WaCta } from "@/components/primitives/wa-cta";

type Passo = {
  n: string;
  rotulo: string;
  texto: string;
};

const PASSOS: Passo[] = [
  {
    n: "01",
    rotulo: "O problema",
    texto: "Você perde cliente toda vez que não responde na hora.",
  },
  {
    n: "02",
    rotulo: "O que isso custa",
    texto:
      "Cada mensagem sem resposta no fim de semana ou de madrugada é um orçamento que foi pra outro. E contratar gente pra isso custa caro.",
  },
  {
    n: "03",
    rotulo: "A saída",
    texto:
      "A IA da Vertech atende na hora, todo dia, e te entrega o cliente já aquecido.",
  },
];

export function PasAncoragem() {
  return (
    <Section id="por-que-agora" width="wide">
      <div className="mx-auto max-w-2xl text-center">
        <Reveal>
          <Eyebrow className="justify-center">Por que agora</Eyebrow>
          <h2 className="mt-5 font-display text-3xl font-bold leading-tight text-ink sm:text-4xl lg:text-[2.8rem]">
            Todo cliente que você não responde na hora{" "}
            <span className="text-gradient">vira venda do concorrente.</span>
          </h2>
        </Reveal>
      </div>

      <div className="mt-14 grid gap-5 md:grid-cols-3">
        {PASSOS.map((p, i) => (
          <Reveal key={p.n} delay={i * 0.1}>
            <div className="glass flex h-full flex-col rounded-3xl p-7">
              <span className="font-mono text-xs text-ink-faint">{p.n}</span>
              <h3 className="mt-4 font-display text-lg font-semibold text-cyan">
                {p.rotulo}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-ink-muted">
                {p.texto}
              </p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1} className="mt-12">
        <div className="glass overflow-hidden rounded-3xl p-8 sm:p-10">
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-ink-faint">
                Uma recepcionista
              </span>
              <p className="mt-3 font-display text-2xl font-bold text-ink sm:text-3xl">
                A partir de R$ 1.800 por mês
              </p>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                Mais encargos, férias e folga. E mesmo assim ninguém atende de
                madrugada.
              </p>
            </div>
            <div className="md:border-l md:border-line md:pl-8">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-cyan">
                Um assistente de IA da Vertech
              </span>
              <p className="mt-3 font-display text-2xl font-bold text-ink sm:text-3xl">
                <span className="text-gradient">Trabalha 24 horas, todos os dias</span>
              </p>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                Por uma fração disso. Menos do que você gasta com um cafezinho por
                dia. E sites profissionais começam em R$ 1.000.
              </p>
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.2} className="mt-10 text-center">
        <WaCta intent="outro" size="lg">
          Quero parar de perder cliente
        </WaCta>
      </Reveal>
    </Section>
  );
}
