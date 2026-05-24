import type { MetadataRoute } from "next";
import { getAllArticles } from "@/lib/articles";
import { resolveSiteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = resolveSiteUrl();
  const now = new Date();
  const articles = getAllArticles();

  return [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/about`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
    { url: `${base}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    ...articles.map((a) => ({
      url: `${base}/articles/${a.slug}`,
      lastModified: a.updatedAt
        ? new Date(a.updatedAt)
        : a.publishedAt
          ? new Date(a.publishedAt)
          : now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
