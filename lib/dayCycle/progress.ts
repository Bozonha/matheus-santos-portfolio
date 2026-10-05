export interface PhaseSection {
  phase: string;
  /** Distancia do topo do documento ate o topo da secao, em px. */
  top: number;
}

/**
 * Decide qual fase do turno esta "ativa" dado o scroll atual.
 * Usa o centro vertical da viewport como linha de referencia: a fase ativa
 * e a da ultima secao (assumindo `sections` ordenado por `top` crescente)
 * cujo topo ja cruzou essa linha. Funcao pura, sem DOM, para ser chamada
 * pelo hook que de fato le o scroll e o layout.
 */
export function computeActivePhase(
  scrollY: number,
  viewportHeight: number,
  sections: PhaseSection[],
): string {
  if (sections.length === 0) return "";

  const centerY = scrollY + viewportHeight / 2;
  let active = sections[0]!.phase;

  for (const section of sections) {
    if (section.top <= centerY) {
      active = section.phase;
    }
  }

  return active;
}
