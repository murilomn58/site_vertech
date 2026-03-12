# Vertech Immersive Website Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the Vertech corporate website from Express+EJS to an immersive Next.js 14 single-page experience with 3D hero, scroll animations, and bilingual support.

**Architecture:** Next.js 14 App Router with `[locale]` dynamic segment for i18n (PT/EN). React Three Fiber for 3D hero mesh, Framer Motion for all scroll/hover animations. Single-page scroll with 9 sections flowing dark→light→dark. Deployed on Railway with custom domain redirect middleware.

**Tech Stack:** Next.js 14, TypeScript, Tailwind CSS v3, React Three Fiber, @react-three/drei, Framer Motion, next-intl

**Spec:** `docs/superpowers/specs/2026-03-12-vertech-immersive-website-design.md`

**Existing assets to preserve:**
- `locales/pt.json` → `src/messages/pt.json` (restructure for next-intl)
- `locales/en.json` → `src/messages/en.json` (restructure for next-intl)
- `public/images/` → copy all images
- `public/flags/` → not needed (new language toggle is text-based)

---

## Chunk 1: Project Foundation

### Task 1: Initialize Next.js project

**Files:**
- Create: `package.json` (overwrite existing)
- Create: `tsconfig.json`
- Create: `next.config.ts`
- Create: `.gitignore` (update)

- [ ] **Step 1: Back up the existing Express project**

```bash
cd /c/VERTECH_CONSULTORIA/site_vertech
git checkout -b nextjs-rebuild
mkdir _legacy
cp server.js _legacy/
cp -r views _legacy/
cp -r locales _legacy/
```

- [ ] **Step 2: Initialize Next.js 14 with TypeScript and Tailwind**

```bash
cd /c/VERTECH_CONSULTORIA/site_vertech
npx create-next-app@14.2.29 . --typescript --tailwind --eslint --app --src-dir --no-import-alias --use-npm
```

When prompted about overwriting existing files, accept. This creates the Next.js scaffolding.

- [ ] **Step 3: Install additional dependencies**

```bash
npm install three @react-three/fiber @react-three/drei framer-motion next-intl lucide-react
npm install -D @types/three
```

- [ ] **Step 4: Verify dev server starts**

```bash
npm run dev
```

Expected: Server starts at `http://localhost:3000`, shows default Next.js page.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: initialize Next.js 14 with Three.js, Framer Motion, next-intl"
```

---

### Task 2: Configure Tailwind with custom theme

**Files:**
- Modify: `tailwind.config.ts`

- [ ] **Step 1: Update Tailwind config with Vertech color palette and fonts**

```typescript
// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "bg-dark": "#0A0F1C",
        "bg-mid": "#111827",
        "bg-light": "#F8FAFC",
        cyan: "#22D3EE",
        "cyan-bright": "#67E8F9",
        navy: "#0F172A",
        "off-white": "#F1F5F9",
        whatsapp: "#25D366",
      },
      fontFamily: {
        heading: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
        body: ["var(--font-montserrat)", "system-ui", "sans-serif"],
      },
      animation: {
        "pulse-ring": "pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "shimmer": "shimmer 2s linear infinite",
      },
      keyframes: {
        "pulse-ring": {
          "0%": { transform: "scale(0.8)", opacity: "1" },
          "100%": { transform: "scale(2)", opacity: "0" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
```

- [ ] **Step 2: Commit**

```bash
git add tailwind.config.ts
git commit -m "feat: configure Tailwind theme with Vertech palette and animations"
```

---

### Task 3: Set up fonts and global styles

**Files:**
- Modify: `src/app/layout.tsx`
- Modify: `src/app/globals.css`

- [ ] **Step 1: Set up fonts via next/font/google**

`next/font/google` auto-self-hosts fonts in production (no external requests, no manual woff2 downloads needed):

```typescript
// In layout.tsx
import { Space_Grotesk, Montserrat } from "next/font/google";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});
```

No manual woff2 downloads needed — `next/font/google` handles self-hosting automatically at build time.

- [ ] **Step 2: Set up globals.css**

```css
/* src/app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    scroll-behavior: smooth;
  }
  body {
    @apply font-body text-off-white bg-bg-dark antialiased;
  }
  h1, h2, h3, h4, h5, h6 {
    @apply font-heading;
  }
}

@layer components {
  .glass {
    @apply bg-white/5 backdrop-blur-md border border-white/10;
  }
  .gradient-text {
    @apply bg-gradient-to-r from-cyan to-cyan-bright bg-clip-text text-transparent;
  }
}
```

- [ ] **Step 3: Set up root layout.tsx (without i18n for now — that comes in Task 4)**

```typescript
// src/app/layout.tsx
import type { Metadata } from "next";
import { Space_Grotesk, Montserrat } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vertech Soluções | IA, Automação e Apps para PMEs",
  description: "Transforme sua PME com IA aplicada, automação e aplicativos sob medida.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <body className={`${spaceGrotesk.variable} ${montserrat.variable}`}>
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 4: Verify fonts render**

```bash
npm run dev
```

Open `http://localhost:3000`. Check DevTools → Elements → Computed → font-family shows Space Grotesk / Montserrat loading.

- [ ] **Step 5: Commit**

```bash
git add src/app/layout.tsx src/app/globals.css
git commit -m "feat: set up fonts (Space Grotesk + Montserrat) and global styles"
```

---

### Task 4: Set up next-intl for i18n

**Files:**
- Create: `src/messages/pt.json`
- Create: `src/messages/en.json`
- Create: `src/i18n/request.ts`
- Create: `src/i18n/routing.ts`
- Modify: `next.config.ts`
- Create: `src/app/[locale]/layout.tsx`
- Create: `src/app/[locale]/page.tsx` (placeholder)
- Modify: `src/app/layout.tsx`
- Create: `src/middleware.ts`

- [ ] **Step 1: Create message files from existing locales**

Copy the existing locale files and adapt the structure for next-intl. The existing `locales/pt.json` and `locales/en.json` already have the complete structure. Copy them:

```bash
mkdir -p src/messages
cp _legacy/locales/pt.json src/messages/pt.json
cp _legacy/locales/en.json src/messages/en.json
```

Remove the `chat` key from both files (we're dropping the Verah chatbot). Remove the `contact` key too (no separate contact page in the new site). Update `team.members[].role` to remove any CEO/CTO references — both should be "Co-Fundador" (PT) / "Co-Founder" (EN). Update copyright year to 2026 in `footer.copyright` for both files.

Add these missing keys to `nav` in both JSON files:
- `"portfolio": "Portfólio"` (PT) / `"Portfolio"` (EN)
- `"team": "Equipe"` (PT) / `"Team"` (EN)
- `"faq": "FAQ"` (both)

Verify `team.members[]` has all fields expected by FounderCard: `name`, `role`, `education`, `educationFull`, `achievements[]`, `photo`, `linkedin`, `linkedinText`. The existing JSON already has these — confirm they're intact after edits.

- [ ] **Step 2: Create i18n routing config**

```typescript
// src/i18n/routing.ts
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["pt", "en"],
  defaultLocale: "pt",
});
```

- [ ] **Step 3: Create i18n request config**

```typescript
// src/i18n/request.ts
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
```

- [ ] **Step 4: Create middleware for locale routing + Railway redirect**

```typescript
// src/middleware.ts
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest, NextResponse } from "next/server";

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const host = request.headers.get("host") || "";

  // Redirect Railway internal domain to canonical domain
  if (host === "sitevertech-production.up.railway.app") {
    const url = request.nextUrl.clone();
    url.host = "www.vertechlabs.tech";
    url.protocol = "https";
    url.port = "";
    return NextResponse.redirect(url, 301);
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|_next|images|fonts|favicon.ico).*)"],
};
```

- [ ] **Step 5: Update next.config.ts**

```typescript
// next.config.ts
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default withNextIntl(nextConfig);
```

- [ ] **Step 6: Create locale layout**

```typescript
// src/app/[locale]/layout.tsx
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

type Props = {
  children: React.ReactNode;
  params: { locale: string };
};

export async function generateMetadata({ params }: Omit<Props, "children">) {
  const t = await getTranslations({ locale: params.locale, namespace: "meta" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
```

- [ ] **Step 7: Update root layout to remove metadata (now handled by locale layout)**

Update `src/app/layout.tsx` — remove the metadata export (locale layout handles it), keep fonts and globals only. Set `lang` dynamically or remove it (locale layout can handle it).

- [ ] **Step 8: Create placeholder page**

```typescript
// src/app/[locale]/page.tsx
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("hero");
  return (
    <main>
      <h1>{t("title")} {t("titleHighlight")} {t("titleEnd")}</h1>
      <p>{t("description")}</p>
    </main>
  );
}
```

- [ ] **Step 9: Verify i18n works**

```bash
npm run dev
```

- Visit `http://localhost:3000` → shows Portuguese content
- Visit `http://localhost:3000/en` → shows English content

- [ ] **Step 10: Commit**

```bash
git add src/messages/ src/i18n/ src/middleware.ts src/app/ next.config.ts
git commit -m "feat: set up next-intl with PT/EN locales and Railway redirect middleware"
```

---

## Chunk 2: Layout & Shared Components

### Task 5: Create constants and utilities

**Files:**
- Create: `src/lib/constants.ts`
- Create: `src/lib/utils.ts`

- [ ] **Step 1: Create constants file**

```typescript
// src/lib/constants.ts
export const WHATSAPP_NUMBER = "5549999551051";
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;
export const EMAIL = "vertech2026@gmail.com";
export const PHONE = "+55 (49) 99955-1051";

export const LINKEDIN = {
  murilo: "https://www.linkedin.com/in/murilonarciso/",
  jean: "https://www.linkedin.com/in/jean-kairo-crispim-a11312284/",
} as const;

export const NAV_SECTIONS = ["services", "portfolio", "team", "faq"] as const;
```

- [ ] **Step 2: Create utils file**

```typescript
// src/lib/utils.ts
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}
```

- [ ] **Step 3: Commit**

```bash
git add src/lib/
git commit -m "feat: add constants (WhatsApp, LinkedIn, nav) and utility helpers"
```

---

### Task 6: Create Navbar component

**Files:**
- Create: `src/components/layout/Navbar.tsx`

- [ ] **Step 1: Create the Navbar**

Fixed navbar with glassmorphism. Logo left, nav links center (scroll to section IDs), language toggle + WhatsApp CTA right. Mobile hamburger with slide-in overlay.

Key behaviors:
- `useEffect` with scroll listener: when `scrollY > 50`, add `backdrop-blur-md bg-bg-dark/80` class
- Nav links use `<a href="#services">` etc. for smooth scroll
- Language toggle uses `next-intl`'s `useRouter` and `usePathname` to switch locale
- Mobile menu: Framer Motion `AnimatePresence` for slide-in from right
- WhatsApp CTA links to `WHATSAPP_URL`

Must be a client component (`"use client"`).

```typescript
// src/components/layout/Navbar.tsx
"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useRouter, usePathname } from "next-intl/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { WHATSAPP_URL, NAV_SECTIONS } from "@/lib/constants";

export default function Navbar() {
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const switchLocale = (locale: string) => {
    router.replace(pathname, { locale });
  };

  // All nav labels from translations — add "nav.portfolio" and "nav.faq" keys to pt.json/en.json
  const navLabels: Record<string, string> = {
    services: t("nav.services"),
    portfolio: t("nav.portfolio"),
    team: t("nav.team"),
    faq: t("nav.faq"),
  };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "bg-bg-dark/80 backdrop-blur-md border-b border-white/10" : "bg-transparent"
      )}
    >
      {/* ... full implementation with logo, links, toggle, mobile menu */}
    </nav>
  );
}
```

- [ ] **Step 2: Verify navbar renders and scroll effect works**

Import Navbar into `[locale]/page.tsx` temporarily. Check:
- Transparent on load, glass on scroll
- Nav links visible on desktop, hamburger on mobile
- Language toggle switches between PT/EN

- [ ] **Step 3: Commit**

```bash
git add src/components/layout/Navbar.tsx
git commit -m "feat: create Navbar with glassmorphism, mobile menu, and locale toggle"
```

---

### Task 7: Create Footer component

**Files:**
- Create: `src/components/layout/Footer.tsx`

- [ ] **Step 1: Create the Footer**

Dark footer with logo, tagline, email, phone, nav links, copyright. Simple grid layout.

```typescript
// src/components/layout/Footer.tsx
"use client";

import { useTranslations } from "next-intl";
import { EMAIL, PHONE } from "@/lib/constants";

export default function Footer() {
  const t = useTranslations("footer");
  // Render: logo + tagline left, links center, contact right
  // Copyright bar at bottom
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/layout/Footer.tsx
git commit -m "feat: create Footer with contact info and nav links"
```

---

### Task 8: Create WhatsApp floating button

**Files:**
- Create: `src/components/layout/WhatsAppButton.tsx`

- [ ] **Step 1: Create the floating WhatsApp button**

Fixed bottom-right, green circle with WhatsApp icon (SVG inline), pulse-ring animation. Links to `WHATSAPP_URL` with default message from translations.

```typescript
// src/components/layout/WhatsAppButton.tsx
"use client";

import { useTranslations } from "next-intl";
import { WHATSAPP_NUMBER } from "@/lib/constants";

export default function WhatsAppButton() {
  const t = useTranslations("whatsapp");
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(t("message"))}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t("ariaLabel")}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-whatsapp rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
    >
      <div className="absolute inset-0 rounded-full bg-whatsapp animate-pulse-ring" />
      {/* WhatsApp SVG icon */}
    </a>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/layout/WhatsAppButton.tsx
git commit -m "feat: create floating WhatsApp button with pulse animation"
```

---

## Chunk 3: UI Components

### Task 9: Create Button component

**Files:**
- Create: `src/components/ui/Button.tsx`

- [ ] **Step 1: Create Button with variants**

Two variants: `primary` (cyan gradient with shimmer hover) and `secondary` (outline). Accepts `href` for link buttons.

```typescript
// src/components/ui/Button.tsx
"use client";

import { cn } from "@/lib/utils";

type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  href?: string;
  className?: string;
  onClick?: () => void;
};

export default function Button({ children, variant = "primary", href, className, onClick }: ButtonProps) {
  const base = "inline-flex items-center justify-center px-6 py-3 rounded-lg font-heading font-semibold text-sm transition-all duration-300";
  const variants = {
    primary: "bg-cyan text-bg-dark hover:bg-cyan-bright shadow-lg shadow-cyan/25 hover:shadow-cyan/40",
    secondary: "border border-cyan text-cyan hover:bg-cyan/10",
  };

  const cls = cn(base, variants[variant], className);

  if (href) {
    return <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className={cls}>{children}</a>;
  }
  return <button onClick={onClick} className={cls}>{children}</button>;
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ui/Button.tsx
git commit -m "feat: create Button component with primary/secondary variants"
```

---

### Task 10: Create ServiceCard component

**Files:**
- Create: `src/components/ui/ServiceCard.tsx`

- [ ] **Step 1: Create glassmorphism service card**

Card with icon (Lucide React or inline SVG — replace FontAwesome), title, description. Glass background, cyan border-glow on hover.

```typescript
// src/components/ui/ServiceCard.tsx
"use client";

import { motion } from "framer-motion";

type ServiceCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
};

export default function ServiceCard({ icon, title, description, index }: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="glass rounded-2xl p-6 hover:border-cyan/50 hover:shadow-[0_0_30px_rgba(34,211,238,0.15)] transition-all duration-300"
    >
      <div className="w-12 h-12 rounded-xl bg-cyan/10 flex items-center justify-center text-cyan mb-4">
        {icon}
      </div>
      <h3 className="font-heading font-semibold text-xl text-white mb-2">{title}</h3>
      <p className="text-off-white/70 text-sm leading-relaxed">{description}</p>
    </motion.div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ui/ServiceCard.tsx
git commit -m "feat: create ServiceCard with glassmorphism and scroll reveal"
```

---

### Task 11: Create BentoCard component

**Files:**
- Create: `src/components/ui/BentoCard.tsx`

- [ ] **Step 1: Create bento portfolio card**

Accepts `size: "large" | "small"`. Shows category label, title, pain/solution summary. On hover: scale 1.02 + overlay revealing metric badges. The large variant spans 2 columns.

```typescript
// src/components/ui/BentoCard.tsx
"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type BentoCardProps = {
  size: "large" | "small";
  category: string;
  title: string;
  pain: string;
  solution: string;
  metrics: string[];
  tags: string[];
};

export default function BentoCard({ size, category, title, pain, solution, metrics, tags }: BentoCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={cn(
        "group relative glass rounded-2xl p-6 overflow-hidden cursor-pointer transition-all duration-300",
        size === "large" ? "md:col-span-2 md:row-span-2" : ""
      )}
    >
      <span className="text-xs font-heading text-cyan uppercase tracking-wider">{category}</span>
      <h3 className={cn("font-heading font-bold text-white mt-2", size === "large" ? "text-2xl" : "text-lg")}>{title}</h3>
      <p className="text-off-white/60 text-sm mt-2">{solution}</p>

      {/* Hover overlay with metrics */}
      <div className="absolute inset-0 bg-bg-dark/90 flex flex-col items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6">
        <div className="flex flex-wrap gap-2 justify-center">
          {metrics.map((m, i) => (
            <span key={i} className="px-3 py-1 rounded-full bg-cyan/20 text-cyan text-sm font-heading font-semibold">{m}</span>
          ))}
        </div>
        <div className="flex flex-wrap gap-1 justify-center mt-2">
          {tags.map((tag, i) => (
            <span key={i} className="text-xs text-off-white/50">{tag}</span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ui/BentoCard.tsx
git commit -m "feat: create BentoCard with hover metrics overlay"
```

---

### Task 12: Create FounderCard component

**Files:**
- Create: `src/components/ui/FounderCard.tsx`

- [ ] **Step 1: Create enhanced founder card**

Photo (Next.js Image, 400x400), name, "Co-Fundador" role, education, achievements list, LinkedIn button. Hover: lift + shadow + subtle photo parallax via `useMotionValue`.

```typescript
// src/components/ui/FounderCard.tsx
"use client";

import Image from "next/image";
import { motion, useMotionValue, useTransform } from "framer-motion";

type FounderCardProps = {
  name: string;
  role: string;
  education: string;
  educationFull: string;
  achievements: string[];
  photo: string;
  linkedin: string;
  linkedinText: string;
};

export default function FounderCard(props: FounderCardProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [5, -5]);
  const rotateY = useTransform(x, [-100, 100], [-5, 5]);

  const handleMouse = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-shadow duration-300"
    >
      <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
        <Image src={`/images/${props.photo}`} alt={props.name} width={400} height={400} className="object-cover" placeholder="blur" blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8+P5ZPQAI8wNPk43jYgAAAABJRU5ErkJggg==" />
      </div>
      <h3 className="font-heading font-bold text-xl text-navy text-center">{props.name}</h3>
      <p className="text-cyan text-center font-heading font-semibold">{props.role}</p>
      <p className="text-navy/70 text-sm text-center mt-1">{props.education}</p>
      <p className="text-navy/50 text-xs text-center">{props.educationFull}</p>
      <ul className="mt-4 space-y-1">
        {props.achievements.map((a, i) => (
          <li key={i} className="text-sm text-navy/80 flex items-start gap-2">
            <span className="text-cyan mt-1">&#10003;</span> {a}
          </li>
        ))}
      </ul>
      <a
        href={props.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex items-center justify-center w-full px-4 py-2 rounded-lg bg-navy/5 text-navy hover:bg-navy/10 font-heading text-sm transition-colors"
      >
        {props.linkedinText}
      </a>
    </motion.div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ui/FounderCard.tsx
git commit -m "feat: create FounderCard with parallax tilt and hover effects"
```

---

### Task 13: Create Accordion, Counter, and FilterTabs components

**Files:**
- Create: `src/components/ui/Accordion.tsx`
- Create: `src/components/ui/Counter.tsx`
- Create: `src/components/ui/FilterTabs.tsx`

- [ ] **Step 1: Create Accordion component**

Framer Motion animated height expand/collapse. Rotating chevron icon.

```typescript
// src/components/ui/Accordion.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type AccordionProps = {
  question: string;
  answer: string;
};

export default function Accordion({ question, answer }: AccordionProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-navy/10">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left"
      >
        <span className="font-heading font-semibold text-navy text-lg">{question}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-cyan"
        >
          &#9660;
        </motion.span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-navy/70 leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
```

- [ ] **Step 2: Create Counter component**

Animated count-up on scroll into view using `useInView` from Framer Motion.

```typescript
// src/components/ui/Counter.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

type CounterProps = {
  target: number;
  suffix?: string;
  prefix?: string;
  label: string;
};

export default function Counter({ target, suffix = "", prefix = "", label }: CounterProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, target]);

  return (
    <div ref={ref} className="text-center">
      <div className="font-heading font-bold text-3xl text-cyan">
        {prefix}{count}{suffix}
      </div>
      <div className="text-off-white/60 text-sm mt-1">{label}</div>
    </div>
  );
}
```

- [ ] **Step 3: Create FilterTabs component**

Simple tab buttons with active state. Opacity fade on filter change.

```typescript
// src/components/ui/FilterTabs.tsx
"use client";

import { cn } from "@/lib/utils";

type FilterTabsProps = {
  tabs: { key: string; label: string }[];
  active: string;
  onChange: (key: string) => void;
};

export default function FilterTabs({ tabs, active, onChange }: FilterTabsProps) {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onChange(tab.key)}
          className={cn(
            "px-4 py-2 rounded-full text-sm font-heading font-medium transition-all duration-300",
            active === tab.key
              ? "bg-cyan text-bg-dark"
              : "bg-white/5 text-off-white/60 hover:bg-white/10 hover:text-off-white"
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
```

- [ ] **Step 4: Commit**

```bash
git add src/components/ui/Accordion.tsx src/components/ui/Counter.tsx src/components/ui/FilterTabs.tsx
git commit -m "feat: create Accordion, Counter, and FilterTabs UI components"
```

---

## Chunk 4: 3D Hero & Section Components

### Task 14: Create HeroMesh 3D scene

**Files:**
- Create: `src/components/3d/HeroMesh.tsx`
- Create: `src/components/3d/ErrorBoundary.tsx`

- [ ] **Step 1: Create React error boundary for 3D canvas**

```typescript
// src/components/3d/ErrorBoundary.tsx
"use client";

import { Component, ReactNode } from "react";

type Props = { children: ReactNode; fallback: ReactNode };
type State = { hasError: boolean };

export class CanvasErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}
```

- [ ] **Step 2: Create the HeroMesh component**

React Three Fiber scene with abstract morphing icosahedron geometry. Cyan wireframe glow, mouse-reactive rotation. On touch devices, slow auto-rotate.

```typescript
// src/components/3d/HeroMesh.tsx
"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

function MorphingMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { pointer, viewport } = useThree();
  const isTouchDevice = typeof window !== "undefined" && window.matchMedia("(hover: none)").matches;

  useFrame((state) => {
    if (!meshRef.current) return;
    if (isTouchDevice) {
      // Touch devices: slow auto-rotate only
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    } else {
      // Desktop: slow rotation + mouse influence
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1 + pointer.y * 0.3;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15 + pointer.x * 0.3;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={meshRef} scale={viewport.width > 10 ? 2.5 : 1.8}>
        <icosahedronGeometry args={[1, 4]} />
        <MeshDistortMaterial
          color="#22D3EE"
          wireframe
          distort={0.3}
          speed={2}
          transparent
          opacity={0.6}
        />
      </mesh>
      {/* Inner solid glow */}
      <mesh scale={viewport.width > 10 ? 2 : 1.4}>
        <icosahedronGeometry args={[1, 4]} />
        <MeshDistortMaterial
          color="#22D3EE"
          distort={0.2}
          speed={1.5}
          transparent
          opacity={0.08}
        />
      </mesh>
    </Float>
  );
}

export default function HeroMesh() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      className="absolute inset-0"
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#22D3EE" />
      <MorphingMesh />
    </Canvas>
  );
}
```

- [ ] **Step 3: Verify 3D scene renders**

Import `HeroMesh` dynamically in the page and check it renders the morphing icosahedron with cyan glow.

```bash
npm run dev
```

Expected: Animated wireframe mesh visible, reacts to mouse movement.

- [ ] **Step 4: Commit**

```bash
git add src/components/3d/
git commit -m "feat: create HeroMesh 3D scene with morphing icosahedron and mouse parallax"
```

---

### Task 15: Create Hero section

**Files:**
- Create: `src/components/sections/Hero.tsx`

- [ ] **Step 1: Create Hero section**

Full viewport dark section. Dynamic imports HeroMesh with Suspense fallback (gradient). Content overlay with headline, subtitle, CTA button, scroll indicator.

```typescript
// src/components/sections/Hero.tsx
"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { CanvasErrorBoundary } from "@/components/3d/ErrorBoundary";
import Button from "@/components/ui/Button";
import { WHATSAPP_URL } from "@/lib/constants";

const HeroMesh = dynamic(() => import("@/components/3d/HeroMesh"), { ssr: false });

const GradientFallback = () => (
  <div className="absolute inset-0 bg-gradient-to-br from-bg-dark via-navy to-bg-dark" />
);

export default function Hero() {
  const t = useTranslations("hero");

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-bg-dark">
      {/* 3D Background */}
      <CanvasErrorBoundary fallback={<GradientFallback />}>
        <Suspense fallback={<GradientFallback />}>
          <HeroMesh />
        </Suspense>
      </CanvasErrorBoundary>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full glass text-cyan text-sm font-heading mb-6">
            {t("badge")}
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white leading-tight">
            {t("title")} <span className="gradient-text">{t("titleHighlight")}</span> {t("titleEnd")}
          </h1>
          <p className="mt-6 text-lg text-off-white/70 max-w-2xl mx-auto leading-relaxed">
            {t("description")}
          </p>
          <div className="mt-8">
            <Button href={WHATSAPP_URL}>{t("cta")}</Button>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 12, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center pt-2">
          <div className="w-1.5 h-1.5 rounded-full bg-cyan" />
        </div>
      </motion.div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/Hero.tsx
git commit -m "feat: create Hero section with 3D mesh, headline, CTA, and scroll indicator"
```

---

### Task 16: Create Services section

**Files:**
- Create: `src/components/sections/Services.tsx`

- [ ] **Step 1: Create Services section**

Dark-to-medium background. Heading with fade-up. 2x2 grid of ServiceCard components. Icons mapped from translations (replace FontAwesome icon names with Lucide or inline SVG).

```typescript
// src/components/sections/Services.tsx
"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import ServiceCard from "@/components/ui/ServiceCard";
import { Smartphone, Bot, Cog, Monitor } from "lucide-react";

const ICONS = [<Smartphone key={0} />, <Bot key={1} />, <Cog key={2} />, <Monitor key={3} />];

export default function Services() {
  const t = useTranslations("features");

  // Read cards from translations — t.raw("cards") returns the array
  const cards = t.raw("cards") as Array<{ title: string; description: string }>;

  return (
    <section id="services" className="py-24 bg-gradient-to-b from-bg-dark to-bg-mid">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white">
            {t("title")} <span className="gradient-text">{t("titleHighlight")}</span>
          </h2>
          <p className="mt-4 text-off-white/60 max-w-2xl mx-auto">{t("description")}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {cards.map((card, i) => (
            <ServiceCard key={i} icon={ICONS[i]} title={card.title} description={card.description} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
```

(`lucide-react` was already installed in Task 1, Step 3.)

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/Services.tsx
git commit -m "feat: create Services section with icon cards and staggered scroll reveal"
```

---

### Task 17: Create Portfolio section

**Files:**
- Create: `src/components/sections/Portfolio.tsx`

- [ ] **Step 1: Create Portfolio section**

Heading + trust badges (Counter components). FilterTabs for category filtering. Bento grid of BentoCard components — first 2 projects are `large`, rest are `small`. Opacity fade on filter change.

```typescript
// src/components/sections/Portfolio.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import FilterTabs from "@/components/ui/FilterTabs";
import BentoCard from "@/components/ui/BentoCard";
import Counter from "@/components/ui/Counter";

export default function Portfolio() {
  const t = useTranslations("portfolio");
  const [activeFilter, setActiveFilter] = useState("all");

  const filters = t.raw("filters") as Record<string, string>;
  const projects = t.raw("projectsData") as Array<{
    id: number; category: string; categoryLabel: string;
    title: string; pain: string; solution: string;
    metrics: string[]; tags: string[];
  }>;

  const tabs = Object.entries(filters).map(([key, label]) => ({ key, label }));
  const filtered = activeFilter === "all"
    ? projects
    : projects.filter((p) => {
        const map: Record<string, string> = { iaAgents: "ia-agentes", automation: "automacao", apps: "apps", sites: "sites", dashboards: "dashboards" };
        return p.category === map[activeFilter];
      });

  return (
    <section id="portfolio" className="py-24 bg-bg-mid">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white">
            {t("title")} <span className="gradient-text">{t("titleHighlight")}</span>
          </h2>
          <p className="mt-4 text-off-white/60">{t("subtitle")}</p>
        </motion.div>

        {/* Trust badge counters — labels from translations via portfolio.badges array */}
        <div className="flex justify-center gap-12 mb-12">
          <Counter target={6} suffix="+" label={badges[0]} />
          <Counter target={2} label={badges[1]} />
          <Counter target={100} suffix="%" label={badges[2]} />
        </div>

        <FilterTabs tabs={tabs} active={activeFilter} onChange={setActiveFilter} />

        {/* Bento grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid md:grid-cols-3 gap-4 mt-8"
          >
            {filtered.map((project, i) => (
              <BentoCard
                key={project.id}
                size={i < 2 ? "large" : "small"}
                category={project.categoryLabel}
                title={project.title}
                pain={project.pain}
                solution={project.solution}
                metrics={project.metrics}
                tags={project.tags}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/Portfolio.tsx
git commit -m "feat: create Portfolio section with bento grid, filters, and counter badges"
```

---

### Task 18: Create Transformation section

**Files:**
- Create: `src/components/sections/Transformation.tsx`

- [ ] **Step 1: Create before/after animated table**

Challenges slide in from left, solutions from right using Framer Motion stagger.

```typescript
// src/components/sections/Transformation.tsx
"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function Transformation() {
  const t = useTranslations("solutions");
  const pains = t.raw("painPoints") as Array<{ title: string; description: string }>;
  const solutions = t.raw("solutionPoints") as Array<{ title: string; description: string }>;

  return (
    <section className="py-24 bg-gradient-to-b from-bg-mid to-bg-light">
      <div className="max-w-5xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-heading font-bold text-center text-navy mb-16"
        >
          {t("title")}
        </motion.h2>

        <div className="space-y-6">
          {pains.map((pain, i) => (
            <div key={i} className="grid md:grid-cols-[1fr_auto_1fr] gap-4 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="bg-red-50 rounded-xl p-5 border border-red-200"
              >
                <h4 className="font-heading font-semibold text-red-700">{pain.title}</h4>
                <p className="text-red-600/70 text-sm mt-1">{pain.description}</p>
              </motion.div>

              <div className="hidden md:block text-2xl text-cyan font-bold">&#8594;</div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 + 0.1 }}
                className="bg-cyan/5 rounded-xl p-5 border border-cyan/20"
              >
                <h4 className="font-heading font-semibold text-navy">{solutions[i].title}</h4>
                <p className="text-navy/70 text-sm mt-1">{solutions[i].description}</p>
              </motion.div>
            </div>
          ))}
        </div>

        {/* Gradient divider */}
        <div className="mt-16 h-px bg-gradient-to-r from-transparent via-cyan/30 to-transparent" />
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/Transformation.tsx
git commit -m "feat: create Transformation section with animated before/after comparison"
```

---

### Task 19: Create Team section

**Files:**
- Create: `src/components/sections/Team.tsx`

- [ ] **Step 1: Create Team section**

Light background. Two FounderCard components side by side. Values strip below with 6 icons/labels.

```typescript
// src/components/sections/Team.tsx
"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import FounderCard from "@/components/ui/FounderCard";
import { LINKEDIN } from "@/lib/constants";
import { Zap, Shield, Medal, Lightbulb, CheckCircle, Users } from "lucide-react";

const VALUE_ICONS = [Zap, Shield, Medal, Lightbulb, CheckCircle, Users];

export default function Team() {
  const t = useTranslations();
  const members = t.raw("team.members") as Array<{
    name: string; role: string; education: string; educationFull: string;
    achievements: string[]; photo: string; linkedin: string; linkedinText: string;
  }>;
  const values = t.raw("values.items") as Array<{ title: string; description: string }>;

  return (
    <section id="team" className="py-24 bg-bg-light">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-navy">{t("team.title")}</h2>
          <p className="mt-4 text-navy/60">{t("team.subtitle")}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {members.map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
            >
              <FounderCard {...member} />
            </motion.div>
          ))}
        </div>

        {/* Values strip */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {values.map((value, i) => {
            const Icon = VALUE_ICONS[i];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-4"
              >
                <Icon className="w-8 h-8 text-cyan mx-auto mb-2" />
                <p className="text-sm font-heading font-semibold text-navy">{value.title}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/Team.tsx
git commit -m "feat: create Team section with founder cards and values strip"
```

---

### Task 20: Create FAQ section

**Files:**
- Create: `src/components/sections/FAQ.tsx`

- [ ] **Step 1: Create FAQ section**

```typescript
// src/components/sections/FAQ.tsx
"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Accordion from "@/components/ui/Accordion";

export default function FAQ() {
  const t = useTranslations("faq");
  const items = t.raw("items") as Array<{ question: string; answer: string }>;

  return (
    <section id="faq" className="py-24 bg-bg-light">
      <div className="max-w-3xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-heading font-bold text-navy text-center mb-12"
        >
          {t("title")}
        </motion.h2>
        <div>
          {items.map((item, i) => (
            <Accordion key={i} question={item.question} answer={item.answer} />
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/FAQ.tsx
git commit -m "feat: create FAQ section with animated accordion"
```

---

### Task 21: Create FinalCTA section

**Files:**
- Create: `src/components/sections/FinalCTA.tsx`

- [ ] **Step 1: Create final CTA section**

Dark background, gradient headline, large WhatsApp CTA with pulse. Subtle gradient mesh background.

```typescript
// src/components/sections/FinalCTA.tsx
"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Button from "@/components/ui/Button";
import { WHATSAPP_URL } from "@/lib/constants";

export default function FinalCTA() {
  const t = useTranslations("finalCta");

  return (
    <section className="py-24 bg-bg-dark relative overflow-hidden">
      {/* Subtle gradient mesh background */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan/5 via-transparent to-cyan/5" />

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold">
            <span className="gradient-text">{t("title")}</span>
          </h2>
          <p className="mt-4 text-off-white/60 text-lg">{t("description")}</p>
          <div className="mt-8">
            <Button href={WHATSAPP_URL} className="text-lg px-8 py-4">{t("button")}</Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/FinalCTA.tsx
git commit -m "feat: create FinalCTA section with gradient text and WhatsApp CTA"
```

---

## Chunk 5: Page Assembly & Deployment

### Task 22: Assemble the full page

**Files:**
- Modify: `src/app/[locale]/page.tsx`
- Modify: `src/app/[locale]/layout.tsx`

- [ ] **Step 1: Assemble all sections in page.tsx**

```typescript
// src/app/[locale]/page.tsx
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Portfolio from "@/components/sections/Portfolio";
import Transformation from "@/components/sections/Transformation";
import Team from "@/components/sections/Team";
import FAQ from "@/components/sections/FAQ";
import FinalCTA from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <Portfolio />
      <Transformation />
      <Team />
      <FAQ />
      <FinalCTA />
    </main>
  );
}
```

- [ ] **Step 2: Add Navbar, Footer, and WhatsApp to locale layout**

```typescript
// src/app/[locale]/layout.tsx — add to the return:
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";

// Inside the return, wrap children:
<NextIntlClientProvider messages={messages}>
  <Navbar />
  {children}
  <Footer />
  <WhatsAppButton />
</NextIntlClientProvider>
```

- [ ] **Step 3: Run dev server and test full page**

```bash
npm run dev
```

Verify:
- All 9 sections render in order
- Scroll animations trigger
- 3D hero mesh renders and responds to mouse
- Filter tabs work on Portfolio
- FAQ accordion opens/closes
- WhatsApp button floats and pulses
- Language toggle switches PT ↔ EN
- Navbar glass effect on scroll

- [ ] **Step 4: Commit**

```bash
git add src/app/
git commit -m "feat: assemble full single-page with all sections, navbar, footer"
```

---

### Task 23: Copy and optimize assets

**Files:**
- Copy: `public/images/` from existing project
- Copy/optimize: founder photos

- [ ] **Step 1: Copy existing image assets**

```bash
cd /c/VERTECH_CONSULTORIA/site_vertech
# Images should already be in public/images/ from the original project
ls public/images/
```

If images were removed during Next.js init, copy from `_legacy` or the original paths.

- [ ] **Step 2: Add logo SVG**

Ensure `public/images/logo.svg` exists. If not, copy from the original project.

- [ ] **Step 3: Verify all images load in the dev server**

Check Network tab in DevTools for any 404s on image requests.

- [ ] **Step 4: Commit**

```bash
git add public/images/
git commit -m "feat: add optimized image assets"
```

---

### Task 24: Configure Railway deployment

**Files:**
- Modify: `package.json` (scripts)
- Verify: `next.config.ts` (output settings)

- [ ] **Step 1: Update package.json scripts for Railway**

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start -p ${PORT:-3000}"
  }
}
```

Railway sets `PORT` env var. Next.js `start` reads it.

- [ ] **Step 2: Verify build works locally**

```bash
npm run build
```

Expected: Build succeeds with no errors. Check for any TypeScript or import issues.

- [ ] **Step 3: Run production server locally**

```bash
npm run start
```

Visit `http://localhost:3000` — verify everything works in production mode.

- [ ] **Step 4: Commit and push**

```bash
git add package.json next.config.ts
git commit -m "feat: configure Railway deployment with Next.js build"
git push origin nextjs-rebuild
```

- [ ] **Step 5: Deploy on Railway**

Railway auto-detects Next.js. The existing Railway project is linked to the GitHub repo. Either merge `nextjs-rebuild` into `main` or point Railway to the new branch.

Verify at `https://sitevertech-production.up.railway.app/` that the new site loads.

- [ ] **Step 6: Fix DNS at Gandi**

At Gandi DNS panel (`admin.gandi.net/domain/.../vertechlabs.tech/dns-records`):
- Add/update CNAME record: `www` → value provided by Railway (visible in Railway settings > Networking > custom domain instructions)
- Wait for DNS propagation (up to 72 hours, usually minutes)

Verify: `https://www.vertechlabs.tech` loads the new site.

---

### Task 25: Clean up legacy files

**Files:**
- Delete: `_legacy/` directory
- Delete: `server.js`, `views/`, old `locales/` if still present
- Delete: `index.html`, `index copy.html`, `contato.html`
- Delete: `CNAME` (Railway handles domain)

- [ ] **Step 1: Remove legacy Express files**

```bash
cd /c/VERTECH_CONSULTORIA/site_vertech
rm -rf _legacy server.js views locales index.html "index copy.html" contato.html CNAME tmp_payload.json
```

- [ ] **Step 2: Verify build still works**

```bash
npm run build
```

- [ ] **Step 3: Final commit**

```bash
git add -A
git commit -m "chore: remove legacy Express files after Next.js migration"
```
