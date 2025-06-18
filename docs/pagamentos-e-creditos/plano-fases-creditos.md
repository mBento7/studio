# Plano de Implementação por Fases – Sistema de Créditos WhosDo.com

Este documento organiza a execução do sistema de créditos em fases, com prioridades, dependências e status, para garantir entregas rápidas e validação contínua.

---

## 📦 Fase 1 – Fundações e Lógica Base (Backend + Serviços)

| Etapa | Descrição                                                             | Dependência | Status |
| ----- | --------------------------------------------------------------------- | ----------- | ------ |
| ✅ 1.1 | Criar estrutura SQL (tabelas, funções, RLS no Supabase)               | -           | 🔲     |
| ✅ 1.2 | Criar `credits.service.ts` (getBalance, spend, add, listTransactions) | 1.1         | 🔲     |
| ✅ 1.3 | Criar `useCredits()` hook para abstração de uso no frontend           | 1.2         | 🔲     |
| ✅ 1.4 | Criar lógica `checkCredits(minAmount)` para bloquear recursos         | 1.2         | 🔲     |

---

## 🔹 Fase 2 – UI do Painel de Créditos

| Etapa | Descrição                                                       | Dependência | Status |
| ----- | --------------------------------------------------------------- | ----------- | ------ |
| ✅ 2.1 | Criar página `/dashboard/credits` com `CreditDashboardCard.tsx` | 1.3         | 🔲     |
| ✅ 2.2 | Criar componente `CreditHistoryTable.tsx` com dados reais       | 1.2         | 🔲     |
| ✅ 2.3 | Criar `DailyBonusButton.tsx` (UI + ação para bonus diário)      | 1.2         | 🔲     |
| ✅ 2.4 | Criar seção de pacotes com `CreditPackageCard.tsx`              | -           | 🔲     |
| ✅ 2.5 | Criar modal `BuyCreditsModal.tsx` com pacote selecionável       | 2.4         | 🔲     |

---

## 🔹 Fase 3 – Integração de Pagamentos

| Etapa | Descrição                                                          | Dependência | Status |
| ----- | ------------------------------------------------------------------ | ----------- | ------ |
| ✅ 3.1 | Definir gateway (ex: Stripe) e mockar pagamento                    | 2.5         | 🔲     |
| ✅ 3.2 | Criar rota `/credits/payment-confirmation` com `PaymentStatus.tsx` | 3.1         | 🔲     |
| ✅ 3.3 | Criar webhook de pagamento (ex: `api/stripe/webhook`)              | 3.1         | 🔲     |
| ✅ 3.4 | Integrar sucesso de pagamento com `addCredits()`                   | 3.3         | 🔲     |

---

## 🔹 Fase 4 – Recursos Premium

| Etapa | Descrição                                                        | Dependência | Status |
| ----- | ---------------------------------------------------------------- | ----------- | ------ |
| ✅ 4.1 | Criar seção `/dashboard/premium` com recursos desbloqueáveis     | 1.2         | 🔲     |
| ✅ 4.2 | Criar `PremiumActionButton.tsx` (com lógica de gasto de crédito) | 1.3, 4.1    | 🔲     |
| ✅ 4.3 | Criar `InsufficientCreditsDialog.tsx`                            | 4.2         | 🔲     |
| ✅ 4.4 | Integrar recurso real: "destacar perfil" usando `spendCredits()` | 4.2         | 🔲     |

---

## 🔹 Fase 5 – Gamificação e Recompensas

| Etapa | Descrição                                                       | Dependência | Status |
| ----- | --------------------------------------------------------------- | ----------- | ------ |
| ✅ 5.1 | Criar rota `/dashboard/credits/bonus` com status de recompensas | 2.1         | 🔲     |
| ✅ 5.2 | Implementar `claimDailyBonus()` (RPC ou lógica serverless)      | 1.2         | 🔲     |
| ✅ 5.3 | Criar lógica de bônus por indicação e exibir progresso          | -           | 🔲     |

---

## 🔹 Fase 6 – Refinamento e Expansão

| Etapa | Descrição                                                | Dependência | Status |
| ----- | -------------------------------------------------------- | ----------- | ------ |
| ✅ 6.1 | Criar filtros e paginação para `CreditHistoryTable.tsx`  | 2.2         | 🔲     |
| ✅ 6.2 | Criar middleware/HOC de verificação de saldo             | 1.4         | 🔲     |
| ✅ 6.3 | Criar painel de admin (se necessário) para criar pacotes | -           | 🔲     |
| ✅ 6.4 | Testes de ponta-a-ponta com Cypress ou Playwright        | 6.2         | 🔲     |

---

## 🔁 Fluxo de Implementação Resumido

```mermaid
flowchart TD
    A[Supabase SQL + RPC + RLS] --> B[credits.service.ts + useCredits()]
    B --> C[/dashboard/credits]
    C --> D[Comprar Créditos Modal]
    D --> E[Integração com Stripe/Pix]
    C --> F[Histórico de Créditos]
    C --> G[Recompensa Diária]
    C --> H[Indicação e Bônus]
    C --> I[Recursos Premium]
    I --> J[Botão Premium + Verificação de saldo]
```

---

> Baseado e integrado com os documentos: `creditos-planejamento.md`, `plano-execucao-creditos.md`, `monetization-strategy.md`. 