import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { NAMESPACES } from "@/constants/namespaces";
import { ROUTES, offerPath } from "@/constants/routes";
import { OFFER_PRODUCTS } from "@/data/offer";
import SectionHeader from "@/ui/SectionHeader";
import Icon from "@/ui/Icon";
import Reveal from "@/ui/Reveal";
import styles from "./OfferIndex.module.css";

export async function OfferIndex() {
  const t = await getTranslations(NAMESPACES.OFFER);

  return (
    <section className={`section ${styles.section}`} aria-labelledby="offer-heading">
      <div className="container">
        <SectionHeader
          eyebrow={t("sectionEyebrow")}
          title={t("sectionTitle")}
          lead={t("sectionLead")}
          id="offer-heading"
          align="left"
          className={styles.header}
        />

        <ul className={styles.list}>
          {OFFER_PRODUCTS.map((product, index) => (
            <li key={product.slug}>
              <Reveal delay={index * 60}>
                <Link href={offerPath(product.slug)} className={styles.row}>
                  <span className={styles.number}>
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className={styles.icon}>
                    <Icon name={product.icon} />
                  </span>

                  <span className={styles.body}>
                    <span className={styles.titleRow}>
                      <span className={styles.title}>{product.navLabel}</span>
                      {product.badge && (
                        <span className={styles.badge}>{product.badge}</span>
                      )}
                    </span>
                    <span className={styles.tagline}>{product.tagline}</span>
                  </span>

                  <span className={styles.highlights}>
                    {product.highlights.slice(0, 2).map((highlight) => (
                      <span key={highlight} className={styles.highlight}>
                        {highlight}
                      </span>
                    ))}
                  </span>

                  <span className={styles.arrow} aria-hidden="true">
                    &rarr;
                  </span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>

        <div className={styles.footer}>
          <p className={styles.footerNote}>{t("sectionNote")}</p>
          <Link href={ROUTES.OFFER} className={styles.footerLink}>
            {t("sectionCta")} &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
