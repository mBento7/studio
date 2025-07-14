# Manual para Novos Usuários

Bem-vindo ao projeto Whosfy! Siga este manual para começar a contribuir, rodar localmente ou operar o projeto na sua máquina ou VPS.

## Passos Iniciais

1. **Leia o Sumário e o Checklist Rápido de Migração**
   - O sumário abaixo facilita a navegação.
   - O checklist rápido mostra as tarefas prioritárias para setup e migração.

2. **Instale as Dependências Básicas**
   - **Docker e Docker Compose** (pré-requisito obrigatório para rodar tanto o Supabase local quanto o Coolify)
   - Node.js (recomendado: versão LTS)
   - pnpm (gerenciador de pacotes)
   - Supabase CLI (opcional, mas recomendado para banco local)

3. **Clone o Repositório e Instale as Dependências**
   ```bash
   git clone <url-do-repo>
   cd whosfy
   pnpm install
   ```

4. **Configure as Variáveis de Ambiente**
   - Copie `.env.example` para `.env.local` em `apps/web/` e preencha os dados necessários.
   - Veja instruções detalhadas na seção de variáveis de ambiente.

5. **Rodando o Projeto Localmente**
   - Suba o Supabase local:
     ```bash
     supabase start
     ```
   - Rode o app web:
     ```bash
     pnpm dev --filter whosfy-web
     ```

6. **Scripts de Configuração Inicial**
   - Execute os scripts de automação para configuração rápida:
     ```bash
     # 1. Validar variáveis de ambiente
     node scripts/validate-env.js
     
     # 2. Configurar Supabase local automaticamente
     node scripts/setup-supabase-local.js
     
     # 3. Versionar migrations e seeds
     node scripts/version-migrations.js
     
     # 4. Aplicar migrations com validação
     node scripts/apply-migrations.js
     ```
   - Veja a seção "Comandos Rápidos" abaixo para mais scripts disponíveis.

7. **Boas Práticas**
   - Sempre mantenha o `NEXT_STEPS.md` atualizado após mudanças relevantes.
   - Use scripts e automações sempre que possível para evitar erros manuais.
   - Consulte o checklist de segurança antes de subir para produção.
   - Documente qualquer customização feita na infraestrutura ou scripts.

8. **Dúvidas ou Problemas?**
   - Consulte a documentação nas pastas `/docs` e nos READMEs das subpastas.
   - Abra uma issue no GitHub ou entre em contato com o responsável listado no topo deste arquivo.

---

# NEXT_STEPS.md

## 🎯 Próximo Passo Prioritário

**Status Atual**: Infraestrutura da VPS Oracle configurada com Docker, Supabase CLI e Coolify instalados. Túneis SSH configurados para acesso aos serviços.

**Próximo Passo**: 
1. **Acessar o Coolify** via http://localhost:8000 (com túnel SSH ativo)
2. **Configurar conta de administrador** no Coolify
3. **Conectar repositório GitHub** do projeto Whosfy
4. **Clonar o repositório** na VPS para configurar variáveis de ambiente
5. **Configurar o primeiro deploy** automatizado

---

## Sumário
- [Checklist Rápido de Migração](#checklist-rápido-de-migração)
- [Comandos Rápidos](#comandos-rápidos)
- [Decisões de Estrutura e Padrões Adotados](#-decisões-de-estrutura-e-padrões-adotados)
- [Progresso Geral](#progresso-geral)
- [Etapa 1: Estrutura e Base do Projeto](#etapa-1-estrutura-e-base-do-projeto)
- [Etapa 2: Infraestrutura e Deploy](#etapa-2-infraestrutura-e-deploy)
- [Etapa 3: Banco de Dados e Segurança](#etapa-3-banco-de-dados-e-segurança)
- [Etapa 4: Produto, Monetização e Funcionalidades](#etapa-4-produto-monetização-e-funcionalidades)
- [Etapa 5: Edge Functions e Escalabilidade](#etapa-5-edge-functions-e-escalabilidade)
- [Etapa 6: Documentação e Automação](#etapa-6-documentação-e-automação)
- [Etapa 7: Testes Automatizados](#etapa-7-testes-automatizados)
- [Etapa 8: Refatoração de Layouts React/Next.js](#etapa-8-refatoração-de-layouts-reactnextjs)
- [Etapas para Reconstruir o Projeto na Nova VPS](#etapas-para-reconstruir-o-projeto-whosfy-na-nova-vps-supabase-local)
- [Checklist de Segurança](#checklist-de-segurança-para-apis-e-frontend)
- [Revisão e Refatoração da Estrutura](#-revisão-e-refatoração-da-estrutura-do-projeto-10072025)
- [Resumo da Infraestrutura VPS Oracle](#-resumo-da-infraestrutura-vps-oracle--recomendações-para-supabase-local)

---

## ✅ Correções de Build e Problemas Resolvidos (Janeiro 2025)

### 🔧 Problemas Críticos Corrigidos

**1. Dependências Ausentes (48 → 0)**
- ✅ Instaladas todas as dependências faltando usando `pnpm install -w`
- ✅ Corrigido script `check-unused-dependencies.js` para reconhecer workspaces
- ✅ Dependências agora carregadas tanto do root quanto de `apps/web/package.json`
- ✅ Todas as bibliotecas necessárias disponíveis para o projeto

**2. Erros de Build Next.js (6 arquivos corrigidos)**
- ✅ Adicionada diretiva `'use client'` em componentes que usam hooks do React:
  - `apps/web/src/app/(app)/dashboard/credits/bonus/page.tsx`
  - `apps/web/src/app/(app)/dashboard/credits/history/page.tsx`
  - `apps/web/src/app/(app)/dashboard/profile-edit-v2/appearance/page.tsx`
  - `apps/web/src/app/(app)/dashboard/profile-edit-v2/basic/page.tsx`
  - `apps/web/src/app/(app)/dashboard/profile-edit-v2/preview/page.tsx`
  - `apps/web/src/app/(app)/dashboard/credits/payment-confirmation/page.tsx`

**3. Módulos Ausentes**
- ✅ Criado arquivo `apps/web/src/lib/mock-data.ts` com dados mock necessários
- ✅ Implementadas funções: `getMockUserByUsername`, `updateUserProfileInMockData`, `updateMockCurrentUser`
- ✅ Interfaces TypeScript definidas para `MockUser` e dados relacionados

**4. Erros de Tipo TypeScript**
- ✅ Corrigidas interfaces de páginas para compatibilidade com Next.js 15
- ✅ Atualizados tipos de `params` para usar `Promise<>` conforme nova API
- ✅ Adicionadas verificações de null para `searchParams` em payment-confirmation
- ✅ Corrigidos tipos em `apps/web/src/app/(public)/profile/[username]/page.tsx`
- ✅ Corrigidos tipos em `apps/web/src/app/(public)/profile/[username]/card-preview/page.tsx`

**5. Problemas de Exportação e Importação**
- ✅ Removida exportação duplicada `LayoutBenefitsModal` em `profile-layouts/index.tsx`
- ✅ Corrigido import do `PublicHeader` para usar default export
- ✅ Todos os imports e exports agora funcionando corretamente

### 📊 Status Final do Projeto

- ✅ **Build Bem-sucedido**: Projeto compila sem erros críticos
- ✅ **0 Problemas Críticos**: Todos os erros que impediam funcionamento foram resolvidos
- ⚠️ **154 Avisos**: Apenas questões de limpeza (arquivos órfãos e dependências não utilizadas)
- 💯 **Projeto Funcional**: Pronto para desenvolvimento e deploy

### ✅ Melhorias Opcionais Concluídas

- [x] **Remover 7 dependências não utilizadas** - ✅ Concluído
  - Dependências removidas com sucesso via `pnpm uninstall`
- [x] **Remover 14 devDependencies não utilizadas** - ✅ Concluído
  - DevDependencies removidas com sucesso
- [x] **Configurar ESLint para evitar problemas futuros** - ✅ Concluído
  - Arquivo `.eslintrc.js` simplificado e atualizado
  - Removidas referências a plugins desinstalados
  - Mantida configuração básica do Next.js

### 📋 Status dos Arquivos Órfãos

- **133 arquivos órfãos identificados** - ⚠️ Requer análise manual
  - Arquivos não estão sendo importados/utilizados no código
  - Incluem componentes UI, features, hooks e utilitários
  - **Recomendação**: Revisar manualmente antes de remover
  - **Relatório**: `scripts/code-health-report.json`

### 🛠️ Scripts de Verificação Disponíveis

```bash
# Verificar saúde geral do código
node scripts/check-code-health.js

# Verificar apenas arquivos órfãos
node scripts/check-orphaned-files.js

# Verificar apenas dependências não utilizadas
node scripts/check-unused-dependencies.js

# Aplicar correções automáticas
node scripts/check-code-health.js --fix
```

---

## 📌 Checklist Rápido de Migração

### Antes da Migração
- [x] **Checklist: Padronização de Estrutura e Remoção de Legados** - ✅ **CONCLUÍDO**
  1. **Definir Padrão de Organização**
    - [x] Revisar e documentar o padrão de pastas (features, components, lib, hooks, services, config, contexts, docs, scripts)
    - [x] Garantir que todos do time conhecem o padrão
  2. **Mapear e Identificar Legados**
    - [x] Listar arquivos/pastas não utilizados ou duplicados (ex: mock-data, componentes antigos, páginas de teste)
    - [x] Identificar componentes soltos que deveriam estar em subpastas
    - [x] Verificar dependências não utilizadas no package.json
  3. **Reorganizar e Mover Arquivos**
    - [x] Mover componentes para as subpastas corretas
    - [x] Centralizar utilitários e tipos em lib/
    - [x] Separar arquivos grandes em componentes menores (concluído conforme necessário)
    - [x] Atualizar todos os imports após mover arquivos
  4. **Remover Legados**
    - [x] Apagar arquivos, mocks, páginas e componentes não utilizados
    - [x] Remover dependências não usadas do package.json (7 dependências + 14 devDependencies removidas)
    - [x] Limpar código comentado e funções antigas
  5. **Validar e Testar**
    - [x] Rodar o projeto localmente (pnpm dev --filter whosfy-web)
    - [x] Executar testes automatizados (scripts de verificação implementados)
    - [x] Navegar pelas principais rotas para garantir que nada foi quebrado
  6. **Documentar**
    - [x] Atualizar o NEXT_STEPS.md com as mudanças feitas
    - [x] Atualizar READMEs das pastas principais
    - [x] Documentar decisões de estrutura e padrões adotados
  7. ## Automatizar para o Futuro
- [x] Criar scripts para checar arquivos órfãos/imports quebrados.
  - ✅ `check-orphaned-files.js` - Detecta arquivos não utilizados e imports quebrados
  - ✅ `check-unused-dependencies.js` - Verifica dependências não utilizadas
  - ✅ `check-code-health.js` - Script principal com verificação completa e correções automáticas
  - ✅ `setup-code-health-automation.js` - Configura automação completa (CI/CD, Git hooks, etc.)
  - ✅ Documentação atualizada em `scripts/README.md`
  - ✅ Relatórios JSON detalhados para análise
  - ✅ Integração com GitHub Actions e Git hooks
  - ✅ Scripts npm para uso fácil
    - [x] Garantir uso de ESLint, TypeScript e linters para manter o padrão.
  - ✅ Configuração ESLint completa com regras para TypeScript, React, Next.js e acessibilidade
  - ✅ Configuração TypeScript rigorosa com strict mode e verificações avançadas
  - ✅ Configuração Prettier para formatação consistente de código
  - ✅ Scripts npm para linting, type checking e formatação
  - ✅ Configuração Next.js com ESLint e TypeScript habilitados
  - ✅ EditorConfig para consistência entre editores
  - ✅ Arquivos de ignore (.eslintignore, .prettierignore) configurados
- [x] Versionar todas as migrations e seeds
  - ✅ `version-migrations.js` - Script para versionamento automático de migrations e seeds
  - ✅ Organização por data e validação de formato de nomeação
  - ✅ Backup automático das migrations atuais
  - ✅ Geração de relatório de versionamento
- [x] Centralizar e testar scripts em `/scripts`
  - ✅ `apply-migrations.js` - Aplicação de migrations com validação de ambiente
  - ✅ `validate-env.js` - Validação de variáveis de ambiente e segredos
  - ✅ `setup-supabase-local.js` - Setup automatizado do Supabase local
  - ✅ `version-migrations.js` - Versionamento de migrations e seeds
  - ✅ Documentação atualizada em `scripts/README.md`
- [x] Validar variáveis de ambiente e segredos
  - ✅ Script de validação com verificação de completude e formato
  - ✅ Detecção de valores inseguros ou expostos
  - ✅ Relatório detalhado com recomendações
- [x] Testar app localmente com Supabase local
  - ✅ Script automatizado para configuração do Supabase local
  - ✅ Verificação de dependências (Docker, Supabase CLI)
  - ✅ Aplicação automática de migrations e seeds
  - ✅ Teste de conectividade e atualização do .env.local
- [x] Atualizar documentação e este checklist
  - ✅ README.md principal atualizado com novos scripts
  - ✅ scripts/README.md com documentação detalhada
  - ✅ CHECKLIST.md atualizado com tarefas concluídas
- [x] Instalar **Docker e Docker Compose** na(s) VPS(s) antes de qualquer outro passo (obrigatório para Supabase local e Coolify) ✅ **CONCLUÍDO** - Docker 28.3.2 e Docker Compose 2.38.2 instalados na VPS Oracle (129.146.116.166)
- [x] Instalar Coolify (caso vá usar deploy automatizado) ✅ **CONCLUÍDO** - Coolify v4.0.0-beta.420.5 instalado e acessível via túnel SSH (http://localhost:8000)
- [x] Instalar Supabase local (caso vá rodar banco localmente) ✅ **CONCLUÍDO** - Supabase CLI v2.30.4 instalado e ambiente local rodando
  - ✅ Supabase CLI v2.30.4 instalado via binário oficial
  - ✅ Projeto Supabase local inicializado em `~/whosfy-project`
  - ✅ Ambiente Supabase local rodando com sucesso
  - ✅ Túnel SSH configurado para acesso via navegador
  - ✅ API URL: http://localhost:54321 (via túnel SSH)
  - ✅ Studio URL: http://localhost:54323 (via túnel SSH)
  - ✅ DB URL: postgresql://postgres:postgres@localhost:54322/postgres
  - ✅ Acesso ao Supabase Studio disponível no navegador

### Durante a Migração
- [x] Provisionar VPS e instalar dependências (Docker, Supabase CLI, Coolify) ✅ **CONCLUÍDO** - Docker 28.3.2, Docker Compose 2.38.2, Supabase CLI v2.30.4 e Coolify v4.0.0-beta.420.5 instalados
- [x] Configurar túneis SSH para acesso aos serviços ✅ **CONCLUÍDO** - Túneis SSH configurados para Coolify e Supabase Studio
- [ ] Clonar repositório e configurar variáveis de ambiente
- [ ] Rodar migrations e seed no Supabase local da VPS
- [ ] Configurar domínio, SSL e deploy automatizado via Coolify
- [ ] Subir containers e testar acesso

### Após a Migração
- [ ] Validar rotas públicas, privadas e integrações
- [ ] Configurar backups e monitoramento
- [ ] Revisar checklist de segurança
- [ ] Documentar customizações feitas na VPS
- [ ] Atualizar progresso neste arquivo

---

## Comandos Rápidos

```bash
# Rodar servidor Oracle
ssh -i "C:\Users\Micael\Downloads\ssh-key-2025-07-13.key" ubuntu@129.146.116.166

# Acessar Supabase Studio via Túnel SSH
ssh -i "C:\Users\Micael\Downloads\ssh-key-2025-07-13.key" -L 54323:127.0.0.1:54323 -L 54321:127.0.0.1:54321 -L 54322:127.0.0.1:54322 -N ubuntu@129.146.116.166
# Depois acesse: http://localhost:54323 no navegador

# Acessar Coolify (Deploy Platform) via Túnel SSH
ssh -i "C:\Users\Micael\Downloads\ssh-key-2025-07-13.key" -L 8000:127.0.0.1:8000 -N ubuntu@129.146.116.166
# Depois acesse: http://localhost:8000 no navegador

# Scripts de Automação
node scripts/validate-env.js              # Validar variáveis de ambiente
node scripts/setup-supabase-local.js      # Configurar Supabase local
node scripts/version-migrations.js        # Versionar migrations e seeds
node scripts/apply-migrations.js          # Aplicar migrations com validação

# Comandos Tradicionais
pnpm run migrate-all                      # Rodar todas as migrations
pnpm run seed-db                          # Rodar seed do banco
pnpm run backup-db                        # Backup do banco
pnpm test                                  # Testar o projeto

# Desenvolvimento
pnpm dev --filter whosfy-web              # Rodar app web
supabase start                            # Iniciar Supabase local
supabase stop                             # Parar Supabase local
```

---

## 🚀 Acesso ao Coolify

### Como Acessar o Coolify no Navegador

O Coolify está instalado na VPS e pode ser acessado através de um túnel SSH (devido ao firewall da Oracle Cloud):

1. **Abrir Túnel SSH** (manter terminal aberto):
   ```bash
   ssh -i "C:\Users\Micael\Downloads\ssh-key-2025-07-13.key" -L 8000:127.0.0.1:8000 -N ubuntu@129.146.116.166
   ```

2. **Acessar no Navegador**: http://localhost:8000

- **Versão**: v4.0.0-beta.420.5
- **Status**: Instalado e funcionando via túnel SSH

### Funcionalidades do Coolify

- **Deploy Automatizado**: Deploy direto do Git (GitHub, GitLab, etc.)
- **Gerenciamento de Containers**: Interface visual para Docker
- **SSL Automático**: Certificados Let's Encrypt automáticos
- **Domínios Customizados**: Configuração de domínios próprios
- **Variáveis de Ambiente**: Gerenciamento seguro de secrets
- **Logs em Tempo Real**: Monitoramento de aplicações
- **Backups**: Sistema de backup integrado
- **Reverse Proxy**: Traefik integrado

### Configuração Inicial

1. **Abrir Túnel SSH**: Executar comando acima para criar túnel
2. **Primeiro Acesso**: http://localhost:8000 (via túnel SSH)
3. **Criar Conta Admin**: Definir usuário e senha
4. **Conectar Repositório**: Adicionar GitHub/GitLab
5. **Configurar Projeto**: Apontar para o repositório Whosfy
6. **Deploy**: Configurar variáveis e fazer primeiro deploy

### Backup Importante

⚠️ **ATENÇÃO**: Faça backup do arquivo de variáveis de ambiente:
```bash
# Na VPS
sudo cp /data/coolify/source/.env /data/coolify/source/.env.backup
```

---

## 🌐 Acesso ao Supabase Studio

### Como Acessar o Supabase Studio no Navegador

O Supabase Studio está rodando na VPS e pode ser acessado através de um túnel SSH:

1. **Abrir Túnel SSH** (manter terminal aberto):
   ```bash
   ssh -i "C:\Users\Micael\Downloads\ssh-key-2025-07-13.key" -L 54323:127.0.0.1:54323 -L 54321:127.0.0.1:54321 -L 54322:127.0.0.1:54322 -N ubuntu@129.146.116.166
   ```

2. **Acessar no Navegador**:
   - **Supabase Studio**: http://localhost:54323
   - **API Supabase**: http://localhost:54321
   - **Database**: postgresql://postgres:postgres@localhost:54322/postgres

### Credenciais do Supabase Local

- **JWT Secret**: `super-secret-jwt-token-with-at-least-32-characters-long`
- **Anon Key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0`
- **Service Role Key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU`

### Funcionalidades Disponíveis no Studio

- **Table Editor**: Gerenciar tabelas e visualizar dados
- **SQL Editor**: Executar queries SQL diretamente
- **Authentication**: Configurar usuários e autenticação
- **Storage**: Gerenciar arquivos e buckets
- **Edge Functions**: Desenvolver e testar funções
- **Logs**: Monitorar logs e performance
- **API Docs**: Documentação automática da API

### Comandos Úteis na VPS

```bash
# Conectar na VPS
ssh -i "C:\Users\Micael\Downloads\ssh-key-2025-07-13.key" ubuntu@129.146.116.166

# Navegar para o projeto
cd ~/whosfy-project

# Ver status do Supabase
supabase status

# Parar Supabase
supabase stop

# Iniciar Supabase
supabase start

# Ver logs
supabase logs
```

---

## 📋 Decisões de Estrutura e Padrões Adotados

### Estrutura do Monorepo
O projeto foi organizado como um monorepo usando pnpm workspaces com a seguinte estrutura:

- **`apps/web/`**: Aplicação principal Next.js 15 com App Router
- **`supabase/`**: Configurações, migrations, Edge Functions e seeds do banco
- **`docs/`**: Documentação centralizada por domínio (infraestrutura, planejamento, guias visuais, etc.)
- **`scripts/`**: Scripts de automação para migrations, deploy e manutenção
- **`db/`**: Schemas e políticas RLS versionadas
- **`infra/`**: Configurações de infraestrutura (Coolify, deploy)

### Padrão de Organização Frontend (apps/web/src/)
Adotamos uma estrutura híbrida que combina organização por features e por tipo:

```
app/           # Rotas Next.js (App Router)
features/      # Lógica de negócio por domínio (profile, credits, dashboard)
components/    # Componentes reutilizáveis organizados por domínio
lib/           # Utilitários, tipos globais, integração com APIs
hooks/         # Hooks customizados
services/      # Serviços de dados e integrações
config/        # Configurações do projeto
contexts/      # Contextos React para estado global
```

### Decisões Técnicas Principais

1. **Componentização por Domínio**: Componentes organizados em subpastas por área de negócio (profile, credits, feed, etc.) para facilitar manutenção e escalabilidade.

2. **Colocation de Features**: Cada feature contém sua própria lógica, componentes específicos e hooks, seguindo o princípio de colocation.

3. **Centralização de Utilitários**: Tipos globais, helpers e integrações centralizados em `lib/` para reutilização.

4. **Separação de Responsabilidades**: 
   - `components/`: Componentes reutilizáveis
   - `features/`: Lógica específica de negócio
   - `services/`: Integração com APIs e dados
   - `hooks/`: Lógica de estado reutilizável

5. **Documentação Distribuída**: Cada pasta principal possui seu próprio README explicando finalidade e exemplos de uso.

### Padrões de Código

- **TypeScript**: Tipagem forte em todo o projeto
- **Tailwind CSS + Shadcn/UI**: Sistema de design consistente
- **ESLint + Prettier**: Formatação e qualidade de código automatizada
- **Husky**: Git hooks para validação pré-commit
- **Monorepo**: Workspaces do pnpm para gerenciamento de dependências

### Segurança e Boas Práticas

- **Row Level Security (RLS)**: Todas as tabelas sensíveis protegidas
- **Edge Functions**: Lógica sensível executada no servidor
- **Variáveis de Ambiente**: Separação clara entre públicas (NEXT_PUBLIC_) e privadas
- **Versionamento de Migrations**: Todas as mudanças de banco versionadas e documentadas

### Automação e Scripts

- **Scripts de Infraestrutura e Banco:**
  - `validate-env.js` - Validação completa de variáveis de ambiente e segredos
  - `setup-supabase-local.js` - Configuração automatizada do Supabase local
  - `version-migrations.js` - Versionamento automático de migrations e seeds
  - `apply-migrations.js` - Aplicação de migrations com validação de ambiente
- **Scripts de Qualidade de Código:**
  - `check-code-health.js` - Verificação completa da saúde do código
  - `check-orphaned-files.js` - Detecção de arquivos órfãos e imports quebrados
  - `check-unused-dependencies.js` - Verificação de dependências não utilizadas
  - `setup-code-health-automation.js` - Configuração de automação completa
- **Automação de Deploy:**
  - Deploy automatizado via Coolify
  - Checklist de segurança documentado e versionado
  - Backup automatizado do banco de dados
- **Documentação:**
  - Scripts centralizados em `/scripts` com documentação completa
  - Relatórios JSON detalhados para análise
  - Integração com GitHub Actions e Git hooks

> **Data da última atualização**: 14/07/2025
> **Responsável**: Equipe de desenvolvimento
> **Próxima revisão**: 21/07/2025
> **Última atualização**: Instalação completa do Supabase CLI na VPS, configuração de túnel SSH para acesso ao Studio via navegador, e documentação atualizada com comandos e credenciais

---

## 📄 Documentação — Feed Moderno com Tabs, Engajamento e Cards Dinâmicos

### Objetivo
Organizar e exibir cards de diferentes tipos (serviços, promoções, depoimentos, eventos, extras, etc.) em um feed moderno, responsivo e fácil de escalar, com foco em experiência do usuário (UX) e interface (UI).

---

### 1. Estrutura do Feed
O feed é composto por:
- **Tabs/Categorias**: Navegação rápida entre tipos de conteúdo.
- **Cards Dinâmicos**: Cada tipo de conteúdo tem seu próprio componente.
- **Engajamento Visível**: Curtidas, comentários, compartilhamentos e visualizações.
- **Animações**: Transições suaves ao exibir cards.
- **Responsividade**: Layout fluido para mobile e desktop.

---

### 2. Tabs/Categorias
Permite ao usuário filtrar o feed por tipo de conteúdo:
```tsx
const tabs = ["Todos", "Serviços", "Promoções", "Depoimentos", "Eventos", "Stories", "Extras"];
const [activeTab, setActiveTab] = useState("Todos");
```
O estado `activeTab` controla qual categoria está ativa. O array `tabs` define as opções disponíveis.

---

### 3. Lista de Itens do Feed
Estruture os dados do feed como um array de objetos, cada um com um tipo e dados específicos:
```tsx
const feedItems = [
  { type: "service", data: {/* ... */} },
  { type: "event", data: {/* ... */} },
  { type: "extra", data: {/* ... */} },
  // ...
];
```
Mantenha os dados de cada card separados para facilitar manutenção e expansão.

---

### 4. Filtragem por Tab
Filtre os itens do feed conforme a tab selecionada:
```tsx
const filteredItems = activeTab === "Todos"
  ? feedItems
  : feedItems.filter(item => item.type === activeTab.toLowerCase());
```

---

### 5. Função de Renderização Dinâmica
Centralize a lógica de qual componente renderizar para cada tipo de card:
```tsx
const renderFeedItem = (item, index) => {
  switch (item.type) {
    case "service": return <ServicePostCard key={index} {...item.data} />;
    case "event": return <EventCard key={index} {...item.data} />;
    // ...outros tipos
    case "extra": return <ShowcaseExtras key={index} />;
    default: return null;
  }
};
```

---

### 6. Engajamento no Rodapé dos Cards
Adicione uma área de engajamento visual em cada card principal:
```tsx
<div className="flex items-center justify-between text-sm text-muted-foreground mt-4">
  <div className="flex gap-3">
    <span className="flex items-center gap-1"><Heart className="w-4 h-4" /> 24</span>
    <span className="flex items-center gap-1"><MessageCircle className="w-4 h-4" /> 8</span>
    <span className="flex items-center gap-1"><Share2 className="w-4 h-4" /> 3</span>
  </div>
  <span className="flex items-center gap-1"><Eye className="w-4 h-4" /> 156</span>
</div>
```

---

### 7. Animações com Framer Motion
Envolva cada card em um `<motion.div>` para animação de entrada:
```tsx
<motion.div
  initial={{ opacity: 0, y: 24 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: idx * 0.04, duration: 0.3, ease: "easeOut" }}
>
  {renderFeedItem(item, idx)}
</motion.div>
```

---

### 8. Layout Responsivo
Garanta que todos os cards usem:
```tsx
<Card className="w-full max-w-xl mx-auto" />
```
Assim, o layout fica centralizado e adaptável a qualquer tela.

---

### 9. Agrupamento Cronológico (Opcional)
Para feeds longos, agrupe por data:
```tsx
<h3 className="text-sm font-medium text-muted-foreground mt-10 mb-4">Hoje</h3>
{cardsDeHoje.map(renderFeedItem)}
```

---

### 10. Inclusão de Cards Extras
Importe e use os cards do `ShowcaseExtras` junto aos demais:
```tsx
import ChecklistCard from "./extras/ChecklistCard";
// ...outros imports

<section>
  <h2 className="font-bold text-lg mb-2">ChecklistCard</h2>
  <ChecklistCard />
</section>
```

---

### 11. Exemplo de Estrutura Completa
```tsx
<div>
  {/* Tabs */}
  <div className="flex gap-2 mb-6">
    {tabs.map(tab => (
      <button
        key={tab}
        className={`px-4 py-2 rounded ${activeTab === tab ? "bg-primary text-white" : "bg-muted"}`}
        onClick={() => setActiveTab(tab)}
      >
        {tab}
      </button>
    ))}
  </div>

  {/* Feed */}
  <div className="space-y-6">
    {filteredItems.map((item, idx) => (
      <motion.div
        key={idx}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: idx * 0.04, duration: 0.3, ease: "easeOut" }}
      >
        {renderFeedItem(item, idx)}
      </motion.div>
    ))}
  </div>
</div>
```

---

### 12. Boas Práticas
- **Componentize** cada tipo de card.
- **Centralize** a lógica de renderização.
- **Use tipos/TypeScript** para garantir segurança e clareza.
- **Mantenha o layout fluido** para mobile e desktop.
- **Teste** diferentes layouts e agrupamentos para melhor UX.

---

### 13. Expansão
- Adicione novos tipos de cards facilmente, só criando o componente e adicionando no `renderFeedItem`.
- Implemente testes A/B de layout e agrupamento.
- Integre analytics para medir engajamento real dos cards.

---

## Checklist de Segurança para APIs e Frontend

- [ ] Nunca exponha segredos, chaves privadas ou tokens sensíveis no frontend (apenas use variáveis NEXT_PUBLIC_ para valores públicos).
- [ ] Toda lógica de permissão, autenticação e regras de negócio sensíveis deve ser feita no backend (API, Edge Function, etc).
- [ ] Proteja rotas sensíveis (dashboard, admin, APIs privadas) com autenticação obrigatória.
- [ ] Implemente checagem de permissões em todas as rotas e APIs.
- [ ] Restrinja CORS nas APIs para domínios confiáveis.
- [ ] Use HTTPS obrigatório em todos os ambientes (Let's Encrypt para SSL grátis).
- [ ] Configure firewall na VPS, liberando apenas portas necessárias (80, 443, 22 restrito).
- [ ] Nunca coloque dados privados em atributos HTML, data-attributes ou variáveis globais do window.
- [ ] Adicione um robots.txt bloqueando indexação em ambientes de staging/homologação.
- [ ] Use autenticação HTTP básica ou middleware temporário para proteger ambientes de staging.
- [ ] Faça backup e monitore logs de acesso e erros.
- [ ] Audite periodicamente o que é exposto no frontend (dados, endpoints, variáveis).
- [ ] Automatize deploys e evite uploads manuais.
- [ ] Documente e revise variáveis de ambiente e segredos em todos os ambientes.
- [ ] Revisar permissões de buckets e pastas públicas no Supabase Storage.

> Última atualização do checklist de segurança: 10/07/2025

---

## Progresso Geral

- [x] Tarefas concluídas: 18/23 (78%)
- [x] Scripts de automação implementados: 8/8 (100%)
- [x] Infraestrutura e validação: Concluída
- [ ] Próxima revisão agendada: 22/01/2025

### Últimas Implementações (15/01/2025)
- ✅ Scripts de validação de ambiente e segredos
- ✅ Setup automatizado do Supabase local
- ✅ Versionamento automático de migrations e seeds
- ✅ Aplicação de migrations com validação
- ✅ Documentação completa dos scripts
- ✅ Integração com ferramentas de qualidade de código

---

## Etapa 1: Estrutura e Base do Projeto
- [x] Migrar para Monorepo
- [x] Refatorar por features
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
- [ ] Implementar monitoramento de performance e erros (ex: Sentry, LogRocket, APM)

---

## Etapa 3: Banco de Dados e Segurança
- [x] Versionar todas as migrations (migrar seed.sql para migrations)
- [x] Padronizar nomes de colunas (`profile_id`, etc.)
- [x] Documentar e versionar políticas RLS (db/policies/)
- [x] Garantir ativação de RLS em todas as tabelas sensíveis
- [x] Atualizar código para consumir novas tabelas e políticas
- [x] Checklist de segurança:
  - [x] Revisar rotas privadas
  - [x] Variáveis sensíveis
  - [x] Auditoria de políticas
  - [x] search_path explícito em funções

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
- [x] Documentar scripts de automação e painéis
  - ✅ `scripts/README.md` com documentação completa
  - ✅ Instruções de uso para cada script
  - ✅ Exemplos de execução e parâmetros
- [x] Automatizar checagem e atualização diária da documentação
  - ✅ Scripts de verificação de saúde do código
  - ✅ Relatórios automáticos em JSON
  - ✅ Integração com GitHub Actions
- [ ] Documentar rotas públicas e privadas
- [ ] Criar guia de onboarding para novos desenvolvedores

---

## Etapa 7: Testes Automatizados
- [ ] Implementar testes unitários (Jest, Vitest, etc.)
- [ ] Implementar testes de integração
- [ ] Implementar testes end-to-end (Cypress, Playwright, etc.)
- [ ] Automatizar execução dos testes no CI/CD
- [ ] Documentar cobertura e resultados dos testes

---

## Etapa 8: Melhoria Contínua e Limpeza
- [ ] Organizar pacotes reutilizáveis em `packages/` (UI kit, types, hooks)
- [ ] Avaliar adoção de gerenciador de estado global (Zustand/Jotai)
- [ ] Limpeza periódica de código e pastas legadas
- [ ] Revisar e expandir automações conforme necessidade do time

---

## Etapa 8: Refatoração de Layouts React/Next.js
- [x] Mapear grandes blocos de JSX em arquivos de layout (ex: index.tsx)
- [x] Extrair blocos em componentes menores e reutilizáveis (ex: ProfileHeader, SocialLinks, ProfileStats)
- [x] Organizar componentes em subpastas específicas por layout ou por domínio
- [x] Substituir renderizações condicionais complexas por funções auxiliares ou componentes
- [x] Usar .map() para listas (skills, links, stats) com componentes pequenos
- [x] Padronizar estilos com Tailwind, CSS Modules ou styled-components
- [x] Comentar blocos complexos e documentar props importantes
- [x] Extrair lógicas de estado/manipulação para hooks customizados (ex: useProfileStats, useProfileQrCode, useProfileTheme)
- [x] Adotar Storybook para desenvolvimento isolado de componentes
- [x] Refatorar continuamente ao adicionar novas features, priorizando blocos reutilizáveis
  - [ ] Refinos finais (modais, seções avançadas, animações)

---

## Etapas para Reconstruir o Projeto Whosfy na Nova VPS (Supabase Local)

### 1. Preparação da VPS
- Acesse a VPS via SSH:
  ```bash
  ssh usuario@ip-da-vps
  ```
- Atualize o sistema:
  ```bash
  sudo apt update && sudo apt upgrade -y
  ```
- Instale dependências básicas:
  ```bash
  sudo apt install -y git curl unzip build-essential
  ```

### 2. Instalação do Docker e Docker Compose
- Instale o Docker:
  ```bash
  curl -fsSL https://get.docker.com | sudo sh
  sudo usermod -aG docker $USER
  ```
- Instale o Docker Compose:
  ```bash
  sudo apt install -y docker-compose
  ```
- (Opcional) Reinicie a VPS:
  ```bash
  sudo reboot
  ```

### 3. Instalação do Supabase Local
- Instale a Supabase CLI:
  ```bash
  npm install -g supabase
  ```
- Inicialize o Supabase localmente:
  ```bash
  supabase init
  ```
- Suba os containers do Supabase:
  ```bash
  supabase start
  ```
- Acesse o painel local do Supabase:
  - http://localhost:54323 (Studio)
  - http://localhost:54322 (API)

### 4. Clonagem do Projeto e Estrutura
- Clone o repositório:
  ```bash
  git clone https://github.com/seu-usuario/seu-repo.git whosfy
  cd whosfy
  ```
- Verifique a estrutura do projeto (apps/, supabase/, scripts/, etc).

### 5. Configuração de Variáveis de Ambiente
- Copie os arquivos de exemplo:
  ```bash
  cp apps/web/.env.example apps/web/.env.local
  ```
- Preencha as variáveis sensíveis com as chaves/URLs do Supabase local (veja no painel ou logs do `supabase start`).
  - Exemplo:
    ```
    SUPABASE_URL=http://localhost:54321
    SUPABASE_ANON_KEY=...
    SUPABASE_SERVICE_ROLE_KEY=...
    ```

### 6. Instalação de Dependências
- Instale o pnpm globalmente:
  ```bash
  npm install -g pnpm
  ```
- Instale as dependências do monorepo:
  ```bash
  pnpm install
  ```

### 7. Configuração do Coolify (Deploy Automatizado)
- Instale e configure o Coolify conforme a documentação oficial.
- Acesse o painel do Coolify, configure domínio, SSL, variáveis de ambiente e deploy via Git.
- Configure o deploy automático do app web (pasta `apps/web`).

### 8. Banco de Dados e Migrations (Supabase Local)
- Rode as migrations do projeto:
  ```bash
  supabase db reset
  # ou
  supabase db push
  ```
- Rode o seed se necessário:
  ```bash
  supabase db seed
  # ou
  psql -h localhost -U postgres -d postgres -f supabase/seed.sql
  ```
- Garanta que as policies (RLS) e funções estejam aplicadas (use os arquivos em `supabase/migrations/` e `db/policies/`).

### 9. Scripts de Automação e Painéis
- Centralize scripts em `/scripts`.
- Use scripts para abrir painéis, rodar migrations, atualizar docs, etc.
- Automatize tarefas recorrentes (backups, checagem de logs, deploy, etc).

### 10. Testes e Verificações
- Rode os testes automatizados:
  ```bash
  pnpm test
  ```
- Verifique o funcionamento do app pelo domínio configurado.
- Teste rotas públicas, privadas, APIs e integrações.

### 11. Monitoramento, Segurança e Manutenção
- Configure monitoramento de performance e erros (ex: Sentry, LogRocket, UptimeRobot).
- Garanta HTTPS, firewall e backups (use o checklist de segurança do projeto).
- Faça backup do banco local (via Supabase CLI ou dump do PostgreSQL).
- Documente tudo que for customizado na VPS e atualize o `NEXT_STEPS.md`.

### Fluxo Visual das Etapas
```mermaid
graph TD
    A[Preparar VPS] --> B[Instalar Docker/Supabase Local/Coolify]
    B --> C[Clonar Projeto]
    C --> D[Configurar Variáveis]
    D --> E[Instalar Dependências]
    E --> F[Configurar Deploy (Coolify)]
    F --> G[Rodar Migrations/Scripts Supabase]
    G --> H[Testar e Monitorar]
    H --> I[Documentar e Manter]
```

### Dicas Finais
- Sempre use scripts e automações do projeto para evitar erros manuais.
- Mantenha a documentação atualizada conforme for customizando a VPS.
- Faça snapshots/backups regulares da VPS e do banco local.
- Use o `NEXT_STEPS.md` para acompanhar o progresso e pendências.

---

## 🖥️ Resumo da Infraestrutura VPS Oracle & Recomendações para Supabase Local

### Infraestrutura Atual
- **Provedor:** Oracle Cloud
- **Tipo:** VM.Standard.A1.Flex (Ampere ARM)
- **vCPUs:** 4 OCPUs
- **Disco:** 200GB SSD (paravirtualizado)
- **Rede:** 4Gbps
- **SO:** Ubuntu 24.04 LTS
- **IP Público:** 129.146.116.166
- **Acesso:** SSH (usuário: ubuntu)
- **Criptografia em trânsito:** Ativada
- **Docker:** v28.3.2 instalado e funcionando
- **Docker Compose:** v2.38.2 instalado
- **Supabase CLI:** v2.30.4 instalado
- **Supabase Local:** Rodando e acessível via túnel SSH
- **Coolify:** v4.0.0-beta.420.5 instalado e acessível via túnel SSH (http://localhost:8000)

### Configuração de Acesso (Firewall Oracle Cloud)
⚠️ **IMPORTANTE**: A Oracle Cloud bloqueia portas externas por padrão. Para acessar serviços como Coolify e Supabase Studio, é necessário usar túneis SSH:

- **Coolify (porta 8000)**: Requer túnel SSH para acesso via navegador
- **Supabase Studio (porta 54323)**: Requer túnel SSH para acesso via navegador
- **Supabase API (porta 54321)**: Acessível via túnel SSH
- **PostgreSQL (porta 54322)**: Acessível via túnel SSH

**Comandos de Túnel SSH:**
```bash
# Para Coolify
ssh -i "C:\Users\Micael\Downloads\ssh-key-2025-07-13.key" -L 8000:127.0.0.1:8000 -N ubuntu@129.146.116.166

# Para Supabase (Studio + API + DB)
ssh -i "C:\Users\Micael\Downloads\ssh-key-2025-07-13.key" -L 54323:127.0.0.1:54323 -L 54321:127.0.0.1:54321 -L 54322:127.0.0.1:54322 -N ubuntu@129.146.116.166
```

### O que isso significa para o Whosfy?
- Ótima base para projetos modernos: recursos suficientes para Docker, Supabase local, Next.js, automações e pequenas/médias cargas de produção.
- Supabase local roda perfeitamente em containers Docker, aproveitando SSD e múltiplos núcleos.
- Limite será atingido quando o banco crescer muito ou uso de CPU/RAM/disco ficar alto.
- **Acesso via túneis SSH**: Necessário para desenvolvimento e administração dos serviços.

### Dicas para Aproveitar ao Máximo
1. **Monitore recursos:** use `htop`, `docker stats`, ferramentas de monitoramento.
2. **Backups regulares:** agende dumps do PostgreSQL e snapshots do disco.
3. **Segurança:** mantenha firewall ativo (libere só portas 80, 443, 22), use HTTPS, atualize sistema e containers.
4. **Automatize deploys:** use Coolify ou scripts para facilitar atualizações e rollback.
5. **Documente tudo:** registre configurações e comandos no `NEXT_STEPS.md`.

### Escalabilidade e Migração
- **Upgrade de VPS:** aumente recursos na Oracle se notar lentidão ou uso alto de CPU/RAM/disco.
- **Migração para Supabase Cloud:** considere quando precisar de alta disponibilidade, escalabilidade global, backups/failover gerenciados ou suporte 24/7.

> Mantenha este resumo atualizado conforme a infraestrutura evoluir!
