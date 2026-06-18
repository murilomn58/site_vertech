import { Hero } from "@/components/sections/hero";

export default function Home() {
  return (
    <main>
      <Hero />
      <section
        id="vitrine"
        className="flex min-h-screen items-center justify-center bg-bg-dark"
      >
        <p className="font-mono text-sm uppercase tracking-[0.3em] text-ink-faint">
          vitrine — em construção
        </p>
      </section>
    </main>
  );
}
