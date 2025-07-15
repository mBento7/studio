# README - Supabase

Esta pasta contém arquivos de configuração, migrations, seeds e Edge Functions para o Supabase do projeto Whosfy.

## 📋 Status do Projeto

**Projeto Ativo:** Whosfy (ID: wkwhvjsnqsognjorjsgf)
- **Status:** ACTIVE_HEALTHY ✅
- **Região:** us-east-1
- **Versão PostgreSQL:** 17.2.0
- **Perfis cadastrados:** 5
- **Último perfil criado:** 03/07/2025

## 🔧 Configuração Atual

### Projeto Supabase
- **URL:** https://wkwhvjsnqsognjorjsgf.supabase.co
- **Organização:** Personal
- **Banco de dados:** PostgreSQL 17.2.0
- **Extensões principais:** pg_graphql, pgcrypto, uuid-ossp, pg_stat_statements, supabase_vault

### Configuração Local (config.toml)
- **Project ID:** whosfy
- **API Port:** 54321
- **DB Port:** 54322
- **Studio Port:** 54323
- **Inbucket Port:** 54324

## 📁 Estrutura de Arquivos

```
supabase/
├── config.toml          # Configuração do Supabase CLI
├── seed.sql            # Dados iniciais para desenvolvimento
├── migrations/         # Migrations versionadas do banco
│   ├── 20240609_create_initial_tables.sql
│   ├── 20240609_triggers_and_indexes.sql
│   └── ...
└── functions/          # Edge Functions serverless
    ├── chat-message.ts
    ├── send-notification.ts
    ├── spend-credits.ts
    └── webhook-handler.ts
```

## 🚀 Como Usar

### Seeds e Dados Iniciais
- O arquivo `seed.sql` popula o banco com dados de desenvolvimento
- **Importante:** Não inclua dados sensíveis ou de produção no seed
- Documente mudanças significativas neste README
- Considere migrar seeds para migrations versionadas para melhor rastreabilidade

### Desenvolvimento Local
```bash
# Iniciar Supabase local
supabase start

# Aplicar migrations
supabase db reset

# Acessar Studio
open http://localhost:54323
```

### Conexão via Túnel SSH (VPS)
```bash
# Túnel para Supabase (API + Studio)
ssh -i "C:\Users\Micael\.ssh\oracle_new" -L 54321:127.0.0.1:54321 -L 54323:127.0.0.1:54323 -N ubuntu@129.146.146.242
```

## 🔒 Políticas de Segurança (RLS)

**Status Atual:** ⚠️ Requer atenção

### Problemas Identificados:
- **RLS desabilitado** em tabelas com políticas: `public.faq`, `public.coupon_likes`
- **Função insegura:** `public.update_user_plan` com search_path mutável
- **Autenticação:** Proteção contra senhas vazadas desabilitada
- **MFA:** Configuração insuficiente de autenticação multifator

### Boas Práticas:
- Todas as tabelas sensíveis devem usar Row Level Security
- Veja templates e exemplos em `../db/policies/`
- Defina `search_path` explicitamente em funções PL/pgSQL
- Habilite proteções de segurança no painel do Supabase

## ⚡ Edge Functions

**Funções Disponíveis:**
- `chat-message.ts` - Processamento de mensagens em tempo real
- `send-notification.ts` - Sistema de notificações push
- `spend-credits.ts` - Gerenciamento de créditos e transações
- `webhook-handler.ts` - Processamento de webhooks externos

Consulte o [README das Edge Functions](./functions/README.md) para exemplos de uso.

## 🛠️ Scripts de Automação

**Disponíveis em `../scripts/`:**
- `setup-supabase-local.js` - Configuração automática do ambiente local
- `apply-migrations.js` - Aplicação segura de migrations
- `version-migrations.js` - Versionamento de migrations e seeds
- `validate-env.js` - Validação de variáveis de ambiente

## 🔧 Funções Customizadas do Banco

### delete_expired_conversations
- **Propósito:** Remove conversas e mensagens expiradas
- **Segurança:** Implementada com `search_path` explícito
- **Status:** ✅ Atualizada com boas práticas de segurança

### update_user_plan
- **Status:** ⚠️ Requer correção
- **Problema:** search_path mutável (risco de segurança)
- **Ação:** Definir search_path explicitamente

## 📊 Monitoramento e Logs

### Verificação de Saúde
```bash
# Via MCP Supabase
"Liste todas as tabelas do projeto"
"Verifique os logs da API"
"Analise as configurações de segurança"
```

### Métricas Atuais
- **Tabelas principais:** profiles, social_links, services, activities, reviews
- **Políticas RLS:** Configuradas para a maioria das tabelas
- **Extensões ativas:** 5 extensões principais instaladas

## 🚨 Próximas Ações Recomendadas

1. **Segurança:**
   - Habilitar RLS nas tabelas `public.faq` e `public.coupon_likes`
   - Corrigir função `update_user_plan` com search_path fixo
   - Ativar proteção contra senhas vazadas
   - Configurar MFA adequadamente

2. **Monitoramento:**
   - Implementar alertas para falhas de RLS
   - Configurar logs de auditoria
   - Monitorar performance das queries

3. **Desenvolvimento:**
   - Migrar seeds para migrations versionadas
   - Documentar todas as Edge Functions
   - Implementar testes automatizados

---

**Última atualização:** 15/01/2025  
**Responsável:** Micael Bento  
**Próxima revisão:** 15/02/2025