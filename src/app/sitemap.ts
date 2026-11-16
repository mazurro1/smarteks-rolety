import type { MetadataRoute } from "next";
import { SITE_URL, ROUTES, blogPath, offerPath, projectPath } from "@/constants/routes";
import { getAllPosts } from "@/data/blog";
import { getOfferSlugs } from "@/data/offer";
import { PROJECTS } from "@/data/projects";

/**
 * Data ostatniej zmiany tresci stron bez wlasnej daty (strona glowna, oferta,
 * realizacje, kontakt). Zmieniac recznie przy wiekszej zmianie tresci - data
 * builda w lastmod mowilaby Google, ze wszystko zmienia sie przy kazdym wdrozeniu.
 */
const CONTENT_UPDATED_AT = "2026-11-16";

/**
 * Mapa witryny: wszystkie publiczne podstrony (25 adresow przy obecnej tresci).
 * Tylko <loc> i <lastmod> - changefreq i priority Google pomija.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const page = (path: string, lastModified = CONTENT_UPDATED_AT) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
  });

  return [
    page(ROUTES.HOME),
    page(ROUTES.OFFER),
    ...getOfferSlugs().map((slug) => page(offerPath(slug))),
    page(ROUTES.PROJECTS),
    ...PROJECTS.map((project) => page(projectPath(project.slug))),
    page(ROUTES.BLOG),
    ...getAllPosts().map((post) =>
      page(blogPath(post.slug), post.updatedAt ?? post.publishedAt),
    ),
    page(ROUTES.CONTACT),
  ];
}
