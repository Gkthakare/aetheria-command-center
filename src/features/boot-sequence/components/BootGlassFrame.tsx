"use client";

import type { ReactNode } from "react";

import { ContentSurface } from "@/design-system/aetheria";

const easeOut = [0.22, 1, 0.36, 1] as const;

interface BootGlassFrameProps {
  children: ReactNode;
  className?: string;
  subtitle?: string;
  title?: string;
}

/** Tier 2 content shell — no rotating borders or scanlines. */
export function BootGlassFrame({
  children,
  className = "",
  subtitle,
  title,
}: BootGlassFrameProps) {
  return (
    <ContentSurface
      compact
      animate={false}
      subtitle={subtitle}
      title={title}
      className={className}
    >
      {children}
    </ContentSurface>
  );
}

export { easeOut };
