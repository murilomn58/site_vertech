# Vertech Labs — Immersive Website Redesign

**Date**: 2026-03-12
**Status**: Approved
**Domain**: www.vertechlabs.tech

## Overview

Complete rebuild of the Vertech Solutions corporate website from Express.js + EJS to a Next.js 14 immersive single-page experience with 3D visuals, scroll animations, and bilingual support. Deployed on Railway with custom domain.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router, TypeScript) |
| Styling | Tailwind CSS v3 (stable with Next.js 14) |
| 3D | React Three Fiber + @react-three/drei |
| Animations | Framer Motion |
| i18n | next-intl (PT default, EN toggle) |
| Fonts | Space Grotesk + Montserrat (self-hosted) |
| Deployment | Railway (Node.js runtime) |
| Domain | www.vertechlabs.tech (Gandi DNS) |

## Architecture

```
site_vertech/
├── src/
│   ├── app/
│   │   ├── [locale]/
│   │   │   ├── layout.tsx        # Locale-specific layout
│   │   │   └── page.tsx          # Single-page with all sections
│   │   └── layout.tsx            # Root layout (fonts, metadata)
│   ├── components/
│   │   ├── 3d/
│   │   │   └── HeroMesh.tsx      # Abstract geometric mesh scene
│   │   ├── sections/
│   │   │   ├── Hero.tsx
│   │   │   ├── Services.tsx
│   │   │   ├── Portfolio.tsx
│   │   │   ├── Transformation.tsx
│   │   │   ├── Team.tsx
│   │   │   ├── FAQ.tsx
│   │   │   └── FinalCTA.tsx
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── BentoCard.tsx
│   │   │   ├── FounderCard.tsx
│   │   │   ├── ServiceCard.tsx
│   │   │   ├── Accordion.tsx
│   │   │   ├── Counter.tsx
│   │   │   └── FilterTabs.tsx
│   │   └── layout/
│   │       ├── Navbar.tsx
│   │       ├── Footer.tsx
│   │       └── WhatsAppButton.tsx
│   ├── lib/
│   │   ├── constants.ts          # Colors, links, metadata
│   │   └── utils.ts              # Helpers
│   └── messages/
│       ├── pt.json               # Portuguese translations
│       └── en.json               # English translations
├── public/
│   ├── images/                   # Optimized assets from current site
│   └── fonts/                    # Space Grotesk, Montserrat woff2
├── tailwind.config.ts
├── next.config.ts                # i18n config, image domains
└── package.json
```

## Page Sections (Scroll Flow)

The page is a single scroll experience with a dark-to-light-to-dark gradient transition.

### 1. Navbar (fixed)
- Glassmorphism: transparent on top, `backdrop-blur` on scroll
- Logo left, nav links center (Serviços, Portfólio, Equipe, FAQ)
- Right: EN/PT language toggle + WhatsApp CTA button
- Mobile: hamburger → slide-in menu

### 2. Hero (dark, full viewport — #0A0F1C)
- **Background**: React Three Fiber abstract geometric mesh — morphing polyhedra with cyan (#22D3EE) glow, mouse-reactive parallax
- **Content**: "Transforme sua PME em um Negócio Inteligente e Competitivo" headline, subtitle, CTA button
- **Bottom**: Animated scroll indicator chevron
- **Fallback**: CSS gradient for low-end devices (lazy-load Three.js)
- **Mobile**: Replace mouse parallax with slow auto-rotate animation on touch devices

### 3. Services (dark→medium transition)
- Heading: "Menos Manual, Mais Digital" with fade-up
- 2x2 grid of service cards:
  1. Apps e Plataformas
  2. IA e Agentes de IA
  3. Automação de Processos
  4. Sites Profissionais
- Cards: glassmorphism + cyan border-glow on hover
- Staggered scroll reveal (Framer Motion)

### 4. Portfolio (medium tone)
- Heading: "Portfólio que vira resultado" + animated trust badges (counter animation)
- Filter tabs: All | IA & Agents | Automação | Apps | Sites | Dashboards
- **Bento grid layout**: 2 large featured cards + 4 smaller cards
- Hover: scale 1.02 + metrics overlay reveal (e.g., "-60% tempo", "+35% conversão")
- Opacity fade on filter change (simple transition, not animated layout reflow)
- Trust badge counters: "6+ Projetos", "2 Fundadores", "100% Foco no Cliente" — count up on scroll
- Projects:
  1. WhatsApp IA Agent (Verah) — 60% time reduction, 35% conversion increase
  2. Document Portal with RAG — 70% search time reduction
  3. Financial RPA — 80% repetitive task elimination
  4. Operations Dashboard — 25% improved predictability
  5. Clinic Management App — 30% fewer no-shows
  6. High-Performance Website — 40% lead increase

### 5. Transformation (lighter)
- Heading: "Como Transformamos seu Negócio"
- Before/after animated comparison table:
  - Challenges slide in from left, solutions from right
  - Manual processes → Intelligent automation
  - Disorganized data → AI-powered dashboards
  - Weak digital presence → Digital ecosystem
- Visual divider: flowing gradient line

### 6. Team (light section — #F8FAFC)
- Heading: "Liderança e Execução"
- Two **Co-Fundador** cards side by side:
  - **Murilo Miguel Narciso**: Civil Engineer (IME), Hackathon Winner, VALE 1st Place, CNPq R&D, LinkedIn
  - **Jean Kairo Crispim**: Telecom Engineer (IME), Hackathon Winner, West Point Cybersecurity, CCNA, LinkedIn
- Cards: photo (400x400px square, face-centered) with subtle parallax, credentials list, LinkedIn button, hover lift + shadow
- Photos: existing assets at `public/images/fotolinkedinmurilo.jfif` and `public/images/fotolinkedjean.jfif` (optimize to WebP)
- Below: 6 values/differentials as icon strip (Efficiency, Security, Discipline, Innovation, Simplicity, Customer Focus)

### 7. FAQ (light)
- 4-item accordion with Framer Motion expand/collapse
- Rotate chevron indicator
- FAQ content (canonical — sourced from current Express site):
  1. "Quais tipos de empresa vocês atendem?" — PMEs de todos os setores
  2. "Como funcionam os prazos de entrega?" — Entregas em semanas, não meses
  3. "Preciso ter conhecimento técnico?" — Não, cuidamos de tudo
  4. "Vocês oferecem suporte pós-entrega?" — Sim, suporte contínuo incluso

### 8. Final CTA (dark again — #0A0F1C)
- "Pronto para escalar seu negócio?" with gradient text
- Large WhatsApp CTA button with pulse animation
- Background: subtle gradient mesh

### 9. Footer (dark)
- Logo, email (vertech2026@gmail.com), phone (+55 49 99955-1051)
- Nav links: Home, Serviços, Contato
- Copyright: © 2026 Vertech Soluções

### Floating Element
- WhatsApp button: fixed bottom-right, green (#25D366), pulse ring animation

## Visual Identity

### Color Palette
| Token | Value | Usage |
|-------|-------|-------|
| bg-dark | #0A0F1C | Hero, CTA, Footer |
| bg-mid | #111827 | Transition sections |
| bg-light | #F8FAFC | Team, FAQ |
| cyan | #22D3EE | Primary accent, glows |
| cyan-bright | #67E8F9 | Hover states |
| navy | #0F172A | Card backgrounds |
| white | #F1F5F9 | Text on dark |
| whatsapp | #25D366 | WhatsApp elements |

### Typography
- **Headings**: Space Grotesk (Bold/SemiBold)
- **Body**: Montserrat (Regular/Medium)
- Scale: 5xl hero → 3xl section titles → lg body

### Interactions
- Hero mesh: continuous morph + mouse parallax
- Scroll reveals: fade-up with stagger on every section
- Navbar: backdrop-blur transition on scroll
- Service cards: glassmorphism + cyan glow hover
- Bento cards: scale 1.02 + metrics overlay hover
- Founder cards: lift + shadow + photo parallax hover
- FAQ: animated height + rotating chevron
- WhatsApp: pulse ring keyframes
- CTA buttons: gradient shimmer sweep hover
- Counter: animated count-up on scroll into view
- Locale switch: smooth page fade transition

## Performance

- **Lighthouse targets**: 90+ Performance, 100 Accessibility
- **Three.js**: Lazy loaded via `dynamic()`, CSS gradient fallback
- **Images**: Next.js `<Image>` with WebP/AVIF, priority on hero logo
- **Fonts**: Self-hosted woff2, `font-display: swap`, preloaded
- **Bundle**: Tree-shaken; Three.js loaded via `dynamic()`, section components are standard imports (Next.js App Router handles route-level code splitting automatically)

## Error & Loading States

- **3D canvas**: React error boundary wrapping `HeroMesh`; on crash, falls back to CSS gradient silently
- **Dynamic imports**: `<Suspense>` boundary around Three.js with gradient placeholder
- **Fonts**: `font-display: swap` prevents FOIT; layout uses system font stack until loaded
- **Images**: Next.js `<Image>` blur placeholder for all images
- **i18n fallback**: If locale file fails, next-intl falls back to PT (default locale)

## Deployment & Domain

- **Railway**: Same project (site_vertech), rebuild with Next.js start command
- **DNS fix**: Add CNAME record `www` → Railway provided value at Gandi
- **Redirects**: Next.js middleware checks `host` header; redirects only when host equals the Railway internal domain (`sitevertech-production.up.railway.app`), not the canonical `www.vertechlabs.tech` (avoids redirect loops)
- **SSL**: Auto via Railway

## i18n Content Scope

All user-facing static text across all sections is bilingual (PT + EN). Translation files (`messages/pt.json`, `messages/en.json`) contain every string: navbar labels, section headings, service descriptions, portfolio project titles/descriptions/metrics, transformation table rows, founder bios/credentials, FAQ Q&As, CTA text, and footer content. The canonical source for Portuguese content is the current Express site's `locales/pt.json` and `views/index.ejs`. English translations are sourced from `locales/en.json`. Phone number and email are locale-invariant.

## Decisions Made

1. **Next.js over Express+EJS** — Modern React ecosystem for immersive animations
2. **Remove Verah chatbot** — Focus CTAs on WhatsApp only
3. **PT + EN only** — Drop French, PT default with EN toggle
4. **Abstract geometric mesh** — Distinctive morphing polyhedra over common particles
5. **Bento grid portfolio** — Premium mixed-size layout over standard grid
6. **Co-Fundadores** — Both founders as equals, no CEO/CTO titles
7. **Enhanced founder cards** — Hover effects + parallax, not expandable spotlight
8. **Dark-to-light-to-dark flow** — Immersive hero bookended with dark CTA/footer
