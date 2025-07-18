# Deploy com Todas as Correções - Whosfy App

## 🚀 Status Atual
- **Aplicação:** `running:unhealthy` ❌
- **IP Servidor:** `129.146.146.242` (incorreto) ❌
- **Variáveis de Ambiente:** Não configuradas ❌
- **Health Check:** Desabilitado ❌
- **FQDN:** `http://whosfy.com` (sem HTTPS) ❌

## ✅ Correções Aplicadas

### 1. **Variáveis de Ambiente Atualizadas**
```env
NEXT_PUBLIC_SUPABASE_URL=https://whosfy-production.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
DATABASE_URL=postgresql://postgres:password@db.whosfy-production.supabase.co:5432/postgres
NODE_ENV=production
PORT=3000
NEXT_TELEMETRY_DISABLED=1
NEXTAUTH_SECRET=whosfy-production-secret-key-2024
NEXTAUTH_URL=https://whosfy.com
```

### 2. **Arquivo .env.production Corrigido**
- ✅ URLs do Supabase atualizadas
- ✅ Chaves de produção configuradas
- ✅ Configurações de segurança aplicadas

## 🛠️ Próximos Passos (Manual no Coolify)

### **PASSO 1: Configurar Variáveis no Coolify**
1. Acesse: `http://localhost:8000`
2. Navegue: **Projects** → **Whosfy App** → **m-bento7/studio:main**
3. Clique na aba **"Environment Variables"**
4. Adicione cada variável listada acima:
   - Clique em **"+ Add"**
   - Nome: `NEXT_PUBLIC_SUPABASE_URL`
   - Valor: `https://whosfy-production.supabase.co`
   - Repita para todas as variáveis
5. Clique em **"Save"**

### **PASSO 2: Corrigir IP do Servidor**
1. Vá para **Settings** → **Servers**
2. Edite **"whosfy-production-server"**
3. Altere IP de `129.146.146.242` para `194.164.72.183`
4. Clique em **"Validate"** e depois **"Save"**

### **PASSO 3: Habilitar Health Check**
1. Na aplicação, vá para aba **"Health Check"**
2. Habilite: ☑️ **Enable Health Check**
3. Configure:
   - **Path:** `/api/health`
   - **Port:** `3000`
   - **Method:** `GET`
   - **Expected Status:** `200`
   - **Interval:** `30s`
   - **Timeout:** `10s`
   - **Retries:** `3`
4. Clique em **"Save"**

### **PASSO 4: Atualizar FQDN**
1. Na aplicação, vá para aba **"Configuration"**
2. Altere **FQDN** de `http://whosfy.com` para `https://whosfy.com`
3. Habilite **SSL automático**
4. Clique em **"Save"**

### **PASSO 5: Fazer Redeploy**
1. Vá para aba **"Deployments"**
2. Clique em **"Deploy"**
3. Aguarde o processo completar (5-10 minutos)
4. Monitore os logs durante o deploy

## 🔍 Verificações Pós-Deploy

### **1. Status da Aplicação**
```bash
# Deve mostrar: running:healthy ✅
# Verificar no painel do Coolify
```

### **2. Teste do Health Check**
```bash
# Teste local (via túnel)
curl http://localhost:3000/api/health

# Teste público (após correções)
curl https://whosfy.com/api/health
```

### **3. Acesso à Aplicação**
- ✅ `https://whosfy.com` deve carregar
- ✅ SSL deve estar ativo
- ✅ Sem erros de console

### **4. Verificar Logs**
```bash
# No Coolify: aba "Logs"
# Procurar por:
# ✅ "Server running on port 3000"
# ✅ "Health check endpoint active"
# ❌ Erros de conexão com Supabase
```

## 🚨 Troubleshooting

### **Se ainda estiver unhealthy:**
1. **Verificar variáveis de ambiente:**
   - Todas as 9 variáveis foram adicionadas?
   - Valores estão corretos?

2. **Verificar conectividade:**
   - IP do servidor está correto?
   - Firewall Oracle Cloud configurado?
   - Portas 80, 443, 3000 abertas?

3. **Verificar Supabase:**
   - Projeto existe em `whosfy-production.supabase.co`?
   - Chaves são válidas?
   - Database está acessível?

4. **Rebuild completo:**
   - Parar aplicação
   - Limpar cache
   - Deploy fresh

## 📊 Resultado Esperado

### **Antes das Correções:**
- 🔴 Status: `running:unhealthy`
- 🔴 IP: `129.146.146.242` (incorreto)
- 🔴 FQDN: `http://whosfy.com`
- 🔴 Health Check: Desabilitado
- 🔴 Variáveis: Não configuradas

### **Depois das Correções:**
- ✅ Status: `running:healthy`
- ✅ IP: `194.164.72.183` (correto)
- ✅ FQDN: `https://whosfy.com`
- ✅ Health Check: Ativo em `/api/health`
- ✅ Variáveis: Todas configuradas
- ✅ SSL: Automático e ativo
- ✅ Aplicação: Totalmente funcional

## 📞 Comandos de Monitoramento

```bash
# Verificar status via MCP
# (executar após as correções)

# Testar conectividade
ping 194.164.72.183
telnet 194.164.72.183 22

# Testar aplicação
curl -I https://whosfy.com
curl https://whosfy.com/api/health

# Verificar SSL
openssl s_client -connect whosfy.com:443 -servername whosfy.com
```

---

**⏱️ Tempo estimado:** 30-45 minutos  
**🎯 Prioridade:** Crítica  
**📋 Status:** Pronto para execução manual  

**📄 Documentos relacionados:**
- `DIAGNOSTICO-APLICACAO-UNHEALTHY.md`
- `CORRIGIR-IP-SERVIDOR-COOLIFY.md`
- `COOLIFY-ENVIRONMENT-SETUP-GUIDE.md`