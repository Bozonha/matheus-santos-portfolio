"use client";

import { useRef } from "react";
import { usePhaseObserver } from "@/lib/dayCycle/usePhaseObserver";

/**
 * Container da narrativa "O turno" na Home. data-phase comeca em "noite"
 * (igual ao que o servidor renderiza, para nao haver flash) e o hook so
 * atualiza a partir do scroll do visitante.
 */
export function ScrollNarrative({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  usePhaseObserver(ref);

  return (
    <div ref={ref} data-scroll-narrative data-phase="noite">
      {children}
    </div>
  );
}
