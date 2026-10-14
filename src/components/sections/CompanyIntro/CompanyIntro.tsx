import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import { COMPANY_INTRO, YEARS_IN_BUSINESS } from "@/data/site";
import { COMPANY_IMAGE } from "@/data/media";
import { getTranslations } from "next-intl/server";
import { NAMESPACES } from "@/constants/namespaces";
import MediaFrame from "@/ui/MediaFrame";
import Icon from "@/ui/Icon";
import SplitText from "@/ui/SplitText";
import styles from "./CompanyIntro.module.css";

export async function CompanyIntro() {
  const t = await getTranslations(NAMESPACES.HOME);

  return (
    <section
      className={`section ${styles.section}`}
      aria-labelledby="company-heading"
    >
      <div className={`container ${styles.inner}`}>
        <div className={styles.media}>
          <MediaFrame
            src={COMPANY_IMAGE.src}
            alt={COMPANY_IMAGE.alt}
            ratio="3/4"
            sizes="(max-width: 1023px) 100vw, 45vw"
          />
          <div className={styles.mediaBadge}>
            <span className={styles.mediaBadgeValue}>{YEARS_IN_BUSINESS}</span>
            <span className={styles.mediaBadgeLabel}>{t("company.yearsLabel")}</span>
          </div>
        </div>

        <div className={styles.content}>
          <p className={styles.eyebrow}>{COMPANY_INTRO.eyebrow}</p>
          <h2 id="company-heading" className={styles.title}>
            <SplitText text={COMPANY_INTRO.title} />
          </h2>

          {COMPANY_INTRO.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 40)} className={styles.paragraph}>
              {paragraph}
            </p>
          ))}

          <ul className={styles.points}>
            {COMPANY_INTRO.points.map((point) => (
              <li key={point.title} className={styles.point}>
                <span className={styles.pointIcon}>
                  <Icon name="check" />
                </span>
                <span>
                  <strong className={styles.pointTitle}>{point.title}</strong>
                  <span className={styles.pointText}>{point.description}</span>
                  {point.link && (
                    <a
                      href={point.link.href}
                      className={styles.pointLink}
                      target="_blank"
                      rel="noopener"
                    >
                      {point.link.label} &rarr;
                    </a>
                  )}
                </span>
              </li>
            ))}
          </ul>

          <Link href={ROUTES.PROJECTS} className={styles.link}>
            {t("company.cta")} &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
