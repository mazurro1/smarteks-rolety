"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { NAMESPACES } from "@/constants/namespaces";
import { PROJECT_CATEGORY_LABELS } from "@/data/projects";
import type { Project, ProjectCategory } from "@/types";
import ProjectCard from "./ProjectCard";
import styles from "./ProjectsExplorer.module.css";

interface ProjectsExplorerProps {
  projects: Project[];
}

type Filter = ProjectCategory | "all";

export default function ProjectsExplorer({ projects }: ProjectsExplorerProps) {
  const t = useTranslations(NAMESPACES.PROJECTS);
  const [filter, setFilter] = useState<Filter>("all");

  // Pokazujemy tylko te kategorie, ktore faktycznie maja realizacje.
  const categories = useMemo(() => {
    const used = new Set<ProjectCategory>();
    for (const project of projects) {
      used.add(project.category);
      project.extraCategories?.forEach((extra) => used.add(extra));
    }
    return (Object.keys(PROJECT_CATEGORY_LABELS) as ProjectCategory[]).filter(
      (category) => used.has(category),
    );
  }, [projects]);

  const filtered = useMemo(() => {
    if (filter === "all") return projects;
    return projects.filter(
      (project) =>
        project.category === filter || project.extraCategories?.includes(filter),
    );
  }, [projects, filter]);

  return (
    <div>
      <div className={styles.filters} role="group" aria-label={t("filtersAriaLabel")}>
        <button
          type="button"
          className={`${styles.filter} ${filter === "all" ? styles.filterActive : ""}`}
          onClick={() => setFilter("all")}
          aria-pressed={filter === "all"}
        >
          {t("filters.all")}
          <span className={styles.count}>{projects.length}</span>
        </button>

        {categories.map((category) => {
          const count = projects.filter(
            (project) =>
              project.category === category ||
              project.extraCategories?.includes(category),
          ).length;

          return (
            <button
              key={category}
              type="button"
              className={`${styles.filter} ${filter === category ? styles.filterActive : ""}`}
              onClick={() => setFilter(category)}
              aria-pressed={filter === category}
            >
              {PROJECT_CATEGORY_LABELS[category]}
              <span className={styles.count}>{count}</span>
            </button>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <p className={styles.empty}>{t("empty")}</p>
      ) : (
        <div className={styles.grid}>
          {filtered.map((project, index) => (
            <ProjectCard
              key={project.slug}
              project={project}
              priority={index < 3}
            />
          ))}
        </div>
      )}
    </div>
  );
}
