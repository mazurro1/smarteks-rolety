import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { NAMESPACES } from "@/constants/namespaces";
import { ROUTES, projectPath } from "@/constants/routes";
import { PROJECTS } from "@/data/projects";
import { STATS } from "@/data/site";
import { PageHero } from "@/components/sections/PageHero";
import { ProjectsExplorer } from "@/components/sections/Projects";
import { CTA } from "@/components/sections/CTA";
import styles from "./page.module.css";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL;

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations(NAMESPACES.PROJECTS);
  const tSite = await getTranslations(NAMESPACES.SITE);

  return {
    title: t("pageTitle"),
    description: t("pageDescription"),
    alternates: { canonical: `${BASE_URL}${ROUTES.PROJECTS}` },
    openGraph: {
      type: "website",
      locale: "pl_PL",
      url: `${BASE_URL}${ROUTES.PROJECTS}`,
      siteName: tSite("name"),
      title: t("pageTitle"),
      description: t("pageDescription"),
    },
  };
}

export default async function ProjectsPage() {
  const t = await getTranslations(NAMESPACES.PROJECTS);

  const listSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: t("pageTitle"),
    itemListElement: PROJECTS.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: project.title,
      url: `${BASE_URL}${projectPath(project.slug)}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(listSchema) }}
      />

      <PageHero
        eyebrow={t("heroEyebrow")}
        title={t("heroTitle")}
        lead={t("heroLead")}
        crumbs={[{ label: t("breadcrumb"), href: ROUTES.PROJECTS }]}
      >
        <dl className={styles.stats}>
          {STATS.map((stat) => (
            <div key={stat.label} className={styles.stat}>
              <dt className={styles.statLabel}>{stat.label}</dt>
              <dd className={styles.statValue}>{stat.value}</dd>
            </div>
          ))}
        </dl>
      </PageHero>

      <section className={`section ${styles.section}`} aria-label={t("listAriaLabel")}>
        <div className="container">
          <ProjectsExplorer projects={PROJECTS} />
        </div>
      </section>

      <CTA />
    </>
  );
}
