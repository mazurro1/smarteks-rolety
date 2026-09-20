import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faFileLines } from "@fortawesome/free-solid-svg-icons";
import { NAMESPACES } from "@/constants/namespaces";
import { CONTACT_INFO } from "@/constants/contact";
import { ROUTES, offerPath, projectPath } from "@/constants/routes";
import {
  PROJECTS,
  PROJECT_CATEGORY_LABELS,
  getProject,
  getProjectSlugs,
} from "@/data/projects";
import { OFFER_PRODUCTS } from "@/data/offer";
import { PageHero } from "@/components/sections/PageHero";
import { ProjectGallery, ProjectCard } from "@/components/sections/Projects";
import { CTA } from "@/components/sections/CTA";
import Button from "@/ui/Button";
import Icon from "@/ui/Icon";
import styles from "./page.module.css";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL;

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  const tSite = await getTranslations(NAMESPACES.SITE);
  const url = `${BASE_URL}${projectPath(slug)}`;
  const title = `${project.title} — ${project.location}`;

  return {
    title,
    description: project.summary,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      locale: "pl_PL",
      url,
      siteName: tSite("name"),
      title,
      description: project.summary,
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const t = await getTranslations(NAMESPACES.PROJECTS);
  const tCommon = await getTranslations(NAMESPACES.COMMON);

  const related = PROJECTS.filter(
    (item) => item.slug !== project.slug && item.category === project.category,
  ).slice(0, 3);

  const relatedProduct = OFFER_PRODUCTS.find((product) =>
    product.projectCategories.includes(project.category),
  );

  return (
    <>
      <PageHero
        eyebrow={PROJECT_CATEGORY_LABELS[project.category]}
        title={project.title}
        lead={project.summary}
        crumbs={[
          { label: t("breadcrumb"), href: ROUTES.PROJECTS },
          { label: project.title, href: projectPath(project.slug) },
        ]}
        chips={[project.location, project.buildingType, String(project.year)]}
      />

      <section className={`section ${styles.section}`} aria-label={t("detail.galleryAriaLabel")}>
        <div className={`container ${styles.inner}`}>
          <div className={styles.main}>
            <ProjectGallery images={project.gallery} title={project.title} />

            <div className={styles.description}>
              {project.description.map((paragraph) => (
                <p key={paragraph.slice(0, 40)} className={styles.paragraph}>
                  {paragraph}
                </p>
              ))}
            </div>

            <div className={styles.outcome}>
              <p className={styles.outcomeLabel}>{t("detail.outcomeLabel")}</p>
              <p className={styles.outcomeText}>{project.outcome}</p>
            </div>
          </div>

          <aside className={styles.sidebar}>
            <div className={styles.card}>
              <p className={styles.cardTitle}>{t("detail.scopeTitle")}</p>
              <ul className={styles.scope}>
                {project.scope.map((item) => (
                  <li key={item} className={styles.scopeItem}>
                    <Icon name="check" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.card}>
              <p className={styles.cardTitle}>{t("detail.specsTitle")}</p>
              <dl className={styles.specs}>
                {project.specs.map((spec) => (
                  <div key={spec.label} className={styles.specsRow}>
                    <dt className={styles.specsLabel}>{spec.label}</dt>
                    <dd className={styles.specsValue}>{spec.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {relatedProduct && (
              <Link
                href={offerPath(relatedProduct.slug)}
                className={styles.productLink}
              >
                <Icon name={relatedProduct.icon} />
                <span>
                  <span className={styles.productLinkLabel}>
                    {t("detail.productLinkLabel")}
                  </span>
                  <span className={styles.productLinkTitle}>
                    {relatedProduct.navLabel}
                  </span>
                </span>
                <span className={styles.productArrow} aria-hidden="true">
                  &rarr;
                </span>
              </Link>
            )}

            <div className={styles.ctaCard}>
              <p className={styles.ctaTitle}>{t("detail.ctaTitle")}</p>
              <p className={styles.ctaText}>{t("detail.ctaText")}</p>
              <div className={styles.ctaActions}>
                <Button as="link" href={ROUTES.CONTACT} variant="primary" fullWidth>
                  <FontAwesomeIcon icon={faFileLines} />
                  {tCommon("actions.freeEstimate")}
                </Button>
                <Button
                  as="a"
                  href={CONTACT_INFO.PHONE_HREF}
                  variant="outline"
                  fullWidth
                >
                  <FontAwesomeIcon icon={faPhone} />
                  {CONTACT_INFO.PHONE}
                </Button>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {related.length > 0 && (
        <section
          className={`section ${styles.related}`}
          aria-labelledby="related-heading"
        >
          <div className="container">
            <div className={styles.relatedHead}>
              <h2 id="related-heading" className={styles.relatedTitle}>
                {t("detail.relatedTitle")}
              </h2>
              <Link href={ROUTES.PROJECTS} className={styles.relatedLink}>
                {t("detail.backToList")} &rarr;
              </Link>
            </div>
            <div className={styles.relatedGrid}>
              {related.map((item) => (
                <ProjectCard key={item.slug} project={item} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CTA />
    </>
  );
}
