# 🌐 Guia de Configuração do Cloudflare - Whosfy.com

## 📋 Visão Geral

Este guia detalha como configurar o Cloudflare para o domínio `whosfy.com` após o registro, incluindo configuração de DNS, SSL/TLS e integração com o servidor VPS.

## 🎯 Informações do Projeto

- **Domínio:** whosfy.com
- **Servidor VPS:** 194.164.72.183 (Oracle Cloud)
- **Aplicação:** http://w4kocsog4kkok48sgow48kc4.129.146.146.242.sslip.io
- **Painel Coolify:** http://194.164.72.183:8000

## 🚀 Passo a Passo da Configuração

### 1. 📝 Adicionar Site ao Cloudflare

1. Acesse o [painel do Cloudflare](https://dash.cloudflare.com)
2. Clique em "Add a Site"
3. Digite `whosfy.com`
4. Selecione o plano (Free é suficiente para começar)
5. Aguarde o scan automático dos registros DNS

### 2. 🔧 Configurar Registros DNS

#### Registros Obrigatórios:

```dns
# Registro A - Domínio principal
Tipo: A
Nome: @
Conteúdo: 194.164.72.183
TTL: Auto
Proxy: ✅ Proxied

# Registro A - Subdomínio www
Tipo: A
Nome: www
Conteúdo: 194.164.72.183
TTL: Auto
Proxy: ✅ Proxied

# Registro CNAME - Wildcard para subdomínios
Tipo: CNAME
Nome: *
Conteúdo: whosfy.com
TTL: Auto
Proxy: ✅ Proxied
```

#### Registros Opcionais (Recomendados):

```dns
# Registro MX - Email (se usar email personalizado)
Tipo: MX
Nome: @
Conteúdo: mail.whosfy.com
Prioridade: 10
TTL: Auto

# Registro TXT - Verificação de domínio
Tipo: TXT
Nome: @
Conteúdo: "v=spf1 include:_spf.google.com ~all"
TTL: Auto
```

### 3. 🔒 Configurar SSL/TLS

#### 3.1. Modo de Criptografia
1. Vá para **SSL/TLS** → **Overview**
2. Selecione **"Full (strict)"** como modo de criptografia
3. Aguarde a ativação (pode levar até 24h)

#### 3.2. Configurações Adicionais
```
✅ Always Use HTTPS: ON
✅ HTTP Strict Transport Security (HSTS): ON
✅ Minimum TLS Version: 1.2
✅ Opportunistic Encryption: ON
✅ TLS 1.3: ON
```

### 4. ⚡ Configurar Performance

#### 4.1. Caching
```
✅ Browser Cache TTL: 4 hours
✅ Caching Level: Standard
✅ Always Online: ON
```

#### 4.2. Speed
```
✅ Auto Minify: CSS, HTML, JavaScript
✅ Brotli: ON
✅ Early Hints: ON
```

### 5. 🛡️ Configurar Segurança

#### 5.1. Firewall
```
✅ Security Level: Medium
✅ Bot Fight Mode: ON
✅ Challenge Passage: 30 minutes
```

#### 5.2. Page Rules (Opcional)
```
# Regra 1: Forçar HTTPS
URL: http://*whosfy.com/*
Settings: Always Use HTTPS

# Regra 2: Cache para assets estáticos
URL: *whosfy.com/static/*
Settings: Cache Level = Cache Everything, Edge Cache TTL = 1 month
```

### 6. 🔄 Alterar Nameservers

1. No painel do Cloudflare, copie os nameservers fornecidos:
   ```
   exemplo.ns.cloudflare.com
   exemplo.ns.cloudflare.com
   ```

2. No painel do seu registrador de domínio:
   - Acesse as configurações de DNS
   - Substitua os nameservers atuais pelos do Cloudflare
   - Salve as alterações

3. Aguarde a propagação (pode levar até 48h)

### 7. ✅ Verificar Configuração

#### 7.1. Testes de DNS
```bash
# Verificar propagação DNS
nslookup whosfy.com
nslookup www.whosfy.com

# Verificar SSL
curl -I https://whosfy.com
```

#### 7.2. Ferramentas Online
- [DNS Checker](https://dnschecker.org/)
- [SSL Labs](https://www.ssllabs.com/ssltest/)
- [GTmetrix](https://gtmetrix.com/)

## 🔧 Configuração no Coolify

### 8. 📱 Configurar Domínio no Coolify

1. Acesse o painel: http://194.164.72.183:8000
2. Vá para **Projects** → **Whosfy App**
3. Clique em **Domains**
4. Adicione os domínios:
   ```
   whosfy.com
   www.whosfy.com
   ```
5. Ative **Generate Let's Encrypt Certificate**
6. Salve e faça deploy

### 9. 🔐 Configurar SSL no Servidor

O Coolify gerenciará automaticamente os certificados SSL via Let's Encrypt quando os domínios estiverem configurados corretamente.

## 📊 Monitoramento e Manutenção

### 10. 📈 Analytics

1. No Cloudflare, vá para **Analytics & Logs**
2. Configure **Web Analytics** para monitorar:
   - Tráfego
   - Performance
   - Segurança
   - Cache hit ratio

### 11. 🚨 Alertas

Configure alertas para:
- Downtime do site
- Ataques DDoS
- Problemas de SSL
- Uso excessivo de banda

## 🔍 Troubleshooting

### Problemas Comuns:

#### DNS não resolve
```bash
# Verificar se os nameservers foram alterados
dig NS whosfy.com

# Limpar cache DNS local
ipconfig /flushdns  # Windows
sudo dscacheutil -flushcache  # macOS
```

#### SSL não funciona
1. Verificar se o modo SSL está em "Full (strict)"
2. Aguardar propagação (até 24h)
3. Verificar se o certificado foi gerado no Coolify

#### Site não carrega
1. Verificar se o servidor VPS está online
2. Verificar se o Coolify está rodando
3. Verificar logs no painel do Coolify

## 📞 Próximos Passos

1. ✅ Configurar registros DNS no Cloudflare
2. ✅ Alterar nameservers no registrador
3. ✅ Configurar SSL/TLS
4. ✅ Adicionar domínio no Coolify
5. ✅ Testar acesso via https://whosfy.com
6. ⏳ Configurar email personalizado (opcional)
7. ⏳ Configurar CDN para assets estáticos
8. ⏳ Implementar monitoramento avançado

## 📚 Recursos Úteis

- [Documentação Cloudflare](https://developers.cloudflare.com/)
- [Documentação Coolify](https://coolify.io/docs)
- [Let's Encrypt](https://letsencrypt.org/)
- [DNS Propagation Checker](https://www.whatsmydns.net/)

---

**Nota:** Este guia assume que você já tem o domínio registrado e acesso ao painel do registrador para alterar os nameservers.