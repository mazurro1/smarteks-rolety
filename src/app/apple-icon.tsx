import { ImageResponse } from "next/og";
import { COLORS } from "@/constants/colors";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: COLORS.BRAND_PRIMARY,
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
          color: COLORS.WHITE,
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <div
            style={{
              width: "72px",
              height: "8px",
              borderRadius: "3px",
              background: "rgba(255,255,255,0.95)",
            }}
          />
          <div
            style={{
              width: "72px",
              height: "8px",
              borderRadius: "3px",
              background: "rgba(255,255,255,0.65)",
            }}
          />
          <div
            style={{
              width: "72px",
              height: "8px",
              borderRadius: "3px",
              background: "rgba(255,255,255,0.4)",
            }}
          />
        </div>
        <div style={{ display: "flex", fontSize: 34, fontWeight: 900 }}>S</div>
      </div>
    ),
    { ...size },
  );
}
