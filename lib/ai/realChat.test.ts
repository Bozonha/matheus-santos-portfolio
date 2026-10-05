import { describe, expect, it, vi } from "vitest";
import { getRealChatResponse } from "./realChat";

function mockFetch(responseBody: unknown, ok = true, status = 200) {
  return vi.fn().mockResolvedValue({
    ok,
    status,
    json: async () => responseBody,
    text: async () => JSON.stringify(responseBody),
  }) as unknown as typeof fetch;
}

describe("getRealChatResponse", () => {
  it("retorna o texto do primeiro bloco de texto da resposta", async () => {
    const fetchImpl = mockFetch({ content: [{ type: "text", text: "Olá! Como posso ajudar?" }] });
    const reply = await getRealChatResponse({
      apiKey: "sk-test",
      systemPrompt: "Você é um atendente.",
      messages: [{ role: "user", content: "oi" }],
      fetchImpl,
    });
    expect(reply).toBe("Olá! Como posso ajudar?");
  });

  it("chama a URL e o modelo certos", async () => {
    const fetchImpl = mockFetch({ content: [{ type: "text", text: "ok" }] });
    await getRealChatResponse({
      apiKey: "sk-test",
      systemPrompt: "sistema",
      messages: [{ role: "user", content: "oi" }],
      fetchImpl,
    });
    const [url, init] = (fetchImpl as ReturnType<typeof vi.fn>).mock.calls[0]!;
    expect(url).toBe("https://api.anthropic.com/v1/messages");
    const body = JSON.parse((init as RequestInit).body as string);
    expect(body.model).toBe("claude-sonnet-5");
    expect(body.system).toBe("sistema");
  });

  it("manda a chave no header x-api-key", async () => {
    const fetchImpl = mockFetch({ content: [{ type: "text", text: "ok" }] });
    await getRealChatResponse({
      apiKey: "sk-minha-chave",
      systemPrompt: "sistema",
      messages: [{ role: "user", content: "oi" }],
      fetchImpl,
    });
    const [, init] = (fetchImpl as ReturnType<typeof vi.fn>).mock.calls[0]!;
    const headers = (init as RequestInit).headers as Record<string, string>;
    expect(headers["x-api-key"]).toBe("sk-minha-chave");
  });

  it("rejeita sem chave de API", async () => {
    await expect(
      getRealChatResponse({
        apiKey: "",
        systemPrompt: "sistema",
        messages: [{ role: "user", content: "oi" }],
        fetchImpl: mockFetch({}),
      }),
    ).rejects.toThrow(/ANTHROPIC_API_KEY/);
  });

  it("rejeita sem nenhuma mensagem", async () => {
    await expect(
      getRealChatResponse({
        apiKey: "sk-test",
        systemPrompt: "sistema",
        messages: [],
        fetchImpl: mockFetch({}),
      }),
    ).rejects.toThrow(/mensagem/);
  });

  it("rejeita quando a API responde com erro HTTP", async () => {
    const fetchImpl = mockFetch({ error: "rate limited" }, false, 429);
    await expect(
      getRealChatResponse({
        apiKey: "sk-test",
        systemPrompt: "sistema",
        messages: [{ role: "user", content: "oi" }],
        fetchImpl,
      }),
    ).rejects.toThrow(/429/);
  });

  it("rejeita quando a resposta nao tem bloco de texto", async () => {
    const fetchImpl = mockFetch({ content: [{ type: "tool_use" }] });
    await expect(
      getRealChatResponse({
        apiKey: "sk-test",
        systemPrompt: "sistema",
        messages: [{ role: "user", content: "oi" }],
        fetchImpl,
      }),
    ).rejects.toThrow(/bloco de texto/);
  });

  it("repassa o historico de mensagens no corpo da requisicao", async () => {
    const fetchImpl = mockFetch({ content: [{ type: "text", text: "ok" }] });
    await getRealChatResponse({
      apiKey: "sk-test",
      systemPrompt: "sistema",
      messages: [
        { role: "user", content: "primeira" },
        { role: "assistant", content: "resposta" },
        { role: "user", content: "segunda" },
      ],
      fetchImpl,
    });
    const [, init] = (fetchImpl as ReturnType<typeof vi.fn>).mock.calls[0]!;
    const body = JSON.parse((init as RequestInit).body as string);
    expect(body.messages).toHaveLength(3);
    expect(body.messages[2]).toEqual({ role: "user", content: "segunda" });
  });
});
