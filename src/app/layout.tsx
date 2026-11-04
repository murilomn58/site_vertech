import { getLocale } from "next-intl/server";
import { Space_Grotesk, Montserrat, JetBrains_Mono } from "next/font/google";
import { SortlistRadar } from "@/components/analytics/sortlist-radar";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <SortlistRadar />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${montserrat.variable} ${jetbrainsMono.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
