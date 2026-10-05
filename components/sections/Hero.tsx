import type { Dictionary } from "@/content/dictionaries";
import { Button } from "@/components/ui/Button";
import { SectionTurn } from "./SectionTurn";
import { HeroChatPreview } from "./HeroChatPreview";
import styles from "./Hero.module.css";

export function Hero({
  hero,
  demoSealLabel,
}: {
  hero: Dictionary["hero"];
  demoSealLabel: string;
}) {
  return (
    <SectionTurn phase="noite" turnLabel={hero.turnLabel} id="turno-noite">
      <div className={styles.wrap}>
        <div>
          <p className={styles.eyebrow}>{hero.eyebrow}</p>
          <h1 className={styles.title}>{hero.title}</h1>
          <p className={styles.lede}>{hero.lede}</p>
          <div className={styles.ctas}>
            <Button href={hero.ctaPrimary.href} variant="primary">
              {hero.ctaPrimary.label}
            </Button>
            <Button href={hero.ctaSecondary.href} variant="secondary">
              {hero.ctaSecondary.label}
            </Button>
          </div>
        </div>
        <div className={styles.previewWrap}>
          <HeroChatPreview chat={hero.chat} time={hero.time} sealLabel={demoSealLabel} />
        </div>
      </div>
    </SectionTurn>
  );
}
