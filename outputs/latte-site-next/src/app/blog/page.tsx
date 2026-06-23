import Link from "next/link";
import { blogPosts } from "@/data/blog";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "博客 - Latte",
  description: "一些零散的记录与想法",
};

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-cream pt-24 pb-16">
      <div className="container-narrow">
        <p className="text-caption font-mono uppercase tracking-widest text-latte">archive</p>
        <h1 className="mt-3 text-h1 text-ink">博客</h1>
        <p className="mt-2 text-body text-ink-secondary">一些零散的记录与想法</p>

        <div className="mt-12 space-y-8">
          {blogPosts.map((post) => (
            <article key={post.slug} className="group border-b border-[#e8e0d6] pb-8 last:border-0">
              <Link href={`/blog/${post.slug}`} className="block">
                <time className="text-caption font-mono text-ink-muted">{post.date}</time>
                <h2 className="mt-2 text-h2 font-display font-medium text-ink group-hover:text-latte-dark transition-colors">
                  {post.title}
                </h2>
                <p className="mt-2 text-body text-ink-secondary">{post.excerpt}</p>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
