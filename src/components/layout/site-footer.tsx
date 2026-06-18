import { EMAIL, PHONE, LINKEDIN } from "@/lib/constants";
import { VertechMark } from "@/components/primitives/icons";
import { WaCta } from "@/components/primitives/wa-cta";

export function SiteFooter() {
  return (
    <footer
      id="contato"
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
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-muted">
              Tecnologia que mantém você à frente. Assistentes de IA, apps e
              sites que trabalham pela sua empresa.
            </p>
            <div className="mt-6">
              <WaCta intent="outro" size="md" icon>
                Falar com a Vertech
              </WaCta>
            </div>
          </div>

          {/* Navegação */}
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-faint">
              Navegar
            </p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {[
                { href: "#vitrine", label: "Exemplos ao vivo" },
                { href: "#cases", label: "Cases reais" },
                { href: "#seguranca", label: "Segurança e LGPD" },
                { href: "/pt/privacidade", label: "Política de Privacidade" },
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
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-faint">
              Contato
            </p>
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
              <li className="flex gap-3 pt-1">
                <a
                  href={LINKEDIN.murilo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ink-muted transition-colors hover:text-cyan"
                >
                  LinkedIn Murilo
                </a>
                <a
                  href={LINKEDIN.jean}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ink-muted transition-colors hover:text-cyan"
                >
                  LinkedIn Jean
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-line pt-6 text-xs text-ink-faint sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} Vertech Soluções · CNPJ
            65.062.423/0001-81 · Bagé/RS
          </p>
          <p>Feito com tecnologia própria.</p>
        </div>
      </div>
    </footer>
  );
}
