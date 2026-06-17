import Link from "next/link";
import { notFound } from "next/navigation";

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

const STATUS_LABELS = {
  live: "Live (hosted)",
  local: "Run locally",
  "quest-build": "Quest / Unity build",
  "cli-only": "CLI only",
} as const;

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = getGalaxyProjectById(id);
  if (!project) notFound();

  const openHref =
    project.liveDemoUrl ??
    (project.status === "local" || project.status === "quest-build"
      ? `/projects/${project.id}`
      : project.githubUrl);

  return (
    <main className="min-h-screen bg-[#050508] px-4 py-10 text-[#EDE9FE] sm:px-8">
      <div className="mx-auto max-w-2xl">
        <Link
          href="/"
          className="font-[family-name:var(--font-aetheria-terminal)] text-[10px] uppercase tracking-widest text-[#A855F7]/65 transition-colors hover:text-[#EDE9FE]"
        >
          ← Back to Command Center
        </Link>

        <ContentSurface subtitle="Project Intel" className="mt-6">
          <SystemBadge variant="signal" className="mb-3">
            {project.shortLabel}
          </SystemBadge>
          <div style={{ color: project.color }}>
            <Heading as="h1">{project.name}</Heading>
          </div>
          <Subheading variant="lead" className="mt-3 !max-w-none !text-sm">
            {project.summary}
          </Subheading>
          <BodyText className="mt-4 !max-w-none">{project.description}</BodyText>

          <div className="mt-6">
            <Label>Status</Label>
            <SystemBadge variant="neutral" className="mt-2">
              {STATUS_LABELS[project.status]}
            </SystemBadge>
          </div>

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
            {project.runLocally && project.runLocally.length > 0 && (
              <div>
                <Label>Run locally</Label>
                <ol className="mt-2 list-decimal space-y-1 pl-5 font-[family-name:var(--font-aetheria-terminal)] text-xs text-[#A855F7]/80">
                  {project.runLocally.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
              </div>
            )}
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            <NeonLink
              href={project.githubUrl}
              variant="signal"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub →
            </NeonLink>
            {project.liveDemoUrl && (
              <NeonLink
                href={project.liveDemoUrl}
                variant="primary"
                target={
                  project.liveDemoUrl.startsWith("http") ? "_blank" : undefined
                }
                rel="noopener noreferrer"
              >
                {project.liveDemoUrl.startsWith("http")
                  ? "Live Demo →"
                  : "Open in portfolio →"}
              </NeonLink>
            )}
            {!project.liveDemoUrl && (
              <NeonLink href={openHref} variant="primary">
                Project page
              </NeonLink>
            )}
          </div>
        </ContentSurface>
      </div>
    </main>
  );
}
