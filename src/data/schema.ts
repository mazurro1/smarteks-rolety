import { CONTACT_INFO, COMPANY_REGISTRY, SERVICE_CITIES } from "@/constants/contact";
import { SITE_URL, OFFER_SLUGS, offerPath, type OfferSlug } from "@/constants/routes";
import { SOMFY_IMAGES } from "@/data/media";
import type { OfferProduct } from "@/types";

/**
 * Dane strukturalne (JSON-LD) wspolne dla calej strony.
 * Firma jest w layoucie, a uslugi na podstronach oferty odwoluja sie do niej przez @id.
 * Okruszki (BreadcrumbList) generuje komponent Breadcrumbs.
 * FAQPage nie dodajemy - Google pokazuje takie wyniki tylko stronom rzadowym i medycznym.
 */
export const BUSINESS_ID = `${SITE_URL}/#firma`;

const AREA_SERVED = SERVICE_CITIES.map((name) => ({ "@type": "City", name }));

/** Spolka matka - Smarteks (smarteks.pl). */
export const PARENT_ORGANIZATION = {
  "@type": "Organization",
  "@id": "https://smarteks.pl/#organizacja",
  name: "Smarteks",
  legalName: CONTACT_INFO.COMPANY_NAME,
  url: CONTACT_INFO.MAIN_SITE_URL,
  taxID: COMPANY_REGISTRY.NIP,
  identifier: {
    "@type": "PropertyValue",
    propertyID: "KRS",
    value: COMPANY_REGISTRY.KRS,
  },
};

/** Odwolanie do firmy z layoutu (np. autor wpisow na blogu) - ten sam typ co pod @id. */
export const BUSINESS_REF = {
  "@type": "HomeAndConstructionBusiness",
  "@id": BUSINESS_ID,
  name: CONTACT_INFO.BRAND_NAME,
  url: `${SITE_URL}/`,
};

export const BUSINESS_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  "@id": BUSINESS_ID,
  name: CONTACT_INFO.BRAND_NAME,
  description:
    "Serwis specjalistyczny firmy Smarteks: montaż i serwis rolet zewnętrznych – antywłamaniowych RC2 i RC3, adaptacyjnych i podtynkowych – oraz bram rolowanych w Warszawie i okolicach.",
  url: `${SITE_URL}/`,
  telephone: CONTACT_INFO.PHONE_HREF.replace("tel:", ""),
  email: CONTACT_INFO.EMAIL,
  address: {
    "@type": "PostalAddress",
    streetAddress: CONTACT_INFO.ADDRESS_STREET,
    postalCode: CONTACT_INFO.ADDRESS_POSTAL_CODE,
    addressLocality: CONTACT_INFO.ADDRESS_LOCALITY,
    addressCountry: "PL",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "18:00",
    },
  ],
  areaServed: AREA_SERVED,
  parentOrganization: PARENT_ORGANIZATION,
  // "logo" dodac dopiero, gdy na serwerze bedzie ten sam plik logo co na smarteks.pl
  // (obecny /images/logo.png to wariant "Szlabany - automatyka wjazdowa").
  image: `${SITE_URL}${SOMFY_IMAGES.shuttersCornerRemote.src}`,
  sameAs: [CONTACT_INFO.OFERTEO_URL, CONTACT_INFO.GOOGLE_REVIEWS_URL],
};

/** Opis uslugi w JSON-LD - nazwa systemu Aluprof tylko przy RC2 i RC3. */
const SERVICE_DESCRIPTIONS: Record<OfferSlug, string> = {
  [OFFER_SLUGS.RC2]:
    "Montaż i serwis rolet antywłamaniowych Aluprof Safety Plus w klasie RC2 wg PN-EN 1627.",
  [OFFER_SLUGS.RC3]:
    "Montaż i serwis rolet antywłamaniowych Aluprof Safety Premium w klasie RC3 wg PN-EN 1627.",
  [OFFER_SLUGS.ADAPTIVE]:
    "Montaż i serwis rolet adaptacyjnych z regulowanym prześwitem pancerza.",
  [OFFER_SLUGS.RECESSED]:
    "Montaż i serwis rolet podtynkowych ze skrzynką ukrytą w warstwie ocieplenia.",
  [OFFER_SLUGS.ROLLER_GATES]:
    "Montaż i serwis bram rolowanych do garaży i obiektów.",
};

export const getServiceSchema = (product: OfferProduct) => ({
  "@context": "https://schema.org/",
  "@type": "Service",
  name: product.title,
  serviceType: product.title,
  description:
    SERVICE_DESCRIPTIONS[product.slug as OfferSlug] ?? product.meta.description,
  brand: { "@type": "Brand", name: "Aluprof" },
  url: `${SITE_URL}${offerPath(product.slug)}`,
  provider: { "@id": BUSINESS_ID },
  areaServed: AREA_SERVED,
});
