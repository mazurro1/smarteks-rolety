import { ImageResponse } from "next/og";
import { COLORS } from "@/constants/colors";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: COLORS.BRAND_PRIMARY,
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: COLORS.WHITE,
          fontSize: 21,
          fontWeight: 900,
          fontFamily: "system-ui, sans-serif",
          borderRadius: "5px",
        }}
      >
        S
      </div>
    ),
    { ...size },
  );
}
