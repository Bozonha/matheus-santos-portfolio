"use client";

import { useMemo, useState } from "react";
import type { Dictionary } from "@/content/dictionaries";
import type { Locale } from "@/lib/routes";
import { generateAuditReport } from "@/lib/demos/b/auditRules";
import { AUDIT_FIXTURES, getBusiness } from "@/lib/demos/b/fixtures";
import { AuditReport } from "./AuditReport";
import { ReviewResponder } from "./ReviewResponder";
import { AskReviewTool } from "./AskReviewTool";
import styles from "./AuditDemo.module.css";

export function AuditDemo({
  locale,
  dictionary,
}: {
  locale: Locale;
  dictionary: Dictionary;
}) {
  const businesses = AUDIT_FIXTURES[locale];
  const [businessId, setBusinessId] = useState(businesses[0]!.id);
  const dictionaryB = dictionary.demoB;

  const business = useMemo(() => getBusiness(locale, businessId), [locale, businessId]);
  const report = useMemo(() => generateAuditReport(business), [business]);

  return (
    <div className={styles.layout}>
      <div className={styles.picker}>
        <span className={styles.pickerLabel}>{dictionaryB.businessPickerLabel}</span>
        <div className={styles.tabs} role="group" aria-label={dictionaryB.businessPickerLabel}>
          {businesses.map((b) => (
            <button
              key={b.id}
              type="button"
              className={`${styles.tab} ${b.id === businessId ? styles.tabActive : ""}`}
              aria-pressed={b.id === businessId}
              onClick={() => setBusinessId(b.id)}
            >
              {b.name}
            </button>
          ))}
        </div>
      </div>

      <p className={styles.disclaimer}>{dictionaryB.disclaimer}</p>

      <AuditReport business={business} report={report} dictionaryB={dictionaryB} />

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>{dictionaryB.responderTitle}</h2>
        <ReviewResponder locale={locale} business={business} dictionaryB={dictionaryB} />
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>{dictionaryB.askReviewTitle}</h2>
        <AskReviewTool locale={locale} businessName={business.name} dictionaryB={dictionaryB} />
      </div>
    </div>
  );
}
