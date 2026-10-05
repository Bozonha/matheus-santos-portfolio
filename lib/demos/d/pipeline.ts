import type { Locale } from "@/lib/routes";
import {
  MAX_ATTEMPTS,
  errorMessage,
  failedMessage,
  pageMessage,
  pipelineCompletedMessage,
  resumeMessage,
  retryMessage,
  startMessage,
  stepStartedLogLabel,
  successMessage,
} from "./messages";
import type { LogEntry, PipelineState, StepId } from "./types";

const STEP_ORDER: StepId[] = ["fetch", "validate", "load", "report"];
const TOTAL_PAGES = 5;
const RECORDS_PER_PAGE = 48;
const TICK_SECONDS = 2;

function formatElapsed(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

export function createInitialPipelineState(): PipelineState {
  return {
    steps: STEP_ORDER.map((id) => ({ id, status: "pending", attempts: 0 })),
    currentStepIndex: -1,
    logs: [],
    running: false,
    completed: false,
    failed: false,
    pendingError: false,
    currentPage: 0,
    totalPages: TOTAL_PAGES,
    recordsPerPage: RECORDS_PER_PAGE,
    recordsProcessed: 0,
    elapsedSeconds: 0,
  };
}

function appendLog(
  state: PipelineState,
  level: LogEntry["level"],
  stepId: StepId | null,
  message: string,
): PipelineState {
  const entry: LogEntry = {
    id: `log-${state.logs.length}`,
    time: formatElapsed(state.elapsedSeconds),
    level,
    stepId,
    message,
  };
  return { ...state, logs: [...state.logs, entry] };
}

export function startPipeline(state: PipelineState): PipelineState {
  if (state.completed || state.failed) return state;
  return { ...state, running: true };
}

export function pausePipeline(state: PipelineState): PipelineState {
  return { ...state, running: false };
}

/** Agenda um erro para a proxima vez que a etapa em execucao avancar. Sem efeito se o pipeline nao estiver rodando. */
export function injectError(state: PipelineState): PipelineState {
  if (!state.running || state.completed || state.failed) return state;
  const current = state.steps[state.currentStepIndex];
  if (!current || current.status !== "running") return state;
  return { ...state, pendingError: true };
}

export function resetPipeline(): PipelineState {
  return createInitialPipelineState();
}

/**
 * Avanca o pipeline em um unico passo determinístico. O tempo decorrido e
 * um contador simples incrementado aqui dentro (TICK_SECONDS por tick),
 * nunca Date.now() — o motor nao tem efeito colateral de verdade, quem
 * decide a cadencia (setInterval) e a camada de UI.
 */
export function tick(state: PipelineState, locale: Locale): PipelineState {
  if (state.completed || state.failed) return state;

  let next: PipelineState = { ...state, elapsedSeconds: state.elapsedSeconds + TICK_SECONDS };

  if (next.currentStepIndex === -1) {
    const steps = next.steps.map((s, i) => (i === 0 ? { ...s, status: "running" as const } : s));
    next = { ...next, steps, currentStepIndex: 0 };
    next = appendLog(next, "info", steps[0]!.id, stepStartedLogLabel(steps[0]!.id, locale));
    next = appendLog(next, "info", steps[0]!.id, startMessage(steps[0]!.id, locale));
    return next;
  }

  const stepIndex = next.currentStepIndex;
  const step = next.steps[stepIndex]!;

  if (step.status === "running") {
    if (next.pendingError) {
      const steps = next.steps.map((s, i) =>
        i === stepIndex ? { ...s, status: "error" as const, attempts: s.attempts + 1 } : s,
      );
      next = { ...next, steps, pendingError: false };
      next = appendLog(next, "error", step.id, errorMessage(step.id, locale));
      return next;
    }

    if (step.id === "fetch" && next.currentPage < next.totalPages) {
      const currentPage = next.currentPage + 1;
      const recordsProcessed = next.recordsProcessed + next.recordsPerPage;
      next = { ...next, currentPage, recordsProcessed };
      next = appendLog(
        next,
        "info",
        step.id,
        pageMessage(currentPage, next.totalPages, next.recordsPerPage, locale),
      );
      return next;
    }

    const steps = next.steps.map((s, i) =>
      i === stepIndex ? { ...s, status: "success" as const } : s,
    );
    next = { ...next, steps };
    next = appendLog(
      next,
      "info",
      step.id,
      successMessage(step.id, locale, {
        totalPages: next.totalPages,
        recordsProcessed: next.recordsProcessed,
      }),
    );
    return next;
  }

  if (step.status === "success") {
    const isLast = stepIndex === next.steps.length - 1;
    if (isLast) {
      next = { ...next, completed: true, running: false };
      next = appendLog(next, "info", null, pipelineCompletedMessage(locale));
      return next;
    }
    const nextIndex = stepIndex + 1;
    const steps = next.steps.map((s, i) =>
      i === nextIndex ? { ...s, status: "running" as const } : s,
    );
    next = { ...next, steps, currentStepIndex: nextIndex };
    next = appendLog(next, "info", steps[nextIndex]!.id, stepStartedLogLabel(steps[nextIndex]!.id, locale));
    next = appendLog(next, "info", steps[nextIndex]!.id, startMessage(steps[nextIndex]!.id, locale));
    return next;
  }

  if (step.status === "error") {
    if (step.attempts < MAX_ATTEMPTS) {
      const steps = next.steps.map((s, i) =>
        i === stepIndex ? { ...s, status: "retrying" as const } : s,
      );
      next = { ...next, steps };
      next = appendLog(next, "warn", step.id, retryMessage(step.attempts, locale));
      return next;
    }
    next = { ...next, failed: true, running: false };
    next = appendLog(next, "error", step.id, failedMessage(locale));
    return next;
  }

  if (step.status === "retrying") {
    const steps = next.steps.map((s, i) =>
      i === stepIndex ? { ...s, status: "running" as const } : s,
    );
    next = { ...next, steps };
    next = appendLog(next, "info", step.id, resumeMessage(locale));
    return next;
  }

  return next;
}
