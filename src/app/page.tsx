import Image from "next/image";
import Link from "next/link";
import { ArticleCard } from "@/components/ArticleCard";
import { Pagination } from "@/components/Pagination";
import { getArticlesPage } from "@/lib/articles";
import { site } from "@/lib/site";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageParam } = await searchParams;
  const currentPage = Math.max(1, parseInt(pageParam ?? "1", 10) || 1);

  const { articles, totalPages } = getArticlesPage(currentPage);
  const featured = currentPage === 1 ? articles[0] : null;
  const rest = currentPage === 1 ? articles.slice(1) : articles;

  return (
    <div className="mx-auto max-w-3xl px-6 py-12 sm:py-16">
      {/* Hero — only on page 1 */}
      {currentPage === 1 && (
        <section className="mb-14 sm:mb-16">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950/50 dark:text-emerald-300">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden />
            {site.heroEyebrow}
          </p>
          <h1 className="font-serif text-balance text-[2.5rem] font-bold leading-[1.05] tracking-tight text-neutral-900 sm:text-[3.25rem] dark:text-neutral-50">
            {site.tagline}.
          </h1>
          <p className="mt-5 max-w-prose text-pretty text-lg leading-relaxed text-neutral-600 dark:text-neutral-400">
            {site.description}
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-neutral-500">
            {site.trustSignals.map((signal) => (
              <span key={signal} className="flex items-center gap-1.5">
                <span
                  className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500"
                  aria-hidden
                />
                {signal}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Featured (latest) article — visually prominent with cover image */}
      {featured && (
        <section className="mb-16">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
              Latest review
            </h2>
            <span className="text-xs text-neutral-400">
              {featured.publishedAt &&
                new Date(featured.publishedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
            </span>
          </div>
          <Link
            href={`/articles/${featured.slug}`}
            className="group block overflow-hidden rounded-2xl border border-neutral-200 bg-white transition-all hover:border-emerald-300 hover:shadow-lg dark:border-neutral-800 dark:bg-neutral-950 dark:hover:border-emerald-800"
          >
            {featured.coverImage && (
              <div className="relative aspect-[21/9] w-full overflow-hidden bg-neutral-100 dark:bg-neutral-900">
                <Image
                  src={featured.coverImage}
                  alt={featured.coverImageAlt ?? featured.title}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 768px"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </div>
            )}
            <div className="p-6 sm:p-8">
              {featured.tags && featured.tags.length > 0 && (
                <div className="mb-3 flex flex-wrap gap-1.5">
                  {featured.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              <h3 className="font-serif text-balance text-2xl font-bold leading-tight tracking-tight text-neutral-900 group-hover:text-emerald-800 sm:text-3xl dark:text-neutral-50 dark:group-hover:text-emerald-300">
                {featured.title}
              </h3>
              {featured.description && (
                <p className="mt-3 text-pretty leading-relaxed text-neutral-600 dark:text-neutral-400">
                  {featured.description}
                </p>
              )}
              <p className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700 dark:text-emerald-400">
                Read the review
                <span aria-hidden className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </p>
            </div>
          </Link>
        </section>
      )}

      {/* Article grid */}
      {rest.length > 0 && (
        <section>
          <h2 className="mb-6 text-xs font-semibold uppercase tracking-wider text-neutral-500">
            {currentPage === 1 ? "More reviews" : "All reviews"}
          </h2>
          <ul className="grid gap-4 sm:grid-cols-2">
            {rest.map((a) => (
              <li key={a.slug}>
                <ArticleCard article={a} />
              </li>
            ))}
          </ul>
        </section>
      )}

      <Pagination currentPage={currentPage} totalPages={totalPages} />

      {/* When only 1 article is published, fill the page with a "what's coming" section */}
      {rest.length === 0 && featured && site.upcomingArticles.length > 0 && (
        <section className="rounded-2xl border border-dashed border-neutral-300 bg-neutral-50 p-8 dark:border-neutral-800 dark:bg-neutral-900/50">
          <h2 className="font-serif text-xl font-bold text-neutral-900 dark:text-neutral-50">
            More reviews coming soon
          </h2>
          <p className="mt-3 max-w-prose text-neutral-600 dark:text-neutral-400">
            We&apos;re building out the cluster — comparison reviews and how-tos across the {site.niche}{" "}
            software space. Check back weekly.
          </p>
          <ul className="mt-5 grid gap-2 text-sm text-neutral-700 dark:text-neutral-300">
            {site.upcomingArticles.map((title) => (
              <li key={title} className="flex items-center gap-2">
                <span aria-hidden className="text-emerald-700 dark:text-emerald-400">
                  →
                </span>
                {title}
              </li>
            ))}
          </ul>
        </section>
      )}

      {articles.length === 0 && (
        <p className="rounded-md border border-dashed border-neutral-300 p-6 text-center text-neutral-500 dark:border-neutral-700">
          No articles published yet — check back soon.
        </p>
      )}
    </div>
  );
}
