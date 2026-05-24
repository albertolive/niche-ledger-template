import { ImageResponse } from "next/og";
import { getArticleBySlug } from "@/lib/articles";
import { site } from "@/lib/site";

export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: { slug: string } }) {
  const article = getArticleBySlug(params.slug);
  const title = article?.title ?? site.name;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: `linear-gradient(135deg, ${site.ogGradient[0]} 0%, ${site.ogGradient[1]} 100%)`,
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 32, fontWeight: 600, opacity: 0.85 }}>{site.name}</div>
        <div style={{ fontSize: 60, fontWeight: 800, lineHeight: 1.15 }}>{title}</div>
        <div style={{ fontSize: 24, opacity: 0.7 }}>{site.tagline}</div>
      </div>
    ),
    size,
  );
}
