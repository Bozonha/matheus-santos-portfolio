import { describe, expect, it } from "vitest";
import { mulberry32, randomInRange } from "./mulberry32";

describe("mulberry32", () => {
  it("a mesma semente produz sempre a mesma sequencia", () => {
    const a = mulberry32(42);
    const b = mulberry32(42);
    const seqA = [a(), a(), a(), a()];
    const seqB = [b(), b(), b(), b()];
    expect(seqA).toEqual(seqB);
  });

  it("sementes diferentes produzem sequencias diferentes", () => {
    const a = mulberry32(1);
    const b = mulberry32(2);
    expect(a()).not.toBe(b());
  });

  it("gera numeros dentro de [0, 1)", () => {
    const rng = mulberry32(7);
    for (let i = 0; i < 200; i++) {
      const value = rng();
      expect(value).toBeGreaterThanOrEqual(0);
      expect(value).toBeLessThan(1);
    }
  });

  it("nao repete o primeiro valor imediatamente (sem ciclo trivial)", () => {
    const rng = mulberry32(123);
    const first = rng();
    const second = rng();
    expect(first).not.toBe(second);
  });

  it("e sensivel a semente 0 sem travar", () => {
    const rng = mulberry32(0);
    expect(Number.isFinite(rng())).toBe(true);
  });
});

describe("randomInRange", () => {
  it("retorna sempre dentro do intervalo pedido", () => {
    const rng = mulberry32(99);
    for (let i = 0; i < 100; i++) {
      const value = randomInRange(rng, 10, 20);
      expect(value).toBeGreaterThanOrEqual(10);
      expect(value).toBeLessThan(20);
    }
  });

  it("e deterministico para a mesma semente", () => {
    const rngA = mulberry32(55);
    const rngB = mulberry32(55);
    expect(randomInRange(rngA, 0, 100)).toBe(randomInRange(rngB, 0, 100));
  });
});
