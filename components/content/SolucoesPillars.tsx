import type { Dictionary } from "@/content/dictionaries";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import styles from "./content.module.css";

export function SolucoesPillars({
  pillars,
}: {
  pillars: Dictionary["solucoes"]["pillars"];
}) {
  return (
    <div className={styles.container}>
      {pillars.map((pillar, index) => (
        <Reveal as="article" key={pillar.title} index={index} className={styles.pillar}>
          <h2 className={styles.pillarTitle}>{pillar.title}</h2>
          <p className={styles.pillarSummary}>{pillar.summary}</p>
          <div className={styles.pillarBody}>
            {pillar.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className={styles.demoLink}>
            <Button href={pillar.demoHref} variant="secondary">
              {pillar.demoLabel}
            </Button>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
