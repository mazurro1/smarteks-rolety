export const CONTACT_INFO = {
  PHONE: "737 531 193",
  PHONE_HREF: "tel:+48737531193",
  EMAIL: "kontakt@smarteks.pl",
  EMAIL_HREF: "mailto:kontakt@smarteks.pl",
  ADDRESS_STREET: "Marywilska 17A/57",
  ADDRESS_CITY: "03-228 Warszawa",
  ADDRESS_FULL: "Marywilska 17A/57, 03-228 Warszawa",
  COMPANY_NAME: "Smarteks Sp. z o.o.",
  COMPANY_NAME_FULL: "SMARTEKS SPOLKA Z OGRANICZONA ODPOWIEDZIALNOSCIA",
  BRAND_NAME: "Smarteks Rolety",
  SERVICE_AREA: "Warszawa i okolice",
  GOOGLE_MAPS_URL: "https://maps.google.com/?q=Marywilska+17A,+Warszawa",
} as const;

/** Miejscowosci obslugiwane w promieniu dojazdu — uzywane w stopce i na kontakcie. */
export const SERVICE_CITIES = [
  "Warszawa",
  "Piaseczno",
  "Pruszkow",
  "Legionowo",
  "Marki",
  "Jozefow",
  "Konstancin-Jeziorna",
  "Otwock",
  "Nadarzyn",
  "Lomianki",
  "Zabki",
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
