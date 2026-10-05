import styles from "./SectionTurn.module.css";

export function SectionTurn({
  phase,
  turnLabel,
  id,
  children,
}: {
  phase: "noite" | "madrugada" | "dia";
  turnLabel: string;
  id: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} data-phase-section={phase} className={styles.section}>
      <div className={styles.grid}>
        <p className={styles.marginalia} aria-hidden="true">
          {turnLabel}
        </p>
        <div>{children}</div>
      </div>
    </section>
  );
}
