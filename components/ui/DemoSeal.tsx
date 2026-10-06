import styles from "./DemoSeal.module.css";

/**
 * Selo marcando qualquer conteudo fictício de demonstracao. `variant="corner"`
 * (padrao) se fixa no canto superior direito de um container `position:
 * relative`; `variant="inline"` renderiza como item de fluxo normal, para
 * quando o canto ja tem outro conteudo (ex.: cabecalho do chat do hero).
 */
export function DemoSeal({
  label,
  variant = "corner",
}: {
  label: string;
  variant?: "corner" | "inline";
}) {
  return (
    <span className={`${styles.seal} ${variant === "corner" ? styles.corner : ""}`}>
      {label}
    </span>
  );
}
