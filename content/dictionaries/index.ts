import type { Locale } from "@/lib/routes";
import type { Dictionary } from "./types";
import pt from "./pt";
import en from "./en";

const dictionaries: Record<Locale, Dictionary> = { pt, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export type { Dictionary };
