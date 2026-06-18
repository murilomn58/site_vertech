import { Hero } from "@/components/sections/hero";
import { ProofBar } from "@/components/sections/proof-bar";
import { VitrineIntro } from "@/components/sections/vitrine-intro";
import { DemoChat } from "@/components/sections/demo-chat";
import { DemoApp } from "@/components/sections/demo-app";
import { DemoSite } from "@/components/sections/demo-site";
import { CasesGallery } from "@/components/sections/cases-gallery";
import { PasAncoragem } from "@/components/sections/pas-ancoragem";
import { SecurityLgpd } from "@/components/sections/security-lgpd";
import { Team } from "@/components/sections/team";
import { FinalCta } from "@/components/sections/final-cta";

export default function Home() {
  return (
    <main>
      <Hero />
      <ProofBar />
      <VitrineIntro />
      <DemoChat />
      <DemoApp />
      <DemoSite />
      <CasesGallery />
      <PasAncoragem />
      <SecurityLgpd />
      <Team />
      <FinalCta />
    </main>
  );
}
