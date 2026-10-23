
import { useLocale, useTranslations } from "next-intl";
import { Section, Eyebrow } from "@/components/primitives/section";
import { Reveal } from "@/components/primitives/reveal";
import { WaCta } from "@/components/primitives/wa-cta";

type Card = {
  titulo: string;
  texto: string;
};



export function SecurityLgpd() {
  const t = useTranslations("website");
  const locale = useLocale();
  const CARDS: Card[] = [
    {
      titulo: t("securityLgpd.brazilianDataProtection"),
      texto:
        t("securityLgpd.infrastructureAndDataHandlingFollowBrazils"),
    },
    {
      titulo: t("securityLgpd.youreInControl"),
      texto:
        t("securityLgpd.yourDataBelongsToYouYou"),
    },
    {
      titulo: t("securityLgpd.clearTerms"),
      texto:
        t("securityLgpd.weBuildItYouTestIt"),
    },
    {
      titulo: t("securityLgpd.confidentialConversations"),
      texto:
        t("securityLgpd.weHandleConversationsWithTheCare"),
    },
  ];
  return (
    <Section id="seguranca" width="wide">
      <div className="mx-auto max-w-2xl text-center">
        <Reveal>
          <Eyebrow className="justify-center">{t("securityLgpd.securityAndDataProtection")}</Eyebrow>
          <h2 className="mt-5 font-display text-3xl font-bold leading-tight text-ink sm:text-4xl lg:text-[2.8rem]">{t("securityLgpd.yourAiWithYourData")}{" "}
            <span className="text-gradient">{t("securityLgpd.protected")}</span>
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
        <a href={`/${locale}/privacidade`} className="text-sm text-cyan hover:underline">{t("securityLgpd.privacyPolicy")}</a>
        <WaCta intent="outro" variant="ghost">{t("securityLgpd.askAQuestion")}</WaCta>
      </Reveal>
    </Section>
  );
}
