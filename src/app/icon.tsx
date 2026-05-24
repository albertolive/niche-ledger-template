import { ImageResponse } from "next/og";
import { deriveInitials, iconBackground } from "@/lib/brand";
import { site } from "@/lib/site";

export const runtime = "edge";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  const initials = deriveInitials(site.name);
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: iconBackground(),
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
