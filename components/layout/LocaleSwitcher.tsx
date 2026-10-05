"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { translatePath, type Locale } from "@/lib/routes";

export function LocaleSwitcher({
  currentLocale,
  label,
}: {
  currentLocale: Locale;
  label: string;
}) {
  const pathname = usePathname();
  const targetLocale: Locale = currentLocale === "pt" ? "en" : "pt";
  const href = translatePath(pathname ?? "/", targetLocale);

  return (
    <Link href={href} hrefLang={targetLocale} lang={targetLocale}>
      {label}
    </Link>
  );
}
