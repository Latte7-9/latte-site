"use client";
import Link from "next/link";
import { useFadeIn } from "@/hooks/use-fade-in";
import { siteConfig } from "@/data/site";

const ICON_MAP: Record<string, string> = {
  camera: "📷",
  book: "📖",
  sparkle: "✨",
  mountain: "⛰️",
};

export default function Interests() {
  const ref = useFadeIn();

  return (
    <section className="section section-alt" ref={ref}>
      <div className="container-wide">
        <div className="fade-in">
          <p className="text-caption font-mono uppercase tracking-widest text-latte">interests</p>
          <h2 className="mt-3 text-h2 text-ink">兴趣</h2>
        </div>

        <div className="mt-8 stagger-children fade-in grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {siteConfig.interests.map((item) => (
            <Link
              key={item.name}
              href={item.page}
              className="card group block"
            >
              <span className="text-2xl" role="img" aria-hidden="true">
                {ICON_MAP[item.icon] || "📌"}
              </span>
              <h3 className="mt-3 text-h3 font-display font-medium text-ink group-hover:text-latte-dark transition-colors">
                {item.name}
              </h3>
              <p className="mt-1 text-body-sm leading-relaxed text-ink-secondary">
                {item.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}