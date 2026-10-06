import type { Dictionary } from "@/content/dictionaries";
import { Reveal } from "@/components/motion/Reveal";
import styles from "./content.module.css";

export function ComoEuTrabalho({
  comoEuTrabalho,
}: {
  comoEuTrabalho: Dictionary["comoEuTrabalho"];
}) {
  return (
    <div className={styles.container}>
      <ol className={styles.steps}>
        {comoEuTrabalho.steps.map((step, index) => (
          <Reveal as="li" key={step.title} index={index} className={styles.step}>
            <p className={styles.stepTitle}>{step.title}</p>
            <p className={styles.stepBody}>{step.body}</p>
          </Reveal>
        ))}
      </ol>

      <Reveal as="div" delay={comoEuTrabalho.steps.length * 70} className={styles.boundaryBox}>
        <h2 className={styles.boundaryTitle}>{comoEuTrabalho.aiBoundary.title}</h2>
        <p className={styles.boundaryLede}>{comoEuTrabalho.aiBoundary.lede}</p>
        <ul className={styles.boundaryList}>
          {comoEuTrabalho.aiBoundary.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </Reveal>
    </div>
  );
}
