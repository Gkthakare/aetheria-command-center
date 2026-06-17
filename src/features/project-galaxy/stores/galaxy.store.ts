import { create } from "zustand";

import { useCameraDirectorStore } from "@/camera/stores/camera.director.store";
import type { GalaxyProjectId } from "@/features/project-galaxy/types/project.types";

export interface GalaxyState {
  hoveredProjectId: GalaxyProjectId | null;
  selectedProjectId: GalaxyProjectId | null;
  isCameraTransitioning: boolean;
}

export interface GalaxyActions {
  setHoveredProject: (projectId: GalaxyProjectId | null) => void;
  setSelectedProject: (projectId: GalaxyProjectId | null) => void;
  clearProjectSelection: () => void;
  setCameraTransitioning: (isTransitioning: boolean) => void;
}

export type GalaxyStore = GalaxyState & GalaxyActions;

export const useGalaxyStore = create<GalaxyStore>((set) => ({
  hoveredProjectId: null,
  selectedProjectId: null,
  isCameraTransitioning: false,
  setHoveredProject: (hoveredProjectId) => set({ hoveredProjectId }),
  setSelectedProject: (selectedProjectId) => {
    if (selectedProjectId) {
      useCameraDirectorStore.getState().focusProject(selectedProjectId);
    }
    set({
      selectedProjectId,
      isCameraTransitioning: selectedProjectId !== null,
    });
  },
  clearProjectSelection: () => {
    useCameraDirectorStore.getState().clearProjectFocus();
    set({ selectedProjectId: null, isCameraTransitioning: true });
  },
  setCameraTransitioning: (isCameraTransitioning) => set({ isCameraTransitioning }),
}));
