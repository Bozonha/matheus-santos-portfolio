"use client";

import { useState } from "react";
import type { Dictionary } from "@/content/dictionaries";
import type { Locale } from "@/lib/routes";
import { classifyReviewTone, generateReplyTemplate } from "@/lib/demos/b/reviewResponder";
import type { BusinessFixture, ReplyVoice } from "@/lib/demos/b/types";
import styles from "./ReviewResponder.module.css";

const VOICES: ReplyVoice[] = ["formal", "caloroso", "direto"];

export function ReviewResponder({
  locale,
  business,
  dictionaryB,
}: {
  locale: Locale;
  business: BusinessFixture;
  dictionaryB: Dictionary["demoB"];
}) {
  const [selectedExampleId, setSelectedExampleId] = useState<string | null>(null);
  const [text, setText] = useState("");
  const [authorName, setAuthorName] = useState(locale === "pt" ? "Cliente" : "Customer");
  const [voice, setVoice] = useState<ReplyVoice>("caloroso");
  const [result, setResult] = useState<{
    reply: string;
    justification: string;
    tone: ReturnType<typeof classifyReviewTone>;
  } | null>(null);

  function pickExample(reviewId: string) {
    const review = business.reviews.find((r) => r.id === reviewId);
    if (!review) return;
    setSelectedExampleId(reviewId);
    setText(review.text);
    setAuthorName(review.author);
    setResult(null);
  }

  function useOwnText() {
    setSelectedExampleId(null);
    setText("");
    setAuthorName(locale === "pt" ? "Cliente" : "Customer");
    setResult(null);
  }

  function handleGenerate() {
    if (!text.trim()) return;
    const tone = classifyReviewTone(text, locale);
    const { reply, justification } = generateReplyTemplate(
      tone,
      authorName || (locale === "pt" ? "Cliente" : "Customer"),
      business.name,
      locale,
      voice,
    );
    setResult({ reply, justification, tone });
  }

  return (
    <div className={styles.wrap}>
      <p className={styles.lede}>{dictionaryB.responderLede}</p>

      <div className={styles.field}>
        <span className={styles.fieldLabel}>{dictionaryB.pickExampleLabel}</span>
        <div className={styles.examples}>
          {business.reviews.map((review) => (
            <button
              key={review.id}
              type="button"
              className={`${styles.exampleChip} ${selectedExampleId === review.id ? styles.exampleChipActive : ""}`}
              onClick={() => pickExample(review.id)}
              title={review.text}
            >
              {review.author} ({review.rating}/5)
            </button>
          ))}
          <button type="button" className={styles.exampleChip} onClick={useOwnText}>
            {dictionaryB.useOwnTextLabel}
          </button>
        </div>
      </div>

      <div className={styles.field}>
        <label htmlFor="demo-b-review-text" className={styles.fieldLabel}>
          {dictionaryB.pasteLabel}
        </label>
        <textarea
          id="demo-b-review-text"
          className={styles.textarea}
          value={text}
          onChange={(event) => {
            setText(event.target.value);
            setSelectedExampleId(null);
            setResult(null);
          }}
          placeholder={dictionaryB.pastePlaceholder}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="demo-b-author" className={styles.fieldLabel}>
          {locale === "pt" ? "Nome do cliente" : "Customer name"}
        </label>
        <input
          id="demo-b-author"
          className={styles.input}
          type="text"
          value={authorName}
          onChange={(event) => setAuthorName(event.target.value)}
        />
      </div>

      <div className={styles.field}>
        <span className={styles.fieldLabel}>{dictionaryB.voiceLabel}</span>
        <div className={styles.voiceRow} role="radiogroup" aria-label={dictionaryB.voiceLabel}>
          {VOICES.map((v) => (
            <button
              key={v}
              type="button"
              role="radio"
              aria-checked={voice === v}
              className={`${styles.voiceOption} ${voice === v ? styles.voiceOptionActive : ""}`}
              onClick={() => setVoice(v)}
            >
              {dictionaryB.voiceOptions[v]}
            </button>
          ))}
        </div>
      </div>

      <button
        type="button"
        className={styles.generateButton}
        onClick={handleGenerate}
        disabled={!text.trim()}
      >
        {dictionaryB.generateReplyLabel}
      </button>

      {result ? (
        <div className={styles.result}>
          <p className={styles.resultTone}>
            {dictionaryB.toneDetectedLabel}: {dictionaryB.toneLabels[result.tone]}
          </p>
          <p className={styles.resultReply}>{result.reply}</p>
          <p className={styles.resultJustification}>
            <strong>{dictionaryB.justificationTitle}:</strong> {result.justification}
          </p>
        </div>
      ) : null}
    </div>
  );
}
