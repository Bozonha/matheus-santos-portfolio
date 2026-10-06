import type { Dictionary } from "@/content/dictionaries";
import { Reveal } from "@/components/motion/Reveal";
import styles from "./content.module.css";

export function Sobre({ sobre }: { sobre: Dictionary["sobre"] }) {
  return (
    <div className={styles.container}>
      <div className={styles.pillarBody}>
        {sobre.bio.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      <div className={`${styles.grid}`}>
        {sobre.focus.map((item, index) => (
          <Reveal as="article" key={item.title} index={index} className={styles.card}>
            <h2 className={styles.cardTitle}>{item.title}</h2>
            <p className={styles.cardSummary}>{item.body}</p>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
