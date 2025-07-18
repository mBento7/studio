# 🚨 CORREÇÃO URGENTE: DNS do whosfy.com

## 📊 Problema Identificado

**Status atual do DNS:**
```
whosfy.com resolve para:
- 84.32.84.32 (Hostinger) ❌
- 129.146.145.242 (IP incorreto) ❌
- Outros IPs incorretos...

❌ DEVERIA resolver para: 194.164.72.183 (nosso VPS Oracle Cloud)
```

**Resultado:** O domínio está direcionando para a Hostinger (84.32.84.32) porque os registros DNS no Cloudflare estão apontando para o servidor antigo ao invés do nosso VPS.

## 🎯 Solução Imediata

### 1. 🔧 Acessar Cloudflare Dashboard

1. Acesse: https://dash.cloudflare.com
2. Faça login na conta
3. Selecione o domínio **whosfy.com**
4. Vá para **DNS** → **Records**

### 2. 📝 Corrigir Registros DNS

**DELETAR registros existentes incorretos:**
- Registro A: whosfy.com → 84.32.84.32 (Hostinger) ❌
- Registro A: whosfy.com → 129.146.145.242 (IP incorreto) ❌
- Registro A: www → 129.146.145.242 (IP incorreto) ❌
- Todos os outros registros A que não apontam para `194.164.72.183`

**CRIAR/ATUALIZAR registros corretos:**

```dns
# Registro principal
Tipo: A
Nome: @
Conteúdo: 194.164.72.183
TTL: Auto
Proxy: 🔴 DNS only (DESABILITADO)

# Subdomínio www
Tipo: A
Nome: www
Conteúdo: 194.164.72.183
TTL: Auto
Proxy: 🔴 DNS only (DESABILITADO)
```

### 3. ⚠️ IMPORTANTE: Desabilitar Proxy

**Por que desabilitar o proxy inicialmente:**
- Para testar conectividade direta
- Evitar cache do Cloudflare
- Facilitar troubleshooting

**Como desabilitar:**
- Clique no ícone da nuvem laranja ☁️
- Deve ficar cinza (DNS only)

### 4. 🔄 Verificar Propagação

**Comandos para testar:**
```powershell
# Verificar DNS
nslookup whosfy.com

# Deve retornar:
# Nome: whosfy.com
# Address: 194.164.72.183

# Testar conectividade
Invoke-WebRequest -Uri "http://whosfy.com" -Method Head
```

**Tempo esperado:** 5-15 minutos para propagação

### 5. 🎯 Resultado Esperado

**Após correção:**
- ✅ `whosfy.com` → 194.164.72.183
- ✅ `www.whosfy.com` → 194.164.72.183
- ✅ Site acessível em http://whosfy.com
- ✅ Redirecionamento automático do Coolify

## 🔍 Verificação Passo a Passo

### Passo 1: Confirmar mudança DNS
```powershell
nslookup whosfy.com 8.8.8.8
```

### Passo 2: Testar conectividade direta
```powershell
ping 194.164.72.183
```

### Passo 3: Testar HTTP
```powershell
curl -H "Host: whosfy.com" http://194.164.72.183
```

### Passo 4: Testar domínio
```powershell
Invoke-WebRequest -Uri "http://whosfy.com"
```

## 🚀 Próximos Passos (Após DNS Funcionar)

1. **Configurar HTTPS no Coolify:**
   - Alterar FQDN para `https://whosfy.com`
   - Ativar Let's Encrypt
   - Fazer redeploy

2. **Reativar proxy Cloudflare (opcional):**
   - Após HTTPS funcionar
   - Para CDN e proteção DDoS

3. **Configurar redirects:**
   - www → não-www
   - http → https

## 📞 URLs de Referência

- **Cloudflare Dashboard:** https://dash.cloudflare.com
- **Coolify Panel:** http://194.164.72.183:8000
- **App atual:** http://w4kocsog4kkok48sgow48kc4.129.146.146.242.sslip.io
- **Objetivo:** http://whosfy.com (depois https://whosfy.com)

---

**🎯 AÇÃO NECESSÁRIA:** Corrigir registros DNS no Cloudflare AGORA para que whosfy.com aponte para 194.164.72.183 ao invés dos servidores da Hostinger.