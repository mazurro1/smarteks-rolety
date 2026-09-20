import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import styles from "./Breadcrumbs.module.css";

export interface Crumb {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: Crumb[];
  ariaLabel?: string;
  /** Etykieta pierwszego, zawsze obecnego ogniwa prowadzacego na strone glowna. */
  homeLabel?: string;
  className?: string;
}

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL;

/**
 * Sciezka nawigacyjna wraz z danymi strukturalnymi BreadcrumbList —
 * dzieki temu podstrony nie musza powtarzac tego samego schematu JSON-LD.
 */
export default function Breadcrumbs({
  items,
  ariaLabel = "Ścieżka nawigacji",
  homeLabel = "Start",
  className = "",
}: BreadcrumbsProps) {
  const crumbs: Crumb[] = [{ label: homeLabel, href: ROUTES.HOME }, ...items];

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.label,
      ...(crumb.href ? { item: `${BASE_URL ?? ""}${crumb.href}` } : {}),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <nav
        aria-label={ariaLabel}
        className={[styles.breadcrumb, className].filter(Boolean).join(" ")}
      >
        {crumbs.map((crumb, index) => {
          const isLast = index === crumbs.length - 1;
          return (
            <span key={`${crumb.label}-${index}`} className={styles.item}>
              {crumb.href && !isLast ? (
                <Link href={crumb.href} className={styles.link}>
                  {crumb.label}
                </Link>
              ) : (
                <span className={styles.current} aria-current="page">
                  {crumb.label}
                </span>
              )}
              {!isLast && (
                <span className={styles.separator} aria-hidden="true">
                  /
                </span>
              )}
            </span>
          );
        })}
      </nav>
    </>
  );
}
