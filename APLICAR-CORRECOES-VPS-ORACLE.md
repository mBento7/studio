# Guia de Aplicação de Correções na VPS Oracle

## Informações da VPS
- **IP**: 129.146.146.242
- **Usuário**: ubuntu
- **Chave SSH**: `C:\Users\Micael\.ssh\oracle_new`

## Objetivo
Aplicar as correções necessárias para mudar o status da aplicação Whosfy de `running:unhealthy` para `running:healthy` diretamente na VPS Oracle.

## Comandos SSH Necessários

### 1. Conexão SSH Básica
```powershell
ssh -i "C:\Users\Micael\.ssh\oracle_new" ubuntu@129.146.146.242
```

### 2. Túnel para Coolify (Porta 8000)
```powershell
ssh -i "C:\Users\Micael\.ssh\oracle_new" -L 8000:localhost:8000 ubuntu@129.146.146.242
```

### 3. Túnel para Supabase (Portas 54321 e 54323)
```powershell
ssh -i "C:\Users\Micael\.ssh\oracle_new" -L 54321:127.0.0.1:54321 -L 54323:127.0.0.1:54323 -N ubuntu@129.146.146.242
```

## Passos para Aplicar as Correções

### Passo 1: Estabelecer Conexão com a VPS
1. Abra um terminal PowerShell
2. Execute o comando de túnel para Coolify:
   ```powershell
   ssh -i "C:\Users\Micael\.ssh\oracle_new" -L 8000:localhost:8000 ubuntu@129.146.146.242
   ```
3. Mantenha esta janela aberta

### Passo 2: Estabelecer Conexão com Supabase
1. Abra outro terminal PowerShell
2. Execute o comando de túnel para Supabase:
   ```powershell
   ssh -i "C:\Users\Micael\.ssh\oracle_new" -L 54321:127.0.0.1:54321 -L 54323:127.0.0.1:54323 -N ubuntu@129.146.146.242
   ```
3. Mantenha esta janela aberta

### Passo 3: Acessar Coolify e Aplicar Correções
1. Abra seu navegador e acesse: http://localhost:8000
2. Faça login no Coolify
3. Siga as instruções do script `APLICAR-CORRECOES-FINAIS-WHOSFY.ps1`:

#### 3.1. Adicionar Variáveis de Ambiente
- Acesse: Applications → whosfy → Environment Variables
- Adicione as seguintes variáveis:

**Supabase Configuration**
```
NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0
```

**Expo/Mobile Configuration**
```
EXPO_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321
EXPO_PUBLIC_SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0
```

**Database Configuration**
```
DATABASE_URL="postgresql://postgres:26Mn1597+1709@localhost:5432/postgres"
DIRECT_URL="postgresql://postgres:26Mn1597+1709@localhost:5432/postgres"
```

**NextAuth Configuration**
```
NEXTAUTH_URL=https://whosfy.com
NEXTAUTH_SECRET=whosfy-nextauth-secret-production-2024
```

**Application Configuration**
```
NODE_ENV=production
PORT=3000
CORS_ORIGIN=https://whosfy.com
```

#### 3.2. Habilitar Health Check
- Vá para: Configuration → Health Check
- Habilite: Enable Health Check
- Path: `/api/health`
- Port: `3000`
- Method: `GET`
- Expected Status Code: `200`

#### 3.3. Atualizar FQDN para HTTPS
- Vá para: Configuration → Domains
- Altere de: `http://whosfy.com`
- Para: `https://whosfy.com`
- Habilite: Enable Automatic HTTPS

#### 3.4. Fazer Redeploy
- Clique em: Deploy
- Aguarde: 5-10 minutos
- Verifique: Status deve mudar para `running:healthy`

### Passo 4: Verificar Aplicação
1. Após o redeploy, verifique se o status mudou para `running:healthy`
2. Teste o acesso ao site: https://whosfy.com
3. Verifique o health check: `curl https://whosfy.com/api/health`

## Notas Importantes
- As alterações serão aplicadas diretamente na VPS Oracle
- O IP correto da VPS é 129.146.146.242
- O Supabase está rodando localmente na VPS nas portas 54321/54323
- O banco de dados PostgreSQL está na porta 5432
- Senha do PostgreSQL: 26Mn1597+1709

## Arquivos Relacionados
- `.env.production` - Variáveis de ambiente
- `COOLIFY-ENV-VARIAVEIS-ATUALIZADAS.md` - Guia detalhado
- `APLICAR-CORRECOES-FINAIS-WHOSFY.ps1` - Script de correções
- `aplicar-todas-correcoes-mcp.ps1` - Script atualizado
- `aplicar-correcoes-vps-oracle.ps1` - Script para VPS

## Tempo Estimado
- **Total**: 20-30 minutos
- **Prioridade**: URGENTE