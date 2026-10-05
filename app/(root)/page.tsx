"use client";

import { useEffect } from "react";
import { matchLocale } from "@/lib/routes";
import styles from "./page.module.css";

export default function RootRedirectPage() {
  useEffect(() => {
    const locale = matchLocale(navigator.language);
    window.location.replace(`/${locale}/`);
  }, []);

  return (
    <div className={styles.wrap}>
      {/* Rede de seguranca sem JS: redireciona para /pt/ apos 2s. */}
      <meta httpEquiv="refresh" content="2;url=/pt/" />
      <div className={styles.card}>
        <p className={styles.title}>Matheus Santos</p>
        <div className={styles.links}>
          <a href="/pt/" lang="pt" hrefLang="pt">
            Português
          </a>
          <a href="/en/" lang="en" hrefLang="en">
            English
          </a>
        </div>
      </div>
    </div>
  );
}
