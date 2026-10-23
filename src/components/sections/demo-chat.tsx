
import { useTranslations } from "next-intl";
import { Section, Eyebrow } from "@/components/primitives/section";
import { Reveal } from "@/components/primitives/reveal";
import { WaCta } from "@/components/primitives/wa-cta";
import { ChatWindow } from "@/components/demos/chat/chat-window";
import { getLeilaScript } from "@/components/demos/chat/script";



export function DemoChat() {
  const t = useTranslations("website");
  const BULLETS = [
    t("demoChat.instantReplies24HoursADay"),
    t("demoChat.usesYourBusinessKnowledgeAndSpeaks"),
    t("demoChat.handlesRoutineQuestionsAndHandsThe"),
  ];
  return (
    <Section id="demo-chat" width="wide">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <Eyebrow>{t("demoChat.aiAssistants")}</Eyebrow>
          <h2 className="mt-5 font-display text-3xl font-bold leading-tight text-ink sm:text-4xl lg:text-[2.8rem]">{t("demoChat.anAssistantThatStaysAvailable")}{" "}
            <span className="text-gradient">{t("demoChat.aroundTheClock")}</span>{t("demoChat.andRespondsStraightAway")}</h2>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-ink-muted">{t("demoChat.watchTheConversationInTheDemo")}</p>
          <ul className="mt-7 space-y-3">
            {BULLETS.map((b) => (
              <li key={b} className="flex gap-3 text-sm leading-relaxed text-ink">
                <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-cyan" />
                {b}
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <WaCta intent="assistente-ia" from="Leila IA" size="lg">{t("demoChat.idLikeAnAssistantLikeThis")}</WaCta>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="lg:pl-8">
          <ChatWindow script={getLeilaScript(t)} />
        </Reveal>
      </div>
    </Section>
  );
}
