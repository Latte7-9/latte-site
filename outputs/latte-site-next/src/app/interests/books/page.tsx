import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/data/site";

export default function BooksPage() {
  return (
    <main className="min-h-screen bg-cream pt-24 pb-16">
      <div className="container-narrow">
        <Link href="/" className="inline-flex items-center gap-1 text-body-sm text-ink-muted hover:text-latte transition-colors mb-8">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 2L5 7l4 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          返回首页
        </Link>

        <p className="text-caption font-mono uppercase tracking-widest text-latte">interest</p>
        <h1 className="mt-3 text-h1 text-ink">书籍</h1>
        <p className="mt-2 text-body-lg font-light text-ink-secondary">在文字里遇见另一个世界</p>

        {/* Read books */}
        <div className="mt-10">
          <h2 className="text-h3 font-display font-medium text-ink">已读</h2>
          <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {siteConfig.books.filter((b) => b.cover).map((book, i) => (
              <div key={i} className="group overflow-hidden rounded-xl border border-[#e8e0d6] bg-white transition-all hover:border-latte/40 hover:shadow-md">
                <div className="aspect-[3/4] w-full overflow-hidden bg-cream-warm">
                  <Image
                    src={book.cover!}
                    alt={book.title}
                    width={300}
                    height={400}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAP///////////////////////////////////////wAARCAABAAEDASIAAhEBAxEB/8QAFAABAAAAAAAAAAAAAAAAAAAACf/EABQQAQAAAAAAAAAAAAAAAAAAAAD/xAAVAQEBAAAAAAAAAAAAAAAAAAAAAf/aAAwDAQACEQMRAD8AmrRTBFww//2Q=="
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-body font-display font-medium text-ink">{book.title}</h3>
                  <p className="mt-1 text-body-sm text-ink-secondary">{book.author}</p>
                  {book.review && (
                    <p className="mt-3 text-body-sm italic leading-relaxed text-ink-muted">
                      "{book.review}"
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Currently reading */}
        <div className="mt-10">
          <h2 className="text-h3 font-display font-medium text-ink">正在读</h2>
          <div className="mt-3 rounded-lg border border-latte/30 bg-latte/5 p-5">
            <p className="text-body-sm font-mono text-latte-dark">正在从《罪与罚》开始……</p>
          </div>
        </div>

        {/* Want to read */}
        <div className="mt-10">
          <h2 className="text-h3 font-display font-medium text-ink">想读</h2>
          <div className="mt-3 space-y-3">
            <div className="flex items-center gap-4 rounded-lg border border-[#e8e0d6] bg-white p-4">
              <div className="flex h-12 w-9 items-center justify-center rounded bg-cream-warm text-xs font-mono text-ink-muted">?</div>
              <div>
                <h3 className="text-body font-display font-medium text-ink">《西西弗神话》</h3>
                <p className="text-body-sm text-ink-secondary">加缪</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}