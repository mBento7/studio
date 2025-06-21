<div align="center">
  <h1>WhosDo.com - Sua Identidade Digital Profissional</h1>
  <p>Uma plataforma de identidade digital onde profissionais, freelancers e criadores de conteúdo mostram seu trabalho, serviços e habilidades em um único hub central.</p>

  <!-- Badges -->
  <p>
    <img src="https://img.shields.io/badge/Next.js-14-black.svg?style=flat-square&logo=next.js" alt="Next.js 14">
    <img src="https://img.shields.io/badge/React-18-blue.svg?style=flat-square&logo=react" alt="React 18">
    <img src="https://img.shields.io/badge/TypeScript-5-blue.svg?style=flat-square&logo=typescript" alt="TypeScript 5">
    <img src="https://img.shields.io/badge/Tailwind_CSS-3-38B2AC.svg?style=flat-square&logo=tailwind-css" alt="Tailwind CSS 3">
    <img src="https://img.shields.io/badge/Supabase-DB_%26_Auth-3ECF8E.svg?style=flat-square&logo=supabase" alt="Supabase">
    <img src="https://img.shields.io/badge/eslint-8-4B32C3.svg?style=flat-square&logo=eslint" alt="ESLint">
  </p>
</div>

---

## 📚 Tabela de Conteúdos

1.  [**Visão Geral do Projeto**](#-visão-geral-do-projeto)
2.  [**Funcionalidades Chave**](#-funcionalidades-chave)
3.  [**Filosofia da Arquitetura**](#-filosofia-da-arquitetura)
4.  [**Estrutura do Projeto**](#-estrutura-do-projeto)
5.  [**Tecnologias**](#️-tecnologias-utilizadas)
6.  [**Começando**](#-começando)
7.  [**Scripts Disponíveis**](#-scripts-disponíveis)
8.  [**Documentação Estratégica**](#-documentação-estratégica)

---

## 🚀 Visão Geral do Projeto

O **WhosDo.com** foi projetado para ser um hub central onde usuários criam um perfil público dinâmico, compartilham atualizações em um feed, oferecem cupons e interagem com uma comunidade profissional. A plataforma é construída com uma mentalidade de "API-first", "colocation" de componentes e inclui funcionalidades de gamificação e monetização para impulsionar o engajamento e o crescimento.

## ✨ Funcionalidades Chave

*   **Autenticação de Usuários:** Cadastro e login seguros com provedores como Google via Supabase.
*   **Perfis Públicos Dinâmicos (`/profile/[username]`):** Páginas de perfil personalizáveis e otimizadas para SEO, com dados servidos pelo Supabase.
*   **Feed de Notícias Interativo:**
    *   **Stories:** Conteúdo efêmero para engajamento rápido.
    *   **Feed de Conteúdo:** Posts em alta, novidades e recomendações.
    *   **Ações Rápidas:** Atalhos para criar cupons, anúncios e outros conteúdos.
*   **Dashboard de Gerenciamento (`/dashboard`):**
    *   **Meu Perfil:** Preview do perfil e painel de conquistas (gamificação).
    *   **Editor Visual:** Ferramentas para personalizar aparência e conteúdo.
    *   **Gestão da Conta:** Planos, assinaturas, moedas e segurança.
    *   **Programa de Indicações:** Sistema para convidar amigos e ganhar recompensas.

---

## 🏛️ Filosofia da Arquitetura

A estrutura do projeto foi pensada para máxima organização, escalabilidade e manutenibilidade, seguindo as melhores práticas do Next.js App Router.

*   **Agrupamento de Rotas (Route Groups):** Utilizamos `(app)` e `(public)` para separar logicamente as seções da aplicação, permitindo layouts distintos sem afetar a URL.
*   **Colocation de Componentes:** Em vez de uma pasta monolítica `/components`, movemos os componentes para perto das rotas que os utilizam (ex: `app/(app)/dashboard/components`). Isso torna o código mais modular e fácil de navegar.
*   **Componentes de UI desacoplados:** Componentes reutilizáveis de baixo nível (Botões, Cards, etc.) residem em `src/components/ui`, tratando-os como uma biblioteca interna.
*   **Tipagem Estrita:** O TypeScript é usado em todo o projeto para garantir a segurança dos tipos e melhorar a experiência de desenvolvimento.

## 📁 Estrutura do Projeto

A estrutura de arquivos reflete nossa filosofia de arquitetura, com foco em "colocation" e uma camada de serviços clara.

```
src
├── app/
│   ├── (app)/                  # Rotas privadas (requerem autenticação)
│   ├── (auth)/                 # Rotas de autenticação (login, signup)
│   └── (public)/               # Rotas públicas (home, perfis)
│
├── components/
│   ├── common/                 # Componentes globais (Logo, etc.)
│   └── ui/                     # Componentes da biblioteca de UI (Shadcn)
│
├── docs/                       # Documentação estratégica do projeto
│
├── hooks/                      # Hooks React customizados (ex: useAuth)
│
├── lib/                        # Funções utilitárias, tipos e configurações
│   └── supabase/               # Clientes Supabase (client, server, middleware)
│
└── services/                   # Camada de abstração de API (ex: profile.service.ts)
```

---

## 🛠️ Tecnologias Utilizadas

*   **Framework:** **Next.js 14** (App Router, Turbopack)
*   **Backend & Banco de Dados:** **Supabase** (PostgreSQL, Auth, Storage)
*   **Linguagem:** **TypeScript**
*   **Estilização:** **Tailwind CSS**
*   **Componentes UI:** **Shadcn/UI** (construído sobre Radix UI)
*   **Ícones:** **Lucide React**
*   **Linting:** **ESLint** e **Prettier** para consistência de código.

---

## 🚀 Começando

Siga os passos abaixo para executar o projeto em seu ambiente local.

1.  **Clone o Repositório**
    ```bash
    git clone [URL_DO_SEU_REPOSITÓRIO]
    cd [NOME_DA_PASTA]
    ```

2.  **Instale as Dependências**
    ```bash
    pnpm install
    ```

3.  **Configure as Variáveis de Ambiente**
    Crie um arquivo `.env.local` na raiz do projeto e preencha com as credenciais do seu projeto Supabase:
    ```env
    # Credenciais do Supabase
    NEXT_PUBLIC_SUPABASE_URL=SUA_URL_DO_PROJETO_AQUI
    NEXT_PUBLIC_SUPABASE_ANON_KEY=SUA_CHAVE_ANONIMA_AQUI
    ```

4.  **Execute o Servidor de Desenvolvimento**
    ```bash
    pnpm dev
    ```
    A aplicação estará disponível em `http://localhost:3000` (ou na porta definida).

---

## ⚙️ Scripts Disponíveis

*   `npm run dev`: Inicia o servidor de desenvolvimento com Next.js e Turbopack.
*   `npm run build`: Gera a build de produção otimizada.
*   `npm run start`: Inicia um servidor de produção a partir da build gerada.
*   `npm run lint`: Executa o ESLint para encontrar e corrigir problemas no código.

---

## 📈 Documentação Estratégica

Este projeto é guiado por uma documentação estratégica detalhada para garantir alinhamento e visão de longo prazo.

*   **[Plano de Arquitetura e Refatoração](../../docs/architectural-refactoring-plan.md):** Descreve as fases da evolução da nossa base de código.
*   **[Guia de Infraestrutura e Operações](../../docs/infrastructure-and-operations-guide.md):** Documenta a configuração de servidores, Supabase e o processo de deploy.

---

<div align="center">
  <p>README aperfeiçoado para refletir a arquitetura e visão do projeto. Sinta-se à vontade para expandi-lo.</p>
</div>

export interface SocialLink {
  id: string;
  profile_id: string;
  platform: string;
  url: string;
}

## 🌐 Exemplos de Rotas

- `/search` — Busca pública de profissionais/serviços (acesso livre)
- `/profile/[username]` — Perfil público de qualquer usuário (acesso livre)
- `/dashboard/feed` — Feed privado, exclusivo para usuários logados

> **Nota:** Rotas privadas (como `/dashboard/*`) devem ser protegidas por autenticação. Utilize middleware ou lógica no componente para garantir o acesso apenas de usuários autenticados.

## 🛡️ Recomendações de Melhoria Contínua

1. **Proteção de Rotas Privadas**
   - Garanta que rotas como `/dashboard/feed` e demais rotas privadas exijam autenticação, usando middleware ou lógica no componente.
   - Redirecione usuários não autenticados para a página de login.

2. **Padronização de Layouts**
   - Use layouts distintos para rotas públicas e privadas, reforçando visualmente o contexto do usuário.
   - Extraia cabeçalhos, sidebars e rodapés em componentes reutilizáveis.

3. **URLs Amigáveis e Consistentes**
   - Evite rotas profundas desnecessárias.
   - Garanta que rotas dinâmicas (ex: `/profile/[username]`) tratem casos de usuários inexistentes.

4. **Documentação de Componentes**
   - Adicione/atualize `README.md` em subpastas importantes explicando a função de cada componente ou feature.
   - Inclua exemplos de uso dos principais componentes.

5. **Testes**
   - Implemente testes automatizados para rotas públicas/privadas e componentes críticos.

6. **Acessibilidade e SEO**
   - Garanta acessibilidade (uso de ARIA, navegação por teclado, contraste, etc.) nas páginas públicas.
   - Adicione meta tags, títulos e descrições adequadas para SEO.

7. **Performance**
   - Use lazy loading para componentes pesados.
   - Otimize imagens (formatos modernos, compressão, etc.).

8. **Rotas Futuras**
   - Implemente página 404 customizada.
   - Adicione rotas públicas para termos de uso e política de privacidade.

> Siga essas recomendações para manter o projeto escalável, seguro e fácil de evoluir!
