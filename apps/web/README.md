<div align="center">
  <h1>Whosfy.com - Sua Identidade Digital Profissional</h1>
  <p>Uma plataforma de identidade digital onde profissionais, freelancers e criadores de conteúdo mostram seu trabalho, serviços e habilidades em um único hub central.</p>
  <p>
    <img src="https://img.shields.io/badge/Next.js-15-black.svg?style=flat-square&logo=next.js" alt="Next.js 15">
    <img src="https://img.shields.io/badge/React-18-blue.svg?style=flat-square&logo=react" alt="React 18">
    <img src="https://img.shields.io/badge/TypeScript-5-blue.svg?style=flat-square&logo=typescript" alt="TypeScript 5">
    <img src="https://img.shields.io/badge/Tailwind_CSS-3-38B2AC.svg?style=flat-square&logo=tailwind-css" alt="Tailwind CSS 3">
    <img src="https://img.shields.io/badge/Supabase-DB_%26_Auth-3ECF8E.svg?style=flat-square&logo=supabase" alt="Supabase">
    <img src="https://img.shields.io/badge/eslint-8-4B32C3.svg?style=flat-square&logo=eslint" alt="ESLint">
  </p>
  <p>
    <b>Última revisão:</b> 10/07/2025 &nbsp;|&nbsp; <b>Responsável:</b> Micael Bento
  </p>
</div>

---

## 📚 Tabela de Conteúdos

1.  [Visão Geral do Projeto](#-visão-geral-do-projeto)
2.  [Funcionalidades Chave](#-funcionalidades-chave)
3.  [Filosofia da Arquitetura](#-filosofia-da-arquitetura)
4.  [Estrutura do Projeto](#-estrutura-do-projeto)
5.  [Tecnologias](#️-tecnologias-utilizadas)
6.  [Começando](#-começando)
7.  [Scripts Disponíveis](#-scripts-disponíveis)
8.  [Documentação Estratégica](#-documentação-estratégica)
9.  [Troubleshooting](#-troubleshooting)

---

## 🚀 Visão Geral do Projeto

O **Whosfy.com** é o app principal do monorepo, gerenciado via workspaces do pnpm. Ele deve ser rodado sempre com o filtro `--filter nextn` para garantir o correto funcionamento dos scripts e dependências.

## ✨ Funcionalidades Chave

*   **Autenticação de Usuários:** Cadastro e login seguros com provedores como Google via Supabase.
*   **Perfis Públicos Dinâmicos (`/profile/[username]`):** Páginas de perfil personalizáveis e otimizadas para SEO, com dados servidos pelo Supabase.
*   **Feed de Notícias Interativo:** Stories, feed de conteúdo, cupons, anúncios e recomendações.
*   **Dashboard de Gerenciamento:** Editor visual, conquistas, planos, moedas, indicações e mais.

---

## 🏛️ Filosofia da Arquitetura

- **Route Groups:** Separação lógica de rotas públicas, privadas e de autenticação.
- **Colocation de Componentes:** Componentes próximos das rotas que os utilizam.
- **UI desacoplada:** Componentes reutilizáveis em `src/components/ui`.
- **TypeScript estrito.**

## 📁 Estrutura do Projeto

Veja a estrutura detalhada no [README principal](../../README.md) e no [índice de documentação](../../docs/README.md).

---

## 🛠️ Tecnologias Utilizadas

- **Framework:** Next.js 15 (App Router, Turbopack)
- **Backend & Banco de Dados:** Supabase
- **Linguagem:** TypeScript
- **Estilização:** Tailwind CSS
- **Componentes UI:** Shadcn/UI
- **Ícones:** Lucide React
- **Linting:** ESLint e Prettier

---

## 🚀 Começando

> Requer [pnpm](https://pnpm.io/) instalado globalmente. Instale com:
> ```bash
> npm install -g pnpm
> ```

1. **Instale as dependências (na raiz do monorepo):**
   ```bash
   pnpm install
   ```
2. **Configure as variáveis de ambiente:**
   Crie um arquivo `.env.local` na raiz do projeto e preencha com as credenciais do Supabase.
3. **Execute o servidor de desenvolvimento:**
   ```bash
   pnpm --filter nextn dev
   ```
4. **(Opcional) Rode o Storybook:**
   ```bash
   pnpm --filter nextn storybook
   ```

---

## ⚙️ Scripts Disponíveis

- `pnpm --filter nextn dev`: Inicia o servidor de desenvolvimento
- `pnpm --filter nextn build`: Build de produção
- `pnpm --filter nextn start`: Servidor de produção
- `pnpm --filter nextn lint`: Lint do código
- `pnpm --filter nextn storybook`: Storybook (se configurado)

---

## 📈 Documentação Estratégica

- [README principal do monorepo](../../README.md)
- [Índice de documentação](../../docs/README.md)
- [Guia de infraestrutura](../../docs/infraestrutura/infrastructure-and-operations-guide.md)

---

## 🛟 Troubleshooting
- **Erro: pnpm não encontrado**
  - Instale globalmente: `npm install -g pnpm`
- **Erro: Cannot read properties of null (reading 'matches')**
  - Sempre use `pnpm install` na raiz do projeto, nunca `npm install`.
- **Problemas com dependências ou lockfile**
  - Limpe tudo: `rd /s /q node_modules && del pnpm-lock.yaml && pnpm store prune && pnpm install`
- **Storybook não inicia**
  - Verifique se o script está presente no `package.json` do app e se todas as dependências do Storybook estão alinhadas.

---

<div align="center">
  <p>README atualizado automaticamente para refletir as melhores práticas do monorepo e facilitar o onboarding.</p>
</div>

## Histórico de revisões

- Atualização rápida: 10/07/2025
