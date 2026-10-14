"use client";

import dynamic from "next/dynamic";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";
import { REDUCED_MOTION_QUERY, useMediaQuery } from "@/lib/useMediaQuery";
import type { DragState, PartFlash, PointerState } from "./RollerWindow";
import styles from "./HeroModel.module.css";

const RollerScene = dynamic(() => import("./RollerScene"), { ssr: false });

const COMPACT_QUERY = "(max-width: 1023px)";

interface HeroModelProps {
  /** Karta "Klasa odpornosci" - po rozlozeniu modelu zastepuje ja legenda. */
  card: ReactNode;
  labels: {
    show: string;
    hide: string;
    legendTitle: string;
    parts: string[];
  };
}

const hasWebGL = () => {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") ?? canvas.getContext("webgl"));
  } catch {
    return false;
  }
};

/** Czulosc obrotu przeciaganiem: radiany na piksel. */
const DRAG_YAW = 0.008;
const DRAG_PITCH = 0.005;
const MAX_PITCH = 0.45;

/**
 * Model 3D rolety w hero. Three.js laduje sie leniwie po hydratacji, wiec nie
 * opoznia tresci. Przycisk (lub klikniecie czesci) rozklada roleta na czesci.
 */
export default function HeroModel({ card, labels }: HeroModelProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const explodeRef = useRef(0);
  const pointerRef = useRef<PointerState>({ x: 0, y: 0 });
  const hotspotsRef = useRef<(HTMLElement | null)[]>([]);
  const dragRef = useRef<DragState>({ yaw: 0, pitch: 0, velocity: 0, active: false });
  const partFlashRef = useRef<PartFlash | null>(null);
  const coastFrameRef = useRef(0);

  const [enabled, setEnabled] = useState(false);
  const [unsupported, setUnsupported] = useState(false);
  const [ready, setReady] = useState(false);
  const [active, setActive] = useState(true);
  const [exploded, setExploded] = useState(false);
  /** Mrugajaca pozycja legendy; `id` restartuje animacje przy kolejnym kliknieciu. */
  const [flash, setFlash] = useState({ index: -1, id: 0 });

  const reducedMotion = useMediaQuery(REDUCED_MOTION_QUERY);
  const compact = useMediaQuery(COMPACT_QUERY);

  const setExplodedState = useCallback((open: boolean) => {
    explodeRef.current = open ? 1 : 0;
    setExploded(open);
  }, []);

  // Three.js dopiero po hydratacji, w wolnej chwili przegladarki.
  useEffect(() => {
    const start = () => {
      if (hasWebGL()) setEnabled(true);
      else setUnsupported(true);
    };
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(start, { timeout: 1500 });
      return () => window.cancelIdleCallback(id);
    }
    const id = setTimeout(start, 600);
    return () => clearTimeout(id);
  }, []);

  // Renderowanie tylko wtedy, gdy hero jest na ekranie.
  useEffect(() => {
    const node = stageRef.current;
    if (!node || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(([entry]) =>
      setActive(entry.isIntersecting),
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const onPointerMove = (event: PointerEvent) => {
      if (dragRef.current.active) return;
      pointerRef.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: (event.clientY / window.innerHeight) * 2 - 1,
      };
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", onPointerMove);
  }, [reducedMotion]);

  const toggle = () => setExplodedState(!exploded);

  const handleReady = useCallback(() => setReady(true), []);

  // Wybor czesci (na modelu lub w legendzie): rozklada model, jesli trzeba,
  // i mruga jednoczesnie czescia modelu oraz pozycja w legendzie.
  const selectPart = useCallback(
    (index: number) => {
      if (explodeRef.current < 0.5) setExplodedState(true);
      partFlashRef.current = { index, start: performance.now() };
      setFlash((current) => ({ index, id: current.id + 1 }));
    },
    [setExplodedState],
  );

  useEffect(() => () => cancelAnimationFrame(coastFrameRef.current), []);

  // Po puszczeniu model kreci sie dalej i wytraca predkosc,
  // a pochylenie wraca do poziomu.
  const coast = () => {
    const spin = dragRef.current;
    let last = performance.now();
    const step = (now: number) => {
      if (spin.active) return;
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      spin.yaw += spin.velocity * dt;
      spin.velocity *= Math.exp(-2.8 * dt);
      spin.pitch *= Math.exp(-1.4 * dt);
      if (Math.abs(spin.velocity) > 0.01 || Math.abs(spin.pitch) > 0.002) {
        coastFrameRef.current = requestAnimationFrame(step);
      }
    };
    cancelAnimationFrame(coastFrameRef.current);
    coastFrameRef.current = requestAnimationFrame(step);
  };

  const handlePartHover = useCallback((hovering: boolean) => {
    stageRef.current?.classList.toggle(styles.overPart, hovering);
  }, []);

  // Obrot przeciaganiem. Na dotyku tylko poziomo - pionowy ruch przewija strone
  // (touch-action: pan-y), wiec scroll na telefonie nie jest przechwytywany.
  const startDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    if ((event.target as HTMLElement).closest(`.${styles.hotspot}`)) return;

    const spin = dragRef.current;
    const stage = stageRef.current;
    const pointerId = event.pointerId;
    const withPitch = event.pointerType === "mouse";
    let lastX = event.clientX;
    let lastY = event.clientY;
    let lastTime = performance.now();

    spin.active = true;
    spin.velocity = 0;

    const onMove = (move: PointerEvent) => {
      if (move.pointerId !== pointerId) return;
      const now = performance.now();
      const dx = move.clientX - lastX;
      const dy = move.clientY - lastY;
      spin.yaw += dx * DRAG_YAW;
      if (withPitch) {
        spin.pitch = Math.max(-MAX_PITCH, Math.min(MAX_PITCH, spin.pitch + dy * DRAG_PITCH));
      }
      spin.velocity = ((dx * DRAG_YAW) / Math.max(8, now - lastTime)) * 1000;
      if (Math.abs(dx) + Math.abs(dy) > 1) stage?.classList.add(styles.dragging);
      lastX = move.clientX;
      lastY = move.clientY;
      lastTime = now;
    };

    const onEnd = (end: PointerEvent) => {
      if (end.pointerId !== pointerId) return;
      spin.active = false;
      // Zatrzymanie palca przed puszczeniem = bez rozpedu.
      if (performance.now() - lastTime > 90) spin.velocity = 0;
      stage?.classList.remove(styles.dragging);
      coast();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onEnd);
      window.removeEventListener("pointercancel", onEnd);
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onEnd);
    window.addEventListener("pointercancel", onEnd);
  };

  return (
    <div className={`${styles.root} ${unsupported ? styles.noModel : ""}`}>
      <div
        ref={stageRef}
        className={`${styles.stage} ${ready ? styles.ready : ""}`}
      >
        {enabled && (
          <div
            className={styles.canvas}
            aria-hidden="true"
            onPointerDown={startDrag}
          >
            <RollerScene
              active={active}
              compact={compact}
              reducedMotion={reducedMotion}
              explode={explodeRef}
              pointer={pointerRef}
              hotspots={hotspotsRef}
              drag={dragRef}
              partFlash={partFlashRef}
              onPartSelect={selectPart}
              onPartHover={handlePartHover}
              onReady={handleReady}
            />
            <div className={styles.hotspots}>
              {labels.parts.map((part, index) => (
                <span
                  key={part}
                  ref={(node) => {
                    hotspotsRef.current[index] = node;
                  }}
                  className={styles.hotspot}
                  onClick={() => selectPart(index)}
                >
                  {index + 1}
                </span>
              ))}
            </div>
          </div>
        )}

        {ready && (
          <button
            type="button"
            className={styles.toggle}
            aria-pressed={exploded}
            onClick={toggle}
          >
            <span className={styles.toggleIcon} aria-hidden="true" />
            {exploded ? labels.hide : labels.show}
          </button>
        )}
      </div>

      <div className={`${styles.cardSlot} ${exploded && ready ? styles.showLegend : ""}`}>
        <div className={styles.card} inert={exploded && ready}>
          {card}
        </div>
        {/* Legenda zawsze w DOM - miejsce zarezerwowane, karta nie skacze. */}
        <div className={styles.legend} inert={!(exploded && ready)}>
          <p className={styles.legendTitle}>{labels.legendTitle}</p>
          <ol className={styles.legendList}>
            {labels.parts.map((part, index) => (
              <li key={part}>
                <button
                  type="button"
                  className={styles.legendItem}
                  onClick={() => selectPart(index)}
                >
                  {flash.index === index && (
                    <span
                      key={flash.id}
                      className={styles.legendFlash}
                      aria-hidden="true"
                    />
                  )}
                  <span className={styles.legendNumber}>{index + 1}</span>
                  {part}
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
