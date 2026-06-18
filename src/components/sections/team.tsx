import { Section, Eyebrow } from "@/components/primitives/section";
import { Reveal } from "@/components/primitives/reveal";
import { TiltCard } from "@/components/primitives/tilt-card";
import { LINKEDIN } from "@/lib/constants";

type Membro = {
  nome: string;
  inicial: string;
  cargo: string;
  desc: string;
  linkedin: string;
};

const MEMBROS: Membro[] = [
  {
    nome: "Murilo Narciso",
    inicial: "M",
    cargo: "CEO",
    desc: "Cuida de produto, estratégia e do atendimento aos clientes.",
    linkedin: LINKEDIN.murilo,
  },
  {
    nome: "Jean Kairo Crispim",
    inicial: "J",
    cargo: "CTO",
    desc: "Lidera a engenharia e a arquitetura dos produtos.",
    linkedin: LINKEDIN.jean,
  },
];

export function Team() {
  return (
    <Section id="team" width="wide">
      <div className="mx-auto max-w-2xl text-center">
        <Reveal>
          <Eyebrow className="justify-center">Quem faz</Eyebrow>
          <h2 className="mt-5 font-display text-3xl font-bold leading-tight text-ink sm:text-4xl lg:text-[2.8rem]">
            Gente de verdade{" "}
            <span className="text-gradient">do outro lado.</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-ink-muted">
            Quando você chama no WhatsApp, quem responde é sócio da empresa, não
            um call center.
          </p>
        </Reveal>
      </div>

      <div className="mx-auto mt-14 grid max-w-3xl gap-5 sm:grid-cols-2">
        {MEMBROS.map((m, i) => (
          <Reveal key={m.nome} delay={i * 0.1}>
            <TiltCard className="h-full rounded-3xl" max={5}>
              <div className="glass flex h-full flex-col rounded-3xl p-7">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan to-cyan-dark font-display text-xl font-bold text-navy-deep">
                  {m.inicial}
                </span>
                <h3 className="mt-6 font-display text-xl font-semibold text-ink">
                  {m.nome}
                </h3>
                <p className="mt-1 text-sm font-medium text-cyan">{m.cargo}</p>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                  {m.desc}
                </p>
                <a
                  href={m.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center text-sm font-medium text-cyan hover:underline"
                >
                  LinkedIn
                </a>
              </div>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
