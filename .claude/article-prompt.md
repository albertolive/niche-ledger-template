# Weekly article routine

Draft ONE new article for this content site and open it as a pull request for human review. Leave `draft: true`. Do NOT merge, and do NOT publish anything live. A human reviews the PR before it goes out, that review is the fact-accuracy gate, so your job is to make the draft correct and ready, not to ship it.

## 1. Understand the site

- Read `src/lib/site.ts` for the niche, audience, and trust signals.
- List `content/articles/*.mdx` (ignore files starting with `_`). Read two existing published articles in full to match the voice, structure, and frontmatter exactly.

## 2. Pick the next topic — no duplicates

Choose ONE cluster-gap topic that does not overlap any existing article. Good shapes: a tool comparison ("X vs Y"), a "best <category> for <audience>" roundup, or an adjacent how-to. Check every existing title and slug first; if your idea is close to one that exists, pick a different one.

## 3. Research with NO assumptions

- Verify every factual claim (pricing, tiers, fees, plan limits, features) against the vendor's LIVE pricing page via WebSearch and WebFetch. Never state a number from memory, pricing goes stale.
- If a fact cannot be verified from the source, hedge it ("around $X, confirm on the vendor's pricing page") instead of asserting it. Any tax or legal claim must be checked against an authoritative source (IRS.gov, etc.).
- Pull two or three real, sourced practitioner quotes (Capterra, BBB, Reddit, forums) with working source URLs for a "what practitioners report" section. Never invent a quote or a source.

## 4. Write the article — match the existing voice

- Frontmatter: `title`, `description` (~155 chars), `publishedAt` (today's date), `tags`, a cover image, `coverImageAlt`, `coverImageCredit: "Photo via Unsplash"`, and `draft: true`.
- Cover image: reuse a `coverImage` URL that another article in this repo already uses (those are known to load), but pick one that is NOT used by any article you reference in "Related articles", a duplicate hero next to a sibling post reads thin. Do not invent a new Unsplash photo ID, you cannot confirm it resolves. Make `coverImageAlt` describe that image honestly, and note in the PR that the cover should still be reviewed and swapped for a unique photo.
- Body: lead with the short answer, then a comparison table, a detailed breakdown, an FAQ, and a "Related articles" list linking to real existing slugs (`/articles/<slug>`).
- Links: include a plain vendor link for EACH tool you review (e.g. `[Visit Vendor](https://www.vendor.com/)`) so readers can act on the recommendation. PLAIN vendor URLs only. This site has NO affiliate program. Do NOT add `?ref=`, affiliate links, "referral link", or any "we earn a commission" language.
- Do NOT use em-dash (`—`) characters anywhere. Use commas, periods, or parentheses.
- Research-based framing only. NEVER claim first-person experience ("we tested / used / own").
- Add an MDX comment near the top (`{/* ... */}`, NOT an HTML `<!-- -->` comment, which breaks the MDX build once the article is published) noting this is an auto-drafted article pending human review, and listing the source URLs you verified.

## 5. Verify before opening the PR

- Run `pnpm install`, then `pnpm audit-content`. It MUST report 0 errors. Fix anything it flags (AI-tell words, placeholder URLs, missing coverImage, em-dash density).
- Run `pnpm build` and confirm the new article compiles. Watch for `<` directly before a digit (e.g. `<10`), which breaks MDX, write "fewer than 10" instead. NOTE: a `draft: true` article is skipped by the build, so to truly verify it compiles, temporarily flip it to `draft: false`, run `pnpm build`, then set it back to `draft: true` before opening the PR.

## 6. Open the PR

Commit the new `content/articles/<slug>.mdx` on a new branch and open a pull request titled `Draft: <article title>`. In the PR body, list the chosen topic, every source URL you verified, and any facts you could only hedge. Stop there. A human merges.

End the PR body with this publish checklist (verbatim), because merging alone does NOT publish, an article merged with `draft: true` silently never appears on the site:

```markdown
## Before this goes live
- [ ] Review facts, sources, and the cover image
- [ ] Flip `draft: true` to `draft: false` (in this PR or a follow-up commit), the merge alone does not publish
- [ ] After deploy, confirm the article renders at `/articles/<slug>`
```
