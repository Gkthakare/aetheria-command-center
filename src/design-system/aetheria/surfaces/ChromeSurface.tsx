"use client";

import type { ReactNode } from "react";

import { AETHERIA_SURFACE } from "@/design-system/aetheria/tokens";
import { Label } from "@/design-system/aetheria/typography/AetheriaTypography";

interface ChromeSurfaceProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  headerSlot?: ReactNode;
  className?: string;
  compact?: boolean;
  id?: string;
}

export function ChromeSurface({
  children,
  title,
  subtitle,
  headerSlot,
  className = "",
  compact = false,
  id,
}: ChromeSurfaceProps) {
  const surface = AETHERIA_SURFACE.chrome;

  return (
    <div
      id={id}
      className={`relative ${surface.radius} ${surface.background} ${surface.border} ${surface.blur} ${className}`}
    >
      {(title || subtitle || headerSlot) && (
        <header
          className={`flex flex-wrap items-start justify-between gap-2 border-b border-[#A855F7]/10 ${compact ? "px-3 py-2 sm:px-3.5" : "px-3 py-2.5 sm:px-4"} ${compact ? "" : "sm:py-3"}`}
        >
          <div>
            {subtitle && (
              <Label variant="signal" className="!text-[9px] !tracking-[0.22em]">
                {subtitle}
              </Label>
            )}
            {title && (
              <p className="mt-0.5 font-[family-name:var(--font-aetheria-body)] text-sm font-medium tracking-wide text-[#EDE9FE]/90">
                {title}
              </p>
            )}
          </div>
          {headerSlot}
        </header>
      )}

      <div className={compact ? surface.paddingCompact : surface.padding}>
        {children}
      </div>
    </div>
  );
}
