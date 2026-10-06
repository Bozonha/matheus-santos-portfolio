import type { Dictionary } from "@/content/dictionaries";
import { Reveal } from "@/components/motion/Reveal";
import styles from "./content.module.css";

export function FaqAccordion({ items }: { items: Dictionary["faq"]["items"] }) {
  return (
    <div className={styles.container} style={{ gap: 0 }}>
      {items.map((item, index) => (
        <Reveal as="div" key={item.question} index={index} stagger={50} y={10}>
          <details className={styles.faqItem}>
            <summary>{item.question}</summary>
            <p className={styles.faqAnswer}>{item.answer}</p>
          </details>
        </Reveal>
      ))}
    </div>
  );
}
