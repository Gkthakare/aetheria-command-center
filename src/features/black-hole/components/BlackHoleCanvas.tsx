"use client";

import { useCallback, useEffect, type PointerEvent } from "react";

import { CanvasRoot } from "@/canvas/core/CanvasRoot";
import { ViewportFrame } from "@/canvas/core/ViewportFrame";
import { BlackHoleScene } from "@/features/black-hole/scenes/BlackHoleScene";
import { useExperienceStore } from "@/stores/experience.store";
import type { QualityLevel } from "@/stores/experience.store";

function resolveInitialQuality(): QualityLevel {
  if (typeof window === "undefined") {
    return "high";
  }

  const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  const lowMemory =
    "deviceMemory" in navigator &&
    (navigator as Navigator & { deviceMemory?: number }).deviceMemory !==
      undefined &&
    ((navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8) <= 4;

  if (reducedMotion || lowMemory) {
    return "low";
  }

  if (coarsePointer) {
    return "medium";
  }

  return "high";
}

export function BlackHoleCanvas() {
  const setMouse = useExperienceStore((state) => state.setMouse);
  const setQualityLevel = useExperienceStore((state) => state.setQualityLevel);

  useEffect(() => {
    setQualityLevel(resolveInitialQuality());
  }, [setQualityLevel]);

  const handlePointerMove = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      const { clientX, clientY, currentTarget } = event;
      const rect = currentTarget.getBoundingClientRect();

      if (rect.width === 0 || rect.height === 0) {
        return;
      }

      const normalizedX = (clientX - rect.left) / rect.width;
      const normalizedY = (clientY - rect.top) / rect.height;

      setMouse(normalizedX * 2 - 1, -(normalizedY * 2 - 1));
    },
    [setMouse],
  );

  const handlePointerLeave = useCallback(() => {
    setMouse(0, 0);
  }, [setMouse]);

  useEffect(() => {
    return () => {
      setMouse(0, 0);
    };
  }, [setMouse]);

  return (
    <ViewportFrame>
      <div
        className="relative h-full w-full touch-none"
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      >
        <CanvasRoot>
          <BlackHoleScene />
        </CanvasRoot>
      </div>
    </ViewportFrame>
  );
}
