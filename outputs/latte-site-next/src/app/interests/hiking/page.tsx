import Link from "next/link";
import { climbedMountains, wantToClimbMountains, hikingJournal } from "@/data/site";

export default function HikingPage() {
  return (
    <main className="min-h-screen bg-cream pt-24 pb-16">
      <div className="container-narrow">
        <Link href="/" className="inline-flex items-center gap-1 text-body-sm text-ink-muted hover:text-latte transition-colors mb-8">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 2L5 7l4 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          返回首页
        </Link>

        <p className="text-caption font-mono uppercase tracking-widest text-latte">interest</p>
        <h1 className="mt-3 text-h1 text-ink">登山</h1>
        <p className="mt-2 text-body-lg font-light text-ink-secondary">山在那里，路在脚下</p>

        {/* Journal */}
        <div className="mt-10 rounded-lg border border-[#e8e0d6] bg-white p-6">
          <h2 className="text-h3 font-display font-medium text-ink">登山随笔</h2>
          <div
            className="mt-4 text-body leading-[1.8] text-ink-secondary [&>p]:mb-3"
            dangerouslySetInnerHTML={{ __html: hikingJournal.trim() }}
          />
        </div>

        {/* Climbed */}
        <div className="mt-10">
          <h2 className="text-h3 font-display font-medium text-ink">已征服的山</h2>
          <div className="mt-4 space-y-3">
            {climbedMountains.map((m, i) => (
              <div key={i} className="rounded-lg border border-[#e8e0d6] bg-white p-5 transition-all hover:border-latte/50">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">⛰️</span>
                  <div>
                    <h3 className="text-body font-display font-medium text-ink">{m.name}</h3>
                    <time className="text-caption font-mono text-ink-muted">{m.date}</time>
                  </div>
                </div>
                <p className="mt-3 text-body-sm leading-relaxed text-ink-secondary">{m.note}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Want to climb */}
        <div className="mt-10">
          <h2 className="text-h3 font-display font-medium text-ink">想要征服</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {wantToClimbMountains.map((m, i) => (
              <div key={i} className="rounded-lg border border-[#e8e0d6] bg-white p-4">
                <div className="flex items-center gap-2">
                  <span className="text-lg">🏔️</span>
                  <h3 className="text-body font-display font-medium text-ink">{m.name}</h3>
                </div>
                {m.reason && (
                  <p className="mt-2 text-body-sm text-ink-muted italic">{m.reason}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}