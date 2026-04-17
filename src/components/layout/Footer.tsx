"use client";

import { useTranslations } from "next-intl";
import { EMAIL, PHONE, NAV_SECTIONS } from "@/lib/constants";

export default function Footer() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");
  const brand = useTranslations("intro");

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-bg-dark border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Left: Logo + tagline */}
          <div>
            <p className="font-heading font-bold text-2xl text-white">
              VERTECH <span className="text-cyan">{brand("logoSub")}</span>
            </p>
            <p className="mt-3 text-off-white/60 text-sm leading-relaxed">
              {t("tagline")}
            </p>
          </div>

          {/* Center: Nav links */}
          <div className="flex flex-col items-start md:items-center gap-3">
            {NAV_SECTIONS.map((section) => (
              <button
                key={section}
                onClick={() => scrollTo(section)}
                className="text-off-white/60 hover:text-cyan transition-colors text-sm"
              >
                {nav(section)}
              </button>
            ))}
          </div>

          {/* Right: Contact */}
          <div className="flex flex-col items-start md:items-end gap-3">
            <a
              href={`mailto:${EMAIL}`}
              className="text-off-white/60 hover:text-cyan transition-colors text-sm"
            >
              {EMAIL}
            </a>
            <a
              href={`tel:${PHONE.replace(/\s/g, "")}`}
              className="text-off-white/60 hover:text-cyan transition-colors text-sm"
            >
              {PHONE}
            </a>
          </div>
        </div>
      </div>

      {/* Copyright bar */}
      <div className="border-t border-white/5 py-6">
        <p className="text-center text-off-white/40 text-xs">
          &copy; {t("copyright")}
        </p>
      </div>
    </footer>
  );
}
