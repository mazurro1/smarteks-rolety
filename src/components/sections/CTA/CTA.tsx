import { getTranslations } from "next-intl/server";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faFileLines } from "@fortawesome/free-solid-svg-icons";
import { NAMESPACES } from "@/constants/namespaces";
import { CONTACT_INFO } from "@/constants/contact";
import { ROUTES } from "@/constants/routes";
import Button from "@/ui/Button";
import styles from "./CTA.module.css";

interface CTAProps {
  title?: string;
  text?: string;
}

export async function CTA({ title, text }: CTAProps) {
  const t = await getTranslations(NAMESPACES.CTA);

  return (
    <section className={styles.section} aria-labelledby="cta-heading">
      <div className={styles.pattern} aria-hidden="true" />
      <div className={`container ${styles.inner}`}>
        <div className={styles.content}>
          <p className={styles.eyebrow}>{t("eyebrow")}</p>
          <h2 id="cta-heading" className={styles.title}>
            {title ?? t("title")}
          </h2>
          <p className={styles.text}>{text ?? t("text")}</p>
        </div>

        <div className={styles.actions}>
          <Button as="link" href={ROUTES.CONTACT} variant="light" size="lg">
            <FontAwesomeIcon icon={faFileLines} />
            {t("ctaPrimary")}
          </Button>
          <Button as="a" href={CONTACT_INFO.PHONE_HREF} variant="outline" size="lg">
            <FontAwesomeIcon icon={faPhone} />
            {CONTACT_INFO.PHONE}
          </Button>
        </div>
      </div>
    </section>
  );
}
