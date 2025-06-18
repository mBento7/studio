# Plano de Execução: Sistema de Créditos WhosDo.com

## ✅ Fase 1 – Fundamentos Técnicos (Banco e Segurança)
| Etapa | Descrição | Responsável | Status |
|-------|-----------|-------------|--------|
| 1.1 | Rodar os scripts SQL no Supabase (tabelas: transactions, credit_packages, coluna credit_balance) | Backend | 🔲 |
| 1.2 | Criar função RPC spend_credits() e opcionalmente add_credits() | Backend | 🔲 |
| 1.3 | Criar políticas RLS para proteger as tabelas de créditos e transações | Backend | 🔲 |
| 1.4 | Testar manualmente os comandos no Supabase SQL Editor | QA / Dev | 🔲 |

---

## 💡 Fase 2 – Serviços e Lógica Central (Server-Side)
| Etapa | Descrição | Responsável | Status |
|-------|-----------|-------------|--------|
| 2.1 | Criar services/credits.service.ts com funções: getBalance, spend, add, listTransactions | Dev | 🔲 |
| 2.2 | Criar utilitário hasCredits(userId, amount) para usar em rotas protegidas | Dev | 🔲 |
| 2.3 | Criar testes básicos das funções usando mock de Supabase | QA / Dev | 🔲 |

---

## 🧩 Fase 3 – Integração Frontend
| Etapa | Descrição | Responsável | Status |
|-------|-----------|-------------|--------|
| 3.1 | Criar componente CreditDashboardCard.tsx (mostra saldo, botão de compra, atalho para histórico) | Frontend | 🔲 |
| 3.2 | Criar CreditHistoryTable.tsx (listar transações: tipo, valor, descrição, data) | Frontend | 🔲 |
| 3.3 | Criar Modal ou Página ComprarCréditos.tsx com pacotes fictícios (sem integração real ainda) | Frontend | 🔲 |
| 3.4 | Conectar ações premium (ex: destacar perfil) à verificação de saldo | Frontend | 🔲 |

---

## 💳 Fase 4 – Integração de Pagamentos
| Etapa | Descrição | Responsável | Status |
|-------|-----------|-------------|--------|
| 4.1 | Definir plataforma de pagamento (Stripe, MercadoPago, Pix API) | PM / Dev | 🔲 |
| 4.2 | Criar webhook de confirmação de pagamento (ex: api/payment/confirm.ts) | Backend | 🔲 |
| 4.3 | Ao confirmar pagamento, chamar addCredits() com descrição | Backend | 🔲 |
| 4.4 | Conectar botão de compra do frontend com o fluxo real de pagamento | Fullstack | 🔲 |

---

## 🎁 Fase 5 – Gamificação e Bônus
| Etapa | Descrição | Responsável | Status |
|-------|-----------|-------------|--------|
| 5.1 | Criar tabela bonus_events no Supabase | Backend | 🔲 |
| 5.2 | Criar função SQL claim_daily_bonus() com verificação de uso diário | Backend | 🔲 |
| 5.3 | Criar botão "Recompensa Diária" no painel e conectá-lo à função | Frontend | 🔲 |
| 5.4 | Criar lógica de bônus por indicação ou missão completada | Backend / Dev | 🔲 |

---

## 📦 Fase 6 – Empacotamento e Validação
| Etapa | Descrição | Responsável | Status |
|-------|-----------|-------------|--------|
| 6.1 | Criar documentação final em docs/sistema-de-creditos.md (já gerado) | ✅ | ✅ |
| 6.2 | Criar testes end-to-end do fluxo: comprar crédito → gastar → ver histórico | QA | 🔲 |
| 6.3 | Atualizar README com instruções de uso do sistema de créditos | Dev | 🔲 |
| 6.4 | Fazer deploy controlado em staging para validação real | DevOps | 🔲 |

---

## 📌 Extras Planejados Futuramente
| Recurso | Prioridade | Status |
|---------|------------|--------|
| Cartão de visitas com QR Code como recurso pago | Média | 🔲 |
| Tags extras desbloqueáveis com créditos | Baixa | 🔲 |
| Destaques no feed ou vitrine por créditos | Alta | 🔲 |
| Sistema VIP com descontos em créditos | Média | 🔲 | 