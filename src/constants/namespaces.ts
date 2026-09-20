export const NAMESPACES = {
  SITE: "site",
  HOME: "home",
  HERO: "hero",
  CTA: "cta",
  FAQ: "faq",
  OFFER: "offer",
  PROJECTS: "projects",
  CONTACT: "contact",
  FOOTER: "footer",
  COOKIES: "cookies",
  COMMON: "common",
  NAV: "nav",
  PRIVACY_POLICY: "privacyPolicy",
  COOKIE_POLICY: "cookiePolicy",
  BLOG: "blog",
} as const;

export type Namespace = (typeof NAMESPACES)[keyof typeof NAMESPACES];
