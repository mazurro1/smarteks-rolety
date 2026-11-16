export const CONTACT_INFO = {
  PHONE: "737 531 193",
  PHONE_HREF: "tel:+48737531193",
  /** Napis na przyciskach z numerem w tresci stron. */
  PHONE_CTA: "Zadzwoń: 737 531 193",
  /** Godziny odbierania telefonu - zgodne z openingHours w src/data/schema.ts. */
  PHONE_HOURS: "pn.–pt. 8–18",
  EMAIL: "kontakt@smarteks.pl",
  EMAIL_HREF: "mailto:kontakt@smarteks.pl",
  ADDRESS_STREET: "ul. Marywilska 17A lok. 57",
  ADDRESS_POSTAL_CODE: "03-228",
  ADDRESS_LOCALITY: "Warszawa",
  ADDRESS_CITY: "03-228 Warszawa",
  ADDRESS_FULL: "ul. Marywilska 17A lok. 57, 03-228 Warszawa",
  /** Nazwa spolki zgodnie z KRS - stopka, polityka prywatnosci, klauzula formularza. */
  COMPANY_NAME: "SMARTEKS sp. z o.o.",
  BRAND_NAME: "Rolety Smarteks",
  SERVICE_AREA: "Warszawa i okolice",
  GOOGLE_MAPS_URL: "https://maps.google.com/?q=Marywilska+17A,+Warszawa",
  /** Profil firmy w Google (opinie). Na stronie tylko link - bez oceny i liczby opinii. */
  GOOGLE_REVIEWS_URL: "https://share.google/bROw3V10osPXCOt4h",
  OFERTEO_URL: "https://www.oferteo.pl/smarteks-sp-z-o-o/firma/5011052",
  /** Glowna strona firmy - pelna oferta Smarteks. */
  MAIN_SITE_URL: "https://smarteks.pl/",
  /** Zakupy na raty (Santander Consumer Bank) - strona w glownym serwisie. */
  INSTALMENTS_URL: "https://smarteks.pl/zakupy-na-raty/",
  /** Druga specjalizacja firmy - osobny serwis o szlabanach. */
  BARRIERS_SITE_URL: "https://szlabany-smarteks.pl",
} as const;

/** Dane rejestrowe spolki - obowiazkowe na stronie wg art. 206 KSH. */
export const COMPANY_REGISTRY = {
  KRS: "0001067069",
  NIP: "5242988348",
  COURT: "Sąd Rejonowy dla m.st. Warszawy w Warszawie, XIV Wydział Gospodarczy KRS",
  SHARE_CAPITAL: "5 000 zł",
} as const;

/** Pelne dane spolki w jednej linii - stopka i strona Kontakt. */
export const COMPANY_LEGAL_LINE = [
  `${CONTACT_INFO.COMPANY_NAME}, ${CONTACT_INFO.ADDRESS_FULL}`,
  COMPANY_REGISTRY.COURT,
  `KRS ${COMPANY_REGISTRY.KRS}`,
  `NIP ${COMPANY_REGISTRY.NIP}`,
  `kapitał zakładowy ${COMPANY_REGISTRY.SHARE_CAPITAL}`,
].join(" · ");

/** Miejscowosci obslugiwane w promieniu dojazdu - uzywane w stopce i na kontakcie. */
export const SERVICE_CITIES = [
  "Warszawa",
  "Piaseczno",
  "Pruszków",
  "Legionowo",
  "Marki",
  "Józefów",
  "Konstancin-Jeziorna",
  "Otwock",
  "Nadarzyn",
  "Łomianki",
  "Ząbki",
  "Raszyn",
] as const;

export const CONTACT_TOPICS = [
  { value: "rc2" },
  { value: "rc3" },
  { value: "adaptive" },
  { value: "recessed" },
  { value: "rollerGates" },
  { value: "service" },
  { value: "estimate" },
  { value: "other" },
] as const;

export type ContactTopicValue = (typeof CONTACT_TOPICS)[number]["value"];
