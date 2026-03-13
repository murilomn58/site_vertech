"use client";
import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

type CounterProps = { target: number; suffix?: string; prefix?: string; label: string };

export default function Counter({ target, suffix = "", prefix = "", label }: CounterProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, target]);

  return (
    <div ref={ref} className="text-center">
      <div className="font-heading font-bold text-3xl text-cyan">{prefix}{count}{suffix}</div>
      <div className="text-off-white/60 text-sm mt-1">{label}</div>
    </div>
  );
}
