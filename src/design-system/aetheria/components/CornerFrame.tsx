"use client";

import { motion } from "framer-motion";

interface CornerFrameProps {
  size?: "sm" | "md" | "lg";
  animated?: boolean;
  className?: string;
}

const sizeMap = {
  sm: "h-3 w-3 border",
  md: "h-5 w-5 border-2",
  lg: "h-7 w-7 border-2",
};

export function CornerFrame({
  size = "md",
  animated = true,
  className = "",
}: CornerFrameProps) {
  const dim = sizeMap[size];
  const pulse = animated
    ? {
        opacity: [0.45, 1, 0.55, 1] as number[],
        transition: { duration: 2.8, repeat: Infinity, ease: "easeInOut" as const },
      }
    : undefined;

  return (
    <>
      <motion.span
        aria-hidden
        className={`pointer-events-none absolute left-0 top-0 ${dim} border-[#A855F7] ${className}`}
        animate={pulse}
      />
      <motion.span
        aria-hidden
        className={`pointer-events-none absolute right-0 top-0 ${dim} border-[#A855F7] ${className}`}
        animate={pulse}
        transition={{ ...pulse?.transition, delay: 0.35 }}
      />
      <motion.span
        aria-hidden
        className={`pointer-events-none absolute bottom-0 left-0 ${dim} border-[#60A5FA]/80 ${className}`}
        animate={pulse}
        transition={{ ...pulse?.transition, delay: 0.7 }}
      />
      <motion.span
        aria-hidden
        className={`pointer-events-none absolute bottom-0 right-0 ${dim} border-[#60A5FA]/80 ${className}`}
        animate={pulse}
        transition={{ ...pulse?.transition, delay: 1.05 }}
      />
    </>
  );
}
