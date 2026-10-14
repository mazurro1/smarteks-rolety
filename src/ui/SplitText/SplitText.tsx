"use client";

import { Fragment, useRef } from "react";
import { useInView } from "@/lib/useInView";
import styles from "./SplitText.module.css";

interface SplitTextProps {
  text: string;
}

/**
 * Naglowek wjezdzajacy slowo po slowie spod maski.
 * Pelny tekst zostaje w HTML (slowa sa tylko owiniete w spany), a stan
 * ukryty dziala wylacznie z klasa `html.js` - SEO i czytniki ekranu bez zmian.
 */
export default function SplitText({ text }: SplitTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref);
  const words = text.split(" ");

  return (
    <span ref={ref} className={`${styles.root} ${inView ? styles.in : ""}`}>
      {words.map((word, index) => (
        <Fragment key={index}>
          <span className={styles.word}>
            <span
              className={styles.inner}
              style={{ transitionDelay: `${index * 55}ms` }}
            >
              {word}
            </span>
          </span>
          {index < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </span>
  );
}
