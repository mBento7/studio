# 🪙 Visão Geral do Sistema de Créditos

## 1. Nome e Conceito

Escolha um nome de moeda alinhado com a identidade da marca, por exemplo:
- WhoCoins
- WhosCredits
- DoTokens
- iDPoints

## 2. Recursos que Podem Ser Liberados com Créditos

| Recurso Premium                    | Custo em Créditos |
| ---------------------------------- | ----------------- |
| Destacar anúncio por 7 dias        | 20 créditos       |
| Subir para o topo da busca por 24h | 10 créditos       |
| Adicionar mídia extra ao portfólio | 5 créditos        |
| Enviar propostas ilimitadas        | 50 créditos/mês   |
| Criar cartão digital com QR Code   | 30 créditos       |
| Acesso a painel com estatísticas   | 15 créditos       |
| Desbloquear tags extras no perfil  | 8 créditos        |

---

# 🧩 Estrutura Técnica com Supabase

## Tabelas no Supabase

### users

```
id (UUID) | email | name | credit_balance (int)
```

### transactions

```
id | user_id (FK) | type (enum: 'add', 'spend') | amount | description | created_at
```

### credit_packages

```
id | name | price_real (R$) | credits | bonus_percent
```

---

## Exemplo de fluxo para uso

1. Usuário entra no painel.
2. Clica em "Comprar créditos".
3. Escolhe o pacote (ex: 100 créditos por R$ 19,90).
4. Realiza pagamento (Stripe, MercadoPago, Pix via API).
5. Após confirmação, créditos são adicionados à conta.
6. Ao usar um recurso premium, os créditos são descontados e registrado na tabela transactions.

---

# 💳 Integração com Pagamento

## 1. Stripe (internacional)
- Bom para planos mensais, pacotes de créditos, checkout rápido
- Suporte a cartões, Apple Pay, boleto

## 2. MercadoPago ou PagSeguro (Brasil)
- Integrações prontas com frontend
- Suporte a PIX, cartão, boleto

## 3. Pagamento via PIX dinâmico
- Pode usar APIs como:
  - Gerencianet
  - Juno
  - Stripe com intermediário (Pagar.me)

---

# 🧠 Lógica no Código

Exemplo em Next.js (com Supabase SDK):

```js
async function spendCredits(userId, cost, description) {
  const { data: user } = await supabase
    .from('users')
    .select('credit_balance')
    .eq('id', userId)
    .single()

  if (user.credit_balance < cost) {
    throw new Error("Créditos insuficientes")
  }

  const { error } = await supabase.rpc('spend_credits', {
    user_id_input: userId,
    cost_input: cost,
    desc_input: description
  })

  if (error) throw error
}
```

Você pode criar uma função SQL no Supabase chamada spend_credits() para manter a lógica no backend.

---

# 🔐 Segurança

- Use RLS (Row Level Security) para garantir que o usuário só gaste seus próprios créditos.
- Evite chamadas diretas do frontend — use um middleware ou funções serverless (Edge Functions) para segurança.

---

# 📊 Painel do Usuário Comercial

Mostre:
- Saldo atual de créditos
- Botão "Comprar Créditos"
- Histórico de uso
- Quais ações consomem créditos
- Bônus por fidelidade

---

# 💡 Extras para Gamificação

- Recompensas diárias (ex: login = 1 crédito)
- Sistema de níveis (usuários VIP gastam menos créditos)
- Bônus por indicação
- Missões (ex: "complete seu perfil e ganhe 5 créditos")

---

# SQL das Tabelas no Supabase

```sql
-- Tabela principal de saldo de créditos
ALTER TABLE public.profiles
ADD COLUMN credit_balance integer DEFAULT 0;

-- Histórico de transações
CREATE TABLE public.transactions (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id uuid REFERENCES public.profiles(id),
  type text CHECK (type IN ('add', 'spend')),
  amount integer NOT NULL CHECK (amount > 0),
  description text,
  created_at timestamp with time zone DEFAULT timezone('utc', now())
);

-- Pacotes de créditos à venda
CREATE TABLE public.credit_packages (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  price_real numeric(10,2) NOT NULL,
  credits integer NOT NULL,
  bonus_percent integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT timezone('utc', now())
);
```

# Função RPC spend_credits()

```sql
CREATE OR REPLACE FUNCTION public.spend_credits(
  user_id_input uuid,
  cost_input integer,
  desc_input text
)
RETURNS void
LANGUAGE plpgsql
AS $$
BEGIN
  -- Verifica saldo
  IF (SELECT credit_balance FROM public.profiles WHERE id = user_id_input) < cost_input THEN
    RAISE EXCEPTION 'Saldo insuficiente';
  END IF;

  -- Debita saldo
  UPDATE public.profiles
  SET credit_balance = credit_balance - cost_input
  WHERE id = user_id_input;

  -- Registra transação
  INSERT INTO public.transactions (profile_id, type, amount, description)
  VALUES (user_id_input, 'spend', cost_input, desc_input);
END;
$$;
```

Dica: Você também pode criar uma função add_credits() para adicionar saldo ao confirmar pagamentos.

# Política de RLS (Segurança)

```sql
-- Permite que o usuário acesse apenas suas próprias transações
CREATE POLICY "Users can read their own transactions"
  ON public.transactions
  FOR SELECT
  USING (auth.uid() = profile_id);

-- Permite que o usuário só atualize seu próprio saldo por funções seguras
CREATE POLICY "Users can update own credits via RPC"
  ON public.profiles
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (true);
```

# Exemplo em Next.js (Client/Server)

```ts
async function spendCredits(userId: string, amount: number, description: string) {
  const { error } = await supabase.rpc('spend_credits', {
    user_id_input: userId,
    cost_input: amount,
    desc_input: description,
  });

  if (error) throw error;
}
```

# Sugestão de UI do Painel de Créditos

Seções do painel:
- 💰 Seu saldo: X créditos
- 📦 Pacotes disponíveis:
  - 100 créditos = R$ 19,90
  - 250 créditos + 10% bônus = R$ 49,90
  - 500 créditos + 20% bônus = R$ 89,90
- 🕒 Histórico de uso (tabela):
  - Tipo | Quantidade | Descrição | Data
  - gasto | -20 | Destaque do perfil | 17/06/2025
  - bônus | +5 | Indicação confirmada | 16/06/2025

# Próximos Passos Recomendados

- Rodar os scripts SQL acima no Supabase.
- Criar um CreditService (ex: services/credits.service.ts) para abstrair getBalance, spend, add, listTransactions.
- Criar componente CreditDashboardCard.tsx com saldo + botão "Comprar créditos".
- Criar página ou modal ComprarCréditos (com integração Stripe ou Pix).
- Proteger todos os recursos pagos com verificaSaldoOuBloqueia() antes da ação.

---

# ✅ Checklist de Implementação do Sistema de Créditos

## [1] Código SQL Completo
- Tabelas: `transactions`, `credit_packages`.
- Alteração em `profiles`: coluna `credit_balance`.
- Funções: `spend_credits()` (obrigatória), `add_credits()` (opcional, recomendada).
- Políticas RLS seguras para garantir acesso apenas aos próprios dados.
- Pronto para uso em produção.

## [2] Serviço: credits.service.ts
- Funções sugeridas:
  - `getBalance(userId)`: retorna saldo atual.
  - `spend(userId, amount, description)`: debita créditos via RPC.
  - `add(userId, amount, description)`: credita créditos via RPC.
  - `listTransactions(userId)`: histórico do usuário.
- Toda lógica de créditos centralizada neste serviço.

## [3] UI: CreditDashboardCard.tsx
- Exibe saldo atual do usuário.
- Botão "Comprar Créditos" (abre modal ou redireciona).
- Atalho para histórico de transações.
- Pode mostrar bônus ativos ou próximos objetivos de gamificação.

## [4] UI: CreditHistoryTable.tsx
- Tabela com colunas: Tipo (gasto/bônus/compra), Quantidade (+/-), Descrição, Data.
- Pode ser paginada ou com scroll infinito.
- Cores para diferenciar gastos e ganhos.
- Filtro por tipo de transação.

## [5] Fluxo de Compra com Pix ou Stripe
- Simulação de escolha de pacote e pagamento.
- Após confirmação, chama `addCredits()` no backend.
- Integração real: Stripe (Checkout Session, webhooks), Pix (API de terceiros, webhooks).
- Sempre registrar a transação no Supabase após confirmação do pagamento.

## [6] Sistema de Bônus (login diário, indicação)
- Tabela `bonus_events` para registrar eventos de bônus.
- Função `claimDailyBonus()` com limite diário por usuário.
- Indicação: ao confirmar, chama `addCredits()` para ambos.
- Usar triggers ou funções SQL para garantir atomicidade e evitar fraudes.

---

# 🔄 Fluxo Visual Resumido

```mermaid
flowchart TD
    A[Usuário acessa painel] --> B[Visualiza saldo e histórico]
    B --> C[Compra créditos]
    C --> D[Pagamento via Stripe/Pix]
    D --> E[Confirmação]
    E --> F[addCredits()]
    B --> G[Usa recurso premium]
    G --> H[spendCredits()]
    A --> I[Reivindica bônus diário]
    I --> J[claimDailyBonus()]
```

---

# 📌 Recomendações de Implementação

1. Rodar SQL no Supabase (tabelas, funções, RLS).
2. Implementar `credits.service.ts`.
3. Criar componentes de UI (`CreditDashboardCard.tsx`, `CreditHistoryTable.tsx`).
4. Mockar fluxo de compra (depois integrar real).
5. Implementar sistema de bônus (função e tabela de eventos).

---

# Observações
- O modelo proposto é seguro, escalável e pronto para produção.
- Centralize toda a lógica de créditos no backend para evitar fraudes.
- Use RLS e funções SQL para garantir segurança e atomicidade.
- O sistema é flexível para expansão futura (novos tipos de bônus, pacotes, integrações de pagamento, etc).

--- 