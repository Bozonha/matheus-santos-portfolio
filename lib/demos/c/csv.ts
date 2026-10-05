import type { Locale } from "@/lib/routes";
import type { MonthlyRecord } from "./types";

const HEADERS: Record<Locale, string[]> = {
  pt: [
    "Mes",
    "Receita",
    "Despesas",
    "Contas a receber",
    "Fluxo de caixa",
    "Inadimplencia (%)",
    "Ticket medio",
    "Transacoes",
  ],
  en: [
    "Month",
    "Revenue",
    "Expenses",
    "Receivables",
    "Cash flow",
    "Default rate (%)",
    "Average ticket",
    "Transactions",
  ],
};

/** Gera o conteudo de um CSV a partir dos meses — string pura, sem tocar em Blob/DOM. */
export function monthsToCsv(months: MonthlyRecord[], locale: Locale): string {
  const rows = [HEADERS[locale].join(",")];
  for (const m of months) {
    rows.push(
      [
        m.monthLabel,
        m.revenue,
        m.expenses,
        m.receivables,
        m.cashFlow,
        m.defaultRate,
        m.averageTicket,
        m.transactionsCount,
      ].join(","),
    );
  }
  return rows.join("\n");
}
