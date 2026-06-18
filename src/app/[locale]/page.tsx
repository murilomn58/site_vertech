export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-bg-dark px-6 text-center">
      <p className="font-mono text-sm uppercase tracking-[0.3em] text-cyan">
        Vertech Soluções
      </p>
      <h1 className="font-display text-5xl font-bold text-ink sm:text-7xl">
        rebuild <span className="text-gradient">v4</span>
      </h1>
      <p className="max-w-md font-body text-ink-muted">
        Vitrine em construção. Tailwind 4 + Next 16 + next-intl.
      </p>
    </main>
  );
}
