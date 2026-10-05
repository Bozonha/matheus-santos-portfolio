"use client";

import { useEffect, useRef, useState } from "react";
import type { Dictionary } from "@/content/dictionaries";
import type { Locale } from "@/lib/routes";
import {
  createInitialPipelineState,
  injectError,
  pausePipeline,
  startPipeline,
  tick,
} from "@/lib/demos/d/pipeline";
import { STEP_LABELS } from "@/lib/demos/d/messages";
import type { PipelineState } from "@/lib/demos/d/types";
import { LogPanel } from "./LogPanel";
import { EmailPreview } from "./EmailPreview";
import { CodeTabs } from "./CodeTabs";
import styles from "./PipelineDemo.module.css";

const TICK_MS = 600;

function stepClassName(status: PipelineState["steps"][number]["status"], styleMap: typeof styles) {
  switch (status) {
    case "running":
      return styleMap.stepRunning;
    case "success":
      return styleMap.stepSuccess;
    case "error":
      return styleMap.stepError;
    case "retrying":
      return styleMap.stepRetrying;
    default:
      return styleMap.stepPending;
  }
}

export function PipelineDemo({
  locale,
  dictionary,
}: {
  locale: Locale;
  dictionary: Dictionary;
}) {
  const dictionaryD = dictionary.demoD;
  const [state, setState] = useState<PipelineState>(() => createInitialPipelineState());
  const [view, setView] = useState<"pipeline" | "code">("pipeline");
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  function stopInterval() {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }

  function startInterval() {
    stopInterval();
    intervalRef.current = setInterval(() => {
      setState((prev) => {
        const next = tick(prev, locale);
        if (!next.running) stopInterval();
        return next;
      });
    }, TICK_MS);
  }

  useEffect(() => stopInterval, []);

  function handleExecute() {
    setState((prev) => startPipeline(prev));
    startInterval();
  }

  function handlePause() {
    stopInterval();
    setState((prev) => pausePipeline(prev));
  }

  function handleInjectError() {
    setState((prev) => injectError(prev));
  }

  function handleReset() {
    stopInterval();
    setState(createInitialPipelineState());
  }

  const canExecute = !state.completed && !state.failed && !state.running;
  const canPause = state.running;
  const canInjectError = state.running;

  return (
    <div className={styles.layout}>
      <p className={styles.disclaimer}>{dictionaryD.disclaimer}</p>

      <div className={styles.tabs} role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={view === "pipeline"}
          className={`${styles.tab} ${view === "pipeline" ? styles.tabActive : ""}`}
          onClick={() => setView("pipeline")}
        >
          Pipeline
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={view === "code"}
          className={`${styles.tab} ${view === "code" ? styles.tabActive : ""}`}
          onClick={() => setView("code")}
        >
          {dictionaryD.codeTabTitle}
        </button>
      </div>

      {view === "code" ? (
        <CodeTabs dictionaryD={dictionaryD} />
      ) : (
        <>
          <div className={styles.controls}>
            <button
              type="button"
              className={`${styles.button} ${styles.buttonPrimary}`}
              onClick={handleExecute}
              disabled={!canExecute}
            >
              {dictionaryD.executeLabel}
            </button>
            <button
              type="button"
              className={styles.button}
              onClick={handlePause}
              disabled={!canPause}
            >
              {dictionaryD.pauseLabel}
            </button>
            <button
              type="button"
              className={`${styles.button} ${styles.buttonDanger}`}
              onClick={handleInjectError}
              disabled={!canInjectError}
            >
              {dictionaryD.injectErrorLabel}
            </button>
            <button type="button" className={styles.button} onClick={handleReset}>
              {dictionaryD.resetLabel}
            </button>
            <span className={styles.elapsed}>
              {dictionaryD.elapsedLabel}: {Math.floor(state.elapsedSeconds / 60)
                .toString()
                .padStart(2, "0")}
              :{(state.elapsedSeconds % 60).toString().padStart(2, "0")}
            </span>
          </div>

          <div className={styles.stepsRow} role="list">
            {state.steps.map((step) => (
              <div
                key={step.id}
                role="listitem"
                className={`${styles.step} ${stepClassName(step.status, styles)}`}
              >
                <span className={styles.stepLabel}>{STEP_LABELS[locale][step.id]}</span>
                <span className={styles.stepStatus}>{dictionaryD.statusLabels[step.status]}</span>
                {step.id === "fetch" && (step.status === "running" || step.status === "success") ? (
                  <span className={styles.stepProgress}>
                    {state.currentPage}/{state.totalPages}
                  </span>
                ) : null}
                {step.attempts > 0 ? (
                  <span className={styles.stepProgress}>attempts: {step.attempts}</span>
                ) : null}
              </div>
            ))}
          </div>

          <div className={styles.twoCol}>
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>{dictionaryD.logPanelTitle}</h2>
              <LogPanel logs={state.logs} emptyLabel={dictionaryD.logEmpty} />
            </div>
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>{dictionaryD.emailPreviewTitle}</h2>
              <EmailPreview state={state} dictionaryD={dictionaryD} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
