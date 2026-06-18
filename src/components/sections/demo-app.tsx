import { Section, Eyebrow } from "@/components/primitives/section";
import { Reveal } from "@/components/primitives/reveal";
import { WaCta } from "@/components/primitives/wa-cta";
import { PhoneDemo } from "@/components/demos/phone/phone-demo";

const BULLETS = [
  "Agendamento e gestão direto no celular, sem precisar de telefonema.",
  "Confirmação e lembrete automáticos no WhatsApp, sem ninguém ligando.",
  "Feito sob medida pro seu fluxo, não um template engessado.",
];

export function DemoApp() {
  return (
    <Section id="demo-app" width="wide" className="bg-navy-deep/30">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal className="order-2 lg:order-1">
          <PhoneDemo />
        </Reveal>

        <Reveal delay={0.1} className="order-1 lg:order-2">
          <Eyebrow>Aplicativo sob medida</Eyebrow>
          <h2 className="mt-5 font-display text-3xl font-bold leading-tight text-ink sm:text-4xl lg:text-[2.8rem]">
            O seu negócio na{" "}
            <span className="text-gradient">palma da mão</span> do cliente.
          </h2>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-ink-muted">
            Este é o OdontoConnect, um app que a gente construiu pra conectar
            paciente e dentista. Toque ao lado e veja as telas. O seu app faz o
            que o seu negócio precisa, do mesmo jeito caprichado.
          </p>
          <ul className="mt-7 space-y-3">
            {BULLETS.map((b) => (
              <li key={b} className="flex gap-3 text-sm leading-relaxed text-ink">
                <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-cyan" />
                {b}
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <WaCta intent="app" from="OdontoConnect" size="lg">
              Quero um app assim
            </WaCta>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
