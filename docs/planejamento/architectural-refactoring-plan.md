# Plano de Arquitetura e Refatoração Evolutiva do Projeto

## 1. Visão Geral

Este documento descreve um plano de refatoração em fases para transformar a base de código em uma arquitetura robusta, escalável e de fácil manutenção, alinhada com as melhores práticas para aplicações Next.js de grande porte.

O princípio fundamental é a **evolução contínua**. Em vez de uma única grande mudança, aplicaremos melhorias de forma incremental, garantindo que a aplicação permaneça estável em cada etapa.

## 2. Fases da Refatoração

### **Fase 1: Refatoração Fundamental - "Colocation" de Componentes (Ação Imediata)**

**Objetivo:** Mover componentes para perto das rotas que os utilizam ou para uma estrutura modular por feature. Esta é a base para toda a organização futura e trará o ganho de clareza mais imediato.

#### **1.A: Organização da Seção `(app)` - Dashboard**
1.  **Criar Diretório de Destino (Futuro):**
    *   Criar a pasta: `src/app/(app)/dashboard/components/`
2.  **Mover Arquivos (Futuro):**
    *   Mover todos os componentes de `src/components/dashboard/` para o novo diretório.
3.  **Atualizar Importações (Futuro):**
    *   Realizar uma busca global no projeto por importações que começam com `@/components/dashboard/`.
    *   Substituir todas as ocorrências pelo novo caminho: `@/app/(app)/dashboard/components/`.
    *   **Foco da verificação:** Todos os arquivos de página e layout dentro de `src/app/(app)/dashboard/`.
    > **Status:** Pendente. Esta etapa ainda não foi executada.

#### **1.B: Organização da Seção `(public)` - Páginas Públicas (Concluído)**
1.  **Realocação para Features:** Os componentes que estavam em `src/components/public/` foram realocados para as pastas de `features` correspondentes, seguindo o plano de modularização.
    *   Componentes de `public` relacionados a perfis foram movidos para `src/features/profile/`.
    *   Componentes de `public` relacionados a landing pages foram movidos para `src/features/landing/`.
2.  **Atualizar Importações:** As importações foram atualizadas para refletir os novos caminhos em `src/features/profile/` e `src/features/landing/`.
    *   **Foco da verificação:** `layout.tsx`, `home/page.tsx`, e `profile/[username]/page.tsx` dentro de `src/app/(public)/`, bem como componentes de layout em `src/components/profile-layouts/`.
    > **Status:** Concluído. A pasta `src/components/public/` foi removida.

#### **1.C: Limpeza Final (Parcialmente Concluída)**
1.  A pasta `src/components/public` foi removida.
2.  A pasta `src/components/dashboard` ainda existe e será removida após a conclusão da Fase 1.A.
    > **Status:** Parcialmente Concluída. Resta a remoção de `src/components/dashboard/`.

---

### **Fase 2: Abstração de Lógica - Camada de Serviços (Em Andamento)**

**Objetivo:** Desacoplar a lógica de acesso a dados (API, banco de dados, mocks) da camada de UI (componentes).

1.  **Criar Diretório da Camada de Serviços:**
    *   A pasta `src/services/` já existe.
2.  **Identificar e Migrar a Lógica de Dados:**
    *   Funções como `getMockUserByUsername` já estão centralizadas em `src/lib/mock-data.ts`. A lógica de serviço principal para perfis está em `src/services/profile.service.ts`.
3.  **Criar Serviços por Domínio:**
    *   `src/services/profile.service.ts` é um exemplo. Novas funcionalidades devem seguir este padrão.
4.  **Centralizar Funções:**
    *   A lógica de dados deve ser movida para funções `async` exportáveis dentro dos arquivos de serviço apropriados.
5.  **Refatorar Componentes:**
    *   Componentes devem importar e chamar as funções da camada de serviço. Isso já é feito em `ProfileClientPage.tsx` e outros.
    > **Status:** Em Andamento. A estrutura de serviços está definida e sendo utilizada. Novas funcionalidades devem seguir este padrão.

---

### **Fase 3: Arquitetura Avançada - Estrutura por "Features" (Em Andamento)**

**Objetivo:** Organizar todo o código por funcionalidade de negócio (domínio), não por tipo de arquivo. Esta é a estrutura mais escalável para projetos muito grandes.

**Gatilho para iniciar:** Quando a aplicação tiver 3 ou mais domínios de negócio complexos e bem definidos (ex: Faturamento, Autenticação, Analytics).

1.  **Criar Diretório de Features:**
    *   A pasta `src/features/` já foi criada.
2.  **Estruturar cada Feature:**
    *   Subpastas como `src/features/profile/` e `src/features/landing/` foram criadas e populadas com os componentes e lógicas relacionadas.
3.  **Consumir Features nas Rotas:**
    *   As páginas e layouts em `src/app/` já importam componentes de `src/features/`.
    > **Status:** Em Andamento. A refatoração inicial para `features/` foi concluída com sucesso. Novas funcionalidades devem ser desenvolvidas dentro desta estrutura.

---

### **Fase 4: Melhorias Contínuas (Conforme a Necessidade)**

**Objetivo:** Adotar ferramentas e padrões específicos para resolver problemas que surgem com o crescimento.

#### **4.A: Gerenciamento de Estado Global**
*   **Gatilho:** Quando o uso de `React.Context` se tornar complexo ou começar a causar re-renderizações desnecessárias em cascata.
*   **Ação:** Adotar uma biblioteca de estado dedicada e leve, como **Zustand** ou **Jotai**, para gerenciar estados globais (ex: dados do usuário autenticado, estado da UI).

#### **4.B: Organização de Utilitários**
*   **Gatilho:** Quando o arquivo `src/lib/utils.ts` se tornar um arquivo monolítico e de difícil navegação.
*   **Ação:** Dividir o arquivo em utilitários com escopo bem definido.
    *   Exemplo: `src/lib/utils/date.utils.ts`, `src/lib/utils/string.utils.ts`, `src/lib/utils/cn.ts` (para a função `cn`).

---

## Observações Finais
- Todas as migrations, policies e triggers do banco devem ser versionadas em `db/schemas/` e `db/policies/`.
- Para rollback, crie migrations reversas e documente o processo.
- O projeto já está em estrutura monorepo, com features, serviços e documentação alinhados.

---

## Separação de Rotas Públicas e Privadas

- Rotas públicas: `/search`, `/profile/[username]`, `/home`, etc.
- Rotas privadas: `/dashboard/*`, `/dashboard/feed`, etc.

> Garanta que rotas privadas estejam sempre protegidas por autenticação.

Padronize a nomenclatura de rotas e pastas conforme o padrão `(public)`, `(app)`, etc.

---

> Criado por Micael Bento | Estrutura recomendada por ChatGPT (OpenAI) 
