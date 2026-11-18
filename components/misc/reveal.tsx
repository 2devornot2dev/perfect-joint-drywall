// components/misc/reveal.tsx
"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  scale?: number;
  /** Starting horizontal scale (0 = draws in). Pair with an origin-* class. */
  scaleX?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article" | "ul" | "ol" | "h1" | "h2" | "h3" | "p" | "span";
  trigger?: "view" | "mount";
  once?: boolean;
  margin?: string;
};

export function Reveal({
  children,
  delay = 0,
  duration = 0.8,
  x = 0,
  y = 24,
  scale = 1,
  scaleX = 1,
  className,
  as = "div",
  trigger = "view",
  once = true,
  margin = "-80px",
}: RevealProps) {
  const reduceMotion = useReducedMotion();
  const MotionTag = motion[as] as typeof motion.div;

  const visible = { opacity: 1, x: 0, y: 0, scale: 1, scaleX: 1 };

  return (
    <MotionTag
      className={className}
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x, y, scale, scaleX }}
      {...(trigger === "mount"
        ? { animate: visible }
        : { whileInView: visible, viewport: { once, margin } })}
      transition={{
        duration: reduceMotion ? 0.3 : duration,
        delay: reduceMotion ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </MotionTag>
  );
}