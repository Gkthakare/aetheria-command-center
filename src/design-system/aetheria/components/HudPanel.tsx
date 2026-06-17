"use client";

import type { ReactNode } from "react";

import { ContentSurface } from "@/design-system/aetheria/surfaces/ContentSurface";

/** @deprecated Use ContentSurface */
interface HudPanelProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  headerSlot?: ReactNode;
  className?: string;
  compact?: boolean;
  animate?: boolean;
  id?: string;
}

export function HudPanel(props: HudPanelProps) {
  return <ContentSurface {...props} />;
}
