"use client";

import { useState, type CSSProperties } from "react";
import type { ProjectImage } from "@/types";
import MediaFrame from "@/ui/MediaFrame";
import styles from "./BeforeAfter.module.css";

interface BeforeAfterProps {
  before: ProjectImage;
  after: ProjectImage;
  labels: {
    title: string;
    before: string;
    after: string;
    slider: string;
  };
}

/**
 * Porownanie zdjec przed i po montazu. Suwakiem jest natywny <input type="range">
 * na calej powierzchni - dziala mysza, palcem i klawiatura.
 */
export default function BeforeAfter({ before, after, labels }: BeforeAfterProps) {
  const [position, setPosition] = useState(50);

  return (
    <figure className={styles.root}>
      <div
        className={styles.stage}
        style={{ "--position": `${position}%` } as CSSProperties}
      >
        <MediaFrame
          src={after.src}
          alt={after.alt}
          position={after.position}
          label={after.caption}
          ratio="16/9"
          sizes="(max-width: 1023px) 100vw, 66vw"
          reveal={false}
        />
        <div className={styles.before}>
          <MediaFrame
            src={before.src}
            alt={before.alt}
            position={before.position}
            label={before.caption}
            ratio="16/9"
            sizes="(max-width: 1023px) 100vw, 66vw"
            reveal={false}
          />
        </div>

        <span className={`${styles.tag} ${styles.tagBefore}`} aria-hidden="true">
          {labels.before}
        </span>
        <span className={`${styles.tag} ${styles.tagAfter}`} aria-hidden="true">
          {labels.after}
        </span>
        <span className={styles.handle} aria-hidden="true">
          <span className={styles.knob} />
        </span>

        <input
          type="range"
          min={0}
          max={100}
          step={1}
          value={position}
          onChange={(event) => setPosition(Number(event.target.value))}
          className={styles.range}
          aria-label={labels.slider}
        />
      </div>
      <figcaption className={styles.caption}>{labels.title}</figcaption>
    </figure>
  );
}
