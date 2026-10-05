import type { Locale } from "@/lib/routes";

export type CheckId =
  | "https"
  | "mobile"
  | "messageButton"
  | "map"
  | "structuredData"
  | "reviewLink";

export type Severity = "alto" | "medio" | "baixo";

export interface AuditCheck {
  id: CheckId;
  passed: boolean;
  /** Severidade usada so quando o check falha, para priorizar o plano. */
  severityWhenFailed: Severity;
}

export interface ReviewFixture {
  id: string;
  author: string;
  rating: 1 | 2 | 3 | 4 | 5;
  text: string;
  respondedByOwner: boolean;
}

export interface BusinessFixture {
  id: string;
  locale: Locale;
  name: string;
  kind: string;
  checks: AuditCheck[];
  reviews: ReviewFixture[];
}

export interface AuditFinding {
  checkId: CheckId;
  severity: Severity;
}

export interface PlanStep {
  step: number;
  checkId: CheckId | "respond_reviews" | "ask_reviews";
}

export interface AuditReport {
  businessId: string;
  overallScore: number;
  reputationAverage: number;
  totalReviews: number;
  unansweredReviews: number;
  findings: AuditFinding[];
  plan: PlanStep[];
}

export type ReviewTone = "elogio" | "neutro" | "reclamacao";

export type ReplyVoice = "formal" | "caloroso" | "direto";
