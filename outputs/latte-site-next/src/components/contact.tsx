import { siteConfig } from "@/data/site";
import Link from "next/link";

export default function Contact() {
  return (
    <section className="section section-alt">
      <div className="container-narrow text-center">
        <p className="text-caption font-mono uppercase tracking-widest text-latte">say hello</p>
        <h2 className="mt-3 text-h2 text-ink">联系我</h2>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
          <a
            href={`mailto:${siteConfig.email}`}
            className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-body-sm font-medium text-ink-secondary shadow-sm border border-[#e8e0d6] transition-colors hover:border-latte hover:text-latte-dark"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="1" y="3" width="14" height="9" rx="1" stroke="currentColor" strokeWidth="1.5"/><path d="M1 5l7 4 7-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            邮件
          </a>
          <Link href="/blog" className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-body-sm font-medium text-ink-secondary shadow-sm border border-[#e8e0d6] transition-colors hover:border-latte hover:text-latte-dark">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 2h10v12H3z" stroke="currentColor" strokeWidth="1.5" rx="1"/><path d="M5 5h6M5 8h4M5 11h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            博客
          </Link>
        </div>
      </div>
    </section>
  );
}
