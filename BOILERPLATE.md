# Boilerplate setup guide

Create a new niche review site from this template in 30 minutes.

## 0. Prerequisites

- Node 20+ and `pnpm` installed
- A GitHub account with `gh` CLI authenticated
- A Vercel account (free tier is fine)
- ~$10 for a `.com` or `.net` domain (Cloudflare Registrar or Porkbun recommended)

## 1. Create the repo from this template (1 min)

```bash
gh repo create my-niche-site --template albertolive/niche-ledger-template --private --clone
cd my-niche-site
pnpm install
```

Replace `my-niche-site` with your actual repo name. Pattern that works well: `<keyword>-ledger` or `<keyword>-reviews`.

## 2. Edit `src/lib/site.ts` (10 min)

This is the **only file you need to edit** to rebrand the entire site. Every page, OG image, sitemap, and meta tag reads from here.

Find every line with `// TODO:` and replace the value. Specifically:

| Field | What to enter |
|---|---|
| `name` | Site display name (e.g., `"Landscaper Tools"`) |
| `shortName` | Mobile-friendly version (usually same as `name`) |
| `tagline` | One-line value prop (e.g., `"Honest reviews of lawn-care CRM software"`) |
| `description` | ~150 char SEO description for SERP + OG |
| `url` | Your purchased domain URL (use `https://www.yourdomain.com`) |
| `accentColor` + `accentColorDark` | Hex colors for accent — match `ogGradient` to these |
| `ogGradient` | Two darker shades of your accent for OG image background |
| `heroEyebrow` | Eyebrow pill text above the homepage h1 |
| `trustSignals` | 3 short trust signals (e.g., "Tested on real X", "No paid placements") |
| `upcomingArticles` | 3-5 article titles for the empty-state preview |
| `niche` | Niche descriptor (e.g., `"lawn-care businesses"`) |
| `audience` | Who you serve (e.g., `"landscapers"`) |
| `testingChecklist` | 5-10 bullets describing your review methodology |
| `lastReviewCycle` | Date string for the About page (e.g., `"May 2026"`) |
| `adsenseClient` | Leave empty `""` for now — add after AdSense approves you |

Run the strict check:

```bash
pnpm check-ready
```

This fails if any TODO placeholder remains. Fix anything it flags.

## 3. Update accent colors in `globals.css` (2 min)

Open `src/app/globals.css`. The `--accent` CSS variable is defined in `:root` and `@media (prefers-color-scheme: dark) :root`. Replace these two hex values with your `accentColor` and `accentColorDark` from `site.ts`.

```css
:root {
  --accent: #047857;       /* ← change to your accentColor */
  --accent-hover: #065f46; /* ← darker shade */
  ...
}

@media (prefers-color-scheme: dark) {
  :root {
    --accent: #10b981;     /* ← change to your accentColorDark */
    --accent-hover: #34d399;
    ...
  }
}
```

(Future improvement: this could be wired directly from `site.ts` via inline style. For now, manual two-line edit is acceptable.)

## 4. Write your first article (15-30 min)

Copy the template:

```bash
cp content/articles/_template.mdx content/articles/your-first-article-slug.mdx
```

Edit the frontmatter:

```yaml
---
title: "Your headline written as a Google query"
description: "155-char summary for SERP + OG cards"
publishedAt: "2026-05-24"
tags:
  - relevant-tag
coverImage: "https://images.unsplash.com/photo-XXX?w=1600&q=80"
coverImageAlt: "Description of the image"
coverImageCredit: "Photo by [name] on Unsplash"
draft: false   # set to false to publish
---
```

Pick a free Unsplash image at https://unsplash.com — use the "Copy image link" option to get the `images.unsplash.com/photo-XXX` URL.

Delete the sample files when ready:

```bash
rm content/articles/_hello-world.mdx
```

Keep `_template.mdx` as a scaffold for future articles. Files starting with `_` are excluded from the published list.

## 5. Test locally (2 min)

```bash
pnpm dev
# open http://localhost:3000
```

Verify:
- Homepage shows your hero, trust signals, and the featured article
- Article page renders with cover image, tags, reading time
- Tables in MDX render as actual `<table>` elements (not raw `|`-pipe text)
- About / Privacy / Contact pages show your `site.ts` values

Run the full check:

```bash
pnpm check-ready
pnpm typecheck
pnpm test
pnpm build
```

All four must pass.

## 6. Buy a domain (5 min)

Recommended registrars (cheapest, no upsells):
- **Cloudflare Registrar** — at-cost pricing, no markup
- **Porkbun** — close to at-cost
- **Vercel** — convenient but slightly more expensive

Best TLD: `.com` if available. Fallback: `.net` ($10-12/yr, no SEO penalty vs `.com`). Avoid `.online`, `.site`, `.xyz` — high renewal prices + low user trust.

If using www subdomain (recommended for cookie/SEO reasons), set:
- A record `@` → `216.198.79.1` (Vercel)
- CNAME `www` → assigned by Vercel after connecting

## 7. Connect to Vercel (3 min)

```bash
git push
# Vercel auto-detects the repo if you've connected GitHub previously
```

Or manually:
1. Vercel Dashboard → Add New → Project → Import your GitHub repo
2. Framework auto-detected as Next.js
3. Click Deploy

After first deploy:
1. Project Settings → Domains → Add your purchased domain
2. Follow Vercel's DNS instructions at your registrar

## 8. Wire analytics (5 min)

Create a GA4 property at https://analytics.google.com:
1. Admin → Create → Property → Web stream → enter your domain
2. Copy the Measurement ID (looks like `G-XXXXXXXXXX`)

In Vercel:
1. Project Settings → Environment Variables
2. Add `NEXT_PUBLIC_GA_ID` = `G-XXXXXXXXXX`
3. Apply to: Production, Preview, Development

Trigger a redeploy (push any commit OR Vercel → Deployments → Redeploy). The GA scripts now render only when the env var is set — no GA loaded in template instances that haven't configured it.

## 9. Submit to Google Search Console (5 min)

1. https://search.google.com/search-console
2. Add property → URL prefix → `https://yourdomain.com`
3. Verify via Vercel's HTML meta tag OR DNS TXT
4. Submit `https://yourdomain.com/sitemap.xml`
5. Use URL Inspection on your first article and click "Request indexing"

Expected indexing time: 24-72 hours.

## 10. Apply for AdSense (after 5+ articles + 30 days)

Don't apply too early — AdSense rejects sites with thin content or low age. Wait until you have:
- 5-10 published articles
- 30+ days of site age
- About / Privacy / Contact pages (included in this template ✓)

Then:
1. https://adsense.google.com → Get Started
2. Enter your site URL
3. Get your publisher ID (`ca-pub-XXXXXXXXXXXXXXX`)
4. Add the publisher ID to `src/lib/site.ts` (`adsenseClient` field)
5. Push — the AdSense verification script now loads on every page
6. Click "Verify" in the AdSense dashboard

After approval: AdSense creates ad units, you get slot IDs, you wire them into `src/components/AdSensePlacement.tsx`. (Currently placeholders.)

## 11. Apply for affiliate programs

For your niche's vendors, sign up for their affiliate programs. Replace the placeholder URLs in your articles:

```diff
- [Try Tool A](https://example.com/?ref=YOUR_AFFILIATE_ID)
+ [Try Tool A](https://tool-a.com/?ref=ACTUAL_ID)
```

Once a vendor approves you (1-3 days typical), update all references in your MDX articles with their real affiliate URL or partner-link.

## Done

Your site is live, indexed, monetization-ready, and design-complete. Next 4-12 weeks: write 5-15 more articles in the cluster, watch Search Console for impressions, optimize what ranks.

---

## Architecture notes

**Why a template instead of a monorepo?**

Each site:
- Has its own GitHub repo (independent commits, issues, deploys)
- Has its own Vercel project (independent metrics, env vars)
- Has its own domain (independent SEO authority)
- Has its own custom branding (different niches, different audiences)

Monorepo + shared package would couple them in ways that don't fit indie review sites.

**Updating the template after sites are forked**

GitHub Templates create copies — forked sites don't auto-pull template improvements. To propagate a fix:
- Cherry-pick the commit from the template into the forked site, OR
- Manually port the change

Most template improvements are infrastructure (build, deps, design) — they get sticky over time and propagation isn't critical.

**Why not a CLI scaffolder?**

`gh repo create --template` is the lowest-friction option for the 8-10 site portfolio scale. A CLI would be overkill until you're spinning up 50+ sites.

## Troubleshooting

**`pnpm check-ready` fails on initial setup** — that's expected; finish the `site.ts` edits first.

**Vercel deploy succeeds but domain shows 404** — DNS propagation can take 30-60 min. Check `dig www.yourdomain.com` and verify the CNAME points to Vercel.

**AdSense verification fails** — ensure `adsenseClient` is set in `site.ts` and the latest deploy is live. Verify with `curl -sL https://yourdomain.com | grep adsbygoogle.js` — should find the script in raw HTML.

**MDX tables render as `|`-pipe text** — verify `remark-gfm` is installed and wired in `src/app/articles/[slug]/page.tsx` (already done in template).

**Cookie consent dialog blocks the page** — that's Google's AdSense GDPR consent UI. If you don't want it, remove the AdSense client from `site.ts` (set to empty string) until you actually need ads.
