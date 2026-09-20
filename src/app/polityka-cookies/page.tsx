import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { NAMESPACES } from "@/constants/namespaces";
import { CONTACT_INFO } from "@/constants/contact";
import { ROUTES } from "@/constants/routes";
import styles from "../polityka-prywatnosci/page.module.css";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL;

const COOKIE_CONSENT_KEY = "smarteks_cookies_consent";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations(NAMESPACES.COOKIE_POLICY);
  const tSite = await getTranslations(NAMESPACES.SITE);
  return {
    title: t("pageTitle"),
    description: t("pageDescription"),
    alternates: { canonical: `${BASE_URL}${ROUTES.COOKIE_POLICY}` },
    robots: { index: false },
    openGraph: {
      type: "website",
      locale: "pl_PL",
      url: `${BASE_URL}${ROUTES.COOKIE_POLICY}`,
      siteName: tSite("name"),
      title: t("pageTitle"),
      description: t("pageDescription"),
    },
  };
}

export default async function CookiePolicyPage() {
  const t = await getTranslations(NAMESPACES.COOKIE_POLICY);

  const browserLinks = [
    {
      href: "https://support.google.com/chrome/answer/95647",
      label: t("section3BrowserChrome"),
    },
    {
      href: "https://support.mozilla.org/pl/kb/usuwanie-ciasteczek",
      label: t("section3BrowserFirefox"),
    },
    {
      href: "https://support.microsoft.com/pl-pl/microsoft-edge/usuwanie-plik%C3%B3w-cookie-w-przegl%C4%85darce-microsoft-edge",
      label: t("section3BrowserEdge"),
    },
    {
      href: "https://support.apple.com/pl-pl/guide/safari/sfri11471/mac",
      label: t("section3BrowserSafari"),
    },
  ];

  return (
    <div className={styles.page}>
      <div className="container">
        <article className={styles.article}>
          <h1>{t("title")}</h1>
          <p className={styles.updated}>{t("lastUpdated")}</p>

          <h2>{t("section1Title")}</h2>
          <p>{t("section1Body")}</p>

          <h2>{t("section2Title")}</h2>
          <h3 className={styles.subsectionTitle}>
            {t("section2NecessaryTitle")}
          </h3>
          <p>{t("section2NecessaryBody")}</p>
          <h3 className={styles.subsectionTitle}>
            {t("section2PreferencesTitle")}
          </h3>
          <p>
            {t.rich("section2PreferencesBody", {
              cookieKey: COOKIE_CONSENT_KEY,
              code: (chunks) => <code>{chunks}</code>,
            })}
          </p>

          <h2>{t("section3Title")}</h2>
          <p>{t("section3Intro")}</p>
          <ul>
            {browserLinks.map((browser) => (
              <li key={browser.href}>
                <a
                  href={browser.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {browser.label}
                </a>
              </li>
            ))}
          </ul>
          <p>{t("section3Outro")}</p>

          <h2>{t("section4Title")}</h2>
          <p>
            {t.rich("section4Body", {
              cookieKey: COOKIE_CONSENT_KEY,
              code: (chunks) => <code>{chunks}</code>,
            })}
          </p>

          <h2>{t("section5Title")}</h2>
          <p>{t("section5Intro")}</p>
          <p>
            {t.rich("section5Email", {
              email: CONTACT_INFO.EMAIL,
              emailLink: (chunks) => (
                <a href={CONTACT_INFO.EMAIL_HREF}>{chunks}</a>
              ),
            })}
          </p>
          <p>
            {t.rich("section5Phone", {
              phone: CONTACT_INFO.PHONE,
              phoneLink: (chunks) => (
                <a href={CONTACT_INFO.PHONE_HREF}>{chunks}</a>
              ),
            })}
          </p>
          <p>
            {t.rich("section5Privacy", {
              privacyLink: (chunks) => (
                <Link href={ROUTES.PRIVACY_POLICY}>{chunks}</Link>
              ),
            })}
          </p>
        </article>
      </div>
    </div>
  );
}
