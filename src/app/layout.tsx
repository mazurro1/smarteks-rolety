import type { Metadata, Viewport } from "next";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { Geist, Geist_Mono } from "next/font/google";
config.autoAddCss = false;
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages, getTranslations } from "next-intl/server";
import { NAMESPACES } from "@/constants/namespaces";
import { CONTACT_INFO } from "@/constants/contact";
import { COLORS } from "@/constants/colors";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CookieBanner } from "@/ui/CookieBanner";
import { MobileBottomBar } from "@/ui/MobileBottomBar";
import ScrollToTop from "@/components/layout/ScrollToTop";
import "@/styles/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL;

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations(NAMESPACES.SITE);

  return {
    metadataBase: new URL(BASE_URL ?? "http://localhost:3000"),
    title: {
      default: t("metaTitle"),
      template: t("metaTitleTemplate"),
    },
    description: t("metaDescription"),
    keywords: [
      "rolety zewnetrzne Warszawa",
      "rolety antywlamaniowe RC2",
      "rolety antywlamaniowe RC3",
      "rolety adaptacyjne",
      "rolety podtynkowe",
      "bramy rolowane Warszawa",
      "montaz rolet Warszawa",
      "serwis rolet Warszawa",
      "rolety elektryczne",
      "oslony przeciwsloneczne",
      "rolety na wymiar",
      "przeglad rolet",
    ],
    authors: [{ name: CONTACT_INFO.COMPANY_NAME }],
    creator: CONTACT_INFO.COMPANY_NAME,
    publisher: CONTACT_INFO.COMPANY_NAME,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: BASE_URL,
      languages: { "pl-PL": BASE_URL },
      types: {
        "application/rss+xml": [{ url: "/feed.xml", title: t("rssFeedTitle") }],
      },
    },
    openGraph: {
      type: "website",
      locale: "pl_PL",
      url: BASE_URL,
      siteName: t("name"),
      title: t("ogTitle"),
      description: t("ogDescription"),
    },
    twitter: {
      card: "summary_large_image",
      title: t("twitterTitle"),
      description: t("twitterDescription"),
    },
    category: "business",
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: COLORS.BG_BASE,
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: CONTACT_INFO.BRAND_NAME,
  legalName: CONTACT_INFO.COMPANY_NAME_FULL,
  description:
    "Montaz i serwis rolet zewnetrznych: antywlamaniowych RC2 i RC3, adaptacyjnych, podtynkowych oraz bram rolowanych. Warszawa i okolice.",
  url: BASE_URL,
  image: `${BASE_URL}/opengraph-image`,
  telephone: CONTACT_INFO.PHONE_HREF,
  email: CONTACT_INFO.EMAIL,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Warszawa",
    addressCountry: "PL",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 52.2297,
    longitude: 21.0122,
  },
  areaServed: [
    { "@type": "City", name: "Warszawa" },
    { "@type": "AdministrativeArea", name: "Mazowieckie" },
  ],
  serviceType: [
    "Montaz rolet antywlamaniowych RC2",
    "Montaz rolet antywlamaniowych RC3",
    "Montaz rolet adaptacyjnych",
    "Montaz rolet podtynkowych",
    "Montaz i serwis bram rolowanych",
  ],
  priceRange: "$$",
  sameAs: [],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
          }}
        />
      </head>
      <body>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <ScrollToTop />
          <a href="#main-content" className="skipLink">
            Przejdź do treści
          </a>
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
          <MobileBottomBar />
          <CookieBanner />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
