/**
 * Ponte opcional com a API da Anthropic, para quando o atendente de
 * mensagens (Demo A) for ligado a uma IA de verdade em vez do motor local
 * determinístico. Nao e importada por nenhum componente da build padrao
 * (`output: 'export'` nao roda Route Handlers dinamicos) — existe como
 * referencia de engenharia real e testavel. Veja README.md, secao
 * "Habilitando IA real", e server-extension/app/api/chat/route.ts.
 */

export interface ChatMessageInput {
  role: "user" | "assistant";
  content: string;
}

export interface RealChatOptions {
  apiKey: string;
  systemPrompt: string;
  messages: ChatMessageInput[];
  model?: string;
  fetchImpl?: typeof fetch;
}

interface AnthropicContentBlock {
  type: string;
  text?: string;
}

interface AnthropicResponse {
  content?: AnthropicContentBlock[];
}

export async function getRealChatResponse(options: RealChatOptions): Promise<string> {
  const { apiKey, systemPrompt, messages, model = "claude-sonnet-5", fetchImpl = fetch } = options;

  if (!apiKey) {
    throw new Error("ANTHROPIC_API_KEY ausente.");
  }
  if (messages.length === 0) {
    throw new Error("E preciso pelo menos uma mensagem.");
  }

  const response = await fetchImpl("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model,
      max_tokens: 512,
      system: systemPrompt,
      messages: messages.map((m) => ({ role: m.role, content: m.content })),
    }),
  });

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(`Erro da API da Anthropic (${response.status}): ${text}`);
  }

  const data = (await response.json()) as AnthropicResponse;
  const textBlock = data.content?.find((block) => block.type === "text" && block.text);

  if (!textBlock?.text) {
    throw new Error("Resposta da Anthropic sem bloco de texto.");
  }

  return textBlock.text;
}
