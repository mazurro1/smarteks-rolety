import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { NAMESPACES } from "@/constants/namespaces";
import { CONTACT_INFO } from "@/constants/contact";
import { ROUTES } from "@/constants/routes";
import { HOME_FAQ } from "@/data/site";
import { PageHero } from "@/components/sections/PageHero";
import { ContactForm } from "@/components/sections/ContactForm";
import { FAQ } from "@/components/sections/FAQ";
import MediaFrame from "@/ui/MediaFrame";
import Button from "@/ui/Button";
import styles from "./page.module.css";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL;

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations(NAMESPACES.CONTACT);
  const tSite = await getTranslations(NAMESPACES.SITE);

  return {
    title: t("pageTitle"),
    description: t("pageDescription"),
    alternates: { canonical: `${BASE_URL}${ROUTES.CONTACT}` },
    openGraph: {
      type: "website",
      locale: "pl_PL",
      url: `${BASE_URL}${ROUTES.CONTACT}`,
      siteName: tSite("name"),
      title: t("pageTitle"),
      description: t("pageDescription"),
    },
  };
}

export default async function ContactPage() {
  const t = await getTranslations(NAMESPACES.CONTACT);

  return (
    <>
      <PageHero
        eyebrow={t("heroEyebrow")}
        title={t("heroTitle")}
        lead={t("heroLead")}
        crumbs={[{ label: t("breadcrumb"), href: ROUTES.CONTACT }]}
        chips={[
          t("chips.freeEstimate"),
          t("chips.response"),
          t("chips.area"),
          t("chips.ownTeam"),
        ]}
      />

      <ContactForm />

      <section className={`section ${styles.location}`} aria-labelledby="location-heading">
        <div className={`container ${styles.locationInner}`}>
          <div className={styles.locationText}>
            <p className={styles.locationEyebrow}>{t("location.eyebrow")}</p>
            <h2 id="location-heading" className={styles.locationTitle}>
              {t("location.title")}
            </h2>
            <p className={styles.locationLead}>{t("location.lead")}</p>

            <p className={styles.address}>
              <FontAwesomeIcon icon={faLocationDot} aria-hidden="true" />
              <span>
                {CONTACT_INFO.COMPANY_NAME}
                <br />
                {CONTACT_INFO.ADDRESS_STREET}
                <br />
                {CONTACT_INFO.ADDRESS_CITY}
              </span>
            </p>

            <Button
              as="a"
              href={CONTACT_INFO.GOOGLE_MAPS_URL}
              variant="outline"
              external
            >
              {t("location.mapsCta")}
            </Button>
          </div>

          <MediaFrame
            ratio="16/9"
            alt={`Siedziba ${CONTACT_INFO.COMPANY_NAME} — ${CONTACT_INFO.ADDRESS_FULL}`}
            label={t("location.mapPlaceholder")}
            sizes="(max-width: 1023px) 100vw, 55vw"
            className={styles.locationMedia}
          />
        </div>
      </section>

      <FAQ
        items={HOME_FAQ}
        eyebrow={t("faq.eyebrow")}
        title={t("faq.title")}
        lead={t("faq.lead")}
        idPrefix="contact-faq"
      />
    </>
  );
}
