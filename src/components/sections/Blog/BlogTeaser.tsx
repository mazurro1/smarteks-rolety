import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { NAMESPACES } from "@/constants/namespaces";
import { ROUTES } from "@/constants/routes";
import { getLatestPosts } from "@/data/blog";
import SectionHeader from "@/ui/SectionHeader";
import Reveal from "@/ui/Reveal";
import PostCard from "./PostCard";
import styles from "./BlogTeaser.module.css";

export async function BlogTeaser() {
  const t = await getTranslations(NAMESPACES.BLOG);
  const posts = getLatestPosts(3);

  if (posts.length === 0) return null;

  return (
    <section
      className={`section ${styles.section}`}
      aria-labelledby="blog-teaser-heading"
    >
      <div className="container">
        <div className={styles.head}>
          <SectionHeader
            eyebrow={t("teaser.eyebrow")}
            title={t("teaser.title")}
            lead={t("teaser.lead")}
            align="left"
            id="blog-teaser-heading"
            className={styles.header}
          />
          <Link href={ROUTES.BLOG} className={styles.headLink}>
            {t("teaser.cta")} &rarr;
          </Link>
        </div>

        <div className={styles.grid}>
          {posts.map((post, index) => (
            <Reveal key={post.slug} delay={index * 60}>
              <PostCard
                post={post}
                readingTimeLabel={t("readingTime")}
                readMoreLabel={t("readMore")}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
