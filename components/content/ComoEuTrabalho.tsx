import type { Dictionary } from "@/content/dictionaries";
import styles from "./content.module.css";

export function ComoEuTrabalho({
  comoEuTrabalho,
}: {
  comoEuTrabalho: Dictionary["comoEuTrabalho"];
}) {
  return (
    <div className={styles.container}>
      <ol className={styles.steps}>
        {comoEuTrabalho.steps.map((step) => (
          <li key={step.title} className={styles.step}>
            <p className={styles.stepTitle}>{step.title}</p>
            <p className={styles.stepBody}>{step.body}</p>
          </li>
        ))}
      </ol>

      <div className={styles.boundaryBox}>
        <h2 className={styles.boundaryTitle}>{comoEuTrabalho.aiBoundary.title}</h2>
        <p className={styles.boundaryLede}>{comoEuTrabalho.aiBoundary.lede}</p>
        <ul className={styles.boundaryList}>
          {comoEuTrabalho.aiBoundary.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
