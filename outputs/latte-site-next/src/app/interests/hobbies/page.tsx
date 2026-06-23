import Link from "next/link";
import { hobbies } from "@/data/site";

export default function HobbiesPage() {
  return (
    <main className="min-h-screen bg-cream pt-24 pb-16">
      <div className="container-narrow">
        <Link href="/" className="inline-flex items-center gap-1 text-body-sm text-ink-muted hover:text-latte transition-colors mb-8">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 2L5 7l4 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          返回首页
        </Link>

        <p className="text-caption font-mono uppercase tracking-widest text-latte">interest</p>
        <h1 className="mt-3 text-h1 text-ink">三分钟热度</h1>
        <p className="mt-2 text-body-lg font-light text-ink-secondary">那些短暂但认真热爱过的事物</p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {hobbies.map((hobby, i) => (
            <div key={i} className="rounded-lg border border-[#e8e0d6] bg-white p-5 transition-all hover:border-latte/50 hover:shadow-sm">
              <h3 className="text-body font-display font-medium text-ink">{hobby.name}</h3>
              {hobby.description && (
                <p className="mt-2 text-body-sm text-ink-secondary leading-relaxed">{hobby.description}</p>
              )}
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-lg border border-[#e8e0d6] bg-cream-warm p-5">
          <p className="text-body-sm text-ink-muted leading-relaxed">
            三分热度是 ENTP 的天性，也是我的优势。每一种热爱都不长，但每一种我都认真对待过。也许下一次热度褪去之前，我会学会怎么让它烧得更久一点。
          </p>
        </div>
      </div>
    </main>
  );
}