# Plano de Arquitetura e Refatoração Evolutiva do Projeto

## 1. Visão Geral

Este documento descreve um plano de refatoração em fases para transformar a base de código em uma arquitetura robusta, escalável e de fácil manutenção, alinhada com as melhores práticas para aplicações Next.js de grande porte.

O princípio fundamental é a **evolução contínua**. Em vez de uma única grande mudança, aplicaremos melhorias de forma incremental, garantindo que a aplicação permaneça estável em cada etapa.

## 2. Fases da Refatoração

### **Fase 1: Refatoração Fundamental - "Colocation" de Componentes (Ação Imediata)**

**Objetivo:** Mover componentes para perto das rotas que os utilizam. Esta é a base para toda a organização futura e trará o ganho de clareza mais imediato.

#### **1.A: Organização da Seção `(app)` - Dashboard**
1.  **Criar Diretório de Destino:**
    *   Criar a pasta: `src/app/(app)/dashboard/components/`
2.  **Mover Arquivos:**
    *   Mover todos os componentes de `src/components/dashboard/` para o novo diretório.
3.  **Atualizar Importações:**
    *   Realizar uma busca global no projeto por importações que começam com `@/components/dashboard/`.
    *   Substituir todas as ocorrências pelo novo caminho: `@/app/(app)/dashboard/components/`.
    *   **Foco da verificação:** Todos os arquivos de página e layout dentro de `src/app/(app)/dashboard/`.

#### **1.B: Organização da Seção `(public)` - Páginas Públicas**
1.  **Criar Diretório de Destino:**
    *   Criar a pasta: `src/app/(public)/components/`
2.  **Mover Arquivos:**
    *   Mover todos os componentes de `src/components/public/` para o novo diretório.
3.  **Atualizar Importações:**
    *   Realizar uma busca global por importações que começam com `@/components/public/`.
    *   Substituir todas as ocorrências pelo novo caminho: `@/app/(public)/components/`.
    *   **Foco da verificação:** `layout.tsx`, `home/page.tsx`, e `profile/[username]/page.tsx` dentro de `src/app/(public)/`.

#### **1.C: Limpeza Final**
1.  Após a conclusão e verificação das fases 1.A e 1.B, as pastas `src/components/dashboard` e `src/components/public` estarão vazias.
2.  **Ação:** Remover permanentemente esses dois diretórios.

---

### **Fase 2: Abstração de Lógica - Camada de Serviços (Próximo Passo)**

**Objetivo:** Desacoplar a lógica de acesso a dados (API, banco de dados, mocks) da camada de UI (componentes).

1.  **Criar Diretório da Camada de Serviços:**
    *   Criar a pasta: `src/services/`
2.  **Identificar e Migrar a Lógica de Dados:**
    *   Localizar todas as chamadas `fetch`, acessos diretos ao Firebase ou funções de mock (como `getMockUserByUsername`) que estão atualmente dentro de componentes.
3.  **Criar Serviços por Domínio:**
    *   Para cada conjunto de funcionalidades relacionadas, criar um arquivo de serviço.
    *   Exemplo: `src/services/user.service.ts`, `src/services/profile.service.ts`.
4.  **Centralizar Funções:**
    *   Mover a lógica de dados para funções `async` exportáveis dentro dos arquivos de serviço apropriados.
    *   **Exemplo em `user.service.ts`:**
        ```typescript
        export async function getUserByUsername(username: string) {
          // Lógica para buscar o usuário fica aqui
        }
        ```
5.  **Refatorar Componentes:**
    *   Alterar os componentes para que eles importem e chamem as funções da camada de serviço, em vez de conterem a lógica de busca de dados diretamente.

---

### **Fase 3: Arquitetura Avançada - Estrutura por "Features" (Visão de Longo Prazo)**

**Objetivo:** Organizar todo o código por funcionalidade de negócio (domínio), não por tipo de arquivo. Esta é a estrutura mais escalável para projetos muito grandes.

**Gatilho para iniciar:** Quando a aplicação tiver 3 ou mais domínios de negócio complexos e bem definidos (ex: Faturamento, Autenticação, Analytics).

1.  **Criar Diretório de Features:**
    *   Criar a pasta: `src/features/`
2.  **Estruturar cada Feature:**
    *   Para cada domínio, criar uma subpasta. Ex: `src/features/billing/`.
    *   Dentro de cada pasta de feature, agrupar todos os arquivos relacionados a ela:
        ```
        src/features/billing/
        ├── components/     // Componentes de faturamento
        ├── hooks/          // Hooks de faturamento
        ├── services/       // Serviços de API de faturamento
        └── types.ts        // Tipos de dados de faturamento
        ```
3.  **Consumir Features nas Rotas:**
    *   O diretório `src/app/` se tornará muito mais enxuto. Suas páginas e layouts irão importar e compor os módulos localizados em `src/features/`.

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
