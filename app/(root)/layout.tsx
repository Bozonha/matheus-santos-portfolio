import type { Metadata } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Matheus Santos",
  robots: { index: false, follow: false },
  icons: { icon: "/favicon.svg" },
};

export default function RootEntryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt">
      <body>{children}</body>
    </html>
  );
}
