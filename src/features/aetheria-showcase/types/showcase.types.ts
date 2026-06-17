export type ShowcaseSectionId =
  | "vision"
  | "world-lore"
  | "combat"
  | "progression"
  | "vr-systems"
  | "tech-architecture"
  | "roadmap";

export interface ShowcaseSectionContent {
  id: ShowcaseSectionId;
  eyebrow: string;
  title: string;
  lead: string;
  body: string;
  highlights: readonly string[];
  align: "left" | "center";
}

export interface ShowcaseRoadmapPhase {
  phase: string;
  title: string;
  items: readonly string[];
}

export interface ShowcaseContent {
  hero: {
    title: string;
    subtitle: string;
    tagline: string;
  };
  sections: readonly ShowcaseSectionContent[];
  roadmapPhases: readonly ShowcaseRoadmapPhase[];
}

export interface ShowcaseScrollState {
  activeSectionId: ShowcaseSectionId | "hero";
  activeIndex: number;
  scrollProgress: number;
}
