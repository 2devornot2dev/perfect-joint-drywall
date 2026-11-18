"use client";

import { motion, useReducedMotion } from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;

export function AnimatedCheck() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative flex h-24 w-24 items-center justify-center" aria-hidden>
      {/* One-time ripple after the badge lands */}
      {!reduceMotion && (
        <motion.span
          className="absolute inset-0 rounded-full bg-primary/30"
          initial={{ scale: 1, opacity: 0 }}
          animate={{ scale: 1.7, opacity: [0, 0.6, 0] }}
          transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
        />
      )}

      <motion.div
        className="relative flex h-24 w-24 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-xl"
        initial={reduceMotion ? false : { scale: 0.4, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
      >
        <svg
          viewBox="0 0 24 24"
          className="h-11 w-11"
          fill="none"
          stroke="currentColor"
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <motion.path
            d="M5 13l4 4L19 7"
            initial={reduceMotion ? false : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 0.5, ease: EASE }}
          />
        </svg>
      </motion.div>
    </div>
  );
}