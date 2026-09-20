"use client";

import Link from "next/link";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { NAMESPACES } from "@/constants/namespaces";
import { projectPath } from "@/constants/routes";
import { PROJECT_CATEGORY_LABELS } from "@/data/projects";
import type { Project } from "@/types";
import MediaFrame from "@/ui/MediaFrame";
import styles from "./ProjectCard.module.css";

interface ProjectCardProps {
  project: Project;
  priority?: boolean;
}

const SWIPE_THRESHOLD = 40;

export default function ProjectCard({
  project,
  priority = false,
}: ProjectCardProps) {
  const t = useTranslations(`${NAMESPACES.PROJECTS}.card`);
  const [index, setIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const total = project.gallery.length;

  const goTo = (next: number) => setIndex((next + total) % total);

  const handleTouchEnd = (event: React.TouchEvent) => {
    if (touchStartX === null) return;
    const delta = event.changedTouches[0].clientX - touchStartX;
    if (Math.abs(delta) > SWIPE_THRESHOLD) goTo(delta < 0 ? index + 1 : index - 1);
    setTouchStartX(null);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goTo(index - 1);
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      goTo(index + 1);
    }
  };

  const current = project.gallery[index];

  return (
    <article className={styles.card}>
      <div
        className={styles.media}
        onTouchStart={(event) => setTouchStartX(event.touches[0].clientX)}
        onTouchEnd={handleTouchEnd}
        onKeyDown={handleKeyDown}
        role="group"
        aria-roledescription="carousel"
        aria-label={project.title}
        tabIndex={0}
      >
        <MediaFrame
          src={current.src}
          alt={current.alt}
          ratio="4/3"
          label={current.caption}
          priority={priority && index === 0}
          sizes="(max-width: 767px) 100vw, (max-width: 1239px) 50vw, 33vw"
          className={styles.frame}
        />

        <span className={styles.category}>
          {PROJECT_CATEGORY_LABELS[project.category]}
        </span>

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

            <div className={styles.dots}>
              {project.gallery.map((image, dotIndex) => (
                <button
                  key={image.alt}
                  type="button"
                  className={`${styles.dot} ${dotIndex === index ? styles.dotActive : ""}`}
                  onClick={() => goTo(dotIndex)}
                  aria-label={`${t("goToSlide")} ${dotIndex + 1}`}
                  aria-current={dotIndex === index}
                />
              ))}
            </div>

            <span className={styles.counter} aria-live="polite">
              {index + 1} {t("slideOf")} {total}
            </span>
          </>
        )}
      </div>

      <div className={styles.body}>
        <p className={styles.meta}>
          <FontAwesomeIcon icon={faLocationDot} aria-hidden="true" />
          {project.location}
          <span className={styles.metaDivider} aria-hidden="true">
            ·
          </span>
          {project.year}
        </p>

        <h3 className={styles.title}>
          <Link href={projectPath(project.slug)} className={styles.titleLink}>
            {project.title}
          </Link>
        </h3>

        <p className={styles.summary}>{project.summary}</p>

        <Link href={projectPath(project.slug)} className={styles.link}>
          {t("viewProject")} &rarr;
        </Link>
      </div>
    </article>
  );
}
