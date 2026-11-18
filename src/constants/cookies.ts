/** Klucz zapisu decyzji o cookies (localStorage + cookie) - baner, layout, polityka cookies. */
export const COOKIE_CONSENT_KEY = "smarteks_cookies_consent";

/** Identyfikator kontenera Google Tag Manager. */
export const GTM_ID = "GTM-5CKDGK77";

/**
 * Klasa na <html>, ktora ukrywa baner przed hydracja, gdy decyzja jest juz zapisana.
 * Uzyta doslownie w src/ui/CookieBanner/CookieBanner.module.css - zmieniac w obu miejscach.
 */
export const COOKIES_DECIDED_CLASS = "cookies-ok";
