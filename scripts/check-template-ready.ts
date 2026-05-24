#!/usr/bin/env node
/**
 * Pre-deploy strict check: fails the build if site.ts still has any TODO
 * placeholder values. Run this in CI or as a pre-deploy hook.
 *
 *   pnpm run check-ready
 *
 * Exits with code 1 if any unset placeholders are found. The error message
 * lists exactly which fields still need editing.
 */

import { site } from "../src/lib/site";

const PLACEHOLDER_PATTERNS = [/TODO/i, /\[niche\]/i, /\[audience\]/i, /\[users\]/i];

type Issue = { field: string; value: string; reason: string };

function check(field: string, value: string, reason = "still has placeholder"): Issue | null {
  for (const pat of PLACEHOLDER_PATTERNS) {
    if (pat.test(value)) {
      return { field, value, reason };
    }
  }
  return null;
}

const issues: Issue[] = [];

function push(maybe: Issue | null) {
  if (maybe !== null) issues.push(maybe);
}

push(check("name", site.name));
push(check("shortName", site.shortName));
push(check("tagline", site.tagline));
push(check("description", site.description));
push(check("heroEyebrow", site.heroEyebrow));
push(check("niche", site.niche));
push(check("audience", site.audience));
push(check("lastReviewCycle", site.lastReviewCycle));

for (const signal of site.trustSignals) {
  push(check("trustSignals[]", signal));
}
for (const article of site.upcomingArticles) {
  push(check("upcomingArticles[]", article));
}

// The TypeScript literal type for site.url makes a direct === comparison to
// "https://example.com" narrow to `never`, so we use String() to widen.
const urlString = String(site.url);
if (urlString === "https://example.com" || !urlString.startsWith("https://")) {
  issues.push({
    field: "url",
    value: urlString,
    reason: "still example.com or not https",
  });
}

if (issues.length === 0) {
  console.log("✓ site.ts is ready for deploy — all placeholders replaced.");
  process.exit(0);
}

console.error("✗ site.ts still has placeholder values — finish customizing before deploy:\n");
for (const issue of issues) {
  console.error(`  ${issue.field}: "${issue.value}" — ${issue.reason}`);
}
console.error(`\n${issues.length} field${issues.length === 1 ? "" : "s"} need editing.`);
process.exit(1);
