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

---

> **Dica:** Use os documentos existentes em `/docs` como referência viva. Atualize-os conforme as decisões de arquitetura e infraestrutura evoluírem.  
> **Importante:** Sempre versionar migrations e políticas de segurança para garantir rastreabilidade e facilitar auditorias. 