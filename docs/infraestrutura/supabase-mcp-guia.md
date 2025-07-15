# Guia MCP Supabase - Projeto Whosfy

Este guia explica como configurar e usar o MCP (Model Context Protocol) Supabase para interagir com o projeto Whosfy através de comandos em linguagem natural.

## 📋 Status Atual do Projeto

**Projeto:** Whosfy (wkwhvjsnqsognjorjsgf)  
**Status:** ✅ Ativo e operacional  
**Região:** us-east-1  
**Banco:** PostgreSQL 17.2.0  
**Última atualização:** 15/01/2025

### Recursos Ativos
- ✅ **API REST:** Funcionando (porta 54321)
- ✅ **Realtime:** Ativo
- ✅ **Auth:** Configurado
- ✅ **Storage:** Disponível
- ✅ **Edge Functions:** 4 funções deployadas
- ✅ **Database:** 5 perfis ativos

## 🔧 Configuração

### 1. Token de Acesso
O MCP Supabase requer um token de acesso pessoal para autenticação:

1. Acesse [Supabase Dashboard](https://supabase.com/dashboard)
2. Vá em Settings > Access Tokens
3. Crie um novo token com as permissões necessárias
4. Configure o token no seu ambiente MCP

### 2. Configuração do MCP
Adicione a configuração do servidor MCP Supabase no seu arquivo de configuração:

```json
{
  "mcpServers": {
    "supabase": {
      "command": "npx",
      "args": ["@modelcontextprotocol/server-supabase"],
      "env": {
        "SUPABASE_ACCESS_TOKEN": "seu_token_aqui"
      }
    }
  }
}
```

### 3. Variáveis de Ambiente do Projeto Whosfy
```bash
# Configurações principais
NEXT_PUBLIC_SUPABASE_URL=https://wkwhvjsnqsognjorjsgf.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Para desenvolvimento local
SUPABASE_DB_URL=postgresql://postgres:[password]@db.wkwhvjsnqsognjorjsgf.supabase.co:5432/postgres
```

## 🚀 Comandos Disponíveis

### Projetos
- `list_projects` - Lista todos os projetos Supabase
- `get_project` - Obtém detalhes de um projeto específico
- `create_project` - Cria um novo projeto
- `pause_project` - Pausa um projeto
- `restore_project` - Restaura um projeto pausado

### Banco de Dados
- `list_tables` - Lista tabelas em schemas específicos
- `execute_sql` - Executa SQL no banco de dados
- `apply_migration` - Aplica uma migration
- `list_migrations` - Lista migrations aplicadas
- `list_extensions` - Lista extensões instaladas

### Edge Functions
- `list_edge_functions` - Lista todas as Edge Functions
- `deploy_edge_function` - Faz deploy de uma Edge Function

### Monitoramento
- `get_logs` - Obtém logs por serviço (api, auth, storage, realtime)
- `get_advisors` - Verifica avisos de segurança/performance

### Configuração
- `get_project_url` - Obtém URL da API do projeto
- `get_anon_key` - Obtém chave anônima do projeto
- `generate_typescript_types` - Gera tipos TypeScript

## 💡 Exemplos de Uso Específicos do Whosfy

### Verificar Status Geral
```
Verifique o status completo do projeto Whosfy
Liste todos os projetos e mostre detalhes do Whosfy
```

### Monitoramento do Banco
```
Execute SELECT COUNT(*) FROM profiles para verificar usuários
Liste todas as tabelas do schema public
Verifique as extensões instaladas no banco
```

### Segurança e Performance
```
Verifique os avisos de segurança do projeto Whosfy
Mostre recomendações de performance para o banco
Liste políticas RLS das tabelas principais
```

### Edge Functions
```
Liste todas as Edge Functions do projeto Whosfy
Verifique logs da função chat-message
Mostre status das funções de notificação
```

### Desenvolvimento
```
Gere tipos TypeScript para o projeto Whosfy
Obtenha a URL da API e chave anônima
Verifique logs da API dos últimos minutos
```

## 🔍 Monitoramento e Logs

### Serviços Disponíveis para Logs
- `api` - Logs da API REST
- `auth` - Logs de autenticação
- `storage` - Logs do storage
- `realtime` - Logs do realtime
- `edge-function` - Logs das Edge Functions

### Comandos de Monitoramento
```bash
# Via MCP
"Obtenha logs da API do projeto Whosfy"
"Verifique logs de autenticação dos últimos minutos"
"Mostre logs das Edge Functions"

# Via CLI (alternativo)
supabase functions logs --project-ref wkwhvjsnqsognjorjsgf
supabase logs --project-ref wkwhvjsnqsognjorjsgf --type api
```

## ⚠️ Avisos de Segurança Identificados

Durante a verificação com MCP, foram identificados os seguintes pontos de atenção:

### 🔴 Críticos
1. **RLS Desabilitado:** Tabelas `public.faq` e `public.coupon_likes` têm políticas RLS mas estão desabilitadas
2. **Search Path Mutável:** Função `public.update_user_plan` tem search_path não seguro

### 🟡 Recomendações
1. **Proteção contra senhas vazadas:** Desabilitada
2. **MFA:** Configuração insuficiente
3. **Rate limiting:** Revisar configurações

### Ações Recomendadas
```sql
-- Habilitar RLS nas tabelas
ALTER TABLE public.faq ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coupon_likes ENABLE ROW LEVEL SECURITY;

-- Corrigir search_path da função
ALTER FUNCTION public.update_user_plan() SET search_path = '';
```

## 🛠️ Troubleshooting

### Erro de Autenticação
- Verifique se o token está correto
- Confirme se o token não expirou
- Verifique as permissões do token
- Teste conectividade: `curl -I https://wkwhvjsnqsognjorjsgf.supabase.co`

### Projeto Não Encontrado
- Confirme o ID do projeto: `wkwhvjsnqsognjorjsgf`
- Verifique se você tem acesso ao projeto
- Confirme se o projeto não foi pausado

### Timeout em Operações
- Operações de banco podem demorar
- Verifique a conectividade com a região us-east-1
- Monitore logs para erros específicos
- Use `get_logs` para diagnóstico

### Edge Functions com Erro
- Verifique logs específicos da função
- Confirme variáveis de ambiente
- Teste localmente antes do deploy
- Monitore métricas de execução

## 📚 Recursos Adicionais

- [Documentação Supabase](https://supabase.com/docs)
- [MCP Protocol](https://modelcontextprotocol.io/)
- [Supabase CLI](https://supabase.com/docs/guides/cli)
- [Dashboard do Projeto](https://supabase.com/dashboard/project/wkwhvjsnqsognjorjsgf)

---

**Última atualização:** 15/01/2025  
**Responsável:** Equipe de Desenvolvimento Whosfy  
**Próxima revisão:** 01/02/2025