import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts } from "@/data/blog";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <main className="min-h-screen bg-cream pt-24 pb-16">
      <article className="container-narrow">
        <Link href="/blog" className="inline-flex items-center gap-1 text-body-sm text-ink-muted hover:text-latte transition-colors mb-8">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 2L5 7l4 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          返回博客
        </Link>

        <time className="text-caption font-mono text-ink-muted">{post.date}</time>
        <h1 className="mt-3 text-[clamp(1.8rem,4vw,2.8rem)] font-display font-medium leading-tight text-ink">
          {post.title}
        </h1>

        <div
          className="mt-8 text-body leading-[1.8] text-ink-secondary [&>p]:mb-4 [&>h3]:mt-8 [&>h3]:text-h3 [&>blockquote]:border-l-[3px] border-latte/40 pl-4 [&>blockquote]:text-ink-muted [&>mark]:bg-latte-light/30 [&>mark]:rounded [&>mark]:px-1"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <div className="mt-12 border-t border-[#e8e0d6] pt-6">
          <Link href="/blog" className="text-body-sm text-ink-muted hover:text-latte transition-colors">
            ← 回到博客列表
          </Link>
        </div>
      </article>
    </main>
  );
}