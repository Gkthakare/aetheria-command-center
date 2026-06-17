"use client";

import { motion } from "framer-motion";
import { useRef } from "react";

import {
  BodyText,
  DisplayXL,
  GridOverlay,
  HeroSurface,
  Label,
  NoiseOverlay,
  Subheading,
  SystemBadge,
} from "@/design-system/aetheria";
import { ShowcaseCanvas } from "@/features/aetheria-showcase/components/ShowcaseCanvas";
import { ShowcaseActivityFeed } from "@/features/aetheria-showcase/components/layout/ShowcaseActivityFeed";
import {
  ShowcaseLeftRail,
  ShowcaseMobileNav,
} from "@/features/aetheria-showcase/components/layout/ShowcaseLeftRail";
import { ShowcaseRightRail } from "@/features/aetheria-showcase/components/layout/ShowcaseRightRail";
import { ShowcaseTopCommandBar } from "@/features/aetheria-showcase/components/layout/ShowcaseTopBar";
import {
  CombatSection,
  ProgressionSection,
  RoadmapSection,
  TechArchitectureSection,
  VisionSection,
  VRSystemsSection,
  WorldLoreSection,
} from "@/features/aetheria-showcase/components/sections/ShowcaseSections";
import { SHOWCASE_CONTENT } from "@/features/aetheria-showcase/data/showcaseContent";
import { useShowcaseScroll } from "@/features/aetheria-showcase/hooks/useShowcaseScroll";
import { useCameraMode, useShowcaseCameraScroll } from "@/camera/hooks/useCameraMode";

export function AetheriaShowcase() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { activeSectionId, scrollProgress } = useShowcaseScroll(scrollRef);
  const { hero } = SHOWCASE_CONTENT;

  useCameraMode("aetheria-showcase");
  useShowcaseCameraScroll(scrollProgress);

  return (
    <div className="relative h-dvh w-full overflow-hidden bg-[#050510] text-[#F5F3FF]">
      <ShowcaseCanvas scrollProgress={scrollProgress} />
      <GridOverlay className="z-[1] opacity-[0.025]" />
      <NoiseOverlay className="z-[1] opacity-[0.02]" />

      <ShowcaseTopCommandBar />
      <ShowcaseLeftRail activeSectionId={activeSectionId} scrollRef={scrollRef} />
      <ShowcaseRightRail
        activeSectionId={activeSectionId}
        scrollProgress={scrollProgress}
      />
      <ShowcaseActivityFeed activeSectionId={activeSectionId} />
      <ShowcaseMobileNav activeSectionId={activeSectionId} scrollRef={scrollRef} />

      <main
        ref={scrollRef}
        className="aetheria-command-center relative z-10 h-dvh snap-y snap-mandatory overflow-y-auto overflow-x-hidden scroll-smooth pb-[3.25rem] pt-[3.75rem] lg:pl-[11rem] lg:pr-[13.5rem] xl:pl-[12rem] xl:pr-[14rem]"
      >
        <section
          id="hero"
          data-showcase-section="hero"
          className="relative flex min-h-[calc(100dvh-7rem)] snap-start snap-always items-center justify-center py-12 sm:py-16"
        >
          <HeroSurface align="center">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <SystemBadge variant="signal" className="mb-6">
                {hero.subtitle}
              </SystemBadge>

              <DisplayXL as="h1" align="center">
                {hero.title}
              </DisplayXL>

              <Subheading variant="lead" align="center" className="mt-8">
                {hero.tagline}
              </Subheading>

              <Label variant="accent" className="mt-12 block">
                Director Protocol
              </Label>
              <BodyText
                align="center"
                variant="muted"
                className="mt-2 !max-w-md !text-xs uppercase tracking-[0.22em] sm:!text-sm"
              >
                Select module · Scroll to initialize
              </BodyText>
            </motion.div>
          </HeroSurface>
        </section>

        <VisionSection />
        <WorldLoreSection />
        <CombatSection />
        <ProgressionSection />
        <VRSystemsSection />
        <TechArchitectureSection />
        <RoadmapSection />
      </main>
    </div>
  );
}
