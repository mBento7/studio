# Documentação WhosDo

Bem-vindo à documentação do projeto WhosDo! Aqui você encontra guias, padrões, processos e referências para desenvolvimento, design, operação e evolução do sistema.

## Índice Geral

- **Visual, Design e UX**
  - [Guia Visual Unificado](./guia-visual/guia-visual-unificado.md)
  - [Padronização de Botões](./guia-visual/padronizacao-botoes.md)
  - [Modelos de Documentação](./guia-visual/README-modelo.md)
  - [Modelo de Automação](./guia-visual/README-modelo-automacao.md)
  - [Análise UX Frontend](./guia-visual/frontend-ux-visual-analysis.md)
- **Produto e Domínio**
  - [Apresentação do Produto](./apresentacao/whosdo-apresentacao.md)
  - [Tipos de Anúncios](./anuncios/tipos-de-anuncios.md)
  - [Planejamento de Layout de Perfil](./planejamento/profile-layout-planning.md)
  - [Blueprint do Projeto](./planejamento/blueprint.md)
- **Arquitetura e Estrutura**
  - [Guia de Estrutura e Recuperação do Projeto](./planejamento/project-structure-and-recovery-guide.md)
  - [Plano de Refatoração Arquitetural](./planejamento/architectural-refactoring-plan.md)
- **Infraestrutura e Deploy**
  - [Guia de Infraestrutura e Operações](./infraestrutura/infrastructure-and-operations-guide.md)
  - [Estratégia de Hospedagem e Deploy](./infraestrutura/hosting-and-deployment-strategy.md)
- **Processos e Melhoria Contínua**
  - [Roteiro de Reestruturação](./planejamento/roteiro-reestruturacao.md)
- **Pagamentos e Créditos**
  - [Documentação de Pagamentos e Créditos](./pagamentos-e-creditos/README.md)

---

## Como navegar
- Use o índice acima para encontrar rapidamente o documento desejado.
- Consulte o [Guia Visual Unificado](./guia-visual/guia-visual-unificado.md) para qualquer dúvida sobre padrões visuais, tokens, temas ou componentes de UI.
- Para dúvidas sobre processos, arquitetura ou domínio, consulte a seção correspondente.
- Sempre que atualizar um padrão, processo ou estrutura, lembre-se de atualizar a documentação!

---

> Dúvidas, sugestões ou contribuições? Consulte o arquivo CONTRIBUTING.md (se disponível) ou entre em contato com o time responsável.

## Objetivo
- Centralizar o conhecimento do projeto para facilitar onboarding, manutenção e evolução.
- Garantir que cada área (visual, pagamentos, infraestrutura, UX, etc) tenha documentação clara e atualizada.

## Estrutura dos Arquivos
- `guia-visual/`: Guias visuais, padronização de componentes, modelos e análise UX.
- `pagamentos-e-creditos/`: Sistema de créditos, monetização e pagamentos.
- `anuncios/`: Tipos e modelos de anúncios.
- `planejamento/`: Planejamento, estrutura, roteiros e blueprints do projeto.
- `infraestrutura/`: Deploy, monitoramento e operações.
- `apresentacao/`: Apresentação institucional do produto.

## Como usar
- Consulte o README de cada subpasta para entender o objetivo e estrutura de cada área.
- Sempre que criar uma nova área, utilize o modelo `README-modelo.md` em `guia-visual/`.
- Atualize a documentação sempre que houver mudanças relevantes no código.

## Boas práticas
- Mantenha exemplos reais e práticos sempre que possível.
- Use nomes claros para arquivos e pastas.
- Incentive o time a documentar mudanças imediatamente após alterações no código.

## Índice de Documentação
- [Guia Visual Unificado](./guia-visual/guia-visual-unificado.md): Diretrizes visuais, tokens, temas, componentes e boas práticas de UI/UX.
- [Padronização de Botões](./guia-visual/padronizacao-botoes.md): Guia visual e técnico para botões.
- [Modelos de Documentação](./guia-visual/README-modelo.md): Estrutura sugerida para novos documentos.
- [Modelo de Automação](./guia-visual/README-modelo-automacao.md): Exemplo de automação de documentação.
- [Análise UX Frontend](./guia-visual/frontend-ux-visual-analysis.md): Avaliação e recomendações de UX/UI.
- [Apresentação do Produto](./apresentacao/whosdo-apresentacao.md): Visão institucional do projeto.
- [Tipos de Anúncios](./anuncios/tipos-de-anuncios.md): Detalhamento dos formatos de anúncio.
- [Planejamento de Layouts de Perfil](./planejamento/profile-layout-planning.md): Estratégias e exemplos de layouts de perfil.
- [Blueprint do Projeto](./planejamento/blueprint.md): Visão geral, objetivos e arquitetura.
- [Guia de Estrutura e Recuperação](./planejamento/project-structure-and-recovery-guide.md): Organização e recuperação do projeto.
- [Plano de Refatoração Arquitetural](./planejamento/architectural-refactoring-plan.md): Estratégia para refatoração do código.
- [Roteiro de Reestruturação](./planejamento/roteiro-reestruturacao.md): Passo a passo para mudanças estruturais.
- [Guia de Infraestrutura e Operações](./infraestrutura/infrastructure-and-operations-guide.md): Deploy, monitoramento e boas práticas de operação.
- [Estratégia de Hospedagem e Deploy](./infraestrutura/hosting-and-deployment-strategy.md): Estratégias de hospedagem e publicação.
- [Documentação de Pagamentos e Créditos](./pagamentos-e-creditos/README.md): Planejamento, regras e integrações do sistema de créditos e monetização.

## Como contribuir
- Sempre que alterar algo fundamental (visual, regras de negócio, infraestrutura), atualize a documentação correspondente.
- Use os READMEs das subpastas como ponto de partida para entender cada área.
- Em caso de dúvida, consulte este índice ou pergunte ao time responsável.

## Acompanhamento de Progresso e Próximos Passos

Para garantir a evolução contínua e organizada do projeto, mantenha sempre um documento de acompanhamento de progresso (como o `NEXT_STEPS.md` na raiz do projeto). Utilize este espaço para registrar:

- Revisões periódicas da documentação e do código.
- Pendências identificadas em revisões (ex: pontos a atualizar em README, docs, scripts, rotas, migrations, etc).
- Checklist de produção e deploy.
- Itens concluídos e próximos passos.
- Responsáveis por cada tarefa ou revisão.

### Revisão mais recente (exemplo)

**Data:** [Preencher data da revisão]

**Principais pontos identificados:**
- README.md (raiz): precisa de instruções de instalação, links para docs detalhadas e referência ao monorepo.
- README.md (apps/web): alinhar links, exemplos de estrutura e instruções para pnpm.
- /docs: garantir índice atualizado e READMEs em todas as áreas.
- project-structure-and-recovery-guide.md: atualizar se houver mudanças na estrutura.
- NEXT_STEPS.md: marcar progresso e detalhar passos de documentação.
- db/, infra/, supabase/: garantir versionamento e documentação de migrations, políticas e scripts.

**Orientação:**
- Sempre que concluir ou iniciar uma tarefa relevante, registre no `NEXT_STEPS.md` e atualize esta seção.
- Realize revisões mensais (ou a cada sprint) para manter a documentação e o roadmap alinhados com o estado real do projeto.
- Incentive todos do time a contribuir com atualizações e revisões.

> **Dica:** Use o `NEXT_STEPS.md` como referência viva e central de progresso. Atualize-o sempre que houver mudanças importantes, e registre um resumo das revisões nesta seção do README de documentação.

> **Importante:** Certifique-se de que todas as subpastas de documentação possuem um README explicativo, seguindo o modelo em `guia-visual/README-modelo.md`. Sempre que possível, inclua exemplos práticos e reais para facilitar o entendimento.

---

## [ATUALIZAÇÃO 2024-06] – Monetização e Compra de Créditos

### O que já foi implementado:
- Página `/dashboard/credits/buy` exibe pacotes de créditos e inicia o fluxo de compra via Mercado Pago (frontend funcional, com hooks React liberados por `"use client"`).
- Página `/dashboard/credits/payment-confirmation` processa o retorno do Mercado Pago, chama a API de validação e exibe o status ao usuário.

### Próximos passos:
- Implementar as rotas de API `/api/payments/mercadopago/checkout` e `/api/payments/mercadopago/validate`.
- Criar/atualizar o serviço `credits.service.ts` para registrar transações e atualizar saldo.
- Criar migration para tabela de transações de créditos.

> Após esses passos, o fluxo de compra estará pronto para testes integrados e homologação.

Atualização rápida: 24/06/2025 