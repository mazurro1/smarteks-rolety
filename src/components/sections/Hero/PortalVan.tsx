"use client";

import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { COLORS } from "@/constants/colors";
import { CONTACT_INFO } from "@/constants/contact";

/**
 * Widok za szyba: ulica o zmierzchu i bus Smarteks w firmowym oklejeniu.
 * Wszystko widac wylacznie przez otwor okna (bufor szablonu), wiec przy
 * obracaniu modelu scena za szyba ma prawdziwa glebie.
 */

/** Warstwa sceny za szyba - poza cieniem kontaktowym i poza klikaniem. */
export const PORTAL_LAYER = 1;
const STENCIL_REF = 1;

// Bus (typ Transit, widok z boku): przod przy x < 0, jednostki jak w modelu rolety.
const VAN_W = 0.5;
const WHEEL_R = 0.1;
const FRONT_WHEEL_X = -0.47;
const REAR_WHEEL_X = 0.45;
const BEVEL = 0.03;
const SIDE_Z = VAN_W / 2 + BEVEL + 0.002;

interface PortalVanProps {
  /** Wymiary otworu okna - maska widocznosci sceny. */
  width: number;
  height: number;
}

/** Material widoczny tylko tam, gdzie maska okna zapisala szablon. */
function masked<T extends THREE.Material>(material: T): T {
  material.stencilWrite = true;
  material.stencilRef = STENCIL_REF;
  material.stencilFunc = THREE.EqualStencilFunc;
  material.stencilFail = THREE.KeepStencilOp;
  material.stencilZFail = THREE.KeepStencilOp;
  material.stencilZPass = THREE.KeepStencilOp;
  return material;
}

/** Proste deterministyczne "losowanie" - panorama miasta wyglada zawsze tak samo. */
function seeded(seed: number) {
  let value = seed;
  return () => {
    value = (value * 16807) % 2147483647;
    return value / 2147483647;
  };
}

function canvasTexture(width: number, height: number, draw: (ctx: CanvasRenderingContext2D) => void) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (ctx) draw(ctx);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  return { texture, canvas, ctx };
}

/** Niebo o zmierzchu z sylwetka miasta i zapalonymi oknami. */
function drawSky(ctx: CanvasRenderingContext2D) {
  const { width, height } = ctx.canvas;
  const sky = ctx.createLinearGradient(0, 0, 0, height);
  sky.addColorStop(0, "#07080d");
  sky.addColorStop(0.42, "#151629");
  sky.addColorStop(0.68, "#3b1b35");
  sky.addColorStop(0.8, "#8a2f4f");
  sky.addColorStop(0.86, "#2a1420");
  sky.addColorStop(1, "#0b0a0d");
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, width, height);

  const random = seeded(7);
  const horizon = height * 0.84;
  let x = 0;
  while (x < width) {
    const w = 18 + random() * 46;
    const h = 30 + random() * 150;
    ctx.fillStyle = "#0b0b11";
    ctx.fillRect(x, horizon - h, w, h + 4);
    for (let wy = horizon - h + 8; wy < horizon - 6; wy += 9) {
      for (let wx = x + 4; wx < x + w - 4; wx += 7) {
        if (random() > 0.82) {
          ctx.fillStyle = random() > 0.5 ? "#f7c37c" : "#d98a4f";
          ctx.fillRect(wx, wy, 3, 4);
        }
      }
    }
    x += w + 2;
  }
}

/** Oklejenie boku busa: logo, zakres uslug, kontakt i pas w kolorach marki. */
function drawWrap(ctx: CanvasRenderingContext2D, logo: HTMLImageElement | null) {
  const { width, height } = ctx.canvas;
  const font = getComputedStyle(document.body).fontFamily || "sans-serif";
  ctx.clearRect(0, 0, width, height);

  // Pas marki od dolu, z ukosnym poczatkiem.
  const stripe = ctx.createLinearGradient(0, 0, width, 0);
  stripe.addColorStop(0, COLORS.BRAND_PRIMARY_DARK);
  stripe.addColorStop(1, COLORS.BRAND_ACCENT);
  ctx.fillStyle = stripe;
  ctx.beginPath();
  ctx.moveTo(width * 0.08, height);
  ctx.lineTo(width * 0.3, height * 0.7);
  ctx.lineTo(width, height * 0.62);
  ctx.lineTo(width, height);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = COLORS.BRAND_PRIMARY;
  ctx.beginPath();
  ctx.moveTo(width * 0.24, height * 0.7);
  ctx.lineTo(width * 0.27, height * 0.66);
  ctx.lineTo(width, height * 0.58);
  ctx.lineTo(width, height * 0.6);
  ctx.closePath();
  ctx.fill();

  if (logo) {
    const logoWidth = width * 0.8;
    const logoHeight = (logo.height / logo.width) * logoWidth;
    ctx.drawImage(logo, width * 0.1, height * 0.1, logoWidth, logoHeight);
  } else {
    ctx.fillStyle = "#0e1118";
    ctx.font = `800 ${height * 0.26}px ${font}`;
    ctx.fillText("SMARTEKS", width * 0.1, height * 0.36);
  }

  ctx.fillStyle = "#1c1d24";
  ctx.font = `600 ${height * 0.075}px ${font}`;
  ctx.fillText("ROLETY  ·  BRAMY ROLOWANE  ·  SZLABANY", width * 0.1, height * 0.53);

  ctx.fillStyle = COLORS.WHITE;
  ctx.font = `700 ${height * 0.1}px ${font}`;
  ctx.textAlign = "right";
  ctx.fillText(`${CONTACT_INFO.PHONE}  ·  smarteks.pl`, width * 0.95, height * 0.9);
  ctx.textAlign = "left";
}

/** Sylwetka busa z boku - wytloczona na szerokosc nadwozia. */
function createBodyGeometry() {
  const shape = new THREE.Shape();
  shape.moveTo(-0.72, 0.12);
  shape.lineTo(-0.73, 0.3);
  shape.quadraticCurveTo(-0.72, 0.36, -0.64, 0.37);
  shape.lineTo(-0.5, 0.41);
  shape.lineTo(-0.37, 0.63);
  shape.quadraticCurveTo(-0.34, 0.67, -0.28, 0.67);
  shape.lineTo(0.71, 0.67);
  shape.quadraticCurveTo(0.745, 0.67, 0.745, 0.63);
  shape.lineTo(0.745, 0.12);
  shape.lineTo(REAR_WHEEL_X + 0.13, 0.12);
  shape.absarc(REAR_WHEEL_X, WHEEL_R, 0.125, 0, Math.PI, false);
  shape.lineTo(FRONT_WHEEL_X + 0.125, 0.12);
  shape.absarc(FRONT_WHEEL_X, WHEEL_R, 0.125, 0, Math.PI, false);
  shape.lineTo(-0.72, 0.12);

  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: VAN_W,
    bevelEnabled: true,
    bevelThickness: BEVEL,
    bevelSize: BEVEL,
    bevelSegments: 4,
    curveSegments: 18,
  });
  geometry.translate(0, 0, -VAN_W / 2);
  return geometry;
}

function createDoorWindowGeometry() {
  const shape = new THREE.Shape();
  shape.moveTo(-0.46, 0.43);
  shape.lineTo(-0.355, 0.6);
  shape.quadraticCurveTo(-0.34, 0.615, -0.32, 0.615);
  shape.lineTo(-0.25, 0.615);
  shape.lineTo(-0.25, 0.43);
  shape.lineTo(-0.46, 0.43);
  return new THREE.ShapeGeometry(shape);
}

function createShadowTexture() {
  return canvasTexture(256, 128, (ctx) => {
    const gradient = ctx.createRadialGradient(128, 64, 4, 128, 64, 124);
    gradient.addColorStop(0, "rgba(0, 0, 0, 0.85)");
    gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 256, 128);
  }).texture;
}

export function PortalVan({ width, height }: PortalVanProps) {
  const root = useRef<THREE.Group>(null);

  const assets = useMemo(() => {
    const sky = canvasTexture(1024, 512, drawSky).texture;
    const wrap = canvasTexture(1024, 512, (ctx) => drawWrap(ctx, null));
    const logo = new Image();
    logo.onload = () => {
      if (!wrap.ctx) return;
      drawWrap(wrap.ctx, logo);
      wrap.texture.needsUpdate = true;
    };
    logo.src = "/images/logo.png";

    const windshieldLength = Math.hypot(0.13, 0.22);

    return {
      geometry: {
        body: createBodyGeometry(),
        doorWindow: createDoorWindowGeometry(),
        windshield: new THREE.BoxGeometry(windshieldLength - 0.02, 0.004, VAN_W * 0.86),
        tyre: new THREE.CylinderGeometry(WHEEL_R, WHEEL_R, 0.09, 32),
        rim: new THREE.CylinderGeometry(WHEEL_R * 0.58, WHEEL_R * 0.58, 0.094, 24),
      },
      material: {
        mask: new THREE.MeshBasicMaterial({
          colorWrite: false,
          depthWrite: false,
          stencilWrite: true,
          stencilRef: STENCIL_REF,
          stencilFunc: THREE.AlwaysStencilFunc,
          stencilZPass: THREE.ReplaceStencilOp,
        }),
        sky: masked(new THREE.MeshBasicMaterial({ map: sky, toneMapped: false })),
        ground: masked(
          new THREE.MeshStandardMaterial({ color: "#16171c", roughness: 0.55, metalness: 0.3 }),
        ),
        shadow: masked(
          new THREE.MeshBasicMaterial({
            map: createShadowTexture(),
            transparent: true,
            depthWrite: false,
          }),
        ),
        paint: masked(
          new THREE.MeshStandardMaterial({
            color: "#eceef2",
            metalness: 0.3,
            roughness: 0.26,
            envMapIntensity: 1.15,
          }),
        ),
        wrap: masked(
          new THREE.MeshStandardMaterial({
            map: wrap.texture,
            transparent: true,
            roughness: 0.3,
            metalness: 0.1,
            polygonOffset: true,
            polygonOffsetFactor: -2,
          }),
        ),
        glass: masked(
          new THREE.MeshStandardMaterial({
            color: "#0a0c11",
            metalness: 0.7,
            roughness: 0.1,
            envMapIntensity: 1.6,
          }),
        ),
        trim: masked(new THREE.MeshStandardMaterial({ color: "#1d1e23", roughness: 0.7 })),
        tyre: masked(new THREE.MeshStandardMaterial({ color: "#0d0d10", roughness: 0.85 })),
        rim: masked(
          new THREE.MeshStandardMaterial({ color: "#b8bcc6", metalness: 1, roughness: 0.25 }),
        ),
        headlight: masked(new THREE.MeshBasicMaterial({ color: "#fff6e2", toneMapped: false })),
        taillight: masked(new THREE.MeshBasicMaterial({ color: "#ff3b4e", toneMapped: false })),
      },
    };
  }, []);

  useEffect(() => {
    root.current?.traverse((object) => object.layers.set(PORTAL_LAYER));
  }, []);

  useEffect(
    () => () => {
      Object.values(assets.geometry).forEach((item) => item.dispose());
      Object.values(assets.material).forEach((item) => {
        if ("map" in item) item.map?.dispose();
        item.dispose();
      });
    },
    [assets],
  );

  const { geometry, material } = assets;
  const groundY = -height / 2 + 0.03;
  const wheelZ = VAN_W / 2 - 0.01;
  const windshieldAngle = Math.atan2(0.22, 0.13);

  return (
    <group ref={root}>
      {/* Maska: tylko w obrysie okna scena za szyba jest widoczna. */}
      <mesh position={[0, 0, -0.03]} renderOrder={-1} material={material.mask}>
        <planeGeometry args={[width, height]} />
      </mesh>

      <mesh position={[0, 0.35, -3.4]} material={material.sky}>
        <planeGeometry args={[10, 5.2]} />
      </mesh>
      <mesh
        position={[0, groundY, -1.8]}
        rotation={[-Math.PI / 2, 0, 0]}
        material={material.ground}
      >
        <planeGeometry args={[10, 3.4]} />
      </mesh>
      <pointLight position={[-0.9, 0.85, -0.55]} intensity={2.4} distance={4} color="#ffcf99" />

      {/* Bus Smarteks - lekko z przodu, zeby bylo widac maske i szybe.
          Przesuniety w lewo, bo okno ogladamy pod katem (paralaksa w prawo). */}
      <group position={[-0.34, groundY, -0.95]} rotation={[0, 0.6, 0]} scale={0.8}>
        <mesh
          position={[0, 0.002, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          material={material.shadow}
        >
          <planeGeometry args={[1.9, 0.9]} />
        </mesh>

        <mesh geometry={geometry.body} material={material.paint} />
        <mesh position={[0.28, 0.44, SIDE_Z]} material={material.wrap}>
          <planeGeometry args={[0.8, 0.4]} />
        </mesh>
        <mesh
          geometry={geometry.doorWindow}
          position={[0, 0, SIDE_Z + 0.001]}
          material={material.glass}
        />
        <mesh
          geometry={geometry.windshield}
          position={[-0.435 - 0.026, 0.52 + 0.015, 0]}
          rotation={[0, 0, windshieldAngle]}
          material={material.glass}
        />

        {/* Zderzaki, grill, lusterko */}
        <mesh position={[-0.745, 0.17, 0]} material={material.trim}>
          <boxGeometry args={[0.05, 0.08, VAN_W + 0.05]} />
        </mesh>
        <mesh position={[-0.76, 0.25, 0]} material={material.trim}>
          <boxGeometry args={[0.012, 0.08, VAN_W * 0.62]} />
        </mesh>
        <mesh position={[0.77, 0.15, 0]} material={material.trim}>
          <boxGeometry args={[0.04, 0.06, VAN_W + 0.04]} />
        </mesh>
        <mesh position={[-0.35, 0.5, SIDE_Z + 0.03]} material={material.trim}>
          <boxGeometry args={[0.05, 0.07, 0.06]} />
        </mesh>

        {/* Swiatla */}
        {[1, -1].map((side) => (
          <group key={side}>
            <mesh position={[-0.755, 0.315, side * (VAN_W / 2 - 0.05)]} material={material.headlight}>
              <boxGeometry args={[0.012, 0.045, 0.1]} />
            </mesh>
            <mesh position={[0.772, 0.47, side * (VAN_W / 2 - 0.005)]} material={material.taillight}>
              <boxGeometry args={[0.012, 0.16, 0.04]} />
            </mesh>
          </group>
        ))}

        {/* Kola */}
        {[FRONT_WHEEL_X, REAR_WHEEL_X].flatMap((x) =>
          [wheelZ, -wheelZ].map((z) => (
            <group key={`${x}-${z}`} position={[x, WHEEL_R, z]} rotation={[Math.PI / 2, 0, 0]}>
              <mesh geometry={geometry.tyre} material={material.tyre} />
              <mesh geometry={geometry.rim} material={material.rim} />
            </group>
          )),
        )}
      </group>
    </group>
  );
}
