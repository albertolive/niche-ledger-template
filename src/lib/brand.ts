// Brand visual helpers shared by icon.tsx (favicon) and layout.tsx (header
// badge). Keeping them here so both surfaces stay in sync — if you change
// one, you change both. Forks should differentiate via site.iconBgColor +
// the emerald-palette @theme override in globals.css, not by editing this
// file.

import { site } from "./site";

/**
 * First letter of the first two words of `name`. Falls back to two-letter
 * slice for single-word names. "Lawn Care Ledger" → "LC", "Landlord's
 * Ledger" → "LL", "Stessa" → "ST". Identical to icon.tsx so the favicon
 * and the in-page header badge always agree.
 */
export function deriveInitials(name: string): string {
  const words = name
    .replace(/[^\p{L}\s]/gu, " ")
    .split(/\s+/)
    .filter(Boolean);
  if (words.length === 0) return "·";
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}

/**
 * The background color used for the favicon + header badge. Honors
 * site.iconBgColor when set (recommended for forks — Google flags
 * portfolios with near-identical favicons as a thin-content signal),
 * falls back to site.accentColor otherwise.
 */
export function iconBackground(): string {
  const maybe = (site as { iconBgColor?: string }).iconBgColor;
  return maybe ?? site.accentColor;
}
