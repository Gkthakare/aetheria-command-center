import { create } from "zustand";

import type { CameraMode } from "@/camera/types/camera.types";
import type { GalaxyProjectId } from "@/features/project-galaxy/types/project.types";

export interface CameraDirectorState {
  mode: CameraMode;
  focusProjectId: GalaxyProjectId | null;
  showcaseScrollProgress: number;
  isTransitioning: boolean;
  transitionProgress: number;
}

export interface CameraDirectorActions {
  setMode: (mode: CameraMode) => void;
  focusProject: (projectId: GalaxyProjectId) => void;
  clearProjectFocus: () => void;
  setShowcaseScrollProgress: (progress: number) => void;
  setTransitioning: (isTransitioning: boolean, progress?: number) => void;
}

export type CameraDirectorStore = CameraDirectorState & CameraDirectorActions;

export const useCameraDirectorStore = create<CameraDirectorStore>((set) => ({
  mode: "command-center",
  focusProjectId: null,
  showcaseScrollProgress: 0,
  isTransitioning: false,
  transitionProgress: 0,

  setMode: (mode) =>
    set((state) => ({
      mode,
      focusProjectId: mode === "project-focus" ? state.focusProjectId : null,
      isTransitioning: true,
      transitionProgress: 0,
    })),

  focusProject: (projectId) =>
    set({
      mode: "project-focus",
      focusProjectId: projectId,
      isTransitioning: true,
      transitionProgress: 0,
    }),

  clearProjectFocus: () =>
    set({
      mode: "command-center",
      focusProjectId: null,
      isTransitioning: true,
      transitionProgress: 0,
    }),

  setShowcaseScrollProgress: (showcaseScrollProgress) =>
    set({ showcaseScrollProgress }),

  setTransitioning: (isTransitioning, transitionProgress) =>
    set({
      isTransitioning,
      transitionProgress:
        transitionProgress ??
        (isTransitioning ? 0 : 1),
    }),
}));
