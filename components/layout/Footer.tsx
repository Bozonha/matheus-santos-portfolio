import Link from "next/link";
import type { Dictionary } from "@/content/dictionaries";
import type { Locale } from "@/lib/routes";
import { pagePaths } from "@/lib/routes";
import styles from "./Footer.module.css";

export function Footer({
  locale,
  dictionary,
}: {
  locale: Locale;
  dictionary: Dictionary;
}) {
  const footer = dictionary.footer;
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <p className={styles.tagline}>{footer.tagline}</p>
      <p className={styles.disclaimer}>{footer.demoDisclaimer}</p>
      <div className={styles.meta}>
        <span>
          {footer.contactLabel}:{" "}
          <a href={`mailto:${footer.contactEmail}`}>{footer.contactEmail}</a>
        </span>
        <Link href={`/${locale}/${pagePaths.privacidade[locale]}/`}>
          {footer.privacyLink}
        </Link>
        <span>
          © {year} {footer.rights}
        </span>
      </div>
    </footer>
  );
}
