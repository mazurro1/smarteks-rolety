import Link from "next/link";
import { blogPath } from "@/constants/routes";
import type { BlogPostMeta } from "@/data/blog";
import styles from "./PostCard.module.css";

interface PostCardProps {
  post: BlogPostMeta;
  readingTimeLabel: string;
  readMoreLabel: string;
}

const formatDate = (value: string): string =>
  new Date(value).toLocaleDateString("pl-PL", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

export default function PostCard({
  post,
  readingTimeLabel,
  readMoreLabel,
}: PostCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.head}>
        <span className={styles.category}>{post.category}</span>
        <span className={styles.readingTime}>
          {post.readingTime} {readingTimeLabel}
        </span>
      </div>

      <h3 className={styles.title}>
        <Link href={blogPath(post.slug)} className={styles.titleLink}>
          {post.title}
        </Link>
      </h3>

      <time className={styles.date} dateTime={post.publishedAt}>
        {formatDate(post.publishedAt)}
      </time>

      <p className={styles.excerpt}>{post.excerpt}</p>

      <Link href={blogPath(post.slug)} className={styles.link}>
        {readMoreLabel} &rarr;
      </Link>
    </article>
  );
}
