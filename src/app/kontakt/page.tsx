import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { NAMESPACES } from "@/constants/namespaces";
import { SITE_URL, ROUTES } from "@/constants/routes";
import { HOME_FAQ } from "@/data/site";
import { PageHero } from "@/components/sections/PageHero";
import { ContactForm } from "@/components/sections/ContactForm";
import { FAQ } from "@/components/sections/FAQ";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations(NAMESPACES.CONTACT);
  const tSite = await getTranslations(NAMESPACES.SITE);

  return {
    title: t("pageTitle"),
    description: t("pageDescription"),
    alternates: { canonical: `${SITE_URL}${ROUTES.CONTACT}` },
    openGraph: {
      type: "website",
      locale: "pl_PL",
      url: `${SITE_URL}${ROUTES.CONTACT}`,
      siteName: tSite("name"),
      title: t("pageTitle"),
      description: t("pageDescription"),
    },
  };
}

export default async function ContactPage() {
  const t = await getTranslations(NAMESPACES.CONTACT);

  return (
    <>
      <PageHero
        eyebrow={t("heroEyebrow")}
        title={t("heroTitle")}
        lead={t("heroLead")}
        crumbs={[{ label: t("breadcrumb"), href: ROUTES.CONTACT }]}
        chips={[
          t("chips.freeEstimate"),
          t("chips.response"),
          t("chips.area"),
          t("chips.ownTeam"),
        ]}
      />

      <ContactForm />

      <FAQ
        items={HOME_FAQ}
        eyebrow={t("faq.eyebrow")}
        title={t("faq.title")}
        lead={t("faq.lead")}
        idPrefix="contact-faq"
      />
    </>
  );
}
