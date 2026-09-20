import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { NAMESPACES } from "@/constants/namespaces";
import { CONTACT_INFO } from "@/constants/contact";
import { ROUTES } from "@/constants/routes";
import styles from "./page.module.css";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL;

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations(NAMESPACES.PRIVACY_POLICY);
  const tSite = await getTranslations(NAMESPACES.SITE);
  return {
    title: t("pageTitle"),
    description: t("pageDescription"),
    alternates: { canonical: `${BASE_URL}${ROUTES.PRIVACY_POLICY}` },
    robots: { index: false },
    openGraph: {
      type: "website",
      locale: "pl_PL",
      url: `${BASE_URL}${ROUTES.PRIVACY_POLICY}`,
      siteName: tSite("name"),
      title: t("pageTitle"),
      description: t("pageDescription"),
    },
  };
}

export default async function PrivacyPolicyPage() {
  const t = await getTranslations(NAMESPACES.PRIVACY_POLICY);
  const section2Items = t.raw("section2Items") as string[];
  const section4Items = t.raw("section4Items") as string[];
  const section6Items = t.raw("section6Items") as string[];

  return (
    <div className={styles.page}>
      <div className="container">
        <article className={styles.article}>
          <h1>{t("title")}</h1>
          <p className={styles.updated}>{t("lastUpdated")}</p>

          <h2>{t("section1Title")}</h2>
          <p>
            {t.rich("section1Body", {
              companyName: CONTACT_INFO.COMPANY_NAME_FULL,
              address: CONTACT_INFO.ADDRESS_FULL,
              email: CONTACT_INFO.EMAIL,
              phone: CONTACT_INFO.PHONE,
              company: (chunks) => <strong>{chunks}</strong>,
              emailLink: (chunks) => (
                <a href={CONTACT_INFO.EMAIL_HREF}>{chunks}</a>
              ),
              phoneLink: (chunks) => (
                <a href={CONTACT_INFO.PHONE_HREF}>{chunks}</a>
              ),
            })}
          </p>

          <h2>{t("section2Title")}</h2>
          <p>{t("section2Intro")}</p>
          <ul>
            {section2Items.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
          <p>{t("section2Outro")}</p>

          <h2>{t("section3Title")}</h2>
          <p>{t("section3Body")}</p>

          <h2>{t("section4Title")}</h2>
          <p>{t("section4Intro")}</p>
          <ul>
            {section4Items.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>

          <h2>{t("section5Title")}</h2>
          <p>{t("section5Body")}</p>

          <h2>{t("section6Title")}</h2>
          <p>{t("section6Intro")}</p>
          <ul>
            {section6Items.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
          <p>
            {t.rich("section6Outro", {
              email: CONTACT_INFO.EMAIL,
              emailLink: (chunks) => (
                <a href={CONTACT_INFO.EMAIL_HREF}>{chunks}</a>
              ),
            })}
          </p>

          <h2>{t("section7Title")}</h2>
          <p>
            {t.rich("section7Body", {
              cookiesLink: (chunks) => (
                <Link href={ROUTES.COOKIE_POLICY}>{chunks}</Link>
              ),
            })}
          </p>

          <h2>{t("section8Title")}</h2>
          <p>{t("section8Body")}</p>

          <h2>{t("section9Title")}</h2>
          <p>{t("section9Intro")}</p>
          <p>
            {t.rich("section9Email", {
              email: CONTACT_INFO.EMAIL,
              emailLink: (chunks) => (
                <a href={CONTACT_INFO.EMAIL_HREF}>{chunks}</a>
              ),
            })}
          </p>
          <p>
            {t.rich("section9Phone", {
              phone: CONTACT_INFO.PHONE,
              phoneLink: (chunks) => (
                <a href={CONTACT_INFO.PHONE_HREF}>{chunks}</a>
              ),
            })}
          </p>
        </article>
      </div>
    </div>
  );
}
