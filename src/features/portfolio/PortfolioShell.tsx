import type { ReactNode } from "react";
import Link from "next/link";

import { githubProfile } from "./projects";
import styles from "./portfolio.module.css";

export function PortfolioShell({ children }: { children: ReactNode }) {
  return (
    <div className={styles.site}>
      <a className={styles.skipLink} href="#main-content">Skip to content</a>
      <header className={styles.header}>
        <div className={styles.frame}>
          <Link className={styles.brand} href="/">
            <span className={styles.brandMark} aria-hidden="true" />
            Aetheria Command Center
          </Link>
          <nav className={styles.nav} aria-label="Portfolio">
            <Link href="/#work">Projects</Link>
            <Link href="/#recent">Recent work</Link>
            <a href={githubProfile}>GitHub</a>
          </nav>
        </div>
      </header>
      {children}
      <footer className={styles.footer}>
        <div className={styles.frame}>
          <span>Gaurav Thakare</span>
          <Link href="/command-center" prefetch={false}>Explore the 3D Command Center</Link>
        </div>
      </footer>
    </div>
  );
}

export function ProjectStack({ items }: { items: readonly string[] }) {
  return (
    <ul className={styles.stack} aria-label="Technologies">
      {items.map((item) => <li key={item}>{item}</li>)}
    </ul>
  );
}
