# Documentação WhosDo

Bem-vindo à documentação do projeto WhosDo! Aqui você encontra guias, padrões, processos e referências para desenvolvimento, design, operação e evolução do sistema.

> **Última revisão:** 24/06/2025  
> **Responsável:** Micael Bento

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
- **Messenger (Chat)**
  - [Messenger: Planejamento, Arquitetura e Roteiro](./messenger.md)

---

## Como navegar
- Use o índice acima para encontrar rapidamente o documento desejado.
- Consulte o [Guia Visual Unificado](./guia-visual/guia-visual-unificado.md) para qualquer dúvida sobre padrões visuais, tokens, temas ou componentes de UI.
- Para dúvidas sobre processos, arquitetura ou domínio, consulte a seção correspondente.
- Sempre que atualizar um padrão, processo ou estrutura, lembre-se de atualizar a documentação!

---

> Dúvidas, sugestões ou contribuições? Consulte o arquivo CONTRIBUTING.md (se disponível) ou abra uma issue/pull request no repositório, ou entre em contato com o time responsável.

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
- [Messenger: Planejamento, Arquitetura e Roteiro](./messenger.md): Detalhamento técnico e de negócio do sistema de chat/mensageria.

## Como contribuir
- Sempre que alterar algo fundamental (visual, regras de negócio, infraestrutura), atualize a documentação correspondente.
- Use os READMEs das subpastas como ponto de partida para entender cada área.
- Em caso de dúvida, consulte este índice ou pergunte ao time responsável.
- Para sugestões, utilize issues ou pull requests no repositório.

## Acompanhamento de Progresso e Próximos Passos

Para garantir a evolução contínua e organizada do projeto, mantenha sempre um documento de acompanhamento de progresso (como o `NEXT_STEPS.md` na raiz do projeto). Utilize este espaço para registrar:

- Revisões periódicas da documentação e do código.
- Pendências identificadas em revisões (ex: pontos a atualizar em README, docs, scripts, rotas, migrations, etc).
- Checklist de produção e deploy.
- Itens concluídos e próximos passos.
- Responsáveis por cada tarefa ou revisão.

### Revisão mais recente

**Data:** 24/06/2025  
**Responsável:** Micael Bento

**Principais pontos identificados:**
- README.md (raiz): atualizado com instruções e links.
- README.md (apps/web): links e exemplos revisados.
- /docs: índice atualizado, READMEs revisados.
- project-structure-and-recovery-guide.md: alinhado com a estrutura atual.
- NEXT_STEPS.md: progresso e próximos passos detalhados.
- db/, infra/, supabase/: versionamento e documentação em dia.

---

> **Dica:** Use o `NEXT_STEPS.md` como referência viva e central de progresso. Atualize-o sempre que houver mudanças importantes, e registre um resumo das revisões nesta seção do README de documentação.

> **Importante:** Certifique-se de que todas as subpastas de documentação possuem um README explicativo, seguindo o modelo em `guia-visual/README-modelo.md`. Sempre que possível, inclua exemplos práticos e reais para facilitar o entendimento.

---

## [ATUALIZAÇÃO 2024-06] – Monetização e Compra de Créditos

### O que já foi implementado:
- Página `/dashboard/credits/buy` exibe pacotes de créditos e inicia o fluxo de compra via Mercado Pago (frontend funcional, com hooks React liberados por "use client").
- Página `/dashboard/credits/payment-confirmation` processa o retorno do Mercado Pago, chama a API de validação e exibe o status ao usuário.

### Próximos passos:
- Implementar as rotas de API `/api/payments/mercadopago/checkout` e `/api/payments/mercadopago/validate`.
- Criar/atualizar o serviço `credits.service.ts` para registrar transações e atualizar saldo.
- Criar migration para tabela de transações de créditos.

> Após esses passos, o fluxo de compra estará pronto para testes integrados e homologação.

---

- Atualização rápida: 24/06/2025

<!-- Seção Messenger removida, pois agora está centralizada em docs/messenger.md -->

## 📬 Messenger (Chat) — Planejamento, Arquitetura e Roteiro de Implementação

### Visão Geral
O Messenger do WhosDo é um sistema de mensagens temporárias, voltado para negociações rápidas entre usuários dos planos Standard e Premium. As conversas são efêmeras (expiram em 48h), suportam texto e imagens, e contam com notificações em tempo real. O objetivo é facilitar negociações, não criar um chat social permanente.

---

### Fases e Sprints de Implementação

#### **Fase 1: MVP Funcional e Seguro**

**Sprint 1: Controle de Acesso e Conversa Temporária**
- Adicionar campo `plan` ao perfil do usuário (se necessário).
- Implementar checagem de plano no frontend (bloquear chat para Free, exibir call-to-action para upgrade).
- Adicionar campo `expires_at` na tabela `conversations`.
- Definir `expires_at = now() + 48h` ao criar conversa.
- Criar trigger/função agendada para exclusão automática de conversas/mensagens após 48h.

**Critérios de Aceite:**
- Usuários Free não acessam o chat.
- Conversas expiram e são excluídas após 48h.

**Sprint 2: Lista de Conversas e Chat de Texto**
- Criar página `/dashboard/messages` listando conversas ativas do usuário.
- Exibir avatar, nome, preview da última mensagem, tempo.
- Permitir abrir ChatFloatingBox a partir da lista.
- Ajustar ChatFloatingBox para conversas temporárias (aviso de expiração).
- Garantir realtime (Supabase channel) e notificações toast.

**Critérios de Aceite:**
- Usuário vê conversas ativas, pode abrir e trocar mensagens de texto em tempo real.
- Recebe notificação toast ao receber nova mensagem.

---

#### **Fase 2: Experiência Visual e Recursos de Negociação**

**Sprint 3: Upload e Exibição de Imagens**
- Criar bucket no Supabase Storage para imagens de chat.
- Adicionar campos `type` e `image_url` em `messages`.
- Adicionar botão de upload de imagem no chat.
- Implementar upload e salvar mensagem do tipo `image`.
- Renderizar imagens no chat.

**Critérios de Aceite:**
- Usuário pode enviar e visualizar imagens no chat.

**Sprint 4: Indicação de Leitura/Entrega (Opcional)**
- Adicionar campo `read_at` em `messages`.
- Atualizar `read_at` ao abrir conversa.
- Exibir status de leitura ("visualizada", "enviada").

**Critérios de Aceite:**
- Usuário vê se a mensagem foi lida pelo destinatário.

---

#### **Fase 3: Segurança, Moderação e Escalabilidade**

**Sprint 5: Bloqueio/Denúncia de Usuários (Opcional)**
- Criar tabela `blocked_users`.
- Adicionar botão de bloquear/denunciar no chat.
- Impedir chat entre usuários bloqueados.

**Critérios de Aceite:**
- Usuário pode bloquear/denunciar outro usuário.
- Não recebe mais mensagens de usuários bloqueados.

**Sprint 6: Notificações Push Mobile (Opcional)**
- Integrar FCM ou OneSignal.
- Enviar push notification ao receber nova mensagem.

**Critérios de Aceite:**
- Usuário recebe notificação push em dispositivos móveis.

---

### Checklist Técnico Resumido
- [ ] Controle de acesso por plano
- [ ] Expiração automática das conversas
- [ ] Lista de conversas recentes
- [ ] Chat de texto em tempo real
- [ ] Upload/exibição de imagens
- [ ] Indicação de leitura/entrega (opcional)
- [ ] Bloqueio/denúncia (opcional)
- [ ] Push mobile (opcional)

---

### Observações de Negócio
- O chat é exclusivo para planos Standard e Premium.
- Conversas são temporárias (48h) e removidas automaticamente.
- Foco em negociação rápida, não em relacionamento contínuo.
- Imagens são permitidas, com limitação de tamanho e tipo.

---

> Para detalhes técnicos, exemplos de código e SQL, consulte a documentação interna dos componentes e o README do app web.

Atualizado automaticamente em: 01/07/2025 