# WhosDo.com

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

## 🛠️ Pré-requisitos
- Node.js 20.x LTS
- pnpm instalado globalmente:
  ```bash
  npm install -g pnpm
  ```

## Primeiros Passos

1. Instale as dependências (na raiz do projeto):
   ```bash
   pnpm install
   ```
2. Configure as variáveis de ambiente conforme instruções em [docs/project-structure-and-recovery-guide.md](./docs/planejamento/project-structure-and-recovery-guide.md).
   - Exemplo de `.env.example` disponível na raiz do projeto ou na documentação.
3. Inicie o app principal:
   ```bash
   pnpm --filter nextn dev
   ```
4. (Opcional) Rode o Storybook:
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
- Todas as tabelas sensíveis usam Row Level Security (RLS). Veja exemplos e templates em `db/policies/`.
- Edge Functions são usadas para lógica sensível e escalável. Estrutura e exemplos em `supabase/functions/`.
- Scripts de automação para deploy, migrations e abertura de painéis (Coolify, Supabase) estão em `scripts/`.
- Consulte o [Guia de Infraestrutura](./docs/infraestrutura/infrastructure-and-operations-guide.md) para detalhes de deploy e práticas recomendadas.

---

### Histórico de revisões

- Atualização rápida: 24/06/2025
- Melhoria de boas práticas, troubleshooting e exemplos: 10/07/2025

Atualizado automaticamente em: 10/07/2025
