"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer } from "@react-three/drei";
import { COLORS } from "@/constants/colors";
import { PORTAL_LAYER } from "./PortalVan";
import { RollerWindow, type RollerWindowProps } from "./RollerWindow";

interface RollerSceneProps extends RollerWindowProps {
  /** Renderowanie wstrzymane, gdy hero jest poza ekranem. */
  active: boolean;
  onReady: () => void;
}

/** Sygnal "model narysowany" - dopiero wtedy chowamy statyczny placeholder. */
function ReadySignal({ onReady }: { onReady: () => void }) {
  const frames = useRef(0);
  useFrame(() => {
    frames.current += 1;
    if (frames.current === 3) onReady();
  });
  return null;
}

export default function RollerScene({
  active,
  onReady,
  ...windowProps
}: RollerSceneProps) {
  const { compact } = windowProps;
  return (
    <Canvas
      dpr={compact ? [1, 1.25] : [1, 1.75]}
      frameloop={active ? "always" : "never"}
      camera={{ position: [0, 0.15, 6.6], fov: 30 }}
      gl={{
        alpha: true,
        antialias: true,
        stencil: true,
        powerPreference: "high-performance",
      }}
      onCreated={({ camera }) => camera.layers.enable(PORTAL_LAYER)}
    >
      <ambientLight intensity={0.18} />
      <directionalLight position={[4, 5, 6]} intensity={2.2} />
      <spotLight
        position={[2.5, 3, -4]}
        angle={0.7}
        penumbra={1}
        intensity={40}
        color={COLORS.BRAND_ACCENT}
      />
      <pointLight position={[-3, -1, 2.5]} intensity={6} color="#ffd2a1" />

      {/* Odbicia z proceduralnych "softboxow" - bez pobierania plikow HDR. */}
      <Environment resolution={256} frames={1}>
        <Lightformer
          form="rect"
          intensity={2.4}
          position={[0, 5, -1]}
          rotation-x={Math.PI / 2}
          scale={[10, 3, 1]}
        />
        <Lightformer
          form="rect"
          intensity={1.4}
          position={[-5, 1, 1]}
          rotation-y={Math.PI / 2}
          scale={[3, 7, 1]}
        />
        <Lightformer
          form="rect"
          intensity={2.6}
          color={COLORS.BRAND_ACCENT}
          position={[5, 0.5, -1]}
          rotation-y={-Math.PI / 2}
          scale={[2, 7, 1]}
        />
        <Lightformer form="ring" intensity={0.8} position={[0, 1, 6]} scale={3} />
      </Environment>

      <RollerWindow {...windowProps} />

      {!compact && (
        <ContactShadows
          position={[0, -1.8, 0]}
          opacity={0.55}
          scale={7}
          blur={2.6}
          far={3}
          resolution={512}
          color="#000000"
        />
      )}

      <ReadySignal onReady={onReady} />
    </Canvas>
  );
}
