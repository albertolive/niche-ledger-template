/**
 * Single source of truth for every per-site customization.
 *
 * When forking this template, **this is the only file you should need to
 * edit** beyond writing the articles themselves. Layout, design tokens,
 * OG images, sitemap, About/Privacy/Contact, the homepage hero, and
 * analytics wiring all read from here.
 *
 * Anything that varies by NICHE goes here. Anything that varies by
 * DEPLOYMENT (env-specific secrets, GA ID, AdSense slot IDs) goes in
 * Vercel environment variables — see README and BOILERPLATE.md.
 */

export const site = {
  // ─── Brand identity ─────────────────────────────────────────────────
  /** TODO: Display name used in <title>, header, footer, OG cards. */
  name: "Niche Ledger",
  /** TODO: Short form for tight UI spots (mobile header, favicon initial). */
  shortName: "Niche Ledger",
  /** TODO: One-line value proposition — appears as the homepage h1. */
  tagline: "Independent reviews of [niche] software",
  /** TODO: ~150-char SEO description — appears in <meta description>. */
  description:
    "Reviews, comparisons, and how-tos for [niche] software. Independent, affiliate-supported.",
  /** TODO: Canonical site URL (your purchased domain). */
  url: "https://example.com",
  /** Optional Twitter handle (with @). Leave blank if none. */
  twitter: "",

  // ─── Visual identity ────────────────────────────────────────────────
  /**
   * TODO: Pick an accent color hex appropriate for your niche.
   *   Conservative B2B / finance: deep emerald (#047857), navy (#1e40af)
   *   Wellness / lifestyle:        warm coral (#dc2626), sage (#65a30d)
   *   Tech / modern:               indigo (#4f46e5), violet (#7c3aed)
   *   Real estate / property:      forest green (#047857) or amber (#d97706)
   *
   * Update globals.css too — accent CSS variables there reference this.
   */
  accentColor: "#047857",
  accentColorDark: "#10b981",
  /** OG image gradient — pick complementary darker shades of accentColor. */
  ogGradient: ["#15803d", "#052e16"] as const,
  /**
   * Optional favicon background override. Defaults to accentColor when
   * omitted. Set this when forking from an existing portfolio site to
   * ensure each favicon looks visibly distinct — Google flags portfolios
   * with near-identical favicons as a thin-content / PBN signal.
   */
  // iconBgColor: "#65a30d",

  // ─── Homepage hero ──────────────────────────────────────────────────
  /** TODO: Eyebrow pill text above the h1. */
  heroEyebrow: "Independent [niche] software reviews",
  /**
   * TODO: Three short trust signals shown below the hero subhead.
   * Keep them TRUE. Don't claim hands-on testing or first-person
   * experience you don't have — that's an E-E-A-T + integrity risk
   * (and affiliate networks / Google both penalize faked experience).
   * Safe research-based signals: "No paid placements", "Pricing
   * verified at the source", "Updated quarterly".
   */
  trustSignals: [
    "No paid placements",
    "Pricing verified at the source",
    "Updated quarterly",
  ] as const,

  // ─── Empty-state preview ────────────────────────────────────────────
  /**
   * TODO: Shown when only one article is published — fills the page.
   * Leave empty array [] to disable.
   */
  upcomingArticles: [
    "Article 1 title",
    "Article 2 title",
    "Article 3 title",
    "Article 4 title",
  ] as const,

  // ─── Contact / legal ────────────────────────────────────────────────
  /**
   * Email aliases used across About/Privacy/Contact pages. Combined with
   * the site's hostname at render time. Configure these as forwards on
   * your domain (most registrars include free email forwarding).
   */
  emailAliases: {
    general: "hello",
    corrections: "corrections",
    privacy: "privacy",
    partnerships: "partnerships",
  } as const,
  /** Plain-English affiliate disclosure for the site-wide footer. */
  affiliateDisclosure:
    "Some links on this site are affiliate links. We may earn a commission when you click through and sign up, at no extra cost to you. Rankings are based on features, pricing, and real user feedback — never on referral payout.",
  /**
   * Gates the site-wide footer affiliate disclosure. Keep false until the
   * site actually carries affiliate links — partner programs approve once we
   * have traffic/authority. A disclosure shown with zero affiliate links on
   * the page is inaccurate; flip to true the moment the first one ships.
   */
  affiliateLinksActive: false,

  // ─── Editorial methodology (about page) ─────────────────────────────
  /** TODO: The category/niche you cover. Example: "rental properties". */
  niche: "[niche]",
  /** TODO: Plural form of who the site serves. Example: "landlords". */
  audience: "[audience]",
  /**
   * TODO: How you research each tool — items in the methodology shown on
   * the About page. Keep these HONEST about what you actually do. If you
   * don't have hands-on experience, describe the real research process
   * (reviewing the live product, verifying pricing at source, reading
   * user feedback) rather than claiming "used for 30 days on real data".
   */
  testingChecklist: [
    "Review each tool's live product, feature set, and free-vs-paid boundary",
    "Verify every pricing claim against the vendor's current official pricing page",
    "Cross-reference real user feedback on Reddit and industry forums",
    "Compare each tool head-to-head on the features the audience actually uses",
    "Re-verify pricing and features each quarter and date every update",
  ] as const,
  /** How often you re-verify pricing + features. */
  reviewCadence: "quarterly",
  /** TODO: Date of last full cluster review (for About page). */
  lastReviewCycle: "TODO: Month YYYY",

  // ─── Monetization ───────────────────────────────────────────────────
  /**
   * AdSense Publisher ID (ca-pub-XXXXXXXXXXXXXXX) fallback. Prefer setting
   * NEXT_PUBLIC_ADSENSE_CLIENT in Vercel env vars instead — that way a new
   * fork can be monetized the moment AdSense approves the site, no code
   * push needed. The env var takes precedence over this committed value.
   *
   * Falsy on both disables AdSense entirely (script not rendered, slot
   * placeholders shown in dev only).
   */
  adsenseClient: "",
} as const;

export type SiteConfig = typeof site;

/**
 * Resolve the canonical site URL. Order:
 *   1. NEXT_PUBLIC_SITE_URL env var (manual override for previews/staging)
 *   2. VERCEL_URL (the deployment's automatic Vercel URL)
 *   3. localhost:3000 (dev)
 */
export function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) {
    return explicit.startsWith("http") ? explicit : `https://${explicit}`;
  }
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}

/**
 * Build a contact email for a given alias. Uses the site's hostname so
 * cloning the site to a new domain just works.
 *
 *   contactEmail("privacy") → "privacy@yourdomain.com"
 */
export function contactEmail(alias: keyof typeof site.emailAliases): string {
  const hostname = new URL(site.url).hostname.replace(/^www\./, "");
  return `${site.emailAliases[alias]}@${hostname}`;
}
