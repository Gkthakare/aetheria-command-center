"use client";

import {
  BodyText,
  Heading,
  HudCard,
  Label,
} from "@/design-system/aetheria";
import { ShowcaseSection } from "@/features/aetheria-showcase/components/ShowcaseSection";
import { SHOWCASE_CONTENT, getShowcaseSection } from "@/features/aetheria-showcase/data/showcaseContent";

function SectionFromData({ id }: { id: string }) {
  const content = getShowcaseSection(id);
  if (!content) {
    return null;
  }
  return <ShowcaseSection {...content} />;
}

export function VisionSection() {
  return <SectionFromData id="vision" />;
}

export function WorldLoreSection() {
  return <SectionFromData id="world-lore" />;
}

export function CombatSection() {
  return <SectionFromData id="combat" />;
}

export function ProgressionSection() {
  return <SectionFromData id="progression" />;
}

export function VRSystemsSection() {
  return <SectionFromData id="vr-systems" />;
}

export function TechArchitectureSection() {
  return <SectionFromData id="tech-architecture" />;
}

export function RoadmapSection() {
  const content = getShowcaseSection("roadmap");
  if (!content) {
    return null;
  }

  return (
    <ShowcaseSection {...content}>
      <div className="mt-10">
        <Label variant="signal">Launch Phases</Label>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {SHOWCASE_CONTENT.roadmapPhases.map((phase, index) => (
            <HudCard key={phase.phase} accent={index % 2 === 0 ? "primary" : "signal"}>
              <Label variant="signal">{phase.phase}</Label>
              <Heading as="h4" className="mt-1 !text-base sm:!text-lg">
                {phase.title}
              </Heading>
              <ul className="mt-3 space-y-1 border-t border-[#6D28D9]/10 pt-3">
                {phase.items.map((item) => (
                  <li key={item}>
                    <BodyText variant="muted" className="!max-w-none !text-sm">
                      {item}
                    </BodyText>
                  </li>
                ))}
              </ul>
            </HudCard>
          ))}
        </div>
      </div>
    </ShowcaseSection>
  );
}
