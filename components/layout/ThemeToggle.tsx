"use client";

import { useLayoutEffect, useState } from "react";
import styles from "./ThemeToggle.module.css";

type Theme = "light" | "dark";

function readStoredTheme(): Theme | null {
  try {
    const stored = window.localStorage.getItem("theme");
    return stored === "light" || stored === "dark" ? stored : null;
  } catch {
    return null;
  }
}

export function ThemeToggle({
  labelToLight,
  labelToDark,
}: {
  labelToLight: string;
  labelToDark: string;
}) {
  const [theme, setTheme] = useState<Theme | null>(null);

  // Reforca o atributo a cada montagem: a navegacao client-side do App
  // Router nao reexecuta o script inline de <head> que evita o flash no
  // carregamento inicial, entao o componente precisa se autocorrigir aqui.
  useLayoutEffect(() => {
    const stored = readStoredTheme();
    const current = document.documentElement.getAttribute("data-theme");
    const resolved: Theme =
      stored ??
      (current === "light" || current === "dark"
        ? current
        : window.matchMedia("(prefers-color-scheme: light)").matches
          ? "light"
          : "dark");
    document.documentElement.setAttribute("data-theme", resolved);
    setTheme(resolved);
  });

  function toggle() {
    const next: Theme = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      window.localStorage.setItem("theme", next);
    } catch {
      // localStorage pode estar indisponivel (modo privado); tema so nao persiste.
    }
  }

  const isLight = theme === "light";
  const label = isLight ? labelToDark : labelToLight;

  return (
    <button
      type="button"
      className={styles.toggle}
      onClick={toggle}
      aria-label={label}
      title={label}
    >
      {isLight ? (
        <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true">
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
        </svg>
      ) : (
        <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M2 12h2M20 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
        </svg>
      )}
    </button>
  );
}
