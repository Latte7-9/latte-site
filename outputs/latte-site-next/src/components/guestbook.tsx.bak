"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useFadeIn } from "@/hooks/use-fade-in";

interface DuckState {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  name: string;
  text: string;
}

const DUCK_COLORS = ["#f4a261", "#e9c46a", "#2a9d8f", "#e76f51", "#606c38", "#264653", "#c4956a"];

function DuckSVG({ color }: { color: string }) {
  return (
    <svg width="48" height="48" viewBox="0 0 60 60" fill="none" className="drop-shadow-sm">
      <ellipse cx="30" cy="36" rx="18" ry="14" fill={color} />
      <circle cx="42" cy="22" r="10" fill={color} />
      <ellipse cx="52" cy="24" rx="5" ry="3" fill="#e9c46a" />
      <circle cx="44" cy="20" r="2" fill="#1a1410" />
      <circle cx="44.5" cy="19.5" r="0.6" fill="white" />
      <ellipse cx="26" cy="34" rx="10" ry="6" fill={`${color}cc`} transform="rotate(-15 26 34)" />
      <path d="M12 34 L6 30 L8 38Z" fill={color} />
    </svg>
  );
}

export default function Guestbook() {
  const ref = useFadeIn();
  const containerRef = useRef<HTMLDivElement>(null);
  const ducksRef = useRef<DuckState[]>([]);
  const rafRef = useRef<number>(0);
  const [draggingIdx, setDraggingIdx] = useState<number | null>(null);
  const dragOffsetRef = useRef({ x: 0, y: 0 });
  const [formName, setFormName] = useState("");
  const [formText, setFormText] = useState("");

  // Animation loop
  useEffect(() => {
    const animate = () => {
      const container = containerRef.current;
      if (!container) { rafRef.current = requestAnimationFrame(animate); return; }
      const W = container.clientWidth;
      const H = container.clientHeight;

      ducksRef.current.forEach((d, i) => {
        if (i === draggingIdx) return;
        d.x += d.vx;
        d.y += d.vy;
        if (d.x < 0 || d.x > W - 48) d.vx *= -1;
        if (d.y < 0 || d.y > H - 48) d.vy *= -1;
        d.x = Math.max(0, Math.min(W - 48, d.x));
        d.y = Math.max(0, Math.min(H - 48, d.y));
      });

      // Sync DOM
      const duckEls = container.querySelectorAll<HTMLDivElement>("[data-duck]");
      duckEls.forEach((el, i) => {
        if (i !== draggingIdx) {
          el.style.left = ducksRef.current[i].x + "px";
          el.style.top = ducksRef.current[i].y + "px";
        }
      });

      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [draggingIdx]);

  const addDuck = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const W = container.clientWidth;
    const H = container.clientHeight;
    const color = DUCK_COLORS[Math.floor(Math.random() * DUCK_COLORS.length)];
    const x = 10 + Math.random() * Math.max(0, W - 60);
    const y = 10 + Math.random() * Math.max(0, H - 60);

    const idx = ducksRef.current.length;
    const el = document.createElement("div");
    el.dataset.duck = String(idx);
    el.className = "duck-item absolute cursor-grab select-none transition-transform duration-100 hover:scale-110";
    el.style.left = x + "px";
    el.style.top = y + "px";
    el.innerHTML = `<div style="width:48px;height:48px;">${renderDuck(color)}</div>`;

    el.addEventListener("mousedown", (e) => {
      const rect = el.getBoundingClientRect();
      dragOffsetRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
      setDraggingIdx(idx);
    });

    container.appendChild(el);
    ducksRef.current.push({ x, y, vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3, color, name: formName.trim() || "匿名", text: formText.trim() });
  }, [formName, formText]);

  // Drag handlers
  useEffect(() => {
    if (draggingIdx === null) return;
    const container = containerRef.current;
    if (!container) return;

    const onMove = (e: MouseEvent) => {
      const contRect = container.getBoundingClientRect();
      const x = e.clientX - contRect.left - dragOffsetRef.current.x;
      const y = e.clientY - contRect.top - dragOffsetRef.current.y;
      ducksRef.current[draggingIdx].x = Math.max(0, Math.min(x, contRect.width - 48));
      ducksRef.current[draggingIdx].y = Math.max(0, Math.min(y, contRect.height - 48));
      const duckEls = container.querySelectorAll<HTMLDivElement>("[data-duck]");
      if (duckEls[draggingIdx]) {
        duckEls[draggingIdx].style.left = ducksRef.current[draggingIdx].x + "px";
        duckEls[draggingIdx].style.top = ducksRef.current[draggingIdx].y + "px";
      }
    };
    const onUp = () => setDraggingIdx(null);
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
    };
  }, [draggingIdx]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formText.trim()) return;
    addDuck();
    setFormName("");
    setFormText("");
  };

  return (
    <section className="section" ref={ref}>
      <div className="container-wide">
        <div className="fade-in">
          <p className="text-caption font-mono uppercase tracking-widest text-latte">guestbook</p>
          <h2 className="mt-3 text-h2 text-ink">留言池</h2>
        </div>

        <div
          ref={containerRef}
          className="relative mt-8 h-[420px] w-full overflow-hidden rounded-xl border border-[#e8e0d6]"
          style={{ background: "linear-gradient(to bottom, rgba(180,210,235,0.25), rgba(210,230,240,0.15))" }}
        >
          {/* Ripples */}
          <div className="pointer-events-none absolute inset-0">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full border border-sky-300/15"
                style={{
                  width: `${50 + i * 35}px`,
                  height: `${50 + i * 35}px`,
                  left: `${10 + i * 15}%`,
                  top: `${15 + i * 10}%`,
                }}
              />
            ))}
          </div>

          {/* Empty state */}
          {ducksRef.current.length === 0 && (
            <div className="flex h-full w-full items-center justify-center text-ink-muted/50">
              <div className="text-center">
                <span className="text-4xl">🦆</span>
                <p className="mt-2 text-sm">还没有鸭子，来做第一条留言吧</p>
              </div>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-end">
          <div className="flex-1">
            <label htmlFor="gb-name" className="sr-only">你的名字</label>
            <input
              id="gb-name"
              type="text"
              placeholder="你的名字（选填）"
              maxLength={30}
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
              className="w-full rounded-lg border border-[#e0d8ce] bg-white px-4 py-2.5 text-body-sm text-ink placeholder:text-ink-muted transition-colors focus:border-latte focus:outline-none focus:ring-2 focus:ring-latte/20"
            />
          </div>
          <div className="flex-[2]">
            <label htmlFor="gb-text" className="sr-only">说点什么</label>
            <textarea
              id="gb-text"
              placeholder="说点什么吧..."
              rows={2}
              required
              maxLength={500}
              value={formText}
              onChange={(e) => setFormText(e.target.value)}
              className="w-full rounded-lg border border-[#e0d8ce] bg-white px-4 py-2.5 text-body-sm text-ink placeholder:text-ink-muted transition-colors focus:border-latte focus:outline-none focus:ring-2 focus:ring-latte/20"
            />
          </div>
          <button type="submit" className="btn-primary whitespace-nowrap sm:self-end">
            投喂鸭子 🦆
          </button>
        </form>
      </div>

      <style jsx>{`
        .duck-item:active { cursor: grabbing; }
      `}</style>
    </section>
  );
}

function renderDuck(color: string): string {
  return `<svg width="48" height="48" viewBox="0 0 60 60" fill="none" class="drop-shadow-sm">
    <ellipse cx="30" cy="36" rx="18" ry="14" fill="${color}"/>
    <circle cx="42" cy="22" r="10" fill="${color}"/>
    <ellipse cx="52" cy="24" rx="5" ry="3" fill="#e9c46a"/>
    <circle cx="44" cy="20" r="2" fill="#1a1410"/>
    <circle cx="44.5" cy="19.5" r="0.6" fill="white"/>
    <ellipse cx="26" cy="34" rx="10" ry="6" fill="${color}cc" transform="rotate(-15 26 34)"/>
    <path d="M12 34 L6 30 L8 38Z" fill="${color}"/>
  </svg>`;
}