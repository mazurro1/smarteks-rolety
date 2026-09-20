import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { NAMESPACES } from "@/constants/namespaces";
import { ROUTES, blogPath } from "@/constants/routes";
import { getAllPosts } from "@/data/blog";
import { PageHero } from "@/components/sections/PageHero";
import { PostCard } from "@/components/sections/Blog";
import { CTA } from "@/components/sections/CTA";
import Reveal from "@/ui/Reveal";
import styles from "./page.module.css";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL;

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations(NAMESPACES.BLOG);
  const tSite = await getTranslations(NAMESPACES.SITE);

  return {
    title: t("pageTitle"),
    description: t("pageDescription"),
    alternates: { canonical: `${BASE_URL}${ROUTES.BLOG}` },
    openGraph: {
      type: "website",
      locale: "pl_PL",
      url: `${BASE_URL}${ROUTES.BLOG}`,
      siteName: tSite("name"),
      title: t("pageTitle"),
      description: t("pageDescription"),
    },
  };
}

const formatDate = (value: string): string =>
  new Date(value).toLocaleDateString("pl-PL", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

export default async function BlogPage() {
  const t = await getTranslations(NAMESPACES.BLOG);
  const posts = getAllPosts();
  const [featured, ...rest] = posts;

  return (
    <>
      <PageHero
        eyebrow={t("heroEyebrow")}
        title={t("heroTitle")}
        lead={t("heroLead")}
        crumbs={[{ label: t("breadcrumb"), href: ROUTES.BLOG }]}
      />

      <section className={`section ${styles.section}`} aria-label={t("listAriaLabel")}>
        <div className="container">
          {posts.length === 0 ? (
            <p className={styles.empty}>{t("noPosts")}</p>
          ) : (
            <>
              <article className={styles.featured}>
                <div className={styles.featuredBody}>
                  <div className={styles.featuredMeta}>
                    <span className={styles.featuredTag}>{t("featuredLabel")}</span>
                    <span className={styles.featuredCategory}>
                      {featured.category}
                    </span>
                  </div>

                  <h2 className={styles.featuredTitle}>
                    <Link href={blogPath(featured.slug)}>{featured.title}</Link>
                  </h2>

                  <p className={styles.featuredExcerpt}>{featured.excerpt}</p>

                  <div className={styles.featuredFooter}>
                    <time dateTime={featured.publishedAt}>
                      {formatDate(featured.publishedAt)}
                    </time>
                    <span aria-hidden="true">·</span>
                    <span>
                      {featured.readingTime} {t("readingTime")}
                    </span>
                    <Link href={blogPath(featured.slug)} className={styles.featuredLink}>
                      {t("readMore")} &rarr;
                    </Link>
                  </div>
                </div>

                <div className={styles.featuredDecor} aria-hidden="true" />
              </article>

              <div className={styles.grid}>
                {rest.map((post, index) => (
                  <Reveal key={post.slug} delay={index * 50}>
                    <PostCard
                      post={post}
                      readingTimeLabel={t("readingTime")}
                      readMoreLabel={t("readMore")}
                    />
                  </Reveal>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      <CTA />
    </>
  );
}
