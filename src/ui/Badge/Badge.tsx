import type { ReactNode } from "react";
import styles from "./Badge.module.css";

interface BadgeProps {
  children: ReactNode;
  variant?: "brand" | "outline" | "muted";
  className?: string;
}

export default function Badge({
  children,
  variant = "brand",
  className = "",
}: BadgeProps) {
  return (
    <span
      className={[styles.badge, styles[variant], className]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </span>
  );
}
