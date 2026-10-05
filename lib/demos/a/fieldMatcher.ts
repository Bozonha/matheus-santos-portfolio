import { fuzzyWordMatch } from "./levenshtein";
import { normalizeText, tokenize } from "./normalize";

export interface LabeledOption {
  id: string;
  label: string;
}

/**
 * Acha a opcao (servico ou horario) cujo rotulo mais se parece com o texto
 * livre do cliente. Clique em botao de resposta rapida bate exato (texto
 * identico ao rotulo); texto digitado usa correspondencia tolerante a erro
 * por palavra, contando quantas palavras do rotulo apareceram na mensagem.
 * Sem nenhuma palavra em comum, retorna null — o motor NUNCA chuta.
 */
export function findBestMatch<T extends LabeledOption>(
  input: string,
  options: T[],
): T | null {
  const normalizedInput = normalizeText(input);
  const exact = options.find((option) => normalizeText(option.label) === normalizedInput);
  if (exact) return exact;

  const inputTokens = tokenize(input);
  if (inputTokens.length === 0) return null;

  let best: T | null = null;
  let bestScore = 0;

  for (const option of options) {
    const labelTokens = tokenize(option.label).filter((token) => token.length > 2);
    if (labelTokens.length === 0) continue;

    let score = 0;
    for (const labelToken of labelTokens) {
      if (inputTokens.some((inputToken) => fuzzyWordMatch(inputToken, labelToken))) {
        score += 1;
      }
    }

    if (score > bestScore) {
      best = option;
      bestScore = score;
    }
  }

  return best;
}
