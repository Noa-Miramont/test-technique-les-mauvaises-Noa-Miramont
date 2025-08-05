"use client";

import { Canvas } from "@react-three/fiber";
import { AdaptiveDpr, AdaptiveEvents } from "@react-three/drei";
import { Suspense } from "react";

type Props = { children: React.ReactNode; className?: string };

export default function Scene3D({ children }: Props) {
  return (
    <div className="canvas" style={{ height: "100vh", width: "100vw" }}>
      <Canvas
      camera={{ position: [0, 0, 25], fov: 25 }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          {children}
        </Suspense>
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />
      </Canvas>
    </div>
  );
}