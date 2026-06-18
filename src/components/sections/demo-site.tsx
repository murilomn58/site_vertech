import { Section, Eyebrow } from "@/components/primitives/section";
import { Reveal } from "@/components/primitives/reveal";
import { WaCta } from "@/components/primitives/wa-cta";
import { BrowserDemo } from "@/components/demos/browser/browser-demo";

const BULLETS = [
  "Conceito visual sob medida pro seu nicho, não um tema pronto.",
  "Rápido no celular e bonito em qualquer tela.",
  "Pensado pra transformar visita em mensagem no seu WhatsApp.",
];

export function DemoSite() {
  return (
    <Section id="demo-site" width="wide">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <Eyebrow>Site imersivo</Eyebrow>
          <h2 className="mt-5 font-display text-3xl font-bold leading-tight text-ink sm:text-4xl lg:text-[2.8rem]">
            Um site que faz o visitante parar e{" "}
            <span className="text-gradient">virar cliente.</span>
          </h2>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-ink-muted">
            O site que você está navegando agora já é um exemplo do que a gente
            faz. Lá fora, o nosso trabalho está no ar até na França, no site da
            Messiê Forró. Cada nicho ganha um conceito próprio e um caminho claro
            pro WhatsApp.
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
            <WaCta intent="site" from="Site imersivo" size="lg">
              Quero um site assim
            </WaCta>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="lg:pl-8">
          <BrowserDemo />
        </Reveal>
      </div>
    </Section>
  );
}
