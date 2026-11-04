import { defineRouting } from "next-intl/routing";

// Quem entra pela raiz (/) cai no idioma do navegador:
// português -> /pt, qualquer outro, inclusive francês (público europeu da Sortlist) -> /en.
// O francês sai da detecção no middleware; o /fr fica disponível pelo seletor.
export const routing = defineRouting({
  locales: ["pt", "en", "fr"],
  defaultLocale: "en",
  localeDetection: true,
});
