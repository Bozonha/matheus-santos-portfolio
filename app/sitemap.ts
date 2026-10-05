import type { MetadataRoute } from "next";
import { locales, pagePaths, demoSlugs } from "@/lib/routes";

export const dynamic = "force-static";

const baseUrl = "https://matheussantos.example";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticSlugs = Object.values(pagePaths).filter((slug) => slug !== "");
  const demoPaths = Object.values(demoSlugs).map((slug) => `${pagePaths.demos}/${slug}`);
  const allSlugs = ["", ...staticSlugs, ...demoPaths];

  return locales.flatMap((locale) =>
    allSlugs.map((slug) => ({
      url: slug ? `${baseUrl}/${locale}/${slug}/` : `${baseUrl}/${locale}/`,
      lastModified: new Date(),
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, slug ? `${baseUrl}/${l}/${slug}/` : `${baseUrl}/${l}/`]),
        ),
      },
    })),
  );
}
