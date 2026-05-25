import Image from "next/image";
import Link from "next/link";
import type { ArticleMeta } from "@/types/article";

export function ArticleCard({ article }: { article: ArticleMeta }) {
  return (
    <Link
      href={`/articles/${article.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white transition-all hover:border-emerald-300 hover:shadow-sm dark:border-neutral-800 dark:bg-neutral-950 dark:hover:border-emerald-800"
    >
      {article.coverImage && (
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-neutral-100 dark:bg-neutral-900">
          <Image
            src={article.coverImage}
            alt={article.coverImageAlt ?? article.title}
            fill
            sizes="(max-width: 640px) 100vw, 350px"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col p-5">
        {article.tags && article.tags.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-1">
            {article.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-neutral-100 px-2 py-0.5 text-[11px] font-medium text-neutral-600 dark:bg-neutral-900 dark:text-neutral-400"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        <h3 className="text-balance font-semibold leading-snug text-neutral-900 group-hover:text-emerald-800 dark:text-neutral-50 dark:group-hover:text-emerald-300">
          {article.title}
        </h3>
        {article.description && (
          <p className="mt-2 line-clamp-3 text-pretty text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
            {article.description}
          </p>
        )}
        {article.publishedAt && (
          <p className="mt-auto pt-4 text-xs text-neutral-500">
            {new Date(article.publishedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </p>
        )}
      </div>
    </Link>
  );
}
