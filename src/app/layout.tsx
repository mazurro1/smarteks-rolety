import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
import { ShutterTransition } from "@/components/layout/ShutterTransition";
import { InteractiveEffects } from "@/components/layout/InteractiveEffects";
import { SITE_URL } from "@/constants/routes";
import { BUSINESS_SCHEMA } from "@/data/schema";
import {
  COOKIE_CONSENT_KEY,
  COOKIES_DECIDED_CLASS,
  GTM_ID,
} from "@/constants/cookies";
import "@/styles/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

// Mono tylko w drobnych numerach i etykietach - bez preloadu, zeby nie
// konkurowal o pasmo ze zdjeciem hero (LCP). Pobiera sie, gdy jest uzyty.
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "latin-ext"],
  display: "swap",
  preload: false,
});

/** Teksty potrzebne komponentom klienckim - reszta zostaje na serwerze (mniejszy HTML). */
const CLIENT_NAMESPACES = [
  NAMESPACES.NAV,
  NAMESPACES.COMMON,
  NAMESPACES.COOKIES,
  NAMESPACES.CONTACT,
  NAMESPACES.PROJECTS,
] as const;

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations(NAMESPACES.SITE);

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: t("metaTitle"),
      template: t("metaTitleTemplate"),
    },
    description: t("metaDescription"),
    // Bez meta keywords - Google ich nie uzywa, a zdradzaja konkurencji docelowe frazy.
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
    // Canonical ustawia kazda strona sama - tutaj odziedziczylaby go np. strona 404.
    alternates: {
      types: {
        "application/rss+xml": [{ url: "/feed.xml", title: t("rssFeedTitle") }],
      },
    },
    openGraph: {
      type: "website",
      locale: "pl_PL",
      url: SITE_URL,
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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const messages = await getMessages();
  const clientMessages = Object.fromEntries(
    CLIENT_NAMESPACES.map((namespace) => [namespace, messages[namespace]]),
  );

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
      data-scroll-behavior="smooth"
    >
      <head>
        {/* Flagi przed pierwszym malowaniem: "js" - stany startowe animacji (np. roleta
            zaslaniajaca zdjecie) dzialaja tylko z JS, bez niego tresc jest widoczna;
            "cookies-ok" - decyzja o cookies juz zapisana, baner z HTML ma sie nie pokazac. */}
        <script
          dangerouslySetInnerHTML={{
            // Decyzja z localStorage albo z cookie (zapas, gdy localStorage jest zablokowany).
            __html: `(function(d){d.classList.add('js');var k='${COOKIE_CONSENT_KEY}',s=null;try{s=localStorage.getItem(k)}catch(e){}if(s||document.cookie.indexOf(k+'=')>-1)d.classList.add('${COOKIES_DECIDED_CLASS}')})(document.documentElement)`,
          }}
        />
        {/* Google Tag Manager. Kolejnosc ma znaczenie: najpierw domyslny stan zgody
            (Consent Mode v2) - odmowa, chyba ze zgoda jest juz zapisana - dopiero potem
            start kontenera. Tagi w GTM same respektuja ten stan. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}(function(){var k='${COOKIE_CONSENT_KEY}',s=null;try{s=localStorage.getItem(k)}catch(e){}var g=(s==='accepted'||document.cookie.indexOf(k+'=accepted')>-1)?'granted':'denied';gtag('consent','default',{ad_storage:g,ad_user_data:g,ad_personalization:g,analytics_storage:g});})();gtag('js',new Date());dataLayer.push({'gtm.start':new Date().getTime(),event:'gtm.js'});`,
          }}
        />
        <script
          async
          src={`https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(BUSINESS_SCHEMA),
          }}
        />
      </head>
      <body>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <NextIntlClientProvider messages={clientMessages} locale={locale}>
          <ScrollToTop />
          <a href="#main-content" className="skipLink">
            Przejdź do treści
          </a>
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
          <MobileBottomBar />
          <CookieBanner />
          <ShutterTransition />
          <InteractiveEffects />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
