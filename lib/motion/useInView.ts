"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

/**
 * Observa quando um elemento entra na viewport, uma unica vez (desconecta
 * apos revelar — o objetivo e orientar a entrada do conteudo, nao repetir
 * a animacao a cada vai-e-vem de scroll). Sem IntersectionObserver no
 * ambiente, considera visivel de imediato em vez de esconder conteudo.
 */
export function useInView<T extends HTMLElement>(
  options?: { rootMargin?: string; threshold?: number },
): [RefObject<T | null>, boolean] {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: options?.rootMargin ?? "0px 0px -10% 0px",
        threshold: options?.threshold ?? 0.15,
      },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [options?.rootMargin, options?.threshold]);

  return [ref, inView];
}
