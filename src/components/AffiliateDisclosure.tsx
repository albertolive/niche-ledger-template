import { site } from "@/lib/site";

export function AffiliateDisclosure() {
  return (
    <div className="rounded-md bg-neutral-50 p-4 text-xs text-neutral-600 dark:bg-neutral-900 dark:text-neutral-400">
      <strong className="block mb-1 text-neutral-700 dark:text-neutral-300">
        Affiliate disclosure
      </strong>
      {site.affiliateDisclosure}
    </div>
  );
}
