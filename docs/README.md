# Documentação do Projeto

Este diretório reúne toda a documentação técnica, de design, UX, infraestrutura e processos do projeto.

## Objetivo
- Centralizar o conhecimento do projeto para facilitar onboarding, manutenção e evolução.
- Garantir que cada área (visual, pagamentos, infraestrutura, UX, etc) tenha documentação clara e atualizada.

## Estrutura dos Arquivos
- `edicao-visual/`: Edição de aparência, temas, componentes e layouts.
- `pagamentos-e-creditos/`: Sistema de créditos, monetização e pagamentos.
- `padronizacao-botoes.md`: Guia visual e técnico para botões.
- `blueprint.md`: Visão geral, objetivos e arquitetura.
- `profile-layout-planning.md`: Estratégias e exemplos de layouts de perfil.
- `frontend-ux-visual-analysis.md`: Avaliação e recomendações de UX/UI.
- `project-structure-and-recovery-guide.md`: Organização e recuperação do projeto.
- `infrastructure-and-operations-guide.md`: Deploy, monitoramento e operações.
- `architectural-refactoring-plan.md`: Estratégia de refatoração.
- `roteiro-reestruturacao.md`: Passo a passo para mudanças estruturais.
- `hosting-and-deployment-strategy.md`: Estratégias de hospedagem e publicação.

## Como usar
- Consulte o README de cada subpasta para entender o objetivo e estrutura de cada área.
- Sempre que criar uma nova área, utilize o modelo `README-modelo.md`.
- Atualize a documentação sempre que houver mudanças relevantes no código.

## Boas práticas
- Mantenha exemplos reais e práticos sempre que possível.
- Use nomes claros para arquivos e pastas.
- Incentive o time a documentar mudanças imediatamente após alterações no código.

## Índice de Documentação
- [Edição Visual](./edicao-visual/): Como editar a aparência das páginas, componentes e temas do sistema.
- [Pagamentos e Créditos](./pagamentos-e-creditos/): Planejamento, regras e integrações do sistema de créditos e monetização.
- [Padronização de Botões](./padronizacao-botoes.md): Guia visual e técnico para botões.
- [Blueprint do Projeto](./blueprint.md): Visão geral, objetivos e arquitetura.
- [Planejamento de Layouts de Perfil](./profile-layout-planning.md): Estratégias e exemplos de layouts de perfil.
- [Frontend: Análise Visual e UX](./frontend-ux-visual-analysis.md): Avaliação e recomendações de UX/UI.
- [Guia de Estrutura e Recuperação](./project-structure-and-recovery-guide.md): Como o projeto está organizado e como recuperar.
- [Infraestrutura e Operações](./infrastructure-and-operations-guide.md): Deploy, monitoramento e boas práticas de operação.
- [Plano de Refatoração Arquitetural](./architectural-refactoring-plan.md): Estratégia para refatoração do código.
- [Roteiro de Reestruturação](./roteiro-reestruturacao.md): Passo a passo para mudanças estruturais.
- [Guia de Hosting e Deploy](./hosting-and-deployment-strategy.md): Estratégias de hospedagem e publicação.
- [Tipos e Modelos de Anúncios](./tipos-de-anuncios.md): Detalhamento dos formatos de anúncio, incluindo novos tipos inspirados em redes sociais.

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

> **Importante:** Certifique-se de que todas as subpastas de documentação possuem um README explicativo, seguindo o modelo em `README-modelo.md`. Sempre que possível, inclua exemplos práticos e reais para facilitar o entendimento. 