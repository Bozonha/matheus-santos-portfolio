# Site-portfólio — Matheus Santos

Site bilíngue (pt/en) com 4 demonstrações interativas, construído em Next.js (App Router) e exportado como site estático. Roda inteiramente no navegador — nenhuma das demos depende de API paga ou backend.

## Stack

- Next.js (App Router) + TypeScript + `output: 'export'`
- CSS puro com variáveis (tokens de design) + CSS Modules — sem Tailwind
- Vitest para os motores das 4 demos (testes unitários)
- Fontes: Bricolage Grotesque, Schibsted Grotesk, JetBrains Mono (Google Fonts, self-hosted via `next/font`)

## Rodando localmente

```bash
npm install
npm run dev       # http://localhost:3000
```

## Scripts

| Script | O que faz |
|---|---|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Gera o site estático em `out/` (roda `scripts/generate-og.mjs` antes, para criar as imagens Open Graph) |
| `npm run test` | Roda os testes unitários (Vitest) |
| `npm run typecheck` | Checagem de tipos TypeScript |
| `npm run lint` | ESLint |

Depois de `npm run build`, a pasta `out/` é o site pronto — pode ser servida por qualquer hospedagem de arquivos estáticos (`npx serve out` para testar localmente).

## Variáveis de ambiente (opcionais)

Nenhuma variável é obrigatória — o site funciona 100% sem configurar nada.

| Variável | Efeito |
|---|---|
| `NEXT_PUBLIC_WHATSAPP` | Se definida (ex.: `5511999999999`), o botão de WhatsApp aparece na página de Contato. Se vazia ou ausente, o botão não aparece em lugar nenhum do site. |
| `ANTHROPIC_API_KEY` | Não usada pelo site publicado. Só é relevante se você optar por habilitar a rota opcional de "IA real" descrita abaixo. |

Para configurar localmente, crie um arquivo `.env.local` na raiz:

```
NEXT_PUBLIC_WHATSAPP=5511999999999
```

## Publicando na Vercel

**Opção 1 — importar do GitHub:**
1. Suba este repositório para o GitHub (`git push` para um repo novo).
2. Em [vercel.com/new](https://vercel.com/new), importe o repositório.
3. A Vercel detecta Next.js automaticamente. Não é preciso mudar nenhuma configuração de build.
4. Se for usar o WhatsApp, adicione `NEXT_PUBLIC_WHATSAPP` em Project Settings → Environment Variables antes do primeiro deploy (ou redeploy depois de adicionar).
5. Clique em Deploy.

**Opção 2 — linha de comando:**
```bash
npm install -g vercel
vercel login
vercel          # primeiro deploy (gera um preview)
vercel --prod   # deploy de produção
```

## Domínio próprio

Depois de publicado, em Project Settings → Domains na Vercel, adicione seu domínio e siga as instruções de DNS (geralmente um registro `CNAME` ou `A` apontando para a Vercel). O certificado HTTPS é emitido automaticamente.

## Outras hospedagens

O build é um site estático comum (`output: 'export'`), então o mesmo `out/` roda sem adaptação em:
- **Cloudflare Pages**: comando de build `npm run build`, diretório de saída `out`.
- **Netlify**: comando de build `npm run build`, diretório de publicação `out`.

## Habilitando "IA real" no atendente (opcional, avançado)

Por padrão, o Demo A (atendente de mensagens) usa um motor de conversa local e determinístico — funciona offline, sem custo, sem chave de API. Existe uma referência de como plugar a API da Anthropic no lugar dele:

- `lib/ai/realChat.ts` tem uma função isolada e testável que chama a API da Anthropic.
- `server-extension/app/api/chat/route.ts` é um Route Handler de referência (fora da pasta `app/` principal de propósito — Route Handlers dinâmicos são incompatíveis com `output: 'export'`).

Para habilitar de verdade:
1. Copie `server-extension/app/api/chat/` para dentro de `app/api/chat/`.
2. Remova `output: 'export'` de `next.config.ts`.
3. Configure `ANTHROPIC_API_KEY` nas variáveis de ambiente do seu provedor (precisa de um runtime Node/Edge — Vercel funciona nativamente; não funciona em hospedagem puramente estática como Cloudflare Pages/Netlify sem adaptação adicional).
4. Publique.

Isso é opcional e não afeta o site publicado por padrão — o demo funciona inteiramente sem essa etapa.

## Estrutura do projeto

```
app/[locale]/        páginas (pt/en), inclui as 4 rotas de demo
components/           componentes React (layout, seções, demos, UI)
content/dictionaries/ conteúdo bilíngue tipado
lib/demos/{a,b,c,d}/  motores das 4 demos — módulos puros, testados
lib/dayCycle/         ciclo noite/madrugada/dia ligado ao scroll da Home
styles/                tokens de design, CSS global
scripts/generate-og.mjs geração das imagens Open Graph no build
server-extension/     referência da rota de IA real (não compilada por padrão)
DESIGN.md              decisões de direção de arte
```

## Privacidade

Sem cookies, sem analytics, sem rastreadores de terceiros. Os dados das demonstrações são gerados e processados inteiramente no navegador do visitante.
