"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faFileLines,
  faEnvelope,
  faClock,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import { NAMESPACES } from "@/constants/namespaces";
import { CONTACT_INFO } from "@/constants/contact";
import { ROUTES, offerPath } from "@/constants/routes";
import { OFFER_PRODUCTS } from "@/data/offer";
import Button from "@/ui/Button";
import Icon from "@/ui/Icon";
import styles from "./Header.module.css";

export function Header() {
  const t = useTranslations(NAMESPACES.NAV);
  const tCommon = useTranslations(NAMESPACES.COMMON);
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [offerOpen, setOfferOpen] = useState(false);
  const [mobileOfferOpen, setMobileOfferOpen] = useState(false);
  const offerRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isOfferActive = pathname.startsWith(ROUTES.OFFER);

  const navLinks = [
    { href: ROUTES.HOME, label: t("home") },
    { href: ROUTES.PROJECTS, label: t("projects") },
    { href: ROUTES.BLOG, label: t("blog") },
    { href: ROUTES.CONTACT, label: t("contact") },
  ];

  const isActive = (href: string) =>
    href === ROUTES.HOME ? pathname === href : pathname.startsWith(href);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Zamkniecie menu po zmianie trasy.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMenuOpen(false);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOfferOpen(false);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMobileOfferOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Escape zamyka rozwiniete menu oferty i menu mobilne.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOfferOpen(false);
      setMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  // Klikniecie poza panelem oferty zamyka go.
  useEffect(() => {
    if (!offerOpen) return;
    const onPointerDown = (event: MouseEvent) => {
      if (offerRef.current && !offerRef.current.contains(event.target as Node)) {
        setOfferOpen(false);
      }
    };
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [offerOpen]);

  useEffect(() => {
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

  const cancelClose = useCallback(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const scheduleClose = useCallback(() => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOfferOpen(false), 140);
  }, [cancelClose]);

  const logo = (
    <Link href={ROUTES.HOME} className={styles.logo} aria-label={t("logoAriaLabel")}>
      <span className={styles.logoMark} aria-hidden="true">
        <span className={styles.logoSlat} />
        <span className={styles.logoSlat} />
        <span className={styles.logoSlat} />
      </span>
      <span className={styles.logoText}>
        Smarteks<span className={styles.logoAccent}>Rolety</span>
      </span>
    </Link>
  );

  return (
    <>
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
        <div className={styles.topbar}>
          <div className={`container ${styles.topbarInner}`}>
            <p className={styles.topbarTagline}>{t("topbarTagline")}</p>
            <div className={styles.topbarMeta}>
              <span className={styles.topbarItem}>
                <FontAwesomeIcon icon={faClock} aria-hidden="true" />
                {tCommon("contact.workingHoursShort")}
              </span>
              <a className={styles.topbarItem} href={CONTACT_INFO.EMAIL_HREF}>
                <FontAwesomeIcon icon={faEnvelope} aria-hidden="true" />
                {CONTACT_INFO.EMAIL}
              </a>
              <a
                className={`${styles.topbarItem} ${styles.topbarPhone}`}
                href={CONTACT_INFO.PHONE_HREF}
              >
                <FontAwesomeIcon icon={faPhone} aria-hidden="true" />
                {CONTACT_INFO.PHONE}
              </a>
            </div>
          </div>
        </div>

        <div className={`container ${styles.inner}`}>
          {logo}

          <nav className={styles.nav} aria-label={t("mainNavigationAriaLabel")}>
            <Link
              href={ROUTES.HOME}
              className={`${styles.navLink} ${isActive(ROUTES.HOME) ? styles.active : ""}`}
            >
              {t("home")}
            </Link>

            <div
              className={styles.dropdown}
              ref={offerRef}
              onMouseEnter={() => {
                cancelClose();
                setOfferOpen(true);
              }}
              onMouseLeave={scheduleClose}
            >
              <button
                type="button"
                className={`${styles.navLink} ${styles.dropdownTrigger} ${isOfferActive ? styles.active : ""}`}
                aria-expanded={offerOpen}
                aria-haspopup="true"
                aria-controls="offer-menu"
                onClick={() => setOfferOpen((open) => !open)}
              >
                {t("offer")}
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className={`${styles.chevron} ${offerOpen ? styles.chevronOpen : ""}`}
                  aria-hidden="true"
                />
              </button>

              <div
                id="offer-menu"
                className={`${styles.megaMenu} ${offerOpen ? styles.megaOpen : ""}`}
                hidden={!offerOpen}
              >
                <div className={styles.megaGrid}>
                  {OFFER_PRODUCTS.map((product) => (
                    <Link
                      key={product.slug}
                      href={offerPath(product.slug)}
                      className={`${styles.megaItem} ${pathname === offerPath(product.slug) ? styles.megaItemActive : ""}`}
                    >
                      <span className={styles.megaIcon}>
                        <Icon name={product.icon} />
                      </span>
                      <span className={styles.megaBody}>
                        <span className={styles.megaTitle}>
                          {product.navLabel}
                          {product.badge && (
                            <span className={styles.megaBadge}>{product.badge}</span>
                          )}
                        </span>
                        <span className={styles.megaDescription}>
                          {product.tagline}
                        </span>
                      </span>
                    </Link>
                  ))}
                </div>
                <div className={styles.megaFooter}>
                  <span className={styles.megaNote}>{t("offerMenuNote")}</span>
                  <Link href={ROUTES.OFFER} className={styles.megaLink}>
                    {t("allOffer")} &rarr;
                  </Link>
                </div>
              </div>
            </div>

            {navLinks.slice(1).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`${styles.navLink} ${isActive(link.href) ? styles.active : ""}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className={styles.actions}>
            <Button as="a" href={CONTACT_INFO.PHONE_HREF} variant="outline" size="sm">
              <FontAwesomeIcon icon={faPhone} />
              {CONTACT_INFO.PHONE}
            </Button>
            <Button as="link" href={ROUTES.CONTACT} variant="primary" size="sm">
              <FontAwesomeIcon icon={faFileLines} />
              {t("freeEstimate")}
            </Button>
          </div>

          <button
            className={`${styles.hamburger} ${menuOpen ? styles.open : ""}`}
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? t("closeMenu") : t("openMenu")}
          >
            <span className={styles.bar} />
            <span className={styles.bar} />
            <span className={styles.bar} />
          </button>
        </div>
      </header>

      {menuOpen && (
        <nav
          id="mobile-menu"
          className={`${styles.mobileMenu} ${scrolled ? styles.mobileMenuScrolled : ""}`}
          aria-label={t("mobileMenuAriaLabel")}
        >
          <Link
            href={ROUTES.HOME}
            className={`${styles.mobileNavLink} ${isActive(ROUTES.HOME) ? styles.active : ""}`}
          >
            {t("home")}
          </Link>

          <div className={styles.mobileGroup}>
            <button
              type="button"
              className={`${styles.mobileNavLink} ${styles.mobileGroupTrigger} ${isOfferActive ? styles.active : ""}`}
              aria-expanded={mobileOfferOpen}
              aria-controls="mobile-offer-menu"
              onClick={() => setMobileOfferOpen((open) => !open)}
            >
              {t("offer")}
              <FontAwesomeIcon
                icon={faChevronDown}
                className={`${styles.chevron} ${mobileOfferOpen ? styles.chevronOpen : ""}`}
                aria-hidden="true"
              />
            </button>
            <div id="mobile-offer-menu" hidden={!mobileOfferOpen}>
              <div className={styles.mobileSubmenu}>
                {OFFER_PRODUCTS.map((product) => (
                  <Link
                    key={product.slug}
                    href={offerPath(product.slug)}
                    className={styles.mobileSubLink}
                  >
                    <Icon name={product.icon} />
                    {product.navLabel}
                  </Link>
                ))}
                <Link href={ROUTES.OFFER} className={styles.mobileSubLinkAll}>
                  {t("allOffer")} &rarr;
                </Link>
              </div>
            </div>
          </div>

          {navLinks.slice(1).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.mobileNavLink} ${isActive(link.href) ? styles.active : ""}`}
            >
              {link.label}
            </Link>
          ))}

          <div className={styles.mobileDivider} />

          <div className={styles.mobileActions}>
            <Button as="link" href={ROUTES.CONTACT} variant="primary" fullWidth>
              <FontAwesomeIcon icon={faFileLines} />
              {t("freeEstimate")}
            </Button>
            <Button as="a" href={CONTACT_INFO.PHONE_HREF} variant="outline" fullWidth>
              <FontAwesomeIcon icon={faPhone} />
              {CONTACT_INFO.PHONE}
            </Button>
          </div>
        </nav>
      )}
    </>
  );
}
