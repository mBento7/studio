# Guia de Onboarding para Desenvolvedores

> **Última revisão:** 10/07/2025  
> **Responsável:** Micael Bento

## Objetivo
Facilitar o início rápido de novos desenvolvedores no projeto Whosfy, padronizando setup, boas práticas e links úteis.

## Passos Iniciais
1. Instale o pnpm globalmente:
   ```bash
   npm install -g pnpm
   ```
2. Instale as dependências na raiz do projeto:
   ```bash
   pnpm install
   ```
3. Copie o arquivo `.env.example` para `.env.local` e preencha as variáveis necessárias (solicite ao responsável se não tiver acesso).
4. Inicie o app principal:
   ```bash
   pnpm --filter nextn dev
   ```
5. Consulte o Storybook (se disponível):
   ```bash
   pnpm --filter nextn storybook
   ```

## Padrões de Branch e PR
- Use nomes claros e descritivos para branches (ex: `feature/novo-componente`, `fix/bug-login`).
- Sempre crie PRs para revisão, mesmo em times pequenos.
- Descreva claramente o que foi feito no PR e relacione a issues/tarefas.
- Siga o checklist de testes antes de pedir revisão.

## Boas Práticas
- Documente toda alteração relevante na área correspondente dos docs.
- Atualize o `NEXT_STEPS.md` e checklists quando concluir etapas.
- Consulte sempre os READMEs das subpastas e o índice geral em `docs/README.md`.
- Em caso de dúvida, pergunte ao responsável ou abra uma issue.

## Links Úteis
- [README principal](./README.md)
- [Guia de Infraestrutura](./infraestrutura/README.md)
- [Planejamento e Blueprints](./planejamento/README.md)
- [Guia Visual e UX](./guia-visual/guia-visual-unificado.md)
- [Checklist de Segurança](./infraestrutura/README.md)
- [Estratégia de Testes](./testes.md)

> Mantenha este guia atualizado conforme o time evoluir!