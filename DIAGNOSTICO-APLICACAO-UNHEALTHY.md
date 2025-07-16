# Diagnóstico: Aplicação com Status "Unhealthy"

## 🔍 Análise do Problema

A aplicação `m-bento7/studio:main-dcokoooo0k8s4scgogcog40g` está com status `running:unhealthy` no Coolify. Após análise detalhada, identifiquei as seguintes causas:

### 1. **Variáveis de Ambiente Não Configuradas**
- O arquivo `.env.production` contém valores placeholder
- As variáveis do Supabase não estão configuradas no Coolify
- Falta configuração de conexão com banco de dados

### 2. **Health Check Desabilitado**
- `health_check_enabled: false` na configuração da aplicação
- Sem verificação automática de saúde da aplicação

### 3. **Configuração de Rede**
- IP do servidor incorreto (`129.146.146.242` vs `194.164.72.183`)
- FQDN configurado como `http://whosfy.com` (sem HTTPS)

## 🛠️ Soluções Prioritárias

### **SOLUÇÃO 1: Configurar Variáveis de Ambiente (CRÍTICO)**

1. **Acesse o Coolify:**
   ```
   URL: http://localhost:8000
   ```

2. **Navegue para a aplicação:**
   - Projects → Whosfy App → m-bento7/studio:main
   - Aba "Environment Variables"

3. **Adicione as variáveis essenciais:**

   ```env
   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=http://host.docker.internal:54321
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0
   SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU
   
   # Database
   DATABASE_URL=postgresql://postgres:26Mn1597+1709@host.docker.internal:5432/postgres
   
   # Application
   NODE_ENV=production
   PORT=3000
   NEXT_TELEMETRY_DISABLED=1
   
   # Authentication (se necessário)
   NEXTAUTH_SECRET=your-secret-key-here-change-this
   NEXTAUTH_URL=https://whosfy.com
   ```

4. **Salvar e fazer redeploy:**
   - Clique em "Save"
   - Vá para aba "Deployments"
   - Clique em "Deploy"

### **SOLUÇÃO 2: Habilitar Health Check**

1. **Na configuração da aplicação:**
   - Aba "Health Check"
   - Habilitar: `✓ Enable Health Check`
   - Path: `/api/health`
   - Port: `3000`
   - Method: `GET`
   - Expected Status: `200`

### **SOLUÇÃO 3: Corrigir IP do Servidor**

1. **Atualizar IP no Coolify:**
   - Settings → Servers
   - Editar `whosfy-production-server`
   - Alterar IP de `129.146.146.242` para `194.164.72.183`
   - Validar conexão

2. **Atualizar FQDN da aplicação:**
   - Alterar de `http://whosfy.com` para `https://whosfy.com`

## 🔧 Verificações Pós-Correção

### 1. **Verificar Status da Aplicação**
```bash
# Status deve mudar para "running:healthy"
# Verificar no painel do Coolify
```

### 2. **Testar Health Check**
```bash
# Teste local (via túnel SSH)
curl http://localhost:3000/api/health

# Teste público (após correção do IP)
curl https://whosfy.com/api/health
```

### 3. **Verificar Logs**
```bash
# No Coolify: Aba "Logs"
# Procurar por erros de conexão ou variáveis faltando
```

### 4. **Testar Conectividade Supabase**
```bash
# Verificar se Supabase está rodando
docker ps | grep supabase

# Testar conexão
curl http://localhost:54321/rest/v1/
```

## 📊 Monitoramento

### **Indicadores de Sucesso:**
- ✅ Status: `running:healthy`
- ✅ Health check respondendo em `/api/health`
- ✅ Aplicação acessível via `https://whosfy.com`
- ✅ Conexão com Supabase funcionando
- ✅ Logs sem erros críticos

### **Comandos de Monitoramento:**
```bash
# Verificar status dos containers
docker ps

# Verificar logs em tempo real
docker logs -f <container-id>

# Verificar uso de recursos
docker stats

# Testar conectividade de rede
ping 194.164.72.183
telnet 194.164.72.183 22
```

## 🚨 Troubleshooting Adicional

### **Se ainda estiver unhealthy após as correções:**

1. **Verificar dependências:**
   - Supabase local rodando na porta 54321
   - PostgreSQL acessível
   - Rede Docker funcionando

2. **Alternativas de conectividade:**
   ```env
   # Se host.docker.internal não funcionar
   NEXT_PUBLIC_SUPABASE_URL=http://172.17.0.1:54321
   DATABASE_URL=postgresql://postgres:26Mn1597+1709@172.17.0.1:5432/postgres
   ```

3. **Rebuild completo:**
   - Parar aplicação
   - Limpar cache do Docker
   - Fazer deploy fresh

4. **Verificar firewall Oracle Cloud:**
   - Portas 80, 443, 3000 abertas
   - Security List configurado

## 📞 Próximos Passos

1. **Implementar as soluções na ordem de prioridade**
2. **Monitorar status por 10-15 minutos**
3. **Testar todas as funcionalidades da aplicação**
4. **Configurar SSL automático**
5. **Implementar monitoramento contínuo**

---

**Status:** 🔴 Crítico - Requer ação imediata  
**Prioridade:** Alta  
**Tempo estimado:** 30-60 minutos para resolução completa