"use client";

import { useState } from "react";
import type { Dictionary } from "@/content/dictionaries";
import type { Locale } from "@/lib/routes";
import { generateAskForReviewMessage } from "@/lib/demos/b/reviewResponder";
import styles from "./ReviewResponder.module.css";

export function AskReviewTool({
  locale,
  businessName,
  dictionaryB,
}: {
  locale: Locale;
  businessName: string;
  dictionaryB: Dictionary["demoB"];
}) {
  const [message, setMessage] = useState<string | null>(null);

  return (
    <div className={styles.wrap}>
      <p className={styles.lede}>{dictionaryB.askReviewLede}</p>
      <button
        type="button"
        className={styles.generateButton}
        onClick={() => setMessage(generateAskForReviewMessage(businessName, locale))}
      >
        {dictionaryB.askReviewGenerateLabel}
      </button>
      {message ? (
        <div className={styles.result}>
          <p className={styles.resultReply}>{message}</p>
        </div>
      ) : null}
    </div>
  );
}
