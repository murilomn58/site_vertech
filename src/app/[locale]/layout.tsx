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
    alternates: {
      canonical: `/${locale}`,
      languages: {
        "pt-BR": "/pt",
        en: "/en",
        "fr-FR": "/fr",
        "x-default": "/pt",
      },
    },
    openGraph: {
      title,
      description,
      url: `https://vertechsolucoes.com.br/${locale}`,
      siteName: "Vertech Soluções",
      images: [
        {
          url: "/images/og-image.png",
          width: 1200,
          height: 630,
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

  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Vertech Soluções",
    legalName: "Vertech Soluções Inova Simples (I.S.)",
    alternateName: "Vertech",
    url: "https://vertechsolucoes.com.br",
    logo: "https://vertechsolucoes.com.br/icon.png",
    image: "https://vertechsolucoes.com.br/images/og-image.png",
    description:
      "A Vertech cria assistentes de IA, aplicativos e sites que atendem e vendem pela sua empresa no WhatsApp.",
    email: "admin@vertechsolucoes.com.br",
    telephone: "+5549999551051",
    taxID: "65.062.423/0001-81",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Rua Gedeão Ratto Silveira, 2475, Industrial I",
      addressLocality: "Bagé",
      addressRegion: "RS",
      postalCode: "96413-080",
      addressCountry: "BR",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+5549999551051",
      contactType: "sales",
      areaServed: "BR",
      availableLanguage: ["Portuguese", "English", "French"],
    },
    areaServed: ["BR", "FR"],
  };

  return (
    <NextIntlClientProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />
      <SmoothScroll>
        <SiteHeader />
        {children}
        <SiteFooter />
        <FloatingWa />
      </SmoothScroll>
    </NextIntlClientProvider>
  );
}
