import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { SmoothScroll } from "@/components/layout/smooth-scroll";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { FloatingWa } from "@/components/layout/floating-wa";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: Omit<Props, "children">) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  const title = t("title");
  const description = t("description");
  const ogLocale =
    locale === "pt" ? "pt_BR" : locale === "fr" ? "fr_FR" : "en_US";

  return {
    metadataBase: new URL("https://vertechsolucoes.com.br"),
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://vertechsolucoes.com.br/${locale}`,
      siteName: "Vertech Soluções",
      images: [
        {
          url: "/images/og-image.png",
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
      images: ["/images/og-image.png"],
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <NextIntlClientProvider>
      <SmoothScroll>
        <SiteHeader />
        {children}
        <SiteFooter />
        <FloatingWa />
      </SmoothScroll>
    </NextIntlClientProvider>
  );
}
