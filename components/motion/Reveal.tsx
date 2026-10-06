"use client";

import { useInView } from "@/lib/motion/useInView";
import styles from "./Reveal.module.css";

type RevealProps = {
  children: React.ReactNode;
  as?: "div" | "article" | "li" | "span";
  /** Posicao no grupo — usada para escalonar a entrada (stagger). */
  index?: number;
  /** Intervalo entre itens escalonados, em ms. */
  stagger?: number;
  /** Atraso fixo adicional, em ms. */
  delay?: number;
  /** Deslocamento vertical de origem, em px. */
  y?: number;
  className?: string;
  /** Ocupa 100% da altura do item de grid (para grades de cartoes-link). */
  fill?: boolean;
};

/**
 * Revela o conteudo quando ele entra na viewport — uma unica vez. Pensado
 * para blocos de conteudo abaixo da dobra (grades de cartao, listas,
 * paragrafos de encerramento); o hero e o H1 de cada pagina nao usam isto,
 * para nao atrasar o primeiro conteudo visivel atras de JS.
 */
export function Reveal({
  children,
  as = "div",
  index = 0,
  stagger = 70,
  delay = 0,
  y = 16,
  className,
  fill = false,
}: RevealProps) {
  const [ref, inView] = useInView<HTMLElement>();
  const Tag = as;
  const totalDelay = delay + Math.min(index, 5) * stagger;

  return (
    <Tag
      ref={ref as never}
      className={`${styles.reveal} ${inView ? styles.visible : ""} ${className ?? ""}`}
      style={
        {
          "--reveal-delay": `${totalDelay}ms`,
          "--reveal-y": `${y}px`,
          ...(fill ? { height: "100%" } : null),
        } as React.CSSProperties
      }
    >
      {children}
    </Tag>
  );
}
