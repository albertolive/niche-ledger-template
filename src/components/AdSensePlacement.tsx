/**
 * Placeholder for AdSense ad units. Replace the inner block with the real
 * AdSense snippet (ins tag) once your AdSense account is approved and you
 * have a publisher ID. In dev, renders a labelled box so layout is preserved.
 */
export function AdSensePlacement({
  slot,
  className = "",
}: {
  slot: "in-article" | "sidebar" | "footer";
  className?: string;
}) {
  if (process.env.NEXT_PUBLIC_ADSENSE_CLIENT && process.env.NEXT_PUBLIC_ADSENSE_SLOT_ID) {
    // Real AdSense unit — fill in once approved.
    return (
      <div className={`my-8 ${className}`}>
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <ins
          className="adsbygoogle block"
          style={{ display: "block" }}
          data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT}
          data-ad-slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_ID}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    );
  }
  return (
    <div
      className={`my-8 rounded-md border border-dashed border-neutral-300 bg-neutral-50 p-4 text-center text-xs text-neutral-500 dark:border-neutral-700 dark:bg-neutral-900 ${className}`}
    >
      [AdSense {slot} placeholder — wire NEXT_PUBLIC_ADSENSE_CLIENT once approved]
    </div>
  );
}
