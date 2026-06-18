import Image from "next/image";
import { Section, Eyebrow } from "@/components/primitives/section";
import { Reveal } from "@/components/primitives/reveal";
import { TiltCard } from "@/components/primitives/tilt-card";
import { LINKEDIN } from "@/lib/constants";

type Membro = {
  nome: string;
  foto: string;
  cargo: string;
  desc: string;
  linkedin: string;
};

const MEMBROS: Membro[] = [
  {
    nome: "Murilo Narciso",
    foto: "/images/team/murilo.png",
    cargo: "CEO · Cofundador",
    desc: "Cuida de produto, estratégia e do atendimento direto aos clientes. É com ele que você fala no WhatsApp.",
    linkedin: LINKEDIN.murilo,
  },
  {
    nome: "Jean Kairo Crispim",
    foto: "/images/team/jean.png",
    cargo: "CTO · Cofundador",
    desc: "Lidera a engenharia e a arquitetura dos produtos. Quem garante que a IA funciona de verdade.",
    linkedin: LINKEDIN.jean,
  },
];

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

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
            <TiltCard className="h-full rounded-3xl" max={5} glare={false}>
              <div className="group glass flex h-full flex-col rounded-3xl p-7 transition-colors duration-300 hover:border-cyan/30">
                <div className="flex items-center gap-4">
                  <div className="relative h-20 w-20 flex-none">
                    <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-cyan/50 to-cyan-dark/10 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100" />
                    <div className="relative h-20 w-20 overflow-hidden rounded-full border-2 border-cyan/30 bg-surface-2">
                      <Image
                        src={m.foto}
                        alt={`Foto de ${m.nome}`}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-display text-xl font-semibold text-ink">
                      {m.nome}
                    </h3>
                    <p className="mt-0.5 text-sm font-medium text-cyan">{m.cargo}</p>
                  </div>
                </div>

                <p className="mt-5 flex-1 text-sm leading-relaxed text-ink-muted">
                  {m.desc}
                </p>

                <a
                  href={m.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-ink-muted transition-colors hover:text-cyan"
                >
                  <LinkedInIcon />
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
