import type { Dictionary } from "@/content/dictionaries";
import { DemoSeal } from "@/components/ui/DemoSeal";
import styles from "./HeroChatPreview.module.css";

/**
 * Nao e um mockup de app de chat (sem moldura de telefone, sem bolhas).
 * E tratado como o que de fato e: o registro de uma conversa, no mesmo
 * vocabulario visual da "REGISTRO DA CONVERSA" que aparece no painel real
 * da Demo A — uma transcricao, nao uma captura de tela de produto.
 */
export function HeroChatPreview({
  chat,
  time,
  sealLabel,
}: {
  chat: Dictionary["hero"]["chat"];
  time: string;
  sealLabel: string;
}) {
  const baseDelay = 150;
  const step = 110;

  return (
    <div className={styles.transcript}>
      <div className={styles.head}>
        <span className={styles.clock}>
          <svg className={styles.clockIcon} viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7v5l3 2" />
          </svg>
          {time}
        </span>
        <span className={styles.scenario}>{chat.scenarioLabel}</span>
        <DemoSeal label={sealLabel} variant="inline" />
      </div>
      <div className={styles.rule} aria-hidden="true" />
      <ol className={styles.lines}>
        {chat.messages.map((message, index) => (
          <li
            key={index}
            className={`${styles.line} ${message.from === "atendente" ? styles.fromAtendente : styles.fromCliente}`}
            style={{ "--delay": `${baseDelay + index * step}ms` } as React.CSSProperties}
          >
            <span className={styles.who}>{message.from}</span>
            <p className={styles.text}>{message.text}</p>
          </li>
        ))}
      </ol>
      <div className={styles.rule} aria-hidden="true" />
      <p
        className={styles.status}
        style={{ "--delay": `${baseDelay + chat.messages.length * step}ms` } as React.CSSProperties}
      >
        {chat.statusLine}
      </p>
    </div>
  );
}
