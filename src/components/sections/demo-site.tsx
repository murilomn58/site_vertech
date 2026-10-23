
import { useTranslations } from "next-intl";
import { Section, Eyebrow } from "@/components/primitives/section";
import { Reveal } from "@/components/primitives/reveal";
import { WaCta } from "@/components/primitives/wa-cta";
import { BrowserDemo } from "@/components/demos/browser/browser-demo";



export function DemoSite() {
  const t = useTranslations("website");
  const BULLETS = [
    t("demoSite.aVisualConceptDesignedForYour"),
    t("demoSite.fastOnMobileAndPolishedOn"),
    t("demoSite.aClearPathFromAWebsite"),
  ];
  return (
    <Section id="demo-site" width="wide">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <Eyebrow>{t("demoSite.category")}</Eyebrow>
          <h2 className="mt-5 font-display text-3xl font-bold leading-tight text-ink sm:text-4xl lg:text-[2.8rem]">{t("demoSite.aWebsiteThatTurnsVisitorsInto")}{" "}
            <span className="text-gradient">{t("demoSite.customers")}</span>
          </h2>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-ink-muted">{t("demoSite.thisWebsiteIsOneExampleOf")}</p>
          <ul className="mt-7 space-y-3">
            {BULLETS.map((b) => (
              <li key={b} className="flex gap-3 text-sm leading-relaxed text-ink">
                <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-cyan" />
                {b}
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <WaCta intent="site" from={t("demoSite.category")} size="lg">{t("demoSite.idLikeAWebsiteLikeThis")}</WaCta>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="lg:pl-8">
          <BrowserDemo />
        </Reveal>
      </div>
    </Section>
  );
}
