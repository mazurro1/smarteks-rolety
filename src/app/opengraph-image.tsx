import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";
import { NAMESPACES } from "@/constants/namespaces";
import { CONTACT_INFO } from "@/constants/contact";
import { COLORS } from "@/constants/colors";

export const alt = "Smarteks Rolety — rolety zewnętrzne i antywłamaniowe, Warszawa";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const t = await getTranslations(NAMESPACES.SITE);
  const title = t("ogTitle");
  const subtitle = t("ogDescription");
  const host = process.env.NEXT_PUBLIC_SITE_URL
    ? new URL(process.env.NEXT_PUBLIC_SITE_URL).hostname
    : "smarteks.pl";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: COLORS.BG_BASE,
          fontFamily: "system-ui, sans-serif",
          position: "relative",
        }}
      >
        {/* Poswiata marki */}
        <div
          style={{
            position: "absolute",
            top: "-220px",
            right: "-120px",
            width: "760px",
            height: "760px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(142,31,63,0.55) 0%, rgba(14,14,16,0) 65%)",
            display: "flex",
          }}
        />

        {/* Lamele po prawej stronie */}
        <div
          style={{
            position: "absolute",
            right: "80px",
            top: "90px",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          {Array.from({ length: 12 }, (_, index) => (
            <div
              key={index}
              style={{
                width: "260px",
                height: "26px",
                borderRadius: "4px",
                background:
                  index > 8
                    ? "rgba(255,255,255,0.05)"
                    : "linear-gradient(180deg, #34343e 0%, #1c1c23 100%)",
                display: "flex",
              }}
            />
          ))}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "80px",
            width: "760px",
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "30px",
              padding: "10px 18px",
              borderRadius: "999px",
              border: "1px solid rgba(255,255,255,0.16)",
              background: "rgba(255,255,255,0.05)",
              color: COLORS.TEXT_SECONDARY,
              fontSize: "18px",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              alignSelf: "flex-start",
            }}
          >
            {CONTACT_INFO.SERVICE_AREA}
          </div>

          <div
            style={{
              display: "flex",
              color: COLORS.TEXT_PRIMARY,
              fontSize: "70px",
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              marginBottom: "22px",
            }}
          >
            {title}
          </div>

          <div
            style={{
              display: "flex",
              color: COLORS.TEXT_SECONDARY,
              fontSize: "28px",
              lineHeight: 1.4,
              marginBottom: "48px",
            }}
          >
            {subtitle}
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "24px",
              color: COLORS.BRAND_ACCENT,
              fontSize: "24px",
              fontWeight: 600,
            }}
          >
            <span>{CONTACT_INFO.PHONE}</span>
            <span style={{ color: "rgba(255,255,255,0.25)" }}>|</span>
            <span style={{ color: COLORS.TEXT_SECONDARY }}>{host}</span>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
