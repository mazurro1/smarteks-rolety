"use client";

import { useEffect, useRef } from "react";
import {
  REDUCED_MOTION_QUERY,
  useHydrated,
  useMediaQuery,
} from "@/lib/useMediaQuery";
import styles from "./CitiesMarquee.module.css";

interface CitiesMarqueeProps {
  eyebrow: string;
  title: string;
  cities: readonly string[];
}

/** Bazowa predkosc przesuwu, px/s. */
const BASE_SPEED = 65;
/** Jak mocno przewijanie strony rozpedza pasek. */
const SCROLL_BOOST = 5;
const MAX_BOOST = 1100;

/**
 * Pasek miejscowosci w ruchu. Lista jest w HTML raz (SEO), kopia do petli
 * powstaje dopiero w przegladarce i jest ukryta przed czytnikami ekranu.
 * Przewijanie przyspiesza pasek, a przewijanie w gore odwraca jego kierunek.
 * Pasek mozna tez przeciagnac myszka lub palcem (z rozpedem po puszczeniu).
 */
export default function CitiesMarquee({ eyebrow, title, cities }: CitiesMarqueeProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const cloneRef = useRef<HTMLUListElement>(null);
  const hydrated = useHydrated();
  const reducedMotion = useMediaQuery(REDUCED_MOTION_QUERY);
  const animated = hydrated && !reducedMotion;

  useEffect(() => {
    const section = sectionRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    const list = listRef.current;
    const clone = cloneRef.current;
    if (!animated || !section || !viewport || !track || !list || !clone) return;

    let offset = 0;
    let boost = 0;
    let lastScroll = window.scrollY;
    let lastTime = performance.now();
    let frame = 0;
    let running = false;
    let dragging = false;
    let dragX = 0;
    let dragTime = 0;
    let dragVelocity = 0;

    const onScroll = () => {
      const delta = window.scrollY - lastScroll;
      lastScroll = window.scrollY;
      boost = Math.max(-MAX_BOOST, Math.min(MAX_BOOST, boost + delta * SCROLL_BOOST));
    };

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - lastTime) / 1000);
      lastTime = now;
      boost *= Math.exp(-2.6 * dt);
      // Okres petli = odleglosc miedzy lista a jej kopia.
      const period = clone.offsetLeft - list.offsetLeft;
      if (!dragging) offset -= (BASE_SPEED + boost) * dt;
      if (period > 0) offset = ((offset % period) - period) % period;
      const skew = Math.max(-6, Math.min(6, -boost / 160));
      track.style.transform = `translate3d(${offset}px, 0, 0) skewX(${skew}deg)`;
      if (running) frame = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !running) {
        running = true;
        lastTime = performance.now();
        frame = requestAnimationFrame(tick);
      } else if (!entry.isIntersecting) {
        running = false;
        cancelAnimationFrame(frame);
      }
    });
    // Przeciaganie: pasek idzie za kursorem/palcem, po puszczeniu jedzie dalej.
    const onPointerDown = (event: PointerEvent) => {
      if (event.pointerType === "mouse" && event.button !== 0) return;
      dragging = true;
      dragX = event.clientX;
      dragTime = performance.now();
      dragVelocity = 0;
      boost = 0;
      viewport.setPointerCapture(event.pointerId);
      viewport.classList.add(styles.dragging);
    };
    const onPointerMove = (event: PointerEvent) => {
      if (!dragging) return;
      const now = performance.now();
      const dx = event.clientX - dragX;
      offset += dx;
      dragVelocity = (dx / Math.max(8, now - dragTime)) * 1000;
      dragX = event.clientX;
      dragTime = now;
    };
    const onPointerUp = () => {
      if (!dragging) return;
      dragging = false;
      viewport.classList.remove(styles.dragging);
      // Palec zatrzymany przed puszczeniem = bez rozpedu.
      const velocity = performance.now() - dragTime > 90 ? 0 : dragVelocity;
      boost = Math.max(-MAX_BOOST * 2, Math.min(MAX_BOOST * 2, -velocity - BASE_SPEED));
    };

    observer.observe(section);
    window.addEventListener("scroll", onScroll, { passive: true });
    viewport.addEventListener("pointerdown", onPointerDown);
    viewport.addEventListener("pointermove", onPointerMove);
    viewport.addEventListener("pointerup", onPointerUp);
    viewport.addEventListener("pointercancel", onPointerUp);

    return () => {
      running = false;
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      viewport.removeEventListener("pointerdown", onPointerDown);
      viewport.removeEventListener("pointermove", onPointerMove);
      viewport.removeEventListener("pointerup", onPointerUp);
      viewport.removeEventListener("pointercancel", onPointerUp);
    };
  }, [animated]);

  const items = (hidden: boolean) =>
    cities.map((city) => (
      <li key={city} className={styles.city} aria-hidden={hidden || undefined}>
        {city}
      </li>
    ));

  return (
    <section
      ref={sectionRef}
      className={`${styles.section} ${animated ? styles.animated : ""}`}
      aria-labelledby="cities-heading"
    >
      <div className={`container ${styles.header}`}>
        <p className={styles.eyebrow}>{eyebrow}</p>
        <h2 id="cities-heading" className={styles.title}>
          {title}
        </h2>
      </div>

      <div ref={viewportRef} className={styles.viewport}>
        <div ref={trackRef} className={styles.track}>
          <ul ref={listRef} className={styles.list}>
            {items(false)}
          </ul>
          {animated && (
            <ul ref={cloneRef} className={styles.list} aria-hidden="true">
              {items(true)}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
