"use client";

import { useEffect } from "react";

/**
 * Da ao header um estado "elevado" apos um pequeno scroll — orienta o
 * visitante de que saiu do topo da pagina. Sem saida visual propria: so
 * alterna um atributo no header (selecionado pelo DOM, nao por ref) para
 * que Header continue sendo um componente de servidor.
 */
export function HeaderScrollWatcher() {
  useEffect(() => {
    const header = document.querySelector<HTMLElement>("[data-site-header]");
    if (!header) return;

    function apply() {
      header!.dataset.elevated = window.scrollY > 8 ? "true" : "false";
    }

    apply();
    window.addEventListener("scroll", apply, { passive: true });
    return () => window.removeEventListener("scroll", apply);
  }, []);

  return null;
}
