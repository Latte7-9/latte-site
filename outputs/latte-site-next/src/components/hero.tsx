import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-cream">
      {/* Subtle paper texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="container-narrow relative z-10 text-center">
        <h1 className="font-display text-hero font-medium leading-[1.05] tracking-tight text-ink sm:text-[clamp(2.8rem,8vw,5rem)]">
          Latte
        </h1>
        <p className="mt-6 text-body-lg font-light leading-relaxed text-ink-secondary sm:text-body-lg">
          泪流满面算不算是一种生理盐水湿敷全脸
        </p>
        <div className="mt-10">
          <Link
            href="#about"
            className="inline-flex flex-col items-center gap-2 text-ink-muted transition-colors hover:text-latte"
            aria-label="向下滚动"
          >
            <span className="text-caption font-mono tracking-[0.2em] uppercase">scroll</span>
            <svg width="16" height="24" viewBox="0 0 16 24" fill="none" className="animate-bounce">
              <path d="M4 8l4 4 4-4M4 14l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Decorative concentric circles */}
      <div className="pointer-events-none absolute -bottom-32 left-1/2 -translate-x-1/2 opacity-[0.04]">
        <svg width="600" height="600" viewBox="0 0 600 600" fill="none">
          <circle cx="300" cy="300" r="280" stroke="currentColor" strokeWidth="0.5" className="text-ink" />
          <circle cx="300" cy="300" r="220" stroke="currentColor" strokeWidth="0.5" className="text-ink" />
          <circle cx="300" cy="300" r="160" stroke="currentColor" strokeWidth="0.5" className="text-ink" />
          <circle cx="300" cy="300" r="100" stroke="currentColor" strokeWidth="0.5" className="text-ink" />
        </svg>
      </div>
    </section>
  );
}