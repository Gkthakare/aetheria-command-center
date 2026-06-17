"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

import { AETHERIA_GLOW, AETHERIA_MOTION, AETHERIA_SURFACE } from "@/design-system/aetheria/tokens";
import { Label } from "@/design-system/aetheria/typography/AetheriaTypography";

interface ContentSurfaceProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  headerSlot?: ReactNode;
  className?: string;
  compact?: boolean;
  animate?: boolean;
  id?: string;
}

export function ContentSurface({
  children,
  title,
  subtitle,
  headerSlot,
  className = "",
  compact = false,
  animate = true,
  id,
}: ContentSurfaceProps) {
  const surface = AETHERIA_SURFACE.content;
  const Wrapper = animate ? motion.div : "div";

  return (
    <Wrapper
      id={id}
      className={`group relative ${className}`}
      {...(animate
        ? {
            initial: { opacity: 0, y: 20 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true, amount: 0.25 },
            transition: {
              duration: AETHERIA_MOTION.duration,
              ease: AETHERIA_MOTION.ease,
            },
          }
        : {})}
      style={{ boxShadow: AETHERIA_GLOW.panel }}
    >
      <div
        className={`relative overflow-hidden ${surface.radius} ${surface.background} ${surface.border} ${surface.blur}`}
      >
        <div className={compact ? surface.paddingCompact : surface.padding}>
          {(title || subtitle || headerSlot) && (
            <header className="mb-6 flex flex-wrap items-start justify-between gap-3 border-b border-[#6D28D9]/12 pb-4">
              <div>
                {subtitle && <Label variant="signal">{subtitle}</Label>}
                {title && (
                  <p className="mt-1 font-[family-name:var(--font-aetheria-body)] text-base font-medium text-[#F5F3FF] sm:text-lg">
                    {title}
                  </p>
                )}
              </div>
              {headerSlot}
            </header>
          )}

          {children}
        </div>
      </div>
    </Wrapper>
  );
}
