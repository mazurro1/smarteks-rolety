"use client";

import { useRef, type ReactNode } from "react";
import { useInView } from "@/lib/useInView";
import styles from "./ShutterReveal.module.css";

interface ShutterRevealProps {
  children: ReactNode;
  className?: string;
  role?: string;
  "aria-label"?: string;
}

/**
 * Zdjecie odslaniane jak zwijana roleta, gdy wjedzie w ekran.
 * Zaslona jest czysto dekoracyjna i istnieje tylko przy wlaczonym JS
 * (klasa `html.js`) - bez JS zdjecie jest widoczne od razu.
 */
export default function ShutterReveal({
  children,
  className = "",
  ...rest
}: ShutterRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const open = useInView(ref);

  return (
    <div
      ref={ref}
      className={[className, styles.root, open ? styles.open : ""]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    >
      {children}
      <span className={styles.shutter} aria-hidden="true" />
    </div>
  );
}
