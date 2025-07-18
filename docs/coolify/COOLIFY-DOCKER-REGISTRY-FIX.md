# Correção: Erro de Acesso Negado ao Docker Registry no Coolify

## Problema Identificado
**Erro**: `denied: requested access to the resource is denied`
**Contexto**: Falha ao fazer push da imagem Docker para o registry durante o deploy

## Causa do Problema
O Coolify está tentando fazer push da imagem Docker para um registry externo (como Docker Hub) sem as credenciais adequadas ou configuração correta.

## Soluções

### Solução 1: Configurar Registry Local (Recomendado)

1. **Acesse o painel do Coolify**: http://localhost:8000
2. **Navegue para sua aplicação** "Whosfy App"
3. **Vá para a aba "Settings"** ou "Configurações"
4. **Procure por "Docker Registry" ou "Registry Settings"**
5. **Configure para usar registry local**:
   - Registry Type: `Local` ou `None`
   - Ou desmarque "Use External Registry"

### Solução 2: Configurar Build Pack como Dockerfile

1. **No painel do Coolify**, vá para sua aplicação
2. **Na seção "Build"**:
   - Build Pack: `dockerfile`
   - Base Directory: `/` (raiz)
   - Dockerfile Location: `./Dockerfile`
   - Docker Build Stage Target: (deixe vazio)

3. **Na seção "Docker Registry"**:
   - Deixe o campo "Docker Image" **VAZIO**
   - Isso força o Coolify a usar o Dockerfile local

### Solução 3: Configurar Credenciais do Docker Hub (Se necessário)

Se você realmente precisa usar um registry externo:

1. **Crie uma conta no Docker Hub** (se não tiver)
2. **No painel do Coolify**:
   - Vá para "Settings" > "Docker Registries"
   - Adicione um novo registry:
     - Name: `docker-hub`
     - URL: `https://index.docker.io/v1/`
     - Username: `seu-usuario-dockerhub`
     - Password: `seu-token-dockerhub`

3. **Configure sua aplicação** para usar este registry

### Solução 4: Verificar Configurações de Rede

1. **Verifique se o Docker está funcionando**:
   ```powershell
   docker --version
   docker info
   ```

2. **Teste conectividade**:
   ```powershell
   docker pull hello-world
   ```

## Configuração Recomendada para Whosfy App

### Build Settings
```
Build Pack: dockerfile
Base Directory: /
Dockerfile Location: ./Dockerfile
Docker Build Stage Target: (vazio)
```

### Registry Settings
```
Docker Image: (vazio - deixe em branco)
Registry: Local/None
```

### Environment Variables (Essenciais)
```env
NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0
DATABASE_URL=postgresql://postgres:26Mn1597+1709@127.0.0.1:5432/postgres
NODE_ENV=production
NEXTAUTH_SECRET=sua-chave-secreta-aqui
NEXTAUTH_URL=https://whosfy.com
```

## Passos para Aplicar a Correção

1. ✅ **Acesse o painel**: http://localhost:8000
2. ✅ **Navegue para "Projects" > "Whosfy App"**
3. ✅ **Configure Build Pack como "dockerfile"**
4. ✅ **Deixe "Docker Image" em branco**
5. ✅ **Configure todas as variáveis de ambiente**
6. ✅ **Salve as configurações**
7. ✅ **Inicie um novo deploy**

## Verificação

Após aplicar as correções:

1. **Monitore os logs** durante o deploy
2. **Verifique se não há mais erros de registry**
3. **Confirme que a aplicação está "healthy"**
4. **Teste o acesso via domínio configurado**

## Troubleshooting Adicional

### Se o problema persistir:

1. **Verifique logs detalhados**:
   - No painel do Coolify, vá para "Deployments"
   - Clique no deploy com falha
   - Analise os logs completos

2. **Reinicie o serviço Docker**:
   ```powershell
   # No Windows (se usando Docker Desktop)
   Restart-Service docker
   ```

3. **Limpe cache do Docker**:
   ```powershell
   docker system prune -a
   ```

4. **Verifique espaço em disco**:
   ```powershell
   docker system df
   ```

## Links Úteis

- **Painel Coolify**: http://localhost:8000
- **Documentação Coolify**: https://coolify.io/docs
- **Docker Hub**: https://hub.docker.com
- **Dockerfile do projeto**: ./Dockerfile

---

**Nota**: A configuração recomendada é usar o Dockerfile local sem registry externo, pois é mais simples e evita problemas de autenticação.