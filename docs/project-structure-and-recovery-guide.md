# Guia de Estrutura e Recuperação do Projeto

## 1. 🎯 Visão Geral

Este documento é o **manual de segurança e recuperação** para este projeto. O seu objetivo é fornecer um mapa detalhado de toda a estrutura de arquivos e um guia passo a passo para recriar completamente o ambiente de desenvolvimento a partir do zero, usando apenas o código-fonte versionado no GitHub.

## 2. 🏛️ Filosofia de Recuperação

A única **fonte da verdade** para este projeto é o código que está no repositório Git. Todos os outros artefatos, como dependências (`node_modules`) ou a pasta de build (`.next`), são temporários e podem ser gerados a qualquer momento.

O ponto mais crítico para a recuperação são as **variáveis de ambiente**, que contêm segredos e configurações específicas da máquina. Elas **NÃO** são salvas no Git e devem ser recriadas manualmente.

## 3. 🗺️ Análise Detalhada da Estrutura de Arquivos

Aqui está a descrição de cada arquivo e pasta importante na raiz do projeto:

### Pastas Principais
*   `.idx/`: Pasta de configuração do **Firebase Studio** (anteriormente conhecido como Project IDX). Este rebranding reflete o compromisso do Google em integrar profundamente as ferramentas de desenvolvimento com todo o ecossistema Firebase. Pode ser ignorada em outros ambientes.
*   `.next/`: Pasta de build gerada automaticamente pelo Next.js quando você executa `npm run dev` ou `npm run build`. **Nunca deve ser enviada para o Git.**
*   `.vscode/`: Contém configurações específicas do editor Visual Studio Code. É seguro versionar para manter a consistência entre os desenvolvedores.
*   `docs/`: Contém toda a documentação estratégica e técnica do projeto, como planos de arquitetura, monetização e este guia.
*   `node_modules/`: Onde todas as dependências do projeto (pacotes do `npm`) são instaladas. É gerada ao rodar `npm install`. **Nunca deve ser enviada para o Git.**
*   `src/`: O coração do projeto. Contém todo o código-fonte da aplicação (componentes, páginas, hooks, etc.).

### Arquivos de Configuração
*   `.env` / `.env.local`: **Arquivos críticos e secretos.** Contêm as variáveis de ambiente, como chaves de API e credenciais de banco de dados. `.env.local` tem prioridade sobre `.env` e NUNCA deve ser enviado para o Git.
*   `.gitignore`: Um arquivo vital que instrui o Git sobre quais arquivos e pastas ignorar (ex: `node_modules`, `.next`, `.env.local`). Ele é o guardião da segurança do seu repositório.
*   `components.json`: Arquivo de configuração para a ferramenta `shadcn/ui`. Ele informa onde os componentes de UI devem ser instalados.
*   `next.config.ts`: Arquivo de configuração principal do Next.js. Permite customizar o comportamento do framework.
*   `package.json`: O "RG" do projeto. Define o nome, versão, dependências e scripts (`dev`, `build`, etc.).
*   `package-lock.json`: Um "clone" exato da sua `node_modules`. Garante que todos os desenvolvedores e o servidor de produção usem exatamente as mesmas versões de cada dependência, evitando o "funciona na minha máquina".
*   `postcss.config.mjs` / `tailwind.config.ts`: Arquivos de configuração para o Tailwind CSS, o framework de estilização.
*   `tsconfig.json`: Arquivo de configuração do TypeScript. Define as regras de compilação e verificação de tipos.

### Outros Arquivos
*   `.modified`: Este parece ser um arquivo gerado por alguma ferramenta específica do seu ambiente para rastrear modificações. Geralmente, não precisa ser gerenciado manualmente.
*   `README.md`: A documentação principal e a porta de entrada para o projeto, que já aprimoramos.
*   `next-env.d.ts`: Arquivo de declaração de tipos do TypeScript para o Next.js. Garante que o TypeScript entenda os tipos do Next.js.

---

## 4. ⚙️ Processo de Recuperação Passo a Passo

Para restaurar o projeto em uma máquina nova do zero, siga estes passos:

1.  **Clonar o Repositório do GitHub**
    ```bash
    git clone [URL_DO_SEU_REPOSITÓRIO_GIT]
    cd [NOME_DA_PASTA_DO_PROJETO]
    ```

2.  **Instalar as Dependências**
    Este comando lê o `package.json` e o `package-lock.json` e baixa todas as dependências necessárias na pasta `node_modules`.
    ```bash
    npm install
    ```

3.  **Criar o Arquivo de Variáveis de Ambiente**
    Este é o passo mais importante. Crie um arquivo chamado `.env.local` na raiz do projeto. Adicione as seguintes variáveis (com seus valores corretos):
    ```env
    # Credenciais do Supabase
    NEXT_PUBLIC_SUPABASE_URL=SUA_URL_DO_PROJETO_AQUI
    NEXT_PUBLIC_SUPABASE_ANON_KEY=SUA_CHAVE_ANONIMA_AQUI

    # Adicione aqui outras chaves secretas (Stripe, Resend, etc.) que você usar no futuro.
    ```

4.  **Iniciar o Servidor de Desenvolvimento**
    Após a conclusão dos passos anteriores, a aplicação está pronta para ser executada.
    ```bash
    npm run dev
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

## 8. 🏗️ Estrutura Monorepo (atual)

- O projeto está organizado em `apps/web`, `infra`, `db`, `docs` e `supabase`.
- Cada app ou serviço tem seu próprio `package.json` e configuração.
- Documentação, scripts e exemplos de deploy estão em `docs/` e `infra/`.
