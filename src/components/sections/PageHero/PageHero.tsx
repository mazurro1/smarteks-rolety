import type { ReactNode } from "react";
import Image from "next/image";
import { PAGE_HERO_IMAGE } from "@/data/media";
import type { MediaImage } from "@/types";
import Breadcrumbs, { type Crumb } from "@/ui/Breadcrumbs";
import styles from "./PageHero.module.css";

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  lead?: string;
  crumbs: Crumb[];
  /** Krotkie wyrozniki pod naglowkiem (np. klasa odpornosci, zasieg). */
  chips?: string[];
  /** Zdjecie w tle naglowka. Domyslnie wspolne tlo podstron. */
  image?: MediaImage;
  children?: ReactNode;
}

export function PageHero({
  eyebrow,
  title,
  lead,
  crumbs,
  chips,
  image = PAGE_HERO_IMAGE,
  children,
}: PageHeroProps) {
  return (
    <section className={styles.hero}>
      <div className={styles.backdrop}>
        <Image
          src={image.src}
          alt={image.alt}
          fill
          priority
          sizes="100vw"
          quality={90}
          className={styles.backdropImage}
          style={image.position ? { objectPosition: image.position } : undefined}
        />
      </div>
      <div className={styles.shade} aria-hidden="true" />
      <div className={`container ${styles.inner}`}>
        <Breadcrumbs items={crumbs} className={styles.crumbs} />

        {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
        <h1 className={styles.title}>{title}</h1>
        {lead && <p className={styles.lead}>{lead}</p>}

        {chips && chips.length > 0 && (
          <ul className={styles.chips}>
            {chips.map((chip) => (
              <li key={chip} className={styles.chip}>
                {chip}
              </li>
            ))}
          </ul>
        )}

        {children}
      </div>
    </section>
  );
}
