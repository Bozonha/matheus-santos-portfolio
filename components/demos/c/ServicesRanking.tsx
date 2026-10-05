"use client";

import { useState } from "react";
import type { Dictionary } from "@/content/dictionaries";
import type { ServiceRevenue } from "@/lib/demos/c/types";
import styles from "./FinancialDashboard.module.css";

type SortKey = "label" | "revenue";

export function ServicesRanking({
  services,
  dictionaryC,
}: {
  services: ServiceRevenue[];
  dictionaryC: Dictionary["demoC"];
}) {
  const [sortKey, setSortKey] = useState<SortKey>("revenue");
  const [ascending, setAscending] = useState(false);

  function toggleSort(key: SortKey) {
    if (key === sortKey) {
      setAscending((prev) => !prev);
    } else {
      setSortKey(key);
      setAscending(key === "label");
    }
  }

  const sorted = [...services].sort((a, b) => {
    const diff = sortKey === "label" ? a.label.localeCompare(b.label) : a.revenue - b.revenue;
    return ascending ? diff : -diff;
  });

  return (
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th scope="col" onClick={() => toggleSort("label")}>
              {dictionaryC.servicesHeaders.service}
            </th>
            <th scope="col" onClick={() => toggleSort("revenue")}>
              {dictionaryC.servicesHeaders.revenue}
            </th>
            <th scope="col">{dictionaryC.servicesHeaders.share}</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((service) => (
            <tr key={service.id}>
              <td>{service.label}</td>
              <td>R$ {service.revenue.toLocaleString("pt-BR")}</td>
              <td>{Math.round(service.share * 100)}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
