
import { useTranslations } from "next-intl";
import { Section, Eyebrow } from "@/components/primitives/section";
import { Reveal } from "@/components/primitives/reveal";
import { WaCta } from "@/components/primitives/wa-cta";
import { PhoneDemo } from "@/components/demos/phone/phone-demo";



export function DemoApp() {
  const t = useTranslations("website");
  const BULLETS = [
    t("demoApp.bookAndManageAppointmentsOnYour"),
    t("demoApp.automaticWhatsappConfirmationsAndRemindersSave"),
    t("demoApp.designedAroundYourWorkflowWithThe"),
  ];
  return (
    <Section id="demo-app" width="wide" className="bg-navy-deep/30">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal className="order-2 lg:order-1">
          <PhoneDemo />
        </Reveal>

        <Reveal delay={0.1} className="order-1 lg:order-2">
          <Eyebrow>{t("demoApp.customMobileApps")}</Eyebrow>
          <h2 className="mt-5 font-display text-3xl font-bold leading-tight text-ink sm:text-4xl lg:text-[2.8rem]">{t("demoApp.yourBusinessIn")}{" "}
            <span className="text-gradient">{t("demoApp.thePalm")}</span>{t("demoApp.ofYourCustomersHand")}</h2>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-ink-muted">{t("demoApp.thisIsOdontoconnectAnAppWe")}</p>
          <ul className="mt-7 space-y-3">
            {BULLETS.map((b) => (
              <li key={b} className="flex gap-3 text-sm leading-relaxed text-ink">
                <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-cyan" />
                {b}
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <WaCta intent="app" from="OdontoConnect" size="lg">{t("demoApp.idLikeAnAppLikeThis")}</WaCta>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
