import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { NAMESPACES } from "@/constants/namespaces";
import { ROUTES, offerPath } from "@/constants/routes";
import { OFFER_PRODUCTS } from "@/data/offer";
import { GENERIC_INSTALLATION, GENERIC_SERVICE } from "@/data/site";
import { PageHero } from "@/components/sections/PageHero";
import { InstallService } from "@/components/sections/InstallService";
import { Process } from "@/components/sections/Process";
import { CTA } from "@/components/sections/CTA";
import MediaFrame from "@/ui/MediaFrame";
import Icon from "@/ui/Icon";
import Reveal from "@/ui/Reveal";
import styles from "./page.module.css";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL;

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations(NAMESPACES.OFFER);
  const tSite = await getTranslations(NAMESPACES.SITE);

  return {
    title: t("pageTitle"),
    description: t("pageDescription"),
    alternates: { canonical: `${BASE_URL}${ROUTES.OFFER}` },
    openGraph: {
      type: "website",
      locale: "pl_PL",
      url: `${BASE_URL}${ROUTES.OFFER}`,
      siteName: tSite("name"),
      title: t("pageTitle"),
      description: t("pageDescription"),
    },
  };
}

export default async function OfferPage() {
  const t = await getTranslations(NAMESPACES.OFFER);

  return (
    <>
      <PageHero
        eyebrow={t("heroEyebrow")}
        title={t("heroTitle")}
        lead={t("heroLead")}
        crumbs={[{ label: t("breadcrumb"), href: ROUTES.OFFER }]}
        chips={[
          t("chips.certified"),
          t("chips.ownTeam"),
          t("chips.warranty"),
          t("chips.area"),
        ]}
      />

      <section className={`section ${styles.section}`} aria-label={t("listAriaLabel")}>
        <div className="container">
          <div className={styles.grid}>
            {OFFER_PRODUCTS.map((product, index) => (
              <Reveal
                key={product.slug}
                delay={index * 60}
                className={index < 2 ? styles.wide : styles.narrow}
              >
                <article className={styles.card}>
                  <div className={styles.media}>
                    <MediaFrame
                      ratio={index < 2 ? "16/9" : "4/3"}
                      alt={`${product.title} — przykładowa realizacja`}
                      label={product.cardTitle}
                      sizes="(max-width: 767px) 100vw, (max-width: 1239px) 50vw, 40vw"
                      className={styles.mediaFrame}
                    />
                    <span className={styles.icon}>
                      <Icon name={product.icon} />
                    </span>
                    {product.badge && (
                      <span className={styles.badge}>{product.badge}</span>
                    )}
                  </div>

                  <div className={styles.body}>
                    <p className={styles.eyebrow}>{product.eyebrow}</p>
                    <h2 className={styles.title}>
                      <Link href={offerPath(product.slug)} className={styles.titleLink}>
                        {product.navLabel}
                      </Link>
                    </h2>
                    <p className={styles.excerpt}>{product.excerpt}</p>

                    <ul className={styles.highlights}>
                      {product.highlights.map((highlight) => (
                        <li key={highlight} className={styles.highlight}>
                          <Icon name="check" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>

                    <Link href={offerPath(product.slug)} className={styles.link}>
                      {t("cardCta")} &rarr;
                    </Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <InstallService
        installation={GENERIC_INSTALLATION}
        service={GENERIC_SERVICE}
      />

      <Process />

      <CTA />
    </>
  );
}
