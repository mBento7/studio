# Estrutura Organizacional do Projeto

Este documento descreve a nova estrutura organizacional implementada para melhorar a manutenibilidade e clareza do projeto.

## 📁 Estrutura de Pastas

### `/scripts/`
Pasta principal para todos os scripts organizados por categoria:

#### `/scripts/deployment/`
- Scripts relacionados ao deploy e configuração de serviços
- Inclui scripts do Coolify, VPS Oracle, e automações de deploy
- **Exemplos**: `deploy-coolify.ps1`, `setup-coolify-service.ps1`

#### `/scripts/database/`
- Scripts de migração, configuração e manutenção do banco de dados
- Inclui scripts do Supabase e SQL
- **Exemplos**: `apply-migrations.js`, `setup-vps-supabase.js`

#### `/scripts/infrastructure/`
- Scripts de infraestrutura, conexões SSH e configurações de rede
- **Exemplos**: `conectar-coolify-ssh.ps1`, `ssh-tunnel.ps1`

#### `/scripts/testing/`
- Scripts de teste, validação e verificação
- **Exemplos**: `test-auth.js`, `pre-deploy-check.ps1`

### `/temp/`
Pasta para arquivos temporários (ignorada pelo Git):

#### `/temp/logs/`
- Logs temporários e arquivos de saída

#### `/temp/backup/`
- Backup de arquivos antigos antes da reorganização

### `/docs/` - Documentação Organizada por Categorias:
- `/docs/coolify/` - 11 documentos sobre Coolify (setup, troubleshooting, configurações)
- `/docs/whosfy/` - 7 documentos específicos do projeto Whosfy
- `/docs/oracle-cloud/` - 2 documentos sobre Oracle Cloud e VPS
- `/docs/docker/` - 4 documentos sobre Docker e containers
- `/docs/dns-networking/` - 4 documentos sobre DNS, Cloudflare e networking
- `/docs/deployment/` - 4 documentos sobre deploy e troubleshooting
- `/docs/supabase/` - 1 documento sobre Supabase
- `/docs/security/` - 1 documento sobre melhorias de segurança

### Outras pastas importantes:
- `/apps/` - Aplicações do projeto
- `/db/` - Esquemas e políticas do banco de dados
- `/infra/` - Configurações de infraestrutura
- `/supabase/` - Configurações específicas do Supabase

## 🧹 Arquivos Removidos

Durante a organização, os seguintes tipos de arquivos foram removidos:

- **Arquivos temporários**: `test-*.txt`, `*-results.txt`
- **Chaves SSH expostas**: `eval $(ssh-agent -s)*`
- **Arquivos de build**: `tsconfig.tsbuildinfo`
- **Logs de erro**: `test-err.txt`, `test-out.txt`

## 🔒 Segurança

- Arquivos de chaves SSH foram removidos da raiz
- `.gitignore` atualizado para prevenir exposição de arquivos sensíveis
- Pasta `temp/` ignorada pelo controle de versão

## 📋 Próximos Passos Recomendados

1. **Revisar arquivos em `temp/backup/`** - Verificar se há arquivos importantes
2. **Atualizar scripts** - Ajustar caminhos nos scripts que referenciam arquivos movidos
3. **Documentar mudanças** - Atualizar README principal com nova estrutura
4. **Configurar CI/CD** - Ajustar pipelines para nova estrutura de pastas

## 🚀 Benefícios da Nova Estrutura

- **Organização clara** por tipo de funcionalidade
- **Facilita manutenção** e localização de scripts
- **Melhora segurança** removendo arquivos sensíveis
- **Reduz poluição** na raiz do projeto
- **Facilita colaboração** com estrutura padronizada

---

*Estrutura criada em: $(Get-Date)*
*Script de organização: `organize-project.ps1`*