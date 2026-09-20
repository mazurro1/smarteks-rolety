import type { ReactNode } from "react";
import Breadcrumbs, { type Crumb } from "@/ui/Breadcrumbs";
import styles from "./PageHero.module.css";

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  lead?: string;
  crumbs: Crumb[];
  /** Krotkie wyrozniki pod naglowkiem (np. klasa odpornosci, zasieg). */
  chips?: string[];
  children?: ReactNode;
}

export function PageHero({
  eyebrow,
  title,
  lead,
  crumbs,
  chips,
  children,
}: PageHeroProps) {
  return (
    <section className={styles.hero}>
      <div className={styles.glow} aria-hidden="true" />
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
