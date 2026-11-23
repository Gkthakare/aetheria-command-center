"use client";

import { AnimatePresence, motion } from "framer-motion";

import {
  BodyText,
  ContentSurface,
  Heading,
  Label,
  NeonLink,
  Subheading,
  SystemBadge,
} from "@/design-system/aetheria";
import { getGalaxyProjectById } from "@/features/project-galaxy/data/projects";
import { useGalaxyStore } from "@/features/project-galaxy/stores/galaxy.store";

export function ProjectInfoPanel() {
  const selectedProjectId = useGalaxyStore((state) => state.selectedProjectId);
  const clearProjectSelection = useGalaxyStore(
    (state) => state.clearProjectSelection,
  );

  const project = selectedProjectId
    ? getGalaxyProjectById(selectedProjectId)
    : undefined;

  return (
    <AnimatePresence>
      {project && (
        <motion.aside
          key={project.id}
          initial={{ opacity: 0, x: 32 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 32 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-auto fixed right-4 top-1/2 z-40 w-[calc(100%-2rem)] max-w-md -translate-y-1/2 sm:right-6"
        >
          <ContentSurface
            subtitle="Project Intel"
            headerSlot={
              <button
                type="button"
                onClick={clearProjectSelection}
                className="font-[family-name:var(--font-aetheria-terminal)] text-[10px] uppercase tracking-widest text-[#A855F7]/65 transition-colors hover:text-[#EDE9FE]"
              >
                Close ×
              </button>
            }
          >
            <SystemBadge variant="signal" className="mb-3">
              {project.shortLabel}
            </SystemBadge>

            <div style={{ color: project.color }}>
              <Heading as="h2">{project.name}</Heading>
            </div>

            <Subheading variant="lead" className="mt-3 !max-w-none !text-sm">
              {project.summary}
            </Subheading>

            <BodyText className="mt-4 !max-w-none">{project.description}</BodyText>

            <div className="mt-6 space-y-4">
              <div>
                <Label>Architecture</Label>
                <BodyText variant="muted" className="mt-2 !max-w-none !text-sm">
                  {project.architecture}
                </BodyText>
              </div>

              <div>
                <Label>Tech Stack</Label>
                <ul className="mt-2 flex flex-wrap gap-1.5">
                  {project.techStack.map((tech) => (
                    <li key={tech}>
                      <SystemBadge variant="neutral">{tech}</SystemBadge>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {project.githubUrl ? (
                <NeonLink href={project.githubUrl} variant="signal" target="_blank" rel="noopener noreferrer">
                  GitHub →
                </NeonLink>
              ) : null}
              {project.liveDemoUrl && (
                <NeonLink
                  href={project.liveDemoUrl}
                  variant="primary"
                  target={project.liveDemoUrl.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                >
                  {project.liveDemoUrl.startsWith("http") ? "Live Demo →" : "Open →"}
                </NeonLink>
              )}
              <NeonLink href={`/projects/${project.id}`} variant="ghost">
                Details →
              </NeonLink>
            </div>
          </ContentSurface>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
