# Edge Functions do Projeto Whosfy

Esta pasta contém funções serverless (Edge Functions) do Supabase para lógica customizada, automações e integrações escaláveis.

## 📋 Status das Funções

**Projeto:** Whosfy (wkwhvjsnqsognjorjsgf)  
**Runtime:** Deno  
**Região:** us-east-1  
**Status:** ✅ Todas as funções operacionais

## 🚀 Funções Disponíveis

### 1. chat-message.ts
- **Propósito:** Processa e armazena mensagens de chat em tempo real.
- **Parâmetros (JSON):**
  - `sender_id` (string): ID do remetente
  - `receiver_id` (string): ID do destinatário
  - `message` (string): Conteúdo da mensagem
- **Exemplo de chamada:**
```bash
curl -X POST https://<PROJECT>.functions.supabase.co/chat-message \
  -H 'Content-Type: application/json' \
  -d '{"sender_id":"abc","receiver_id":"xyz","message":"Olá!"}'
```

---

### 2. send-notification.ts
- **Propósito:** Envia notificações push para usuários.
- **Parâmetros (JSON):**
  - `user_id` (string): ID do usuário
  - `title` (string): Título da notificação
  - `body` (string): Corpo da notificação
- **Exemplo de chamada:**
```bash
curl -X POST https://<PROJECT>.functions.supabase.co/send-notification \
  -H 'Content-Type: application/json' \
  -d '{"user_id":"xyz","title":"Bem-vindo!","body":"Você tem uma nova mensagem."}'
```

---

### 3. spend-credits.ts
- **Propósito:** Gerencia débito de créditos e registra transações.
- **Parâmetros (JSON):**
  - `user_id` (string): ID do usuário
  - `cost` (number): Quantidade de créditos a debitar
  - `description` (string): Descrição da transação
- **Exemplo de chamada:**
```bash
curl -X POST https://<PROJECT>.functions.supabase.co/spend-credits \
  -H 'Content-Type: application/json' \
  -d '{"user_id":"xyz","cost":10,"description":"Envio de mensagem"}'
```

---

### 4. webhook-handler.ts
- **Propósito:** Recebe e processa webhooks de terceiros (pagamentos, analytics, etc).
- **Parâmetros (JSON):**
  - Estrutura flexível, depende do serviço integrador.
- **Exemplo de chamada:**
```bash
curl -X POST https://<PROJECT>.functions.supabase.co/webhook-handler \
  -H 'Content-Type: application/json' \
  -d '{"event":"payment_success","user_id":"xyz","amount":100}'
```

---

## 🛠️ Deploy e Configuração

### Pré-requisitos
- [Supabase CLI](https://supabase.com/docs/guides/cli) instalado
- Autenticação configurada: `supabase login`
- Projeto linkado: `supabase link --project-ref wkwhvjsnqsognjorjsgf`

### Deploy para Produção
```bash
# Deploy individual
supabase functions deploy chat-message
supabase functions deploy send-notification
supabase functions deploy spend-credits
supabase functions deploy webhook-handler

# Deploy todas as funções
supabase functions deploy
```

### Desenvolvimento Local
```bash
# Iniciar servidor local das funções
supabase functions serve --env-file ../.env.local

# Testar função específica
curl -X POST http://localhost:54321/functions/v1/chat-message \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer YOUR_ANON_KEY' \
  -d '{"sender_id":"test","receiver_id":"test2","message":"Hello!"}'
```

### URLs de Produção
- **Base URL:** `https://wkwhvjsnqsognjorjsgf.supabase.co/functions/v1/`
- **chat-message:** `https://wkwhvjsnqsognjorjsgf.supabase.co/functions/v1/chat-message`
- **send-notification:** `https://wkwhvjsnqsognjorjsgf.supabase.co/functions/v1/send-notification`
- **spend-credits:** `https://wkwhvjsnqsognjorjsgf.supabase.co/functions/v1/spend-credits`
- **webhook-handler:** `https://wkwhvjsnqsognjorjsgf.supabase.co/functions/v1/webhook-handler`

## 🔒 Segurança e Autenticação

### Headers Obrigatórios
```bash
Content-Type: application/json
Authorization: Bearer YOUR_ANON_KEY
```

### Variáveis de Ambiente
Configure no painel do Supabase ou via CLI:
```bash
supabase secrets set SECRET_NAME=secret_value
```

## 📊 Monitoramento

### Logs das Funções
```bash
# Via CLI
supabase functions logs chat-message

# Via MCP Supabase
"Verifique os logs das Edge Functions"
"Analise a performance da função chat-message"
```

### Métricas Importantes
- **Latência:** < 100ms para funções críticas
- **Taxa de erro:** < 1%
- **Timeout:** 30 segundos (padrão)
- **Memória:** 512MB (padrão)

## 🚨 Troubleshooting

### Problemas Comuns
1. **Erro 401 (Unauthorized)**
   - Verifique o header `Authorization`
   - Confirme se a chave anônima está correta

2. **Erro 500 (Internal Server Error)**
   - Verifique os logs: `supabase functions logs FUNCTION_NAME`
   - Confirme se todas as variáveis de ambiente estão configuradas

3. **Timeout**
   - Otimize o código da função
   - Considere processamento assíncrono para operações longas

## 📚 Recursos Adicionais

- [Documentação oficial de Edge Functions](https://supabase.com/docs/guides/functions)
- [Deno Runtime Documentation](https://deno.land/manual)
- [Supabase CLI Reference](https://supabase.com/docs/reference/cli)

---

**Última atualização:** 15/01/2025  
**Responsável:** Micael Bento  
**Próxima revisão:** 15/02/2025

> 💡 **Dica:** Sempre teste as funções localmente antes do deploy e mantenha este README atualizado com mudanças significativas.