"use client";

import { useState } from "react";
import type { Dictionary } from "@/content/dictionaries";
import { CODE_SNIPPETS } from "@/lib/demos/d/codeSnippets";
import styles from "./PipelineDemo.module.css";

export function CodeTabs({ dictionaryD }: { dictionaryD: Dictionary["demoD"] }) {
  const [activeId, setActiveId] = useState(CODE_SNIPPETS[0]!.id);
  const active = CODE_SNIPPETS.find((s) => s.id === activeId)!;

  return (
    <div style={{ display: "grid", gap: "1rem" }}>
      <p>{dictionaryD.codeTabLede}</p>
      <div className={styles.tabs} role="tablist">
        {CODE_SNIPPETS.map((snippet) => (
          <button
            key={snippet.id}
            type="button"
            role="tab"
            aria-selected={snippet.id === activeId}
            className={`${styles.tab} ${snippet.id === activeId ? styles.tabActive : ""}`}
            onClick={() => setActiveId(snippet.id)}
          >
            {snippet.language}
          </button>
        ))}
      </div>
      <div className={styles.codeBox}>
        <pre className={styles.codePre}>
          <code>{active.code}</code>
        </pre>
      </div>
    </div>
  );
}
