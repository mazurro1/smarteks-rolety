import { getTranslations } from "next-intl/server";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faFileLines } from "@fortawesome/free-solid-svg-icons";
import { NAMESPACES } from "@/constants/namespaces";
import { CONTACT_INFO } from "@/constants/contact";
import { ROUTES } from "@/constants/routes";
import { STATS, TRUST_POINTS } from "@/data/site";
import Button from "@/ui/Button";
import styles from "./Hero.module.css";

export async function Hero() {
  const t = await getTranslations(NAMESPACES.HERO);

  return (
    <section className={styles.hero} aria-labelledby="hero-heading">
      <div className={styles.glow} aria-hidden="true" />
      <div className={`container ${styles.inner}`}>
        <div className={styles.content}>
          <p className={styles.badge}>
            <span className={styles.badgeDot} aria-hidden="true" />
            {t("badge")}
          </p>

          <h1 id="hero-heading" className={styles.heading}>
            {t("headingLine1")}
            <span className={styles.headingAccent}>{t("headingAccent")}</span>
          </h1>

          <p className={styles.lead}>{t("lead")}</p>

          <div className={styles.actions}>
            <Button as="link" href={ROUTES.CONTACT} variant="primary" size="lg">
              <FontAwesomeIcon icon={faFileLines} />
              {t("ctaPrimary")}
            </Button>
            <Button
              as="a"
              href={CONTACT_INFO.PHONE_HREF}
              variant="outline"
              size="lg"
            >
              <FontAwesomeIcon icon={faPhone} />
              {CONTACT_INFO.PHONE}
            </Button>
          </div>

          <ul className={styles.trust}>
            {TRUST_POINTS.map((point) => (
              <li key={point} className={styles.trustItem}>
                {point}
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.visual} aria-hidden="true">
          <div className={styles.frame}>
            <div className={styles.glass} />
            <div className={styles.curtain}>
              <div className={styles.slats}>
                {Array.from({ length: 18 }, (_, index) => (
                  <span
                    key={index}
                    className={styles.slat}
                    style={{ animationDelay: `${index * 45}ms` }}
                  />
                ))}
              </div>
              <div className={styles.rail} />
            </div>
          </div>
          <div className={styles.floatCard}>
            <p className={styles.floatCardLabel}>{t("cardLabel")}</p>
            <p className={styles.floatCardValue}>{t("cardValue")}</p>
            <p className={styles.floatCardText}>{t("cardText")}</p>
          </div>
        </div>
      </div>

      <div className={styles.statsBand}>
        <div className={`container ${styles.statsInner}`}>
          {STATS.map((stat) => (
            <div key={stat.label} className={styles.stat}>
              <span className={styles.statValue}>{stat.value}</span>
              <span className={styles.statLabel}>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
