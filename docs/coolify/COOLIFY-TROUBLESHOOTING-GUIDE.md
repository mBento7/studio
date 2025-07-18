# Guia de Solução de Problemas do Coolify

## Problema Identificado
**Erro**: "Service is unavailable" ao tentar acessar o Coolify em http://localhost:8000

## Diagnóstico
O problema está relacionado ao Docker não estar instalado ou não estar funcionando corretamente no sistema.

## Soluções

### Solução 1: Instalar Docker Desktop (Recomendado)

#### Passo 1: Download e Instalação
1. **Baixe o Docker Desktop**:
   - Acesse: https://www.docker.com/products/docker-desktop
   - Clique em "Download for Windows"
   - Execute o instalador baixado

2. **Durante a Instalação**:
   - ✅ Marque "Use WSL 2 instead of Hyper-V" (recomendado)
   - ✅ Marque "Add shortcut to desktop"
   - Siga as instruções do instalador

3. **Após a Instalação**:
   - **IMPORTANTE**: Reinicie o computador
   - Aguarde o Docker Desktop inicializar completamente

#### Passo 2: Verificar Instalação
```powershell
# Verificar se Docker está funcionando
docker --version
docker info
```

#### Passo 3: Instalar Coolify
```bash
# Comando oficial de instalação do Coolify
curl -fsSL https://cdn.coollabs.io/coolify/install.sh | bash
```

### Solução 2: Usar Coolify Cloud (Alternativa)

Se você preferir não instalar Docker localmente:

1. **Acesse**: https://app.coolify.io
2. **Crie uma conta** gratuita
3. **Configure seu projeto** diretamente na nuvem
4. **Deploy** seu aplicativo Whosfy

### Solução 3: Verificar Docker Existente

Se você acredita que o Docker já está instalado:

```powershell
# Verificar se Docker Desktop está rodando
Get-Process -Name "Docker Desktop" -ErrorAction SilentlyContinue

# Verificar serviços Docker
Get-Service -Name *docker*

# Tentar iniciar Docker Desktop
Start-Process "C:\Program Files\Docker\Docker\Docker Desktop.exe"
```

## Comandos de Verificação

### Verificar Status do Docker
```powershell
# Verificar versão
docker --version

# Verificar informações do sistema
docker info

# Listar containers
docker ps -a
```

### Verificar Status do Coolify
```bash
# Verificar containers do Coolify
docker ps --filter "name=coolify"

# Ver logs do Coolify
docker logs coolify

# Reiniciar Coolify
docker restart coolify
```

## Configuração das Variáveis de Ambiente

Após resolver o problema do Docker/Coolify:

### 1. Acessar o Painel
- URL: http://localhost:8000
- Faça login no painel administrativo

### 2. Configurar Variáveis
Navegue para sua aplicação e adicione:

```env
NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0
DATABASE_URL=postgresql://postgres:26Mn1597+1709@127.0.0.1:5432/postgres
```

### 3. Reiniciar Aplicação
Após adicionar as variáveis, reinicie a aplicação no painel do Coolify.

## Troubleshooting Adicional

### Problema: Docker não inicia
**Solução**:
1. Verifique se a virtualização está habilitada no BIOS
2. Verifique se o WSL 2 está instalado:
   ```powershell
   wsl --install
   ```
3. Reinicie o computador

### Problema: Coolify não responde
**Solução**:
1. Verifique se a porta 8000 está livre:
   ```powershell
   netstat -ano | findstr :8000
   ```
2. Reinicie o container do Coolify:
   ```bash
   docker restart coolify
   ```

### Problema: Aplicação continua "unhealthy"
**Possíveis causas**:
1. Variáveis de ambiente não configuradas
2. Supabase local não está rodando
3. Problemas de conectividade de rede Docker

**Solução**:
1. Configure todas as variáveis de ambiente
2. Inicie o Supabase local:
   ```bash
   npx supabase start
   ```
3. Use `host.docker.internal` em vez de `127.0.0.1` nas URLs

## Próximos Passos

1. ✅ **Instalar Docker Desktop** (se não estiver instalado)
2. ✅ **Reiniciar o computador** após instalação
3. ✅ **Verificar se Docker está funcionando**
4. ✅ **Instalar/Reiniciar Coolify**
5. ✅ **Configurar variáveis de ambiente**
6. ✅ **Testar aplicação**

## Links Úteis

- **Docker Desktop**: https://www.docker.com/products/docker-desktop
- **Coolify Docs**: https://coolify.io/docs
- **Coolify Cloud**: https://app.coolify.io
- **WSL 2 Installation**: https://docs.microsoft.com/en-us/windows/wsl/install

## Suporte

Se o problema persistir após seguir este guia:
1. Verifique os logs do Docker Desktop
2. Verifique os logs do Coolify
3. Considere usar Coolify Cloud como alternativa
4. Consulte a documentação oficial do Coolify