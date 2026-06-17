"use client";

import {
  BodyText,
  ChromeSurface,
  Label,
  StatusIndicator,
} from "@/design-system/aetheria";
import type { HudMetrics } from "@/hooks/useHudMetrics";
import type { HudConfig } from "@/lib/hud.config";

interface TopStatusBarProps {
  topBar: HudConfig["topBar"];
  metrics: HudMetrics;
}

export function TopStatusBar({ topBar, metrics }: TopStatusBarProps) {
  return (
    <header className="pointer-events-none absolute inset-x-0 top-0 z-40 p-3 sm:p-4">
      <div className="mx-auto max-w-3xl">
        <ChromeSurface compact subtitle="System Telemetry">
          <div className="grid gap-3 sm:grid-cols-3">
            <StatusIndicator
              label="Status"
              value={topBar.systemStatus}
              tone="online"
            />
            <StatusIndicator
              label="FPS"
              value={`${metrics.fps}`}
              tone="signal"
            />
            <StatusIndicator
              label="Core"
              value={`${metrics.coreStability.toFixed(1)}%`}
              tone={metrics.coreStability >= 97 ? "online" : "warning"}
            />
          </div>
          <Label className="mt-2 hidden sm:block">{topBar.systemLabel}</Label>
        </ChromeSurface>
      </div>
    </header>
  );
}
