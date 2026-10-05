import Link from "next/link";
import type { Dictionary } from "@/content/dictionaries";
import { SectionTurn } from "./SectionTurn";
import styles from "./HomePillars.module.css";

export function HomePillars({ home }: { home: Dictionary["home"] }) {
  return (
    <SectionTurn phase="madrugada" turnLabel={home.pillarsTurnLabel} id="turno-madrugada">
      <h2 className={styles.title}>{home.pillarsTitle}</h2>
      <p className={styles.lede}>{home.pillarsLede}</p>
      <div className={styles.grid}>
        {home.pillars.map((pillar) => (
          <article key={pillar.title} className={styles.card}>
            <h3 className={styles.cardTitle}>{pillar.title}</h3>
            <p className={styles.cardBody}>{pillar.body}</p>
            <Link href={pillar.href} className={styles.cardLink}>
              {pillar.linkLabel} →
            </Link>
          </article>
        ))}
      </div>
    </SectionTurn>
  );
}
