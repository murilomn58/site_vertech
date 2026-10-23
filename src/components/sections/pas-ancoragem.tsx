
import { useLocale, useTranslations } from "next-intl";
import { Investment } from "./investment";
import { Section, Eyebrow } from "@/components/primitives/section";
import { Reveal } from "@/components/primitives/reveal";
import { WaCta } from "@/components/primitives/wa-cta";

type Passo = {
  n: string;
  rotulo: string;
  texto: string;
};



export function PasAncoragem() {
  const t = useTranslations("website");
  const PASSOS: Passo[] = [
    {
      n: "01",
      rotulo: t("pasAncoragem.theProblem"),
      texto: t("pasAncoragem.slowRepliesCanCostYouCustomers"),
    },
    {
      n: "02",
      rotulo: t("pasAncoragem.theCost"),
      texto:
        t("pasAncoragem.aMessageLeftUnansweredOvernightOr"),
    },
    {
      n: "03",
      rotulo: t("pasAncoragem.theSolution"),
      texto:
        t("pasAncoragem.vertechsAiRespondsPromptlyEveryDay"),
    },
  ];
  const locale = useLocale();
  if (locale === "en") return <Investment />;
  return (
    <Section id="por-que-agora" width="wide">
      <div className="mx-auto max-w-2xl text-center">
        <Reveal>
          <Eyebrow className="justify-center">{t("pasAncoragem.whyNow")}</Eyebrow>
          <h2 className="mt-5 font-display text-3xl font-bold leading-tight text-ink sm:text-4xl lg:text-[2.8rem]">{t("pasAncoragem.keepTheConversationGoing")}{" "}
            <span className="text-gradient">{t("pasAncoragem.whileYourCustomersAreReadyTo")}</span>
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
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-ink-faint">{t("pasAncoragem.aReceptionist")}</span>
              <p className="mt-3 font-display text-2xl font-bold text-ink sm:text-3xl">{t("pasAncoragem.fromBrl1800PerMonth")}</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{t("pasAncoragem.plusEmploymentCostsHolidaysAndTime")}</p>
            </div>
            <div className="md:border-l md:border-line md:pl-8">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-cyan">{t("pasAncoragem.aVertechAiAssistant")}</span>
              <p className="mt-3 font-display text-2xl font-bold text-ink sm:text-3xl">
                <span className="text-gradient">{t("pasAncoragem.available24HoursADayEvery")}</span>
              </p>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{t("pasAncoragem.projectScopeAndIntegrationsDetermineThe")}</p>
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.2} className="mt-10 text-center">
        <WaCta intent="outro" size="lg">{t("pasAncoragem.letsTalkAboutMyProject")}</WaCta>
      </Reveal>
    </Section>
  );
}
