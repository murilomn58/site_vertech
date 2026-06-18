"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import type { PointerEvent, ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  /** amplitude maxima de inclinacao em graus (sweet spot 6) */
  max?: number;
  /** brilho que segue o mouse */
  glare?: boolean;
};

/**
 * Tilt 3D que segue o mouse (so desktop/mouse — touch nao inclina). Amplitude
 * ±6deg por padrao. Profundidade via perspective no wrapper.
 */
export function TiltCard({ children, className, max = 6, glare = true }: Props) {
  const px = useMotionValue(0);
  const py = useMotionValue(0);

  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [max, -max]), {
    stiffness: 200,
    damping: 18,
  });
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-max, max]), {
    stiffness: 200,
    damping: 18,
  });

  const glareX = useTransform(px, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(py, [-0.5, 0.5], ["0%", "100%"]);

  function onMove(e: PointerEvent<HTMLDivElement>) {
    if (e.pointerType !== "mouse") return;
    const rect = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width - 0.5);
    py.set((e.clientY - rect.top) / rect.height - 0.5);
  }
  function onLeave() {
    px.set(0);
    py.set(0);
  }

  return (
    <div style={{ perspective: 900 }} className={className}>
      <motion.div
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          position: "relative",
          height: "100%",
          borderRadius: "inherit",
        }}
      >
        {children}
        {glare && (
          <motion.div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "inherit",
              pointerEvents: "none",
              background: useTransform(
                [glareX, glareY],
                ([gx, gy]) =>
                  `radial-gradient(circle at ${gx} ${gy}, rgba(34,211,238,0.16), transparent 45%)`,
              ),
            }}
          />
        )}
      </motion.div>
    </div>
  );
}
