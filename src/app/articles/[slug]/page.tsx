import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { AdSensePlacement } from "@/components/AdSensePlacement";
import { getAllSlugs, getArticleBySlug } from "@/lib/articles";
import { contactEmail, site } from "@/lib/site";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: `/articles/${slug}` },
    openGraph: {
      title: article.title,
      description: article.description,
      type: "article",
      publishedTime: article.publishedAt || undefined,
      modifiedTime: article.updatedAt,
      tags: article.tags ? [...article.tags] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
    },
  };
}

function readingTime(content: string): number {
  // 200 wpm is the standard for technical/business content
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const minutes = readingTime(article.content);

  return (
    <article className="mx-auto max-w-2xl px-6 py-10 sm:py-14">
      {/* Breadcrumb */}
      <nav className="mb-8 text-sm" aria-label="Breadcrumb">
        <Link
          href="/"
          className="text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-50"
        >
          ← All articles
        </Link>
      </nav>

      {/* Article header */}
      <header className="mb-8">
        {article.tags && article.tags.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {article.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        <h1 className="font-serif text-balance text-4xl font-bold leading-[1.1] tracking-tight text-neutral-900 sm:text-[2.75rem] dark:text-neutral-50">
          {article.title}
        </h1>
        {article.description && (
          <p className="mt-5 text-pretty text-lg leading-relaxed text-neutral-600 dark:text-neutral-400">
            {article.description}
          </p>
        )}
        <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-neutral-500">
          {article.publishedAt && (
            <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
          )}
          {article.updatedAt && article.updatedAt !== article.publishedAt && (
            <span>Updated {formatDate(article.updatedAt)}</span>
          )}
          <span aria-hidden>·</span>
          <span>{minutes} min read</span>
        </div>
      </header>

      {/* Cover image */}
      {article.coverImage && (
        <figure className="mb-10 -mx-6 sm:mx-0">
          <div className="relative aspect-[16/9] w-full overflow-hidden sm:rounded-xl">
            <Image
              src={article.coverImage}
              alt={article.coverImageAlt ?? article.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
            />
          </div>
          {article.coverImageCredit && (
            <figcaption className="mt-2 px-6 text-center text-xs text-neutral-500 sm:px-0 sm:text-left">
              {article.coverImageCredit}
            </figcaption>
          )}
        </figure>
      )}

      {/* Article body */}
      <div className="prose prose-neutral max-w-none dark:prose-invert">
        <MDXRemote
          source={article.content}
          options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
        />
      </div>

      {/* In-article ad placement */}
      <AdSensePlacement slot="in-article" className="my-12" />

      {/* Footer CTA */}
      <footer className="mt-16 border-t border-neutral-200 pt-8 dark:border-neutral-800">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Have feedback on this review or a tool we missed?{" "}
          <a
            href={`mailto:${contactEmail("general")}`}
            className="font-medium text-emerald-700 underline-offset-2 hover:underline dark:text-emerald-400"
          >
            Email me
          </a>
          .
        </p>
        <p className="mt-3 text-xs text-neutral-500">
          We re-verify pricing and feature comparisons {site.reviewCadence}. Last updated{" "}
          {article.updatedAt
            ? formatDate(article.updatedAt)
            : article.publishedAt
              ? formatDate(article.publishedAt)
              : ""}
          .
        </p>
      </footer>
    </article>
  );
}
