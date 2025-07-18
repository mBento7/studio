# 🌐 Configuração do Domínio whosfy.com - Guia Completo

## 📋 Situação Atual

**Problema:** O domínio `whosfy.com` não está acessível porque:
- ✅ Aplicação configurada no Coolify com domínio `http://whosfy.com`
- ❌ DNS não aponta para o servidor VPS (194.164.72.183)
- ❌ Cloudflare configurado mas não direcionando corretamente

## 🎯 Informações do Sistema

- **Domínio:** whosfy.com
- **Servidor VPS:** 129.146.146.242 (Oracle Cloud)
- **Aplicação Coolify:** w4kocsog4kkok48sgow48kc4
- **Status:** running:unhealthy
- **FQDN Configurado:** http://whosfy.com

## 🚀 Solução: Configuração DNS

### 1. 📝 Configurar Registros DNS no Cloudflare

#### Acesse o painel do Cloudflare:
1. Vá para [dash.cloudflare.com](https://dash.cloudflare.com)
2. Selecione o domínio `whosfy.com`
3. Vá para **DNS** → **Records**

#### Configure os seguintes registros:

```dns
# Registro A - Domínio principal
Tipo: A
Nome: @
Conteúdo: 129.146.146.242
TTL: Auto
Proxy: 🔴 DNS only (desabilitado)

# Registro A - Subdomínio www
Tipo: A
Nome: www
Conteúdo: 129.146.146.242
TTL: Auto
Proxy: 🔴 DNS only (desabilitado)
```

**⚠️ IMPORTANTE:** Desabilite o proxy do Cloudflare inicialmente para testar a conectividade direta.

### 2. 🔧 Verificar Configuração no Coolify

#### Acesse o painel do Coolify:
1. URL: http://129.146.146.242:8000
2. Vá para **Applications** → **Whosfy App**
3. Verifique as configurações:

```
✅ FQDN: http://whosfy.com
✅ Build Pack: dockerfile
✅ Docker Registry Image: dockerfile
✅ Status: running (deve estar healthy após DNS)
```

### 3. 🔄 Aguardar Propagação DNS

```bash
# Verificar propagação (executar a cada 10 minutos)
nslookup whosfy.com

# Resultado esperado:
Nome: whosfy.com
Address: 129.146.146.242
```

**Tempo de propagação:** 5-30 minutos

### 4. ✅ Testar Conectividade

```bash
# Teste 1: Ping direto
ping 129.146.146.242

# Teste 2: Curl direto no IP
curl -H "Host: whosfy.com" http://129.146.146.242

# Teste 3: Curl no domínio (após propagação)
curl http://whosfy.com
```

### 5. 🔒 Configurar HTTPS (Após DNS funcionar)

#### No Coolify:
1. Vá para **Applications** → **Whosfy App** → **Domains**
2. Altere de `http://whosfy.com` para `https://whosfy.com`
3. Ative **Generate Let's Encrypt Certificate**
4. Faça um novo deploy

#### No Cloudflare (Opcional):
1. Reative o proxy: **Proxy: ✅ Proxied**
2. Configure SSL/TLS: **Full (strict)**

## 🔍 Troubleshooting

### Problema: DNS não resolve para 194.164.72.183

```bash
# Verificar nameservers
nslookup -type=NS whosfy.com

# Limpar cache DNS local
ipconfig /flushdns

# Testar com DNS público
nslookup whosfy.com 8.8.8.8
```

### Problema: Aplicação não responde

1. **Verificar status no Coolify:**
   - Status deve ser "running:healthy"
   - Verificar logs da aplicação

2. **Verificar firewall do servidor:**
   ```bash
   # Conectar via SSH
   ssh root@194.164.72.183
   
   # Verificar portas abertas
   netstat -tlnp | grep :80
   netstat -tlnp | grep :443
   ```

3. **Verificar proxy Traefik:**
   ```bash
   # No servidor VPS
   docker ps | grep traefik
   docker logs coolify-proxy
   ```

### Problema: SSL não funciona

1. **Aguardar geração do certificado** (pode levar até 10 minutos)
2. **Verificar logs do Let's Encrypt** no Coolify
3. **Verificar se o domínio resolve corretamente** antes de gerar SSL

## 📊 Comandos de Monitoramento

```bash
# Verificar status DNS
nslookup whosfy.com

# Verificar conectividade HTTP
curl -I http://whosfy.com

# Verificar conectividade HTTPS (após SSL)
curl -I https://whosfy.com

# Verificar certificado SSL
openssl s_client -connect whosfy.com:443 -servername whosfy.com
```

## 🎯 Próximos Passos

1. ✅ **Configurar DNS** (registros A no Cloudflare)
2. ⏳ **Aguardar propagação** (5-30 minutos)
3. ✅ **Testar HTTP** (http://whosfy.com)
4. ✅ **Configurar HTTPS** (Let's Encrypt no Coolify)
5. ✅ **Ativar proxy Cloudflare** (opcional, para CDN)
6. ✅ **Testar HTTPS** (https://whosfy.com)

## 📞 URLs de Teste

- **Aplicação atual:** http://w4kocsog4kkok48sgow48kc4.129.146.146.242.sslip.io
- **Painel Coolify:** http://194.164.72.183:8000
- **Objetivo:** https://whosfy.com

---

**⚠️ Nota:** Execute os passos em ordem e aguarde a propagação DNS antes de prosseguir para HTTPS.