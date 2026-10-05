/**
 * Distancia de Levenshtein classica (numero minimo de insercoes, remocoes
 * e substituicoes para transformar `a` em `b`). Usada para tolerar erros
 * de digitacao no motor de conversa, sem nenhuma dependencia externa.
 */
export function levenshteinDistance(a: string, b: string): number {
  if (a === b) return 0;
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;

  let previousRow = Array.from({ length: b.length + 1 }, (_, i) => i);

  for (let i = 0; i < a.length; i++) {
    const currentRow = [i + 1];
    for (let j = 0; j < b.length; j++) {
      const deletionCost = previousRow[j + 1]! + 1;
      const insertionCost = currentRow[j]! + 1;
      const substitutionCost = previousRow[j]! + (a[i] === b[j] ? 0 : 1);
      currentRow.push(Math.min(deletionCost, insertionCost, substitutionCost));
    }
    previousRow = currentRow;
  }

  return previousRow[b.length]!;
}

/**
 * Tolerancia proporcional ao tamanho da palavra: palavras curtas toleram
 * so 1 erro, palavras maiores toleram ate 2 — evita que "oi" vire "lá"
 * por engano, mas aceita "orcamento" para "orçamento" ou "agendr" para
 * "agendar".
 */
export function maxEditDistanceFor(word: string): number {
  if (word.length <= 3) return 0;
  if (word.length <= 6) return 1;
  return 2;
}

/**
 * Compara duas palavras ja normalizadas com tolerancia a erro de digitacao.
 * Usa a tolerancia da MENOR das duas palavras (nao so do alvo): isso evita
 * que uma palavra curta e distinta (ex.: "marcar") seja engolida como erro
 * de digitacao de uma palavra maior parecida mas com sentido diferente
 * (ex.: "remarcar") so porque a maior toleraria mais edicoes.
 */
export function fuzzyWordMatch(word: string, target: string): boolean {
  if (word === target) return true;
  const distance = levenshteinDistance(word, target);
  const tolerance = Math.min(maxEditDistanceFor(word), maxEditDistanceFor(target));
  return distance <= tolerance;
}
