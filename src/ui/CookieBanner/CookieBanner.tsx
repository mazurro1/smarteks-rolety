"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { NAMESPACES } from "@/constants/namespaces";
import { ROUTES } from "@/constants/routes";
import { COOKIE_CONSENT_KEY } from "@/constants/cookies";
import styles from "./CookieBanner.module.css";

/**
 * Baner jest w HTML z serwera, wiec pokazuje sie od razu - bez czekania na JS
 * (pozno doklejony baner potrafi zostac elementem LCP na telefonie).
 * Osobom, ktore juz zdecydowaly, ukrywa go klasa "cookies-ok" ustawiana
 * w <head> layoutu przed pierwszym malowaniem - bez migniecia.
 */
/**
 * Decyzja z localStorage, a gdy go brak - z cookie. localStorage bywa
 * zablokowany (tryb prywatny, ustawienia) i wtedy rzuca wyjatek.
 */
const readConsent = (): boolean => {
  try {
    if (localStorage.getItem(COOKIE_CONSENT_KEY)) return true;
  } catch {
    // Sprawdzamy cookie ponizej.
  }
  return document.cookie.includes(`${COOKIE_CONSENT_KEY}=`);
};

const saveConsent = (value: "accepted" | "rejected") => {
  try {
    localStorage.setItem(COOKIE_CONSENT_KEY, value);
  } catch {
    // Zostaje sam cookie ponizej.
  }
  document.cookie = `${COOKIE_CONSENT_KEY}=${value}; path=/; max-age=${60 * 60 * 24 * 365}`;
  updateGtmConsent(value === "accepted");
};

/** Przekazuje decyzje do GTM (Consent Mode v2) - gtag() definiuje skrypt w <head> layoutu. */
const updateGtmConsent = (granted: boolean) => {
  const gtag = (window as { gtag?: (...args: unknown[]) => void }).gtag;
  if (!gtag) return;
  const state = granted ? "granted" : "denied";
  gtag("consent", "update", {
    ad_storage: state,
    ad_user_data: state,
    ad_personalization: state,
    analytics_storage: state,
  });
};

export function CookieBanner() {
  const t = useTranslations(NAMESPACES.COOKIES);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (readConsent()) setVisible(false);
  }, []);

  const handleAccept = () => {
    saveConsent("accepted");
    setVisible(false);
  };

  const handleReject = () => {
    saveConsent("rejected");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label={t("dialogAriaLabel")}
      className={styles.banner}
    >
      <p className={styles.text}>
        {t("message")}{" "}
        <Link href={ROUTES.COOKIE_POLICY}>{t("learnMore")}</Link>
      </p>
      <div className={styles.actions}>
        <button className={styles.acceptBtn} onClick={handleAccept}>
          {t("accept")}
        </button>
        <button className={styles.rejectBtn} onClick={handleReject}>
          {t("reject")}
        </button>
      </div>
    </div>
  );
}
