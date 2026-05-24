import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { Article, ArticleMeta } from "@/types/article";

const ARTICLES_DIR = path.join(process.cwd(), "content", "articles");

function readAll(): Article[] {
  if (!fs.existsSync(ARTICLES_DIR)) return [];
  const files = fs
    .readdirSync(ARTICLES_DIR)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
    .filter((f) => !f.startsWith("_"));

  const articles: Article[] = [];
  for (const file of files) {
    const slug = file.replace(/\.mdx?$/, "");
    const raw = fs.readFileSync(path.join(ARTICLES_DIR, file), "utf8");
    const { data, content } = matter(raw);
    if (data.draft) continue;
    articles.push({
      slug,
      title: data.title ?? slug,
      description: data.description ?? "",
      publishedAt: data.publishedAt ?? "",
      updatedAt: data.updatedAt,
      tags: data.tags,
      coverImage: data.coverImage,
      coverImageAlt: data.coverImageAlt,
      coverImageCredit: data.coverImageCredit,
      content,
    });
  }

  articles.sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
  return articles;
}

export function getAllArticles(): ArticleMeta[] {
  return readAll().map(({ content: _content, ...meta }) => meta);
}

export function getArticleBySlug(slug: string): Article | null {
  return readAll().find((a) => a.slug === slug) ?? null;
}

export function getAllSlugs(): string[] {
  return readAll().map((a) => a.slug);
}
