import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { NAMESPACES } from "@/constants/namespaces";
import { ROUTES, offerPath } from "@/constants/routes";
import { OFFER_PRODUCTS } from "@/data/offer";
import { OFFER_GUIDE } from "@/data/site";
import RichText from "@/ui/RichText";
import SectionHeader from "@/ui/SectionHeader";
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

                  <span className={styles.thumb}>
                    <Image
                      src={product.image.src}
                      alt={product.image.alt}
                      fill
                      sizes="(max-width: 599px) 88px, 144px"
                      className={styles.thumbImage}
                      style={
                        product.image.position
                          ? { objectPosition: product.image.position }
                          : undefined
                      }
                    />
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

        <div className={styles.guide}>
          <h3 className={styles.guideTitle}>{OFFER_GUIDE.title}</h3>
          <div className={styles.guideScroll}>
            <table className={styles.guideTable}>
              <thead>
                <tr>
                  {OFFER_GUIDE.columns.map((column) => (
                    <th key={column} scope="col">
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {OFFER_GUIDE.rows.map((row) => (
                  <tr key={row.situation}>
                    <td>{row.situation}</td>
                    <td>
                      <RichText text={row.fit} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

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
