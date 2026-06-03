import Link from "next/link";

type Props = {
  currentPage: number;
  totalPages: number;
};

export function Pagination({ currentPage, totalPages }: Props) {
  if (totalPages <= 1) return null;

  const prev = currentPage > 1 ? (currentPage === 2 ? "/" : `/?page=${currentPage - 1}`) : null;
  const next = currentPage < totalPages ? `/?page=${currentPage + 1}` : null;

  return (
    <nav
      className="mt-12 flex items-center justify-between border-t border-neutral-200 pt-6 dark:border-neutral-800"
      aria-label="Pagination"
    >
      {prev ? (
        <Link
          href={prev}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
        >
          ← Previous
        </Link>
      ) : (
        <span />
      )}
      <span className="text-sm text-neutral-500">
        Page {currentPage} of {totalPages}
      </span>
      {next ? (
        <Link
          href={next}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
        >
          Next →
        </Link>
      ) : (
        <span />
      )}
    </nav>
  );
}
