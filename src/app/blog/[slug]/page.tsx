import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faFileLines } from "@fortawesome/free-solid-svg-icons";
import { NAMESPACES } from "@/constants/namespaces";
import { CONTACT_INFO } from "@/constants/contact";
import { ROUTES, blogPath } from "@/constants/routes";
import { getBlogPost, getAllSlugs, getRelatedPosts } from "@/data/blog";
import { PageHero } from "@/components/sections/PageHero";
import { PostCard } from "@/components/sections/Blog";
import Button from "@/ui/Button";
import Accordion from "@/ui/Accordion";
import styles from "./page.module.css";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL;

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};

  const tSite = await getTranslations(NAMESPACES.SITE);
  const url = `${BASE_URL}${blogPath(slug)}`;

  return {
    title: post.title,
    description: post.metaDescription,
    keywords: post.keywords,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      locale: "pl_PL",
      url,
      siteName: tSite("name"),
      title: post.title,
      description: post.metaDescription,
      publishedTime: post.publishedAt,
      ...(post.updatedAt && { modifiedTime: post.updatedAt }),
      authors: [CONTACT_INFO.COMPANY_NAME],
      ...(post.image && {
        images: [
          { url: `${BASE_URL}${post.image}`, alt: post.imageAlt ?? post.title },
        ],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.metaDescription,
      ...(post.image && { images: [post.image] }),
    },
    robots: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  };
}

const formatDate = (value: string): string =>
  new Date(value).toLocaleDateString("pl-PL", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const t = await getTranslations(NAMESPACES.BLOG);
  const tCommon = await getTranslations(NAMESPACES.COMMON);
  const related = getRelatedPosts(slug, 3);
  const url = `${BASE_URL}${blogPath(slug)}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.metaDescription,
    datePublished: post.publishedAt,
    ...(post.updatedAt && { dateModified: post.updatedAt }),
    author: {
      "@type": "Organization",
      name: CONTACT_INFO.COMPANY_NAME,
      url: BASE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: CONTACT_INFO.COMPANY_NAME,
      url: BASE_URL,
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    ...(post.image && { image: `${BASE_URL}${post.image}` }),
    ...(post.keywords && { keywords: post.keywords.join(", ") }),
    inLanguage: "pl-PL",
    isAccessibleForFree: true,
  };

  const faqSchema =
    post.faq && post.faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: post.faq.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
          })),
        }
      : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <PageHero
        eyebrow={post.category}
        title={post.title}
        crumbs={[
          { label: t("breadcrumb"), href: ROUTES.BLOG },
          { label: post.title, href: blogPath(slug) },
        ]}
      >
        <p className={styles.meta}>
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
          <span aria-hidden="true">·</span>
          <span>
            {post.readingTime} {t("readingTime")}
          </span>
          {post.updatedAt && (
            <>
              <span aria-hidden="true">·</span>
              <span>
                {t("updatedAt")}: {formatDate(post.updatedAt)}
              </span>
            </>
          )}
        </p>
      </PageHero>

      <article className={`section ${styles.section}`}>
        <div className="container">
          <div className={styles.layout}>
            <div className={styles.main}>
              {post.image && (
                <div className={styles.heroImage}>
                  <Image
                    src={post.image}
                    alt={post.imageAlt ?? post.title}
                    width={1200}
                    height={630}
                    priority
                    className={styles.heroImg}
                  />
                </div>
              )}

              <div className={styles.content}>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {post.content}
                </ReactMarkdown>
              </div>

              {post.faq && post.faq.length > 0 && (
                <section className={styles.faq} aria-labelledby="post-faq-heading">
                  <h2 id="post-faq-heading" className={styles.faqHeading}>
                    {t("faqHeading")}
                  </h2>
                  <Accordion items={post.faq} idPrefix={`post-faq-${slug}`} />
                </section>
              )}

              <div className={styles.cta}>
                <div>
                  <p className={styles.ctaTitle}>{t("ctaTitle")}</p>
                  <p className={styles.ctaText}>{t("ctaText")}</p>
                </div>
                <div className={styles.ctaActions}>
                  <Button as="link" href={ROUTES.CONTACT} variant="primary">
                    <FontAwesomeIcon icon={faFileLines} />
                    {tCommon("actions.freeEstimate")}
                  </Button>
                  <Button as="a" href={CONTACT_INFO.PHONE_HREF} variant="outline">
                    <FontAwesomeIcon icon={faPhone} />
                    {CONTACT_INFO.PHONE}
                  </Button>
                </div>
              </div>
            </div>

            <aside className={styles.sidebar}>
              <div className={styles.sidebarCard}>
                <p className={styles.sidebarTitle}>{t("aboutAuthorTitle")}</p>
                <p className={styles.sidebarText}>{t("aboutAuthorText")}</p>
                <Link href={ROUTES.OFFER} className={styles.sidebarLink}>
                  {t("aboutAuthorCta")} &rarr;
                </Link>
              </div>

              {post.keywords && post.keywords.length > 0 && (
                <div className={styles.sidebarCard}>
                  <p className={styles.sidebarTitle}>{t("tagsTitle")}</p>
                  <ul className={styles.tags}>
                    {post.keywords.map((keyword) => (
                      <li key={keyword} className={styles.tag}>
                        {keyword}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </aside>
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className={`section ${styles.related}`} aria-labelledby="related-heading">
          <div className="container">
            <div className={styles.relatedHead}>
              <h2 id="related-heading" className={styles.relatedTitle}>
                {t("relatedTitle")}
              </h2>
              <Link href={ROUTES.BLOG} className={styles.relatedLink}>
                {t("backToBlog")} &rarr;
              </Link>
            </div>
            <div className={styles.relatedGrid}>
              {related.map((item) => (
                <PostCard
                  key={item.slug}
                  post={item}
                  readingTimeLabel={t("readingTime")}
                  readMoreLabel={t("readMore")}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
