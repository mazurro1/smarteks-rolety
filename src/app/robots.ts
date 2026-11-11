import type { MetadataRoute } from "next";
import { SITE_URL } from "@/constants/routes";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/polityka-prywatnosci", "/polityka-cookies"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
