import type { Locale } from "@/lib/routes";
import { fuzzyWordMatch } from "@/lib/demos/a/levenshtein";
import { tokenize } from "@/lib/demos/a/normalize";
import type { ReplyVoice, ReviewTone } from "./types";

const POSITIVE_WORDS: Record<Locale, string[]> = {
  pt: [
    "otimo",
    "excelente",
    "adorei",
    "recomendo",
    "perfeito",
    "maravilhoso",
    "incrivel",
    "gostei",
    "bom",
    "competente",
    "impecavel",
    "atencioso",
    "satisfeito",
  ],
  en: [
    "great",
    "excellent",
    "loved",
    "recommend",
    "perfect",
    "amazing",
    "wonderful",
    "like",
    "good",
    "skilled",
    "flawless",
    "attentive",
    "satisfied",
  ],
};

const NEGATIVE_WORDS: Record<Locale, string[]> = {
  pt: [
    "ruim",
    "pessimo",
    "horrivel",
    "sujo",
    "quebrado",
    "demorou",
    "atraso",
    "cobraram",
    "multa",
    "decepcionado",
    "cancelei",
    "errado",
    "problema",
    "reclamacao",
  ],
  en: [
    "bad",
    "terrible",
    "awful",
    "dirty",
    "broken",
    "late",
    "delay",
    "charged",
    "fee",
    "disappointed",
    "cancelled",
    "wrong",
    "issue",
    "complaint",
  ],
};

const NEGATION_WORDS: Record<Locale, string[]> = {
  pt: ["nao", "nem", "nunca"],
  en: ["not", "never", "no", "n't"],
};

/**
 * Classifica o tom de uma avaliacao por contagem de palavras positivas e
 * negativas, com uma janela curta de negacao ("nao gostei" vira negativo
 * mesmo com a palavra "gostei" presente). Puramente baseado em palavras-
 * chave — nao e analise de sentimento de verdade, e a demonstracao e
 * honesta sobre isso na interface.
 */
export function classifyReviewTone(text: string, locale: Locale): ReviewTone {
  const tokens = tokenize(text);
  const positiveWords = POSITIVE_WORDS[locale];
  const negativeWords = NEGATIVE_WORDS[locale];
  const negationWords = NEGATION_WORDS[locale];

  let positive = 0;
  let negative = 0;

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i]!;
    const isPositive = positiveWords.some((w) => fuzzyWordMatch(token, w));
    const isNegative = negativeWords.some((w) => fuzzyWordMatch(token, w));
    if (!isPositive && !isNegative) continue;

    const windowStart = Math.max(0, i - 2);
    const negated = tokens
      .slice(windowStart, i)
      .some((t) => negationWords.some((w) => fuzzyWordMatch(t, w)));

    if (isPositive) {
      if (negated) negative += 1;
      else positive += 1;
    } else {
      if (negated) positive += 1;
      else negative += 1;
    }
  }

  if (positive === 0 && negative === 0) return "neutro";
  if (positive > negative) return "elogio";
  if (negative > positive) return "reclamacao";
  return "neutro";
}

interface ReplyResult {
  reply: string;
  justification: string;
}

const JUSTIFICATIONS: Record<ReviewTone, Record<Locale, string>> = {
  elogio: {
    pt: "A avaliação tem mais palavras positivas (como \"adorei\", \"recomendo\", \"ótimo\") do que negativas — tratamos como elogio e agradecemos.",
    en: "The review has more positive words (like \"loved\", \"recommend\", \"great\") than negative ones — we treat it as praise and say thanks.",
  },
  neutro: {
    pt: "A avaliação não pende claramente para elogio nem para reclamação — a resposta reconhece o ponto levantado sem presumir o que não foi dito.",
    en: "The review doesn't clearly lean toward praise or complaint — the reply acknowledges the point raised without assuming what wasn't said.",
  },
  reclamacao: {
    pt: "A avaliação tem mais palavras negativas (como \"demorou\", \"quebrado\", \"cobraram\") do que positivas — a resposta pede desculpas e oferece resolver fora do público, sem prometer o que não pode ser garantido.",
    en: "The review has more negative words (like \"late\", \"broken\", \"charged\") than positive ones — the reply apologizes and offers to resolve things privately, without promising anything that can't be guaranteed.",
  },
};

const REPLY_TEMPLATES: Record<ReviewTone, Record<ReplyVoice, Record<Locale, string>>> = {
  elogio: {
    formal: {
      pt: "Agradecemos muito pela sua avaliação, {name}. Ficamos felizes em saber que a experiência na {business} foi positiva. Esperamos recebê-lo(a) novamente.",
      en: "Thank you very much for your review, {name}. We're glad to hear your experience at {business} was a positive one. We hope to welcome you back.",
    },
    caloroso: {
      pt: "Que mensagem boa de ler, {name}! Obrigado por confiar na {business} — a equipe toda vai adorar saber disso. Até a próxima! 😊",
      en: "What a lovely message to read, {name}! Thanks for trusting {business} — the whole team will be glad to hear this. See you next time!",
    },
    direto: {
      pt: "Obrigado pela avaliação, {name}. Contamos com você na próxima visita à {business}.",
      en: "Thanks for the review, {name}. We'll see you on your next visit to {business}.",
    },
  },
  neutro: {
    formal: {
      pt: "Agradecemos o seu retorno, {name}. Levamos em conta o que foi comentado para seguir melhorando na {business}.",
      en: "Thank you for your feedback, {name}. We're taking what you shared into account as we keep improving at {business}.",
    },
    caloroso: {
      pt: "Obrigado por dividir sua experiência, {name}! Vamos usar esse retorno para deixar a {business} ainda melhor.",
      en: "Thanks for sharing your experience, {name}! We'll use this feedback to make {business} even better.",
    },
    direto: {
      pt: "Obrigado pelo retorno, {name}. Vamos avaliar o ponto citado na {business}.",
      en: "Thanks for the feedback, {name}. We'll look into the point you raised at {business}.",
    },
  },
  reclamacao: {
    formal: {
      pt: "Lamentamos muito pela experiência relatada, {name}. Gostaríamos de entender melhor o ocorrido na {business} — pode nos chamar pelo canal oficial para resolvermos diretamente?",
      en: "We're very sorry for the experience you described, {name}. We'd like to understand what happened at {business} better — could you reach us on our official channel so we can sort this out directly?",
    },
    caloroso: {
      pt: "Sentimos muito que sua passagem pela {business} não tenha sido como deveria, {name}. Queremos resolver isso com você — pode nos chamar por mensagem?",
      en: "We're really sorry your visit to {business} wasn't what it should've been, {name}. We'd like to make this right — can you message us directly?",
    },
    direto: {
      pt: "Desculpe pelo ocorrido, {name}. Chame a gente pelo canal oficial da {business} para resolvermos.",
      en: "Sorry about that, {name}. Please reach out through {business}'s official channel so we can fix this.",
    },
  },
};

export function generateReplyTemplate(
  tone: ReviewTone,
  authorName: string,
  businessName: string,
  locale: Locale,
  voice: ReplyVoice = "caloroso",
): ReplyResult {
  const firstName = authorName.split(" ")[0] ?? authorName;
  const template = REPLY_TEMPLATES[tone][voice][locale];
  const reply = template
    .replace("{name}", firstName)
    .replace("{business}", businessName);
  return { reply, justification: JUSTIFICATIONS[tone][locale] };
}

export function generateAskForReviewMessage(businessName: string, locale: Locale): string {
  return locale === "pt"
    ? `Oi! Que bom ter você como cliente da ${businessName}. Se puder, deixa pra gente uma avaliação contando como foi — isso ajuda muito outras pessoas a nos conhecerem. Obrigado!`
    : `Hi! It's great having you as a ${businessName} customer. If you have a minute, leaving us a review about your experience would really help other people find us. Thank you!`;
}
