import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${site.name} — ${site.tagline}`;

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: `linear-gradient(135deg, ${site.ogGradient[0]} 0%, ${site.ogGradient[1]} 100%)`,
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 36, fontWeight: 700, marginBottom: 24 }}>{site.name}</div>
        <div style={{ fontSize: 64, fontWeight: 800, lineHeight: 1.1, marginBottom: 24 }}>
          {site.tagline}
        </div>
        <div style={{ fontSize: 28, opacity: 0.85, maxWidth: 900 }}>{site.description}</div>
      </div>
    ),
    { ...size },
  );
}
