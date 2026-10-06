import type { Dictionary } from "@/content/dictionaries";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { SectionTurn } from "./SectionTurn";
import styles from "./HomeClosing.module.css";

export function HomeClosing({ home }: { home: Dictionary["home"] }) {
  return (
    <SectionTurn phase="dia" turnLabel={home.closingTurnLabel} id="turno-dia">
      <Reveal as="div">
        <h2 className={styles.title}>{home.closingTitle}</h2>
      </Reveal>
      <div className={styles.body}>
        {home.closingBody.map((paragraph, index) => (
          <Reveal as="div" key={paragraph} index={index} delay={80}>
            <p>{paragraph}</p>
          </Reveal>
        ))}
      </div>
      <Reveal as="div" delay={80 + home.closingBody.length * 70}>
        <Button href={home.closingCta.href} variant="primary">
          {home.closingCta.label}
        </Button>
      </Reveal>
    </SectionTurn>
  );
}
