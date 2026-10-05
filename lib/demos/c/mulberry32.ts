/**
 * PRNG mulberry32 — determinístico, sem dependência externa. A mesma
 * semente sempre produz a mesma sequência, o que é o que torna os dados
 * do painel reprodutíveis (e testáveis) em vez de aleatórios de verdade.
 */
export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return function next() {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Numero no intervalo [min, max) a partir do gerador. */
export function randomInRange(rng: () => number, min: number, max: number): number {
  return min + rng() * (max - min);
}
