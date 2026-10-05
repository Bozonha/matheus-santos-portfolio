"use client";

import { useEffect, useRef } from "react";
import type { LogEntry } from "@/lib/demos/d/types";
import styles from "./PipelineDemo.module.css";

const LEVEL_CLASS: Record<LogEntry["level"], string> = {
  info: styles.logInfo!,
  warn: styles.logWarn!,
  error: styles.logError!,
};

export function LogPanel({ logs, emptyLabel }: { logs: LogEntry[]; emptyLabel: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (node) node.scrollTop = node.scrollHeight;
  }, [logs.length]);

  return (
    <div ref={ref} className={styles.logList} role="log" aria-live="polite" aria-atomic="false">
      {logs.length === 0 ? (
        <span>{emptyLabel}</span>
      ) : (
        logs.map((entry) => (
          <div key={entry.id} className={styles.logEntry}>
            <span className={styles.logTime}>{entry.time}</span>
            <span className={LEVEL_CLASS[entry.level]}>{entry.message}</span>
          </div>
        ))
      )}
    </div>
  );
}
