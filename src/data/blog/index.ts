import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { FaqItem } from "@/types";

export interface BlogPostMeta {
  slug: string;
  title: string;
  metaDescription: string;
  publishedAt: string;
  updatedAt?: string;
  excerpt: string;
  category: string;
  readingTime: number;
  keywords?: string[];
  image?: string;
  imageAlt?: string;
}

export interface BlogPostFull extends BlogPostMeta {
  content: string;
  faq?: FaqItem[];
}

const BLOG_DIR = path.join(process.cwd(), "src/data/blog");

const WORDS_PER_MINUTE = 200;

const estimateReadingTime = (content: string): number =>
  Math.max(1, Math.round(content.trim().split(/\s+/u).length / WORDS_PER_MINUTE));

const toMeta = (
  slug: string,
  data: Record<string, unknown>,
  content: string,
): BlogPostMeta => ({
  slug,
  title: data.title as string,
  metaDescription: data.metaDescription as string,
  publishedAt: data.publishedAt as string,
  updatedAt: data.updatedAt as string | undefined,
  excerpt: data.excerpt as string,
  category: (data.category as string) ?? "Poradnik",
  readingTime: (data.readingTime as number) ?? estimateReadingTime(content),
  keywords: data.keywords as string[] | undefined,
  image: data.image as string | undefined,
  imageAlt: data.imageAlt as string | undefined,
});

export function getAllPosts(): BlogPostMeta[] {
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md"));

  return files
    .map((filename) => {
      const slug = filename.replace(/\.md$/, "");
      const raw = fs.readFileSync(path.join(BLOG_DIR, filename), "utf-8");
      const { data, content } = matter(raw);
      return toMeta(slug, data, content);
    })
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );
}

export function getBlogPost(slug: string): BlogPostFull | null {
  const filePath = path.join(BLOG_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return {
    ...toMeta(slug, data, content),
    content,
    faq: data.faq as FaqItem[] | undefined,
  };
}

export function getAllSlugs(): string[] {
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

export function getLatestPosts(limit: number): BlogPostMeta[] {
  return getAllPosts().slice(0, limit);
}

/** Wpisy powiazane — ta sama kategoria, z pominieciem biezacego wpisu. */
export function getRelatedPosts(slug: string, limit = 3): BlogPostMeta[] {
  const posts = getAllPosts();
  const current = posts.find((post) => post.slug === slug);
  if (!current) return posts.slice(0, limit);

  const sameCategory = posts.filter(
    (post) => post.slug !== slug && post.category === current.category,
  );
  const rest = posts.filter(
    (post) => post.slug !== slug && post.category !== current.category,
  );

  return [...sameCategory, ...rest].slice(0, limit);
}

export function getCategories(): string[] {
  return [...new Set(getAllPosts().map((post) => post.category))];
}
