import type { Dictionary } from "@/content/dictionaries";
import type { AuditReport as AuditReportData, BusinessFixture } from "@/lib/demos/b/types";
import { ScoreMeter } from "./ScoreMeter";
import demoStyles from "./AuditDemo.module.css";
import styles from "./AuditReport.module.css";

export function AuditReport({
  business,
  report,
  dictionaryB,
}: {
  business: BusinessFixture;
  report: AuditReportData;
  dictionaryB: Dictionary["demoB"];
}) {
  return (
    <div className={demoStyles.reportGrid}>
      <ScoreMeter label={dictionaryB.scoreLabel} score={report.overallScore} />

      <div className={demoStyles.section}>
        <h2 className={demoStyles.sectionTitle}>{dictionaryB.checksTitle}</h2>
        <ul className={styles.checkList}>
          {business.checks.map((check) => (
            <li key={check.id} className={styles.checkRow}>
              <span>{dictionaryB.checkLabels[check.id]}</span>
              <span className={check.passed ? styles.statusOk : styles.statusFail}>
                {check.passed ? dictionaryB.checkPassedNote : dictionaryB.checkFailedNote}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className={demoStyles.section}>
        <h2 className={demoStyles.sectionTitle}>{dictionaryB.reputationTitle}</h2>
        <div className={styles.reputationStats}>
          <div className={styles.stat}>
            <span className={styles.statLabel}>{dictionaryB.reputationAverageLabel}</span>
            <span className={styles.statValue}>{report.reputationAverage.toFixed(1)}/5</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statLabel}>{dictionaryB.totalReviewsLabel}</span>
            <span className={styles.statValue}>{report.totalReviews}</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statLabel}>{dictionaryB.unansweredReviewsLabel}</span>
            <span className={styles.statValue}>{report.unansweredReviews}</span>
          </div>
        </div>
      </div>

      <div className={demoStyles.section}>
        <h2 className={demoStyles.sectionTitle}>{dictionaryB.planTitle}</h2>
        <ol className={styles.planList}>
          {report.plan.map((step) => (
            <li key={step.checkId} className={styles.planItem}>
              <p className={styles.planItemTitle}>
                <span className={styles.planStepNumber}>{step.step}.</span>
                {dictionaryB.planStepLabels[step.checkId]}
              </p>
              <p className={styles.planItemBody}>{dictionaryB.planStepBodies[step.checkId]}</p>
            </li>
          ))}
        </ol>
      </div>

      <div className={demoStyles.section}>
        <h2 className={demoStyles.sectionTitle}>{dictionaryB.reviewsListTitle}</h2>
        <ul className={styles.reviewsList}>
          {business.reviews.map((review) => (
            <li key={review.id} className={styles.reviewCard}>
              <div className={styles.reviewTop}>
                <span>
                  {review.author} · {review.rating}/5
                </span>
                <span
                  className={
                    review.respondedByOwner ? styles.reviewTopResponded : styles.reviewTopUnanswered
                  }
                >
                  {review.respondedByOwner ? dictionaryB.respondedLabel : dictionaryB.unansweredLabel}
                </span>
              </div>
              <p className={styles.reviewText}>{review.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
