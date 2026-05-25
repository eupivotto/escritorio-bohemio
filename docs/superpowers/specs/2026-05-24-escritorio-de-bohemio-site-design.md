# Escritório de Bohemio — Site · Design Spec

_Criado em 2026-05-24_

---

## Visão geral

Site institucional para o restaurante **Escritório de Bohemio**, com identidade visual minimalista/clean, paleta de cremes quentes e espresso. Foco em apresentar o restaurante, o cardápio e o serviço de atendimento externo para empresas.

---

## Stack

| Camada | Tecnologia |
|--------|-----------|
| Framework | Next.js 14+ com App Router |
| Estilo | Tailwind CSS v3 + tokens CSS do design system |
| Banco de dados | PostgreSQL + Prisma ORM |
| Deploy | PM2 + Nginx na VPS Hostinger |
| Fontes | Hanken Grotesk + JetBrains Mono (Google Fonts) |

---

## Páginas

| Rota | Página | Descrição |
|------|--------|-----------|
| `/` | Home | Hero com prato do dia, prévia do cardápio, galeria, depoimentos |
| `/cardapio` | Cardápio | Prato do dia destacado, filtros por categoria, listagem completa |
| `/a-casa` | A Casa | História do restaurante, galeria do salão e cozinha |
| `/eventos` | Eventos | Noites especiais, jantares temáticos, CTA WhatsApp |
| `/para-empresas` | Para Empresas | Serviços de catering corporativo, CTA WhatsApp |
| `/contato` | Contato | Endereço, horário, mapa, links WhatsApp e Instagram |

---

## Arquitetura

### Estrutura de pastas

```
src/
├── app/
│   ├── layout.tsx             # Root layout (Header + Footer)
│   ├── page.tsx               # Home
│   ├── cardapio/page.tsx
│   ├── a-casa/page.tsx
│   ├── eventos/page.tsx
│   ├── para-empresas/page.tsx
│   └── contato/page.tsx
├── components/
│   ├── ui/                    # Atoms: Button, Badge, Modal
│   ├── layout/                # Header, Footer
│   └── sections/              # Seções reutilizáveis de página
├── lib/
│   └── db.ts                  # Prisma client singleton
└── styles/
    └── globals.css            # Tokens CSS + base styles
```

### Assets públicos

```
public/
├── pratos-do-dia/
│   ├── segunda.jpg            # Seg + Dom (domingo reutiliza segunda)
│   ├── terca.jpg
│   ├── quarta.jpg
│   ├── quinta.jpg
│   ├── sexta.jpg
│   └── sabado.jpg
├── assets/
│   └── logo.png               # Logo oficial
└── galeria/                   # Fotos do salão, cozinha, equipe
```

---

## Funcionalidade principal: Prato do dia automático

O hero da Home e o destaque do Cardápio exibem a foto e o nome do prato do dia, detectados automaticamente pelo dia da semana no servidor.

### Lógica de mapeamento

```
Domingo  (0) → segunda.jpg   ← antecipa o prato da semana seguinte
Segunda  (1) → segunda.jpg
Terça    (2) → terca.jpg
Quarta   (3) → quarta.jpg
Quinta   (4) → quinta.jpg
Sexta    (5) → sexta.jpg
Sábado   (6) → sabado.jpg
```

### Implementação

- O mapeamento vive em `lib/prato-do-dia.ts` — retorna `{ imagem, diaNome }`
- Usado em Server Components: `app/page.tsx` (hero) e `app/cardapio/page.tsx` (destaque)
- O fuso horário `America/Sao_Paulo` é configurado na VPS via variável de ambiente `TZ=America/Sao_Paulo`
- Nenhuma query ao banco — só resolução de arquivo estático

---

## Design system

Tokens aplicados via `globals.css` e mapeados no `tailwind.config.ts`.

### Cores

| Token | Hex | Uso |
|-------|-----|-----|
| `--cream-200` | `#EAE3CB` | Fundo padrão do site (Linen) |
| `--cream-50` | `#FAF6E9` | Fundo de seções de destaque (Paper) |
| `--ink-900` | `#1E1A0F` | Texto, fundo escuro (Espresso) |
| `--ink-700` | `#3A3527` | Texto secundário |
| `--ink-400` | `#8A8369` | Texto muted, labels |
| `--accent-terra` | `#B5532C` | CTA primário (único por página) |
| `--accent-mustard` | `#C99320` | Destaques, badges especiais |
| `--accent-olive` | `#7A7A2E` | Badges vegetariano |

### Tipografia

| Uso | Família | Peso | Tamanho |
|-----|---------|------|---------|
| Display/Hero | Hanken Grotesk | 700 | 64–96px |
| H2 | Hanken Grotesk | 700 | 44px |
| H3 | Hanken Grotesk | 500 | 28px |
| Body | Hanken Grotesk | 400 | 17px |
| Preços, datas, labels | JetBrains Mono | 500 | variável |

### Componentes UI

| Componente | Variantes |
|-----------|-----------|
| Button | primary (terracotta), secondary (outline), ghost |
| Badge | success, warning, danger, neutral, outline, accent, filter |
| Header | default, scrolled (fundo + sombra ao rolar) |
| Footer | fundo espresso, 4 colunas |
| Modal | via `<dialog>` nativo, overlay espresso |

### Guidelines obrigatórias

1. **Um único botão primary (terracotta) por página**
2. **Sem gradientes** — cores chapadas, profundidade via sombras
3. **Sem emoji** — usar SVGs traçados ou bullets mono (●, →, ·)
4. **Mono para dados**: preços, horários, endereços, datas
5. **Motion calmo**: ease-out, sem bounce
6. **Imagens com luz quente**: +temperatura para casar com a paleta

---

## Páginas em detalhe

### Home (`/`)

**Seções em ordem:**
1. Header sticky (blur ao rolar)
2. Hero — foto do prato do dia (auto) + título + botões "Ver cardápio" e "A casa →"
3. Prévia do cardápio — 3 pratos + link "Ver cardápio completo →"
4. Galeria — grid assimétrico (2fr 1fr 1fr / 160px 160px)
5. Depoimentos — 1 grande + 3 menores em grid
6. Footer

### Cardápio (`/cardapio`)

**Seções em ordem:**
1. Header
2. Page hero — título "Cardápio" + subtítulo
3. Destaque prato do dia — card fundo espresso, foto automática + nome + preço
4. Filtros — badges: Todos · Pratos · Guarnições · Bebidas
5. Seção Pratos — lista com nome, descrição, badges dieta, preço mono
6. Seção Guarnições — mesma estrutura
7. Seção Bebidas — grid de cards (água, refrigerante, cerveja)
8. Footer

**Categorias do cardápio:**
- **Pratos**: prato do dia (automático), opção vegetariana, marmita para viagem
- **Guarnições**: arroz, feijão, salada da estação, pão de fermentação
- **Bebidas**: água (com/sem gás), refrigerante (lata), cerveja (long neck)

_Conteúdo real (nomes, descrições, preços) fornecido pelo cliente antes da implementação._

### A Casa (`/a-casa`)

**Seções em ordem:**
1. Header
2. Page hero — título "A Casa" + subtítulo
3. Texto de história — 2–3 parágrafos sobre a origem do restaurante
4. Galeria completa do salão e cozinha
5. Footer

### Eventos (`/eventos`)

**Seções em ordem:**
1. Header
2. Page hero — título "Eventos"
3. Descrição de noites especiais e jantares temáticos
4. CTA WhatsApp — "Quer organizar algo aqui? Fale com a gente"
5. Footer

### Para Empresas (`/para-empresas`)

**Seções em ordem:**
1. Header
2. Hero fundo espresso — título + subtítulo + botão WhatsApp grande
3. Três cards de serviço: Refeições diárias · Coffee break · Eventos corporativos
4. Como funciona — 3 passos: WhatsApp → orçamento → entrega
5. CTA band terracotta — chamada final + botão WhatsApp
6. Footer

**Botão WhatsApp**: abre `https://wa.me/55XXXXXXXXXXX?text=Olá!%20Gostaria%20de%20um%20orçamento%20para%20atendimento%20externo.` com mensagem pré-preenchida.
_O número de WhatsApp do restaurante deve ser fornecido antes da implementação e configurado em `lib/config.ts` como constante `WHATSAPP_NUMBER`._

### Contato (`/contato`)

**Seções em ordem:**
1. Header
2. Page hero — título "Contato"
3. Grid: endereço completo + horário de funcionamento + WhatsApp + Instagram
4. Embed Google Maps (iframe)
5. Footer

---

## Banco de dados

### Estratégia de isolamento

O projeto usa um **banco PostgreSQL totalmente separado** dos demais projetos da VPS. Isso garante que nenhuma tabela, usuário ou conexão do Bohemio interfere com outros bancos existentes.

| Item | Valor |
|------|-------|
| Database | `bohemio_site` |
| Usuário | `bohemio_user` |
| Senha | definida na criação (não versionada) |
| Permissões | acesso restrito apenas ao banco `bohemio_site` |
| Porta | 5432 (padrão PostgreSQL, acesso apenas local) |

### Comandos de criação na VPS (executar como `postgres`)

```sql
CREATE DATABASE bohemio_site;
CREATE USER bohemio_user WITH ENCRYPTED PASSWORD 'SENHA_FORTE';
GRANT ALL PRIVILEGES ON DATABASE bohemio_site TO bohemio_user;
-- Sem acesso a outros bancos existentes
```

### Estratégia inicial do schema

PostgreSQL conectado via Prisma, mas **sem tabelas funcionais no v1** — o site é 100% estático. O `schema.prisma` é gerado vazio com comentário indicando onde adicionar modelos futuros (leads de Para Empresas, cardápio gerenciável, etc.).

---

## Deploy na VPS Hostinger

### Domínio

- Domínio: `escritoriodebohemio.com.br`
- Registrado em: Registro.br
- DNS: apontado para o IP da VPS Hostinger via registros A no Registro.br

### Stack de servidor

```
[Internet]
    ↓
Nginx (porta 80 → redirect 443 / porta 443 com SSL)
    ↓
PM2 → Next.js (porta 3000, bind 127.0.0.1)
    ↓
PostgreSQL (porta 5432, acesso local apenas — isolado dos outros projetos)
```

### Configuração Nginx (`/etc/nginx/sites-available/bohemio`)

```nginx
server {
    listen 80;
    server_name escritoriodebohemio.com.br www.escritoriodebohemio.com.br;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    server_name escritoriodebohemio.com.br www.escritoriodebohemio.com.br;

    # SSL via Certbot (Let's Encrypt)
    ssl_certificate     /etc/letsencrypt/live/escritoriodebohemio.com.br/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/escritoriodebohemio.com.br/privkey.pem;

    location / {
        proxy_pass         http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header   Upgrade $http_upgrade;
        proxy_set_header   Connection 'upgrade';
        proxy_set_header   Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### Configuração PM2 (`ecosystem.config.js`)

```js
module.exports = {
  apps: [{
    name: 'bohemio-site',
    script: 'node_modules/.bin/next',
    args: 'start',
    cwd: '/var/www/bohemio-site',
    env: {
      NODE_ENV: 'production',
      PORT: 3000,
      TZ: 'America/Sao_Paulo',
    }
  }]
}
```

### Variáveis de ambiente (`.env.production` — não versionado)

```
DATABASE_URL="postgresql://bohemio_user:SENHA_FORTE@localhost:5432/bohemio_site"
TZ="America/Sao_Paulo"
NODE_ENV="production"
WHATSAPP_NUMBER="55XXXXXXXXXXX"
```

### Arquivos de configuração do projeto

- `ecosystem.config.js` — configuração PM2 (versionado, sem secrets)
- `nginx/bohemio.conf` — template do virtual host (versionado, sem secrets)
- `.env.production` — variáveis com secrets (não versionado, `.gitignore`)
- `.env.example` — template vazio (versionado, documenta as variáveis necessárias)

---

## Decisões fora do escopo do v1

- Painel admin para editar cardápio
- Sistema de reservas
- Captação de leads no banco
- Tema escuro
- Internacionalização
- Newsletter

_Estas funcionalidades podem ser adicionadas em fases futuras sem reescrever a base._
