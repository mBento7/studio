# Acompanhamento de Progresso e Revisões

Mantenha este espaço sempre atualizado para registrar revisões gerais, pendências, progresso e próximos passos do projeto.

- [x] Realizar revisão geral da documentação e código (mensal ou por sprint)
- [x] Atualizar READMEs e docs conforme mudanças relevantes
- [x] Marcar itens concluídos e próximos passos
- [x] Garantir versionamento de migrations, políticas e scripts
- [x] Documentar rotas públicas e privadas
- [x] Checklist de produção e deploy atualizado
- [x] Registrar responsáveis por cada tarefa ou revisão
- [x] Automatizar checagem e atualização diária da documentação

## Revisões Recentes

**Data:** 2024-06-09

**Resumo da revisão:**
- Implementação de scripts automáticos (`check-docs.js` e `update-docs.js`) para revisão e atualização da documentação.
- Configuração do Husky com hook `pre-push` para garantir revisão antes de subir alterações ao GitHub.
- Orientação para agendamento diário do script de atualização automática da data de revisão usando o Agendador de Tarefas do Windows.
- Atualização dos principais READMEs, inclusão de instruções de uso, exemplos práticos e padronização de processos de documentação.

**Próximos passos:**
- [ ] Monitorar funcionamento do agendamento diário.
- [ ] Revisar e expandir automações conforme necessidade do time.
- [ ] Realizar nova revisão em 2024-07-09 ou após mudanças significativas.

# Próximos Passos de Produção

Este documento detalha os próximos passos e o roadmap para o desenvolvimento e produção do WhosDo.com. Muitos destes itens foram iniciados ou concluídos durante a reestruturação do projeto.

## 1. Estrutura de Código

- [x] **Migrar para Monorepo**: Adotar estrutura sugerida. **(Concluído)**
  > O projeto foi migrado para uma estrutura de monorepo na raiz, utilizando `pnpm-workspace.yaml`. As pastas `apps/` e `packages/` foram estabelecidas.

- [x] **Refatoração por Features**: Iniciar a migração para `src/features/` conforme o plano de refatoração. **(Em Andamento/Concluído para `public`)**
  > A pasta `src/features/public/` foi refatorada e seus conteúdos movidos para `src/features/profile/` e `src/features/landing/`. Novas funcionalidades devem seguir essa abordagem modular.

- [ ] **Camada de Serviços**: Centralizar lógica de acesso a dados em `src/services/`.
  > `src/services/profile.service.ts` já existe e serve como base. Novas lógicas de negócio devem ser adicionadas ou centralizadas aqui.

## 2. Infraestrutura

- [ ] **Automatizar Deploy**: Configurar Coolify para deploy via Git e Webhook. Automatizar também o versionamento e aplicação de migrations.
- [ ] **Backups e Monitoramento**: Ativar rotinas automáticas e monitoramento no Coolify e Supabase. Usar extensões como `pg_stat_statements` para performance.
- [ ] **Gestão de Segredos**: Garantir que variáveis sensíveis estejam apenas no ambiente de produção (Coolify/Supabase Vault).

## 3. Banco de Dados

- [ ] **Versionar Migrations**: Migrar o conteúdo do `seed.sql` para migrations versionadas (pasta `db/schemas/`) usando o CLI do Supabase ou ferramenta similar.
- [ ] **Padronizar Nomes de Colunas**: Usar `profile_id` em todas as tabelas relacionadas ao perfil para consistência.
- [ ] **Documentar Políticas RLS**: Manter todas as políticas de segurança em arquivos versionados na pasta `db/policies/` e garantir ativação em todas as tabelas.
- [ ] **Atualizar Código**: Refatorar o backend/frontend para consumir as novas tabelas (`experience`, `education`, `reviews`, `layout_templates`).

## 4. Produto e Monetização

- [ ] **Implementar Compra de Moedas**: Priorizar integração de pagamentos e painel de usuário.
- [ ] **Templates de E-mail**: Criar e automatizar templates para upsell e notificações.
- [ ] **Analytics**: Integrar ferramentas para rastreamento de conversões e uso de recursos.

## 5. Documentação

- [x] **Atualizar README**: Refletir nova estrutura, processos e políticas de segurança. **(Concluído)**
  > O `README.md` na raiz do projeto foi atualizado para refletir a nova estrutura de monorepo e as informações essenciais para o desenvolvimento.

- [ ] **Checklist de Produção**: Manter checklist atualizado conforme evolução do projeto.
- [ ] **Documentar Políticas e Migrations**: Garantir que toda alteração relevante no banco esteja documentada e versionada.
- [ ] **Revisar e Proteger Rotas Privadas:** Garantir que rotas como `/dashboard/feed` só sejam acessíveis por usuários autenticados, usando middleware ou lógica de proteção.
- [ ] **Documentar Rotas Públicas e Privadas:** Manter documentação clara sobre quais rotas são públicas (ex: `/search`, `/profile/[username]`) e quais são privadas (ex: `/dashboard/*`).

- [x] Criados novos componentes de anúncio: StoryPatrocinado, CarrosselAnuncios, VideoAnuncioCard, NotificacaoPatrocinada em apps/web/src/components/anuncios
- [x] Atualizado README.md da pasta anuncios com os novos tipos
- [x] Atualizado docs/tipos-de-anuncios.md com os novos formatos
- [ ] Integrar os novos componentes nas páginas correspondentes (feed, stories, notificações, banners)

---

> **Dica:** Use os documentos existentes em `/docs` como referência viva. Atualize-os conforme as decisões de arquitetura e infraestrutura evoluírem.  
> **Importante:** Sempre versionar migrations e políticas de segurança para garantir rastreabilidade e facilitar auditorias. Atualização automática: documentação revisada em  
