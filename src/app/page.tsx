import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { NAMESPACES } from "@/constants/namespaces";
import { Hero } from "@/components/sections/Hero";
import { OfferIndex } from "@/components/sections/OfferIndex";
import { Benefits } from "@/components/sections/Benefits";
import { CompanyIntro } from "@/components/sections/CompanyIntro";
import { Process } from "@/components/sections/Process";
import { ProjectsTeaser } from "@/components/sections/Projects";
import { BlogTeaser } from "@/components/sections/Blog";
import { FAQ } from "@/components/sections/FAQ";
import { CTA } from "@/components/sections/CTA";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL;

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations(NAMESPACES.HOME);
  const tSite = await getTranslations(NAMESPACES.SITE);

  return {
    title: t("pageTitle"),
    description: t("pageDescription"),
    alternates: { canonical: "/" },
    openGraph: {
      type: "website",
      locale: "pl_PL",
      url: BASE_URL,
      siteName: tSite("name"),
      title: t("pageTitle"),
      description: t("pageDescription"),
    },
  };
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <OfferIndex />
      <Benefits />
      <CompanyIntro />
      <Process />
      <ProjectsTeaser />
      <BlogTeaser />
      <FAQ />
      <CTA />
    </>
  );
}
