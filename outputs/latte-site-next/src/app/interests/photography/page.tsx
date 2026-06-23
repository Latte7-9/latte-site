import Link from "next/link";

export default function PhotographyPage() {
  return (
    <main className="min-h-screen bg-cream pt-24 pb-16">
      <div className="container-narrow">
        <Link href="/" className="inline-flex items-center gap-1 text-body-sm text-ink-muted hover:text-latte transition-colors mb-8">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 2L5 7l4 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          返回首页
        </Link>

        <p className="text-caption font-mono uppercase tracking-widest text-latte">interest</p>
        <h1 className="mt-3 text-h1 text-ink">摄影</h1>
        <p className="mt-2 text-body-lg font-light text-ink-secondary">用镜头捕捉生活中转瞬即逝的光影</p>

        <div className="mt-8 rounded-lg border border-[#e8e0d6] bg-white p-5">
          <h2 className="text-h3 font-display font-medium text-ink">关于相机</h2>
          <div className="mt-3 text-body leading-relaxed text-ink-secondary">
            <p>2020年用自己的钱买了人生第一台相机，从此快门成为了我留住时间的方式。</p>
            <div className="mt-4 space-y-1 text-ink-muted italic">
              <p>"你怎么乱七八糟的都拍"</p>
              <p>"你不觉得这张构图很好吗"</p>
            </div>
          </div>
        </div>

        {/* Photo gallery */}
        <div className="mt-10">
          <h2 className="text-h3 font-display font-medium text-ink">随拍</h2>
          <p className="mt-1 text-body-sm text-ink-muted">用镜头捕捉生活中转瞬即逝的光影</p>
          
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {[
              { label: "幸福楼", desc: "随手一拍" },
              { label: "风景", desc: "待上传" },
              { label: "街拍", desc: "待上传" },
              { label: "人像", desc: "待上传" },
            ].map((album, i) => (
              <div key={i} className="group overflow-hidden rounded-xl border border-[#e8e0d6] bg-white transition-all hover:border-latte/40 hover:shadow-md">
                <div className="aspect-square w-full bg-cream-warm flex items-center justify-center">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="text-ink-muted/30 group-hover:text-latte/40 transition-colors">
                    <rect x="4" y="4" width="32" height="32" rx="4" stroke="currentColor" strokeWidth="1.5"/>
                    <circle cx="14" cy="14" r="4" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M4 28l8-8 6 6 8-10 10 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="p-3">
                  <h3 className="text-body-sm font-medium text-ink">{album.label}</h3>
                  <p className="text-body-sm text-ink-muted">{album.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-lg border border-dashed border-[#e8e0d6] bg-cream-warm/50 p-6 text-center">
            <p className="text-body-sm text-ink-muted">
              图集功能正在搭建中，后续会通过管理后台上传图片。
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}