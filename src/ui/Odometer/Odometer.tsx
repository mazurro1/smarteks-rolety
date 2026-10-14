"use client";

import { useRef, type CSSProperties } from "react";
import { useInView } from "@/lib/useInView";
import styles from "./Odometer.module.css";

interface OdometerProps {
  value: string;
  className?: string;
}

/**
 * Liczba "nakrecana" jak licznik po wejsciu w ekran.
 * W HTML zostaje prawdziwa wartosc (np. "600+") - tasma cyfr to tylko
 * pseudo-element CSS, wiec nie trafia do indeksu ani do czytnika ekranu.
 */
export default function Odometer({ value, className = "" }: OdometerProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const run = useInView(ref, { threshold: 0.5 });
  let digitIndex = 0;

  return (
    <span
      ref={ref}
      className={[className, styles.root, run ? styles.run : ""]
        .filter(Boolean)
        .join(" ")}
    >
      {Array.from(value).map((char, index) =>
        /\d/.test(char) ? (
          <span
            key={index}
            className={styles.digit}
            style={
              {
                "--digit": Number(char),
                "--order": digitIndex++,
              } as CSSProperties
            }
          >
            {char}
          </span>
        ) : (
          <span key={index} className={styles.char}>
            {char}
          </span>
        ),
      )}
    </span>
  );
}
