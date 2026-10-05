import type { Dictionary } from "@/content/dictionaries";
import type { ConversationState, ScenarioConfig } from "@/lib/demos/a/types";
import styles from "./BusinessPanel.module.css";

export function BusinessPanel({
  state,
  scenario,
  dictionaryA,
}: {
  state: ConversationState;
  scenario: ScenarioConfig;
  dictionaryA: Dictionary["demoA"];
}) {
  const panel = dictionaryA.panel;
  const lastClientMessage = [...state.messages].reverse().find((m) => m.from === "cliente");
  const service = state.booking.draft.serviceId
    ? scenario.services.find((s) => s.id === state.booking.draft.serviceId)
    : null;
  const slot = state.booking.draft.slotId
    ? scenario.availableSlots.find((s) => s.id === state.booking.draft.slotId)
    : null;

  return (
    <aside className={styles.panel} aria-label={panel.title}>
      <h2 className={styles.panelTitle}>{panel.title}</h2>

      <div className={styles.block}>
        <p className={styles.blockTitle}>{panel.logTitle}</p>
        {state.messages.length === 0 ? (
          <p className={styles.muted}>{panel.emptyLog}</p>
        ) : (
          <ol className={styles.logList}>
            {state.messages.map((message) => (
              <li key={message.id} className={styles.logEntry}>
                <span className={styles.logEntryFrom}>
                  {message.time} · {message.from}
                </span>
                <span>{message.text.replace(/\n/g, " ")}</span>
              </li>
            ))}
          </ol>
        )}
      </div>

      <div className={styles.block}>
        <p className={styles.blockTitle}>{panel.intentTitle}</p>
        <p>
          {lastClientMessage?.intent
            ? panel.intentLabels[lastClientMessage.intent]
            : panel.noIntentYet}
        </p>
      </div>

      <div className={styles.block}>
        <p className={styles.blockTitle}>{panel.agendaTitle}</p>
        <span className={styles.badge}>{panel.bookingStageLabels[state.booking.stage]}</span>
        {service || slot || state.booking.draft.name ? (
          <ul>
            {service ? <li>{service.label}</li> : null}
            {slot ? <li>{slot.label}</li> : null}
            {state.booking.draft.name ? <li>{state.booking.draft.name}</li> : null}
          </ul>
        ) : (
          <p className={styles.muted}>{panel.noBooking}</p>
        )}
      </div>

      <div className={styles.block}>
        <p className={styles.blockTitle}>{panel.handoffTitle}</p>
        {state.handoff ? (
          <div className={styles.handoffCard}>
            <p>
              <strong>{panel.handoffReasonLabel}:</strong> {state.handoff.reason}
            </p>
            <p>
              <strong>{panel.handoffSummaryLabel}:</strong> {state.handoff.summary}
            </p>
          </div>
        ) : (
          <p className={styles.muted}>{panel.noHandoff}</p>
        )}
      </div>

      <div className={styles.block}>
        <p className={styles.blockTitle}>{panel.responseTimeTitle}</p>
        <p className={styles.muted}>{panel.responseTimeNote}</p>
      </div>
    </aside>
  );
}
