import { defineRouting } from "next-intl/routing";

// Quem entra pela raiz (/) cai no idioma do navegador:
// português -> /pt, francês -> /fr, qualquer outro (público europeu da Sortlist) -> /en.
export const routing = defineRouting({
  locales: ["pt", "en", "fr"],
  defaultLocale: "en",
  localeDetection: true,
});
