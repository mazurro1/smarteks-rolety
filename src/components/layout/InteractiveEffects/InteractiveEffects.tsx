"use client";

import { useEffect } from "react";
import { REDUCED_MOTION_QUERY } from "@/lib/useMediaQuery";

/** Maks. przesuniecie przycisku "magnetycznego", px. */
const MAGNET_X = 7;
const MAGNET_Y = 5;
/** Maks. pochylenie karty, stopnie. */
const TILT_DEG = 6;

/**
 * Efekty kursora dla calej strony - tylko mysz/touchpad, bez ograniczonego ruchu:
 * - [data-magnetic]: przycisk lekko podaza za kursorem,
 * - [data-tilt]: karta pochyla sie w 3D, po powierzchni przesuwa sie odblask.
 * Jeden nasluch pointermove + requestAnimationFrame; tresc i znaczniki bez zmian.
 */
export default function InteractiveEffects() {
  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia(REDUCED_MOTION_QUERY);
    if (!fine.matches || reduced.matches) return;

    let frame = 0;
    let x = 0;
    let y = 0;
    let target: Element | null = null;
    let magnet: HTMLElement | null = null;
    let tilt: HTMLElement | null = null;

    const release = (element: HTMLElement | null, kind: "magnet" | "tilt") => {
      if (!element) return;
      if (kind === "magnet") {
        element.style.removeProperty("--magnet-x");
        element.style.removeProperty("--magnet-y");
      } else {
        element.style.removeProperty("--tilt-axis");
        element.style.removeProperty("--tilt-angle");
        element.style.removeProperty("--glare-opacity");
      }
    };

    const update = () => {
      frame = 0;

      const nextMagnet = target?.closest<HTMLElement>("[data-magnetic]") ?? null;
      if (nextMagnet !== magnet) release(magnet, "magnet");
      magnet = nextMagnet;
      if (magnet) {
        const rect = magnet.getBoundingClientRect();
        const dx = (x - (rect.left + rect.width / 2)) / (rect.width / 2);
        const dy = (y - (rect.top + rect.height / 2)) / (rect.height / 2);
        magnet.style.setProperty("--magnet-x", `${dx * MAGNET_X}px`);
        magnet.style.setProperty("--magnet-y", `${dy * MAGNET_Y}px`);
      }

      const nextTilt = target?.closest<HTMLElement>("[data-tilt]") ?? null;
      if (nextTilt !== tilt) release(tilt, "tilt");
      tilt = nextTilt;
      if (tilt) {
        const rect = tilt.getBoundingClientRect();
        const nx = (x - rect.left) / rect.width - 0.5;
        const ny = (y - rect.top) / rect.height - 0.5;
        const length = Math.hypot(nx, ny) || 1;
        // Os obrotu prostopadla do kierunku kursora - karta "ugina sie" pod nim.
        tilt.style.setProperty("--tilt-axis", `${-ny / length} ${nx / length} 0`);
        tilt.style.setProperty("--tilt-angle", `${Math.min(1, length * 2) * TILT_DEG}deg`);
        tilt.style.setProperty("--glare-x", `${(nx + 0.5) * 100}%`);
        tilt.style.setProperty("--glare-y", `${(ny + 0.5) * 100}%`);
        tilt.style.setProperty("--glare-opacity", "1");
      }
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      x = event.clientX;
      y = event.clientY;
      target = event.target instanceof Element ? event.target : null;
      if (!frame) frame = requestAnimationFrame(update);
    };

    const onLeave = () => {
      release(magnet, "magnet");
      release(tilt, "tilt");
      magnet = null;
      tilt = null;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      onLeave();
    };
  }, []);

  return null;
}
