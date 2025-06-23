# WhosDo.com

> Plataforma de identidade digital profissional

## 🧱 Stack
- Next.js 14 (App Router)
- Supabase
- Tailwind + Shadcn/UI
- TypeScript 5
- pnpm + monorepo

## 📂 Estrutura
- apps/web: aplicação principal
- src/features: funcionalidades modulares
- supabase/: banco e auth
- infra/: configurações de deploy

## 🚀 Scripts
pnpm dev
pnpm lint

## Primeiros Passos

1. Instale as dependências:
   ```bash
   pnpm install
   ```
2. Configure as variáveis de ambiente conforme instruções em [docs/project-structure-and-recovery-guide.md](./docs/project-structure-and-recovery-guide.md).
3. Inicie o projeto:
   ```bash
   pnpm dev
   ```

Para mais detalhes, consulte o [README do app web](./apps/web/README.md) e o [índice de documentação](./docs/README.md).

> Este projeto utiliza **monorepo** com pnpm. Os principais apps e pacotes estão em `apps/`, `db/`, `infra/`, `supabase/` e `docs/`. Atualização automática: documentação revisada em  
