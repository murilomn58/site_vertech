"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { WHATSAPP_URL, NAV_SECTIONS } from "@/lib/constants";

export default function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const toggleLocale = () => {
    const newLocale = locale === "pt" ? "en" : "pt";
    router.replace(pathname, { locale: newLocale });
  };

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-bg-dark/80 backdrop-blur-md border-b border-white/10 shadow-lg"
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="font-heading font-bold text-2xl text-white select-none"
          >
            VERTECH{" "}
            <span className="text-cyan">Soluções</span>
          </a>

          {/* Desktop nav links */}
          <ul className="hidden md:flex items-center gap-8">
            {NAV_SECTIONS.map((section) => (
              <li key={section}>
                <button
                  onClick={() => scrollTo(section)}
                  className="text-off-white/70 hover:text-cyan transition-colors text-sm font-medium"
                >
                  {t(section)}
                </button>
              </li>
            ))}
          </ul>

          {/* Desktop right side */}
          <div className="hidden md:flex items-center gap-4">
            {/* Language toggle */}
            <button
              onClick={toggleLocale}
              className="text-sm font-medium text-off-white/70 hover:text-cyan transition-colors border border-white/10 rounded-full px-3 py-1"
            >
              {locale === "pt" ? "EN" : "PT"}
            </button>

            {/* WhatsApp CTA */}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-whatsapp hover:bg-whatsapp/90 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              WhatsApp
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5"
            aria-label="Menu"
          >
            <span
              className={cn(
                "block w-6 h-0.5 bg-white transition-transform duration-300",
                mobileOpen && "translate-y-2 rotate-45"
              )}
            />
            <span
              className={cn(
                "block w-6 h-0.5 bg-white transition-opacity duration-300",
                mobileOpen && "opacity-0"
              )}
            />
            <span
              className={cn(
                "block w-6 h-0.5 bg-white transition-transform duration-300",
                mobileOpen && "-translate-y-2 -rotate-45"
              )}
            />
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-0 z-40 bg-bg-dark/95 backdrop-blur-lg flex flex-col items-center justify-center gap-8 pt-16"
          >
            {NAV_SECTIONS.map((section) => (
              <button
                key={section}
                onClick={() => scrollTo(section)}
                className="text-2xl font-heading text-off-white hover:text-cyan transition-colors"
              >
                {t(section)}
              </button>
            ))}

            <button
              onClick={toggleLocale}
              className="text-lg font-medium text-off-white/70 hover:text-cyan transition-colors border border-white/10 rounded-full px-4 py-2"
            >
              {locale === "pt" ? "EN" : "PT"}
            </button>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-whatsapp hover:bg-whatsapp/90 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              WhatsApp
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
