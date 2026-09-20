import type { MetadataRoute } from "next";
import { COLORS } from "@/constants/colors";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Smarteks Rolety — rolety zewnętrzne i bramy rolowane",
    short_name: "Smarteks Rolety",
    description:
      "Montaż i serwis rolet antywłamaniowych RC2 i RC3, adaptacyjnych, podtynkowych oraz bram rolowanych w Warszawie i okolicach.",
    start_url: "/",
    display: "standalone",
    orientation: "portrait-primary",
    background_color: COLORS.BG_BASE,
    theme_color: COLORS.BRAND_PRIMARY,
    lang: "pl",
    scope: "/",
    categories: ["business"],
    icons: [
      { src: "/icon", sizes: "any", type: "image/png", purpose: "any" },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    shortcuts: [
      {
        name: "Kontakt",
        url: "/kontakt",
        description: "Formularz wyceny i dane kontaktowe",
      },
      {
        name: "Oferta",
        url: "/oferta",
        description: "Rolety antywłamaniowe, adaptacyjne, podtynkowe i bramy rolowane",
      },
      {
        name: "Realizacje",
        url: "/realizacje",
        description: "Galeria zrealizowanych montaży",
      },
    ],
  };
}
