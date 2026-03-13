import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Portfolio from "@/components/sections/Portfolio";
import Transformation from "@/components/sections/Transformation";
import Team from "@/components/sections/Team";
import FAQ from "@/components/sections/FAQ";
import FinalCTA from "@/components/sections/FinalCTA";

export default function Home() {
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
