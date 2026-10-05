import { describe, expect, it } from "vitest";
import { buildLineChartGeometry, buildYAxisTicks } from "./svgPath";

describe("buildLineChartGeometry", () => {
  it("calcula pontos e path exatos para um caso simples conhecido", () => {
    const geometry = buildLineChartGeometry([0, 50, 100], 100, 100, 0);
    expect(geometry.points).toEqual([
      { x: 0, y: 100 },
      { x: 50, y: 50 },
      { x: 100, y: 0 },
    ]);
    expect(geometry.path).toBe("M0,100 L50,50 L100,0");
    expect(geometry.minValue).toBe(0);
    expect(geometry.maxValue).toBe(100);
  });

  it("retorna geometria vazia para serie vazia", () => {
    const geometry = buildLineChartGeometry([], 100, 100);
    expect(geometry.points).toEqual([]);
    expect(geometry.path).toBe("");
  });

  it("um unico ponto fica no inicio do eixo x", () => {
    const geometry = buildLineChartGeometry([42], 100, 100, 10);
    expect(geometry.points).toHaveLength(1);
    expect(geometry.points[0]!.x).toBe(10);
  });

  it("serie achatada fica centralizada verticalmente, nao no fundo", () => {
    const geometry = buildLineChartGeometry([50, 50, 50], 100, 100, 0);
    for (const point of geometry.points) {
      expect(point.y).toBe(50);
    }
  });

  it("respeita o padding: nenhum ponto fica fora da area util", () => {
    const geometry = buildLineChartGeometry([1, 50, 10, 90, 5], 200, 100, 12);
    for (const point of geometry.points) {
      expect(point.x).toBeGreaterThanOrEqual(12);
      expect(point.x).toBeLessThanOrEqual(188);
      expect(point.y).toBeGreaterThanOrEqual(12);
      expect(point.y).toBeLessThanOrEqual(88);
    }
  });

  it("o x cresce estritamente de um ponto pro proximo", () => {
    const values = [10, 40, 15, 70, 30, 90, 20, 60, 50, 80, 25, 95];
    const geometry = buildLineChartGeometry(values, 360, 120, 8);
    for (let i = 1; i < geometry.points.length; i++) {
      expect(geometry.points[i]!.x).toBeGreaterThan(geometry.points[i - 1]!.x);
    }
  });

  it("lida com valores negativos sem quebrar a escala", () => {
    const geometry = buildLineChartGeometry([-50, 0, 50], 100, 100, 0);
    expect(geometry.minValue).toBe(-50);
    expect(geometry.maxValue).toBe(50);
    expect(geometry.points[0]!.y).toBe(100);
    expect(geometry.points[2]!.y).toBe(0);
  });

  it("e deterministica para a mesma entrada", () => {
    const values = [3, 7, 2, 9, 4];
    expect(buildLineChartGeometry(values, 300, 120)).toEqual(
      buildLineChartGeometry(values, 300, 120),
    );
  });
});

describe("buildYAxisTicks", () => {
  it("gera marcas igualmente espacadas entre min e max", () => {
    expect(buildYAxisTicks(0, 100, 4)).toEqual([0, 33, 67, 100]);
  });

  it("retorna so o minimo quando count e 1", () => {
    expect(buildYAxisTicks(10, 90, 1)).toEqual([10]);
  });

  it("retorna copias do mesmo valor quando min igual a max", () => {
    expect(buildYAxisTicks(50, 50, 3)).toEqual([50, 50, 50]);
  });

  it("funciona com numero diferente de marcas", () => {
    expect(buildYAxisTicks(0, 10, 3)).toEqual([0, 5, 10]);
  });
});
