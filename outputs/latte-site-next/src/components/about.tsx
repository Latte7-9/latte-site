"use client";
import { useFadeIn } from "@/hooks/use-fade-in";

export default function About() {
  const ref = useFadeIn();

  return (
    <section id="about" className="section section-alt" ref={ref}>
      <div className="container-narrow">
        <div className="grid gap-8 md:grid-cols-[1fr_1.5fr] md:items-center">
          <div className="flex justify-center md:justify-end">
            <div className="relative aspect-square w-48 overflow-hidden rounded-full border-4 border-white shadow-lg md:w-64">
              <div className="flex h-full w-full items-center justify-center bg-latte-light/40">
                <svg width="64" height="64" viewBox="0 0 64 64" fill="none" className="text-latte-dark/50">
                  <circle cx="32" cy="24" r="10" stroke="currentColor" strokeWidth="2" />
                  <path d="M12 56c0-11.046 8.954-20 20-20s20 8.954 20 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
            </div>
          </div>
          <div className="fade-in">
            <p className="text-caption font-mono uppercase tracking-widest text-latte">about me</p>
            <h2 className="mt-3 text-h1 text-ink">你好，我是 Latte</h2>
            <div className="mt-4 text-body leading-relaxed text-ink-secondary [&>br]:mb-2" dangerouslySetInnerHTML={{ __html: "狮子座 / ENTP / 兴趣广泛<br/>三分钟热度，但足够热" }} />
          </div>
        </div>
      </div>
    </section>
  );
}