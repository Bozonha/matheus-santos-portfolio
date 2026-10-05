/**
 * Route Handler de referência para ligar o Demo A a uma IA de verdade.
 *
 * Este arquivo NAO faz parte da build estática padrão — fica fora da
 * pasta `app/` principal de propósito, porque `output: 'export'`
 * (usado no build publicado) é incompatível com Route Handlers
 * dinâmicos. Para habilitar:
 *
 *   1. Copie esta pasta para dentro de app/api/chat/
 *   2. Remova `output: 'export'` de next.config.ts
 *   3. Configure ANTHROPIC_API_KEY no seu provedor (precisa de runtime
 *      Node/Edge — Vercel funciona nativamente)
 *   4. Publique
 *
 * Veja README.md, seção "Habilitando IA real", para mais detalhes.
 */
import { NextRequest, NextResponse } from "next/server";
import { getRealChatResponse, type ChatMessageInput } from "@/lib/ai/realChat";

export const runtime = "nodejs";

interface ChatRequestBody {
  systemPrompt: string;
  messages: ChatMessageInput[];
}

export async function POST(request: NextRequest) {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "ANTHROPIC_API_KEY não configurada no servidor." },
      { status: 500 },
    );
  }

  let body: ChatRequestBody;
  try {
    body = (await request.json()) as ChatRequestBody;
  } catch {
    return NextResponse.json({ error: "JSON inválido." }, { status: 400 });
  }

  if (!Array.isArray(body.messages) || body.messages.length === 0) {
    return NextResponse.json({ error: "'messages' precisa ter pelo menos um item." }, {
      status: 400,
    });
  }

  try {
    const reply = await getRealChatResponse({
      apiKey,
      systemPrompt: body.systemPrompt,
      messages: body.messages,
    });
    return NextResponse.json({ reply });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Erro desconhecido.";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
