"use client";

import { useState, useEffect, useCallback } from "react";
import { useFadeIn } from "@/hooks/use-fade-in";

interface Song {
  id: number;
  name: string;
  artists: string;
  cover: string;
  url: string;
  playCount: number;
}

interface NeteaseData {
  songs: Song[];
  updatedAt: string;
  status: string;
}

export default function RandomListen() {
  const ref = useFadeIn();
  const [data, setData] = useState<NeteaseData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [syncing, setSyncing] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch("/data/netease.json?v=" + Date.now());
      const json = await res.json();
      if (json.songs && json.songs.length > 0) {
        setData(json);
      } else {
        setError("暂无数据");
      }
    } catch {
      setError("加载失败，请稍后再试");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSync = async () => {
    setSyncing(true);
    try {
      // Try Railway API first, fall back to re-fetch
      try {
        const res = await fetch("https://latte-site-production.up.railway.app/api/netease/sync", { method: "POST" });
        if (res.ok) {
          // Re-fetch with cache bust
          await fetchData();
        }
      } catch {
        // Railway might be down, just show message
      }
    } finally {
      setSyncing(false);
    }
  };

  if (loading) {
    return (
      <section className="section" ref={ref}>
        <div className="container-narrow text-center text-ink-muted">加载中...</div>
      </section>
    );
  }

  if (error && !data) {
    return (
      <section className="section" ref={ref}>
        <div className="container-narrow text-center">
          <p className="text-ink-muted">{error}</p>
          <button onClick={handleSync} disabled={syncing} className="btn-primary mt-4">
            {syncing ? "同步中..." : "同步数据"}
          </button>
        </div>
      </section>
    );
  }

  const songs = data?.songs || [];
  const lastSync = data?.updatedAt ? new Date(data.updatedAt).toLocaleString("zh-CN") : "";

  return (
    <section className="section section-alt" ref={ref}>
      <div className="container-wide">
        <div className="fade-in">
          <p className="text-caption font-mono uppercase tracking-widest text-latte">music</p>
          <h2 className="mt-3 text-h2 text-ink">随心一听</h2>
          <p className="mt-1 text-body-sm text-ink-muted">
            数据来源：拿铁超人獭 · 网易云近一周听歌排行
            {lastSync && <span className="ml-2 font-mono text-ink-muted/60">· 上次同步: {lastSync}</span>}
          </p>
        </div>

        <div className="mt-6 stagger-children fade-in grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {songs.map((song, i) => (
            <a
              key={song.id}
              href={song.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-lg border border-[#e8e0d6] bg-white px-4 py-3 transition-all hover:border-latte/40 hover:shadow-sm group"
              style={{ transitionDelay: `${i * 40}ms` }}
            >
              <span className="text-base font-mono font-medium text-ink-muted/40 group-hover:text-latte">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-body-sm font-medium text-ink">{song.name}</p>
                <p className="truncate text-body-sm text-ink-muted">{song.artists}</p>
              </div>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-ink-muted/30 group-hover:text-latte transition-colors flex-shrink-0">
                <path d="M4 10L10 4M10 4H5M10 4v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          ))}
        </div>

        <div className="mt-4 text-center">
          <button onClick={handleSync} disabled={syncing} className="text-body-sm text-ink-muted hover:text-latte transition-colors">
            {syncing ? "同步中..." : "🔄 同步最新数据"}
          </button>
        </div>
      </div>
    </section>
  );
}