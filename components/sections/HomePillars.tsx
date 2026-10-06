import Link from "next/link";
import type { Dictionary } from "@/content/dictionaries";
import { Reveal } from "@/components/motion/Reveal";
import { SectionTurn } from "./SectionTurn";
import styles from "./HomePillars.module.css";

export function HomePillars({ home }: { home: Dictionary["home"] }) {
  return (
    <SectionTurn phase="madrugada" turnLabel={home.pillarsTurnLabel} id="turno-madrugada">
      <Reveal as="div">
        <h2 className={styles.title}>{home.pillarsTitle}</h2>
        <p className={styles.lede}>{home.pillarsLede}</p>
      </Reveal>
      <div className={styles.grid}>
        {home.pillars.map((pillar, index) => (
          <Reveal as="article" key={pillar.title} index={index} delay={120} className={styles.card}>
            <h3 className={styles.cardTitle}>{pillar.title}</h3>
            <p className={styles.cardBody}>{pillar.body}</p>
            <Link href={pillar.href} className={styles.cardLink}>
              {pillar.linkLabel} →
            </Link>
          </Reveal>
        ))}
      </div>
    </SectionTurn>
  );
}
