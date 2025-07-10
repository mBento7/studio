# Acompanhamento de Progresso e Revisões

> Última revisão: 24/06/2025  
> Responsável: Micael Bento

## Progresso Geral

- Tarefas concluídas: 12/20 (60%)
- Próxima revisão agendada: 09/07/2024

---

## Etapa 1: Estrutura e Base do Projeto
- [x] Migrar para Monorepo
- [x] Refatoração por Features
- [x] Finalizar modularização de componentes por feature (dashboard, colocation)
- [x] Centralizar lógica de dados em serviços (`src/services/`)
- [x] Modularizar utilitários conforme crescerem (`src/lib/utils.ts`)

---

## Etapa 2: Infraestrutura e Deploy
- [ ] Provisionar VPS com Ubuntu 24.04 LTS
- [ ] Atualizar o sistema e instalar dependências básicas
- [ ] Instalar Docker e Docker Compose
- [ ] Instalar e configurar Coolify
- [ ] Configurar domínio, SSL e deploy automatizado (Coolify)
- [ ] Automatizar deploy via Git/Webhook
- [ ] (Opcional) Instalar Supabase CLI
- [ ] Configurar backups e monitoramento (Coolify, Supabase)
- [ ] Garantir gestão de segredos (Coolify/Supabase Vault)
- [ ] Criar scripts de automação para abrir painéis (Coolify, Supabase, etc.)

---

## Etapa 3: Banco de Dados e Segurança
- [x] Versionar todas as migrations (migrar seed.sql para migrations)
- [x] Padronizar nomes de colunas (`profile_id`, etc.)
- [x] Documentar e versionar políticas RLS (db/policies/)
- [x] Garantir ativação de RLS em todas as tabelas sensíveis
- [x] Atualizar código para consumir novas tabelas e políticas
- [x] Checklist de segurança: revisar rotas privadas, variáveis sensíveis, auditoria de políticas, search_path explícito em funções

---

## Etapa 4: Produto, Monetização e Funcionalidades
- [ ] Implementar compra de moedas (integração de pagamentos)
- [ ] Criar e automatizar templates de e-mail (upsell, notificações)
- [ ] Integrar analytics para rastreamento de conversões e uso
- [ ] Integrar novos componentes de anúncio nas páginas correspondentes

---

## Etapa 5: Edge Functions e Escalabilidade
- [x] Criar pasta padrão para Edge Functions (`supabase/functions/`)
- [x] Implementar Edge Functions para chat, notificações, créditos, webhooks (iniciado: update-profile-visibility)
- [x] Versionar e documentar cada função (parâmetros, exemplos, políticas)
- [x] Integrar chamadas às Edge Functions no frontend (Next.js) (iniciado)
- [ ] Adicionar monitoramento/logs das funções
- [ ] Checklist de segurança para Edge Functions

---

## Etapa 6: Documentação e Automação
- [x] Atualizar README principal e READMEs de subpastas
- [x] Manter checklist de produção atualizado
- [ ] Documentar rotas públicas e privadas
- [ ] Documentar scripts de automação e painéis
- [ ] Automatizar checagem e atualização diária da documentação

---

## Etapa 7: Melhoria Contínua e Limpeza
- [ ] Organizar pacotes reutilizáveis em `packages/` (UI kit, types, hooks)
- [ ] Avaliar adoção de gerenciador de estado global (Zustand/Jotai)
- [ ] Limpeza periódica de código e pastas legadas
- [ ] Revisar e expandir automações conforme necessidade do time

---

## Etapa 8: Refatoração de Layouts React/Next.js

> Melhoria contínua para facilitar manutenção, leitura e escalabilidade dos layouts.

- [ ] Mapear grandes blocos de JSX em arquivos de layout (ex: index.tsx)
- [ ] Extrair blocos em componentes menores e reutilizáveis (ex: ProfileHeader, SocialLinks, ProfileStats)
- [ ] Organizar componentes em subpastas específicas por layout ou por domínio
- [ ] Substituir renderizações condicionais complexas por funções auxiliares ou componentes
- [ ] Usar .map() para listas (skills, links, stats) com componentes pequenos
- [ ] Padronizar estilos com Tailwind, CSS Modules ou styled-components
- [ ] Comentar blocos complexos e documentar props importantes
- [ ] Extrair lógicas de estado/manipulação para hooks customizados (ex: useProfileStats)
- [ ] Adotar Storybook para desenvolvimento isolado de componentes
- [ ] Refatorar continuamente ao adicionar novas features, priorizando blocos reutilizáveis

> Exemplo: Após extrair um bloco, basta remover a chamada do componente (ex: <ProfileStats />) para eliminar a seção, facilitando manutenção e testes.

---

> **Dica:** Sempre que concluir uma etapa, revise dependências entre tarefas e priorize as que desbloqueiam outras áreas do projeto.  
> Consulte os planos de refatoração e roteiros estratégicos para detalhes e exemplos.
