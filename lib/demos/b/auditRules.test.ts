import { describe, expect, it } from "vitest";
import { average, buildPlan, computeOverallScore, findFailedChecks, generateAuditReport } from "./auditRules";
import { getBusiness } from "./fixtures";

const padaria = getBusiness("pt", "padaria");
const salao = getBusiness("pt", "salao");
const academia = getBusiness("pt", "academia");

describe("average", () => {
  it("calcula a media de uma lista", () => {
    expect(average([5, 2, 4, 5, 3])).toBeCloseTo(3.8);
  });

  it("retorna 0 para lista vazia", () => {
    expect(average([])).toBe(0);
  });
});

describe("computeOverallScore", () => {
  it("calcula a nota da padaria (checks fracos, reputacao media)", () => {
    expect(computeOverallScore(padaria)).toBe(47);
  });

  it("calcula a nota do salao (checks bons, reputacao alta)", () => {
    expect(computeOverallScore(salao)).toBe(77);
  });

  it("calcula a nota da academia (checks medios, reputacao fraca)", () => {
    expect(computeOverallScore(academia)).toBe(60);
  });

  it("nunca passa de 100 nem fica negativa", () => {
    const perfect = {
      ...padaria,
      checks: padaria.checks.map((c) => ({ ...c, passed: true })),
      reviews: padaria.reviews.map((r) => ({ ...r, rating: 5 as const, respondedByOwner: true })),
    };
    expect(computeOverallScore(perfect)).toBe(100);
  });
});

describe("findFailedChecks", () => {
  it("lista so os checks que falharam, com a severidade de cada um", () => {
    const findings = findFailedChecks(padaria);
    expect(findings.map((f) => f.checkId).sort()).toEqual(
      ["https", "messageButton", "reviewLink", "structuredData"].sort(),
    );
    expect(findings.find((f) => f.checkId === "https")?.severity).toBe("alto");
  });

  it("retorna lista vazia quando todos os checks passam", () => {
    const allPassing = { ...salao, checks: salao.checks.map((c) => ({ ...c, passed: true })) };
    expect(findFailedChecks(allPassing)).toHaveLength(0);
  });
});

describe("buildPlan", () => {
  it("prioriza severidade alta primeiro, cortando em 3 passos", () => {
    const plan = buildPlan(padaria);
    expect(plan).toHaveLength(3);
    expect(plan.map((p) => p.checkId)).toEqual(["https", "messageButton", "respond_reviews"]);
    expect(plan.map((p) => p.step)).toEqual([1, 2, 3]);
  });

  it("inclui pedir avaliacoes quando nao ha achados mais graves disputando os 3 passos", () => {
    const allGood = {
      ...salao,
      checks: salao.checks.map((c) => ({ ...c, passed: true })),
      reviews: salao.reviews.map((r) => ({ ...r, respondedByOwner: true })),
    };
    const plan = buildPlan(allGood);
    expect(plan.map((p) => p.checkId)).toEqual(["ask_reviews"]);
  });

  it("prioriza responder avaliacoes quando a maioria esta sem resposta", () => {
    const plan = buildPlan(academia);
    expect(plan[1]?.checkId).toBe("respond_reviews");
  });
});

describe("generateAuditReport", () => {
  it("monta o relatorio completo da padaria", () => {
    const report = generateAuditReport(padaria);
    expect(report.businessId).toBe("padaria");
    expect(report.overallScore).toBe(47);
    expect(report.reputationAverage).toBe(3.8);
    expect(report.totalReviews).toBe(5);
    expect(report.unansweredReviews).toBe(3);
    expect(report.plan).toHaveLength(3);
  });

  it("e deterministico: duas chamadas com o mesmo negocio dao o mesmo resultado", () => {
    const a = generateAuditReport(academia);
    const b = generateAuditReport(academia);
    expect(a).toEqual(b);
  });
});
