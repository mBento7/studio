# Correções Identificadas no Coolify - Whosfy

## Status Atual da Aplicação

### Informações da Aplicação
- **UUID**: `w4kocsog4kkok48sgow48kc4`
- **Nome**: `m-bento7/studio:main-dcokoooo0k8s4scgogcog40g`
- **Status**: `running:unhealthy` ⚠️
- **FQDN**: `http://whosfy.com`
- **Porta Exposta**: `3000`
- **Build Pack**: `dockerfile`
- **Dockerfile Location**: `/Dockerfile`

### Problemas Identificados

#### 1. Status Unhealthy
- A aplicação está rodando mas com status `running:unhealthy`
- Último online: `2025-07-14 22:46:33` (mais de 1 dia atrás)
- Health check desabilitado (`health_check_enabled: false`)

#### 2. Configuração de Servidor
- **Servidor Atual**: `whosfy-production-server`
- **IP do Servidor**: `129.146.146.242` (IP incorreto)
- **IP Correto Esperado**: `194.164.72.183`
- **Status do Servidor**: `running:unhealthy`

#### 3. Problemas de DNS/Domínio
- FQDN configurado: `http://whosfy.com`
- Domínio ainda aponta para: `http://w4kocsog4kkok48sgow48kc4.129.146.146.242.sslip.io/`
- Necessário configurar para: `www.whosfy.com`

## Ações Realizadas via MCP

### ✅ Restart da Aplicação
- **Comando**: `restart_application`
- **Status**: Executado com sucesso
- **Deployment UUID**: `vswwows8kc4wo4g4w40kkgs0`
- **Resultado**: Restart solicitado, mas status ainda `unhealthy`

### ❌ Deploy da Aplicação
- **Comando**: `deploy_application`
- **Status**: Falhou com erro 404
- **Motivo**: Possível problema de conectividade ou configuração

## Correções Necessárias

### 1. Configuração do Servidor
```bash
# Verificar se o servidor está apontando para o IP correto
# IP Atual: 129.146.146.242
# IP Correto: 194.164.72.183
```

### 2. Configuração de DNS
- **Cloudflare**: Configurar registros A para apontar para `194.164.72.183`
  - `@` (whosfy.com) → `194.164.72.183`
  - `www` (www.whosfy.com) → `194.164.72.183`
- **Proxy Cloudflare**: Desabilitar inicialmente

### 3. FQDN no Coolify
- **Atual**: `http://whosfy.com`
- **Sugerido**: `http://www.whosfy.com` ou `http://whosfy.com,http://www.whosfy.com`

### 4. Health Check
- Habilitar health check para monitoramento adequado
- Configurar endpoint de health check (`/health` ou `/api/health`)

### 5. Docker Registry
- Problema anterior com "acesso negado" ao Docker Registry
- Configuração atual usa `dockerfile` como build pack (correto)
- Verificar se o build está funcionando corretamente

## Próximos Passos

### Imediatos (Via Interface Web do Coolify)
1. **Acessar Coolify**: `http://localhost:8000` (via túnel SSH)
2. **Verificar Logs**: Analisar logs de deployment e runtime
3. **Atualizar FQDN**: Alterar para `http://www.whosfy.com`
4. **Verificar Servidor**: Confirmar IP do servidor de produção
5. **Habilitar Health Check**: Configurar monitoramento de saúde

### Configuração DNS (Cloudflare)
1. **Deletar Registros Incorretos**:
   - `@` → `84.32.84.32` (Hostinger)
   - `@` → `129.146.145.242` (IP incorreto)

2. **Criar Registros Corretos**:
   ```
   Tipo: A
   Nome: @
   Conteúdo: 194.164.72.183
   Proxy: Desabilitado
   TTL: Auto
   
   Tipo: A
   Nome: www
   Conteúdo: 194.164.72.183
   Proxy: Desabilitado
   TTL: Auto
   ```

### Verificação e Testes
1. **Propagação DNS**:
   ```bash
   nslookup whosfy.com
   nslookup www.whosfy.com
   ```

2. **Conectividade**:
   ```bash
   curl -I http://whosfy.com
   curl -I http://www.whosfy.com
   ```

3. **Status da Aplicação**:
   - Verificar se status muda para `running:healthy`
   - Testar acesso via domínio

## Comandos de Monitoramento

```bash
# Verificar status via MCP
# (usar get_application com UUID: w4kocsog4kkok48sgow48kc4)

# Verificar DNS
dig whosfy.com
dig www.whosfy.com

# Testar conectividade
ping 194.164.72.183
telnet 194.164.72.183 80
```

## Observações Importantes

1. **Túnel SSH Ativo**: `ssh -L 8000:localhost:80 -N root@194.164.72.183`
2. **MCP Coolify**: Funcional para consultas e restart
3. **Deploy via MCP**: Apresentando erro 404
4. **Interface Web**: Necessária para configurações avançadas

## Status das Correções

- [ ] Corrigir IP do servidor de produção
- [ ] Atualizar FQDN para www.whosfy.com
- [ ] Configurar DNS no Cloudflare
- [ ] Habilitar health check
- [ ] Resolver problemas de deploy
- [ ] Testar acesso via domínio
- [ ] Verificar status healthy

---

**Última Atualização**: 16/07/2025
**Próxima Verificação**: Após configuração DNS e FQDN