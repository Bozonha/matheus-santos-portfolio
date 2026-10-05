"use client";

import { useMemo, useRef, useState } from "react";
import type { Dictionary } from "@/content/dictionaries";
import type { Locale } from "@/lib/routes";
import { createInitialState, processTurn } from "@/lib/demos/a/engine";
import { getScenario } from "@/lib/demos/a/fixtures";
import type { ConversationState, ScenarioId, TurnContext } from "@/lib/demos/a/types";
import { PhoneFrame } from "./PhoneFrame";
import { BusinessPanel } from "./BusinessPanel";
import styles from "./ChatDemo.module.css";

const SCENARIO_IDS: ScenarioId[] = ["clinica", "pousada", "oficina"];

const CLOCK = {
  pt: { normal: "14:32", afterHours: "23:47" },
  en: { normal: "2:32 PM", afterHours: "11:47 PM" },
} as const;

export function ChatDemo({
  locale,
  dictionary,
}: {
  locale: Locale;
  dictionary: Dictionary;
}) {
  const [scenarioId, setScenarioId] = useState<ScenarioId>("clinica");
  const [isAfterHours, setIsAfterHours] = useState(false);
  const [state, setState] = useState<ConversationState>(() => createInitialState("clinica"));
  const [inputValue, setInputValue] = useState("");
  const turnCounter = useRef(0);

  const scenario = useMemo(() => getScenario(locale, scenarioId), [locale, scenarioId]);
  const clockLabel = isAfterHours ? CLOCK[locale].afterHours : CLOCK[locale].normal;
  const dictionaryA = dictionary.demoA;

  function handleScenarioChange(id: ScenarioId) {
    setScenarioId(id);
    setState(createInitialState(id));
    setInputValue("");
  }

  function handleSend(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;
    const ctx: TurnContext = {
      locale,
      isAfterHours,
      clock: clockLabel,
      turnIndex: turnCounter.current++,
    };
    const result = processTurn(state, trimmed, scenario, ctx);
    setState(result.state);
    setInputValue("");
  }

  function handleReset() {
    setState(createInitialState(scenarioId));
    setInputValue("");
  }

  return (
    <div className={styles.layout}>
      <div className={styles.controls}>
        <div className={styles.tabGroup} role="group" aria-label={dictionaryA.scenarioPickerLabel}>
          <span className={styles.tabGroupLabel}>{dictionaryA.scenarioPickerLabel}</span>
          <div className={styles.tabs}>
            {SCENARIO_IDS.map((id) => {
              const s = getScenario(locale, id);
              const active = id === scenarioId;
              return (
                <button
                  key={id}
                  type="button"
                  className={`${styles.tab} ${active ? styles.tabActive : ""}`}
                  aria-pressed={active}
                  onClick={() => handleScenarioChange(id)}
                >
                  {s.businessKind}
                </button>
              );
            })}
          </div>
        </div>

        <div className={styles.toggleRow}>
          <label className={styles.toggleLabel}>
            <input
              type="checkbox"
              checked={isAfterHours}
              onChange={(event) => setIsAfterHours(event.target.checked)}
            />
            {dictionaryA.afterHoursToggleLabel}
          </label>
        </div>

        <button type="button" className={styles.tab} onClick={handleReset}>
          {dictionaryA.resetLabel}
        </button>
      </div>

      {isAfterHours ? (
        <p className={styles.afterHoursNote}>{dictionaryA.afterHoursActiveNote}</p>
      ) : null}

      <div className={styles.columns}>
        <PhoneFrame
          scenario={scenario}
          messages={state.messages}
          clockLabel={clockLabel}
          inputValue={inputValue}
          onInputChange={setInputValue}
          onSend={handleSend}
          dictionaryA={dictionaryA}
          demoSealLabel={dictionary.hero.chat.seal}
        />
        <BusinessPanel state={state} scenario={scenario} dictionaryA={dictionaryA} />
      </div>
    </div>
  );
}
