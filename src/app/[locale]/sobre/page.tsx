import { getTranslations } from "next-intl/server";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Portfolio from "@/components/sections/Portfolio";
import Transformation from "@/components/sections/Transformation";
import Team from "@/components/sections/Team";
import FAQ from "@/components/sections/FAQ";
import FinalCTA from "@/components/sections/FinalCTA";

type Props = {
  params: { locale: string };
};

export async function generateMetadata({ params }: Props) {
  const t = await getTranslations({ locale: params.locale, namespace: "meta" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default function Sobre() {
  return (
    <main>
      <Hero />
      <Services />
      <Portfolio />
      <Transformation />
      <Team />
      <FAQ />
      <FinalCTA />
    </main>
  );
}
