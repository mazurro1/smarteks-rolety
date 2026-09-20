import { ROUTES, blogPath } from "@/constants/routes";
import { getAllPosts } from "@/data/blog";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL;

export function GET() {
  const posts = getAllPosts();

  const items = posts
    .map(
      (post) => `    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${BASE_URL}${blogPath(post.slug)}</link>
      <guid isPermaLink="true">${BASE_URL}${blogPath(post.slug)}</guid>
      <category><![CDATA[${post.category}]]></category>
      <description><![CDATA[${post.excerpt}]]></description>
      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
    </item>`,
    )
    .join("\n");

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Smarteks Rolety — blog o roletach zewnętrznych</title>
    <link>${BASE_URL}${ROUTES.BLOG}</link>
    <description>Poradniki o roletach antywłamaniowych RC2 i RC3, roletach adaptacyjnych, podtynkowych oraz bramach rolowanych.</description>
    <language>pl</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${BASE_URL}/feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(feed, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
