# Escritório de Bohemio — Site · Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construir o site completo do restaurante Escritório de Bohemio com Next.js 14, Tailwind CSS e PostgreSQL, com deploy na VPS Hostinger.

**Architecture:** Next.js 14 App Router com Server Components estáticos. Design system com tokens CSS mapeados para Tailwind. Prato do dia detectado automaticamente pelo dia da semana no servidor. PostgreSQL conectado via Prisma sem tabelas no v1.

**Tech Stack:** Next.js 14.2+, TypeScript, Tailwind CSS v3, Prisma 5, PostgreSQL 16, Jest + React Testing Library, PM2, Nginx.

**Spec:** `docs/superpowers/specs/2026-05-24-escritorio-de-bohemio-site-design.md`

---

## Mapa de arquivos

```
src/
├── app/
│   ├── layout.tsx                  # Root layout — fontes, Header, Footer
│   ├── page.tsx                    # Home
│   ├── cardapio/page.tsx           # Cardápio
│   ├── a-casa/page.tsx             # A Casa
│   ├── eventos/page.tsx            # Eventos
│   ├── para-empresas/page.tsx      # Para Empresas
│   └── contato/page.tsx            # Contato
├── components/
│   ├── ui/
│   │   ├── Button.tsx              # 3 variantes: primary, secondary, ghost
│   │   └── Badge.tsx               # 6 variantes de badge/tag
│   ├── layout/
│   │   ├── Header.tsx              # Sticky nav com blur ao rolar
│   │   └── Footer.tsx              # Footer espresso com 4 colunas
│   └── sections/
│       ├── HeroPratoDoDia.tsx      # Hero com imagem automática por dia
│       ├── MenuPreview.tsx         # Prévia de 3 pratos na Home
│       ├── Gallery.tsx             # Grid assimétrico de fotos
│       ├── Testimonials.tsx        # 1 grande + 3 menores
│       ├── PratoDoDiaCard.tsx      # Card escuro no topo do Cardápio
│       ├── MenuSection.tsx         # Seção de categoria do cardápio
│       └── DrinkCards.tsx          # Grid de cards de bebidas
├── lib/
│   ├── config.ts                   # Constantes: WhatsApp, domínio
│   ├── prato-do-dia.ts             # Lógica de dia da semana → imagem
│   └── db.ts                       # Prisma client singleton
└── styles/
    └── globals.css                 # Tokens CSS do design system + base

public/
├── pratos-do-dia/                  # segunda/terca/quarta/quinta/sexta/sabado.jpg
├── assets/
│   └── logo.png
└── galeria/                        # Fotos do salão, cozinha

prisma/
└── schema.prisma                   # Schema vazio + datasource PostgreSQL

nginx/
└── bohemio.conf                    # Template Nginx para o deploy

ecosystem.config.js                 # Configuração PM2
.env.example                        # Template de variáveis (sem secrets)
tailwind.config.ts
next.config.ts
```

---

## Task 1: Inicializar projeto Next.js

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `tailwind.config.ts`
- Create: `src/styles/globals.css`
- Create: `.gitignore`, `.env.example`

- [ ] **Step 1: Criar o projeto Next.js**

```bash
cd "D:/CLIENTES/ESCRITORIO DE BOHEMIO/site"
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --no-import-alias
```

Quando perguntado, aceitar defaults. Isso cria a estrutura base.

- [ ] **Step 2: Instalar dependências adicionais**

```bash
npm install prisma @prisma/client
npm install --save-dev jest @testing-library/react @testing-library/jest-dom jest-environment-jsdom @types/jest ts-jest
```

- [ ] **Step 3: Configurar Jest**

Criar `jest.config.ts`:

```typescript
import type { Config } from 'jest'
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({ dir: './' })

const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  setupFilesAfterFramework: ['<rootDir>/jest.setup.ts'],
}

export default createJestConfig(config)
```

Criar `jest.setup.ts`:

```typescript
import '@testing-library/jest-dom'
```

- [ ] **Step 4: Atualizar package.json com script de test**

Abrir `package.json` e garantir que existe:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "test": "jest",
    "test:watch": "jest --watch"
  }
}
```

- [ ] **Step 5: Criar .env.example**

```bash
# .env.example — copie para .env.local (dev) ou .env.production (VPS)
DATABASE_URL="postgresql://bohemio_user:SENHA@localhost:5432/bohemio_site"
TZ="America/Sao_Paulo"
NODE_ENV="development"
WHATSAPP_NUMBER="55XXXXXXXXXXX"
```

- [ ] **Step 6: Criar .env.local para desenvolvimento**

```bash
# .env.local (não versionado — copiar do .env.example e preencher)
DATABASE_URL="postgresql://bohemio_user:SENHA@localhost:5432/bohemio_site"
TZ="America/Sao_Paulo"
NODE_ENV="development"
WHATSAPP_NUMBER="55XXXXXXXXXXX"
```

- [ ] **Step 7: Inicializar git e fazer primeiro commit**

```bash
git init
git add .
git commit -m "chore: initialize Next.js 14 project with TypeScript and Tailwind"
```

---

## Task 2: Design System — tokens CSS e Tailwind

**Files:**
- Modify: `src/styles/globals.css`
- Modify: `tailwind.config.ts`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Substituir globals.css pelos tokens do design system**

Substituir o conteúdo de `src/styles/globals.css` por:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  /* Cores · Neutros */
  --cream-50:  #FAF6E9;
  --cream-100: #F1EBD3;
  --cream-200: #EAE3CB;
  --cream-300: #D9D1B5;
  --ink-400:   #8A8369;
  --ink-700:   #3A3527;
  --ink-900:   #1E1A0F;

  /* Cores · Acentos */
  --accent-terra:   #B5532C;
  --accent-olive:   #7A7A2E;
  --accent-mustard: #C99320;

  /* Cores · Funcionais */
  --success: #5A7A4A;
  --warning: #C99320;
  --danger:  #9E3A20;

  /* Aliases semânticos */
  --bg:        var(--cream-200);
  --bg-paper:  var(--cream-50);
  --bg-sand:   var(--cream-300);
  --fg:        var(--ink-900);
  --fg-muted:  var(--ink-400);
  --fg-subtle: var(--ink-700);
  --border:    color-mix(in oklch, var(--ink-900) 12%, transparent);
  --border-strong: color-mix(in oklch, var(--ink-900) 20%, transparent);

  /* Tipografia */
  --text-xs:      0.75rem;
  --text-sm:      0.8125rem;
  --text-base:    1.0625rem;
  --text-lg:      1.375rem;
  --text-xl:      1.75rem;
  --text-2xl:     2.75rem;
  --text-3xl:     4rem;
  --text-display: 6rem;

  --leading-tight:   1.02;
  --leading-snug:    1.2;
  --leading-body:    1.55;
  --leading-relaxed: 1.65;

  --tracking-tight: -0.03em;
  --tracking-snug:  -0.015em;
  --tracking-wide:   0.04em;

  /* Espaçamento 4-base */
  --space-1:  0.25rem;
  --space-2:  0.5rem;
  --space-3:  0.75rem;
  --space-4:  1rem;
  --space-5:  1.5rem;
  --space-6:  2rem;
  --space-7:  3rem;
  --space-8:  4rem;
  --space-9:  6rem;
  --space-10: 8rem;

  /* Radius */
  --radius-sm:   4px;
  --radius-md:   8px;
  --radius-lg:   12px;
  --radius-xl:   20px;
  --radius-pill: 999px;

  /* Sombras */
  --shadow-sm: 0 1px 2px oklch(0.18 0.01 80 / 0.06);
  --shadow-md: 0 4px 12px oklch(0.18 0.01 80 / 0.08);
  --shadow-lg: 0 12px 32px oklch(0.18 0.01 80 / 0.12);
  --shadow-xl: 0 24px 64px oklch(0.18 0.01 80 / 0.16);

  /* Motion */
  --motion-instant: 120ms;
  --motion-quick:   240ms;
  --motion-gentle:  400ms;
  --motion-slow:    680ms;
  --ease-out:      cubic-bezier(0.2, 0.7, 0.2, 1);
  --ease-out-soft: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in-out:   cubic-bezier(0.65, 0, 0.35, 1);

  /* Layout */
  --container-max: 1280px;
  --container-pad: var(--space-6);
}

html, body {
  background: var(--bg);
  color: var(--fg);
  font-size: var(--text-base);
  line-height: var(--leading-body);
  -webkit-font-smoothing: antialiased;
}
```

- [ ] **Step 2: Configurar tailwind.config.ts com os tokens**

Substituir o conteúdo de `tailwind.config.ts`:

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        'cream-50':  'var(--cream-50)',
        'cream-100': 'var(--cream-100)',
        'cream-200': 'var(--cream-200)',
        'cream-300': 'var(--cream-300)',
        'ink-400':   'var(--ink-400)',
        'ink-700':   'var(--ink-700)',
        'ink-900':   'var(--ink-900)',
        'accent-terra':    'var(--accent-terra)',
        'accent-olive':    'var(--accent-olive)',
        'accent-mustard':  'var(--accent-mustard)',
        success: 'var(--success)',
        warning: 'var(--warning)',
        danger:  'var(--danger)',
        bg:       'var(--bg)',
        'bg-paper': 'var(--bg-paper)',
        fg:       'var(--fg)',
        'fg-muted':   'var(--fg-muted)',
        'fg-subtle':  'var(--fg-subtle)',
        border:   'var(--border)',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        sm:   'var(--radius-sm)',
        md:   'var(--radius-md)',
        lg:   'var(--radius-lg)',
        xl:   'var(--radius-xl)',
        pill: 'var(--radius-pill)',
      },
      boxShadow: {
        sm: 'var(--shadow-sm)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
        xl: 'var(--shadow-xl)',
      },
      transitionDuration: {
        instant: 'var(--motion-instant)',
        quick:   'var(--motion-quick)',
        gentle:  'var(--motion-gentle)',
        slow:    'var(--motion-slow)',
      },
      transitionTimingFunction: {
        'out':      'var(--ease-out)',
        'out-soft': 'var(--ease-out-soft)',
        'in-out':   'var(--ease-in-out)',
      },
      maxWidth: {
        container: 'var(--container-max)',
      },
    },
  },
  plugins: [],
}

export default config
```

- [ ] **Step 3: Configurar fontes no layout raiz**

Substituir `src/app/layout.tsx`:

```typescript
import type { Metadata } from 'next'
import { Hanken_Grotesk, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const hanken = Hanken_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-sans',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Escritório de Bohemio',
  description: 'Um lugar quieto, com mesa de madeira, vinho aberto e gente que volta toda semana.',
  metadataBase: new URL('https://escritoriodebohemio.com.br'),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${hanken.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans bg-bg text-fg">
        {children}
      </body>
    </html>
  )
}
```

- [ ] **Step 4: Verificar que o servidor dev sobe sem erros**

```bash
npm run dev
```

Abrir http://localhost:3000 — deve mostrar a página com fundo `#EAE3CB` (linen). Verificar no DevTools que as fontes Hanken Grotesk e JetBrains Mono estão carregando.

- [ ] **Step 5: Commit**

```bash
git add src/styles/globals.css tailwind.config.ts src/app/layout.tsx jest.config.ts jest.setup.ts .env.example
git commit -m "feat: add design system tokens and Tailwind config"
```

---

## Task 3: Lib — config.ts e prato-do-dia.ts (TDD)

**Files:**
- Create: `src/lib/config.ts`
- Create: `src/lib/prato-do-dia.ts`
- Create: `src/lib/__tests__/prato-do-dia.test.ts`

- [ ] **Step 1: Criar src/lib/config.ts**

```typescript
export const WHATSAPP_NUMBER = process.env.WHATSAPP_NUMBER ?? '5567998973649'

export const WHATSAPP_LINKS = {
  paraEmpresas: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Olá! Gostaria de um orçamento para atendimento externo (refeitório/coffee break/evento).')}`,
  eventos: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Olá! Gostaria de informações sobre eventos no Escritório de Bohemio.')}`,
  geral: `https://wa.me/${WHATSAPP_NUMBER}`,
} as const

export const SITE_URL = 'https://escritoriodebohemio.com.br'
```

- [ ] **Step 2: Escrever o teste para prato-do-dia.ts**

Criar `src/lib/__tests__/prato-do-dia.test.ts`:

```typescript
import { getPratoDoDia, DIAS_SLUGS } from '../prato-do-dia'

describe('getPratoDoDia', () => {
  const mockDate = (dayOfWeek: number) => {
    jest.spyOn(global.Date.prototype, 'getDay').mockReturnValue(dayOfWeek)
  }

  afterEach(() => jest.restoreAllMocks())

  it('domingo (0) retorna slug segunda', () => {
    mockDate(0)
    expect(getPratoDoDia().slug).toBe('segunda')
  })

  it('segunda (1) retorna slug segunda', () => {
    mockDate(1)
    expect(getPratoDoDia().slug).toBe('segunda')
  })

  it('terça (2) retorna slug terca', () => {
    mockDate(2)
    expect(getPratoDoDia().slug).toBe('terca')
  })

  it('quarta (3) retorna slug quarta', () => {
    mockDate(3)
    expect(getPratoDoDia().slug).toBe('quarta')
  })

  it('quinta (4) retorna slug quinta', () => {
    mockDate(4)
    expect(getPratoDoDia().slug).toBe('quinta')
  })

  it('sexta (5) retorna slug sexta', () => {
    mockDate(5)
    expect(getPratoDoDia().slug).toBe('sexta')
  })

  it('sábado (6) retorna slug sabado', () => {
    mockDate(6)
    expect(getPratoDoDia().slug).toBe('sabado')
  })

  it('retorna imagePath correto baseado no slug', () => {
    mockDate(2)
    expect(getPratoDoDia().imagePath).toBe('/pratos-do-dia/terca.jpg')
  })

  it('DIAS_SLUGS tem 7 entradas (0-6)', () => {
    expect(Object.keys(DIAS_SLUGS)).toHaveLength(7)
  })
})
```

- [ ] **Step 3: Rodar o teste e confirmar que falha**

```bash
npx jest src/lib/__tests__/prato-do-dia.test.ts --no-coverage
```

Esperado: FAIL — `Cannot find module '../prato-do-dia'`

- [ ] **Step 4: Implementar src/lib/prato-do-dia.ts**

```typescript
export const DIAS_SLUGS = {
  0: 'segunda', // Domingo antecipa a semana seguinte
  1: 'segunda',
  2: 'terca',
  3: 'quarta',
  4: 'quinta',
  5: 'sexta',
  6: 'sabado',
} as const

type DiaSlug = typeof DIAS_SLUGS[keyof typeof DIAS_SLUGS]

export function getPratoDoDia(): { slug: DiaSlug; imagePath: string } {
  const day = new Date().getDay() as keyof typeof DIAS_SLUGS
  const slug = DIAS_SLUGS[day]
  return {
    slug,
    imagePath: `/pratos-do-dia/${slug}.jpg`,
  }
}
```

- [ ] **Step 5: Rodar o teste e confirmar que passa**

```bash
npx jest src/lib/__tests__/prato-do-dia.test.ts --no-coverage
```

Esperado: PASS — 9 testes verdes.

- [ ] **Step 6: Criar estrutura de pastas públicas e placeholders**

```bash
mkdir -p public/pratos-do-dia public/assets public/galeria
```

Criar `public/pratos-do-dia/.gitkeep` e `public/galeria/.gitkeep` (arquivos vazios para versionar as pastas).

- [ ] **Step 7: Commit**

```bash
git add src/lib/ public/
git commit -m "feat: add prato-do-dia logic and public folder structure"
```

---

## Task 4: Database — Prisma setup

**Files:**
- Create: `prisma/schema.prisma`
- Create: `src/lib/db.ts`

- [ ] **Step 1: Inicializar Prisma**

```bash
npx prisma init --datasource-provider postgresql
```

Isso cria `prisma/schema.prisma` e adiciona `DATABASE_URL` ao `.env`.

- [ ] **Step 2: Substituir prisma/schema.prisma**

```prisma
// This is the Prisma schema for Escritório de Bohemio
// v1: no models — database connected but unused
// Future: add models for leads (Para Empresas), menu management, events

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// Models will be added in future versions:
// - Lead (name, email, message, service, createdAt)
// - MenuItem (name, description, price, category, active)
// - Event (title, description, date, active)
```

- [ ] **Step 3: Criar src/lib/db.ts**

```typescript
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
```

- [ ] **Step 4: Gerar o Prisma client**

```bash
npx prisma generate
```

Esperado: `✔ Generated Prisma Client` sem erros.

- [ ] **Step 5: Commit**

```bash
git add prisma/ src/lib/db.ts .env.example
git commit -m "feat: setup Prisma with empty schema for PostgreSQL"
```

---

## Task 5: Componentes UI — Button e Badge

**Files:**
- Create: `src/components/ui/Button.tsx`
- Create: `src/components/ui/Badge.tsx`
- Create: `src/components/ui/__tests__/Button.test.tsx`

- [ ] **Step 1: Escrever teste do Button**

Criar `src/components/ui/__tests__/Button.test.tsx`:

```typescript
import { render, screen } from '@testing-library/react'
import { Button } from '../Button'

describe('Button', () => {
  it('renderiza children', () => {
    render(<Button variant="primary">Reservar</Button>)
    expect(screen.getByText('Reservar')).toBeInTheDocument()
  })

  it('variant primary tem classe bg-accent-terra', () => {
    render(<Button variant="primary">Reservar</Button>)
    expect(screen.getByRole('button')).toHaveClass('bg-accent-terra')
  })

  it('variant secondary tem classe border-ink-900', () => {
    render(<Button variant="secondary">Ver</Button>)
    expect(screen.getByRole('button')).toHaveClass('border-ink-900')
  })

  it('variant ghost não tem background sólido', () => {
    render(<Button variant="ghost">Como chegar →</Button>)
    const btn = screen.getByRole('button')
    expect(btn).not.toHaveClass('bg-accent-terra')
    expect(btn).not.toHaveClass('border-ink-900')
  })

  it('size sm tem classe text-sm', () => {
    render(<Button variant="primary" size="sm">Btn</Button>)
    expect(screen.getByRole('button')).toHaveClass('text-sm')
  })

  it('disabled é propagado corretamente', () => {
    render(<Button variant="primary" disabled>Btn</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })
})
```

- [ ] **Step 2: Rodar o teste e confirmar FAIL**

```bash
npx jest src/components/ui/__tests__/Button.test.tsx --no-coverage
```

Esperado: FAIL — `Cannot find module '../Button'`

- [ ] **Step 3: Implementar src/components/ui/Button.tsx**

```typescript
import { ButtonHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: ButtonVariant
  size?: ButtonSize
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-accent-terra text-cream-50 hover:brightness-110 active:brightness-90 disabled:opacity-40',
  secondary:
    'border border-ink-900 text-ink-900 bg-transparent hover:bg-ink-900 hover:text-cream-50 active:opacity-80 disabled:opacity-40',
  ghost:
    'text-ink-900 bg-transparent hover:text-ink-700 active:opacity-70 disabled:opacity-40',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'text-sm px-3 py-1.5',
  md: 'text-base px-4 py-2',
  lg: 'text-lg px-6 py-3',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant, size = 'md', className, children, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        'inline-flex items-center gap-2 font-sans font-semibold rounded-md',
        'transition-all duration-instant ease-out cursor-pointer',
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  ),
)

Button.displayName = 'Button'
```

- [ ] **Step 4: Criar src/lib/utils.ts (helper cn)**

```typescript
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

- [ ] **Step 5: Instalar clsx e tailwind-merge**

```bash
npm install clsx tailwind-merge
```

- [ ] **Step 6: Rodar os testes do Button e confirmar PASS**

```bash
npx jest src/components/ui/__tests__/Button.test.tsx --no-coverage
```

Esperado: PASS — 6 testes verdes.

- [ ] **Step 7: Implementar src/components/ui/Badge.tsx**

```typescript
import { cn } from '@/lib/utils'

type BadgeVariant = 'success' | 'warning' | 'danger' | 'neutral' | 'outline' | 'accent' | 'filter' | 'filter-active'

interface BadgeProps {
  variant?: BadgeVariant
  children: React.ReactNode
  className?: string
}

const variantClasses: Record<BadgeVariant, string> = {
  success:       'bg-success/10 text-success border-success/30',
  warning:       'bg-warning/10 text-warning border-warning/30',
  danger:        'bg-danger/10 text-danger border-danger/30',
  neutral:       'bg-cream-300 text-ink-700 border-cream-300',
  outline:       'border-border text-fg-subtle bg-transparent',
  accent:        'border-accent-terra text-accent-terra bg-transparent',
  filter:        'border-border text-fg-muted bg-transparent hover:border-ink-900 hover:text-ink-900 cursor-pointer',
  'filter-active': 'bg-ink-900 text-cream-50 border-ink-900 cursor-pointer',
}

export function Badge({ variant = 'outline', children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-block font-mono text-xs font-medium tracking-wide uppercase',
        'px-2 py-0.5 rounded-pill border',
        'transition-colors duration-instant ease-out',
        variantClasses[variant],
        className,
      )}
    >
      {children}
    </span>
  )
}
```

- [ ] **Step 8: Commit**

```bash
git add src/components/ui/ src/lib/utils.ts
git commit -m "feat: add Button and Badge UI components"
```

---

## Task 6: Layout — Header e Footer

**Files:**
- Create: `src/components/layout/Header.tsx`
- Create: `src/components/layout/Footer.tsx`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Implementar src/components/layout/Header.tsx**

```typescript
'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/Button'
import { WHATSAPP_LINKS } from '@/lib/config'

const NAV_LINKS = [
  { href: '/cardapio', label: 'Cardápio' },
  { href: '/a-casa', label: 'A Casa' },
  { href: '/eventos', label: 'Eventos' },
  { href: '/para-empresas', label: 'Para Empresas' },
  { href: '/contato', label: 'Contato' },
] as const

export function Header() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={[
        'sticky top-0 z-50 w-full transition-all duration-quick ease-out',
        scrolled
          ? 'bg-bg-paper/90 backdrop-blur-md shadow-sm border-b border-border'
          : 'bg-bg',
      ].join(' ')}
    >
      <div className="max-w-container mx-auto px-6 flex items-center justify-between h-16">
        <Link href="/" className="flex-shrink-0">
          <Image
            src="/assets/logo.png"
            alt="Escritório de Bohemio"
            width={120}
            height={40}
            className="h-10 w-auto object-contain"
            priority
          />
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={[
                'text-sm font-medium transition-colors duration-instant ease-out',
                pathname === href
                  ? 'text-fg border-b border-fg pb-0.5'
                  : 'text-fg-subtle hover:text-fg',
              ].join(' ')}
            >
              {label}
            </Link>
          ))}
        </nav>

        <a href={WHATSAPP_LINKS.geral} target="_blank" rel="noopener noreferrer">
          <Button variant="primary" size="sm">
            Fale no WhatsApp
          </Button>
        </a>
      </div>
    </header>
  )
}
```

- [ ] **Step 2: Implementar src/components/layout/Footer.tsx**

```typescript
import Link from 'next/link'
import Image from 'next/image'
import { Badge } from '@/components/ui/Badge'
import { WHATSAPP_LINKS } from '@/lib/config'

export function Footer() {
  return (
    <footer className="bg-ink-900 text-cream-50">
      <div className="max-w-container mx-auto px-6 pt-12 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">

          <div className="md:col-span-1">
            <Image
              src="/assets/logo.png"
              alt="Escritório de Bohemio"
              width={140}
              height={48}
              className="h-12 w-auto object-contain brightness-0 invert mb-4"
            />
            <p className="text-sm text-ink-400 leading-relaxed max-w-xs">
              Um lugar quieto, com mesa de madeira, vinho aberto e gente que volta toda semana.
            </p>
          </div>

          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-ink-400 mb-3">
              Endereço
            </div>
            <p className="text-sm text-cream-300 leading-relaxed">
              {/* Preencher com endereço real */}
              Rua das Palmeiras, 142<br />
              Sua cidade
            </p>
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-cream-300 underline underline-offset-2 mt-2 inline-block hover:text-cream-50 transition-colors duration-instant"
            >
              Ver no mapa →
            </a>
          </div>

          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-ink-400 mb-3">
              Horário
            </div>
            <p className="text-sm text-cream-300 leading-relaxed">
              Seg–Sex · 19h–23h<br />
              Sáb · 19h–01h
            </p>
            <div className="mt-3">
              <Badge variant="success">● Aberto agora</Badge>
            </div>
          </div>

          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-ink-400 mb-3">
              Contato
            </div>
            <div className="flex flex-col gap-2">
              <a
                href={WHATSAPP_LINKS.geral}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-cream-300 hover:text-cream-50 transition-colors duration-instant"
              >
                WhatsApp
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-cream-300 hover:text-cream-50 transition-colors duration-instant"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-cream-50/10 pt-6 flex flex-col md:flex-row justify-between gap-2">
          <span className="font-mono text-xs text-ink-400">
            © {new Date().getFullYear()} Escritório de Bohemio
          </span>
          <div className="flex gap-4">
            <Link href="/privacidade" className="font-mono text-xs text-ink-400 hover:text-cream-50 transition-colors duration-instant">
              Política de privacidade
            </Link>
            <Link href="/termos" className="font-mono text-xs text-ink-400 hover:text-cream-50 transition-colors duration-instant">
              Termos
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Step 3: Adicionar Header e Footer no layout raiz**

Modificar `src/app/layout.tsx` — adicionar os imports e envolver `{children}`:

```typescript
import type { Metadata } from 'next'
import { Hanken_Grotesk, JetBrains_Mono } from 'next/font/google'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import './globals.css'

const hanken = Hanken_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-sans',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: { default: 'Escritório de Bohemio', template: '%s | Escritório de Bohemio' },
  description: 'Um lugar quieto, com mesa de madeira, vinho aberto e gente que volta toda semana.',
  metadataBase: new URL('https://escritoriodebohemio.com.br'),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${hanken.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans bg-bg text-fg">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
```

- [ ] **Step 4: Verificar no browser**

```bash
npm run dev
```

Abrir http://localhost:3000 — deve aparecer header com logo (broken por enquanto) e footer espresso. Sem erros de TypeScript no terminal.

- [ ] **Step 5: Commit**

```bash
git add src/components/layout/ src/app/layout.tsx
git commit -m "feat: add Header and Footer layout components"
```

---

## Task 7: Sections reutilizáveis — HeroPratoDoDia, Gallery, Testimonials

**Files:**
- Create: `src/components/sections/HeroPratoDoDia.tsx`
- Create: `src/components/sections/Gallery.tsx`
- Create: `src/components/sections/Testimonials.tsx`

- [ ] **Step 1: Criar src/components/sections/HeroPratoDoDia.tsx**

```typescript
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

interface HeroPratoDoDiaProps {
  imagePath: string
  diaNome: string
}

export function HeroPratoDoDia({ imagePath, diaNome }: HeroPratoDoDiaProps) {
  const diaLabel: Record<string, string> = {
    segunda: 'Segunda-feira',
    terca:   'Terça-feira',
    quarta:  'Quarta-feira',
    quinta:  'Quinta-feira',
    sexta:   'Sexta-feira',
    sabado:  'Sábado',
  }

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 min-h-[520px]">
      <div className="flex flex-col justify-center gap-5 px-8 md:px-16 py-16 bg-bg">
        <div className="font-mono text-xs uppercase tracking-widest text-fg-muted">
          Prato do dia
        </div>
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-none text-fg">
          Vinho da casa.<br />
          <span className="text-accent-terra">Prato feito</span><br />
          na hora.
        </h1>
        <p className="text-lg text-fg-subtle leading-relaxed max-w-sm">
          Um lugar quieto, com mesa de madeira e gente que volta toda semana.
        </p>
        <div className="flex gap-3 items-center">
          <Link href="/cardapio">
            <Button variant="primary">Ver cardápio</Button>
          </Link>
          <Link href="/a-casa">
            <Button variant="ghost">A casa →</Button>
          </Link>
        </div>
      </div>

      <div className="relative bg-cream-300 overflow-hidden">
        <Image
          src={imagePath}
          alt={`Prato do dia — ${diaLabel[diaNome] ?? diaNome}`}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute top-4 left-4 bg-ink-900 text-cream-50 font-mono text-xs font-medium px-3 py-1.5 rounded-pill uppercase tracking-wide">
          ● Hoje · {diaLabel[diaNome] ?? diaNome}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Criar src/components/sections/Gallery.tsx**

```typescript
import Image from 'next/image'

interface GalleryImage {
  src: string
  alt: string
  span?: 'lg' | 'wide' | 'normal'
}

interface GalleryProps {
  images: GalleryImage[]
}

export function Gallery({ images }: GalleryProps) {
  return (
    <section className="px-6 md:px-16 py-16 bg-bg-paper">
      <div className="max-w-container mx-auto">
        <div className="mb-10">
          <div className="font-mono text-xs uppercase tracking-widest text-fg-muted mb-2">
            A casa
          </div>
          <h2 className="text-4xl font-bold tracking-tight text-fg">
            O salão, a cozinha, a noite
          </h2>
        </div>

        <div className="grid grid-cols-3 grid-rows-2 gap-2 h-[400px] md:h-[500px]">
          {images.map((img, i) => (
            <div
              key={i}
              className={[
                'relative overflow-hidden rounded-md bg-cream-300',
                img.span === 'lg'   ? 'row-span-2' : '',
                img.span === 'wide' ? 'col-span-2' : '',
              ].join(' ')}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-all duration-slow ease-out-soft hover:scale-105"
                sizes="(max-width: 768px) 33vw, 400px"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Criar src/components/sections/Testimonials.tsx**

```typescript
interface Testimonial {
  quote: string
  author: string
  source: string
}

interface TestimonialsProps {
  featured: Testimonial
  others: Testimonial[]
}

export function Testimonials({ featured, others }: TestimonialsProps) {
  return (
    <section className="px-6 md:px-16 py-16 bg-bg">
      <div className="max-w-container mx-auto">
        <div className="mb-10">
          <div className="font-mono text-xs uppercase tracking-widest text-fg-muted mb-2">
            Quem volta
          </div>
          <h2 className="text-4xl font-bold tracking-tight text-fg">
            A palavra de quem esteve aqui
          </h2>
        </div>

        <div className="bg-bg-paper rounded-lg p-8 mb-4">
          <div className="text-5xl font-bold text-cream-300 leading-none mb-2" aria-hidden>
            &ldquo;
          </div>
          <blockquote className="text-xl leading-relaxed text-fg">
            {featured.quote}
          </blockquote>
          <div className="font-mono text-xs text-fg-muted mt-4">
            {featured.author}
            <span className="text-fg-muted"> · {featured.source}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {others.map((t, i) => (
            <div key={i} className="bg-bg-paper rounded-lg p-5">
              <blockquote className="text-sm leading-relaxed text-fg">
                {t.quote}
              </blockquote>
              <div className="font-mono text-xs text-fg-muted mt-3">
                {t.author}
                <span> · {t.source}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/
git commit -m "feat: add HeroPratoDoDia, Gallery, Testimonials sections"
```

---

## Task 8: Home page

**Files:**
- Modify: `src/app/page.tsx`
- Create: `src/components/sections/MenuPreview.tsx`

- [ ] **Step 1: Criar src/components/sections/MenuPreview.tsx**

```typescript
import Link from 'next/link'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'

interface MenuItem {
  nome: string
  descricao?: string
  preco: string
  badges?: Array<{ label: string; variant: 'outline' | 'accent' }>
}

interface MenuPreviewProps {
  items: MenuItem[]
}

export function MenuPreview({ items }: MenuPreviewProps) {
  return (
    <section className="px-6 md:px-16 py-16 bg-bg">
      <div className="max-w-container mx-auto">
        <div className="mb-8">
          <div className="font-mono text-xs uppercase tracking-widest text-fg-muted mb-2">
            O cardápio
          </div>
          <h2 className="text-4xl font-bold tracking-tight text-fg">
            O que tem hoje
          </h2>
          <p className="text-lg text-fg-subtle mt-2">
            Pratos feitos na hora, com o que veio bom no dia.
          </p>
        </div>

        <div className="divide-y divide-border">
          {items.map((item, i) => (
            <div key={i} className="flex justify-between items-start py-4 gap-4">
              <div>
                <div className="text-base font-semibold text-fg">{item.nome}</div>
                {item.descricao && (
                  <div className="text-sm text-fg-muted mt-0.5">{item.descricao}</div>
                )}
                {item.badges && item.badges.length > 0 && (
                  <div className="flex gap-1.5 mt-1.5">
                    {item.badges.map((b, j) => (
                      <Badge key={j} variant={b.variant}>{b.label}</Badge>
                    ))}
                  </div>
                )}
              </div>
              <span className="font-mono text-base font-medium text-fg shrink-0">
                {item.preco}
              </span>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link href="/cardapio">
            <Button variant="secondary">Ver cardápio completo →</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Implementar src/app/page.tsx**

```typescript
import { getPratoDoDia } from '@/lib/prato-do-dia'
import { HeroPratoDoDia } from '@/components/sections/HeroPratoDoDia'
import { MenuPreview } from '@/components/sections/MenuPreview'
import { Gallery } from '@/components/sections/Gallery'
import { Testimonials } from '@/components/sections/Testimonials'

const MENU_PREVIEW = [
  {
    nome: 'Prato do dia',
    descricao: 'Muda diariamente — acompanha arroz, feijão e salada.',
    preco: 'R$ 38',
    badges: [],
  },
  {
    nome: 'Prato vegetariano',
    descricao: 'Opção sem carne. Pergunta no balcão qual é o de hoje.',
    preco: 'R$ 34',
    badges: [{ label: 'Vegetariano', variant: 'outline' as const }],
  },
  {
    nome: 'Marmita para viagem',
    descricao: 'O mesmo prato do dia embalado para levar.',
    preco: 'R$ 32',
    badges: [],
  },
]

const GALLERY_IMAGES = [
  { src: '/galeria/salao.jpg',   alt: 'Salão principal',    span: 'lg' as const },
  { src: '/galeria/prato.jpg',   alt: 'Prato do dia',       span: 'normal' as const },
  { src: '/galeria/vinhos.jpg',  alt: 'Vinhos',             span: 'normal' as const },
  { src: '/galeria/fachada.jpg', alt: 'Fachada à noite',    span: 'wide' as const },
  { src: '/galeria/cozinha.jpg', alt: 'Cozinha',            span: 'normal' as const },
]

const FEATURED_TESTIMONIAL = {
  quote: 'Um dos lugares onde a gente entra e esquece a hora. A costela é coisa de outro mundo, mas o que faz voltar é o salão — escuro na medida, com música baixa e gente conversando.',
  author: 'Helena Costa',
  source: 'Folha de S.Paulo · 2026',
}

const OTHER_TESTIMONIALS = [
  {
    quote: 'Saí com a sensação de ter jantado na casa de um amigo bom de cozinha. Voltei na semana seguinte.',
    author: 'Caio M.',
    source: 'Google',
  },
  {
    quote: 'Vinho a preço honesto, cardápio enxuto e cozinheiro que sabe o que faz. É o que a gente queria por perto.',
    author: 'Marina Lopes',
    source: 'Instagram',
  },
  {
    quote: 'O melhor pavê da minha vida, e olha que minha avó fazia bem.',
    author: 'Pedro A.',
    source: 'TripAdvisor',
  },
]

export default function HomePage() {
  const pratoDoDia = getPratoDoDia()

  return (
    <>
      <HeroPratoDoDia imagePath={pratoDoDia.imagePath} diaNome={pratoDoDia.slug} />
      <MenuPreview items={MENU_PREVIEW} />
      <Gallery images={GALLERY_IMAGES} />
      <Testimonials featured={FEATURED_TESTIMONIAL} others={OTHER_TESTIMONIALS} />
    </>
  )
}
```

- [ ] **Step 3: Verificar no browser**

```bash
npm run dev
```

Abrir http://localhost:3000 — verificar todas as seções, fontes corretas, paleta certa.

- [ ] **Step 4: Commit**

```bash
git add src/app/page.tsx src/components/sections/MenuPreview.tsx
git commit -m "feat: implement Home page with prato do dia, menu preview, gallery and testimonials"
```

---

## Task 9: Cardápio page

**Files:**
- Create: `src/app/cardapio/page.tsx`
- Create: `src/components/sections/PratoDoDiaCard.tsx`
- Create: `src/components/sections/MenuSection.tsx`
- Create: `src/components/sections/DrinkCards.tsx`

- [ ] **Step 1: Criar src/components/sections/PratoDoDiaCard.tsx**

```typescript
import Image from 'next/image'

interface PratoDoDiaCardProps {
  imagePath: string
  diaNome: string
}

const DIA_LABELS: Record<string, string> = {
  segunda: 'Segunda-feira', terca: 'Terça-feira', quarta: 'Quarta-feira',
  quinta: 'Quinta-feira', sexta: 'Sexta-feira', sabado: 'Sábado',
}

export function PratoDoDiaCard({ imagePath, diaNome }: PratoDoDiaCardProps) {
  return (
    <div className="mx-6 md:mx-16 mb-8 bg-ink-900 rounded-lg overflow-hidden grid grid-cols-1 md:grid-cols-[1fr_280px]">
      <div className="p-8 md:p-10 flex flex-col justify-center">
        <div className="font-mono text-xs text-accent-mustard uppercase tracking-widest mb-3">
          ● Prato do dia · {DIA_LABELS[diaNome] ?? diaNome}
        </div>
        <h2 className="text-3xl font-bold text-cream-50 tracking-tight leading-tight">
          Confira o prato de hoje
        </h2>
        <p className="text-sm text-cream-300 mt-3 leading-relaxed">
          Muda todo dia, feito na hora com o que veio bom no mercado.
        </p>
      </div>
      <div className="relative h-48 md:h-auto bg-ink-700">
        <Image
          src={imagePath}
          alt={`Prato do dia — ${DIA_LABELS[diaNome] ?? diaNome}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 280px"
        />
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Criar src/components/sections/MenuSection.tsx**

```typescript
import { Badge } from '@/components/ui/Badge'

interface MenuItemData {
  nome: string
  descricao?: string
  preco: string
  badges?: Array<{ label: string; variant: 'outline' | 'accent' }>
}

interface MenuSectionProps {
  categoria: string
  items: MenuItemData[]
}

export function MenuSection({ categoria, items }: MenuSectionProps) {
  return (
    <div className="px-6 md:px-16 pb-8">
      <div className="max-w-container mx-auto">
        <div className="font-mono text-xs uppercase tracking-widest text-fg-muted mb-4">
          {categoria}
        </div>
        <div className="divide-y divide-border">
          {items.map((item, i) => (
            <div key={i} className="flex justify-between items-start py-4 gap-4">
              <div>
                <div className="text-base font-semibold text-fg">{item.nome}</div>
                {item.descricao && (
                  <div className="text-sm text-fg-muted mt-0.5 max-w-md leading-relaxed">
                    {item.descricao}
                  </div>
                )}
                {item.badges && item.badges.length > 0 && (
                  <div className="flex gap-1.5 mt-2">
                    {item.badges.map((b, j) => (
                      <Badge key={j} variant={b.variant}>{b.label}</Badge>
                    ))}
                  </div>
                )}
              </div>
              <span className="font-mono text-sm font-medium text-fg shrink-0 mt-0.5">
                {item.preco}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Criar src/components/sections/DrinkCards.tsx**

```typescript
interface Drink {
  nome: string
  descricao: string
  preco: string
}

interface DrinkCardsProps {
  drinks: Drink[]
}

export function DrinkCards({ drinks }: DrinkCardsProps) {
  return (
    <div className="px-6 md:px-16 pb-12">
      <div className="max-w-container mx-auto">
        <div className="font-mono text-xs uppercase tracking-widest text-fg-muted mb-4">
          Bebidas
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {drinks.map((drink, i) => (
            <div key={i} className="bg-bg-paper rounded-md p-5 flex justify-between items-center">
              <div>
                <div className="text-sm font-semibold text-fg">{drink.nome}</div>
                <div className="text-xs text-fg-muted mt-0.5">{drink.descricao}</div>
              </div>
              <span className="font-mono text-sm font-medium text-fg ml-4 shrink-0">
                {drink.preco}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Implementar src/app/cardapio/page.tsx**

```typescript
import type { Metadata } from 'next'
import { getPratoDoDia } from '@/lib/prato-do-dia'
import { PratoDoDiaCard } from '@/components/sections/PratoDoDiaCard'
import { MenuSection } from '@/components/sections/MenuSection'
import { DrinkCards } from '@/components/sections/DrinkCards'

export const metadata: Metadata = { title: 'Cardápio' }

const PRATOS = [
  { nome: 'Prato do dia', descricao: 'Muda diariamente — acompanha arroz, feijão e salada.', preco: 'R$ 38', badges: [] },
  { nome: 'Prato vegetariano', descricao: 'Opção sem carne. Pergunta no balcão qual é o de hoje.', preco: 'R$ 34', badges: [{ label: 'Vegetariano', variant: 'outline' as const }] },
  { nome: 'Marmita para viagem', descricao: 'O mesmo prato do dia embalado para levar.', preco: 'R$ 32', badges: [] },
]

const GUARNICOES = [
  { nome: 'Arroz branco', preco: 'R$ 8' },
  { nome: 'Feijão', preco: 'R$ 8' },
  { nome: 'Salada da estação', descricao: 'Folhas, tomate, pepino e azeite — varia com o mercado.', preco: 'R$ 12' },
  { nome: 'Pão de fermentação', preco: 'R$ 10' },
]

const BEBIDAS = [
  { nome: 'Água', descricao: 'Com ou sem gás · 500ml', preco: 'R$ 5' },
  { nome: 'Refrigerante', descricao: 'Lata · 350ml', preco: 'R$ 7' },
  { nome: 'Cerveja', descricao: 'Long neck · 355ml', preco: 'R$ 12' },
]

export default function CardapioPage() {
  const pratoDoDia = getPratoDoDia()

  return (
    <>
      <div className="px-6 md:px-16 py-12 bg-bg">
        <div className="max-w-container mx-auto">
          <div className="font-mono text-xs uppercase tracking-widest text-fg-muted mb-2">
            O que tem hoje
          </div>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-fg">
            Cardápio
          </h1>
          <p className="text-lg text-fg-subtle mt-3 max-w-lg">
            Pratos feitos na hora, com o que veio bom no dia. Cardápio enxuto por escolha.
          </p>
        </div>
      </div>

      <PratoDoDiaCard imagePath={pratoDoDia.imagePath} diaNome={pratoDoDia.slug} />

      <div className="border-t border-border">
        <MenuSection categoria="Pratos" items={PRATOS} />
      </div>
      <div className="border-t border-border">
        <MenuSection categoria="Guarnições" items={GUARNICOES} />
      </div>
      <div className="border-t border-border pt-8">
        <DrinkCards drinks={BEBIDAS} />
      </div>
    </>
  )
}
```

- [ ] **Step 5: Verificar no browser — http://localhost:3000/cardapio**

- [ ] **Step 6: Commit**

```bash
git add src/app/cardapio/ src/components/sections/PratoDoDiaCard.tsx src/components/sections/MenuSection.tsx src/components/sections/DrinkCards.tsx
git commit -m "feat: implement Cardápio page with prato do dia card and menu sections"
```

---

## Task 10: Páginas A Casa, Eventos e Contato

**Files:**
- Create: `src/app/a-casa/page.tsx`
- Create: `src/app/eventos/page.tsx`
- Create: `src/app/contato/page.tsx`

- [ ] **Step 1: Criar src/app/a-casa/page.tsx**

```typescript
import type { Metadata } from 'next'
import { Gallery } from '@/components/sections/Gallery'

export const metadata: Metadata = { title: 'A Casa' }

const GALLERY_IMAGES = [
  { src: '/galeria/salao.jpg',     alt: 'Salão principal',    span: 'lg' as const },
  { src: '/galeria/prato.jpg',     alt: 'Prato do dia',       span: 'normal' as const },
  { src: '/galeria/vinhos.jpg',    alt: 'Vinhos',             span: 'normal' as const },
  { src: '/galeria/fachada.jpg',   alt: 'Fachada à noite',    span: 'wide' as const },
  { src: '/galeria/cozinha.jpg',   alt: 'Cozinha',            span: 'normal' as const },
]

export default function ACasaPage() {
  return (
    <>
      <div className="px-6 md:px-16 py-12 bg-bg">
        <div className="max-w-container mx-auto">
          <div className="font-mono text-xs uppercase tracking-widest text-fg-muted mb-2">
            Sobre nós
          </div>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-fg">
            A Casa
          </h1>
        </div>
      </div>

      <div className="px-6 md:px-16 pb-12 bg-bg">
        <div className="max-w-container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <p className="text-lg text-fg-subtle leading-relaxed mb-6">
              {/* Substituir pelo texto real do restaurante */}
              O Escritório de Bohemio fica em uma rua de casas baixas, com lampião na porta e
              gato na vitrine. A cozinha é pequena, o cardápio também — e tudo é feito na hora,
              com o que veio bom no dia.
            </p>
            <p className="text-base text-fg-subtle leading-relaxed">
              Um lugar quieto, com mesa de madeira, vinho aberto e gente que volta toda semana.
              Sem reserva, sem pressa.
            </p>
          </div>
          <div>
            <p className="text-base text-fg-subtle leading-relaxed">
              {/* Segundo parágrafo — história, fundadores, filosofia */}
              A cozinha do Bohemio é pequena por escolha. A gente não quer fazer mil pratos —
              quer fazer poucos bem feitos, no tempo certo, com os ingredientes certos.
            </p>
          </div>
        </div>
      </div>

      <Gallery images={GALLERY_IMAGES} />
    </>
  )
}
```

- [ ] **Step 2: Criar src/app/eventos/page.tsx**

```typescript
import type { Metadata } from 'next'
import { Button } from '@/components/ui/Button'
import { WHATSAPP_LINKS } from '@/lib/config'

export const metadata: Metadata = { title: 'Eventos' }

export default function EventosPage() {
  return (
    <>
      <div className="px-6 md:px-16 py-12 bg-bg">
        <div className="max-w-container mx-auto">
          <div className="font-mono text-xs uppercase tracking-widest text-fg-muted mb-2">
            Noites especiais
          </div>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-fg">
            Eventos
          </h1>
          <p className="text-lg text-fg-subtle mt-3 max-w-lg">
            Jantares temáticos, noites de vinho, comemorações. Espaço para criar memórias.
          </p>
        </div>
      </div>

      <div className="px-6 md:px-16 pb-16 bg-bg">
        <div className="max-w-container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-fg mb-4">
              Quer organizar algo aqui?
            </h2>
            <p className="text-base text-fg-subtle leading-relaxed mb-6">
              Fazemos noites temáticas, jantares especiais e eventos privativos para grupos.
              Fale com a gente pelo WhatsApp e a gente monta um cardápio e formato sob medida.
            </p>
            <a href={WHATSAPP_LINKS.eventos} target="_blank" rel="noopener noreferrer">
              <Button variant="primary">
                Falar sobre eventos no WhatsApp
              </Button>
            </a>
          </div>
          <div className="bg-cream-300 rounded-lg h-64 flex items-center justify-center text-fg-muted font-mono text-sm">
            {/* foto do espaço para eventos */}
            /galeria/evento.jpg
          </div>
        </div>
      </div>
    </>
  )
}
```

- [ ] **Step 3: Criar src/app/contato/page.tsx**

```typescript
import type { Metadata } from 'next'
import { Badge } from '@/components/ui/Badge'
import { WHATSAPP_LINKS } from '@/lib/config'

export const metadata: Metadata = { title: 'Contato' }

export default function ContatoPage() {
  return (
    <>
      <div className="px-6 md:px-16 py-12 bg-bg">
        <div className="max-w-container mx-auto">
          <div className="font-mono text-xs uppercase tracking-widest text-fg-muted mb-2">
            Onde estamos
          </div>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-fg">
            Contato
          </h1>
        </div>
      </div>

      <div className="px-6 md:px-16 pb-16 bg-bg">
        <div className="max-w-container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div>
              <div className="font-mono text-xs uppercase tracking-widest text-fg-muted mb-3">
                Endereço
              </div>
              <p className="text-base text-fg leading-relaxed">
                {/* Substituir pelo endereço real */}
                Rua das Palmeiras, 142<br />
                Sua cidade · Estado
              </p>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-accent-terra underline underline-offset-2 mt-2 inline-block hover:opacity-80 transition-opacity duration-instant"
              >
                Ver no mapa →
              </a>
            </div>

            <div>
              <div className="font-mono text-xs uppercase tracking-widest text-fg-muted mb-3">
                Horário
              </div>
              <p className="text-base text-fg leading-relaxed">
                Seg–Sex · 19h–23h<br />
                Sáb · 19h–01h
              </p>
              <div className="mt-3">
                <Badge variant="success">● Aberto agora</Badge>
              </div>
            </div>

            <div>
              <div className="font-mono text-xs uppercase tracking-widest text-fg-muted mb-3">
                WhatsApp
              </div>
              <a
                href={WHATSAPP_LINKS.geral}
                target="_blank"
                rel="noopener noreferrer"
                className="text-base text-fg hover:text-accent-terra transition-colors duration-instant"
              >
                Fale conosco →
              </a>
            </div>

            <div>
              <div className="font-mono text-xs uppercase tracking-widest text-fg-muted mb-3">
                Instagram
              </div>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-base text-fg hover:text-accent-terra transition-colors duration-instant"
              >
                @escritoriodebohemio →
              </a>
            </div>
          </div>

          <div className="rounded-lg overflow-hidden h-72 md:h-auto bg-cream-300">
            {/* Google Maps embed — substituir pela URL real */}
            <iframe
              src="https://maps.google.com/maps?q=sua+cidade&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '288px' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localização Escritório de Bohemio"
            />
          </div>
        </div>
      </div>
    </>
  )
}
```

- [ ] **Step 4: Verificar as três páginas no browser**

Abrir http://localhost:3000/a-casa, /eventos e /contato.

- [ ] **Step 5: Commit**

```bash
git add src/app/a-casa/ src/app/eventos/ src/app/contato/
git commit -m "feat: implement A Casa, Eventos and Contato pages"
```

---

## Task 11: Para Empresas page

**Files:**
- Create: `src/app/para-empresas/page.tsx`

- [ ] **Step 1: Implementar src/app/para-empresas/page.tsx**

```typescript
import type { Metadata } from 'next'
import { Button } from '@/components/ui/Button'
import { WHATSAPP_LINKS } from '@/lib/config'

export const metadata: Metadata = { title: 'Para Empresas' }

const SERVICOS = [
  {
    titulo: 'Refeições diárias',
    descricao: 'Almoço para refeitórios de empresas. Cardápio rotativo, entregue no horário combinado.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="10" cy="10" r="7"/>
        <path d="M10 7v3l2.5 2.5"/>
      </svg>
    ),
  },
  {
    titulo: 'Coffee break',
    descricao: 'Montagem completa de mesa com salgados, doces, café, sucos e bebidas para reuniões e treinamentos.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 10h8M6 14h8M4 6h12a2 2 0 010 4v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4a2 2 0 010-4z"/>
      </svg>
    ),
  },
  {
    titulo: 'Eventos corporativos',
    descricao: 'Confraternizações, lançamentos, comemorações. Cardápio personalizado e serviço no local.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 17l4.5-9 4.5 4.5 3-6L18 17H3z"/>
      </svg>
    ),
  },
]

const PASSOS = [
  {
    num: '1',
    titulo: 'Manda mensagem no WhatsApp',
    descricao: 'Conta quantas pessoas, qual o tipo de serviço (almoço, coffee break ou evento) e a data. A gente responde no mesmo dia.',
  },
  {
    num: '2',
    titulo: 'A gente manda o orçamento',
    descricao: 'Cardápio sugerido com preço por pessoa. Ajustamos conforme a sua necessidade.',
  },
  {
    num: '3',
    titulo: 'Confirmação e entrega',
    descricao: 'Após aprovação, combinamos o horário e o endereço. Chegamos pontualmente com tudo pronto.',
  },
]

export default function ParaEmpresasPage() {
  return (
    <>
      {/* HERO ESCURO */}
      <div className="bg-ink-900 py-16 px-6 md:px-16">
        <div className="max-w-container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="font-mono text-xs text-accent-mustard uppercase tracking-widest mb-4">
              Para Empresas
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-cream-50 tracking-tight leading-tight">
              A cozinha do Bohemio vai até você.
            </h1>
            <p className="text-base text-cream-300 mt-4 leading-relaxed max-w-md">
              Refeições para refeitórios, coffee breaks e eventos corporativos.
              Comida de verdade, feita na hora, entregue no seu endereço.
            </p>
            <div className="mt-8 flex flex-col gap-2 items-start">
              <a href={WHATSAPP_LINKS.paraEmpresas} target="_blank" rel="noopener noreferrer">
                <Button variant="primary" size="lg">
                  Solicitar orçamento no WhatsApp
                </Button>
              </a>
              <span className="font-mono text-xs text-ink-400">
                → abre conversa com mensagem pré-preenchida
              </span>
            </div>
          </div>
          <div className="bg-ink-700 rounded-lg h-64 flex items-center justify-center text-ink-400 font-mono text-sm">
            {/* foto do serviço de entrega/buffet */}
            /assets/para-empresas.jpg
          </div>
        </div>
      </div>

      {/* SERVIÇOS */}
      <div className="px-6 md:px-16 py-16 bg-bg">
        <div className="max-w-container mx-auto">
          <div className="font-mono text-xs uppercase tracking-widest text-fg-muted mb-2">
            O que oferecemos
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-fg mb-10">
            Três formas de levar o Bohemio à sua empresa
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {SERVICOS.map((s, i) => (
              <div key={i} className="bg-bg-paper rounded-lg p-6 border border-border">
                <div className="w-10 h-10 bg-accent-terra rounded-md flex items-center justify-center text-cream-50 mb-4">
                  {s.icon}
                </div>
                <h3 className="text-base font-bold text-fg mb-2">{s.titulo}</h3>
                <p className="text-sm text-fg-subtle leading-relaxed">{s.descricao}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* COMO FUNCIONA */}
      <div className="px-6 md:px-16 py-16 bg-bg-paper">
        <div className="max-w-container mx-auto">
          <div className="font-mono text-xs uppercase tracking-widest text-fg-muted mb-2">
            Como funciona
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-fg mb-10">
            Simples e direto
          </h2>
          <div className="divide-y divide-border max-w-2xl">
            {PASSOS.map((p, i) => (
              <div key={i} className="grid grid-cols-[48px_1fr] gap-5 py-6">
                <div className="w-9 h-9 rounded-full bg-ink-900 text-cream-50 flex items-center justify-center font-mono text-sm font-bold">
                  {p.num}
                </div>
                <div>
                  <div className="text-base font-bold text-fg">{p.titulo}</div>
                  <div className="text-sm text-fg-subtle mt-1 leading-relaxed">{p.descricao}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA FINAL */}
      <div className="bg-accent-terra px-6 md:px-16 py-16 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-cream-50 tracking-tight">
          Pronto para experimentar?
        </h2>
        <p className="text-base text-cream-50/75 mt-3">
          Orçamento sem compromisso, respondemos no mesmo dia.
        </p>
        <div className="mt-8 inline-flex flex-col items-center gap-2">
          <a href={WHATSAPP_LINKS.paraEmpresas} target="_blank" rel="noopener noreferrer">
            <Button variant="secondary" size="lg" className="bg-cream-50 text-accent-terra border-cream-50 hover:bg-cream-100">
              Solicitar orçamento no WhatsApp →
            </Button>
          </a>
          <span className="font-mono text-xs text-cream-50/50">
            abre o WhatsApp com mensagem pré-preenchida
          </span>
        </div>
      </div>
    </>
  )
}
```

- [ ] **Step 2: Verificar no browser — http://localhost:3000/para-empresas**

- [ ] **Step 3: Commit**

```bash
git add src/app/para-empresas/
git commit -m "feat: implement Para Empresas page with WhatsApp CTAs"
```

---

## Task 12: Deploy — ecosystem.config.js, Nginx e .env.example

> **Arquitetura real da VPS:** O servidor já usa um **Docker Nginx centralizado** (compartilhado com efte.com.br e konectasystem.com.br) nas portas 80/443. O Nginx do sistema não usa essas portas. O fluxo é: `Internet → Docker Nginx (80/443) → 172.18.0.1:3000 → PM2/Next.js no host`.

**Files:**
- Create: `ecosystem.config.js`
- Create: `nginx/bohemio.conf` _(template local — a config ativa já está na VPS)_
- Modify: `.env.example`
- Modify: `next.config.ts`

- [ ] **Step 1: Atualizar next.config.ts para build standalone**

```typescript
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    formats: ['image/avif', 'image/webp'],
  },
}

export default nextConfig
```

- [ ] **Step 2: Criar ecosystem.config.js**

```javascript
module.exports = {
  apps: [
    {
      name: 'bohemio-site',
      script: '.next/standalone/server.js',
      cwd: '/var/www/bohemio-site',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '512M',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
        HOSTNAME: '0.0.0.0',
        TZ: 'America/Sao_Paulo',
      },
    },
  ],
}
```

> `HOSTNAME: '0.0.0.0'` é necessário para o Docker Nginx alcançar o Next.js em `172.18.0.1:3000`.

- [ ] **Step 3: Criar nginx/bohemio.conf (referência local)**

Este arquivo é apenas referência. A config **ativa na VPS** já está em
`/opt/actions-runner/_work/portal-efte/portal-efte/nginx/conf.d/bohemio.conf`.

```nginx
# REFERÊNCIA — config ativa na VPS está no Docker Nginx
# /opt/actions-runner/_work/portal-efte/portal-efte/nginx/conf.d/bohemio.conf

# Fase 1 — HTTP apenas (antes do SSL)
server {
    listen 80;
    server_name escritoriodebohemio.com.br www.escritoriodebohemio.com.br;

    # Webroot para Certbot
    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }

    location / {
        proxy_pass         http://172.18.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header   Upgrade $http_upgrade;
        proxy_set_header   Connection 'upgrade';
        proxy_set_header   Host $host;
        proxy_set_header   X-Real-IP $remote_addr;
        proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header   X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}

# Fase 2 — HTTPS (ativar após certificado emitido pelo Certbot Docker)
# server {
#     listen 443 ssl;
#     server_name escritoriodebohemio.com.br www.escritoriodebohemio.com.br;
#
#     ssl_certificate     /etc/letsencrypt/live/escritoriodebohemio.com.br/fullchain.pem;
#     ssl_certificate_key /etc/letsencrypt/live/escritoriodebohemio.com.br/privkey.pem;
#
#     add_header X-Frame-Options "SAMEORIGIN";
#     add_header X-Content-Type-Options "nosniff";
#
#     location / {
#         proxy_pass         http://172.18.0.1:3000;
#         proxy_http_version 1.1;
#         proxy_set_header   Upgrade $http_upgrade;
#         proxy_set_header   Connection 'upgrade';
#         proxy_set_header   Host $host;
#         proxy_set_header   X-Real-IP $remote_addr;
#         proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
#         proxy_set_header   X-Forwarded-Proto $scheme;
#         proxy_cache_bypass $http_upgrade;
#     }
# }
```

- [ ] **Step 4: Atualizar .env.example**

```bash
# .env.example — copie para .env.local (dev) ou .env.production (VPS)
# Nunca commitar arquivos .env com valores reais

DATABASE_URL="postgresql://bohemio_user:SENHA@localhost:5432/bohemio_site"
TZ="America/Sao_Paulo"
NODE_ENV="development"
WHATSAPP_NUMBER="5567998973649"
```

- [ ] **Step 5: Verificar build de produção localmente**

```bash
npm run build
```

Esperado: build completo sem erros de TypeScript. Confirmar que `.next/standalone/server.js` foi gerado.

- [ ] **Step 6: Commit**

```bash
git add ecosystem.config.js nginx/ next.config.ts .env.example
git commit -m "feat: add PM2 ecosystem config and Nginx reference template for Docker proxy setup"
```

---

## Task 13: Deploy na VPS

_Executar via SSH na VPS, após DNS propagar para o IP da Hostinger._

- [ ] **Step 1: Copiar o projeto para a VPS**

Na máquina local (escolher uma opção):

```bash
# Opção A — repositório Git privado (recomendado)
git remote add origin https://github.com/SEU_USUARIO/bohemio-site.git
git push -u origin main
# Na VPS: git clone https://github.com/SEU_USUARIO/bohemio-site.git /var/www/bohemio-site

# Opção B — SCP direto (substituir USER e VPS_IP)
scp -r "D:/CLIENTES/ESCRITORIO DE BOHEMIO/site/." USER@VPS_IP:/var/www/bohemio-site/
```

- [ ] **Step 2: Na VPS — instalar dependências e buildar**

```bash
cd /var/www/bohemio-site
npm ci --omit=dev
npx prisma generate
npm run build
```

- [ ] **Step 3: Na VPS — copiar assets estáticos para o standalone**

```bash
cd /var/www/bohemio-site
cp -r public .next/standalone/public
cp -r .next/static .next/standalone/.next/static
```

- [ ] **Step 4: Na VPS — iniciar com PM2**

```bash
cd /var/www/bohemio-site
pm2 start ecosystem.config.js
pm2 save
pm2 startup   # executar o comando que ele mostrar
```

Verificar que está rodando na porta 3000:

```bash
pm2 list
curl http://localhost:3000
```

Esperado: HTML da home do Escritório de Bohemio.

- [ ] **Step 5: Verificar que o Docker Nginx está roteando**

Abrir http://escritoriodebohemio.com.br no browser (HTTP, antes do SSL).
Esperado: site carrega normalmente através do Docker Nginx → 172.18.0.1:3000.

- [ ] **Step 6: Na VPS — emitir certificado SSL via Docker Certbot**

_Executar somente após o DNS propagar e o Step 5 confirmar que o site HTTP funciona._

```bash
docker exec -it $(docker ps -q -f name=certbot) certbot certonly \
  --webroot -w /var/www/certbot \
  -d escritoriodebohemio.com.br \
  -d www.escritoriodebohemio.com.br
```

Esperado: `Successfully received certificate.`

- [ ] **Step 7: Na VPS — ativar HTTPS no bohemio.conf**

Editar `/opt/actions-runner/_work/portal-efte/portal-efte/nginx/conf.d/bohemio.conf`:

1. No bloco `server { listen 80; }` — substituir o `location /` pelo redirect:
   ```nginx
   location / { return 301 https://$host$request_uri; }
   ```
2. Descomentar o bloco `server { listen 443 ssl; }` completo

Recarregar o Docker Nginx:

```bash
docker exec nginx nginx -s reload
```

- [ ] **Step 8: Verificar o site em produção**

Abrir https://escritoriodebohemio.com.br. Confirmar:
- [ ] HTTPS ativo (cadeado verde)
- [ ] Redirect HTTP → HTTPS funcionando
- [ ] Hero com prato do dia correto para o dia da semana atual
- [ ] Todas as 6 páginas navegáveis
- [ ] Botão WhatsApp abre conversa para `5567998973649`

- [ ] **Step 9: Commit de encerramento**

```bash
git add .
git commit -m "chore: production deploy complete on Hostinger VPS with Docker Nginx"
```

---

## Checklist de conteúdo real (preencher antes do deploy)

Antes do deploy, substituir os placeholders com dados reais do restaurante:

- [ ] `public/assets/logo.png` — logo oficial do restaurante
- [ ] `public/pratos-do-dia/segunda.jpg` até `sabado.jpg` — fotos dos pratos
- [ ] `public/galeria/` — fotos do salão, cozinha, fachada, pratos
- [ ] `WHATSAPP_NUMBER` no `.env.production` da VPS — número real
- [ ] Endereço real em `Footer.tsx` e `contato/page.tsx`
- [ ] Horário real em `Footer.tsx` e `contato/page.tsx`
- [ ] URL do Google Maps embed em `contato/page.tsx`
- [ ] Textos de A Casa (`a-casa/page.tsx`) — história real do restaurante
- [ ] Preços reais do cardápio em `cardapio/page.tsx` e `page.tsx`
- [ ] Instagram URL real em `Footer.tsx` e `contato/page.tsx`
