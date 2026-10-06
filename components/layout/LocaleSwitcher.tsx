"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { translatePath, type Locale } from "@/lib/routes";

export function LocaleSwitcher({
  currentLocale,
  label,
  className,
}: {
  currentLocale: Locale;
  label: string;
  className?: string;
}) {
  const pathname = usePathname();
  const targetLocale: Locale = currentLocale === "pt" ? "en" : "pt";
  const href = translatePath(pathname ?? "/", targetLocale);

  return (
    <Link href={href} hrefLang={targetLocale} lang={targetLocale} className={className}>
      {label}
    </Link>
  );
}
