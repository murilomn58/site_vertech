# Vertech — Design System (site institucional)

Fonte única de verdade visual do site `vertechsolucoes.com.br`. Formato Claude
Design. Use este arquivo como brief para qualquer geração de UI/assets.

## 1. Tema e atmosfera
Dark premium, tech, confiável e caloroso. "IA que trabalha pela sua empresa".
Referências de mood: Linear (precisão minimal), Stripe (gradiente + leveza =
tech confiável), Claude/Anthropic (IA com calor humano), ElevenLabs/Runway
(dark cinematic para o hero). Nada de genérico de IA: sem cara de template.

## 2. Paleta e papéis (tokens em `src/app/globals.css` `@theme`)
| Token | Hex | Papel |
|---|---|---|
| `--color-bg-dark` | `#0A0F1C` | fundo base da página |
| `--color-navy` | `#0F172A` | navy oficial (seções, cartões) |
| `--color-navy-deep` | `#080D1A` | fundos mais escuros, footer |
| `--color-surface` | `#131A2C` | superfície de cartão |
| `--color-surface-2` | `#1B2540` | superfície elevada |
| `--color-ink` | `#F8FAFC` | texto principal |
| `--color-ink-muted` | `#94A3B8` | texto secundário |
| `--color-ink-faint` | `#64748B` | texto terciário/labels |
| `--color-cyan` | `#22D3EE` | acento principal / CTA |
| `--color-cyan-bright` | `#67E8F9` | realce, gradiente |
| `--color-cyan-dark` | `#0891B2` | gradientes, sombra |
| `--color-whatsapp` | `#25D366` | botões de WhatsApp |
| `--color-line` | `rgba(148,163,184,0.14)` | bordas sutis |

Gradiente de marca: navy -> cyan (`text-gradient` utility; mesh gradient no hero).

## 3. Tipografia
- Display/títulos: **Space Grotesk** (`font-display`). Tracking apertado (-0.02em).
- Corpo: **Montserrat** (`font-body`, fonte oficial do manual).
- Mono/labels/métricas: **JetBrains Mono** (`font-mono`), caixa alta, tracking largo.
- **NUNCA Inter.** Decisão em aberto: testar Clash Display como display alternativo.

## 4. Componentes (primitives em `src/components/primitives`)
- `Section` + `Eyebrow`: container + rótulo cyan de seção.
- `Reveal`: fade+subida on scroll (Motion `whileInView`, `once`).
- `SplitReveal`: headline com palavras subindo (clip), SSR-safe.
- `TiltCard`: tilt 3D ±6° no mouse (só desktop), glare cyan opcional.
- `Counter`: número que conta na viewport (pt-BR).
- `MeshBg`: mesh gradient shader (paper-shaders), herói do mobile + fallback do vídeo.
- `HeroVideo`: slot do vídeo hero (guard de conexão/reduced-motion + poster).
- `WaCta`: botão WhatsApp por intenção (variantes primary/whatsapp/ghost).

## 5. Layout
Container `max-w-6xl` (default) / `max-w-7xl` (wide). Seções com `py-20 sm:py-28`.
Grids de demo: 2 colunas no desktop (copy + demo), empilha no mobile, alternando
o lado a cada demo. Bento de 3 cards no grid de "3 jeitos".

## 6. Profundidade e elevação
Glass (`glass` utility: blur + borda sutil) para cartões e header. Sombras suaves
e halos cyan (glow) em elementos de destaque (phone, chat, CTA). Profundidade
real só via CSS 3D (tilt/perspective) — sem Three.js.

## 7. Do's & Don'ts
- DO: acentuação PT-BR impecável em todo texto visível; tom de sócio operador;
  vender o ganho; CTA WhatsApp pré-preenchido por intenção; mobile-first.
- DON'T: Inter, ícone Lucide cru sem estilo, stock photo, lorem ipsum, travessão,
  emoji em copy de venda, número/preço inventado, autoplay de vídeo sem poster,
  parallax agressivo, Three.js.

## 8. Responsivo
Mobile-first. Header vira logo + "Falar agora" + hamburger. Grids 2-col -> 1-col.
Tilt e cursor desligados no touch. `prefers-reduced-motion` desliga Lenis,
shader-motion, partículas e troca vídeo por poster.

## 9. Guia de prompt (para gerar UI/assets nesta marca)
```
Brand: Vertech, agência brasileira de IA aplicada pra PMEs.
Design system: bg #0F172A navy, surface #1E293B, foreground #F8FAFC,
accent #22D3EE cyan, accent-dark #0891B2. Mesh gradient navy->cyan.
Fonts: Space Grotesk (display), Montserrat (body), JetBrains Mono (mono). Nunca Inter.
Mood: dark premium, alto contraste, cyan neon como acento, glass sutil,
bento grid, motion como linguagem.
Constraints: no Inter, no Lucide cru, no stock photo, no lorem ipsum,
no autoplay sem poster, no parallax agressivo, no Three.js. Lighthouse mobile >= 85.
```

### Prompt do vídeo hero IA (Higgsfield/Kling, quando houver crédito)
Imagem-base (Soul/Flux), depois Kling start=end frame, 5s, "seamless loop":
> Abstract background, millions of glowing cyan particles flowing in slow streams
> through deep dark space, near-black navy #0B1220, electric cyan #22D3EE
> highlights, camera locked, cinematic, premium tech aesthetic, seamless loop.
> No text, no faces, no logos.
