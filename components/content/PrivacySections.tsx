import type { Dictionary } from "@/content/dictionaries";
import styles from "./content.module.css";

export function PrivacySections({
  sections,
}: {
  sections: Dictionary["privacidade"]["sections"];
}) {
  return (
    <div className={styles.container}>
      {sections.map((section) => (
        <article key={section.title} className={styles.pillar}>
          <h2 className={styles.pillarTitle}>{section.title}</h2>
          <div className={styles.pillarBody}>
            {section.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}
