import type { MetadataRoute } from "next";
import { SITE_URL, ROUTES, blogPath, offerPath, projectPath } from "@/constants/routes";
import { getAllPosts } from "@/data/blog";
import { getOfferSlugs } from "@/data/offer";
import { PROJECTS } from "@/data/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const offerEntries: MetadataRoute.Sitemap = getOfferSlugs().map((slug) => ({
    url: `${SITE_URL}${offerPath(slug)}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  const projectEntries: MetadataRoute.Sitemap = PROJECTS.map((project) => ({
    url: `${SITE_URL}${projectPath(project.slug)}`,
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  const blogEntries: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${SITE_URL}${blogPath(post.slug)}`,
    lastModified: post.updatedAt
      ? new Date(post.updatedAt)
      : new Date(post.publishedAt),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    {
      url: `${SITE_URL}${ROUTES.HOME}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}${ROUTES.OFFER}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...offerEntries,
    {
      url: `${SITE_URL}${ROUTES.PROJECTS}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...projectEntries,
    {
      url: `${SITE_URL}${ROUTES.BLOG}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...blogEntries,
    {
      url: `${SITE_URL}${ROUTES.CONTACT}`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.8,
    },
  ];
}
