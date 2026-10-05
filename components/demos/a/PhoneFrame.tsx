"use client";

import { useEffect, useRef } from "react";
import type { Dictionary } from "@/content/dictionaries";
import type { ChatMessage, ScenarioConfig } from "@/lib/demos/a/types";
import { DemoSeal } from "@/components/ui/DemoSeal";
import styles from "./PhoneFrame.module.css";

export function PhoneFrame({
  scenario,
  messages,
  clockLabel,
  inputValue,
  onInputChange,
  onSend,
  dictionaryA,
  demoSealLabel,
}: {
  scenario: ScenarioConfig;
  messages: ChatMessage[];
  clockLabel: string;
  inputValue: string;
  onInputChange: (value: string) => void;
  onSend: (text: string) => void;
  dictionaryA: Dictionary["demoA"];
  demoSealLabel: string;
}) {
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = logRef.current;
    if (node) node.scrollTop = node.scrollHeight;
  }, [messages.length]);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!inputValue.trim()) return;
    onSend(inputValue);
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "0.5rem" }}>
        <DemoSeal label={demoSealLabel} variant="inline" />
      </div>
      <div className={styles.frame}>
        <div className={styles.header}>
          <span>{scenario.businessName}</span>
          <span>{clockLabel}</span>
        </div>

        <div
          ref={logRef}
          className={styles.log}
          role="log"
          aria-live="polite"
          aria-atomic="false"
          aria-label={dictionaryA.chatRegionLabel}
        >
          {messages.length === 0 ? (
            <p className={styles.empty}>{dictionaryA.panel.emptyLog}</p>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={`${styles.bubbleRow} ${message.from === "cliente" ? styles.fromCliente : styles.fromAtendente}`}
              >
                <p className={styles.bubble}>{message.text}</p>
                <span className={styles.time}>{message.time}</span>
              </div>
            ))
          )}
        </div>

        {messages.length === 0 && scenario.quickReplies.length > 0 ? (
          <div className={styles.quickReplies}>
            {scenario.quickReplies.map((text) => (
              <button
                key={text}
                type="button"
                className={styles.quickReply}
                onClick={() => onSend(text)}
              >
                {text}
              </button>
            ))}
          </div>
        ) : null}

        <form className={styles.form} onSubmit={handleSubmit}>
          <label htmlFor="demo-a-input" className="visually-hidden">
            {dictionaryA.inputLabel}
          </label>
          <input
            id="demo-a-input"
            className={styles.input}
            type="text"
            value={inputValue}
            onChange={(event) => onInputChange(event.target.value)}
            placeholder={dictionaryA.inputPlaceholder}
            autoComplete="off"
          />
          <button type="submit" className={styles.sendButton} disabled={!inputValue.trim()}>
            {dictionaryA.sendLabel}
          </button>
        </form>
      </div>
    </div>
  );
}
