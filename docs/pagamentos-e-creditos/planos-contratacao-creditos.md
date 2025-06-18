# Planos de Contratação – Sistema de Créditos WhosDo.com

Este documento apresenta os planos disponíveis para contratação na plataforma WhosDo.com, detalhando recursos, limites, benefícios e integração com o sistema de créditos/moedas virtuais.

---

## 🏷️ Visão Geral dos Planos

| Plano      | Preço Mensal | Preço Anual (–20%) | Principais Recursos                                                                 |
|------------|--------------|--------------------|-------------------------------------------------------------------------------------|
| **Free**   | R$0          | –                  | Perfil básico, até 5 Stories (24h), Feed "Novos" & "Trending", acesso limitado a recursos premium via créditos avulsos |
| **Standard** | R$29,90      | R$279,90           | + Stories ilimitados, Feed "Recomendados", QuickActions, acesso a pacotes de créditos com bônus, recursos premium com desconto |
| **Premium**  | R$59,90      | R$559,90           | + TrendingAds, CouponsWidget, Boost de anúncios, API Premium, maiores bônus e descontos em créditos, recursos exclusivos |

---

## 🎯 Benefícios e Limites por Plano

### Free
- Cadastro e uso básico gratuito
- Até 5 Stories ativos (24h)
- Acesso ao Feed "Novos" e "Trending"
- Pode comprar créditos avulsos para recursos premium (pay-per-use)
- Sem acesso a recursos avançados (ex: Boost, API, cupons)

### Standard
- Todos os benefícios do Free
- Stories ilimitados
- Feed "Recomendados"
- QuickActions liberado
- Compra de pacotes de créditos com bônus (ex: +10%)
- Descontos em recursos premium (ex: gastar menos créditos por ação)
- Suporte prioritário

### Premium
- Todos os benefícios do Standard
- TrendingAds liberado
- CouponsWidget liberado
- Boost de anúncios
- API Premium
- Bônus maiores na compra de créditos (ex: +20%)
- Recursos exclusivos (ex: layouts premium, estatísticas avançadas)
- Descontos máximos em recursos premium
- Suporte VIP

---

## 💳 Integração com Créditos
- Todos os planos podem adquirir créditos para desbloquear recursos premium (ex: destacar anúncio, QR Code, mídia extra, etc).
- Usuários Standard e Premium recebem bônus maiores ao comprar pacotes de créditos.
- Recursos premium podem ter custo reduzido em créditos para assinantes Standard/Premium.
- Alguns recursos são exclusivos do plano Premium e não podem ser adquiridos apenas com créditos.

---

## 📦 Pacotes de Créditos (Microtransações)
- 100 créditos = R$ 19,90
- 250 créditos + 10% bônus = R$ 49,90
- 500 créditos + 20% bônus = R$ 89,90
- Pagamento via Stripe, MercadoPago ou Pix
- Créditos podem ser usados para:
  - Destacar anúncio
  - Subir no topo da busca
  - Adicionar mídia extra
  - Criar cartão digital com QR Code
  - Acessar estatísticas
  - Desbloquear tags extras
  - Enviar propostas ilimitadas

---

## 🧩 Fluxo de Contratação e Upgrade
1. Usuário acessa página de planos (`/dashboard/planos` ou `/planos`)
2. Visualiza comparação de benefícios entre Free, Standard e Premium
3. Seleciona plano desejado e inicia checkout (Stripe, MercadoPago, Pix)
4. Após confirmação, plano é ativado e benefícios liberados
5. Usuário pode comprar créditos avulsos a qualquer momento
6. Upgrades/downgrades são processados automaticamente ao final do ciclo vigente

---

## 🛡️ Observações de Segurança e UX
- Todas as transações (assinatura e créditos) são registradas no Supabase
- Políticas RLS garantem que cada usuário só veja e altere seus próprios dados
- Mudanças de plano refletem imediatamente nos limites e descontos de créditos
- Painel do usuário mostra status do plano, saldo de créditos e histórico de uso

---

## 📈 Estratégia de Monetização Integrada
- Receita recorrente via assinaturas (Standard/Premium)
- Receita incremental via microtransações de créditos
- Gamificação e bônus para engajamento e fidelização
- Upsell de planos e pacotes de créditos no painel e em recursos premium

---

> Documento integrado com: `creditos-planejamento.md`, `plano-execucao-creditos.md`, `plano-fases-creditos.md`, `monetization-strategy.md`. 