# niche-ledger-template

Production-ready Next.js 16 boilerplate for niche affiliate review sites. Fork this template, edit one config file, write articles, deploy.

## What's included

| | |
|---|---|
| **Stack** | Next.js 16 (App Router) · React 19 · Tailwind 4 · Turbopack |
| **Content** | MDX articles via `next-mdx-remote` + `remark-gfm` (real tables, autolinks, task lists) |
| **Design** | Editorial serif/sans typography (Source Serif 4 + Geist), dark mode, accent-color CSS variables |
| **SEO** | Per-page metadata, OG images (dynamic), sitemap, robots.txt, canonical URLs |
| **Analytics** | Google Analytics 4 wired via `NEXT_PUBLIC_GA_ID` env var (renders only when set) |
| **Ads** | AdSense loader + slot placement scaffolding, gated on publisher ID |
| **Legal** | About, Privacy Policy (GDPR/CCPA-ready), Contact pages — all driven by config |
| **Testing** | Vitest config-shape tests + pre-deploy strict check (`pnpm check-ready`) |

## Start a new site in 30 minutes

See **[BOILERPLATE.md](./BOILERPLATE.md)** for the full step-by-step. The short version:

```bash
gh repo create my-niche-site --template albertolive/niche-ledger-template --private --clone
cd my-niche-site
pnpm install
# Edit src/lib/site.ts — replace every "TODO:" with real values
# Add your first article to content/articles/<slug>.mdx
pnpm dev    # http://localhost:3000
```

Then:
1. Buy a domain (recommend `.com`, fallback `.net`)
2. Connect to Vercel
3. Set `NEXT_PUBLIC_GA_ID` env var (after creating GA4 property)
4. Set up AdSense publisher ID in `src/lib/site.ts` after AdSense approval
5. `git push` — live in <1 minute

## Why this template exists

The pattern: build 3-5 niche affiliate review sites at ~$500/mo each = portfolio income. The friction wasn't ideation (the niche radar handles that) — it was the 4-6 hours per site of duplicate setup: design system, MDX rendering, OG images, About/Privacy/Contact, AdSense verification, GA wiring, sitemap, robots, accessibility.

This template makes that setup a 5-minute fork.

## Sister projects (portfolio)

See `PORTFOLIO.md` in **opportunity-radar** for the full 5-repo portfolio map.

- **[opportunity-radar](https://github.com/albertolive/opportunity-radar)** — niche-discovery engine that surfaces what to build next
- **[landlord-ledger](https://github.com/albertolive/landlord-ledger)** — instance #1 (landlord accounting software niche), live at landlordsledger.com
- **[lawn-care-ledger](https://github.com/albertolive/lawn-care-ledger)** — instance #2 (lawn care / landscaping software niche), pre-deploy

## Verifying before deploy

```bash
pnpm typecheck    # TypeScript strict mode passes
pnpm test         # site config shape tests pass
pnpm check-ready  # STRICT — fails if any TODO placeholder remains
pnpm build        # production build succeeds
```

All four pass = ready to deploy.

## License

MIT — fork, customize, ship.
