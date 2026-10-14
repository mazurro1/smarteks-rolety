"use client";

import { useEffect, useMemo, useRef, type RefObject } from "react";
import { useFrame, type ThreeEvent } from "@react-three/fiber";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { COLORS } from "@/constants/colors";
import { PortalVan } from "./PortalVan";

export interface PointerState {
  x: number;
  y: number;
}

/** Obrot modelu przeciaganiem myszy/palca (radiany) z bezwladnoscia. */
export interface DragState {
  yaw: number;
  pitch: number;
  /** Predkosc obrotu po puszczeniu, rad/s. */
  velocity: number;
  active: boolean;
}

/** Wyrozniona czesc modelu - mruga po kliknieciu w legendzie lub na modelu. */
export interface PartFlash {
  index: number;
  /** performance.now() w chwili klikniecia. */
  start: number;
}

export interface RollerWindowProps {
  /** 0 = roleta zlozona, 1 = widok rozstrzelony. Wartosc docelowa - model dociaga plynnie. */
  explode: RefObject<number>;
  /** Pozycja kursora w oknie przegladarki, -1..1 w obu osiach. */
  pointer: RefObject<PointerState>;
  reducedMotion: boolean;
  /** Telefon/tablet: legenda jest pod modelem, wiec model zostaje na srodku. */
  compact: boolean;
  /** Numery czesci (DOM nad canvasem) - model ustawia je w miejscu kotwic. */
  hotspots: RefObject<(HTMLElement | null)[]>;
  drag: RefObject<DragState>;
  partFlash: RefObject<PartFlash | null>;
  /** Klikniecie czesci modelu - indeks pozycji w legendzie. */
  onPartSelect: (index: number) => void;
  /** Kursor nad klikalna czescia - wrapper zmienia wtedy kursor sceny. */
  onPartHover: (hovering: boolean) => void;
}

/** Margines numerow od krawedzi sceny - zeby zaden nie zostal uciety. */
const HOTSPOT_MARGIN = 18;
/** Czas mrugniecia czesci (dwa impulsy), ms. */
const FLASH_MS = 1300;
/** Przesuniecie wskaznika, powyzej ktorego puszczenie to obrot, a nie klikniecie. */
const CLICK_TOLERANCE = 6;
const PART_COUNT = 6;

// ── Wymiary (1 jednostka ~ 1 m) ─────────────────────────────────────────────
const OPEN_W = 1.6;
const OPEN_H = 1.9;
const TOP = OPEN_H / 2;
const PROFILE_COUNT = 18;
const PROFILE_H = 0.095;
const PROFILE_D = 0.034;
const PITCH = PROFILE_H + 0.007;
const BAR_H = 0.07;
const SEAL_H = 0.014;
const CURTAIN_TRAVEL = PROFILE_COUNT * PITCH;
const BOX_W = 1.86;
const BOX_H = 0.34;
const BOX_D = 0.34;
const GUIDE_W = 0.075;
const GUIDE_D = 0.11;
const FRAME_T = 0.07;
const FRAME_D = 0.16;

/** Cykl rolety w stanie zlozonym: gora -> zamykanie -> pauza -> otwieranie. */
const ROLL_CYCLE = 11;

const smooth = (t: number) => t * t * (3 - 2 * t);
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

/** Polozenie pancerza w czasie: 1 = zwiniety, 0 = opuszczony. */
const rollAt = (time: number) => {
  const t = time % ROLL_CYCLE;
  if (t < 1.6) return 1;
  if (t < 4.6) return 1 - smooth((t - 1.6) / 3);
  if (t < 7.4) return 0;
  if (t < 10.2) return smooth((t - 7.4) / 2.8);
  return 1;
};

const ALUMINIUM = { color: "#3b3d45", metalness: 0.78, roughness: 0.32, envMapIntensity: 1.25 };
const HOUSING = { color: "#2c2e35", metalness: 0.62, roughness: 0.36, envMapIntensity: 1.1 };
const STEEL = { color: "#c3c6ce", metalness: 1, roughness: 0.22 };

/** Material czesci z wylaczona poswiata - wlaczana przy mrugnieciu. */
const highlightable = (params: THREE.MeshStandardMaterialParameters) =>
  new THREE.MeshStandardMaterial({
    ...params,
    emissive: COLORS.BRAND_ACCENT,
    emissiveIntensity: 0,
  });

/** Akcent w kolorze marki - stale lekko swieci. */
const brandMaterial = () => {
  const brand = new THREE.MeshStandardMaterial({
    color: COLORS.BRAND_PRIMARY,
    emissive: COLORS.BRAND_ACCENT,
    emissiveIntensity: 0.55,
    metalness: 0.3,
    roughness: 0.4,
  });
  brand.userData.brand = true;
  return brand;
};

export function RollerWindow({
  explode,
  pointer,
  reducedMotion,
  compact,
  hotspots,
  drag,
  partFlash,
  onPartSelect,
  onPartHover,
}: RollerWindowProps) {
  const root = useRef<THREE.Group>(null);
  const windowGroup = useRef<THREE.Group>(null);
  const boxGroup = useRef<THREE.Group>(null);
  const drumGroup = useRef<THREE.Group>(null);
  const coil = useRef<THREE.Mesh>(null);
  const motorGroup = useRef<THREE.Group>(null);
  const leftGuide = useRef<THREE.Group>(null);
  const rightGuide = useRef<THREE.Group>(null);
  const curtain = useRef<THREE.Group>(null);
  const profiles = useRef<(THREE.Mesh | null)[]>([]);
  const locks = useRef<THREE.Group>(null);
  const bottomBar = useRef<THREE.Group>(null);
  /** Siatki kazdej czesci - przez nie sterujemy poswiata przy mrugnieciu. */
  const partMeshes = useRef<Set<THREE.Mesh>[]>(
    Array.from({ length: PART_COUNT }, () => new Set()),
  );
  const anchors = useRef<(THREE.Object3D | null)[]>([]);
  const explodeNow = useRef(0);
  const projected = useMemo(() => new THREE.Vector3(), []);

  const geometry = useMemo(
    () => ({
      profile: new RoundedBoxGeometry(OPEN_W, PROFILE_H, PROFILE_D, 2, 0.012),
      box: new RoundedBoxGeometry(BOX_W, BOX_H, BOX_D, 3, 0.035),
      guide: new RoundedBoxGeometry(GUIDE_W, OPEN_H, GUIDE_D, 2, 0.012),
      bar: new RoundedBoxGeometry(OPEN_W, BAR_H, 0.06, 2, 0.014),
      lock: new RoundedBoxGeometry(0.09, 0.05, 0.05, 2, 0.01),
    }),
    [],
  );

  const material = useMemo(() => {
    return {
      box: highlightable(HOUSING),
      guide: highlightable(HOUSING),
      drum: highlightable(STEEL),
      coil: highlightable(ALUMINIUM),
      motor: highlightable(STEEL),
      motorHead: brandMaterial(),
      profile: highlightable(ALUMINIUM),
      lock: brandMaterial(),
      bar: highlightable(ALUMINIUM),
      seal: brandMaterial(),
      frame: new THREE.MeshStandardMaterial({
        color: "#24252b",
        metalness: 0.25,
        roughness: 0.5,
      }),
      glass: new THREE.MeshStandardMaterial({
        color: "#0c1216",
        metalness: 0.9,
        roughness: 0.06,
        transparent: true,
        opacity: 0.16,
        envMapIntensity: 2.2,
      }),
      accentLine: new THREE.MeshBasicMaterial({
        color: COLORS.BRAND_ACCENT,
        toneMapped: false,
      }),
    };
  }, []);

  useEffect(
    () => () => {
      Object.values(geometry).forEach((item) => item.dispose());
      Object.values(material).forEach((item) => item.dispose());
    },
    [geometry, material],
  );

  useFrame((state, delta) => {
    const target = explode.current ?? 0;
    explodeNow.current = reducedMotion
      ? target
      : THREE.MathUtils.damp(explodeNow.current, target, 3.2, delta);
    const e = smooth(clamp01(explodeNow.current));
    const time = state.clock.elapsedTime;

    // Roleta pracuje w petli tylko w stanie zlozonym - przy rozkladaniu opada.
    const loopRoll = reducedMotion ? 0.45 : rollAt(time);
    const roll = THREE.MathUtils.lerp(loopRoll, 0, clamp01(e * 1.8));
    const travel = roll * CURTAIN_TRAVEL;
    // Profile tylko lekko sie rozsuwaja - pancerz ma wygladac jak jedna plyta.
    const spread = 1 + e * 0.06;

    // Obrot z przeciagania (wraz z bezwladnoscia) liczy wrapper - tu tylko odczyt.
    const spin = drag.current;

    // Obrot za kursorem + przeciaganie + delikatne unoszenie.
    if (root.current) {
      const px = reducedMotion ? 0 : (pointer.current?.x ?? 0);
      const py = reducedMotion ? 0 : (pointer.current?.y ?? 0);
      const rotY = -0.42 + px * 0.3 + e * 0.12 + (spin?.yaw ?? 0);
      const rotX = 0.05 - py * 0.12 + e * 0.04 + (spin?.pitch ?? 0);
      const follow = spin?.active ? 12 : 2.6;
      root.current.rotation.y = THREE.MathUtils.damp(root.current.rotation.y, rotY, follow, delta);
      root.current.rotation.x = THREE.MathUtils.damp(root.current.rotation.x, rotX, follow, delta);
      root.current.position.y = reducedMotion ? 0 : Math.sin(time * 0.8) * 0.035;
      // Na desktopie model robi miejsce karcie/legendzie po lewej.
      root.current.position.x = compact ? 0 : 0.3 + e * 0.42;
    }

    // Kamera odjezdza, zeby rozstrzelony model miescil sie w kadrze.
    const camera = state.camera;
    camera.position.z = THREE.MathUtils.lerp(6.1, compact ? 8.4 : 9.2, e);
    camera.position.y = THREE.MathUtils.lerp(0.15, 0.3, e);
    camera.lookAt(0, 0.1 + e * 0.2, 0);

    windowGroup.current?.position.set(0, 0, -0.14 - e * 0.55);
    boxGroup.current?.position.set(0, TOP + BOX_H / 2 + e * 0.7, -e * 0.08);
    drumGroup.current?.position.set(0, TOP + BOX_H / 2 + e * 0.3, -e * 0.04);
    if (coil.current) {
      const radius = 1 + roll * 1.35;
      coil.current.scale.set(radius, 1, radius);
    }
    motorGroup.current?.position.set(0.62 + e * 0.42, 0, 0);
    leftGuide.current?.position.set(-(OPEN_W / 2 + GUIDE_W / 2 - 0.012) - e * 0.46, 0, 0);
    rightGuide.current?.position.set(OPEN_W / 2 + GUIDE_W / 2 - 0.012 + e * 0.46, 0, 0);
    curtain.current?.position.set(0, 0, e * 0.42);

    let lastY = TOP;
    profiles.current.forEach((mesh, index) => {
      if (!mesh) return;
      const y = TOP - (index + 0.5) * PITCH * spread + travel - e * 0.05;
      mesh.position.set(0, y, e * Math.sin(index * 0.55) * 0.05);
      // Profil znika dopiero, gdy caly jest w skrzynce - nic nie wystaje nad nia.
      mesh.visible = y - PROFILE_H / 2 < TOP + 0.02;
      lastY = y;
    });

    const firstY = TOP - 0.5 * PITCH * spread + travel - e * 0.05;
    if (locks.current) {
      locks.current.position.set(0, firstY + PROFILE_H / 2 + 0.03 + e * 0.16, 0);
      locks.current.visible = firstY - PROFILE_H / 2 < TOP + 0.02;
    }
    // Poswiata: akcenty marki pulsuja po rozlozeniu, wybrana czesc mruga dwa razy.
    const brandGlow = 0.55 + e * (0.5 + Math.sin(time * 3) * 0.25);
    const flash = partFlash.current;
    const flashAge = flash ? performance.now() - flash.start : FLASH_MS;
    const pulse =
      flashAge < FLASH_MS ? Math.sin((flashAge / FLASH_MS) * Math.PI * 2) ** 2 : 0;
    const flashOf = (index: number) => (flash?.index === index ? pulse : 0);
    partMeshes.current.forEach((meshes, index) => {
      const strength = flashOf(index);
      meshes.forEach((mesh) => {
        const surface = mesh.material as THREE.MeshStandardMaterial;
        surface.emissiveIntensity = surface.userData.brand
          ? brandGlow + strength * 2
          : strength * 1.4;
      });
    });

    bottomBar.current?.position.set(
      0,
      lastY - (PITCH * spread) / 2 - BAR_H / 2 - e * 0.22,
      0,
    );

    // Numery czesci pojawiaja sie dopiero po rozlozeniu - rzutujemy kotwice
    // na ekran i trzymamy je w granicach sceny.
    const opacity = clamp01((e - 0.55) / 0.3);
    root.current?.updateMatrixWorld();
    camera.updateMatrixWorld();
    const { width, height } = state.size;
    anchors.current.forEach((anchor, index) => {
      const node = hotspots.current?.[index];
      if (!anchor || !node) return;
      node.style.opacity = String(opacity);
      node.style.pointerEvents = opacity > 0.5 ? "auto" : "none";
      if (opacity === 0) return;
      anchor.getWorldPosition(projected).project(camera);
      const x = THREE.MathUtils.clamp(
        (projected.x * 0.5 + 0.5) * width,
        HOTSPOT_MARGIN,
        width - HOTSPOT_MARGIN,
      );
      const y = THREE.MathUtils.clamp(
        (-projected.y * 0.5 + 0.5) * height,
        HOTSPOT_MARGIN,
        height - HOTSPOT_MARGIN,
      );
      const scale = 1 + flashOf(index) * 0.45;
      node.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) scale(${scale})`;
    });
  });

  /** Klikalna czesc: kursor-raczka i wybor pozycji w legendzie. */
  const part = (index: number) => ({
    onClick: (event: ThreeEvent<MouseEvent>) => {
      event.stopPropagation();
      // Puszczenie po przeciagnieciu to obrot modelu, nie wybor czesci.
      if (event.delta > CLICK_TOLERANCE) return;
      onPartSelect(index);
    },
    onPointerOver: (event: ThreeEvent<PointerEvent>) => {
      event.stopPropagation();
      onPartHover(true);
    },
    onPointerOut: () => onPartHover(false),
  });

  /** Rejestracja siatki czesci - do sterowania jej poswiata. */
  const track = (index: number) => (node: THREE.Mesh | null) => {
    if (node) partMeshes.current[index].add(node);
  };

  /** Punkt na czesci modelu, przy ktorym wyswietla sie jej numer. */
  const anchor = (index: number, position: [number, number, number]) => (
    <object3D
      ref={(node) => {
        anchors.current[index] = node;
      }}
      position={position}
    />
  );

  return (
    <group ref={root} rotation={[0.05, -0.42, 0]}>
      {/* Okno: rama, szyba, a za nia ulica z busem Smarteks */}
      <group ref={windowGroup}>
        <PortalVan width={OPEN_W} height={OPEN_H} />
        <mesh position={[0, 0, -0.02]} material={material.glass}>
          <planeGeometry args={[OPEN_W, OPEN_H]} />
        </mesh>
        {[
          { pos: [0, TOP - FRAME_T / 2, 0], size: [OPEN_W, FRAME_T, FRAME_D] },
          { pos: [0, -TOP + FRAME_T / 2, 0], size: [OPEN_W, FRAME_T, FRAME_D] },
          { pos: [-OPEN_W / 2 + FRAME_T / 2, 0, 0], size: [FRAME_T, OPEN_H, FRAME_D] },
          { pos: [OPEN_W / 2 - FRAME_T / 2, 0, 0], size: [FRAME_T, OPEN_H, FRAME_D] },
        ].map((bar, index) => (
          <mesh
            key={index}
            position={bar.pos as [number, number, number]}
            material={material.frame}
          >
            <boxGeometry args={bar.size as [number, number, number]} />
          </mesh>
        ))}
      </group>

      {/* Skrzynka */}
      <group ref={boxGroup} {...part(0)}>
        <mesh ref={track(0)} geometry={geometry.box} material={material.box} />
        <mesh position={[0, -BOX_H / 2 + 0.02, BOX_D / 2 + 0.001]} material={material.accentLine}>
          <planeGeometry args={[BOX_W - 0.08, 0.006]} />
        </mesh>
        {anchor(0, [-BOX_W / 2 + 0.18, 0.04, BOX_D / 2 + 0.02])}
      </group>

      {/* Wal z nawinietym pancerzem i naped rurowy */}
      <group ref={drumGroup} {...part(0)}>
        <mesh ref={track(0)} rotation={[0, 0, Math.PI / 2]} material={material.drum}>
          <cylinderGeometry args={[0.05, 0.05, 1.72, 32]} />
        </mesh>
        <mesh
          ref={(node) => {
            coil.current = node;
            track(0)(node);
          }}
          rotation={[0, 0, Math.PI / 2]}
          material={material.coil}
        >
          <cylinderGeometry args={[0.055, 0.055, OPEN_W - 0.04, 40]} />
        </mesh>
        <group ref={motorGroup} {...part(1)}>
          <mesh ref={track(1)} rotation={[0, 0, Math.PI / 2]} material={material.motor}>
            <cylinderGeometry args={[0.038, 0.038, 0.52, 32]} />
          </mesh>
          <mesh
            ref={track(1)}
            position={[0.28, 0, 0]}
            rotation={[0, 0, Math.PI / 2]}
            material={material.motorHead}
          >
            <cylinderGeometry args={[0.062, 0.062, 0.05, 40]} />
          </mesh>
          {anchor(1, [0.3, 0.13, 0])}
        </group>
      </group>

      {/* Prowadnice */}
      <group ref={leftGuide} {...part(2)}>
        <mesh ref={track(2)} geometry={geometry.guide} material={material.guide} />
        {anchor(2, [-0.02, 0.6, GUIDE_D / 2 + 0.02])}
      </group>
      <group ref={rightGuide} {...part(2)}>
        <mesh ref={track(2)} geometry={geometry.guide} material={material.guide} />
      </group>

      {/* Pancerz, blokady i listwa dolna */}
      <group ref={curtain}>
        {Array.from({ length: PROFILE_COUNT }, (_, index) => (
          <mesh
            key={index}
            ref={(node) => {
              profiles.current[index] = node;
              track(3)(node);
            }}
            geometry={geometry.profile}
            {...part(3)}
            material={material.profile}
          />
        ))}
        <group position={[0, 0, 0]}>
          {anchor(3, [-0.35, 0.1, PROFILE_D / 2 + 0.12])}
        </group>
        <group ref={locks} {...part(4)}>
          <mesh
            ref={track(4)}
            position={[-0.52, 0, 0]}
            geometry={geometry.lock}
            material={material.lock}
          />
          <mesh
            ref={track(4)}
            position={[0.52, 0, 0]}
            geometry={geometry.lock}
            material={material.lock}
          />
          {anchor(4, [0.52, 0.08, 0.06])}
        </group>
        <group ref={bottomBar} {...part(5)}>
          <mesh ref={track(5)} geometry={geometry.bar} material={material.bar} />
          <mesh
            ref={track(5)}
            position={[0, -BAR_H / 2 - SEAL_H / 2, 0]}
            material={material.seal}
          >
            <boxGeometry args={[OPEN_W - 0.02, SEAL_H, 0.04]} />
          </mesh>
          {anchor(5, [0.45, 0, 0.06])}
        </group>
      </group>
    </group>
  );
}
