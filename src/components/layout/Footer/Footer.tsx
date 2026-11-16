import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { FontAwesomeIcon } from "@/ui/FaIcon";
import {
  faPhone,
  faEnvelope,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { NAMESPACES } from "@/constants/namespaces";
import {
  CONTACT_INFO,
  COMPANY_LEGAL_LINE,
  SERVICE_CITIES,
} from "@/constants/contact";
import { ROUTES, offerPath } from "@/constants/routes";
import { OFFER_PRODUCTS } from "@/data/offer";
import Button from "@/ui/Button";
import styles from "./Footer.module.css";

export async function Footer() {
  const tFooter = await getTranslations(NAMESPACES.FOOTER);
  const tCommon = await getTranslations(NAMESPACES.COMMON);

  const companyLinks = [
    { href: ROUTES.PROJECTS, label: tFooter("links.projects") },
    { href: ROUTES.BLOG, label: tFooter("links.blog") },
    { href: ROUTES.CONTACT, label: tFooter("links.contact") },
    { href: ROUTES.PRIVACY_POLICY, label: tFooter("links.privacyPolicy") },
    { href: ROUTES.COOKIE_POLICY, label: tFooter("links.cookiePolicy") },
  ];

  /** Serwisy firmy Smarteks i profil w Google - otwierane w nowej karcie. */
  const externalLinks = [
    { href: CONTACT_INFO.BARRIERS_SITE_URL, label: tFooter("links.barriersSite") },
    { href: CONTACT_INFO.MAIN_SITE_URL, label: tFooter("links.mainSite") },
    { href: CONTACT_INFO.GOOGLE_REVIEWS_URL, label: tFooter("links.googleReviews") },
  ];

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.cta}>
          <div>
            <p className={styles.ctaTitle}>{tFooter("ctaTitle")}</p>
            <p className={styles.ctaText}>{tFooter("ctaText")}</p>
          </div>
          <div className={styles.ctaActions}>
            <Button as="link" href={ROUTES.CONTACT} variant="primary">
              {tCommon("actions.freeEstimate")}
            </Button>
            <Button as="a" href={CONTACT_INFO.PHONE_HREF} variant="outline">
              <FontAwesomeIcon icon={faPhone} />
              {CONTACT_INFO.PHONE_CTA}
            </Button>
          </div>
        </div>

        <div className={styles.grid}>
          <div className={styles.brand}>
            <Link
              href={ROUTES.HOME}
              className={styles.logo}
              aria-label={tFooter("logoAriaLabel")}
            >
              <span className={styles.logoText}>
                Smarteks <span className={styles.logoAccent}>Rolety</span>
              </span>
            </Link>
            <p className={styles.brandDesc}>{tFooter("tagline")}</p>
            <p className={styles.serviceArea}>
              <FontAwesomeIcon icon={faLocationDot} aria-hidden="true" />
              {CONTACT_INFO.SERVICE_AREA}
            </p>
          </div>

          <nav aria-label={tFooter("offer")}>
            <p className={styles.colTitle}>{tFooter("offer")}</p>
            <ul className={styles.colLinks}>
              {OFFER_PRODUCTS.map((product) => (
                <li key={product.slug}>
                  <Link href={offerPath(product.slug)} className={styles.colLink}>
                    {product.navLabel}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label={tFooter("company")}>
            <p className={styles.colTitle}>{tFooter("company")}</p>
            <ul className={styles.colLinks}>
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={styles.colLink}>
                    {link.label}
                  </Link>
                </li>
              ))}
              {externalLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={styles.colLink}
                    target="_blank"
                    rel="noopener"
                  >
                    {link.label} &#8599;
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className={styles.colTitle}>{tFooter("contact")}</p>
            <ul className={styles.contactList}>
              <li className={styles.contactItem}>
                <FontAwesomeIcon icon={faPhone} aria-hidden="true" />
                <span>
                  <a href={CONTACT_INFO.PHONE_HREF}>{CONTACT_INFO.PHONE}</a>
                  <span className={styles.contactHours}>
                    {CONTACT_INFO.PHONE_HOURS}
                  </span>
                </span>
              </li>
              <li className={styles.contactItem}>
                <FontAwesomeIcon icon={faEnvelope} aria-hidden="true" />
                <a href={CONTACT_INFO.EMAIL_HREF}>{CONTACT_INFO.EMAIL}</a>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.cities}>
          <span className={styles.citiesLabel}>{tFooter("citiesLabel")}</span>
          <span className={styles.citiesList}>
            {SERVICE_CITIES.join(" · ")}
          </span>
        </div>

        <div className={styles.bottom}>
          <p>{tFooter("copyright", { year: new Date().getFullYear() })}</p>
          {/* Dane spolki wymagane na stronie (art. 206 KSH). */}
          <p className={styles.company}>{COMPANY_LEGAL_LINE}</p>
        </div>
      </div>
    </footer>
  );
}
