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
      <div className={styles.focusList}>
        {sobre.focus.map((item, index) => (
          <Reveal as="article" key={item.title} index={index} className={styles.focusItem}>
            <span className={styles.focusIndex} aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div className={styles.focusBody}>
              <h2 className={styles.focusTitle}>{item.title}</h2>
              <p>{item.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
