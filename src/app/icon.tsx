import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const runtime = "edge";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  const letter = (site.name.trim().charAt(0) || "·").toUpperCase();
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: site.accentColor,
          color: "#ffffff",
          fontSize: 22,
          fontWeight: 700,
          borderRadius: 8,
          fontFamily: "sans-serif",
        }}
      >
        {letter}
      </div>
    ),
    { ...size },
  );
}
