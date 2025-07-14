# 🛠️ Apresentação Técnica – Whosfy.com

> Documento técnico e estrutural para desenvolvedores, parceiros de tecnologia e auditorias. Para visão institucional, acesse [apresentacao-institucional.md](./apresentacao-institucional.md).

---

## Sumário
- [Visão Técnica Geral](#visão-técnica-geral)
- [Arquitetura e Tecnologias](#arquitetura-e-tecnologias)
- [Automação e Scripts](#automação-e-scripts)
- [Fluxo de Deploy e Infraestrutura](#fluxo-de-deploy-e-infraestrutura)
- [Testes e Qualidade](#testes-e-qualidade)
- [Segurança e Boas Práticas](#segurança-e-boas-práticas)
- [Roadmap Técnico](#roadmap-técnico)
- [Documentação e Onboarding](#documentação-e-onboarding)

---

## ⚙️ Visão Técnica Geral

Whosfy.com é uma plataforma desenvolvida com foco em escalabilidade, automação e facilidade de manutenção. O projeto adota arquitetura monorepo, cultura de documentação viva e automação de ponta a ponta para garantir agilidade e segurança em todas as etapas do ciclo de vida do produto.

---

## 🏗️ Arquitetura e Tecnologias

- **Docker** (pré-requisito obrigatório para rodar tanto o Coolify quanto o Supabase local)
- **Next.js 14** (App Router, SSR/SSG, API Routes)
- **Supabase** (Postgres, Auth, Storage, Edge Functions)
- **Coolify** (deploy automatizado e gestão de infraestrutura)
- **pnpm** (monorepo, workspaces)
- **Tailwind CSS** e **Shadcn/UI** (design system)
- **TypeScript** (segurança e clareza de tipos)
- **Scripts customizados** para migrations, seed, backup, testes e automação

---

## 🖥️ Dependências de Infraestrutura

- **Docker e Docker Compose:** obrigatórios para rodar todos os serviços do projeto, incluindo Supabase local e Coolify.
- **Node.js:** para rodar scripts, Supabase CLI e o app Next.js.
- **Supabase CLI:** opcional, facilita o setup e gerenciamento do banco local.

---

## 🤖 Automação e Scripts

- Scripts para:
  - 🚀 Rodar e versionar migrations
  - 🌱 Executar seed do banco
  - 💾 Realizar backup automatizado
  - 🧪 Rodar testes unitários, integração e E2E
  - 🔄 Atualizar documentação e checklists
- Centralização dos scripts em `/scripts` para fácil manutenção
- Integração planejada com CI/CD para deploy e testes automáticos

---

## ☁️ Fluxo de Deploy e Infraestrutura

- Deploy automatizado via Coolify (VPS Oracle, Docker, domínio próprio, SSL)
- **Docker é a base de toda a orquestração de serviços, tanto para o app web quanto para o Supabase local**
- Supabase local para desenvolvimento e homologação, com possibilidade de migração para Supabase Cloud
- Scripts de setup para provisionamento, configuração de variáveis, migrations e seed
- Monitoramento, backup e logs integrados ao fluxo de deploy

---

## 🧪 Testes e Qualidade

- Estrutura pronta para testes unitários (Jest, Vitest), integração e E2E (Cypress, Playwright)
- Checklist de cobertura e resultados documentados
- Planejamento de automação de testes no CI/CD
- Cultura de "testar antes de subir" e revisão de código colaborativa

---

## 🔒 Segurança e Boas Práticas

- Checklist de segurança para APIs, frontend e infraestrutura
- Uso de RLS (Row Level Security) no banco
- Gestão de segredos e variáveis sensíveis
- Proteção de rotas privadas, autenticação obrigatória e CORS restrito
- Backup e monitoramento contínuos

---

## 🗺️ Roadmap Técnico

- Finalizar automação total de deploy, backup e testes
- Expandir cobertura de testes automatizados
- Evoluir integrações de analytics, monitoramento e performance
- Refino contínuo da arquitetura e documentação

---

## 📚 Documentação e Onboarding

- Manual para novos usuários e desenvolvedores no `NEXT_STEPS.md`
- Documentação centralizada em `/docs` e READMEs de subpastas
- Checklists de migração, deploy, segurança e testes sempre atualizados
- Onboarding facilitado para novos membros e parceiros

---

> Última atualização: 10/07/2025 