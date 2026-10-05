"use client";

import { useState } from "react";
import type { Dictionary } from "@/content/dictionaries";
import type { Locale } from "@/lib/routes";
import { monthsToCsv } from "@/lib/demos/c/csv";
import type { MonthlyRecord } from "@/lib/demos/c/types";
import styles from "./FinancialDashboard.module.css";

type SortKey = keyof Pick<
  MonthlyRecord,
  "monthLabel" | "revenue" | "expenses" | "receivables" | "cashFlow" | "defaultRate" | "averageTicket" | "transactionsCount"
>;

export function MonthlyTable({
  months,
  locale,
  dictionaryC,
}: {
  months: MonthlyRecord[];
  locale: Locale;
  dictionaryC: Dictionary["demoC"];
}) {
  const [sortKey, setSortKey] = useState<SortKey>("monthLabel");
  const [ascending, setAscending] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  function toggleSort(key: SortKey) {
    if (key === sortKey) {
      setAscending((prev) => !prev);
    } else {
      setSortKey(key);
      setAscending(true);
    }
  }

  const sorted = [...months].sort((a, b) => {
    const diff =
      sortKey === "monthLabel"
        ? a.index - b.index
        : (a[sortKey] as number) - (b[sortKey] as number);
    return ascending ? diff : -diff;
  });

  const selected = months.find((m) => m.index === selectedIndex) ?? null;

  function handleExport() {
    const csv = monthsToCsv(months, locale);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "painel-financeiro.csv";
    link.click();
    URL.revokeObjectURL(url);
  }

  const headers = dictionaryC.tableHeaders;

  return (
    <div>
      <p className={styles.detailHint}>{dictionaryC.tableDetailHint}</p>
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th scope="col" onClick={() => toggleSort("monthLabel")}>
                {headers.month}
              </th>
              <th scope="col" onClick={() => toggleSort("revenue")}>
                {headers.revenue}
              </th>
              <th scope="col" onClick={() => toggleSort("expenses")}>
                {headers.expenses}
              </th>
              <th scope="col" onClick={() => toggleSort("receivables")}>
                {headers.receivables}
              </th>
              <th scope="col" onClick={() => toggleSort("cashFlow")}>
                {headers.cashFlow}
              </th>
              <th scope="col" onClick={() => toggleSort("defaultRate")}>
                {headers.defaultRate}
              </th>
              <th scope="col" onClick={() => toggleSort("averageTicket")}>
                {headers.averageTicket}
              </th>
              <th scope="col" onClick={() => toggleSort("transactionsCount")}>
                {headers.transactions}
              </th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((month) => (
              <tr
                key={month.index}
                tabIndex={0}
                aria-expanded={selectedIndex === month.index}
                onClick={() =>
                  setSelectedIndex((prev) => (prev === month.index ? null : month.index))
                }
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    setSelectedIndex((prev) => (prev === month.index ? null : month.index));
                  }
                }}
              >
                <td>{month.monthLabel}</td>
                <td>R$ {month.revenue.toLocaleString("pt-BR")}</td>
                <td>R$ {month.expenses.toLocaleString("pt-BR")}</td>
                <td>R$ {month.receivables.toLocaleString("pt-BR")}</td>
                <td>R$ {month.cashFlow.toLocaleString("pt-BR")}</td>
                <td>{month.defaultRate}%</td>
                <td>R$ {month.averageTicket}</td>
                <td>{month.transactionsCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selected ? (
        <div className={styles.detailCard} role="region" aria-label={selected.monthLabel}>
          <strong>{selected.monthLabel}</strong>
          <span>
            {headers.revenue}: R$ {selected.revenue.toLocaleString("pt-BR")} · {headers.expenses}:
            R$ {selected.expenses.toLocaleString("pt-BR")} · {headers.cashFlow}: R${" "}
            {selected.cashFlow.toLocaleString("pt-BR")}
          </span>
          <span>
            {headers.receivables}: R$ {selected.receivables.toLocaleString("pt-BR")} ·{" "}
            {headers.defaultRate}: {selected.defaultRate}% · {headers.averageTicket}: R${" "}
            {selected.averageTicket} · {headers.transactions}: {selected.transactionsCount}
          </span>
        </div>
      ) : null}

      <button type="button" className={styles.exportButton} onClick={handleExport}>
        {dictionaryC.exportCsvLabel}
      </button>
    </div>
  );
}
