import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import { COMPANY_INTRO } from "@/data/site";
import { getTranslations } from "next-intl/server";
import { NAMESPACES } from "@/constants/namespaces";
import MediaFrame from "@/ui/MediaFrame";
import Icon from "@/ui/Icon";
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
            ratio="3/4"
            alt="Zespół montażowy Smarteks Rolety podczas pracy przy elewacji budynku"
            label="Zdjęcie zespołu / realizacji"
            sizes="(max-width: 1023px) 100vw, 45vw"
          />
          <div className={styles.mediaBadge}>
            <span className={styles.mediaBadgeValue}>12</span>
            <span className={styles.mediaBadgeLabel}>{t("company.yearsLabel")}</span>
          </div>
        </div>

        <div className={styles.content}>
          <p className={styles.eyebrow}>{COMPANY_INTRO.eyebrow}</p>
          <h2 id="company-heading" className={styles.title}>
            {COMPANY_INTRO.title}
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
