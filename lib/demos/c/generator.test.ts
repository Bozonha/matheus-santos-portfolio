import { describe, expect, it } from "vitest";
import { generateFinancialDataset, generateMonths, generateServices } from "./generator";

describe("generateMonths", () => {
  it("gera exatamente 12 meses", () => {
    expect(generateMonths(42, "pt")).toHaveLength(12);
  });

  it("e deterministico para a mesma semente", () => {
    expect(generateMonths(42, "pt")).toEqual(generateMonths(42, "pt"));
  });

  it("sementes diferentes geram series diferentes", () => {
    const a = generateMonths(1, "pt");
    const b = generateMonths(2, "pt");
    expect(a.map((m) => m.revenue)).not.toEqual(b.map((m) => m.revenue));
  });

  it("usa os rotulos de mes certos por idioma", () => {
    const pt = generateMonths(42, "pt");
    const en = generateMonths(42, "en");
    expect(pt[0]?.monthLabel).toBe("Jan");
    expect(pt[6]?.monthLabel).toBe("Jul");
    expect(en[1]?.monthLabel).toBe("Feb");
  });

  it("a mesma semente produz os mesmos numeros nos dois idiomas (so o rotulo muda)", () => {
    const pt = generateMonths(42, "pt");
    const en = generateMonths(42, "en");
    expect(pt.map((m) => m.revenue)).toEqual(en.map((m) => m.revenue));
  });

  it("tem uma queda deliberada e clara no mes de indice 6", () => {
    const months = generateMonths(42, "pt");
    const otherMonths = months.filter((m) => m.index !== 6);
    const avgOthers =
      otherMonths.reduce((sum, m) => sum + m.revenue, 0) / otherMonths.length;
    expect(months[6]!.revenue).toBeLessThan(avgOthers * 0.75);
  });

  it("fluxo de caixa e sempre receita menos despesa", () => {
    for (const month of generateMonths(7, "pt")) {
      expect(month.cashFlow).toBe(month.revenue - month.expenses);
    }
  });

  it("inadimplencia fica num intervalo razoavel (2% a 7%)", () => {
    for (const month of generateMonths(7, "pt")) {
      expect(month.defaultRate).toBeGreaterThanOrEqual(2);
      expect(month.defaultRate).toBeLessThanOrEqual(7);
    }
  });

  it("numero de transacoes e coerente com receita e ticket medio", () => {
    for (const month of generateMonths(7, "pt")) {
      const expected = Math.round(month.revenue / month.averageTicket);
      expect(month.transactionsCount).toBe(Math.max(1, expected));
    }
  });
});

describe("generateServices", () => {
  it("gera 5 servicos ordenados do maior para o menor", () => {
    const services = generateServices(42, "pt", 500000);
    expect(services).toHaveLength(5);
    for (let i = 1; i < services.length; i++) {
      expect(services[i - 1]!.revenue).toBeGreaterThanOrEqual(services[i]!.revenue);
    }
  });

  it("a soma das participacoes fecha perto de 100%", () => {
    const services = generateServices(42, "pt", 500000);
    const totalShare = services.reduce((sum, s) => sum + s.share, 0);
    expect(totalShare).toBeCloseTo(1, 5);
  });

  it("a soma das receitas por servico fecha perto do total informado", () => {
    const total = 500000;
    const services = generateServices(42, "pt", total);
    const sum = services.reduce((s, service) => s + service.revenue, 0);
    expect(Math.abs(sum - total)).toBeLessThan(total * 0.01);
  });
});

describe("generateFinancialDataset", () => {
  it("monta o dataset completo e deterministico", () => {
    const a = generateFinancialDataset(42, "pt");
    const b = generateFinancialDataset(42, "pt");
    expect(a).toEqual(b);
    expect(a.months).toHaveLength(12);
    expect(a.services).toHaveLength(5);
    expect(a.businessName.length).toBeGreaterThan(0);
  });
});
