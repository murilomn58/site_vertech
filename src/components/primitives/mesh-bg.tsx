"use client";

import { MeshGradient } from "@paper-design/shaders-react";
import { useEffect, useState } from "react";

type Props = {
  className?: string;
  /** intensidade do movimento; 0 = parado */
  speed?: number;
  colors?: string[];
  opacity?: number;
};

/**
 * Fundo de mesh gradient animado por shader (GPU, leve, mobile-safe).
 * Herói do mobile e fallback do vídeo. Respeita prefers-reduced-motion
 * (speed 0 = imagem estática). Paleta navy -> cyan da Vertech.
 */
export function MeshBg({
  className,
  speed = 0.25,
  colors = ["#080d1a", "#0f172a", "#0891b2", "#22d3ee"],
  opacity = 1,
}: Props) {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const on = () => setReduced(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  return (
    <MeshGradient
      className={className}
      style={{ width: "100%", height: "100%", opacity }}
      colors={colors}
      distortion={0.85}
      swirl={0.55}
      speed={reduced ? 0 : speed}
    />
  );
}
