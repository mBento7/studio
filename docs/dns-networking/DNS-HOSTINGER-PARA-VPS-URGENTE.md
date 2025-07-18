# 🚨 URGENTE: Migrar DNS da Hostinger para VPS Oracle Cloud

## 📊 Problema Crítico Identificado

**Situação atual:**
```
❌ whosfy.com → 84.32.84.32 (Hostinger)
❌ www.whosfy.com → 129.146.145.242 (IP incorreto)

✅ DEVE SER: 194.164.72.183 (VPS Oracle Cloud)
```

**Impacto:** O site está direcionando para a Hostinger ao invés da nossa aplicação no VPS.

## 🎯 Solução Imediata - Cloudflare

### 1. 🔧 Acessar Cloudflare Dashboard

1. **Acesse:** https://dash.cloudflare.com
2. **Login** na conta do domínio whosfy.com
3. **Selecione** o domínio `whosfy.com`
4. **Vá para:** DNS → Records

### 2. 📝 Corrigir Registros DNS (AÇÃO URGENTE)

**PASSO 1: DELETAR registros incorretos**

```
🗑️ DELETAR:
- Tipo A | Nome: @ | Conteúdo: 84.32.84.32 (Hostinger)
- Tipo A | Nome: @ | Conteúdo: 129.146.145.242 (IP incorreto)
- Tipo A | Nome: www | Conteúdo: 129.146.145.242 (IP incorreto)
```

**PASSO 2: CRIAR registros corretos**

```
✅ CRIAR:

# Domínio principal
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

### 3. ⚠️ IMPORTANTE: Configurações Críticas

**Desabilitar Proxy Cloudflare:**
- ☁️ Laranja → 🔘 Cinza (DNS only)
- Motivo: Testar conectividade direta primeiro

**TTL Recomendado:**
- Use "Auto" ou "300" (5 minutos) para propagação rápida

### 4. 🔄 Verificar Mudanças

**Comandos de teste:**
```powershell
# Verificar DNS (aguardar 5-15 minutos)
nslookup whosfy.com
nslookup www.whosfy.com

# Resultado esperado:
# Nome: whosfy.com
# Address: 194.164.72.183

# Testar conectividade
ping 194.164.72.183

# Testar HTTP
Invoke-WebRequest -Uri "http://whosfy.com" -Method Head
```

## 🚀 Configuração no Coolify

### Opção 1: Domínio Único
```
FQDN: http://whosfy.com
```

### Opção 2: Múltiplos Domínios
```
FQDN: http://whosfy.com,http://www.whosfy.com
```

### Opção 3: Redirecionamento (Recomendado)
```
FQDN Principal: http://whosfy.com
Redirect www → não-www: Configurar no Cloudflare
```

## 📋 Checklist de Verificação

- [ ] **DNS atualizado no Cloudflare**
  - [ ] Registro A: @ → 194.164.72.183
  - [ ] Registro A: www → 194.164.72.183
  - [ ] Proxy desabilitado (DNS only)
  
- [ ] **Propagação DNS**
  - [ ] nslookup whosfy.com retorna 194.164.72.183
  - [ ] nslookup www.whosfy.com retorna 194.164.72.183
  
- [ ] **Conectividade**
  - [ ] ping 194.164.72.183 funciona
  - [ ] curl http://194.164.72.183 responde
  
- [ ] **Teste Final**
  - [ ] http://whosfy.com carrega a aplicação
  - [ ] http://www.whosfy.com carrega a aplicação

## 🔍 Troubleshooting

### Problema: DNS ainda resolve para Hostinger

```powershell
# Limpar cache DNS local
ipconfig /flushdns

# Testar com DNS público
nslookup whosfy.com 8.8.8.8
nslookup whosfy.com 1.1.1.1
```

### Problema: Aplicação não responde

1. **Verificar status no Coolify:**
   - Acesse: http://194.164.72.183:8000
   - Status deve ser "running:healthy"

2. **Verificar logs:**
   - Logs da aplicação no Coolify
   - Logs do Traefik proxy

### Problema: Certificado SSL

```
⚠️ Aguarde DNS funcionar ANTES de configurar HTTPS
1. Teste HTTP primeiro
2. Depois configure Let's Encrypt no Coolify
3. Altere FQDN para https://whosfy.com
```

## 📞 URLs de Referência

- **Cloudflare:** https://dash.cloudflare.com
- **Coolify:** http://194.164.72.183:8000
- **App atual:** http://w4kocsog4kkok48sgow48kc4.129.146.146.242.sslip.io
- **Objetivo:** http://whosfy.com e http://www.whosfy.com

## ⏰ Timeline Esperado

- **0-5 min:** Atualizar registros DNS no Cloudflare
- **5-15 min:** Propagação DNS
- **15-20 min:** Teste de conectividade
- **20-25 min:** Configuração final no Coolify
- **25-30 min:** Teste completo do domínio

---

**🎯 AÇÃO IMEDIATA:** Corrigir registros DNS no Cloudflare AGORA para migrar de 84.32.84.32 (Hostinger) para 194.164.72.183 (VPS Oracle Cloud).