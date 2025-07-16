# Guia para Alterar FQDN no Coolify

## Situação Atual
- **Aplicação ID**: `w4kocsog4kkok48sgow48kc4`
- **FQDN Atual**: `http://whosfy.com`
- **FQDN Desejado**: `http://www.whosfy.com` ou múltiplos domínios
- **Status**: `running:unhealthy`
- **Servidor**: `whosfy-production-server` (IP: `129.146.146.242`)

## Problema Identificado
O domínio atual está configurado como `http://whosfy.com`, mas você quer alterar para `www.whosfy.com` ou incluir ambos os domínios.

## Solução: Alterar FQDN via Interface Web do Coolify

### Passo 1: Acessar o Coolify
1. Acesse: http://localhost:8000 (túnel SSH ativo)
2. Faça login no Coolify
3. Navegue até a aplicação `m-bento7/studio:main-dcokoooo0k8s4scgogcog40g`

### Passo 2: Alterar o FQDN
1. Na página da aplicação, procure por "Domains" ou "FQDN"
2. **Opção A - Substituir domínio**:
   - Altere de: `http://whosfy.com`
   - Para: `http://www.whosfy.com`

3. **Opção B - Múltiplos domínios** (Recomendado):
   - Configure: `http://whosfy.com,http://www.whosfy.com`
   - Isso permite acesso por ambos os domínios

### Passo 3: Configurações DNS Necessárias
Antes de alterar no Coolify, certifique-se que o DNS está correto:

```bash
# Verificar DNS atual
nslookup whosfy.com
nslookup www.whosfy.com
```

**Configuração necessária no Cloudflare:**
- Registro A para `@` → `194.164.72.183`
- Registro A para `www` → `194.164.72.183`
- Proxy do Cloudflare: **DESABILITADO** inicialmente

### Passo 4: Aplicar Alterações
1. Salve as configurações no Coolify
2. Reinicie a aplicação se necessário
3. Aguarde a propagação (pode levar alguns minutos)

### Passo 5: Verificar Funcionamento
```bash
# Testar conectividade
curl -I http://whosfy.com
curl -I http://www.whosfy.com

# Verificar se está respondendo
ping whosfy.com
ping www.whosfy.com
```

## Comandos de Monitoramento

```bash
# Verificar status da aplicação
docker ps | grep w4kocsog4kkok48sgow48kc4

# Verificar logs do Traefik
docker logs coolify-proxy

# Verificar logs da aplicação
docker logs <container_name>
```

## Troubleshooting

### Se o domínio não funcionar:
1. Verifique se o DNS está propagado
2. Confirme se o Traefik está funcionando
3. Verifique se não há conflitos de porta
4. Reinicie o proxy se necessário

### Se aparecer erro de certificado:
1. Aguarde o Let's Encrypt gerar o certificado
2. Pode levar até 10 minutos
3. Verifique os logs do Traefik

## Próximos Passos
1. ✅ Alterar FQDN no Coolify
2. ✅ Verificar DNS no Cloudflare
3. ✅ Testar acesso aos domínios
4. ✅ Configurar HTTPS (Let's Encrypt)
5. ✅ Reativar proxy do Cloudflare (opcional)

## Notas Importantes
- O Coolify usa Traefik como proxy reverso
- Múltiplos domínios são suportados (separados por vírgula)
- O redirecionamento está configurado como "both"
- A aplicação está exposta na porta 3000

---
**Data**: $(Get-Date)
**Status**: Aguardando alteração manual no Coolify