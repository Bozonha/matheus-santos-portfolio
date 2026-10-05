"use client";

import { useEffect, type RefObject } from "react";
import { computeActivePhase, type PhaseSection } from "./progress";

function measure(container: HTMLElement): PhaseSection[] {
  const markers = Array.from(
    container.querySelectorAll<HTMLElement>("[data-phase-section]"),
  );
  return markers.map((el) => ({
    phase: el.dataset.phaseSection ?? "",
    top: el.getBoundingClientRect().top + window.scrollY,
  }));
}

/**
 * Pilota o atributo data-phase do container narrativo da Home conforme o
 * scroll. A camada de calculo (computeActivePhase) e pura e testada em
 * progress.test.ts; este hook so mede o DOM e repassa o resultado. A
 * suavidade visual da transicao vem do CSS (transition em tokens.css),
 * que ja respeita prefers-reduced-motion — o hook nao precisa de um
 * branch separado para isso, so continua trocando o atributo.
 */
export function usePhaseObserver(containerRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let sections = measure(container);
    let ticking = false;

    function apply() {
      if (!container) return;
      const phase = computeActivePhase(window.scrollY, window.innerHeight, sections);
      if (phase) container.dataset.phase = phase;
      ticking = false;
    }

    function onScroll() {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(apply);
    }

    function onResize() {
      if (!container) return;
      sections = measure(container);
      apply();
    }

    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [containerRef]);
}
