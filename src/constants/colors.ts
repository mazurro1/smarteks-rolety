export const COLORS = {
  // Brand
  BRAND_PRIMARY: "#8e1f3f",
  BRAND_PRIMARY_DARK: "#6c1730",
  BRAND_PRIMARY_LIGHT: "#a6254a",
  BRAND_ACCENT: "#e0527a",

  // Surfaces
  BG_BASE: "#0e0e10",
  BG_RAISED: "#121216",
  BG_SURFACE: "#17171c",
  BG_ELEVATED: "#1e1e25",

  // Text
  TEXT_PRIMARY: "#f2f2f4",
  TEXT_SECONDARY: "#a5a5ae",
  TEXT_MUTED: "#8a8a94",

  // Lines
  LINE: "rgba(255, 255, 255, 0.08)",
  LINE_STRONG: "rgba(255, 255, 255, 0.16)",

  // Utility
  WHITE: "#ffffff",
  BLACK: "#000000",
  OVERLAY: "rgba(6, 6, 8, 0.72)",

  // Status
  SUCCESS: "#3ddc91",
  ERROR: "#ff6b6b",
  WARNING: "#f5b84c",
} as const;

export type ColorKey = keyof typeof COLORS;
