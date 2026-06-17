"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

import { AETHERIA_MOTION } from "@/design-system/aetheria/tokens";

interface HeroSurfaceProps {
  children: ReactNode;
  className?: string;
  align?: "left" | "center";
  animate?: boolean;
  id?: string;
}

export function HeroSurface({
  children,
  className = "",
  align = "center",
  animate = true,
  id,
}: HeroSurfaceProps) {
  const Wrapper = animate ? motion.div : "div";

  return (
    <Wrapper
      id={id}
      className={`relative w-full max-w-4xl px-4 sm:px-6 md:px-8 ${
        align === "center" ? "mx-auto text-center" : "text-left"
      } ${className}`}
      {...(animate
        ? {
            initial: { opacity: 0, y: 16 },
            animate: { opacity: 1, y: 0 },
            transition: {
              duration: AETHERIA_MOTION.duration + 0.2,
              ease: AETHERIA_MOTION.ease,
            },
          }
        : {})}
    >
      {children}
    </Wrapper>
  );
}
