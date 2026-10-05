import { describe, expect, it } from "vitest";
import {
  classifyReviewTone,
  generateAskForReviewMessage,
  generateReplyTemplate,
} from "./reviewResponder";

describe("classifyReviewTone — portugues", () => {
  it("classifica elogio claro", () => {
    expect(classifyReviewTone("Atendimento excelente, recomendo muito!", "pt")).toBe("elogio");
  });

  it("classifica reclamação clara", () => {
    expect(classifyReviewTone("Que serviço horrível, muito decepcionado.", "pt")).toBe(
      "reclamacao",
    );
  });

  it("classifica como neutro quando nao ha palavra de sentimento", () => {
    expect(classifyReviewTone("Fui na terça-feira às 15h.", "pt")).toBe("neutro");
  });

  it("trata negacao simples invertendo a polaridade", () => {
    expect(classifyReviewTone("Não gostei do atendimento.", "pt")).toBe("reclamacao");
  });

  it("trata negacao dupla corretamente", () => {
    expect(classifyReviewTone("Não é ruim, pelo contrário, adorei!", "pt")).toBe("elogio");
  });

  it("classifica a avaliacao de elogio da fixture da padaria", () => {
    expect(
      classifyReviewTone(
        "Pão quentinho todo dia e atendimento ótimo. Virei cliente fiel!",
        "pt",
      ),
    ).toBe("elogio");
  });

  it("classifica a avaliacao de reclamacao da fixture da padaria", () => {
    expect(
      classifyReviewTone(
        "Já fui bem atendida outras vezes, mas dessa vez esperei muito e ninguém me avisou do atraso.",
        "pt",
      ),
    ).toBe("reclamacao");
  });
});

describe("classifyReviewTone — ingles", () => {
  it("classifica elogio claro", () => {
    expect(classifyReviewTone("Great service, I recommend it!", "en")).toBe("elogio");
  });

  it("classifica reclamação clara", () => {
    expect(classifyReviewTone("Terrible experience, very disappointed.", "en")).toBe(
      "reclamacao",
    );
  });

  it("trata negacao simples", () => {
    expect(classifyReviewTone("I did not like the service.", "en")).toBe("reclamacao");
  });
});

describe("generateReplyTemplate", () => {
  it("gera resposta de elogio citando o primeiro nome e o negocio", () => {
    const { reply, justification } = generateReplyTemplate(
      "elogio",
      "Fernanda O.",
      "Salão Beleza Rara",
      "pt",
    );
    expect(reply).toContain("Fernanda");
    expect(reply).toContain("Salão Beleza Rara");
    expect(justification).toMatch(/positivas/);
  });

  it("gera resposta de reclamação que pede desculpas e chama para o canal oficial, sem prometer o que nao pode garantir", () => {
    const { reply } = generateReplyTemplate("reclamacao", "Renata C.", "Academia Potência", "pt");
    expect(reply.toLowerCase()).toMatch(/lament|sentimos|desculp/);
    expect(reply).not.toMatch(/garantimos|100%/i);
  });

  it("muda a redação conforme o tom de voz escolhido", () => {
    const formal = generateReplyTemplate("elogio", "Ana", "Negócio X", "pt", "formal").reply;
    const caloroso = generateReplyTemplate("elogio", "Ana", "Negócio X", "pt", "caloroso").reply;
    expect(formal).not.toBe(caloroso);
  });

  it("gera resposta neutra reconhecendo o ponto sem inventar detalhes", () => {
    const { reply, justification } = generateReplyTemplate(
      "neutro",
      "Aline D.",
      "Salão Beleza Rara",
      "pt",
    );
    expect(reply).toContain("Aline");
    expect(justification).toMatch(/não pende/);
  });

  it("funciona em ingles", () => {
    const { reply } = generateReplyTemplate("elogio", "Fernanda", "Rare Beauty Salon", "en");
    expect(reply).toContain("Fernanda");
    expect(reply).toContain("Rare Beauty Salon");
  });
});

describe("generateAskForReviewMessage", () => {
  it("menciona o nome do negocio", () => {
    expect(generateAskForReviewMessage("Padaria Trigo Dourado", "pt")).toContain(
      "Padaria Trigo Dourado",
    );
  });

  it("funciona em ingles", () => {
    expect(generateAskForReviewMessage("Golden Wheat Bakery", "en")).toContain(
      "Golden Wheat Bakery",
    );
  });
});
