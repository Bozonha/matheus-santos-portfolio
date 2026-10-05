# DESIGN.md — "O turno"

Documento de direção de arte do site-portfólio de Matheus Santos. Serve como contrato visual: toda decisão de UI no código remete a um token ou regra definida aqui. Se um componente não encontra justificativa neste documento, ele não deveria existir.

## 1. Conceito

**"O turno."** O site se estrutura como o turno de um pequeno negócio: começa de noite, com uma pergunta de cliente que chega fora do horário, atravessa a madrugada e termina de dia. A mecânica central do negócio de Matheus é exatamente essa: *o negócio fecha, o atendimento não para.* O scroll da página inicial é o turno acontecendo — não é um efeito decorativo, é a demonstração do produto acontecendo no fundo da própria página.

Isso justifica, em um único movimento: o hero (uma conversa chegando às 23h47), a estrutura de seções numeradas como turnos ("Turno 01 — Noite"), o uso de relógio/horário como elemento recorrente, e o selo "Demonstração" como uma marca de registro de turno (não um badge genérico de marketing).

## 2. Dois eixos de cor — tema e fase (como coexistem)

O briefing pede duas coisas que parecem competir: (a) um ciclo visual noite→madrugada→dia ligado ao scroll, e (b) um tema claro/escuro coerente. A resolução: **são o mesmo sistema de tokens, com dois mecanismos de ativação diferentes.**

- `data-theme="dark"|"light"` — preferência do visitante (parte de `prefers-color-scheme`, com alternância manual no header, persistida em `localStorage`). Define o token de repouso para **todo o site**: header, footer, páginas de conteúdo (Soluções, Sobre, FAQ, Contato, Privacidade), painéis das demos. `dark` usa a família de cor de "noite"; `light` usa a família de cor de "dia". Não existe um terceiro palette "tema escuro" separado da narrativa — isso evitaria duas linguagens visuais concorrentes.
- `data-phase="noite"|"madrugada"|"dia"` — **só atua na página inicial**, no contêiner de scroll narrativo (Hero → seções do turno). É pilotado por `IntersectionObserver` por `<section data-phase>` e vence localmente sobre `data-theme` dentro desse contêiner: a história sempre abre em "noite" e termina em "dia", porque é a história, independente do tema escolhido pelo visitante. Fora desse contêiner (demos em páginas próprias, conteúdo, rodapé), só `data-theme` se aplica.
- `madrugada` é um palette que só existe como fase de transição do scroll — nunca é selecionável como tema.
- Com `prefers-reduced-motion: reduce`: a troca de fase continua (o `IntersectionObserver` ainda define `data-phase` por seção, então o conteúdo correto aparece), mas todas as transições de cor e a interpolação por `requestAnimationFrame` são desligadas via CSS (`transition: none`) — a seção simplesmente já nasce na cor certa, sem animação.

Essa divisão é o que será testado na Fase 8: 2 temas × 3 fases × 3 larguras.

## 3. Tokens de cor

Nomenclatura: `--color-bg`, `--color-bg-raised`, `--color-fg`, `--color-fg-muted`, `--color-border`, `--color-accent`, `--color-accent-ink` (texto sobre acento), `--color-alert`, `--color-focus-ring`.

### Noite / `data-theme="dark"` (azul-tinta profundo, neutros levemente azulados)

| token | valor | uso |
|---|---|---|
| `--color-bg` | `#0B1220` | fundo de página |
| `--color-bg-raised` | `#10192C` | cartões, painéis |
| `--color-fg` | `#E9EDF5` | texto principal |
| `--color-fg-muted` | `#A8B3C7` | texto secundário |
| `--color-border` | `#1F2B42` | divisores |
| `--color-accent` | `#F2994A` | único acento "vivo" |
| `--color-accent-ink` | `#14181F` | texto sobre acento |
| `--color-alert` | `#E0555A` | anomalias/erros (Demo C/D) |
| `--color-focus-ring` | `#F2994A` | anel de foco |

Contraste calculado (fórmula WCAG, luminância relativa): `--color-fg` sobre `--color-bg` = **15,97:1** (AA normal exige 4,5:1). `--color-accent` sobre `--color-bg` = **8,41:1** — passa até para texto normal.

### Dia / `data-theme="light"` (papel frio acinzentado, não creme)

| token | valor | uso |
|---|---|---|
| `--color-bg` | `#F2F3F5` | fundo de página |
| `--color-bg-raised` | `#FFFFFF` | cartões, painéis |
| `--color-fg` | `#14181F` | texto principal |
| `--color-fg-muted` | `#4B5563` | texto secundário |
| `--color-border` | `#D7DAE0` | divisores |
| `--color-accent` | `#F2994A` | acento (uso em UI/títulos grandes) |
| `--color-accent-text` | `#C96A1E` | variante escurecida, só para texto pequeno sobre papel |
| `--color-accent-ink` | `#14181F` | texto sobre fundo de acento |
| `--color-alert` | `#C23B40` | anomalias/erros |
| `--color-focus-ring` | `#C96A1E` | anel de foco |

Contraste: `--color-fg` sobre `--color-bg` = **16,06:1**. `--color-accent` (`#F2994A`) sobre `--color-bg` = **3,40:1** — **regra**: no tema dia, `--color-accent` cru só é usado em elementos de UI e títulos grandes (mínimo AA não-texto é 3:1); nunca em texto de corpo pequeno. Botões primários usam fundo `--color-accent` com texto `--color-accent-ink` (contraste **8,01:1**). Texto de corpo que precisa da cor de acento usa `--color-accent-text` (contraste **≈6,1:1**, passa AA normal).

### Madrugada / `data-phase="madrugada"` (só no scroll da Home)

| token | valor |
|---|---|
| `--color-bg` | `#2B3650` |
| `--color-bg-raised` | `#34405E` |
| `--color-fg` | `#EDEFF5` |
| `--color-fg-muted` | `#B7BED1` |
| `--color-border` | `#3C4A68` |
| `--color-accent` | `#F5A45F` |

Contraste `--color-fg`/`--color-bg` ≈ **10,4:1**. `--color-accent`/`--color-bg` ≈ **5,9:1** — nesta fase o acento já passa AA até em texto normal, por ser uma transição intermediária.

**Regra de acento**: `--color-accent` é usado em exatamente um conjunto de coisas em toda a UI — o indicador de mensagem chegando, o CTA principal, o alerta de anomalia *não* usa o acento (usa `--color-alert`, para não confundir "vivo" com "problema"), badges de estado ativo em Demo D. Nunca usado como cor decorativa solta.

## 4. Tipografia

Fontes (Google Fonts via `next/font/google`, `display: swap`):
- **Display** — Bricolage Grotesque (variável, eixos de peso e largura). Títulos, números grandes, o "23h47" do hero.
- **Texto** — Schibsted Grotesk. Corpo, parágrafos, UI.
- **Dados/código** — JetBrains Mono. Números de painel, timestamps, selos "Demonstração", trechos de código, rótulos de estado (`PENDENTE`, `OK`, `ERRO`).

Escala (base 17px, razão ≈1.25, com `clamp()` fluido nos maiores):
```
--text-xs:   0.8125rem   (13px)
--text-sm:   0.9375rem   (15px)
--text-base: 1.0625rem   (17px)  — corpo
--text-md:   1.1875rem   (19px)
--text-lg:   1.4375rem   (23px)
--text-xl:   clamp(1.8125rem, 1.6rem + 1vw, 2.25rem)   (~29–36px)
--text-2xl:  clamp(2.25rem, 1.9rem + 1.8vw, 3rem)       (~36–48px)
--text-3xl:  clamp(2.8125rem, 2.2rem + 3vw, 4.25rem)    (~45–68px) — hero
```
Corpo: `max-width: 65ch`, `line-height: 1.6`. Títulos: `text-wrap: balance`.

## 5. Grade

Desktop (≥1024px): 12 colunas, mas o conteúdo **não é sempre centralizado** — colunas 1–2 reservadas como margem de anotação ("marginalia": numeração de turno, horário, selo "Demonstração"), conteúdo principal ocupa colunas 3–10, elementos de demo podem se estender até a coluna 12 para quebrar a simetria. Mobile (<1024px): coluna única, marginalia empilhada acima do bloco de conteúdo em vez de ao lado. Container queries (`container-type: inline-size`) usadas dentro dos painéis de demo (ex.: o painel "o que o negócio vê" reflui de 1 para 2 colunas internas conforme sua própria largura, não a da viewport).

Breakpoints: 360 (mínimo suportado), 480, 768, 1024, 1280, 1440.

## 6. Movimento

Tokens: `--motion-fast: 120ms`, `--motion-base: 240ms`, `--motion-slow: 480ms`, `--motion-narrative: 900ms` (transição de fase), `--ease-standard: cubic-bezier(.4,0,.2,1)`.

- **Sequência de entrada do hero**: a bolha "Vocês têm horário amanhã?" aparece sozinha após ~400ms, a resposta do atendente após ~1200ms, só então o resto do chrome do hero assume opacidade final — simula a conversa realmente acontecendo.
- **Transição de fase (scroll)**: interpolação de `--color-bg`/`--color-fg`/etc. com `transition` em `--motion-narrative`, acionada por troca de `data-phase` via `IntersectionObserver` com threshold ~0.5.
- **Microinterações**: envio de mensagem nas demos (slide-in de bolha + indicador de digitação de 3 pontos), linha de gráfico desenhando-se ao montar (Demo C), pulso no nó ativo do pipeline (Demo D).
- `prefers-reduced-motion: reduce`: bloco global zera todas as durações (`!important` em `transition-duration`/`animation-duration: 0.01ms`) exceto a troca discreta de `data-phase`, que continua funcional sem animação.

## 7. Componentes (inventário, sem genéricos)

Header (wordmark textual, nav, seletor de idioma, alternador de tema), Footer (aviso de demonstração fixo, contato, link LGPD), `SectionTurn` (wrapper com `data-phase` + numeração "Turno 0X"), `DemoSeal` (selo "Demonstração" — marca própria em SVG, não emoji, não ícone de aviso genérico, fixada no canto de cada card de demo), `ChatBubble`/`PhoneFrame` (interface de celular própria, "inspirada em apps de mensagem", sem logotipo ou chrome copiado), `StatCard` (números do painel financeiro — tratamento variado: alguns com borda só, alguns estilo "recibo" com borda pontilhada, não cartões idênticos com sombra uniforme), `DataTable` (ordenável), `PipelineNode`, `CodeBlock` (JetBrains Mono, numeração de linha), `Button` (primário = fundo `--color-accent` + texto `--color-accent-ink`; secundário = contorno), `IlustrativeNote` (nota "projeção ilustrativa" com a premissa visível).

Ícones: conjunto SVG próprio e consistente (24px, stroke 1.5), específicos do domínio (relógio, bolha de mensagem, pino de mapa, gráfico de linha, nó de pipeline, cadeado para LGPD) — nunca foguete/lâmpada/emoji.

## 8. Revisão contra a lista de proibições

| Proibido | Como este design evita |
|---|---|
| Cartões iguais com sombra | Tratamentos variados por tipo de cartão (borda, pontilhado, elevação só onde algo está "vivo"); sem sombra uniforme padrão |
| Emoji como ícone | Conjunto SVG próprio |
| Ícones de foguete/lâmpada | Ícones específicos do domínio (relógio, chat, pipeline, mapa) |
| Imagens de banco de fotos | Zero fotografia; só SVG/CSS/dados reais das demos |
| Depoimentos | Não existem (regra de honestidade também proíbe) |
| "Trusted by" | Não existe |
| Carrossel automático | Seletor de cenário é por abas manuais, nunca autoplay |
| Parallax exagerado | Único efeito de profundidade é a interpolação de cor de fase; sem camadas paralaxe |
| Chatbot flutuante genérico | Demo A é embutida na seção/página, não um widget fixo de canto |
| Gradiente roxo-azul | Família de matiz 220–225° (azul-tinta), sem mistura de roxo (260–280°) |
| Tom terracota-creme | Fundo-dia é cinza frio `#F2F3F5`, não bege/creme |
| Preto com verde-ácido | Nenhum verde no palette principal; acento é âmbar-coral |
| Fundo sempre branco | Fundo-dia é cinza frio; branco só como superfície elevada pontual |

Nenhum item da lista é usado neste design. Pronto para avançar para a Fase 2 (Base).
