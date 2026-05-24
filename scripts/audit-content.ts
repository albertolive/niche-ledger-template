#!/usr/bin/env node
/**
 * Pre-publish content audit. Scans all non-draft articles for common
 * AI-generated-text tells and forbidden patterns that hurt SEO + reader
 * trust. Run before flipping any `draft: true → false`:
 *
 *   pnpm audit-content
 *
 * Two severity levels:
 *  - ERROR: blocks the deploy. Must be fixed.
 *  - WARN:  doesn't block but should be addressed before going live.
 *
 * Maintenance: when new tells appear in the wild, add patterns below.
 * Keep the list short — false positives erode trust in the audit.
 */

import fs from "node:fs";
import path from "node:path";

type Issue = { file: string; line: number; severity: "error" | "warn"; rule: string; snippet: string };

const ARTICLES_DIR = path.join(process.cwd(), "content", "articles");

// ─── Patterns to flag ──────────────────────────────────────────────

/** ERROR-level vocab: well-documented AI-generated tells. */
const BANNED_WORDS: { word: RegExp; rule: string }[] = [
  { word: /\bdelve\b/i, rule: "AI-tell: 'delve' is in the top-5 most-flagged AI words" },
  { word: /\bleverage\s+(this|the|a|our|your|to)\b/i, rule: "AI-tell: 'leverage' as verb reads corporate-AI" },
  { word: /\bharness\s+(the|its|your|our)\b/i, rule: "AI-tell: 'harness' is a top AI-generated verb" },
  { word: /\bseamless(ly)?\b/i, rule: "AI-tell: 'seamless' is a top AI marketing adjective" },
  { word: /\brobust\b/i, rule: "AI-tell: 'robust' is a top AI adjective" },
  { word: /\bcomprehensive\b/i, rule: "AI-tell: 'comprehensive' is a top AI adjective" },
  { word: /\bgame[-\s]changer/i, rule: "AI-tell: 'game-changer' — be specific about what changed" },
  { word: /\bparadigm shift\b/i, rule: "AI-tell: 'paradigm shift' — be specific" },
  { word: /\bin conclusion\b/i, rule: "AI-tell: 'in conclusion' as closer — just end the article" },
  { word: /let.{1,2}s dive (in|into)/i, rule: "AI-tell: 'let's dive in' opener" },
  { word: /\bnavigate\s+(the|your|this)\s+(complex|world|landscape|realm)/i, rule: "AI-tell: metaphorical 'navigate the X'" },
  { word: /\bempower\b/i, rule: "AI-tell: 'empower' is a top corporate-AI verb" },
  { word: /\bstreamline\b/i, rule: "AI-tell: 'streamline' is a top corporate-AI verb" },
  { word: /\bunleash\b/i, rule: "AI-tell: 'unleash' is a top corporate-AI verb" },
  { word: /\belevate\b/i, rule: "AI-tell: 'elevate' is a top corporate-AI verb" },
  { word: /\butilize\b/i, rule: "AI-tell: 'utilize' — use 'use'" },
  { word: /\btestament to\b/i, rule: "AI-tell: 'a testament to' — be specific" },
  { word: /\bin the realm of\b/i, rule: "AI-tell: 'in the realm of' — be specific" },
  { word: /\bin today.{1,3}s world\b/i, rule: "AI-tell: 'in today's world' opener" },
  { word: /\btapestry\b/i, rule: "AI-tell: 'tapestry' is a top AI metaphor" },
];

/** ERROR-level structural patterns. */
const BANNED_PATTERNS: { pattern: RegExp; rule: string }[] = [
  { pattern: /\b(not just|isn.{1,2}t just) [^.]{1,50} (but|.{1,5} it.s) /i, rule: "AI-tell: 'not just X but Y' construction" },
  { pattern: /\bwhether you.{1,3}re (a|an|the|just|new|building|looking|trying|running|starting) [^,]{1,40}, [^.]{1,80}/i, rule: "AI-tell: 'Whether you're X or Y' — pick one" },
  { pattern: /\bfrom [a-z]{1,15} to [a-z]{1,15}, /i, rule: "AI-tell: 'From X to Y' opener — pick one" },
];

/** WARN-level patterns: not errors but worth fixing. */
const SOFT_VOCAB: { word: RegExp; rule: string }[] = [
  { word: /\bhonest(ly)?\b/i, rule: "Soft: 'honest' overuse reads defensive — see writing-voice rules" },
  { word: /\b(simply|truly|really|literally)\b/i, rule: "Soft: weak intensifier — usually deletable" },
  { word: /\b(furthermore|moreover|consequently|notably|importantly)\b/i, rule: "Soft: AI-ish transition — usually deletable" },
];

/** Affiliate-link placeholder check (ERROR if article is non-draft). */
const PLACEHOLDER_LINK = /\bexample\.com\/[^)\s]+/g;
const PLACEHOLDER_IMAGE = /photo-XXXX/;

// ─── Article scanner ───────────────────────────────────────────────

function parseFrontmatter(content: string): { draft?: boolean; title?: string } {
  const match = content.match(/^---\s*\n([\s\S]*?)\n---/);
  if (!match) return {};
  const fm = match[1];
  return {
    draft: /^draft:\s*true\s*$/m.test(fm),
    title: fm.match(/^title:\s*"?([^"\n]+)"?\s*$/m)?.[1],
  };
}

function checkEmDashDensity(content: string, file: string): Issue[] {
  const count = (content.match(/—/g) || []).length;
  if (count > 5) {
    return [{
      file,
      line: 0,
      severity: "warn",
      rule: `Em-dash density: ${count} (target ≤5). Replace some with commas or periods — Google content-quality systems flag heavy em-dash usage as AI-generated`,
      snippet: "",
    }];
  }
  return [];
}

function checkLines(content: string, file: string, isDraft: boolean): Issue[] {
  const issues: Issue[] = [];
  const lines = content.split("\n");

  lines.forEach((line, idx) => {
    const lineno = idx + 1;
    const trimmed = line.trim();
    if (!trimmed) return;

    for (const { word, rule } of BANNED_WORDS) {
      const m = trimmed.match(word);
      if (m) {
        issues.push({ file, line: lineno, severity: "error", rule, snippet: trimmed.slice(0, 100) });
      }
    }
    for (const { pattern, rule } of BANNED_PATTERNS) {
      if (pattern.test(trimmed)) {
        issues.push({ file, line: lineno, severity: "error", rule, snippet: trimmed.slice(0, 100) });
      }
    }
    for (const { word, rule } of SOFT_VOCAB) {
      const m = trimmed.match(word);
      if (m) {
        issues.push({ file, line: lineno, severity: "warn", rule, snippet: trimmed.slice(0, 100) });
      }
    }
    if (!isDraft) {
      if (PLACEHOLDER_LINK.test(trimmed)) {
        issues.push({
          file,
          line: lineno,
          severity: "error",
          rule: "Placeholder example.com URL in non-draft article — must be replaced with real affiliate or vendor URL",
          snippet: trimmed.slice(0, 120),
        });
      }
      if (PLACEHOLDER_IMAGE.test(trimmed)) {
        issues.push({
          file,
          line: lineno,
          severity: "error",
          rule: "Cover image still has 'photo-XXXX' placeholder — pick a real Unsplash photo",
          snippet: trimmed.slice(0, 100),
        });
      }
    }
  });

  return issues;
}

// ─── Main ──────────────────────────────────────────────────────────

function audit(): { errors: number; warns: number } {
  if (!fs.existsSync(ARTICLES_DIR)) {
    console.log("No content/articles/ directory.");
    return { errors: 0, warns: 0 };
  }

  const files = fs
    .readdirSync(ARTICLES_DIR)
    .filter((f) => (f.endsWith(".mdx") || f.endsWith(".md")) && !f.startsWith("_"));

  const allIssues: Issue[] = [];

  for (const file of files) {
    const fullPath = path.join(ARTICLES_DIR, file);
    const content = fs.readFileSync(fullPath, "utf8");
    const { draft = true } = parseFrontmatter(content);
    const rel = path.relative(process.cwd(), fullPath);
    allIssues.push(...checkLines(content, rel, draft));
    allIssues.push(...checkEmDashDensity(content, rel));
  }

  const errors = allIssues.filter((i) => i.severity === "error");
  const warns = allIssues.filter((i) => i.severity === "warn");

  if (errors.length === 0 && warns.length === 0) {
    console.log("✓ Content audit clean — no AI-tells or placeholder URLs detected.");
    return { errors: 0, warns: 0 };
  }

  console.log(`\nContent audit found ${errors.length} error${errors.length === 1 ? "" : "s"} and ${warns.length} warning${warns.length === 1 ? "" : "s"}.\n`);

  // Group by file
  const byFile = new Map<string, Issue[]>();
  for (const issue of allIssues) {
    const arr = byFile.get(issue.file) ?? [];
    arr.push(issue);
    byFile.set(issue.file, arr);
  }

  for (const [file, fileIssues] of byFile) {
    console.log(`\n${file}`);
    for (const issue of fileIssues) {
      const prefix = issue.severity === "error" ? "✗ ERROR" : "⚠ WARN ";
      const loc = issue.line > 0 ? `:${issue.line}` : "";
      console.log(`  ${prefix}${loc}  ${issue.rule}`);
      if (issue.snippet) console.log(`           ${issue.snippet}`);
    }
  }

  return { errors: errors.length, warns: warns.length };
}

const result = audit();
process.exit(result.errors > 0 ? 1 : 0);
