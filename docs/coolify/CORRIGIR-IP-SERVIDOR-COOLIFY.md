# Como Corrigir o IP do Servidor no Coolify

## Problema Identificado

O servidor `whosfy-production-server` está configurado corretamente com o IP **129.146.146.242** (Oracle Cloud VPS).

## Configuração Atual do Servidor

- **Nome**: whosfy-production-server
- **UUID**: v4840soos0wwgcsokco8w0sg
- **IP Atual**: 129.146.146.242 ✅
- **IP Correto**: 129.146.146.242 ✅
- **Status**: is_reachable: true, is_usable: true
- **Porta**: 22
- **Usuário**: root

## Limitações do MCP

O MCP do Coolify **NÃO permite**:
- Editar configurações de servidor existente
- Alterar IP de servidor já criado
- Deletar servidores

## Soluções Disponíveis

### Opção 1: Correção via Interface Web (RECOMENDADO)

1. **Acesse o Coolify**:
   ```
   http://localhost:8000
   ```

2. **Navegue para Servidores**:
   - Menu lateral → "Servers"
   - Clique em "whosfy-production-server"

3. **Edite as Configurações**:
   - Clique em "Settings" ou "Edit"
   - Verificar se o IP está correto: `129.146.146.242`
   - Salve as alterações

4. **Teste a Conectividade**:
   - Clique em "Validate Connection"
   - Aguarde a validação

### Opção 2: Criar Novo Servidor (ALTERNATIVA)

1. **Criar novo servidor via interface**:
   - Nome: `whosfy-production-server-novo`
   - IP: `129.146.146.242`
   - Porta: `22`
   - Usuário: `root`

2. **Migrar aplicação**:
   - Editar aplicação `w4kocsog4kkok48sgow48kc4`
   - Alterar servidor de destino
   - Fazer novo deploy

## Verificações Necessárias

### 1. Conectividade SSH
```bash
ssh -i "C:\Users\Micael\.ssh\oracle_new" ubuntu@129.146.146.242
```

### 2. Verificar se o Docker está rodando
```bash
ssh -i "C:\Users\Micael\.ssh\oracle_new" ubuntu@129.146.146.242 "docker ps"
```

### 3. Verificar portas abertas
```bash
ssh -i "C:\Users\Micael\.ssh\oracle_new" ubuntu@129.146.146.242 "netstat -tlnp | grep :80"
```

## Configurações de Rede

### Firewall Oracle Cloud
Verificar se as portas estão abertas:
- **80** (HTTP)
- **443** (HTTPS)
- **22** (SSH)
- **8000** (Coolify)

### Configurações do Servidor
Após corrigir o IP, verificar:
- Proxy Traefik funcionando
- Certificados SSL
- Redirecionamentos

## Próximos Passos

1. ✅ **Verificar IP do servidor** (129.146.146.242 está correto)
2. ✅ **Validar conectividade**
3. ✅ **Testar aplicação**
4. ✅ **Atualizar FQDN** (http://whosfy.com → http://www.whosfy.com)
5. ✅ **Configurar DNS no Cloudflare**

## Comandos de Monitoramento

```bash
# Verificar status do servidor
curl -I http://129.146.146.242

# Verificar DNS
nslookup whosfy.com
nslookup www.whosfy.com

# Testar conectividade
ping 129.146.146.242
```

## Observações Importantes

- ⚠️ **Backup**: Fazer backup antes de qualquer alteração
- ⚠️ **Downtime**: Pode haver indisponibilidade temporária
- ⚠️ **DNS**: Aguardar propagação DNS (até 24h)
- ⚠️ **SSL**: Certificados podem precisar ser renovados

## Status Atual

- [x] Problema identificado
- [x] Soluções mapeadas
- [ ] IP corrigido
- [ ] Conectividade validada
- [ ] Aplicação testada

---

**Última atualização**: $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")
**Responsável**: Assistente AI
**Prioridade**: ALTA 🔴