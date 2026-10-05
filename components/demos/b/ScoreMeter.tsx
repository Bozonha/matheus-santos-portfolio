import styles from "./ScoreMeter.module.css";

export function ScoreMeter({ label, score }: { label: string; score: number }) {
  return (
    <div className={styles.wrap}>
      <div className={styles.topRow}>
        <span className={styles.label}>{label}</span>
        <span className={styles.value}>{score}/100</span>
      </div>
      <div
        className={styles.track}
        role="meter"
        aria-valuenow={score}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label}
      >
        <div className={styles.fill} style={{ width: `${score}%` }} />
      </div>
    </div>
  );
}
