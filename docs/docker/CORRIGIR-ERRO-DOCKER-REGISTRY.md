# 🔧 CORREÇÃO: Erro de Acesso ao Docker Registry

## 🚨 Problema Identificado

```
denied: requested access to the resource is denied
Failed to push image to docker registry. Please check debug logs for more information.
```

## 🔍 Análise do Erro

O erro indica que o Coolify não consegue fazer push da imagem Docker para o registry. Isso pode acontecer por:

1. **Configuração incorreta do Docker Registry**
2. **Credenciais de autenticação ausentes ou inválidas**
3. **Permissões insuficientes no registry**
4. **Configuração de rede/firewall**

## ✅ Soluções Recomendadas

### **Solução 1: Usar Registry Local (Recomendado)**

1. **Acesse o Coolify**: `http://localhost:8000`
2. **Vá para Settings → Configuration**
3. **Localize "Docker Registry Settings"**
4. **Configure como registry local**:
   - Registry URL: `localhost:5000` ou deixe vazio para usar local
   - Username: (deixe vazio)
   - Password: (deixe vazio)

### **Solução 2: Configurar Registry Externo**

Se quiser usar Docker Hub ou outro registry:

1. **Docker Hub**:
   - Registry URL: `docker.io`
   - Username: `seu_username_dockerhub`
   - Password: `seu_token_dockerhub`

2. **GitHub Container Registry**:
   - Registry URL: `ghcr.io`
   - Username: `seu_username_github`
   - Password: `seu_personal_access_token`

### **Solução 3: Desabilitar Registry Externo**

1. **Acesse Applications → whosfy**
2. **Vá para "Build & Deploy"**
3. **Localize "Registry Settings"**
4. **Desmarque "Use Custom Registry"**
5. **Salve as configurações**

## 🔧 Passos para Aplicar a Correção

### **Método Rápido (Recomendado)**

1. **Acesse o Coolify**: `http://localhost:8000`
2. **Vá para Applications → whosfy**
3. **Na seção "Docker Registry"**:
   - **Campo "Docker Image" é OBRIGATÓRIO** (Required)
   - **Configure como**: `whosfy` ou `app` (nome simples da aplicação)
   - **Campo "Docker Image Tag"**: deixe vazio (usará 'latest' automaticamente)
   - Isso usará o registry local do Coolify
4. **Salve as configurações clicando em "Save"**
5. **Faça um novo deploy**

### **Verificação Pós-Correção**

1. **Inicie um novo deploy**
2. **Monitore os logs em tempo real**
3. **Verifique se não há mais erros de "denied access"**
4. **Confirme que o status muda para "running:healthy"**

## 📋 Checklist de Verificação

- [ ] Campo "Docker Image" preenchido com nome simples (ex: `whosfy`)
- [ ] Campo "Docker Image Tag" vazio (usará 'latest')
- [ ] Health Check está habilitado (✅ já configurado conforme imagem)
- [ ] Health Check Path: `/api/health` (✅ já configurado)
- [ ] Health Check Port: `3000` (✅ já configurado)
- [ ] Deploy iniciado sem erros
- [ ] Logs não mostram "denied access"
- [ ] Aplicação rodando com status "healthy"

## 🚨 Se o Problema Persistir

1. **Verifique os logs completos do deploy**
2. **Confirme se o Docker está rodando na VPS**
3. **Verifique conectividade de rede**
4. **Considere usar apenas registry local**

## 💡 Dicas Importantes

1. **Registry Local**: Para aplicações em desenvolvimento/teste, deixar os campos de Docker Image vazios força o uso do registry local
2. **Health Check**: As configurações de Health Check já estão corretas conforme mostrado na imagem
3. **Build Pack**: O Dockerfile está sendo usado corretamente

## 🎯 Status Atual das Configurações

✅ **Health Check**: Configurado corretamente
- Enabled: ✅
- Method: GET
- Path: /api/health
- Port: 3000
- Return Code: 200

✅ **Configurações Avançadas**: Verificadas
- Auto Deploy: ✅ Habilitado (deploy automático no push)
- Preview Deployments: ❌ Desabilitado (correto para produção)
- Disable Build Cache: ❌ Desabilitado (cache habilitado para builds mais rápidos)
- Force Https: ✅ Habilitado (SSL obrigatório)
- Enable Gzip Compression: ❌ Desabilitado
- Strip Prefixes: ✅ Habilitado
- Consistent Container Names: ❌ Desabilitado
- Custom Container Name: ❌ Desabilitado
- Drain Logs: ❌ Desabilitado
- Submodules: ✅ Habilitado (para repositórios Git com submodules)
- LFS: ✅ Habilitado (para arquivos grandes no Git)
- Enable GPU: ❌ Desabilitado (não necessário para esta aplicação)

❌ **Docker Registry**: Precisa ser corrigido
- Campo "Docker Image" deve ter um nome (ex: `whosfy`)
- Campo "Docker Image Tag" pode ficar vazio (usará 'latest')

## 🔧 Configurações Recomendadas

### Configurações que podem ser otimizadas:

1. **Enable Gzip Compression**: Considere habilitar para melhor performance
2. **Preview Deployments**: Manter desabilitado para produção
3. **Drain Logs**: Pode ser habilitado se houver problemas com logs

---

**Próximo passo**: Após corrigir o registry (preencher Docker Image com nome simples), refaça o deploy e adicione as variáveis de ambiente necessárias.