# Guia de Deploy - Whosfy App

## 📋 Informações do Projeto

- **Nome:** Whosfy App
- **Projeto ID:** 3
- **UUID:** j4cocwcowo0o84c88cc0800c
- **Aplicação UUID:** w4kocsog4kkok48sgow48kc4
- **URL:** http://w4kocsog4kkok48sgow48kc4.129.146.146.242.sslip.io
- **Repositório:** mBento7/studio
- **Branch:** main

## 🚀 Deploy Automático

### Método 1: Script PowerShell
```powershell
.\deploy-whosfy.ps1
```

### Método 2: Manual
```bash
git add .
git commit -m "feat: atualizações para deploy"
git push origin main
```

## ⚙️ Configurações de Ambiente

### Variáveis de Ambiente Necessárias

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_production_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_production_service_role_key

# Environment
NODE_ENV=production
PORT=3000
NEXT_TELEMETRY_DISABLED=1
```

### Configuração no Coolify

1. Acesse o painel: http://129.146.146.242:8000
2. Navegue para: Projects → Whosfy App → Environment → Application
3. Configure as variáveis de ambiente na seção "Environment Variables"

## 🐳 Configurações Docker

### Dockerfile
- Multi-stage build otimizado
- Node.js 18 Alpine
- Usuário não-root para segurança
- Suporte a variáveis de ambiente

### Nixpacks
- Configuração específica para Coolify
- Build com pnpm
- Variáveis de ambiente pré-configuradas

## 📁 Estrutura do Projeto

```
studio-master/
├── apps/web/                 # Aplicação Next.js principal
│   ├── src/                  # Código fonte
│   ├── public/               # Arquivos estáticos
│   ├── .env.production       # Variáveis de produção
│   └── package.json          # Dependências
├── Dockerfile                # Configuração Docker
├── nixpacks.toml            # Configuração Coolify
└── deploy-whosfy.ps1        # Script de deploy
```

## 🔧 Comandos Úteis

### Build Local
```bash
cd apps/web
pnpm install
pnpm build
pnpm start
```

### Verificar Status
```bash
# Via MCP Coolify
pwsh -c "& .\test-coolify-mcp.ps1"

# Via API direta
curl http://129.146.146.242:8000/api/v1/applications/w4kocsog4kkok48sgow48kc4
```

## 🔍 Monitoramento

### URLs Importantes
- **Aplicação:** http://w4kocsog4kkok48sgow48kc4.129.146.146.242.sslip.io
- **Painel Coolify:** http://129.146.146.242:8000
- **Logs:** Painel Coolify → Application → Logs

### Health Check
- **Endpoint:** `/`
- **Método:** GET
- **Código esperado:** 200
- **Timeout:** 5s

## 🚨 Troubleshooting

### Status "running:unhealthy"
1. Verificar logs no painel Coolify
2. Confirmar variáveis de ambiente
3. Testar build local
4. Verificar conectividade com Supabase

### Falha no Build
1. Verificar sintaxe do Dockerfile
2. Confirmar dependências no package.json
3. Testar build local com Docker

### Deploy não Automático
1. Verificar webhook do GitHub
2. Confirmar configuração da branch
3. Verificar logs de deployment

## 📝 Próximos Passos

1. ✅ Configurar variáveis de ambiente de produção
2. ✅ Implementar health check
3. ⏳ Configurar domínio customizado
4. ⏳ Implementar SSL/TLS
5. ⏳ Configurar backup automático
6. ⏳ Implementar monitoramento avançado

## 🔗 Links Úteis

- [Documentação Coolify](https://coolify.io/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Supabase Documentation](https://supabase.com/docs)
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)