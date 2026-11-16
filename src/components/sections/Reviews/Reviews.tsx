import { REVIEWS } from "@/data/site";
import SectionHeader from "@/ui/SectionHeader";
import styles from "./Reviews.module.css";

/**
 * Oceny klientow z Oferteo. Liczby sa zwyklym tekstem (nie obrazkiem), zeby
 * mogly je przeczytac wyszukiwarki. Dane i data stanu: REVIEWS w src/data/site.ts.
 */
export function Reviews() {
  return (
    <section
      className={`section ${styles.section}`}
      aria-labelledby="reviews-heading"
    >
      <div className="container">
        <SectionHeader
          eyebrow={REVIEWS.eyebrow}
          title={REVIEWS.title}
          id="reviews-heading"
          className={styles.header}
        />

        <div className={styles.stats}>
          {REVIEWS.stats.map((stat) => (
            <p key={stat.label} className={styles.stat}>
              <span className={styles.statValue}>
                {stat.value}
                {stat.stars && (
                  <span className={styles.stars}> {stat.stars}</span>
                )}
              </span>
              <span className={styles.statLabel}>{stat.label}</span>
            </p>
          ))}
        </div>

        <p className={styles.note}>{REVIEWS.note}</p>

        <p className={styles.links}>
          {REVIEWS.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={styles.link}
              target="_blank"
              rel="noopener"
            >
              {link.label} &rarr;
            </a>
          ))}
        </p>
      </div>
    </section>
  );
}
