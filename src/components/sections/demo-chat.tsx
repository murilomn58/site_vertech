import { Section, Eyebrow } from "@/components/primitives/section";
import { Reveal } from "@/components/primitives/reveal";
import { WaCta } from "@/components/primitives/wa-cta";
import { ChatWindow } from "@/components/demos/chat/chat-window";
import { LEILA_SCRIPT } from "@/components/demos/chat/script";

const BULLETS = [
  "Responde na hora, 24 horas por dia, no WhatsApp que o cliente já usa.",
  "Aprende os seus dados e fala do seu jeito, não respostas genéricas.",
  "Resolve o que dá pra resolver e te passa a conversa quando precisa de você.",
];

export function DemoChat() {
  return (
    <Section id="demo-chat" width="wide">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <Eyebrow>Assistente de IA</Eyebrow>
          <h2 className="mt-5 font-display text-3xl font-bold leading-tight text-ink sm:text-4xl lg:text-[2.8rem]">
            Um atendente que nunca dorme,{" "}
            <span className="text-gradient">nunca falta</span> e responde na hora.
          </h2>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-ink-muted">
            Esta conversa está acontecendo ao lado, agora. É o mesmo tipo de
            assistente que a gente colocou pra atender no WhatsApp da Leila IA.
            Experimente imaginar ele atendendo o seu cliente.
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
            <WaCta intent="assistente-ia" from="Leila IA" size="lg">
              Quero um assistente assim
            </WaCta>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="lg:pl-8">
          <ChatWindow script={LEILA_SCRIPT} />
        </Reveal>
      </div>
    </Section>
  );
}
