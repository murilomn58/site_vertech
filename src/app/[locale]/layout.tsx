import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

type Props = {
  children: React.ReactNode;
  params: { locale: string };
};

export async function generateMetadata({ params }: Omit<Props, "children">) {
  const t = await getTranslations({ locale: params.locale, namespace: "meta" });
  const title = t("title");
  const description = t("description");
  const ogLocale =
    params.locale === "pt" ? "pt_BR" : params.locale === "fr" ? "fr_FR" : "en_US";

  return {
    metadataBase: new URL("https://vertechsolucoes.com.br"),
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://vertechsolucoes.com.br/${params.locale}`,
      siteName: "Vertech Soluções",
      images: [
        {
          url: "/og-image.png",
          width: 1080,
          height: 1080,
          alt: "Vertech Soluções",
        },
      ],
      locale: ogLocale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-image.png"],
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = params;

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
