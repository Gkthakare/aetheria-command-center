"use client";

import type { ReactNode } from "react";

interface HudCardProps {
  children: ReactNode;
  className?: string;
  accent?: "primary" | "signal";
}

/** Lightweight inline row — Tier 1 chrome styling, no effects stack. */
export function HudCard({
  children,
  className = "",
  accent = "primary",
}: HudCardProps) {
  const borderAccent =
    accent === "signal"
      ? "border-[#60A5FA]/15"
      : "border-[#6D28D9]/12";

  return (
    <div
      className={`rounded-md border bg-[#050510]/30 px-3 py-2.5 ${borderAccent} ${className}`}
    >
      {children}
    </div>
  );
}
