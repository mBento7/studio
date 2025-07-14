# Whosfy.com

> Plataforma de identidade digital profissional para conectar talentos, empresas e oportunidades de forma moderna e segura.

## �� Stack
- [Next.js 15](https://nextjs.org/) (App Router)
- [Supabase](https://supabase.com/)
- [Tailwind CSS](https://tailwindcss.com/) + [Shadcn/UI](https://ui.shadcn.com/)
- [TypeScript 5](https://www.typescriptlang.org/)
- [pnpm](https://pnpm.io/) + monorepo (workspaces)
- Husky, ESLint, Prettier, CI/CD (GitHub Actions)

## 📂 Estrutura
- `apps/web`: aplicação principal (frontend)
- `src/features`: módulos e funcionalidades reutilizáveis
- `supabase/`: banco de dados, autenticação e seed
- `infra/`: scripts e configurações de deploy
- `db/`: schemas, policies e migrations
- `docs/`: documentação do projeto

## 🚀 Scripts principais
- `pnpm --filter nextn dev` — inicia o ambiente de desenvolvimento do app principal
- `pnpm --filter nextn build` — build de produção do app principal
- `pnpm --filter nextn lint` — checagem de lint
- `pnpm --filter nextn format` — formatação automática
- `pnpm --filter nextn storybook` — roda o Storybook (se configurado)

### Scripts de automação
- `node scripts/validate-env.js` — valida variáveis de ambiente e segurança
- `node scripts/setup-supabase-local.js` — configura Supabase local completo
- `node scripts/version-migrations.js` — versiona migrations e seeds
- `node scripts/apply-migrations.js` — aplica migrations e seeds

## 🛠️ Pré-requisitos
- Node.js 20.x LTS
- pnpm instalado globalmente:
  ```bash
  npm install -g pnpm
  ```

## Primeiros Passos

1. **Instale as dependências** (na raiz do projeto):
   ```bash
   pnpm install
   ```

2. **Configure variáveis de ambiente:**
   ```bash
   # Copie o arquivo de exemplo
   cp apps/web/.env.example apps/web/.env.local
   
   # Edite .env.local com suas configurações
   # Valide a configuração
   node scripts/validate-env.js
   ```

3. **Configure Supabase local** (opcional mas recomendado):
   ```bash
   # Instale dependências: Docker, Supabase CLI
   npm install -g supabase
   
   # Configure automaticamente
   node scripts/setup-supabase-local.js
   ```

4. **Versione e aplique migrations:**
   ```bash
   # Organize migrations
   node scripts/version-migrations.js
   
   # Aplique migrations e seeds
   APPLY_SEEDS=true node scripts/apply-migrations.js
   ```

5. **Inicie o app principal:**
   ```bash
   pnpm --filter nextn dev
   ```

6. **(Opcional) Rode o Storybook:**
   ```bash
   pnpm --filter nextn storybook
   ```

> Para mais detalhes, consulte o [README do app web](./apps/web/README.md) e o [índice de documentação](./docs/README.md).

---

## 🧩 Workspaces e Monorepo
- O projeto usa workspaces do pnpm. Para rodar scripts em apps/pacotes específicos, use:
  ```bash
  pnpm --filter <nome-do-app-ou-pacote> <script>
  ```
- O app principal se chama `nextn`.

## 🛟 Troubleshooting
- **Erro: pnpm não encontrado**
  - Instale globalmente: `npm install -g pnpm`
- **Erro: Cannot read properties of null (reading 'matches')**
  - Sempre use `pnpm install` na raiz do projeto, nunca `npm install`.
- **Problemas com dependências ou lockfile**
  - Limpe tudo: `rd /s /q node_modules && del pnpm-lock.yaml && pnpm store prune && pnpm install`
- **Storybook não inicia**
  - Verifique se o script está presente no `package.json` do app e se todas as dependências do Storybook estão alinhadas.

## 🔒 Segurança e Boas Práticas
- **Row Level Security (RLS)**: Todas as tabelas sensíveis usam RLS. Veja exemplos e templates em `db/policies/`.
- **Edge Functions**: Lógica sensível e escalável em `supabase/functions/`.
- **Validação de ambiente**: Script automatizado para verificar segurança das variáveis (`scripts/validate-env.js`).
- **Versionamento**: Migrations e seeds organizados cronologicamente com backup automático.
- **Scripts de automação**: Deploy, migrations e painéis (Coolify, Supabase) em `scripts/`.
- **Supabase local**: Ambiente completo para desenvolvimento com Docker.
- Consulte o [Guia de Infraestrutura](./docs/infraestrutura/infrastructure-and-operations-guide.md) para detalhes de deploy e práticas recomendadas.

## 📋 Scripts de Automação

O projeto inclui scripts completos para automação:

- **🔍 Validação**: `validate-env.js` - Score de segurança e validação completa
- **🚀 Setup**: `setup-supabase-local.js` - Configuração automática do Supabase
- **📦 Versionamento**: `version-migrations.js` - Organização de migrations/seeds
- **⚡ Deploy**: `apply-migrations.js` - Aplicação segura de mudanças no banco

Veja documentação completa em [`scripts/README.md`](./scripts/README.md).

---

### Histórico de revisões

- **24/06/2025**: Atualização rápida
- **10/07/2025**: Melhoria de boas práticas, troubleshooting e exemplos
- **15/01/2025**: Scripts de automação, validação de ambiente, Supabase local, versionamento de migrations/seeds

Atualizado automaticamente em: 15/01/2025
