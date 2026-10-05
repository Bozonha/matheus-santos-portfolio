import type { Dictionary } from "@/content/dictionaries";
import type { PipelineState } from "@/lib/demos/d/types";
import styles from "./PipelineDemo.module.css";

export function EmailPreview({
  state,
  dictionaryD,
}: {
  state: PipelineState;
  dictionaryD: Dictionary["demoD"];
}) {
  if (!state.completed) {
    return <p className={styles.emailPending}>{dictionaryD.emailPending}</p>;
  }

  return (
    <div className={styles.emailCard}>
      <div className={styles.emailHeader}>
        <strong>{dictionaryD.emailSubject}</strong>
        <span>{dictionaryD.emailGreeting}</span>
      </div>
      <div className={styles.emailBody}>
        <p>{dictionaryD.emailBodyIntro}</p>
        <ul>
          <li>{state.totalPages} páginas / pages</li>
          <li>{state.recordsProcessed} registros / records</li>
        </ul>
        <p>{dictionaryD.emailClosing}</p>
      </div>
    </div>
  );
}
