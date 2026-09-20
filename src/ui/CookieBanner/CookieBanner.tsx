"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { NAMESPACES } from "@/constants/namespaces";
import { ROUTES } from "@/constants/routes";
import styles from "./CookieBanner.module.css";

const COOKIE_CONSENT_KEY = "smarteks_cookies_consent";

export function CookieBanner() {
  const t = useTranslations(NAMESPACES.COOKIES);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (!consent) setVisible(true);
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "accepted");
    document.cookie = `${COOKIE_CONSENT_KEY}=accepted; path=/; max-age=${60 * 60 * 24 * 365}`;
    setVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "rejected");
    document.cookie = `${COOKIE_CONSENT_KEY}=rejected; path=/; max-age=${60 * 60 * 24 * 365}`;
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
