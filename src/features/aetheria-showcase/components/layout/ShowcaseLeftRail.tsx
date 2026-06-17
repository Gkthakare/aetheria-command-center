"use client";

import type { RefObject } from "react";

import { ChromeSurface, NeonButton } from "@/design-system/aetheria";
import type { ShowcaseSectionId } from "@/features/aetheria-showcase/types/showcase.types";

const NAV_ITEMS: { id: ShowcaseSectionId | "hero"; label: string; code: string }[] = [
  { id: "hero", label: "Origin", code: "00" },
  { id: "vision", label: "Vision", code: "01" },
  { id: "world-lore", label: "Lore", code: "02" },
  { id: "combat", label: "Combat", code: "03" },
  { id: "progression", label: "Build", code: "04" },
  { id: "vr-systems", label: "VR", code: "05" },
  { id: "tech-architecture", label: "Tech", code: "06" },
  { id: "roadmap", label: "Roadmap", code: "07" },
];

interface ShowcaseLeftRailProps {
  activeSectionId: ShowcaseSectionId | "hero";
  scrollRef: RefObject<HTMLElement | null>;
}

function scrollToSection(
  scrollRef: RefObject<HTMLElement | null>,
  sectionId: string,
) {
  const container = scrollRef.current;
  if (!container) {
    return;
  }

  const target = container.querySelector<HTMLElement>(
    `[data-showcase-section="${sectionId}"]`,
  );
  target?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function ShowcaseLeftRail({
  activeSectionId,
  scrollRef,
}: ShowcaseLeftRailProps) {
  return (
    <aside className="pointer-events-none absolute bottom-[2.75rem] left-0 top-[3.5rem] z-40 hidden w-[10.5rem] p-2 lg:block">
      <ChromeSurface
        compact
        title="Navigation"
        subtitle="Modules"
        className="pointer-events-auto sticky top-[3.5rem]"
      >
        <nav aria-label="Showcase sections" className="flex flex-col gap-0.5">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSectionId === item.id;
            return (
              <NeonButton
                key={item.id}
                variant={isActive ? "primary" : "ghost"}
                active={isActive}
                className={`w-full !justify-start !rounded-none !border-0 !px-2 !py-2 ${
                  isActive ? "border-l-2 !border-l-[#A855F7]" : "border-l-2 border-l-transparent"
                }`}
                onClick={() => scrollToSection(scrollRef, item.id)}
              >
                <span className="text-[#60A5FA]/60">{item.code}</span>
                <span>{item.label}</span>
              </NeonButton>
            );
          })}
        </nav>
      </ChromeSurface>
    </aside>
  );
}

export function ShowcaseMobileNav({
  activeSectionId,
  scrollRef,
}: ShowcaseLeftRailProps) {
  return (
    <nav
      aria-label="Showcase sections"
      className="pointer-events-auto fixed bottom-[2.75rem] left-0 right-0 z-40 flex gap-1 overflow-x-auto border-t border-[#A855F7]/10 bg-[#050510]/80 px-2 py-1.5 backdrop-blur-sm lg:hidden"
    >
      {NAV_ITEMS.map((item) => {
        const isActive = activeSectionId === item.id;
        return (
          <NeonButton
            key={item.id}
            variant={isActive ? "primary" : "ghost"}
            active={isActive}
            className="shrink-0 !px-2 !py-1.5"
            onClick={() => scrollToSection(scrollRef, item.id)}
          >
            {item.label}
          </NeonButton>
        );
      })}
    </nav>
  );
}
