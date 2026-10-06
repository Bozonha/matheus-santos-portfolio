import Link from "next/link";
import type { Dictionary } from "@/content/dictionaries";
import type { Locale } from "@/lib/routes";
import { pagePaths } from "@/lib/routes";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { ThemeToggle } from "./ThemeToggle";
import { HeaderScrollWatcher } from "./HeaderScrollWatcher";
import styles from "./Header.module.css";

export function Header({
  locale,
  dictionary,
}: {
  locale: Locale;
  dictionary: Dictionary;
}) {
  const nav = dictionary.header.nav;
  const links = [
    { href: `/${locale}/${pagePaths.solucoes}/`, label: nav.solucoes },
    { href: `/${locale}/${pagePaths.demos}/`, label: nav.demos },
    {
      href: `/${locale}/${pagePaths.comoEuTrabalho}/`,
      label: nav.comoEuTrabalho,
    },
    { href: `/${locale}/${pagePaths.sobre}/`, label: nav.sobre },
    { href: `/${locale}/${pagePaths.faq}/`, label: nav.faq },
    { href: `/${locale}/${pagePaths.contato}/`, label: nav.contato },
  ];

  return (
    <header className={styles.header} data-site-header data-elevated="false">
      <HeaderScrollWatcher />
      <Link href={`/${locale}/`} className={styles.wordmark}>
        <strong>Matheus Santos</strong>
      </Link>

      <nav className={styles.nav} aria-label={dictionary.header.menuLabel}>
        {links.map((link) => (
          <Link key={link.href} href={link.href} className={styles.navLink}>
            {link.label}
          </Link>
        ))}
      </nav>

      <div className={styles.controls}>
        <details className={styles.mobileNav}>
          <summary aria-haspopup="true">{dictionary.header.menuLabel}</summary>
          <div className={styles.mobileNavList}>
            {links.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
          </div>
        </details>
        <LocaleSwitcher
          currentLocale={locale}
          label={dictionary.header.localeSwitcherLabel}
          className={styles.localeLink}
        />
        <ThemeToggle
          labelToLight={dictionary.header.themeToggle.toLight}
          labelToDark={dictionary.header.themeToggle.toDark}
        />
      </div>
    </header>
  );
}
