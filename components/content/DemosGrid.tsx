import Link from "next/link";
import type { Dictionary } from "@/content/dictionaries";
import { DemoSeal } from "@/components/ui/DemoSeal";
import { Reveal } from "@/components/motion/Reveal";
import styles from "./content.module.css";

export function DemosGrid({ demos }: { demos: Dictionary["demosIndex"]["demos"] }) {
  return (
    <div className={`${styles.container} ${styles.grid}`}>
      {demos.map((demo, index) => (
        <Reveal as="div" key={demo.href} index={index} fill>
          <Link href={demo.href} className={styles.card} style={{ height: "100%" }}>
            <span className={styles.cardSealRow}>
              <DemoSeal label={demo.badge} variant="inline" />
            </span>
            <h2 className={styles.cardTitle}>{demo.title}</h2>
            <p className={styles.cardSummary}>{demo.summary}</p>
          </Link>
        </Reveal>
      ))}
    </div>
  );
}
