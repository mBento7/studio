# Próximos Passos de Produção

## 1. Estrutura de Código

- [ ] **Migrar para Monorepo**: Adotar estrutura sugerida em `/docs/hosting-and-deployment-strategy.md`.
  ```
  /
  ├── apps/
  │   ├── web/              # Frontend Next.js
  │   └── backend-api/      # (Opcional) API customizada
  ├── infra/
  │   ├── coolify-config/   # Configurações de deploy
  │   └── scripts/          # Scripts de automação
  ├── db/
  │   ├── schemas/          # Migrations e seeds do Supabase
  │   └── policies/         # Políticas RLS documentadas
  └── docs/                 # Documentação
  ```

- [ ] **Refatoração por Features**: Iniciar a migração para `src/features/` conforme o plano de refatoração.

- [ ] **Camada de Serviços**: Centralizar lógica de acesso a dados em `src/services/`.

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

- [ ] **Atualizar README**: Refletir nova estrutura, processos e políticas de segurança.
- [ ] **Checklist de Produção**: Manter checklist atualizado conforme evolução do projeto.
- [ ] **Documentar Políticas e Migrations**: Garantir que toda alteração relevante no banco esteja documentada e versionada.

---

> **Dica:** Use os documentos existentes em `/docs` como referência viva. Atualize-os conforme as decisões de arquitetura e infraestrutura evoluírem.  
> **Importante:** Sempre versionar migrations e políticas de segurança para garantir rastreabilidade e facilitar auditorias. 