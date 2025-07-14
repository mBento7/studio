# 🧭 Roteiro de Reestruturação do Projeto Whosfy

Este documento serve como guia para a reestruturação completa do projeto **Whosfy**, com foco em escalabilidade, manutenibilidade e alinhamento com boas práticas modernas de desenvolvimento.

---

## ✅ Objetivo

Promover a estrutura do repositório de dentro de `studio-clone/` para a raiz `whosfy/`, organizando as pastas e arquivos segundo uma arquitetura modular e escalável para apps web modernos com suporte a futuras expansões.

---

## 🛠 Etapas do Processo

### 1. Migrar conteúdo de `studio-clone/` para a raiz do projeto

Inicialmente, tentou-se mover o conteúdo de `studio-clone/` para a raiz. Foram encontrados obstáculos devido a arquivos e diretórios existentes na raiz (`node_modules`, `.vscode`, `package.json`, `package-lock.json`, `.gitignore`). As seguintes ações foram tomadas:

-   Remoção de `node_modules` e `.vscode` da raiz para evitar conflitos:
    ```bash
    rm -r -force node_modules
    rm -r -force .vscode
    ```
-   Remoção de `package.json`, `package-lock.json` e `.gitignore` da raiz para permitir a movimentação dos arquivos da `studio-clone/`:
    ```bash
    rm -force package.json package-lock.json .gitignore
    ```
-   Movimentação de todo o conteúdo (incluindo arquivos ocultos como `.git/`) de `studio-clone/` para a raiz:
    ```bash
    Move-Item -Path studio-clone\* -Destination .
    Move-Item -Path studio-clone/.git -Destination .
    ```
-   Remoção do diretório `studio-clone/` vazio:
    ```bash
    rmdir studio-clone
    ```

> Certifique-se de **preservar a pasta `.git/`** corretamente. A `package-lock.json` da `studio-clone/` foi movida para a raiz.

### 2. Configurar `pnpm-workspace.yaml`

Este arquivo foi criado na raiz do projeto para definir o monorepo:

```yaml
packages:
  - apps/*
  - packages/*
```

> Essencial para o gerenciamento de monorepo com `pnpm`.

### 3. Criar e Ajustar `package.json` na Raiz

O `package.json` original da raiz foi removido. Um novo `package.json` foi criado na raiz para gerenciar o monorepo e scripts globais. O `package.json` da `apps/web/` (`name: "whosfy-web"`) foi atualizado.

```json
{
  \"name\": \"whosfy\",
  \"version\": \"1.0.0\",
  \"description\": \"Monorepo para o projeto WhosDo.com\",
  \"private\": true,
  \"scripts\": {
    \"dev\": \"pnpm --filter whosfy-web dev\",
    \"build\": \"pnpm --filter whosfy-web build\",
    \"lint\": \"pnpm --filter whosfy-web lint\",
    \"start\": \"pnpm --filter whosfy-web start\",
    \"clean\": \"pnpm recursive exec rm -rf node_modules .next\",
    \"full-clean\": \"pnpm recursive exec rm -rf node_modules .next && rm -f pnpm-lock.yaml && pnpm cache clean --force\"
  },
  \"keywords\": [],
  \"author\": \"\",
  \"license\": \"ISC\"
}
```

> O script `dev` foi ajustado para `--filter whosfy-web` para corresponder ao nome do pacote em `apps/web/package.json`.

### 4. Refatorar `src/features/` para estrutura modular

A pasta `apps/web/src/features/public/` foi descontinuada. Seus conteúdos foram realocados para módulos específicos, garantindo uma estrutura mais coesa:

-   Conteúdo de `apps/web/src/features/public/` relacionado a perfis (ex: `profile-form.tsx`, `public-profile-card.tsx`, `printable-business-card.tsx`, `portfolio-item-modal.tsx`, `digital-business-card.tsx`, `business-card-svg.tsx`) foi movido para `apps/web/src/features/profile/`.
-   Conteúdo de `apps/web/src/features/public/` relacionado a páginas de aterrissagem (ex: `header.tsx`, `footer.tsx`, `landing-profile-examples-section.tsx`, `landing-templates-section.tsx`, `landing-testimonials-section.tsx`, `landing-pricing-section.tsx`, `landing-faq-section.tsx`, `landing-hero-section.tsx`, `landing-benefits-section.tsx`, `premium-banner-display.tsx`) foi movido para `apps/web/src/features/landing/`.
-   A pasta `apps/web/src/features/public/` foi removida após a movimentação dos arquivos.

A estrutura de `src/features/` agora inclui:

```
src/features/
├── auth/
│   └── (arquivos existentes)
├── profile/
│   ├── profile-form.tsx
│   ├── public-profile-card.tsx
│   ├── printable-business-card.tsx
│   ├── portfolio-item-modal.tsx
│   ├── digital-business-card.tsx
│   └── business-card-svg.tsx
├── dashboard/
│   └── (arquivos existentes)
└── landing/
    ├── header.tsx
    ├── footer.tsx
    ├── landing-profile-examples-section.tsx
    ├── landing-templates-section.tsx
    ├── landing-testimonials-section.tsx
    ├── landing-pricing-section.tsx
    ├── landing-faq-section.tsx
    ├── landing-hero-section.tsx
    ├── landing-benefits-section.tsx
    └── premium-banner-display.tsx
```

### 5. Criação e Ajustes do novo `README.md` na raiz

Um novo `README.md` foi criado na raiz do projeto com as informações essenciais.

### 6. Correção de Caminhos de Importação

Após a refatoração das pastas, diversos arquivos de componentes de layout (`apps/web/src/components/profile-layouts/*`) e a página do cliente (`apps/web/src/app/(public)/profile/[username]/ProfileClientPage.tsx`) tiveram seus caminhos de importação atualizados. Exemplos de correções incluem:

-   `@/features/public/header` para `@/features/landing/header`
-   `@/features/dashboard/profile-form` para `@/features/profile/profile-form`
-   `@/features/public/footer` para `@/features/landing/footer`
-   `@/features/public/premium-banner-display` para `@/features/landing/premium-banner-display`
-   `@/features/public/digital-business-card` para `@/features/profile/digital-business-card`
-   `@/features/public/portfolio-item-modal` para `@/features/profile/portfolio-item-modal`

### 7. Padronização de Nomes de Props em Componentes de Layout

Foi identificado e corrigido um `TypeError: Cannot read properties of undefined (reading 'coverPhotoUrl')` em componentes de layout devido a uma inconsistência no nome da prop de perfil (`userProfile` vs `user`). A interface `ProfileLayoutProps` em `src/lib/types.ts` já define `user: UserProfile;`. Todos os componentes de layout que recebem dados de perfil foram atualizados para usar a prop `user` consistentemente, incluindo:

-   `StandardProfileLayout.tsx`: `userProfile` renomeado para `user`.
-   `FreeProfileLayout.tsx`: `userProfile` renomeado para `user`.
-   `AdvancedProfileLayout.tsx`: `userProfile` renomeado para `user`.
-   `ModernProfileLayout.tsx`: `userProfile` renomeado para `user`.
-   `BasicProfileLayout.tsx`: `userProfile` renomeado para `user`.
-   `MinimalistCardLayout.tsx` e `PortfolioFocusLayout.tsx` e `PremiumProLayout.tsx` já estavam usando `user` corretamente.

### 8. Roteiro de Reestruturação de Layouts

## Arquitetura Atual

- O layout das páginas do dashboard (ex: `/dashboard/feed`) é controlado exclusivamente pelo componente `LayoutDecider`, que utiliza internamente o `AppContainer`.
- O `AppContainer` é responsável por renderizar a navbar, sidebar esquerda (perfil), coluna central e sidebar direita (widgets).
- O layout global do dashboard (`apps/web/src/app/(app)/dashboard/layout.tsx`) **NÃO** deve envolver as páginas com `AppContainer` ou `LayoutDecider`, apenas renderizar `{children}` e componentes globais como o chat.

## Padronização de Props e Componentes

- Todos os componentes de layout de perfil devem receber a prop `user` (do tipo `UserProfile`).
- Os layouts antigos (`BasicProfileLayout`, `ModernProfileLayout`, `AdvancedProfileLayout`) foram removidos.
- Os layouts atuais são: `FreeProfileLayout`, `StandardProfileLayout`, `PremiumProfileLayout`.

## Feed e Sidebars

- O feed deve ser renderizado dentro de um único `<LayoutDecider>`, sem wrappers de largura máxima, para que o grid de três colunas funcione corretamente.
- As sidebars são automáticas e não devem ser renderizadas manualmente.

## Navbar

- A navbar (`PublicHeader`) é automática via `AppContainer`.
- Não deve ser incluída manualmente em nenhuma página do dashboard.

## Exemplo correto de uso

```tsx
// apps/web/src/app/(app)/dashboard/feed/page.tsx
export default function FeedPage() {
  return (
    <LayoutDecider>
      {/* conteúdo do feed */}
    </LayoutDecider>
  );
}
```

## Boas práticas

- Sempre utilize `LayoutDecider` no topo das páginas do dashboard.
- Nunca use `AppContainer` diretamente em páginas do dashboard.
- Não limite a largura do conteúdo central do feed para garantir que as sidebars apareçam corretamente.
- Reinicie o servidor de desenvolvimento após alterações estruturais de layout para evitar cache de containers antigos.

---

## ✅ Conclusão

Esta nova estrutura é altamente organizada, modular, e está preparada para crescimento futuro, como:

*   Integração com app mobile ou microfrontends
*   Suporte a pacotes compartilhados (`packages/ui`, `packages/types`)
*   CI/CD com workflows e deploy autônomo

Próximo passo é revisar os demais arquivos informativos e de configuração.

---

> Criado por Micael Bento | Estrutura recomendada por ChatGPT (OpenAI)