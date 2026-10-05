import { describe, expect, it } from "vitest";
import { CODE_SNIPPETS } from "./codeSnippets";

function countChar(text: string, char: string): number {
  return text.split(char).length - 1;
}

describe("CODE_SNIPPETS", () => {
  it("tem exatamente os dois trechos esperados", () => {
    expect(CODE_SNIPPETS.map((s) => s.id)).toEqual(["power-query", "python"]);
  });

  it("nenhum trecho esta vazio", () => {
    for (const snippet of CODE_SNIPPETS) {
      expect(snippet.code.trim().length).toBeGreaterThan(0);
    }
  });

  it("todos tem titulo e linguagem preenchidos", () => {
    for (const snippet of CODE_SNIPPETS) {
      expect(snippet.title.length).toBeGreaterThan(0);
      expect(snippet.language.length).toBeGreaterThan(0);
    }
  });

  it("o trecho de Power Query usa let/in e List.Generate para paginar", () => {
    const m = CODE_SNIPPETS.find((s) => s.id === "power-query")!;
    expect(m.code).toContain("let");
    expect(m.code).toContain("in");
    expect(m.code).toContain("List.Generate");
    expect(m.code).toContain("Web.Contents");
  });

  it("parenteses e colchetes do trecho de Power Query estao balanceados", () => {
    const m = CODE_SNIPPETS.find((s) => s.id === "power-query")!;
    expect(countChar(m.code, "(")).toBe(countChar(m.code, ")"));
    expect(countChar(m.code, "[")).toBe(countChar(m.code, "]"));
  });

  it("o trecho de Python usa um loop while com paginacao e tratamento de erro HTTP", () => {
    const py = CODE_SNIPPETS.find((s) => s.id === "python")!;
    expect(py.code).toContain("while True");
    expect(py.code).toContain("raise_for_status");
    expect(py.code).toContain("import requests");
  });

  it("parenteses e colchetes do trecho de Python estao balanceados", () => {
    const py = CODE_SNIPPETS.find((s) => s.id === "python")!;
    expect(countChar(py.code, "(")).toBe(countChar(py.code, ")"));
    expect(countChar(py.code, "[")).toBe(countChar(py.code, "]"));
    expect(countChar(py.code, "{")).toBe(countChar(py.code, "}"));
  });

  it("o trecho de Python tem indentacao consistente (multiplo de 4 espacos)", () => {
    const py = CODE_SNIPPETS.find((s) => s.id === "python")!;
    for (const line of py.code.split("\n")) {
      if (line.trim() === "") continue;
      const leadingSpaces = line.match(/^ */)![0].length;
      expect(leadingSpaces % 4).toBe(0);
    }
  });
});
