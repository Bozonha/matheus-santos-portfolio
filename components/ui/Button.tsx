import Link from "next/link";
import styles from "./Button.module.css";

export function Button({
  href,
  variant = "primary",
  children,
}: {
  href: string;
  variant?: "primary" | "secondary";
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`${styles.button} ${variant === "primary" ? styles.primary : styles.secondary}`}
    >
      {children}
    </Link>
  );
}
