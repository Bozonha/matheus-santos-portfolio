import Link from "next/link";
import type { Dictionary } from "@/content/dictionaries";
import { DemoSeal } from "@/components/ui/DemoSeal";
import styles from "./content.module.css";

export function DemosGrid({ demos }: { demos: Dictionary["demosIndex"]["demos"] }) {
  return (
    <div className={`${styles.container} ${styles.grid}`}>
      {demos.map((demo) => (
        <Link key={demo.href} href={demo.href} className={styles.card}>
          <span className={styles.cardSealRow}>
            <DemoSeal label={demo.badge} variant="inline" />
          </span>
          <h2 className={styles.cardTitle}>{demo.title}</h2>
          <p className={styles.cardSummary}>{demo.summary}</p>
        </Link>
      ))}
    </div>
  );
}
