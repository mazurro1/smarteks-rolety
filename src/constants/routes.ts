/**
 * Bazowy adres strony (bez koncowego "/") - metadataBase, canonicale, sitemap,
 * RSS, Open Graph i JSON-LD. Stala w kodzie, nie zmienna srodowiskowa: brak
 * zmiennej na hostingu dawal adresy "undefined/..." i "localhost:3000".
 */
export const SITE_URL = "https://rolety-smarteks.pl";

export const ROUTES = {
  HOME: "/",
  OFFER: "/oferta",
  PROJECTS: "/realizacje",
  BLOG: "/blog",
  CONTACT: "/kontakt",
  PRIVACY_POLICY: "/polityka-prywatnosci",
  COOKIE_POLICY: "/polityka-cookies",
} as const;

/** Slugi podstron ofertowych - jedno zrodlo prawdy dla nawigacji, sitemapy i danych. */
export const OFFER_SLUGS = {
  RC2: "rolety-antywlamaniowe-rc2",
  RC3: "rolety-antywlamaniowe-rc3",
  ADAPTIVE: "rolety-adaptacyjne",
  RECESSED: "rolety-podtynkowe",
  ROLLER_GATES: "bramy-rolowane",
} as const;

export type OfferSlug = (typeof OFFER_SLUGS)[keyof typeof OFFER_SLUGS];

export const offerPath = (slug: string) => `${ROUTES.OFFER}/${slug}`;
export const projectPath = (slug: string) => `${ROUTES.PROJECTS}/${slug}`;
export const blogPath = (slug: string) => `${ROUTES.BLOG}/${slug}`;

/** Kotwice powtarzalnych sekcji na podstronach ofertowych. */
export const SECTION_ANCHORS = {
  INSTALLATION: "montaz",
  SERVICE: "serwis",
  SPECS: "parametry",
  FAQ: "faq",
  PROJECTS: "realizacje",
} as const;
