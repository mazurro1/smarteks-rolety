"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    const headerHeight = parseInt(
      getComputedStyle(document.documentElement)
        .getPropertyValue("--scroll-top")
        .trim() || "0",
      10,
    );

    const { hash } = window.location;
    if (hash) {
      const id = hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        const top =
          element.getBoundingClientRect().top +
          window.pageYOffset -
          headerHeight;
        window.scrollTo({ top, behavior: "auto" });
        return;
      }
    }

    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname]);

  return null;
}
