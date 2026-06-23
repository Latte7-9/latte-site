"use client";

import { useEffect, useRef, useCallback } from "react";

interface UseFadeInOptions {
  threshold?: number;
  rootMargin?: string;
}

export function useFadeIn(options: UseFadeInOptions = {}) {
  const { threshold = 0.1, rootMargin = "0px 0px -40px 0px" } = options;
  const ref = useRef<HTMLElement>(null);
  const hasAnimated = useRef(false);

  const handleIntersect = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          entry.target.classList.add("fade-in-visible");
        }
      });
    },
    [],
  );

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(handleIntersect, {
      threshold,
      rootMargin,
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, handleIntersect]);

  return ref;
}