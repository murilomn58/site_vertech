import { Section, Eyebrow } from "@/components/primitives/section";
import { Reveal } from "@/components/primitives/reveal";
import { WaCta } from "@/components/primitives/wa-cta";

type Card = {
  titulo: string;
  texto: string;
};

const CARDS: Card[] = [
  {
    titulo: "Dados no Brasil",
    texto:
      "Infraestrutura e dados tratados conforme a LGPD (Lei 13.709/2018).",
  },
  {
    titulo: "Você no controle",
    texto:
      "Seus dados são seus. Pode pedir acesso, correção ou exclusão quando quiser.",
  },
  {
    titulo: "Sem letra miúda",
    texto:
      "A gente monta, você testa, e só segue se fizer sentido. Sem contrato eterno.",
  },
  {
    titulo: "Conversas sob sigilo",
    texto:
      "Tratamos as conversas com o cuidado que a sua operação exige.",
  },
];

export function SecurityLgpd() {
  return (
    <Section id="seguranca" width="wide">
      <div className="mx-auto max-w-2xl text-center">
        <Reveal>
          <Eyebrow className="justify-center">Segurança e LGPD</Eyebrow>
          <h2 className="mt-5 font-display text-3xl font-bold leading-tight text-ink sm:text-4xl lg:text-[2.8rem]">
            A sua IA, com os seus dados{" "}
            <span className="text-gradient">protegidos.</span>
          </h2>
        </Reveal>
      </div>

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {CARDS.map((c, i) => (
          <Reveal key={c.titulo} delay={i * 0.1}>
            <div className="glass flex h-full flex-col rounded-3xl p-7">
              <span className="h-2.5 w-2.5 rounded-full bg-cyan" />
              <h3 className="mt-5 font-display text-lg font-semibold text-ink">
                {c.titulo}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-ink-muted">
                {c.texto}
              </p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1} className="mt-10 flex flex-col items-center gap-5 text-center">
        <a href="/pt/privacidade" className="text-sm text-cyan hover:underline">
          Política de Privacidade
        </a>
        <WaCta intent="outro" variant="ghost">
          Tirar uma dúvida
        </WaCta>
      </Reveal>
    </Section>
  );
}
