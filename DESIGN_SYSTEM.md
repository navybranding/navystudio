# Design System — Referência getmitra.com

## Paleta de Cores

```css
:root {
  /* Backgrounds */
  --color-bg:          #19181a;          /* rgb(25, 24, 26)  — fundo principal */
  --color-bg-50:       rgba(25,24,26,.5); /* fundo overlay */
  --color-surface:     #242425;          /* rgb(36, 36, 37)  — cards/superfícies */

  /* Texto / Accent */
  --color-primary:     #ffeadf;          /* rgb(255, 234, 223) — creme quente */
  --color-primary-50:  rgba(255,234,223,.5); /* texto secundário */
  --color-accent:      #efd6bd;          /* rgb(239, 214, 189) — bege dourado */

  /* Neutros */
  --color-white:       #ffffff;
  --color-white-60:    rgba(255,255,255,.6);

  /* Borda */
  --color-border:      rgb(36, 36, 37);  /* borda sutil dark */
}
```

### Resumo Visual

| Token         | Hex       | Uso                        |
|---------------|-----------|----------------------------|
| bg            | `#19181a` | Fundo geral                |
| surface       | `#242425` | Cards, containers          |
| primary       | `#ffeadf` | Títulos, textos principais |
| primary-50    | `#ffeadf80` | Subtítulos, labels       |
| accent        | `#efd6bd` | Destaques, glows           |
| border        | `#242425` | Bordas 1px                 |

---

## Tipografia

```css
/* Fontes */
@font-face {
  font-family: "PP Neue Montreal Regular"; font-weight: 400;
  src: url("https://framerusercontent.com/assets/3gm4DsZ7u2KhLZZCBZesuW1ClMw.woff2");
}
@font-face {
  font-family: "PP Neue Montreal Book"; font-weight: 400;
  src: url("https://framerusercontent.com/assets/UsDrfBEaiSxOifoO1d64f8CcrXQ.woff2");
}
@font-face {
  font-family: "PP Neue Montreal Medium"; font-weight: 500;
  src: url("https://framerusercontent.com/assets/pHqdIssKCkNqLTgOZyE3GS4X8I.woff2");
}
@font-face {
  font-family: "PP Neue Montreal Bold"; font-weight: 700;
  src: url("https://framerusercontent.com/assets/eiALb3Ac2OPorMgJIBVNZMBzpg.woff2");
}

/* Stack */
--font-display: "PP Neue Montreal Bold", sans-serif;     /* h1, h2 grandes */
--font-body:    "PP Neue Montreal Regular", sans-serif;  /* corpo de texto */
--font-ui:      "Inter", sans-serif;                     /* labels, UI pequeno */
```

**Hierarquia:**
- H1 hero: PP Neue Montreal Bold, ~72–96px, line-height apertado (~1.0–1.1)
- H2 seções: PP Neue Montreal Medium, ~40–56px
- Body: PP Neue Montreal Regular / Book, ~16–18px, line-height ~1.5–1.6
- Labels/tags: Inter 400–600, ~12–14px, letter-spacing levemente espaçado

---

## Gradientes

```css
/* Hero accent (roxo → rose → coral) */
--gradient-hero: linear-gradient(296deg, #5f4f6d 0%, #a7808b 74%, #d17e74 113%);

/* Glow radial (bege dourado) — base de seções */
--gradient-glow: radial-gradient(50% 50% at 50% 100%, rgba(239,214,189,.3) 0%, transparent 100%);

/* Background sutil de cards */
--gradient-card: linear-gradient(303deg, #22211f 0%, #201f1d 100%);

/* Fade mask (ocultar bordas de scrollers) */
--gradient-mask-v:  linear-gradient(#000 0%, transparent 20%, transparent 80%, #000 100%);
--gradient-mask-h:  linear-gradient(90deg, transparent 0%, #000 5%, rgba(0,0,0,.91) 95%, transparent 100%);

/* Fade bottom (cards/imagens) */
--gradient-fade-bottom: linear-gradient(transparent 27%, #000 77%);

/* Overlay escuro para seções */
--gradient-overlay: linear-gradient(rgba(25,24,26,.6) 31%, rgba(25,24,24,.6) 54%, rgba(0,0,0,.6) 100%);
```

---

## Animações

```css
/* Entrada de elementos (scroll-triggered) */
/* Estado inicial */
.anim-enter {
  opacity: 0.001;
  transform: translateY(20px);
}
/* Estado final (animado via JS/Framer Motion) */
.anim-enter-active {
  opacity: 1;
  transform: translateY(0px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

/* Smooth scroll — usa Lenis */
/* npm install lenis */
/* import Lenis from 'lenis' */

/* will-change em elementos animados */
.animated {
  will-change: transform;
}

/* Rotações de elementos decorativos */
.rotate-240 { transform: rotate(240deg); }
.rotate-neg120 { transform: rotate(-120deg); }
```

**Padrões de animação:**
- Entrada: `opacity 0 → 1` + `translateY(20px) → 0`, ~0.6s ease
- Smooth scroll: Lenis v1.3.8 para scroll fluido
- Sem bounce, sem spring exagerado — movimento sutil e elegante

---

## Border Radius

```css
--radius-pill:   999px;   /* botões, tags arredondadas */
--radius-xl:     58px;    /* cards hero grandes */
--radius-lg:     32–33px; /* cards médios */
--radius-md:     22–28px; /* cards padrão */
--radius-sm:     9–10px;  /* elementos UI pequenos */
--radius-circle: 100%;    /* avatares, ícones circulares */
```

---

## Sombras

```css
/* Sombra profunda (cards flutuantes) */
--shadow-deep: 0 29.6px 68.9px 24px rgba(0,0,0,.42);

/* Sombra sutil com tint roxo/azul */
--shadow-soft: 
  0 1.16px 6.96px rgba(175,189,255,.06),
  0 0.58px 1.16px rgba(140,155,236,.05);
```

---

## Spacing / Layout

```css
/* Seções */
--section-padding-lg: 120px 40px 64px;
--section-padding-md: 64px 40px;
--section-padding-hero: 140px;

/* Container */
--container-padding: 16px 40px;  /* desktop */
--container-padding-sm: 16px 24px; /* tablet */
--container-padding-xs: 0 20px;    /* mobile */

/* Gaps internos */
--gap-lg: 18.5px;
--gap-md: 13.9px;
--gap-sm: 5.5px;
--gap-xs: 2.3px;
```

---

## Breakpoints

```css
/* Desktop */  @media (min-width: 1200px)
/* Tablet */   @media (min-width: 810px) and (max-width: 1199.98px)
/* Mobile */   @media (max-width: 809.98px)
```

---

## Componentes Base

### Botão CTA
```css
.btn-primary {
  background: var(--color-primary);  /* #ffeadf */
  color: var(--color-bg);            /* #19181a */
  border-radius: var(--radius-pill); /* 999px */
  padding: 16px 40px;
  font-family: "PP Neue Montreal Medium";
  font-weight: 500;
  transition: opacity 0.2s ease;
}
.btn-primary:hover { opacity: 0.85; }
```

### Card
```css
.card {
  background: var(--color-surface);  /* #242425 */
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);   /* 22–28px */
  box-shadow: var(--shadow-deep);
}
```

### Tag / Label
```css
.tag {
  background: rgba(255,234,223,.08);
  color: var(--color-primary);
  border: 1px solid rgba(255,234,223,.15);
  border-radius: var(--radius-pill);
  padding: 6px 12px;
  font-family: "Inter";
  font-size: 12px;
}
```

---

## Estética Geral

- **Dark mode nativo** — fundo quase preto `#19181a`
- **Paleta quente** sobre escuro: cremes, beiges, rosados — sofisticado e acolhedor
- **Minimalista e espaçoso** — muito espaço negativo, hierarquia clara
- **Glassmorphism leve** — bordas sutis 1px, opacidades em camadas
- **Movimento discreto** — entradas suaves translateY, sem excessos
- **Tipografia editorial** — PP Neue Montreal dá caráter premium
