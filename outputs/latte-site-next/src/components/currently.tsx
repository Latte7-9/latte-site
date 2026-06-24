"use client";
import { useFadeIn } from "@/hooks/use-fade-in";
import { siteConfig } from "@/data/site";
import Image from "next/image"

const ITEMS = [
  { label: "在读", value: siteConfig.currently.reading, icon: "📚" },
  { label: "在听", value: siteConfig.currently.listening, icon: "🎵" },
  { label: "在学", value: siteConfig.currently.learning, icon: "🎸" },
  { label: "在做", value: siteConfig.currently.workingOn, icon: "🔧" },
];

export default function Currently() {
  const ref = useFadeIn();
  const readingCover = siteConfig.currently.readingCover;

  return (
    <section className="section section-dark" ref={ref}>
      <div className="container-narrow">
        <div className="fade-in">
          <p className="text-caption font-mono uppercase tracking-widest text-latte-light">now</p>
          <h2 className="mt-3 text-h2 text-espresso-ink">最近在忙</h2>
        </div>

        <div className="mt-8 stagger-children fade-in grid gap-4 sm:grid-cols-2">
          {ITEMS.map((item) => (
            <div key={item.label} className="rounded-lg bg-espresso-ink/10 p-4 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <span className="text-xl" role="img" aria-hidden={true}>{item.icon}</span>
                <div>
                  <p className="text-caption font-mono text-latte-light">{item.label}</p>
                  <p className="text-body-sm text-espresso-ink">{item.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {readingCover && (
          <div className="mt-8 flex justify-center fade-in">
            <div className="relative h-64 w-auto overflow-hidden rounded-lg shadow-lg">
              <Image
                src={readingCover}
                alt={siteConfig.currently.reading.split("》")[0].replace(/[《]/g, "") + " 封面"}
                width={400}
                height={400}
                className="object-cover"
                priority
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}