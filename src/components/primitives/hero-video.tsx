"use client";

import { useEffect, useState } from "react";
import { HERO_VIDEO, HERO_POSTER } from "@/lib/showcase";

/**
 * Slot do vídeo hero. Enquanto HERO_VIDEO for null, renderiza nada (o hero cai
 * no mesh gradient). Quando houver mp4: toca só no desktop com boa conexão e
 * sem reduced-motion; senão fica no poster (ou no mesh por baixo).
 */
export function HeroVideo() {
  const [play, setPlay] = useState(false);

  useEffect(() => {
    if (!HERO_VIDEO) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
    const slow = conn?.saveData || ["slow-2g", "2g"].includes(conn?.effectiveType ?? "");
    if (reduced || slow) return;
    setPlay(true);
  }, []);

  if (!HERO_VIDEO) return null;

  return (
    <div className="absolute inset-0 z-[1]">
      {play ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={HERO_POSTER ?? undefined}
          className="h-full w-full object-cover"
        >
          <source src={HERO_VIDEO} type="video/mp4" />
        </video>
      ) : HERO_POSTER ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={HERO_POSTER} alt="" className="h-full w-full object-cover" />
      ) : null}
    </div>
  );
}
