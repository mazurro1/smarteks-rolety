"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { CONTACT_INFO } from "@/constants/contact";
import { REDUCED_MOTION_QUERY, useMediaQuery } from "@/lib/useMediaQuery";
import styles from "./ShutterTransition.module.css";

type Phase = "idle" | "closing" | "closed" | "opening";

const CLOSE_MS = 480;
const OPEN_MS = 650;
/** Gdyby nawigacja sie nie powiodla - roleta i tak sie podnosi. */
const FALLBACK_MS = 5000;

/** Klikniecie, ktore powinno przejsc zwykla droga (nowa karta, inny serwis, kotwica). */
function targetPath(event: MouseEvent): string | null {
  if (
    event.defaultPrevented ||
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey
  ) {
    return null;
  }
  const anchor = (event.target as Element | null)?.closest?.("a");
  if (!anchor || anchor.hasAttribute("download")) return null;
  if (anchor.target && anchor.target !== "_self") return null;

  const url = new URL(anchor.href, window.location.href);
  if (url.origin !== window.location.origin) return null;
  if (url.pathname === window.location.pathname) return null;
  // Pliki (RSS, obrazy, PDF) otwieraja sie zwyczajnie.
  if (/\.[a-z0-9]+$/i.test(url.pathname)) return null;
  return url.pathname + url.search + url.hash;
}

/**
 * Przejscie miedzy podstronami jak roleta: zjezdza, strona sie zmienia,
 * roleta sie zwija. Linki pozostaja zwyklymi <a href> (indeksowanie bez zmian),
 * przechwytujemy tylko klikniecia uzytkownika.
 */
export default function ShutterTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const reducedMotion = useMediaQuery(REDUCED_MOTION_QUERY);
  const [phase, setPhase] = useState<Phase>("idle");
  const [shownPath, setShownPath] = useState(pathname);
  const phaseRef = useRef<Phase>("idle");
  const targetRef = useRef<string | null>(null);

  // Nowa strona wyrenderowana - roleta moze sie zwinac.
  if (pathname !== shownPath) {
    setShownPath(pathname);
    if (phase === "closing" || phase === "closed") setPhase("opening");
  }

  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

  useEffect(() => {
    if (reducedMotion) return;
    const onClick = (event: MouseEvent) => {
      const path = targetPath(event);
      if (!path) return;
      // Zatrzymujemy nawigacje next/link - ruszy, gdy roleta zjedzie.
      event.preventDefault();
      if (phaseRef.current !== "idle") return;
      targetRef.current = path;
      setPhase("closing");
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [reducedMotion]);

  useEffect(() => {
    if (phase === "closing") {
      const timer = setTimeout(() => {
        setPhase("closed");
        if (targetRef.current) router.push(targetRef.current);
      }, CLOSE_MS);
      return () => clearTimeout(timer);
    }
    if (phase === "closed") {
      const timer = setTimeout(() => setPhase("opening"), FALLBACK_MS);
      return () => clearTimeout(timer);
    }
    if (phase === "opening") {
      const timer = setTimeout(() => setPhase("idle"), OPEN_MS);
      return () => clearTimeout(timer);
    }
  }, [phase, router]);

  return (
    <div className={`${styles.overlay} ${styles[phase]}`} aria-hidden="true">
      <div className={styles.curtain}>
        <span className={styles.brand}>
          Smarteks <span className={styles.brandAccent}>Rolety</span>
        </span>
        <span className={styles.area}>{CONTACT_INFO.SERVICE_AREA}</span>
      </div>
    </div>
  );
}
