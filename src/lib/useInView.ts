"use client";

import { useEffect, useState, type RefObject } from "react";

interface InViewOptions {
  rootMargin?: string;
  threshold?: number;
}

/**
 * Element pojawil sie w viewporcie (jednorazowo - po wejsciu stan zostaje).
 * Animacje oparte na tym hooku maja stan poczatkowy ukryty tylko pod klasa
 * `html.js`, wiec bez JS tresc jest od razu widoczna (SEO i dostepnosc).
 */
export function useInView(
  ref: RefObject<Element | null>,
  { rootMargin = "0px 0px -8% 0px", threshold = 0.12 }: InViewOptions = {},
) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin, threshold },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [ref, rootMargin, threshold]);

  return inView;
}
