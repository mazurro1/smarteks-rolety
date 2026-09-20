import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { NAMESPACES } from "@/constants/namespaces";
import { ROUTES } from "@/constants/routes";
import { getLatestProjects } from "@/data/projects";
import SectionHeader from "@/ui/SectionHeader";
import ProjectCard from "./ProjectCard";
import styles from "./ProjectsTeaser.module.css";

export async function ProjectsTeaser() {
  const t = await getTranslations(NAMESPACES.PROJECTS);
  const projects = getLatestProjects(3);

  return (
    <section
      className={`section ${styles.section}`}
      aria-labelledby="projects-teaser-heading"
    >
      <div className="container">
        <div className={styles.head}>
          <SectionHeader
            eyebrow={t("teaser.eyebrow")}
            title={t("teaser.title")}
            lead={t("teaser.lead")}
            align="left"
            id="projects-teaser-heading"
            className={styles.header}
          />
          <Link href={ROUTES.PROJECTS} className={styles.headLink}>
            {t("teaser.cta")} &rarr;
          </Link>
        </div>

        <div className={styles.grid}>
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
