// ── Navigation ────────────────────────────────────────────────────────────────
export interface NavLink {
  label: string;
  href: string;
}

export interface NavGroup extends NavLink {
  children: NavChildLink[];
}

export interface NavChildLink extends NavLink {
  description: string;
  badge?: string;
  icon: IconKey;
}

// ── Icons ─────────────────────────────────────────────────────────────────────
export type IconKey =
  | "shield"
  | "shieldCheck"
  | "lock"
  | "sun"
  | "layers"
  | "warehouse"
  | "bolt"
  | "wrench"
  | "ruler"
  | "truck"
  | "phone"
  | "envelope"
  | "clock"
  | "pin"
  | "check"
  | "star"
  | "gauge"
  | "volume"
  | "thermometer"
  | "remote"
  | "house"
  | "certificate";

// ── Zdjecia ───────────────────────────────────────────────────────────────────
export interface MediaImage {
  /** Sciezka do pliku w /public. */
  src: string;
  /** Opis sceny; przy zdjeciach Somfy z nazwa pokazanego produktu. */
  alt: string;
  /** Wartosc CSS object-position - kadr przy object-fit: cover. */
  position?: string;
}

// ── Oferta ────────────────────────────────────────────────────────────────────
export interface OfferFeature {
  icon: IconKey;
  title: string;
  description: string;
}

export interface OfferSpec {
  label: string;
  value: string;
}

export interface OfferVariant {
  name: string;
  description: string;
  points: string[];
}

/** Sekcja tekstowa podstrony oferty: naglowek H2, lista i akapity. */
export interface OfferSection {
  title: string;
  list?: string[];
  paragraphs?: string[];
}

export interface FaqItem {
  q: string;
  a: string;
}

/** Zdanie z linkiem do poradnika: "text" + podlinkowany "linkLabel" + kropka. */
export interface GuideLink {
  text: string;
  linkLabel: string;
  href: string;
}

export interface OfferProduct {
  slug: string;
  /** Krotka etykieta do nawigacji i breadcrumbow. */
  navLabel: string;
  /** Pelna nazwa kategorii - takze w danych schema.org. */
  title: string;
  /** Naglowek H1 podstrony, gdy ma byc inny niz nazwa (np. z miastem). */
  heroTitle?: string;
  /** Etykieta pod H1 podstrony, gdy inna niz w karcie; null = bez etykiety. */
  heroEyebrow?: string | null;
  /** Podtytul pod H1 podstrony, gdy inny niz "tagline"; null = bez podtytulu. */
  heroLead?: string | null;
  /** Tytul w kartach na stronie glownej / w ofercie. */
  cardTitle: string;
  eyebrow: string;
  badge?: string;
  icon: IconKey;
  /** Zdjecie pogladowe w karcie oferty i na podstronie produktu. */
  image: MediaImage;
  tagline: string;
  excerpt: string;
  highlights: string[];
  intro: string[];
  features: OfferFeature[];
  specs: OfferSpec[];
  /** Wiersze ramki "W skrocie", gdy inne niz poczatek "specs". */
  quickFacts?: OfferSpec[];
  /** Ile pierwszych wierszy "specs" trafia do ramki "W skrocie" (domyslnie 4). */
  quickFactsCount?: number;
  variants: OfferVariant[];
  /** Sekcje tekstowe (H2 + tresc) pod wstepem - linki w zapisie markdown. */
  sections?: OfferSection[];
  installation: {
    lead: string;
    points: string[];
  };
  service: {
    lead: string;
    points: string[];
    /** Zdanie pod lista - linki w zapisie markdown. */
    note?: string;
  };
  faq: FaqItem[];
  /** Linki do poradnikow z bloga, pokazywane pod pytaniami. */
  faqGuides?: GuideLink[];
  meta: {
    title: string;
    description: string;
  };
  /** Kategorie realizacji powiazane z produktem. */
  projectCategories: ProjectCategory[];
}

// ── Realizacje ────────────────────────────────────────────────────────────────
export type ProjectCategory =
  | "rc2"
  | "rc3"
  | "adaptive"
  | "recessed"
  | "rollerGates";

export interface ProjectImage {
  /** Sciezka do pliku w /public. Brak = renderowany placeholder. */
  src?: string;
  alt: string;
  caption?: string;
  /** Kadr zdjecia (CSS object-position). */
  position?: string;
}

export interface Project {
  slug: string;
  title: string;
  category: ProjectCategory;
  /** Dodatkowe kategorie do filtrowania (np. RC2 + podtynkowe). */
  extraCategories?: ProjectCategory[];
  /** Tytul w <title> i og:title, gdy inny niz "tytul - miejscowosc". */
  metaTitle?: string;
  location: string;
  year: number;
  buildingType: string;
  summary: string;
  description: string[];
  scope: string[];
  specs: OfferSpec[];
  gallery: ProjectImage[];
  /** Porownanie przed/po montazu (suwak na stronie realizacji). Najlepiej ten sam kadr. */
  beforeAfter?: {
    before: ProjectImage;
    after: ProjectImage;
  };
  outcome: string;
  /** Poradnik z bloga - drugi link w ramce pod parametrami realizacji. */
  guide?: NavLink;
  /** Link w ramce "Rozwiazanie z oferty", gdy realizacja nie ma podstrony oferty. */
  solutionLink?: NavLink;
}

// ── Contact form ──────────────────────────────────────────────────────────────
export interface ContactFormValues {
  name: string;
  phone: string;
  email: string;
  topic: string;
  message: string;
  honeypot: string;
}

export interface ContactFormErrors {
  name?: string;
  phone?: string;
  email?: string;
  topic?: string;
  message?: string;
}

export type FormStatus = "idle" | "submitting" | "success" | "error";

export interface ContactTopic {
  value: string;
}

// ── UI ────────────────────────────────────────────────────────────────────────
export type ButtonVariant = "primary" | "outline" | "ghost" | "light";
export type ButtonSize = "sm" | "md" | "lg";

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export interface StatItem {
  value: string;
  label: string;
}
