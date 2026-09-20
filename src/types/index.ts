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

export interface FaqItem {
  q: string;
  a: string;
}

export interface OfferProduct {
  slug: string;
  /** Krotka etykieta do nawigacji i breadcrumbow. */
  navLabel: string;
  /** Pelny tytul H1 podstrony. */
  title: string;
  /** Tytul w kartach na stronie glownej / w ofercie. */
  cardTitle: string;
  eyebrow: string;
  badge?: string;
  icon: IconKey;
  tagline: string;
  excerpt: string;
  highlights: string[];
  intro: string[];
  features: OfferFeature[];
  specs: OfferSpec[];
  variants: OfferVariant[];
  installation: {
    lead: string;
    points: string[];
  };
  service: {
    lead: string;
    points: string[];
  };
  faq: FaqItem[];
  meta: {
    title: string;
    description: string;
    keywords: string[];
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
}

export interface Project {
  slug: string;
  title: string;
  category: ProjectCategory;
  /** Dodatkowe kategorie do filtrowania (np. RC2 + podtynkowe). */
  extraCategories?: ProjectCategory[];
  location: string;
  year: number;
  buildingType: string;
  summary: string;
  description: string[];
  scope: string[];
  specs: OfferSpec[];
  gallery: ProjectImage[];
  outcome: string;
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
