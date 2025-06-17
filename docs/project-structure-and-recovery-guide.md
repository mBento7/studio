# Guia de Estrutura e Recuperação do Projeto

## 1. 🎯 Visão Geral

Este documento é o **manual de segurança e recuperação** para este projeto. O seu objetivo é fornecer um mapa detalhado de toda a estrutura de arquivos e um guia passo a passo para recriar completamente o ambiente de desenvolvimento a partir do zero, usando apenas o código-fonte versionado no GitHub.

## 2. 🏛️ Filosofia de Recuperação

A única **fonte da verdade** para este projeto é o código que está no repositório Git. Todos os outros artefatos, como dependências (`node_modules`) ou a pasta de build (`.next`), são temporários e podem ser gerados a qualquer momento.

O ponto mais crítico para a recuperação são as **variáveis de ambiente**, que contêm segredos e configurações específicas da máquina. Elas **NÃO** são salvas no Git e devem ser recriadas manualmente.

## 3. 🗺️ Análise Detalhada da Estrutura de Arquivos

Aqui está a descrição de cada arquivo e pasta importante na raiz do projeto:

### Pastas Principais
*   `apps/`: Contém as aplicações do monorepo. Atualmente, inclui `web/` (o frontend Next.js).
*   `db/`: Armazena os schemas do banco de dados e políticas de segurança (RLS) do Supabase.
*   `docs/`: Contém toda a documentação estratégica e técnica do projeto, como planos de arquitetura, monetização e este guia.
*   `infra/`: Contém configurações e scripts relacionados à infraestrutura e deploy, como configurações do Coolify.
*   `.next/`: Pasta de build gerada automaticamente pelo Next.js quando você executa `pnpm dev` ou `pnpm build`. **Nunca deve ser enviada para o Git.**
*   `node_modules/`: Onde todas as dependências do projeto (pacotes do `pnpm`) são instaladas. É gerada ao rodar `pnpm install`. **Nunca deve ser enviada para o Git.**
*   `packages/`: (Vazio no momento) Destinado a pacotes internos reutilizáveis no monorepo (ex: `ui-kit`, `types`).
*   `src/`: (Localizado dentro de `apps/web/`) O coração da aplicação web. Contém todo o código-fonte da aplicação (componentes, páginas, hooks, etc.).
*   `supabase/`: Contém arquivos relacionados à configuração do Supabase, como `seed.sql`.
*   `.vscode/`: Contém configurações específicas do editor Visual Studio Code. É seguro versionar para manter a consistência entre os desenvolvedores.

### Arquivos de Configuração
*   `.env` / `.env.local`: **Arquivos críticos e secretos.** Contêm as variáveis de ambiente, como chaves de API e credenciais de banco de dados. `.env.local` tem prioridade sobre `.env` e NUNCA deve ser enviado para o Git.
*   `.gitignore`: Um arquivo vital que instrui o Git sobre quais arquivos e pastas ignorar (ex: `node_modules`, `.next`, `.env.local`). Ele é o guardião da segurança do seu repositório.
*   `components.json`: (Localizado em `apps/web/`) Arquivo de configuração para a ferramenta `shadcn/ui`. Ele informa onde os componentes de UI devem ser instalados.
*   `next.config.ts`: (Localizado em `apps/web/`) Arquivo de configuração principal do Next.js. Permite customizar o comportamento do framework.
*   `package.json`: O "RG" do monorepo. Define o nome, versão, dependências e scripts (`dev`, `build`, etc.) para o projeto como um todo. As aplicações dentro de `apps/` têm seus próprios `package.json`.
*   `package-lock.json` ou `pnpm-lock.yaml`: (Na raiz do monorepo) Um "clone" exato das suas `node_modules`. Garante que todos os desenvolvedores e o servidor de produção usem exatamente as mesmas versões de cada dependência, evitando o "funciona na minha máquina". Com `pnpm`, o arquivo é `pnpm-lock.yaml`.
*   `postcss.config.mjs` / `tailwind.config.ts`: (Localizado em `apps/web/`) Arquivos de configuração para o Tailwind CSS, o framework de estilização.
*   `pnpm-workspace.yaml`: (Na raiz do monorepo) Define os workspaces para o `pnpm`, indicando quais pastas contêm pacotes do monorepo (`apps/*`, `packages/*`).
*   `tsconfig.base.json`: (Na raiz do monorepo) Arquivo base de configuração do TypeScript para o monorepo. Garante configurações consistentes entre os subprojetos.
*   `tsconfig.json`: (Localizado em `apps/web/`) Arquivo de configuração do TypeScript específico para a aplicação web.

### Outros Arquivos
*   `NEXT_STEPS.md`: Documento que lista os próximos passos e o roadmap para o desenvolvimento e produção do projeto.
*   `README.md`: A documentação principal e a porta de entrada para o projeto.
*   `next-env.d.ts`: (Localizado em `apps/web/`) Arquivo de declaração de tipos do TypeScript para o Next.js. Garante que o TypeScript entenda os tipos do Next.js.

---

## 4. ⚙️ Processo de Recuperação Passo a Passo

Para restaurar o projeto em uma máquina nova do zero, siga estes passos:

1.  **Clonar o Repositório do GitHub**
    ```bash
    git clone [URL_DO_SEU_REPOSITÓRIO_GIT]
    cd [NOME_DA_PASTA_DO_PROJETO]
    ```

2.  **Instalar as Dependências (na raiz do monorepo)**
    Este comando lê o `package.json` e o `pnpm-lock.yaml` (ou `package-lock.json`) na raiz do monorepo e baixa todas as dependências necessárias, gerenciando as dependências de todos os workspaces.
    ```bash
    pnpm install
    ```

3.  **Criar o Arquivo de Variáveis de Ambiente**
    Este é o passo mais importante. Crie um arquivo chamado `.env.local` na raiz do monorepo (ou dentro de `apps/web/` se for específico da aplicação web). Adicione as seguintes variáveis (com seus valores corretos):
    ```env
    # Credenciais do Supabase
    NEXT_PUBLIC_SUPABASE_URL=SUA_URL_DO_PROJETO_AQUI
    NEXT_PUBLIC_SUPABASE_ANON_KEY=SUA_CHAVE_ANONIMA_AQUI

    # Adicione aqui outras chaves secretas (Stripe, Resend, etc.) que você usar no futuro.
    ```

4.  **Iniciar o Servidor de Desenvolvimento (na raiz do monorepo)**
    Após a conclusão dos passos anteriores, a aplicação está pronta para ser executada. O comando `pnpm dev` na raiz irá iniciar o servidor de desenvolvimento para a aplicação `apps/web` (que foi configurada para ser o target padrão para `dev`).
    ```bash
    pnpm dev
    ```
    Abra seu navegador em `http://localhost:3000` (ou a porta indicada) e a aplicação deverá estar funcionando perfeitamente.

## 5. 🛡️ Pontos Críticos de Segurança

*   **NUNCA** faça commit do arquivo `.env.local` ou de qualquer outro arquivo que contenha senhas, chaves de API ou outros segredos.
*   **SEMPRE** verifique se o arquivo `.gitignore` contém as entradas `.env.local`, `node_modules/` e `.next/`.
*   **REVISE** periodicamente os commits para garantir que nenhum segredo foi enviado acidentalmente.

## 6. 📦 Versionamento de Migrations e Rollback

- Todas as alterações de banco (schemas, policies, triggers) devem ser versionadas em `db/schemas/` e `db/policies/`.
- Use arquivos numerados e datados para facilitar rollback e auditoria.
- Para rollback, crie um arquivo de migration reversa e aplique manualmente no Supabase.

## 7. 🧑‍💻 Exemplos de Queries SQL Comuns

- Buscar perfis por cidade:
  ```sql
  SELECT * FROM public.profiles WHERE location->>'city' = 'São Paulo';
  ```
- Buscar perfis disponíveis por categoria:
  ```sql
  SELECT * FROM public.profiles WHERE category = 'Designer' AND is_available = true;
  ```
- Buscar perfis por skill:
  ```sql
  SELECT * FROM public.profiles WHERE skills ? 'React';
  ```

## 8. 🏗️ Estrutura Monorepo

- O projeto está organizado em `apps/web`, `infra`, `db`, `docs` e `supabase` na raiz do monorepo.
- Cada app ou serviço tem seu próprio `package.json` e configuração (para `apps/web`).
- Documentação, scripts e exemplos de deploy estão em `docs/` e `infra/`.
