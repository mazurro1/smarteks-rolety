import type { Metadata } from "next";
import Link from "next/link";
import { ROUTES, offerPath } from "@/constants/routes";
import { OFFER_PRODUCTS } from "@/data/offer";
import Button from "@/ui/Button";
import styles from "./not-found.module.css";

/**
 * Strona dla nieistniejacych adresow. Next.js zwraca ja z kodem 404.
 * robots nadpisuje "index, follow" z layoutu - inaczej obok "noindex" od Next.js
 * bylby sprzeczny tag.
 */
export const metadata: Metadata = {
  title: "Nie znaleziono strony",
  description: "Strona o tym adresie nie istnieje.",
  robots: { index: false, follow: true },
  // Wlasne Open Graph bez "url" - inaczej 404 dziedziczy og:url strony glownej.
  openGraph: {
    type: "website",
    locale: "pl_PL",
    title: "Nie znaleziono strony",
  },
};

export default function NotFound() {
  return (
    <section className={`section ${styles.page}`}>
      <div className={`container ${styles.inner}`}>
        <h1 className={styles.title}>Nie znaleziono strony</h1>
        <p className={styles.lead}>
          Adres mógł się zmienić albo strona została usunięta. Zacznij od
          strony głównej lub wybierz kategorię z oferty.
        </p>

        <div className={styles.actions}>
          <Button as="link" href={ROUTES.HOME} variant="primary">
            Strona główna
          </Button>
          <Button as="link" href={ROUTES.CONTACT} variant="outline">
            Kontakt
          </Button>
        </div>

        <ul className={styles.links}>
          {OFFER_PRODUCTS.map((product) => (
            <li key={product.slug}>
              <Link href={offerPath(product.slug)} className={styles.link}>
                {product.navLabel} &rarr;
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
