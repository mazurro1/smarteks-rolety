"use client";

import { useTranslations } from "next-intl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faFileLines } from "@fortawesome/free-solid-svg-icons";
import { NAMESPACES } from "@/constants/namespaces";
import { CONTACT_INFO } from "@/constants/contact";
import { ROUTES } from "@/constants/routes";
import Button from "@/ui/Button";
import styles from "./MobileBottomBar.module.css";

export function MobileBottomBar() {
  const t = useTranslations(NAMESPACES.NAV);

  return (
    <div className={styles.bar} role="navigation" aria-label={t("mobileBottomBarAriaLabel")}>
      <Button as="link" href={ROUTES.CONTACT} variant="primary" fullWidth>
        <FontAwesomeIcon icon={faFileLines} />
        {t("freeEstimate")}
      </Button>
      <Button as="a" href={CONTACT_INFO.PHONE_HREF} variant="outline" fullWidth>
        <FontAwesomeIcon icon={faPhone} />
        {t("phone")}
      </Button>
    </div>
  );
}
