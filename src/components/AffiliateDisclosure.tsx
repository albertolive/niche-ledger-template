import { site } from "@/lib/site";

export function AffiliateDisclosure() {
  // Hidden until the site carries real affiliate links — see
  // site.affiliateLinksActive. Showing it with zero affiliate links is
  // inaccurate; FTC disclosure only applies once links actually exist.
  if (!site.affiliateLinksActive) return null;

  return (
    <div className="rounded-md bg-neutral-50 p-4 text-xs text-neutral-600 dark:bg-neutral-900 dark:text-neutral-400">
      <strong className="block mb-1 text-neutral-700 dark:text-neutral-300">
        Affiliate disclosure
      </strong>
      {site.affiliateDisclosure}
    </div>
  );
}
