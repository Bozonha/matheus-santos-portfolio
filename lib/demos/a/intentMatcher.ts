import type { Locale } from "@/lib/routes";
import type { Intent } from "./types";
import { INTENT_KEYWORDS, INTENT_PRIORITY } from "./intentKeywords";
import { fuzzyWordMatch } from "./levenshtein";
import { tokenize } from "./normalize";

/**
 * Casa o texto livre do cliente com uma intencao, tolerando erro de
 * digitacao por palavra (fuzzyWordMatch). Cada intencao pontua pelo numero
 * de palavras-chave distintas encontradas; a de maior pontuacao vence, com
 * empate resolvido pela ordem de prioridade em INTENT_PRIORITY. Sem
 * nenhuma palavra-chave reconhecida, retorna "desconhecido".
 */
export function matchIntent(input: string, locale: Locale): Intent {
  const tokens = tokenize(input);
  if (tokens.length === 0) return "desconhecido";

  const keywordsByIntent = INTENT_KEYWORDS[locale];
  const scores = new Map<Intent, number>();

  for (const intent of INTENT_PRIORITY) {
    const keywords = keywordsByIntent[intent];
    // Conta tokens distintos que bateram, nao quantas keywords bateram —
    // senao um unico token (ex.: "horario") infla o placar so por existirem
    // variantes parecidas na lista ("horario" e "horarios").
    let matchedTokens = 0;
    for (const token of tokens) {
      if (keywords.some((keyword) => fuzzyWordMatch(token, keyword))) {
        matchedTokens += 1;
      }
    }
    if (matchedTokens > 0) scores.set(intent, matchedTokens);
  }

  if (scores.size === 0) return "desconhecido";

  let best: Intent = "desconhecido";
  let bestScore = 0;
  for (const intent of INTENT_PRIORITY) {
    const score = scores.get(intent) ?? 0;
    if (score > bestScore) {
      best = intent;
      bestScore = score;
    }
  }

  return best;
}
