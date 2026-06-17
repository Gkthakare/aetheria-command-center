"use client";

import { useEffect, useState } from "react";

import type {
  ShowcaseScrollState,
  ShowcaseSectionId,
} from "@/features/aetheria-showcase/types/showcase.types";

const SECTION_IDS: ShowcaseSectionId[] = [
  "vision",
  "world-lore",
  "combat",
  "progression",
  "vr-systems",
  "tech-architecture",
  "roadmap",
];

export function useShowcaseScroll(containerRef: React.RefObject<HTMLElement | null>) {
  const [state, setState] = useState<ShowcaseScrollState>({
    activeSectionId: "hero",
    activeIndex: 0,
    scrollProgress: 0,
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const update = () => {
      const scrollTop = container.scrollTop;
      const maxScroll = Math.max(container.scrollHeight - container.clientHeight, 1);
      const scrollProgress = scrollTop / maxScroll;

      const viewportCenter = scrollTop + container.clientHeight * 0.42;
      const sections = container.querySelectorAll<HTMLElement>("[data-showcase-section]");

      let activeIndex = 0;
      let activeSectionId: ShowcaseScrollState["activeSectionId"] = "hero";

      sections.forEach((section, index) => {
        const { offsetTop, offsetHeight } = section;
        if (viewportCenter >= offsetTop && viewportCenter < offsetTop + offsetHeight) {
          activeIndex = index;
          const id = section.dataset.showcaseSection;
          activeSectionId =
            id === "hero" ? "hero" : (id as ShowcaseSectionId);
        }
      });

      setState({ activeSectionId, activeIndex, scrollProgress });
    };

    update();
    container.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      container.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [containerRef]);

  return { ...state, sectionIds: SECTION_IDS };
}
