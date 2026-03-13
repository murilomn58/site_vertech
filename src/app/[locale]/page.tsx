import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("hero");
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-5xl font-heading font-bold">
          {t("title")} <span className="gradient-text">{t("titleHighlight")}</span> {t("titleEnd")}
        </h1>
        <p className="mt-4 text-off-white/70 text-lg">{t("description")}</p>
      </div>
    </main>
  );
}
