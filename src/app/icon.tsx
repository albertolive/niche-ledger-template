import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const runtime = "edge";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

// First letter of the first two words. "Lawn Care Ledger" → "LC",
// "Landlord's Ledger" → "LL". Keeps each forked site's favicon visually
// distinct from siblings (Google penalizes duplicate-looking favicons
// across a portfolio as a thin-content signal).
function deriveInitials(name: string): string {
  const words = name
    .replace(/[^\p{L}\s]/gu, " ")
    .split(/\s+/)
    .filter(Boolean);
  if (words.length === 0) return "·";
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}

export default function Icon() {
  const initials = deriveInitials(site.name);
  const bg = (site as { iconBgColor?: string }).iconBgColor ?? site.accentColor;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: bg,
          color: "#ffffff",
          fontSize: initials.length > 1 ? 16 : 22,
          fontWeight: 700,
          borderRadius: 8,
          fontFamily: "sans-serif",
          letterSpacing: "-0.04em",
        }}
      >
        {initials}
      </div>
    ),
    { ...size },
  );
}
