"use client";

import { useState, useEffect, useCallback, useRef } from "react";

const b64encode = (s: string) => btoa(unescape(encodeURIComponent(s)));
const b64decode = (s: string) => decodeURIComponent(escape(atob(s)));

async function ghApi(method: string, path: string, repo: string, token: string, sha?: string, body?: Record<string, unknown>) {
  const url = `https://api.github.com/repos/${repo}/contents/${path}`;
  const headers: Record<string, string> = {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github+json",
    "Content-Type": "application/json",
  };
  const opts: RequestInit = { method, headers };
  if (body) {
    const b = { ...body };
    if (sha) b.sha = sha;
    opts.body = JSON.stringify(b);
  }
  const res = await fetch(url, opts);
  if (!res.ok) throw new Error(`${res.status}: ${res.statusText}`);
  return res.json();
}

interface SiteData {
  name: string; tagline: string; about: string; email: string;
  interests: Array<{ name: string; icon: string; page: string; description: string }>;
  books: Array<{ title: string; author: string; cover?: string; review?: string }>;
  currently: { reading: string; listening: string; learning: string; workingOn: string };
}

interface BlogPost { slug: string; title: string; date: string; excerpt: string; content: string; }
interface BlogData { posts: BlogPost[]; }
interface Comment { name: string; text: string; date: string; }

type StatusType = { ok: "info" | "ok" | "err"; text: string };

export default function AdminPage() {
  const [repo, setRepo] = useState("Latte7-9/latte-site");
  const [token, setToken] = useState("");
  const [connected, setConnected] = useState(false);
  const [siteData, setSiteData] = useState<SiteData | null>(null);
  const [blogData, setBlogData] = useState<BlogData>({ posts: [] });
  const [comments, setComments] = useState<Comment[]>([]);
  const [activeTab, setActiveTab] = useState("site");
  const [status, setStatus] = useState<StatusType>({ ok: "info", text: "连接到 GitHub" });
  const [images, setImages] = useState<string[]>([]);
  const [uploadMsg, setUploadMsg] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const login = useCallback(async () => {
    try {
      const siteRes = await ghApi("GET", "data/site.json", repo, token);
      const site = JSON.parse(b64decode(siteRes.content)) as SiteData;
      setSiteData(site);
      try {
        const blogRes = await ghApi("GET", "data/blog.json", repo, token);
        setBlogData(JSON.parse(b64decode(blogRes.content)) as BlogData);
      } catch { setBlogData({ posts: [] }); }
      try {
        const gbRes = await ghApi("GET", "data/comments.json", repo, token);
        setComments(JSON.parse(b64decode(gbRes.content)) as Comment[]);
      } catch { setComments([]); }
      setConnected(true);
      setStatus({ ok: "ok", text: "已连接" });
      sessionStorage.setItem("latte-admin", JSON.stringify({ repo, token }));
    } catch (e) {
      setStatus({ ok: "err", text: `连接失败: ${(e as Error).message}` });
    }
  }, [repo, token]);

  useEffect(() => {
    const saved = sessionStorage.getItem("latte-admin");
    if (saved) { try { const { repo: r, token: t } = JSON.parse(saved); setRepo(r); setToken(t); } catch {} }
  }, []);

  const saveSite = async () => {
    if (!siteData) return;
    try {
      const cur = await ghApi("GET", "data/site.json", repo, token);
      await ghApi("PUT", "data/site.json", repo, token, cur.sha, { message: "Update site", content: b64encode(JSON.stringify(siteData, null, 2)) });
      setStatus({ ok: "ok", text: "已保存" });
    } catch (e) { setStatus({ ok: "err", text: `保存失败: ${(e as Error).message}` }); }
  };

  const saveBlog = async () => {
    try {
      const cur = await ghApi("GET", "data/blog.json", repo, token);
      await ghApi("PUT", "data/blog.json", repo, token, cur.sha, { message: "Update blog", content: b64encode(JSON.stringify(blogData, null, 2)) });
      setStatus({ ok: "ok", text: "博客已保存" });
    } catch (e) { setStatus({ ok: "err", text: `保存失败: ${(e as Error).message}` }); }
  };

  const saveComments = async () => {
    try {
      const cur = await ghApi("GET", "data/comments.json", repo, token);
      await ghApi("PUT", "data/comments.json", repo, token, cur.sha, { message: "Update comments", content: b64encode(JSON.stringify(comments, null, 2)) });
      setStatus({ ok: "ok", text: "留言已保存" });
    } catch (e) { setStatus({ ok: "err", text: `保存失败: ${(e as Error).message}` }); }
  };

  const loadImages = async () => {
    try {
      const res = await fetch(`https://api.github.com/repos/${repo}/contents/images`, { headers: { Authorization: `Bearer ${token}` } });
      const files = await res.json();
      setImages(files.filter((f: { type: string; name: string }) => f.type === "file" && /\.(jpg|jpeg|png|gif|webp)$/i.test(f.name)).map((f: { name: string }) => f.name));
    } catch { setImages([]); }
  };

  const uploadImage = async (file: File) => {
    setUploadMsg("上传中...");
    const reader = new FileReader();
    reader.onload = async (e) => {
      const b64 = e.target?.result?.toString()?.split(",")[1];
      try {
        try {
          const cur = await ghApi("GET", `images/${file.name}`, repo, token);
          await ghApi("PUT", `images/${file.name}`, repo, token, cur.sha, { message: `Upload ${file.name}`, content: b64 });
        } catch {
          await ghApi("PUT", `images/${file.name}`, repo, token, undefined, { message: `Upload ${file.name}`, content: b64 });
        }
        setUploadMsg(`已上传: ${file.name}`);
        loadImages();
      } catch (err) { setUploadMsg(`上传失败: ${(err as Error).message}`); }
    };
    reader.readAsDataURL(file);
  };

  const tabs = [
    { id: "site", label: "网站" },
    { id: "blog", label: "博客" },
    { id: "guestbook", label: "留言池" },
    { id: "images", label: "图片" },
  ];

  if (!connected) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <h1 className="text-2xl font-display font-medium text-ink mb-6 text-center">Latte 管理后台</h1>
          <div className="rounded-xl border border-[#e8e0d6] bg-white p-6 shadow-sm space-y-4">
            <div>
              <label className="block text-xs font-medium text-ink-muted mb-1">仓库</label>
              <input type="text" value={repo} onChange={(e) => setRepo(e.target.value)} placeholder="Owner/Repo" className="w-full rounded-lg border border-[#e0d8ce] bg-white px-3 py-2 text-sm text-ink placeholder:text-ink-muted focus:border-latte focus:outline-none focus:ring-2 focus:ring-latte/20" />
            </div>
            <div>
              <label className="block text-xs font-medium text-ink-muted mb-1">GitHub Token</label>
              <input type="password" value={token} onChange={(e) => setToken(e.target.value)} placeholder="ghp_..." className="w-full rounded-lg border border-[#e0d8ce] bg-white px-3 py-2 text-sm text-ink placeholder:text-ink-muted focus:border-latte focus:outline-none focus:ring-2 focus:ring-latte/20" />
            </div>
            <button onClick={login} className="w-full rounded-lg bg-latte-dark px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-ink-secondary">
              连接
            </button>
          </div>
          {status.text !== "连接到 GitHub" && <div className="mt-3"><StatusBadge {...status} /></div>}
          <p className="mt-4 text-center text-xs text-ink-muted">
            <a href="https://latte7-9.github.io/latte-site/" target="_blank" rel="noopener noreferrer" className="text-latte hover:underline">
              ➜ 打开我的网站
            </a>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream p-4 sm:p-8">
      <div className="mx-auto max-w-3xl">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-xl font-display font-medium text-ink">Latte 管理后台</h1>
          <a href="https://latte7-9.github.io/latte-site/" target="_blank" rel="noopener noreferrer" className="text-sm text-latte hover:underline">
            查看网站 →
          </a>
        </div>
        <StatusBadge {...status} />

        <div className="mt-4 flex gap-0 overflow-x-auto border-b border-[#e8e0d6]">
          {tabs.map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`border-b-2 px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === tab.id ? "border-latte-dark text-ink" : "border-transparent text-ink-muted hover:text-ink-secondary"
              }`}>{tab.label}</button>
          ))}
        </div>

        {activeTab === "site" && siteData && (
          <div className="mt-6 rounded-xl border border-[#e8e0d6] bg-white p-6 shadow-sm space-y-4">
            <h2 className="text-base font-medium text-ink">网站内容</h2>
            <TextField label="姓名" value={siteData.name} onChange={(v) => setSiteData({ ...siteData, name: v })} />
            <TextField label="标语" value={siteData.tagline} onChange={(v) => setSiteData({ ...siteData, tagline: v })} />
            <TextAreaField label="关于" value={siteData.about} onChange={(v) => setSiteData({ ...siteData, about: v })} rows={3} />
            <TextField label="邮箱" value={siteData.email} onChange={(v) => setSiteData({ ...siteData, email: v })} />
            <button onClick={saveSite} className="rounded-lg bg-latte-dark px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-ink-secondary">
              保存网站配置
            </button>
          </div>
        )}

        {activeTab === "blog" && (
          <div className="mt-6 rounded-xl border border-[#e8e0d6] bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-medium text-ink">博客文章</h2>
              <span className="text-xs text-ink-muted">共 {blogData.posts.length} 篇</span>
            </div>
            <div className="mt-4 space-y-3">
              {blogData.posts.map((post, i) => (
                <div key={post.slug} className="rounded-lg border border-[#e8e0d6] p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-ink">{post.title}</h3>
                      <p className="text-xs text-ink-muted mt-1 font-mono">{post.date}</p>
                    </div>
                    <button onClick={() => { const n = [...blogData.posts]; n.splice(i, 1); setBlogData({ posts: n }); }} className="text-xs text-clay hover:opacity-80">删除</button>
                  </div>
                  <p className="mt-2 text-xs text-ink-secondary line-clamp-2">{post.excerpt}</p>
                </div>
              ))}
            </div>
            <button onClick={saveBlog} className="mt-4 rounded-lg bg-latte-dark px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-ink-secondary">
              保存全部文章
            </button>
          </div>
        )}

        {activeTab === "guestbook" && (
          <div className="mt-6 rounded-xl border border-[#e8e0d6] bg-white p-6 shadow-sm">
            <h2 className="text-base font-medium text-ink mb-4">留言池</h2>
            <div className="space-y-3">
              {comments.map((c, i) => (
                <div key={i} className="rounded-lg border border-[#e8e0d6] p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-ink">{c.name || "匿名"}</span>
                    <span className="text-xs text-ink-muted font-mono">{c.date}</span>
                  </div>
                  <p className="mt-1 text-sm text-ink-secondary">{c.text}</p>
                </div>
              ))}
              {comments.length === 0 && <p className="text-sm text-ink-muted">暂无留言</p>}
            </div>
            <button onClick={saveComments} className="mt-4 rounded-lg bg-latte-dark px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-ink-secondary">
              保存更改
            </button>
          </div>
        )}

        {activeTab === "images" && (
          <div className="mt-6 rounded-xl border border-[#e8e0d6] bg-white p-6 shadow-sm">
            <h2 className="text-base font-medium text-ink mb-4">图片管理</h2>
            <div className="flex items-center gap-2">
              <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) uploadImage(f); }} />
              <button onClick={() => fileInputRef.current?.click()} className="rounded-lg bg-latte-dark px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-ink-secondary">
                上传图片
              </button>
            </div>
            {uploadMsg && <p className="mt-2 text-xs text-ink-muted">{uploadMsg}</p>}
            <div className="mt-4 flex flex-wrap gap-3">
              {images.map((img) => (
                <div key={img} className="group relative">
                  <img src={`https://github.com/${repo}/raw/main/images/${img}`} alt={img} className="h-20 w-20 rounded-lg object-cover border border-[#e8e0d6]" />
                  <span className="mt-1 block text-[10px] text-ink-muted truncate w-20">{img}</span>
                </div>
              ))}
              {images.length === 0 && <p className="text-sm text-ink-muted">暂无图片</p>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function StatusBadge({ ok, text }: StatusType) {
  const colors = { info: "bg-sky-50 text-sky-700", ok: "bg-green-50 text-green-700", err: "bg-red-50 text-red-700" };
  return <div className={`rounded-lg px-4 py-2 text-sm ${colors[ok]}`}>{text}</div>;
}

function TextField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="block text-xs font-medium text-ink-muted mb-1">{label}</label>
      <input type="text" value={value} onChange={(e) => onChange(e.target.value)} className="w-full rounded-lg border border-[#e0d8ce] bg-white px-3 py-2 text-sm text-ink placeholder:text-ink-muted focus:border-latte focus:outline-none focus:ring-2 focus:ring-latte/20" />
    </div>
  );
}

function TextAreaField({ label, value, onChange, rows = 3 }: { label: string; value: string; onChange: (v: string) => void; rows?: number }) {
  return (
    <div>
      <label className="block text-xs font-medium text-ink-muted mb-1">{label}</label>
      <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={rows} className="w-full rounded-lg border border-[#e0d8ce] bg-white px-3 py-2 text-sm text-ink placeholder:text-ink-muted focus:border-latte focus:outline-none focus:ring-2 focus:ring-latte/20" />
    </div>
  );
}