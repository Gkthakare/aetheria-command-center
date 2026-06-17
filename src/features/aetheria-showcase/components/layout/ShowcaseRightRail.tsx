"use client";

import {
  ChromeSurface,
  DataMetric,
  StatusIndicator,
} from "@/design-system/aetheria";
import type { ShowcaseSectionId } from "@/features/aetheria-showcase/types/showcase.types";

interface ShowcaseRightRailProps {
  activeSectionId: ShowcaseSectionId | "hero";
  scrollProgress: number;
}

const SECTION_METRICS: Record<
  ShowcaseSectionId | "hero",
  { load: number; signal: string; integrity: number }
> = {
  hero: { load: 12, signal: "STABLE", integrity: 99.2 },
  vision: { load: 24, signal: "NOMINAL", integrity: 98.7 },
  "world-lore": { load: 31, signal: "MAPPING", integrity: 97.4 },
  combat: { load: 58, signal: "COMBAT", integrity: 96.1 },
  progression: { load: 44, signal: "SYNCING", integrity: 97.8 },
  "vr-systems": { load: 67, signal: "VR LINK", integrity: 95.5 },
  "tech-architecture": { load: 39, signal: "ANALYZE", integrity: 98.2 },
  roadmap: { load: 22, signal: "PLANNING", integrity: 99.0 },
};

export function ShowcaseRightRail({
  activeSectionId,
  scrollProgress,
}: ShowcaseRightRailProps) {
  const metrics = SECTION_METRICS[activeSectionId];
  const renderLoad = Math.round(metrics.load + scrollProgress * 18);

  return (
    <aside className="pointer-events-none absolute bottom-[2.75rem] right-0 top-[3.5rem] z-40 hidden w-[12.5rem] p-2 xl:block xl:w-[13.5rem]">
      <ChromeSurface
        compact
        title="Telemetry"
        subtitle="Metrics"
        className="pointer-events-auto sticky top-[3.5rem]"
      >
        <div className="space-y-4">
          <DataMetric
            label="Render Load"
            value={renderLoad}
            unit="%"
            trend={renderLoad > 50 ? "up" : "stable"}
            accent="signal"
          />
          <DataMetric
            label="Integrity"
            value={metrics.integrity.toFixed(1)}
            unit="%"
            trend="stable"
          />

          <div className="space-y-2.5 border-t border-[#A855F7]/10 pt-3">
            <StatusIndicator label="Module" value={metrics.signal} tone="signal" />
            <StatusIndicator label="Link" value="SECURE" tone="online" />
          </div>

          <div
            aria-hidden
            className="relative h-12 overflow-hidden rounded border border-[#6D28D9]/12 bg-[#050510]/50"
          >
            <div className="absolute inset-0 flex items-end gap-px px-1.5 pb-1.5">
              {Array.from({ length: 12 }).map((_, index) => {
                const height =
                  20 +
                  Math.sin(index * 0.8 + scrollProgress * 12) * 16 +
                  metrics.load * 0.25;
                return (
                  <div
                    key={index}
                    className="flex-1 rounded-t bg-[#6D28D9]/50"
                    style={{ height: `${Math.min(height, 90)}%` }}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </ChromeSurface>
    </aside>
  );
}
