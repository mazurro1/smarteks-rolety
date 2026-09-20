import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";
import { NAMESPACES } from "@/constants/namespaces";

export const alt = "Smarteks - Szlabany parkingowe Warszawa";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const t = await getTranslations(NAMESPACES.SITE);
  const title = t("ogTitle");
  const subtitle = t("ogDescription");
  const phone = "737 531 193";

  return new ImageResponse(
    <div
      style={{
        background: "linear-gradient(135deg, #7b1f2e 0%, #5e1622 100%)",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        padding: "80px",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <div
        style={{
          background: "rgba(255,255,255,0.15)",
          border: "2px solid rgba(255,255,255,0.3)",
          borderRadius: "8px",
          padding: "10px 18px",
          color: "#ffffff",
          fontSize: "16px",
          fontWeight: 600,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          marginBottom: "28px",
          display: "flex",
        }}
      >
        Warszawa i Mazowsze
      </div>
      <div
        style={{
          color: "#ffffff",
          fontSize: "88px",
          fontWeight: 900,
          lineHeight: 1,
          marginBottom: "20px",
          letterSpacing: "-0.02em",
          display: "flex",
        }}
      >
        {title}
      </div>
      <div
        style={{
          color: "rgba(255,255,255,0.85)",
          fontSize: "34px",
          fontWeight: 400,
          marginBottom: "52px",
          lineHeight: 1.3,
          display: "flex",
        }}
      >
        {subtitle}
      </div>
      <div
        style={{
          display: "flex",
          gap: "36px",
          color: "rgba(255,255,255,0.7)",
          fontSize: "22px",
        }}
      >
        <span>{phone}</span>
        <span style={{ opacity: 0.5 }}>|</span>
        <span>{new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "").hostname}</span>
      </div>
    </div>,
    { ...size },
  );
}
