import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import ReactMarkdown, { defaultUrlTransform } from "react-markdown";
import remarkGfm from "remark-gfm";
import { FontAwesomeIcon } from "@/ui/FaIcon";
import { faPhone, faFileLines } from "@fortawesome/free-solid-svg-icons";
import { NAMESPACES } from "@/constants/namespaces";
import { CONTACT_INFO } from "@/constants/contact";
import { SITE_URL, ROUTES, blogPath } from "@/constants/routes";
import { getBlogPost, getAllSlugs, getRelatedPosts } from "@/data/blog";
import { getPublicImageSize } from "@/data/blog/imageSize";
import { BUSINESS_REF, PARENT_ORGANIZATION } from "@/data/schema";
import { PageHero } from "@/components/sections/PageHero";
import { PostCard } from "@/components/sections/Blog";
import Button from "@/ui/Button";
import Accordion from "@/ui/Accordion";
import styles from "./page.module.css";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

/** Tylko istniejace wpisy - kazdy inny adres od razu dostaje kod 404. */
export const dynamicParams = false;

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
  const url = `${SITE_URL}${blogPath(slug)}`;

  return {
    title: post.title,
    description: post.metaDescription,
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
          { url: `${SITE_URL}${post.image}`, alt: post.imageAlt ?? post.title },
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

/** Domyslny filtr adresow react-markdown wycina "tel:" - numer w tresci ma byc klikalny. */
const transformUrl = (value: string): string =>
  value.startsWith("tel:") ? value : defaultUrlTransform(value);

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
  const url = `${SITE_URL}${blogPath(slug)}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.metaDescription,
    datePublished: post.publishedAt,
    ...(post.updatedAt && { dateModified: post.updatedAt }),
    // Autor i wydawca powiazani przez @id z firma z layoutu i spolka Smarteks.
    author: BUSINESS_REF,
    publisher: {
      "@type": PARENT_ORGANIZATION["@type"],
      "@id": PARENT_ORGANIZATION["@id"],
      name: PARENT_ORGANIZATION.name,
      url: PARENT_ORGANIZATION.url,
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    ...(post.image && { image: `${SITE_URL}${post.image}` }),
    // Bez "keywords" - z tego samego powodu co meta keywords (zdradza frazy).
    inLanguage: "pl-PL",
    isAccessibleForFree: true,
  };

  // Bez FAQPage - Google pokazuje takie wyniki tylko stronom rzadowym i medycznym.
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

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
                    // Pierwsze zdjecie wpisu to element LCP - preload i wysoki priorytet.
                    preload
                    fetchPriority="high"
                    // Telefon: 400 px x gestosc ekranu = ok. 1200 px; tablet: pelna
                    // szerokosc; desktop: kolumna tresci ok. 860 px.
                    sizes="(max-width: 767px) 400px, (max-width: 1023px) 100vw, 860px"
                    className={styles.heroImg}
                    style={
                      post.imagePosition
                        ? { objectPosition: post.imagePosition }
                        : undefined
                    }
                  />
                </div>
              )}

              <div className={styles.content}>
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  urlTransform={transformUrl}
                  components={{
                    // Zdjecia w tresci: next/image z wymiarami pliku z /public.
                    img: ({ src, alt }) => {
                      if (typeof src !== "string") return null;
                      const size = getPublicImageSize(src);
                      if (!size) {
                        // eslint-disable-next-line @next/next/no-img-element
                        return <img src={src} alt={alt ?? ""} loading="lazy" />;
                      }
                      return (
                        <Image
                          src={src}
                          alt={alt ?? ""}
                          width={size.width}
                          height={size.height}
                          sizes="(max-width: 1023px) 100vw, 860px"
                        />
                      );
                    },
                  }}
                >
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
                    {CONTACT_INFO.PHONE_CTA}
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
