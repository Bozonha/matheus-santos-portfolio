import type {
  AuditFinding,
  AuditReport,
  BusinessFixture,
  PlanStep,
  Severity,
} from "./types";

const SEVERITY_RANK: Record<Severity, number> = { alto: 0, medio: 1, baixo: 2 };

export function average(values: number[]): number {
  if (values.length === 0) return 0;
  return values.reduce((sum, v) => sum + v, 0) / values.length;
}

/**
 * Nota geral 0-100: 50 pontos pelos checks do site, 30 pelo seu nivel de
 * avaliacao medio, 20 pela proporcao de avaliacoes respondidas. Formula
 * fixa e documentada — nao e um numero misterioso.
 */
export function computeOverallScore(business: BusinessFixture): number {
  const totalChecks = business.checks.length;
  const passedChecks = business.checks.filter((c) => c.passed).length;
  const checksScore = totalChecks === 0 ? 0 : (passedChecks / totalChecks) * 50;

  const ratings = business.reviews.map((r) => r.rating);
  const reputationAverage = average(ratings);
  const reputationScore = (reputationAverage / 5) * 30;

  const totalReviews = business.reviews.length;
  const responded = business.reviews.filter((r) => r.respondedByOwner).length;
  const responseRateScore = totalReviews === 0 ? 20 : (responded / totalReviews) * 20;

  const raw = checksScore + reputationScore + responseRateScore;
  return Math.max(0, Math.min(100, Math.round(raw)));
}

export function findFailedChecks(business: BusinessFixture): AuditFinding[] {
  return business.checks
    .filter((c) => !c.passed)
    .map((c) => ({ checkId: c.id, severity: c.severityWhenFailed }));
}

/** Prioriza achados do site + reputacao e corta nos 3 primeiros — nunca mais, nunca menos que o que existe. */
export function buildPlan(business: BusinessFixture): PlanStep[] {
  const totalReviews = business.reviews.length;
  const unanswered = business.reviews.filter((r) => !r.respondedByOwner).length;

  type Candidate = { checkId: PlanStep["checkId"]; severity: Severity };
  const candidates: Candidate[] = findFailedChecks(business).map((f) => ({
    checkId: f.checkId,
    severity: f.severity,
  }));

  if (unanswered > 0) {
    const ratio = unanswered / totalReviews;
    candidates.push({
      checkId: "respond_reviews",
      severity: ratio >= 0.5 ? "alto" : "medio",
    });
  }

  if (totalReviews < 15) {
    candidates.push({ checkId: "ask_reviews", severity: "baixo" });
  }

  const sorted = [...candidates].sort(
    (a, b) => SEVERITY_RANK[a.severity] - SEVERITY_RANK[b.severity],
  );

  return sorted.slice(0, 3).map((c, index) => ({ step: index + 1, checkId: c.checkId }));
}

export function generateAuditReport(business: BusinessFixture): AuditReport {
  const ratings = business.reviews.map((r) => r.rating);
  const unansweredReviews = business.reviews.filter((r) => !r.respondedByOwner).length;

  return {
    businessId: business.id,
    overallScore: computeOverallScore(business),
    reputationAverage: Math.round(average(ratings) * 10) / 10,
    totalReviews: business.reviews.length,
    unansweredReviews,
    findings: findFailedChecks(business),
    plan: buildPlan(business),
  };
}
