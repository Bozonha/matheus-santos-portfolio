import type { Dictionary } from "@/content/dictionaries";
import { DemoSeal } from "@/components/ui/DemoSeal";
import styles from "./HeroChatPreview.module.css";

export function HeroChatPreview({
  chat,
  time,
  sealLabel,
}: {
  chat: Dictionary["hero"]["chat"];
  time: string;
  sealLabel: string;
}) {
  const baseDelay = 500;
  const step = 650;

  return (
    <div>
      <div className={styles.sealRow}>
        <DemoSeal label={sealLabel} variant="inline" />
      </div>
      <div className={styles.frame}>
        <div className={styles.frameHeader}>
          <span>{chat.scenarioLabel}</span>
          <span className={styles.clock}>
            <svg className={styles.clockIcon} viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v5l3 2" />
            </svg>
            {time}
          </span>
        </div>
        <div className={styles.body}>
          {chat.messages.map((message, index) => (
            <div
              key={index}
              className={`${styles.bubbleRow} ${message.from === "cliente" ? styles.fromCliente : styles.fromAtendente}`}
              style={{ "--delay": `${baseDelay + index * step}ms` } as React.CSSProperties}
            >
              <p className={styles.bubble}>{message.text}</p>
            </div>
          ))}
        </div>
        <p
          className={styles.status}
          style={
            {
              "--delay": `${baseDelay + chat.messages.length * step}ms`,
            } as React.CSSProperties
          }
        >
          {chat.statusLine}
        </p>
      </div>
    </div>
  );
}
