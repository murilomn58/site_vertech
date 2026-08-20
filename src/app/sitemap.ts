import type { MetadataRoute } from "next";

const BASE = "https://vertechsolucoes.com.br";
const LOCALES = ["pt", "en", "fr"] as const;
const ROUTES = [
  "",
  "/privacidade",
  "/politica-de-privacidade-internacional-pax",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];
  for (const route of ROUTES) {
    for (const locale of LOCALES) {
      entries.push({
        url: `${BASE}/${locale}${route}`,
        lastModified: now,
        changeFrequency: route === "" ? "weekly" : "monthly",
        priority: route === "" ? 1 : 0.5,
        alternates: {
          languages: Object.fromEntries(
            LOCALES.map((l) => [l, `${BASE}/${l}${route}`]),
          ),
        },
      });
    }
  }
  return entries;
}
