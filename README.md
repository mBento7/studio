# WhosDo.com

> Plataforma de identidade digital profissional para conectar talentos, empresas e oportunidades de forma moderna e segura.

## 🧱 Stack
- [Next.js 14](https://nextjs.org/) (App Router)
- [Supabase](https://supabase.com/)
- [Tailwind CSS](https://tailwindcss.com/) + [Shadcn/UI](https://ui.shadcn.com/)
- [TypeScript 5](https://www.typescriptlang.org/)
- [pnpm](https://pnpm.io/) + monorepo
- Husky, ESLint, Prettier, CI/CD (GitHub Actions)

## 📂 Estrutura
- `apps/web`: aplicação principal (frontend)
- `src/features`: módulos e funcionalidades reutilizáveis
- `supabase/`: banco de dados, autenticação e seed
- `infra/`: scripts e configurações de deploy
- `db/`: schemas, policies e migrations
- `docs/`: documentação do projeto

## 🚀 Scripts principais
- `pnpm dev` — inicia o ambiente de desenvolvimento
- `pnpm build` — build de produção
- `pnpm lint` — checagem de lint
- `pnpm format` — formatação automática

## 🔒 Segurança e Boas Práticas
- Todas as tabelas sensíveis usam Row Level Security (RLS). Veja exemplos e templates em `db/policies/`.
- Edge Functions são usadas para lógica sensível e escalável. Estrutura e exemplos em `supabase/functions/`.
- Scripts de automação para deploy, migrations e abertura de painéis (Coolify, Supabase) estão em `scripts/`.
- Consulte o [Guia de Infraestrutura](./docs/infraestrutura/infrastructure-and-operations-guide.md) para detalhes de deploy e práticas recomendadas.

## Primeiros Passos

1. Instale as dependências:
   ```bash
   pnpm install
   ```
2. Configure as variáveis de ambiente conforme instruções em [docs/project-structure-and-recovery-guide.md](./docs/project-structure-and-recovery-guide.md).
   - Exemplo de `.env.example` disponível na raiz do projeto ou na documentação.
3. Inicie o projeto:
   ```bash
   pnpm dev
   ```

> Para mais detalhes, consulte o [README do app web](./apps/web/README.md) e o [índice de documentação](./docs/README.md).

---

### Histórico de revisões

- Atualização rápida: 24/06/2025

Atualizado automaticamente em: 01/07/2025
