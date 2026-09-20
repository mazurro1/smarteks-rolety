"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faXmark,
  faExpand,
} from "@fortawesome/free-solid-svg-icons";
import { NAMESPACES } from "@/constants/namespaces";
import type { ProjectImage } from "@/types";
import MediaFrame from "@/ui/MediaFrame";
import styles from "./ProjectGallery.module.css";

interface ProjectGalleryProps {
  images: ProjectImage[];
  title: string;
}

export default function ProjectGallery({ images, title }: ProjectGalleryProps) {
  const t = useTranslations(`${NAMESPACES.PROJECTS}.gallery`);
  const [index, setIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const total = images.length;

  const goTo = useCallback(
    (next: number) => setIndex((next + total) % total),
    [total],
  );

  useEffect(() => {
    if (!lightboxOpen) return;

    closeButtonRef.current?.focus();
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLightboxOpen(false);
      if (event.key === "ArrowLeft") goTo(index - 1);
      if (event.key === "ArrowRight") goTo(index + 1);
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [lightboxOpen, index, goTo]);

  const current = images[index];

  return (
    <div className={styles.gallery}>
      <div className={styles.stage}>
        <MediaFrame
          src={current.src}
          alt={current.alt}
          ratio="16/9"
          label={current.caption}
          priority
          sizes="(max-width: 1023px) 100vw, 66vw"
        />

        <button
          type="button"
          className={styles.expand}
          onClick={() => setLightboxOpen(true)}
          aria-label={t("openLightbox")}
        >
          <FontAwesomeIcon icon={faExpand} aria-hidden="true" />
        </button>

        {total > 1 && (
          <>
            <button
              type="button"
              className={`${styles.navButton} ${styles.prev}`}
              onClick={() => goTo(index - 1)}
              aria-label={t("prev")}
            >
              <FontAwesomeIcon icon={faChevronLeft} aria-hidden="true" />
            </button>
            <button
              type="button"
              className={`${styles.navButton} ${styles.next}`}
              onClick={() => goTo(index + 1)}
              aria-label={t("next")}
            >
              <FontAwesomeIcon icon={faChevronRight} aria-hidden="true" />
            </button>
          </>
        )}
      </div>

      <div className={styles.captionRow}>
        <p className={styles.caption}>{current.caption ?? current.alt}</p>
        <span className={styles.counter}>
          {index + 1} / {total}
        </span>
      </div>

      {total > 1 && (
        <div className={styles.thumbs}>
          {images.map((image, thumbIndex) => (
            <button
              key={image.alt}
              type="button"
              className={`${styles.thumb} ${thumbIndex === index ? styles.thumbActive : ""}`}
              onClick={() => setIndex(thumbIndex)}
              aria-label={`${t("goToSlide")} ${thumbIndex + 1}`}
              aria-current={thumbIndex === index}
            >
              <MediaFrame
                src={image.src}
                alt=""
                ratio="4/3"
                sizes="120px"
                className={styles.thumbFrame}
              />
            </button>
          ))}
        </div>
      )}

      {lightboxOpen && (
        <div
          className={styles.lightbox}
          role="dialog"
          aria-modal="true"
          aria-label={`${title} — ${t("dialogLabel")}`}
        >
          <button
            type="button"
            ref={closeButtonRef}
            className={styles.close}
            onClick={() => setLightboxOpen(false)}
            aria-label={t("close")}
          >
            <FontAwesomeIcon icon={faXmark} aria-hidden="true" />
          </button>

          <div className={styles.lightboxStage}>
            <MediaFrame
              src={current.src}
              alt={current.alt}
              ratio="16/9"
              label={current.caption}
              sizes="90vw"
              className={styles.lightboxFrame}
            />
            <p className={styles.lightboxCaption}>
              {current.caption ?? current.alt}
              <span className={styles.lightboxCounter}>
                {index + 1} / {total}
              </span>
            </p>
          </div>

          {total > 1 && (
            <>
              <button
                type="button"
                className={`${styles.navButton} ${styles.lightboxPrev}`}
                onClick={() => goTo(index - 1)}
                aria-label={t("prev")}
              >
                <FontAwesomeIcon icon={faChevronLeft} aria-hidden="true" />
              </button>
              <button
                type="button"
                className={`${styles.navButton} ${styles.lightboxNext}`}
                onClick={() => goTo(index + 1)}
                aria-label={t("next")}
              >
                <FontAwesomeIcon icon={faChevronRight} aria-hidden="true" />
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
