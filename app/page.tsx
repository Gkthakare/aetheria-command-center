import Link from "next/link";
import type { Metadata } from "next";

import { PortfolioShell, ProjectStack } from "@/features/portfolio/PortfolioShell";
import { featuredProjects, recentProjects } from "@/features/portfolio/projects";
import styles from "@/features/portfolio/portfolio.module.css";
import { siteUrl } from "@/features/portfolio/site-url";

export const metadata: Metadata = {
  alternates: siteUrl ? { canonical: `${siteUrl}/` } : undefined,
};

const documentFlow = [
  ["Upload", "PDF text extraction"],
  ["Index", "Chunks and embeddings"],
  ["Retrieve", "Filter passages by user"],
  ["Answer", "Pass retrieved context to the LLM"],
];

export default function Home() {
  return (
    <PortfolioShell>
      <main className={styles.frame} id="main-content">
        <section className={styles.hero} aria-labelledby="portfolio-title">
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>Gaurav Thakare · Engineering portfolio</p>
            <h1 id="portfolio-title">LLM agents &amp;<br className={styles.heroBreak} /> workflow automation</h1>
            <p className={styles.lead}>
              I build Python applications that turn documents into searchable
              context, connect language models to tools, and make each step
              easier to inspect.
            </p>
            <p className={styles.experience}>3+ years in enterprise software engineering at Amdocs</p>
            <div className={styles.actions}>
              <a className={styles.primaryLink} href="#work">View AI projects</a>
              <Link className={styles.secondaryLink} href="/command-center" prefetch={false}>
                Explore in 3D
              </Link>
            </div>
          </div>

          <figure className={styles.workflow}>
            <figcaption>Inside the document Q&amp;A project</figcaption>
            <ol>
              {documentFlow.map(([action, description]) => (
                <li key={action}>
                  <span className={styles.node} aria-hidden="true" />
                  <div>
                    <strong>{action}</strong>
                    <span>{description}</span>
                  </div>
                </li>
              ))}
            </ol>
          </figure>
        </section>

        <section className={styles.section} id="work" aria-labelledby="work-title">
          <h2 id="work-title">AI engineering projects</h2>
          <div className={styles.projectGrid}>
            {featuredProjects.map((project) => (
              <article className={styles.projectCard} key={project.id}>
                <p className={styles.eyebrow}>{project.focus}</p>
                <h3><Link href={`/projects/${project.id}`}>{project.name}</Link></h3>
                <p className={styles.projectSummary}>{project.summary}</p>
                <ProjectStack items={project.stack} />
                <p className={styles.status}>{project.status}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.section} id="recent" aria-labelledby="recent-title">
          <h2 id="recent-title">Recent development</h2>
          <div className={styles.recentList}>
            {recentProjects.map((project) => (
              <article className={styles.recentRow} key={project.id}>
                <div>
                  <h3><Link href={`/projects/${project.id}`}>{project.name}</Link></h3>
                  <p className={styles.status}>{project.status}</p>
                </div>
                <p className={styles.projectSummary}>{project.summary}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
    </PortfolioShell>
  );
}
