"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

import {
  BodyText,
  ContentSurface,
  DisplayLG,
  HudCard,
  Label,
  Subheading,
} from "@/design-system/aetheria";
import { SHOWCASE_TRANSITION } from "@/features/aetheria-showcase/config/showcase.config";

interface ShowcaseSectionProps {
  id: string;
  eyebrow: string;
  title: string;
  lead: string;
  body: string;
  highlights: readonly string[];
  align?: "left" | "center";
  children?: ReactNode;
}

export function ShowcaseSection({
  id,
  eyebrow,
  title,
  lead,
  body,
  highlights,
  align = "left",
  children,
}: ShowcaseSectionProps) {
  const isCenter = align === "center";

  return (
    <section
      id={id}
      data-showcase-section={id}
      className="relative flex min-h-[calc(100dvh-7rem)] snap-start snap-always items-center px-4 py-10 sm:px-8 sm:py-14 md:px-12"
    >
      <ContentSurface
        subtitle={eyebrow}
        className={`mx-auto w-full max-w-3xl ${isCenter ? "[&_header]:text-center [&_header>div]:mx-auto" : ""}`}
      >
        <div className={isCenter ? "text-center" : "text-left"}>
          <DisplayLG as="h2" align={align}>
            {title}
          </DisplayLG>

          <div className="mt-8 space-y-5">
            <Subheading variant="lead" align={align}>
              {lead}
            </Subheading>
            <BodyText align={align}>{body}</BodyText>
          </div>

          <div className="mt-10">
            <Label variant="signal" className={isCenter ? "block text-center" : "block"}>
              Capabilities
            </Label>
            <ul
              className={`mt-4 grid gap-2 sm:grid-cols-3 ${
                isCenter ? "justify-items-stretch" : ""
              }`}
            >
              {highlights.map((item, index) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{
                    delay: index * SHOWCASE_TRANSITION.stagger,
                    duration: 0.4,
                  }}
                  className="list-none"
                >
                  <HudCard accent={index % 2 === 0 ? "primary" : "signal"}>
                    <BodyText className="!max-w-none !text-sm">{item}</BodyText>
                  </HudCard>
                </motion.li>
              ))}
            </ul>
          </div>

          {children}
        </div>
      </ContentSurface>
    </section>
  );
}
