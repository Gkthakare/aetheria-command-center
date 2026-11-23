import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PortfolioShell, ProjectStack } from "@/features/portfolio/PortfolioShell";
import { getPortfolioProject, portfolioProjects } from "@/features/portfolio/projects";
import styles from "@/features/portfolio/portfolio.module.css";
import { siteUrl } from "@/features/portfolio/site-url";
import { GALAXY_PROJECTS, getGalaxyProjectById } from "@/features/project-galaxy/data/projects";

const statusLabels = {
  live: "Hosted",
  local: "Local project",
  "quest-build": "Quest / Unity build",
  "cli-only": "CLI demo",
} as const;

type ProjectPageProps = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  const ids = new Set([...portfolioProjects, ...GALAXY_PROJECTS].map(({ id }) => id));
  return Array.from(ids, (id) => ({ id }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { id } = await params;
  const project = getPortfolioProject(id) ?? getGalaxyProjectById(id);

  if (!project) return {};

  return {
    title: project.name,
    description: project.summary,
    alternates: siteUrl ? { canonical: `${siteUrl}/projects/${id}` } : undefined,
    openGraph: { title: project.name, description: project.summary, type: "website" },
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { id } = await params;
  const project = getPortfolioProject(id);
  const galaxyProject = getGalaxyProjectById(id);

  if (!project && !galaxyProject) notFound();

  return (
    <PortfolioShell>
      <main className={styles.detail} id="main-content">
        <Link className={styles.backLink} href="/#work">Back to projects</Link>
        {project ? (
          <>
            <p className={styles.eyebrow}>{project.focus}</p>
            <h1>{project.name}</h1>
            <p className={styles.lead}>{project.summary}</p>
            <p className={styles.status}>{project.status}</p>
            <ProjectStack items={project.stack} />

            <section>
              <h2>How it works</h2>
              <ul>
                {project.approach.map((step) => <li key={step}>{step}</li>)}
              </ul>
            </section>

            <section>
              <h2>Project evidence</h2>
              <p>{project.evidence}</p>
              {project.sources && (
                <div className={styles.actions}>
                  {project.sources.map((source) => (
                    <Link className={styles.secondaryLink} key={source.href} href={source.href}>
                      {source.label}
                    </Link>
                  ))}
                </div>
              )}
            </section>
            {galaxyProject?.runLocally && (
              <section>
                <h2>Run locally</h2>
                <ul>
                  {galaxyProject.runLocally.map((step) => <li key={step}>{step}</li>)}
                </ul>
              </section>
            )}
          </>
        ) : galaxyProject && (
          <>
            <p className={styles.eyebrow}>{statusLabels[galaxyProject.status]}</p>
            <h1>{galaxyProject.name}</h1>
            <p className={styles.lead}>{galaxyProject.description}</p>
            <ProjectStack items={galaxyProject.techStack} />

            <section>
              <h2>Architecture</h2>
              <p>{galaxyProject.architecture}</p>
              {galaxyProject.runLocally && (
                <ul>
                  {galaxyProject.runLocally.map((step) => <li key={step}>{step}</li>)}
                </ul>
              )}
              <div className={styles.actions}>
                {galaxyProject.githubUrl && (
                  <a className={styles.secondaryLink} href={galaxyProject.githubUrl}>GitHub repository</a>
                )}
                {galaxyProject.liveDemoUrl && (
                  <Link className={styles.secondaryLink} href={galaxyProject.liveDemoUrl} prefetch={false}>
                    Open project
                  </Link>
                )}
              </div>
            </section>
          </>
        )}
      </main>
    </PortfolioShell>
  );
}
