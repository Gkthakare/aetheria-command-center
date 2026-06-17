import { create } from "zustand";

export type QualityLevel = "low" | "medium" | "high";

export interface ExperienceState {
  mouseX: number;
  mouseY: number;
  qualityLevel: QualityLevel;
}

export interface ExperienceActions {
  setMouse: (mouseX: number, mouseY: number) => void;
  setQualityLevel: (qualityLevel: QualityLevel) => void;
}

export type ExperienceStore = ExperienceState & ExperienceActions;

export const useExperienceStore = create<ExperienceStore>((set) => ({
  mouseX: 0,
  mouseY: 0,
  qualityLevel: "high",
  setMouse: (mouseX, mouseY) => set({ mouseX, mouseY }),
  setQualityLevel: (qualityLevel) => set({ qualityLevel }),
}));
