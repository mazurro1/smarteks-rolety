import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { NAMESPACES } from "@/constants/namespaces";
import { CONTACT_INFO } from "@/constants/contact";
import { ROUTES, SECTION_ANCHORS } from "@/constants/routes";
import { HOME_FAQ } from "@/data/site";
import type { FaqItem, GuideLink } from "@/types";
import SectionHeader from "@/ui/SectionHeader";
import Accordion from "@/ui/Accordion";
import styles from "./FAQ.module.css";

interface FAQProps {
  items?: FaqItem[];
  eyebrow?: string;
  title?: string;
  lead?: string;
  idPrefix?: string;
  columns?: 1 | 2;
  /** Zdania z linkami do poradnikow, pod pytaniami. */
  guides?: GuideLink[];
}

/**
 * Sekcja pytan i odpowiedzi. Bez danych strukturalnych FAQPage - Google
 * pokazuje takie wyniki tylko stronom rzadowym i medycznym.
 */
export async function FAQ({
  items,
  eyebrow,
  title,
  lead,
  idPrefix = "faq",
  columns = 2,
  guides,
}: FAQProps) {
  const t = await getTranslations(NAMESPACES.FAQ);
  const faqItems = items ?? HOME_FAQ;

  return (
    <section
      className={`section ${styles.section}`}
      id={SECTION_ANCHORS.FAQ}
      aria-labelledby={`${idPrefix}-heading`}
    >
      <div className="container">
        <SectionHeader
          eyebrow={eyebrow ?? t("eyebrow")}
          title={title ?? t("title")}
          lead={lead ?? t("lead")}
          id={`${idPrefix}-heading`}
        />

        <Accordion items={faqItems} idPrefix={idPrefix} columns={columns} />

        {guides && guides.length > 0 && (
          <p className={styles.guides}>
            {guides.map((guide) => (
              <span key={guide.href}>
                {guide.text}{" "}
                <Link href={guide.href} className={styles.noteLink}>
                  {guide.linkLabel}
                </Link>
                .{" "}
              </span>
            ))}
          </p>
        )}

        <p className={styles.note}>
          {t("noteText")}{" "}
          <a href={CONTACT_INFO.PHONE_HREF} className={styles.noteLink}>
            {CONTACT_INFO.PHONE_CTA}
          </a>{" "}
          {t("noteOr")}{" "}
          <Link href={ROUTES.CONTACT} className={styles.noteLink}>
            {t("noteLink")}
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
