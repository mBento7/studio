# Scripts de Automação

Este diretório contém scripts utilitários para automação de migrations, seeds, validação de ambiente e configuração do projeto.

## 📦 Scripts de Banco de Dados

### apply-migrations.js

Script melhorado para aplicação de migrations e seeds com validação de ambiente.

**Funcionalidades:**
- Validação de variáveis de ambiente
- Suporte a Supabase CLI e PostgreSQL CLI
- Aplicação de seeds versionados
- Logs detalhados e verificação de conectividade

**Como usar:**
```bash
# Aplicar apenas migrations
node scripts/apply-migrations.js

# Aplicar migrations e seeds
APPLY_SEEDS=true node scripts/apply-migrations.js

# Usar Supabase CLI
USE_SUPABASE_CLI=true node scripts/apply-migrations.js
```

**Variáveis de ambiente:**
- `DB_URL` - String de conexão do banco
- `USE_SUPABASE_CLI` - true para usar Supabase CLI
- `APPLY_SEEDS` - true para aplicar seeds
- `NODE_ENV` - Ambiente (development/production)

### version-migrations.js

Script para versionamento automático de migrations e seeds.

**Funcionalidades:**
- Analisa e valida nomeação de migrations
- Cria backup das migrations atuais
- Versiona seeds com timestamp
- Gera relatório de versionamento

**Como usar:**
```bash
node scripts/version-migrations.js
```

**O que faz:**
- Verifica padrão de nomeação (YYYYMMDD_description.sql)
- Ordena migrations cronologicamente
- Cria versões timestampadas dos seeds
- Gera relatório em JSON

## 🔒 Scripts de Validação

### validate-env.js

Script para validação completa de variáveis de ambiente e segredos.

**Funcionalidades:**
- Verifica variáveis obrigatórias por ambiente
- Valida formato de URLs e chaves
- Detecta segredos expostos ou inseguros
- Gera score de segurança
- Sugere melhorias

**Como usar:**
```bash
node scripts/validate-env.js
```

**Score de segurança:**
- 80-100: ✅ Configuração segura
- 60-79: ⚠️ Avisos de segurança
- 0-59: ❌ Configuração insegura

## 🚀 Scripts de Configuração

### setup-supabase-local.js

Script completo para configuração do Supabase local.

**Funcionalidades:**
- Verifica dependências (Docker, Supabase CLI)
- Configura e inicia Supabase local
- Aplica migrations e seeds automaticamente
- Atualiza arquivo .env.local
- Testa conectividade

**Como usar:**
```bash
node scripts/setup-supabase-local.js
```

**Pré-requisitos:**
- Docker e Docker Compose
- Supabase CLI (`npm install -g supabase`)
- Node.js

**Portas utilizadas:**
- 54321: API Supabase
- 54322: PostgreSQL
- 54323: Supabase Studio
- 54324-54326: Inbucket (emails)

## 🔧 Configuração Inicial

### Primeiro uso:

1. **Configure variáveis de ambiente:**
   ```bash
   cp apps/web/.env.example apps/web/.env.local
   # Edite .env.local com suas configurações
   ```

2. **Valide configuração:**
   ```bash
   node scripts/validate-env.js
   ```

3. **Configure Supabase local:**
   ```bash
   node scripts/setup-supabase-local.js
   ```

4. **Versione migrations:**
   ```bash
   node scripts/version-migrations.js
   ```

5. **Aplique migrations e seeds:**
   ```bash
   APPLY_SEEDS=true node scripts/apply-migrations.js
   ``` 

## Scripts de Automação de Painéis
- Scripts para abrir painéis de controle (Coolify, Supabase, etc.) estão disponíveis nesta pasta. Veja exemplos: `abrir-coolify.sh`, `abrir-supabase.sh`, etc.

## Scripts de Verificação de Código

### check-code-health.js
Script principal para verificação da saúde do código. Executa todas as verificações de qualidade:

```bash
# Verificação completa
node scripts/check-code-health.js

# Verificação com correções automáticas
node scripts/check-code-health.js --fix
```

**Funcionalidades:**
- Detecta arquivos órfãos e imports quebrados
- Verifica dependências não utilizadas
- Gera relatório consolidado com score de saúde
- Aplica correções automáticas quando possível
- Exit code baseado na severidade dos problemas

### check-orphaned-files.js
Detecta arquivos órfãos e imports quebrados:

```bash
node scripts/check-orphaned-files.js
```

**Funcionalidades:**
- Identifica arquivos TypeScript/JavaScript não importados
- Verifica imports quebrados (arquivos que não existem)
- Detecta componentes não utilizados
- Gera relatório detalhado em JSON

### check-unused-dependencies.js
Verifica dependências não utilizadas no projeto:

```bash
node scripts/check-unused-dependencies.js
```

**Funcionalidades:**
- Detecta dependencies do package.json não utilizadas
- Identifica devDependencies em código de produção
- Encontra imports de pacotes não declarados
- Gera comandos para limpeza automática

### Relatórios Gerados
Todos os scripts geram relatórios em JSON na pasta `scripts/`:
- `code-health-report.json` - Relatório consolidado
- `orphaned-files-report.json` - Arquivos órfãos e imports
- `dependencies-report.json` - Análise de dependências

### setup-code-health-automation.js
Configura automação completa para verificação de saúde do código:

```bash
node scripts/setup-code-health-automation.js
```

**Funcionalidades:**
- Adiciona scripts ao package.json
- Cria workflow do GitHub Actions
- Configura Git hooks (pre-commit)
- Gera configuração ESLint personalizada
- Cria script de monitoramento contínuo

### Integração com CI/CD
Após executar o script de automação, você terá:

**Scripts npm disponíveis:**
```bash
npm run code-health          # Verificação completa
npm run code-health:fix      # Com correções automáticas
npm run check-orphans        # Só arquivos órfãos
npm run check-deps           # Só dependências
npm run precommit-check      # Verificação pré-commit
npm run ci-check             # Verificação completa para CI
```

**GitHub Actions:**
- Workflow automático em PRs e pushes
- Comentários automáticos em PRs com resultados
- Upload de relatórios como artefatos

**Git Hooks:**
- Pre-commit hook que executa verificações
- Bloqueia commits com problemas críticos

## Edge Functions
- Para lógica customizada, consulte as Edge Functions em `../supabase/functions/`.

## Versionamento
- Siga as práticas de versionamento descritas em `../db/schemas/README.md` e `../db/policies/README.md`.