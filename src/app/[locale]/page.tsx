import { Hero } from "@/components/sections/hero";
import { VitrineIntro } from "@/components/sections/vitrine-intro";
import { DemoChat } from "@/components/sections/demo-chat";

export default function Home() {
  return (
    <main>
      <Hero />
      <VitrineIntro />
      <DemoChat />
    </main>
  );
}
