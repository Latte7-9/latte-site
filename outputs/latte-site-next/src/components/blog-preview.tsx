"use client";
import Link from "next/link";
import { useFadeIn } from "@/hooks/use-fade-in";
import { blogPosts } from "@/data/blog";

export default function BlogPreview() {
  const ref = useFadeIn();
  const recent = blogPosts.slice(0, 3);

  return (
    <section className="section" ref={ref}>
      <div className="container-wide">
        <div className="fade-in">
          <p className="text-caption font-mono uppercase tracking-widest text-latte">writing</p>
          <h2 className="mt-3 text-h2 text-ink">博客</h2>
        </div>

        <div className="mt-8 stagger-children fade-in grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {recent.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="card group block"
            >
              <time className="text-caption font-mono text-ink-muted">{post.date}</time>
              <h3 className="mt-2 text-h3 font-display font-medium text-ink group-hover:text-latte-dark transition-colors line-clamp-2">
                {post.title}
              </h3>
              <p className="mt-2 text-body-sm leading-relaxed text-ink-secondary line-clamp-3">
                {post.excerpt}
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-latte group-hover:gap-2 transition-all">
                阅读全文
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center fade-in">
          <Link href="/blog" className="btn-primary">
            查看全部文章
          </Link>
        </div>
      </div>
    </section>
  );
}