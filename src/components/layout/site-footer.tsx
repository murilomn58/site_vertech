
import { useLocale, useTranslations } from "next-intl";
import { EMAIL, PHONE, LINKEDIN } from "@/lib/constants";
import { VertechMark } from "@/components/primitives/icons";
import { WaCta } from "@/components/primitives/wa-cta";

export function SiteFooter() {
  const t = useTranslations("website");
  const locale = useLocale();
  return (
    <footer
      id="footer"
      className="relative border-t border-line bg-navy-deep px-5 py-16 sm:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr]">
          {/* Marca + pitch */}
          <div>
            <div className="flex items-center gap-2.5">
              <VertechMark className="h-8 w-8" />
              <span className="font-display text-lg font-bold text-ink">
                Vertech<span className="text-cyan">.</span>
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-muted">{t("siteFooter.technologyThatKeepsYouAheadAi")}</p>
            <div className="mt-6">
              <WaCta intent="outro" size="md" icon>{t("siteFooter.talkToVertech")}</WaCta>
            </div>
          </div>

          {/* Navegação */}
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-faint">{t("siteFooter.explore")}</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {[
                { href: `/${locale}#vitrine`, label: t("siteFooter.servicesAndDemos") },
                { href: `/${locale}#cases`, label: t("siteFooter.realProjects") },
                { href: `/${locale}#seguranca`, label: t("siteFooter.securityAndDataProtection") },
                { href: `/${locale}/privacidade`, label: t("siteFooter.privacyPolicy") },
              ].map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-ink-muted transition-colors hover:text-cyan"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contato */}
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-faint">{t("siteFooter.contact")}</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a
                  href={`https://wa.me/5549999551051`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ink-muted transition-colors hover:text-cyan"
                >
                  {PHONE}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${EMAIL}`}
                  className="text-ink-muted transition-colors hover:text-cyan"
                >
                  {EMAIL}
                </a>
              </li>
              {locale === "en" && <li className="space-y-2 border-t border-line pt-4"><p className="font-semibold text-ink">Bruno Zanella</p><p>Sales representative in France</p><a className="block text-cyan" href="tel:+33656680164">+33 6 56 68 01 64</a><a className="block text-cyan hover:underline" href={"https://wa.me/33656680164?text="+encodeURIComponent("Hi Bruno! I found Vertech’s website and would like to discuss a project.")} target="_blank" rel="noopener noreferrer">Chat with Bruno on WhatsApp</a></li>}<li className="flex gap-3 pt-1">
                <a
                  href={LINKEDIN.murilo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ink-muted transition-colors hover:text-cyan"
                >{t("siteFooter.muriloOnLinkedin")}</a>
                <a
                  href={LINKEDIN.jean}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ink-muted transition-colors hover:text-cyan"
                >{t("siteFooter.jeanOnLinkedin")}</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-line pt-6 text-xs text-ink-faint sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()}{t("siteFooter.vertechSoluesCnpj65062423000181BagBrazil")}</p>
          <p>{t("siteFooter.builtWithOurOwnTechnology")}</p>
        </div>
      </div>
    </footer>
  );
}
