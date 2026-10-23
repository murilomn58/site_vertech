
import { useTranslations } from "next-intl";
import { Section } from "@/components/primitives/section";
import { Reveal } from "@/components/primitives/reveal";
import { WaCta } from "@/components/primitives/wa-cta";
import { PHONE } from "@/lib/constants";

export function FinalCta() {
  const t = useTranslations("website");
  return (
    <Section id="contato" width="wide">
      <Reveal>
        <div className="glass relative overflow-hidden rounded-[2rem] px-6 py-16 text-center sm:px-12 sm:py-20">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10"
            style={{
              background:
                "radial-gradient(circle at 50% 0%, rgba(34,211,238,0.18), transparent 60%)",
            }}
          />
          <h2 className="mx-auto max-w-3xl font-display text-3xl font-bold leading-tight text-ink sm:text-5xl">{t("finalCta.tellUsWhatYouHaveIn")}{" "}
            <span className="text-gradient">{t("finalCta.wellBuildItWithYou")}</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-ink-muted">{t("finalCta.bringYourIdeaWellHelpTurn")}</p>

          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <WaCta intent="outro" variant="whatsapp" size="lg">{t("finalCta.chatOnWhatsapp")}</WaCta>
            <a
              href="#vitrine"
              className="text-sm font-medium text-ink-muted transition-colors hover:text-cyan-bright"
            >{t("finalCta.exploreTheDemosAgain")}</a>
          </div>

          <p className="mt-8 font-mono text-xs text-ink-faint">{PHONE}</p>
        </div>
      </Reveal>
    </Section>
  );
}
