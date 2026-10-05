export type StepId = "fetch" | "validate" | "load" | "report";

export type StepStatus = "pending" | "running" | "success" | "error" | "retrying";

export interface PipelineStepState {
  id: StepId;
  status: StepStatus;
  attempts: number;
}

export interface LogEntry {
  id: string;
  time: string;
  level: "info" | "warn" | "error";
  stepId: StepId | null;
  message: string;
}

export interface PipelineState {
  steps: PipelineStepState[];
  currentStepIndex: number;
  logs: LogEntry[];
  running: boolean;
  completed: boolean;
  failed: boolean;
  pendingError: boolean;
  currentPage: number;
  totalPages: number;
  recordsPerPage: number;
  recordsProcessed: number;
  elapsedSeconds: number;
}
