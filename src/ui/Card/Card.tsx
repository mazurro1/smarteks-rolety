import Link from "next/link";
import type { ReactNode } from "react";
import styles from "./Card.module.css";

interface CardProps {
  badge?: string;
  title: string;
  description: string;
  linkLabel?: string;
  linkHref?: string;
  hoverable?: boolean;
  className?: string;
  children?: ReactNode;
}

export default function Card({
  badge,
  title,
  description,
  linkLabel,
  linkHref,
  hoverable = true,
  className = "",
  children,
}: CardProps) {
  return (
    <article
      className={`${styles.card} ${hoverable ? styles.hoverable : ""} ${className}`}
    >
      {badge && <span className={styles.badge}>{badge}</span>}
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
      {children}
      {linkLabel && linkHref && (
        <Link href={linkHref} className={styles.link}>
          {linkLabel} &rarr;
        </Link>
      )}
    </article>
  );
}
