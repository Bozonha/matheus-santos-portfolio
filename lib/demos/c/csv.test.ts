import { describe, expect, it } from "vitest";
import { monthsToCsv } from "./csv";
import type { MonthlyRecord } from "./types";

const months: MonthlyRecord[] = [
  {
    index: 0,
    monthLabel: "Jan",
    revenue: 45000,
    expenses: 27000,
    receivables: 5000,
    cashFlow: 18000,
    defaultRate: 3.5,
    averageTicket: 120,
    transactionsCount: 375,
  },
  {
    index: 1,
    monthLabel: "Fev",
    revenue: 41000,
    expenses: 25000,
    receivables: 4500,
    cashFlow: 16000,
    defaultRate: 4.1,
    averageTicket: 115,
    transactionsCount: 356,
  },
];

describe("monthsToCsv", () => {
  it("gera o cabecalho em portugues", () => {
    const csv = monthsToCsv(months, "pt");
    expect(csv.split("\n")[0]).toBe(
      "Mes,Receita,Despesas,Contas a receber,Fluxo de caixa,Inadimplencia (%),Ticket medio,Transacoes",
    );
  });

  it("gera o cabecalho em ingles", () => {
    const csv = monthsToCsv(months, "en");
    expect(csv.split("\n")[0]).toBe(
      "Month,Revenue,Expenses,Receivables,Cash flow,Default rate (%),Average ticket,Transactions",
    );
  });

  it("gera uma linha por mes mais o cabecalho", () => {
    const csv = monthsToCsv(months, "pt");
    expect(csv.split("\n")).toHaveLength(3);
  });

  it("os valores da primeira linha de dados batem com o primeiro mes", () => {
    const csv = monthsToCsv(months, "pt");
    const line = csv.split("\n")[1];
    expect(line).toBe("Jan,45000,27000,5000,18000,3.5,120,375");
  });

  it("retorna so o cabecalho quando nao ha meses", () => {
    const csv = monthsToCsv([], "pt");
    expect(csv.split("\n")).toHaveLength(1);
  });

  it("e deterministico", () => {
    expect(monthsToCsv(months, "pt")).toBe(monthsToCsv(months, "pt"));
  });
});
