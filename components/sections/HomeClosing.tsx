import type { Dictionary } from "@/content/dictionaries";
import { Button } from "@/components/ui/Button";
import { SectionTurn } from "./SectionTurn";
import styles from "./HomeClosing.module.css";

export function HomeClosing({ home }: { home: Dictionary["home"] }) {
  return (
    <SectionTurn phase="dia" turnLabel={home.closingTurnLabel} id="turno-dia">
      <h2 className={styles.title}>{home.closingTitle}</h2>
      <div className={styles.body}>
        {home.closingBody.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      <Button href={home.closingCta.href} variant="primary">
        {home.closingCta.label}
      </Button>
    </SectionTurn>
  );
}
