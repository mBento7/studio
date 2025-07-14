# Edge Functions do Projeto Whosfy

Esta pasta contém funções serverless (Edge Functions) do Supabase para lógica customizada, automações e integrações escaláveis.

## Funções Disponíveis

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

## Como fazer deploy/teste das funções

1. **Pré-requisitos:**
   - Instale o [Supabase CLI](https://supabase.com/docs/guides/cli)
   - Faça login: `supabase login`
   - Configure o projeto: `supabase link --project-ref <PROJECT_REF>`

2. **Deploy de uma função:**
   - No terminal, navegue até a pasta da função e execute:
     ```bash
     supabase functions deploy chat-message
     supabase functions deploy send-notification
     supabase functions deploy spend-credits
     supabase functions deploy webhook-handler
     ```

3. **Testar localmente:**
   - Rode: `supabase functions serve --env-file ../.env.local`
   - Use o `curl` (exemplos acima) para testar endpoints.

4. **Referência:**
   - [Documentação oficial de Edge Functions](https://supabase.com/docs/guides/functions)

> Atualize este README sempre que criar ou alterar funções.