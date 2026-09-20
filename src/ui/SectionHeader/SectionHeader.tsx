import styles from "./SectionHeader.module.css";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  lead?: string;
  align?: "center" | "left";
  as?: "h1" | "h2" | "h3";
  id?: string;
  className?: string;
}

export default function SectionHeader({
  eyebrow,
  title,
  lead,
  align = "center",
  as: Tag = "h2",
  id,
  className = "",
}: SectionHeaderProps) {
  return (
    <div
      className={[styles.wrapper, align === "left" ? styles.left : "", className]
        .filter(Boolean)
        .join(" ")}
    >
      {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
      <Tag className={styles.title} id={id}>
        {title}
      </Tag>
      {lead && <p className={styles.lead}>{lead}</p>}
    </div>
  );
}
