"use client";

import { useEffect } from "react";

import { useCameraDirectorStore } from "@/camera/stores/camera.director.store";
import type { CameraMode } from "@/camera/types/camera.types";

export function useCameraMode(mode: CameraMode, active = true) {
  const setMode = useCameraDirectorStore((state) => state.setMode);

  useEffect(() => {
    if (!active) {
      return;
    }

    setMode(mode);

    return () => {
      if (mode === "aetheria-showcase") {
        useCameraDirectorStore.getState().setMode("command-center");
      }
    };
  }, [active, mode, setMode]);
}

export function useShowcaseCameraScroll(scrollProgress: number) {
  const setShowcaseScrollProgress = useCameraDirectorStore(
    (state) => state.setShowcaseScrollProgress,
  );

  useEffect(() => {
    setShowcaseScrollProgress(scrollProgress);
  }, [scrollProgress, setShowcaseScrollProgress]);
}
