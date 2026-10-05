import type { Locale } from "@/lib/routes";
import type { StepId } from "./types";

export const STEP_LABELS: Record<Locale, Record<StepId, string>> = {
  pt: {
    fetch: "Buscar dados paginados na API",
    validate: "Validar registros",
    load: "Carga incremental",
    report: "Relatório por e-mail",
  },
  en: {
    fetch: "Fetch paginated data from the API",
    validate: "Validate records",
    load: "Incremental load",
    report: "Email report",
  },
};

const MAX_ATTEMPTS = 3;

export { MAX_ATTEMPTS };

export function startMessage(stepId: StepId, locale: Locale): string {
  const texts: Record<StepId, Record<Locale, string>> = {
    fetch: {
      pt: "Conectando à API do sistema de gestão (fictício)…",
      en: "Connecting to the (fictional) management system API…",
    },
    validate: {
      pt: "Validando os registros recebidos…",
      en: "Validating the records received…",
    },
    load: {
      pt: "Carregando os registros validados (modo incremental)…",
      en: "Loading the validated records (incremental mode)…",
    },
    report: {
      pt: "Montando o relatório semanal…",
      en: "Putting together the weekly report…",
    },
  };
  return texts[stepId][locale];
}

export function pageMessage(
  page: number,
  totalPages: number,
  recordsThisPage: number,
  locale: Locale,
): string {
  return locale === "pt"
    ? `Página ${page}/${totalPages} recebida (${recordsThisPage} registros).`
    : `Page ${page}/${totalPages} received (${recordsThisPage} records).`;
}

export function successMessage(
  stepId: StepId,
  locale: Locale,
  totals: { totalPages: number; recordsProcessed: number },
): string {
  const texts: Record<StepId, Record<Locale, string>> = {
    fetch: {
      pt: `Busca concluída: ${totals.totalPages} páginas, ${totals.recordsProcessed} registros.`,
      en: `Fetch complete: ${totals.totalPages} pages, ${totals.recordsProcessed} records.`,
    },
    validate: {
      pt: `Validação concluída: ${totals.recordsProcessed} registros válidos.`,
      en: `Validation complete: ${totals.recordsProcessed} valid records.`,
    },
    load: {
      pt: `Carga concluída: ${totals.recordsProcessed} registros gravados.`,
      en: `Load complete: ${totals.recordsProcessed} records written.`,
    },
    report: {
      pt: "Relatório semanal enviado por e-mail.",
      en: "Weekly report sent by email.",
    },
  };
  return texts[stepId][locale];
}

export function errorMessage(stepId: StepId, locale: Locale): string {
  const label = STEP_LABELS[locale][stepId];
  return locale === "pt"
    ? `Erro injetado na etapa "${label}".`
    : `Error injected at the "${label}" step.`;
}

export function retryMessage(attempt: number, locale: Locale): string {
  return locale === "pt"
    ? `Tentando de novo (tentativa ${attempt}/${MAX_ATTEMPTS})…`
    : `Retrying (attempt ${attempt}/${MAX_ATTEMPTS})…`;
}

export function resumeMessage(locale: Locale): string {
  return locale === "pt" ? "Retomado." : "Resumed.";
}

export function failedMessage(locale: Locale): string {
  return locale === "pt"
    ? `Pipeline interrompido: falha após ${MAX_ATTEMPTS} tentativas.`
    : `Pipeline stopped: failed after ${MAX_ATTEMPTS} attempts.`;
}

export function pipelineCompletedMessage(locale: Locale): string {
  return locale === "pt" ? "Pipeline concluído com sucesso." : "Pipeline completed successfully.";
}

export function stepStartedLogLabel(stepId: StepId, locale: Locale): string {
  const label = STEP_LABELS[locale][stepId];
  return locale === "pt" ? `Iniciando: ${label}` : `Starting: ${label}`;
}
