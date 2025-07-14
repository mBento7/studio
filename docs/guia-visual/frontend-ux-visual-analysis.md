# Análise e Estruturação Visual & UX — Frontend WhosDo.com

## 1. Visão Geral

Este documento consolida diretrizes e recomendações para a evolução do frontend do WhosDo.com, inspirado nas melhores práticas do mercado (ex: 21devs) e nos documentos estratégicos do projeto. O objetivo é garantir uma experiência moderna, escalável, acessível e com alto potencial de engajamento e monetização.

---

## 2. Arquitetura Visual & Organização

- **Colocation de Componentes:**
  - Mantenha componentes próximos das rotas que os utilizam (`src/app/(app)/dashboard/components/`, etc).
  - Facilita manutenção, clareza e escalabilidade.
- **Estrutura por Features:**
  - Organize o código por domínio de negócio em `src/features/` (ex: `profile`, `feed`, `billing`).
  - Cada feature deve conter seus próprios componentes, hooks, serviços e tipos.
- **Camada de Serviços:**
  - Centralize lógica de dados em `src/services/`, desacoplando UI de acesso a dados.
- **Utilitários Modulares:**
  - Separe utilitários por escopo (`date.utils.ts`, `string.utils.ts`, etc).

---

## 3. Identidade Visual & UI

- **Cores:**
  - Primária: Branco ou cinza claro (#F5F5F5) para fundo.
  - Secundária: Azul escuro ou cinza carvão (#333333) para textos e elementos principais.
  - Acento: Teal (#008080) para CTAs e destaques.
- **Tipografia:**
  - Use fontes sans-serif modernas, com hierarquia clara de títulos e textos.
  - Garanta legibilidade em todos os tamanhos de tela.
- **Ícones:**
  - Ícones simples, reconhecíveis e consistentes (outline ou filled, mas nunca misturados).
- **Layout:**
  - SPA (Single Page Application) para navegação fluida.
  - Cards, listas e grids para exibir perfis, portfólios e feeds.
  - Sidebar fixa para navegação principal (dashboard), menu superior para áreas públicas.
- **Animações:**
  - Transições suaves em botões, menus e feedbacks de ação.
  - Use microinterações para engajar (ex: animação ao ganhar badge ou completar ação).

---

## 4. Experiência do Usuário (UX)

- **Onboarding Guiado:**
  - Passo a passo para novos usuários criarem e completarem seu perfil.
  - Dicas contextuais e sugestões automáticas de melhoria de perfil.
- **Gamificação:**
  - Badges, conquistas e recompensas visuais por ações (ex: completar perfil, convidar amigos).
  - Barra de progresso para incentivar o preenchimento do perfil.
- **Ações Rápidas:**
  - QuickActions para criar stories, cupons ou anúncios em poucos cliques.
- **Feedback Imediato:**
  - Toasts, banners e tooltips para informar sucesso, erro ou dicas.
- **Acessibilidade:**
  - Contraste adequado, navegação por teclado, textos alternativos em imagens.
  - Testar com ferramentas como Lighthouse e axe.
- **Responsividade:**
  - Mobile-first, com breakpoints para tablets e desktops.
  - Menus adaptativos, cards empilhados e botões grandes para toque.

---

## 5. Monetização & Engajamento

- **Plano Freemium:**
  - Limite de uso para recursos gratuitos, com destaque visual para benefícios do upgrade.
- **Microtransações:**
  - Sistema de moedas para ações extras (ex: stories, boosts, cupons).
  - Upsell contextual: banners e sugestões de compra de moedas/créditos.
- **Trial e Cross-sell:**
  - Ofereça trial de recursos premium ao completar ações-chave.
  - Sugira upgrades no momento de maior engajamento.
- **Notificações Personalizadas:**
  - Mensagens de incentivo baseadas em uso (ex: "Seu anúncio foi visto 1.000 vezes!").

---

## 6. Recomendações Práticas

- **Componentização Extrema:**
  - Quebre telas em componentes reutilizáveis e testáveis.
- **Design Tokens:**
  - Centralize cores, espaçamentos e fontes para fácil customização.
- **Documentação Viva:**
  - Mantenha um Storybook ou documentação de componentes para referência e onboarding de novos devs.
- **Testes de Usabilidade:**
  - Realize sessões periódicas de teste com usuários reais.
- **Analytics:**
  - Integre ferramentas para rastrear uso de recursos, funis de conversão e pontos de abandono.

---

## 7. Inspiração 21devs & Modern SaaS

- **Interface limpa, com foco no conteúdo e ações principais.**
- **Onboarding visual e interativo, com feedback em tempo real.**
- **Gamificação sutil, mas presente em toda a jornada do usuário.**
- **Painéis e dashboards com métricas claras e CTAs visíveis.**
- **Atenção a detalhes de micro UX: loaders, skeletons, animações de transição.**

---

## 8. Próximos Passos

1. Mapear todos os fluxos de usuário e criar wireframes de baixa fidelidade.
2. Definir design tokens e criar um guia de estilos compartilhado.
3. Refatorar componentes para colocation e estrutura por features.
4. Implementar onboarding gamificado e feedbacks visuais.
5. Validar com usuários reais e iterar continuamente.

---

> **Este documento deve ser revisado e expandido conforme o produto evolui. Use-o como referência viva para decisões de UX, UI e arquitetura do frontend.**
>
> Consulte também: `onboarding.md` (setup de devs), `testes.md` (estratégia de testes automatizados) e mantenha o Storybook atualizado. 