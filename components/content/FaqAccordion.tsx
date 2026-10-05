import type { Dictionary } from "@/content/dictionaries";
import styles from "./content.module.css";

export function FaqAccordion({ items }: { items: Dictionary["faq"]["items"] }) {
  return (
    <div className={styles.container} style={{ gap: 0 }}>
      {items.map((item) => (
        <details key={item.question} className={styles.faqItem}>
          <summary>{item.question}</summary>
          <p className={styles.faqAnswer}>{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
