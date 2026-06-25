"use client";

import { useEffect, useRef, useState } from "react";

export default function Intro() {
  const [entered, setEntered] = useState(false);
  const blobRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const blobColorRef = useRef<string>("#2990c0");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const gsap = require("gsap");
    const ScrollTrigger = require("gsap/ScrollTrigger");
    gsap.registerPlugin(ScrollTrigger);

    const blob = blobRef.current;
    const particles = particlesRef.current;
    if (!blob || !particles) return;

    // Create particles
    const colors = ["#ff3d71", "#00d4aa", "#ffb800", "#2990c0", "#7c4dff"];
    for (let i = 0; i < 25; i++) {
      const p = document.createElement("div");
      p.className = "intro-particle";
      const size = 2 + Math.random() * 5;
      const color = colors[Math.floor(Math.random() * colors.length)];
      p.style.cssText = `
        position: absolute; left: 50%; top: 50%;
        width: ${size}px; height: ${size}px;
        background: ${color};
        border-radius: 50%;
        opacity: 0;
        box-shadow: 0 0 ${4 + Math.random() * 8}px ${color};
      `;
      particles.appendChild(p);
    }

    const tl = gsap.timeline();

    tl.set(blob, { width: 0, height: 0, opacity: 0, left: "50%", top: "50%", xPercent: -50, yPercent: -50 })
      .to(blob, { width: 80, height: 80, opacity: 0.4, duration: 0.5, ease: "power2.out" })
      .to(blob, { width: 200, height: 200, opacity: 0.7, duration: 1, ease: "power3.inOut", borderRadius: "45% 55% 60% 40% / 50% 55% 45% 50%" })
      .to(blob, { borderRadius: "60% 40% 30% 70% / 55% 45% 55% 45%", width: 250, height: 180, opacity: 0.8, duration: 0.5, ease: "power2.inOut" })
      .to(blob, { borderRadius: "40% 60% 55% 45% / 60% 40% 50% 50%", width: 200, height: 220, duration: 0.5, ease: "power2.inOut" })
      .to(blob, { width: 400, height: 400, opacity: 0, filter: "blur(40px)", duration: 0.7, ease: "power3.out" }, "-=0.2")
      .to(".intro-particle", { opacity: 0.7, x: () => (Math.random() - 0.5) * 300, y: () => (Math.random() - 0.5) * 300, scale: () => 0.5 + Math.random() * 1.5, stagger: 0.03, duration: 0.8, ease: "power2.out" }, "<")
      .to(".intro-particle", { opacity: 0, duration: 0.6, ease: "power2.in" }, "+=0.3")
      .to(".intro-title", { opacity: 1, duration: 0.5, ease: "power2.out" }, "-=0.4")
      .to(".intro-subtitle", { opacity: 1, duration: 0.5, ease: "power2.out" }, "-=0.3")
      .to(".intro-hint", { opacity: 1, duration: 0.4, ease: "power2.out" }, "+=0.3");

    // Enter handlers
    const handleEnter = () => {
      if (entered) return;
      setEntered(true);

      const tl2 = gsap.timeline({
        onComplete: () => {
          if (introRef.current) introRef.current.style.display = "none";
        }
      });

      tl2
        .to(".intro-title, .intro-subtitle, .intro-hint", { opacity: 0, duration: 0.15, ease: "power2.in" })
        .to(blob, { y: "100%", opacity: 0, duration: 0.9, ease: "power4.inOut" }, "+=0.1")
        .to(".main-content", { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.9, ease: "power3.out" }, "-=0.9");
    };

    // Click handler
    const hintEl = document.querySelector(".intro-hint") as HTMLElement;
    hintEl?.addEventListener("click", handleEnter);

    // Wheel handler
    let wheelTimeout: ReturnType<typeof setTimeout>;
    const wheelHandler = (e: WheelEvent) => {
      if (!entered && e.deltaY > 0) {
        clearTimeout(wheelTimeout);
        wheelTimeout = setTimeout(handleEnter, 100);
      }
    };
    document.addEventListener("wheel", wheelHandler, { passive: true });

    // Touch handler
    let touchStartY = 0;
    const touchStartHandler = (e: TouchEvent) => { touchStartY = e.touches[0].clientY; };
    const touchEndHandler = (e: TouchEvent) => {
      if (!entered && e.changedTouches[0].clientY - touchStartY > 50) handleEnter();
    };
    document.addEventListener("touchstart", touchStartHandler, { passive: true });
    document.addEventListener("touchend", touchEndHandler, { passive: true });

    return () => {
      hintEl?.removeEventListener("click", handleEnter);
      document.removeEventListener("wheel", wheelHandler);
      document.removeEventListener("touchstart", touchStartHandler);
      document.removeEventListener("touchend", touchEndHandler);
    };
  }, [entered]);

  if (entered) return null;

  return (
    <div
      ref={introRef}
      className="fixed inset-0 z-[2000] flex items-center justify-center bg-[#0a0a0a]"
      style={{ transition: "opacity 0.8s, visibility 0.8s" }}
    >
      <div className="intro-bg absolute inset-0" style={{ background: "radial-gradient(ellipse at center, rgba(255,61,113,0.06) 0%, transparent 70%)" }} />
      <div
        ref={blobRef}
        className="intro-blob absolute"
        style={{
          background: "linear-gradient(135deg, #2990c0, #7c4dff)",
          borderRadius: "50%",
          filter: "blur(16px)",
          opacity: 0,
        }}
      />
      <div ref={particlesRef} className="intro-particles absolute inset-0 pointer-events-none" />
      <div className="intro-content relative z-10 text-center">
        <h1 className="intro-title text-[clamp(3rem,8vw,5rem)] font-light text-white tracking-[0.16em] opacity-0" style={{ fontFamily: "'Orbitron', sans-serif" }}>
          Latte
        </h1>
        <p className="intro-subtitle mt-4 text-base font-light text-[#999] tracking-[0.06em] opacity-0">
          记录 · 分享 · 三分钟热度
        </p>
        <div className="intro-hint mt-12 flex cursor-pointer flex-col items-center gap-2 opacity-0">
          <span className="text-sm tracking-[0.3em] text-white/70 transition-colors hover:text-[#ff3d71]">进入</span>
          <div className="h-5 w-5 border-r-1.5 border-b-1.5 border-white/50" style={{ transform: "rotate(45deg)", animation: "bounce 2s ease-in-out infinite" }} />
        </div>
      </div>
      <style jsx>{`
        @keyframes bounce {
          0%, 100% { transform: rotate(45deg) translateY(0); }
          50% { transform: rotate(45deg) translateY(6px); }
        }
      `}</style>
    </div>
  );
}