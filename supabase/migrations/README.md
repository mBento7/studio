# README - Migrations do Banco de Dados

Esta pasta armazena as migrations versionadas do banco de dados do projeto Whosfy.

## 📋 Status das Migrations

**Projeto:** Whosfy (wkwhvjsnqsognjorjsgf)  
**Banco:** PostgreSQL 17.2.0  
**Última migration:** 202407_schema_atual.sql  
**Status:** ✅ Todas as migrations aplicadas

## 📁 Migrations Disponíveis

```
migrations/
├── 20240609_create_initial_tables.sql     # Tabelas principais (profiles, social_links, services)
├── 20240609_triggers_and_indexes.sql      # Triggers e índices de performance
├── 20240610_remove_linkedin_url_from_profiles.sql  # Remoção de campo obsoleto
├── 20240611_create_activities_table.sql   # Sistema de atividades
├── 20240612_add_layout_template_id_to_profiles.sql  # Templates de layout
├── 20240613_create_reviews_table.sql      # Sistema de avaliações
└── 202407_schema_atual.sql               # Schema consolidado atual
```

## 🚀 Como Usar

### Criação de Nova Migration
```bash
# Padrão de nomenclatura: YYYYMMDD_descricao.sql
# Exemplo: 20250115_add_notifications_table.sql

# Criar migration via Supabase CLI
supabase migration new add_notifications_table
```

### Aplicação de Migrations
```bash
# Aplicar todas as migrations pendentes
supabase db reset

# Aplicar migration específica
supabase db push

# Via script de automação
node ../scripts/apply-migrations.js
```

### Verificação de Status
```bash
# Verificar migrations aplicadas
supabase migration list

# Via MCP Supabase
"Liste todas as migrations aplicadas"
"Verifique o status do banco de dados"
```

## 📋 Fluxo Recomendado

1. **Planejamento:**
   - Documente a alteração necessária
   - Verifique impacto em tabelas existentes
   - Considere rollback strategy

2. **Desenvolvimento:**
   - Crie nova migration com nome descritivo
   - Documente a alteração no início do arquivo
   - Teste em ambiente local

3. **Validação:**
   - Aplique em ambiente de teste
   - Verifique integridade dos dados
   - Teste rollback se necessário

4. **Produção:**
   - Aplique em horário de baixo tráfego
   - Monitore logs e performance
   - Marque como aplicada neste README

## ✅ Boas Práticas

### Estrutura da Migration
```sql
-- Migration: Descrição clara da alteração
-- Data: YYYY-MM-DD
-- Autor: Nome do desenvolvedor
-- Ticket/Issue: #123 (se aplicável)

-- Verificações de segurança
DO $$
BEGIN
    -- Verificar se a alteração é segura
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'existing_table') THEN
        RAISE EXCEPTION 'Tabela dependente não encontrada';
    END IF;
END $$;

-- Alterações principais
CREATE TABLE IF NOT EXISTS new_table (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Políticas RLS (se aplicável)
ALTER TABLE new_table ENABLE ROW LEVEL SECURITY;
CREATE POLICY "policy_name" ON new_table FOR SELECT USING (true);

-- Índices de performance
CREATE INDEX IF NOT EXISTS idx_new_table_created_at ON new_table(created_at);
```

### Regras Importantes
- **NUNCA** edite migrations já aplicadas em produção
- **SEMPRE** use `IF NOT EXISTS` para criação de objetos
- **SEMPRE** documente o propósito da migration
- **SEMPRE** teste rollback quando possível
- **SEMPRE** considere impacto em performance

### Versionamento
- Use formato `YYYYMMDD_descricao.sql`
- Mantenha ordem cronológica
- Evite migrations muito grandes (split em múltiplas)
- Use scripts de automação para aplicação

# Schemas (Migrations)

Coloque aqui os arquivos de migration versionados do banco de dados (ex: 001_create_profiles.sql, 002_add_services.sql, etc).

Use ferramentas como Supabase CLI, dbmate ou sqitch para versionar e aplicar as migrations. 

## Edge Functions
- Funções serverless para lógica customizada estão em `../../supabase/functions/`. Veja o README da pasta para detalhes.

## Políticas de Segurança (RLS)
- Versionamento e templates em `../policies/`. Consulte o README para exemplos práticos.

## Scripts de Automação
- Scripts para deploy, migrations e abertura de painéis estão em `../../scripts/`. Veja o README correspondente para instruções. 

# Funções do Banco

- **delete_expired_conversations**: Função responsável por remover conversas e mensagens expiradas do banco. Agora implementada com `search_path` explícito para maior segurança, evitando ambiguidades de schema.
- Recomenda-se sempre definir `search_path` explicitamente em funções PL/pgSQL para evitar riscos de segurança em ambientes multi-schema.