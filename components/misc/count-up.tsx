// components/misc/count-up.tsx
"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

// Splits "500+", "$1,200", "4.9/5", "15 yrs" into prefix / number / suffix
const PATTERN = /^(\D*)(\d[\d,]*(?:\.\d+)?)(.*)$/;

type CountUpProps = {
  value: string | number;
  duration?: number;
  className?: string;
};

export function CountUp({ value, duration = 1.6, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduceMotion = useReducedMotion();

  const raw = String(value);
  const match = raw.match(PATTERN);
  const prefix = match?.[1] ?? "";
  const target = match ? parseFloat(match[2].replace(/,/g, "")) : 0;
  const suffix = match?.[3] ?? "";
  const decimals = match?.[2].split(".")[1]?.length ?? 0;
  const useCommas = match?.[2].includes(",") ?? false;

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!match || !inView) return;
    if (reduceMotion) {
      setCurrent(target);
      return;
    }
    const controls = animate(0, target, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: setCurrent,
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduceMotion, target, duration]);

  // Value has no number in it (e.g. "A+"): render as-is
  if (!match) return <span className={className}>{raw}</span>;

  const formatted = current.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
    useGrouping: useCommas,
  });

  return (
    <span ref={ref} className={className} aria-label={raw}>
      <span aria-hidden>
        {prefix}
        {formatted}
        {suffix}
      </span>
    </span>
  );
}