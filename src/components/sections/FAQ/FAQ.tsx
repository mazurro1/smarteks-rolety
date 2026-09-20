import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { NAMESPACES } from "@/constants/namespaces";
import { ROUTES, SECTION_ANCHORS } from "@/constants/routes";
import { HOME_FAQ } from "@/data/site";
import type { FaqItem } from "@/types";
import SectionHeader from "@/ui/SectionHeader";
import Accordion from "@/ui/Accordion";
import styles from "./FAQ.module.css";

interface FAQProps {
  items?: FaqItem[];
  eyebrow?: string;
  title?: string;
  lead?: string;
  idPrefix?: string;
  /** Dane strukturalne FAQPage — wylaczamy, gdy na stronie jest juz inny blok FAQ. */
  withSchema?: boolean;
  columns?: 1 | 2;
}

export async function FAQ({
  items,
  eyebrow,
  title,
  lead,
  idPrefix = "faq",
  withSchema = true,
  columns = 2,
}: FAQProps) {
  const t = await getTranslations(NAMESPACES.FAQ);
  const faqItems = items ?? HOME_FAQ;

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <section
      className={`section ${styles.section}`}
      id={SECTION_ANCHORS.FAQ}
      aria-labelledby={`${idPrefix}-heading`}
    >
      {withSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}
      <div className="container">
        <SectionHeader
          eyebrow={eyebrow ?? t("eyebrow")}
          title={title ?? t("title")}
          lead={lead ?? t("lead")}
          id={`${idPrefix}-heading`}
        />

        <Accordion items={faqItems} idPrefix={idPrefix} columns={columns} />

        <p className={styles.note}>
          {t("noteText")}{" "}
          <Link href={ROUTES.CONTACT} className={styles.noteLink}>
            {t("noteLink")}
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
