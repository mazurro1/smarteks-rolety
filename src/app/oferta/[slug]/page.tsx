import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faFileLines } from "@fortawesome/free-solid-svg-icons";
import { NAMESPACES } from "@/constants/namespaces";
import { CONTACT_INFO } from "@/constants/contact";
import { ROUTES, SECTION_ANCHORS, offerPath } from "@/constants/routes";
import { OFFER_PRODUCTS, getOfferProduct, getOfferSlugs } from "@/data/offer";
import { getProjectsByCategory } from "@/data/projects";
import { PageHero } from "@/components/sections/PageHero";
import { InstallService } from "@/components/sections/InstallService";
import { FAQ } from "@/components/sections/FAQ";
import { CTA } from "@/components/sections/CTA";
import { ProjectCard } from "@/components/sections/Projects";
import SectionHeader from "@/ui/SectionHeader";
import MediaFrame from "@/ui/MediaFrame";
import Button from "@/ui/Button";
import Icon from "@/ui/Icon";
import Reveal from "@/ui/Reveal";
import styles from "./page.module.css";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL;

interface OfferProductPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getOfferSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: OfferProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getOfferProduct(slug);
  if (!product) return {};

  const tSite = await getTranslations(NAMESPACES.SITE);
  const url = `${BASE_URL}${offerPath(slug)}`;

  return {
    title: product.meta.title,
    description: product.meta.description,
    keywords: product.meta.keywords,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "pl_PL",
      url,
      siteName: tSite("name"),
      title: product.meta.title,
      description: product.meta.description,
    },
  };
}

export default async function OfferProductPage({ params }: OfferProductPageProps) {
  const { slug } = await params;
  const product = getOfferProduct(slug);
  if (!product) notFound();

  const t = await getTranslations(NAMESPACES.OFFER);
  const tCommon = await getTranslations(NAMESPACES.COMMON);
  const tProjects = await getTranslations(NAMESPACES.PROJECTS);
  const relatedProjects = getProjectsByCategory(product.projectCategories, 3);
  const otherProducts = OFFER_PRODUCTS.filter((item) => item.slug !== product.slug);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: product.title,
    description: product.meta.description,
    serviceType: product.title,
    provider: {
      "@type": "LocalBusiness",
      name: CONTACT_INFO.COMPANY_NAME,
      telephone: CONTACT_INFO.PHONE_HREF,
      email: CONTACT_INFO.EMAIL,
      address: {
        "@type": "PostalAddress",
        streetAddress: CONTACT_INFO.ADDRESS_STREET,
        addressLocality: "Warszawa",
        postalCode: "03-228",
        addressCountry: "PL",
      },
    },
    areaServed: [
      { "@type": "City", name: "Warszawa" },
      { "@type": "AdministrativeArea", name: "Mazowieckie" },
    ],
    url: `${BASE_URL}${offerPath(product.slug)}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      <PageHero
        eyebrow={product.eyebrow}
        title={product.title}
        lead={product.tagline}
        crumbs={[
          { label: t("breadcrumb"), href: ROUTES.OFFER },
          { label: product.navLabel, href: offerPath(product.slug) },
        ]}
        chips={product.highlights}
      />

      {/* ── Wprowadzenie + karta z parametrami ── */}
      <section className={`section ${styles.intro}`} aria-label={t("introAriaLabel")}>
        <div className={`container ${styles.introInner}`}>
          <div className={styles.introText}>
            {product.intro.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className={styles.paragraph}>
                {paragraph}
              </p>
            ))}

            <div className={styles.introActions}>
              <Button as="link" href={ROUTES.CONTACT} variant="primary">
                <FontAwesomeIcon icon={faFileLines} />
                {tCommon("actions.freeEstimate")}
              </Button>
              <Button as="a" href={CONTACT_INFO.PHONE_HREF} variant="outline">
                <FontAwesomeIcon icon={faPhone} />
                {CONTACT_INFO.PHONE}
              </Button>
            </div>
          </div>

          <aside className={styles.sidebar}>
            <MediaFrame
              ratio="4/3"
              alt={`${product.title} — zdjęcie poglądowe`}
              label={product.cardTitle}
              sizes="(max-width: 1023px) 100vw, 38vw"
              className={styles.sidebarMedia}
            />

            <div className={styles.quickFacts}>
              <p className={styles.quickFactsTitle}>{t("quickFactsTitle")}</p>
              <dl className={styles.quickList}>
                {product.specs.slice(0, 4).map((spec) => (
                  <div key={spec.label} className={styles.quickRow}>
                    <dt className={styles.quickLabel}>{spec.label}</dt>
                    <dd className={styles.quickValue}>{spec.value}</dd>
                  </div>
                ))}
              </dl>
              <Link href={`#${SECTION_ANCHORS.SPECS}`} className={styles.quickLink}>
                {t("allSpecs")} &darr;
              </Link>
            </div>
          </aside>
        </div>
      </section>

      {/* ── Cechy ── */}
      <section
        className={`section ${styles.features}`}
        aria-labelledby="features-heading"
      >
        <div className="container">
          <SectionHeader
            eyebrow={t("featuresEyebrow")}
            title={t("featuresTitle", { product: product.cardTitle })}
            id="features-heading"
          />

          <div className={styles.featuresGrid}>
            {product.features.map((feature, index) => (
              <Reveal key={feature.title} delay={index * 50}>
                <article className={styles.featureCard}>
                  <span className={styles.featureIcon}>
                    <Icon name={feature.icon} />
                  </span>
                  <h3 className={styles.featureTitle}>{feature.title}</h3>
                  <p className={styles.featureText}>{feature.description}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Parametry + warianty ── */}
      <section
        className={`section ${styles.specs}`}
        id={SECTION_ANCHORS.SPECS}
        aria-labelledby="specs-heading"
      >
        <div className={`container ${styles.specsInner}`}>
          <div>
            <SectionHeader
              eyebrow={t("specsEyebrow")}
              title={t("specsTitle")}
              align="left"
              id="specs-heading"
              className={styles.specsHeader}
            />
            <dl className={styles.specsTable}>
              {product.specs.map((spec) => (
                <div key={spec.label} className={styles.specsRow}>
                  <dt className={styles.specsLabel}>{spec.label}</dt>
                  <dd className={styles.specsValue}>{spec.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div>
            <SectionHeader
              eyebrow={t("variantsEyebrow")}
              title={t("variantsTitle")}
              align="left"
              className={styles.specsHeader}
            />
            <div className={styles.variants}>
              {product.variants.map((variant) => (
                <article key={variant.name} className={styles.variantCard}>
                  <h3 className={styles.variantTitle}>{variant.name}</h3>
                  <p className={styles.variantText}>{variant.description}</p>
                  <ul className={styles.variantPoints}>
                    {variant.points.map((point) => (
                      <li key={point} className={styles.variantPoint}>
                        <Icon name="check" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Montaz i serwis ── */}
      <InstallService
        installation={product.installation}
        service={product.service}
      />

      {/* ── Powiazane realizacje ── */}
      {relatedProjects.length > 0 && (
        <section
          className={`section ${styles.projects}`}
          id={SECTION_ANCHORS.PROJECTS}
          aria-labelledby="related-projects-heading"
        >
          <div className="container">
            <div className={styles.projectsHead}>
              <SectionHeader
                eyebrow={tProjects("related.eyebrow")}
                title={tProjects("related.title", { product: product.cardTitle })}
                align="left"
                id="related-projects-heading"
                className={styles.specsHeader}
              />
              <Link href={ROUTES.PROJECTS} className={styles.projectsLink}>
                {tProjects("related.cta")} &rarr;
              </Link>
            </div>

            <div className={styles.projectsGrid}>
              {relatedProjects.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── FAQ produktowe ── */}
      <FAQ
        items={product.faq}
        eyebrow={t("faqEyebrow")}
        title={t("faqTitle", { product: product.cardTitle })}
        lead={t("faqLead")}
        idPrefix={`faq-${product.slug}`}
        columns={1}
      />

      {/* ── Pozostale kategorie ── */}
      <section className={`section ${styles.others}`} aria-labelledby="others-heading">
        <div className="container">
          <h2 id="others-heading" className={styles.othersTitle}>
            {t("otherProducts")}
          </h2>
          <ul className={styles.othersList}>
            {otherProducts.map((item) => (
              <li key={item.slug}>
                <Link href={offerPath(item.slug)} className={styles.otherLink}>
                  <Icon name={item.icon} />
                  <span>{item.navLabel}</span>
                  <span className={styles.otherArrow} aria-hidden="true">
                    &rarr;
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CTA />
    </>
  );
}
