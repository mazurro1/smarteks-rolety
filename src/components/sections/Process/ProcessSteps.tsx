"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { REDUCED_MOTION_QUERY, useMediaQuery } from "@/lib/useMediaQuery";
import type { ProcessStep } from "@/types";
import Reveal from "@/ui/Reveal";
import styles from "./Process.module.css";

/** Czas wyswietlania jednego kroku przed przeskokiem do nastepnego (ms). */
const STEP_INTERVAL = 3200;


interface ProcessStepsProps {
  steps: ProcessStep[];
}

/**
 * Kroki procesu podswietlane po kolei: po wejsciu sekcji w viewport aktywny
 * krok przeskakuje co STEP_INTERVAL, a linia postepu dociaga do jego znacznika.
 * Najechanie na krok przenosi na niego podswietlenie i wstrzymuje animacje.
 * Przy `prefers-reduced-motion` kroki nie przelaczaja sie same.
 */
export default function ProcessSteps({ steps }: ProcessStepsProps) {
  const listRef = useRef<HTMLOListElement>(null);
  const [active, setActive] = useState(0);
  const [inView, setInView] = useState(false);
  const [hovering, setHovering] = useState(false);
  const reducedMotion = useMediaQuery(REDUCED_MOTION_QUERY);

  useEffect(() => {
    const node = listRef.current;
    if (!node || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.2 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const playing = inView && !hovering && !reducedMotion;

  useEffect(() => {
    if (!playing) return;
    const timer = window.setTimeout(
      () => setActive((current) => (current + 1) % steps.length),
      STEP_INTERVAL,
    );
    return () => window.clearTimeout(timer);
  }, [playing, active, steps.length]);

  return (
    <div
      className={styles.stepsWrap}
      style={
        {
          "--step-active": active,
          "--step-count": steps.length,
          "--step-interval": `${STEP_INTERVAL}ms`,
        } as CSSProperties
      }
    >
      <span className={styles.progress} aria-hidden="true" />

      <ol
        ref={listRef}
        className={styles.steps}
        onMouseLeave={() => setHovering(false)}
      >
        {steps.map((step, index) => {
          const state =
            index === active ? styles.active : index < active ? styles.done : "";

          return (
            <li
              key={step.number}
              className={`${styles.step} ${state}`}
              onMouseEnter={() => {
                setHovering(true);
                setActive(index);
              }}
            >
              <Reveal delay={index * 70} className={styles.stepInner}>
                <span className={styles.marker} aria-hidden="true">
                  <span className={styles.dot} />
                </span>
                <span className={styles.number}>{step.number}</span>
                <h3 className={styles.title}>{step.title}</h3>
                <p className={styles.description}>{step.description}</p>
                {/* Zawsze w DOM - stala wysokosc kroku, brak skakania ukladu. */}
                <span
                  className={`${styles.timer} ${
                    index === active && playing ? styles.timerRunning : ""
                  }`}
                  aria-hidden="true"
                />
              </Reveal>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
