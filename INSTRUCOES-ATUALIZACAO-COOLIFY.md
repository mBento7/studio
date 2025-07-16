# Instruções para Atualização da Aplicação Whosfy no Coolify

## Problema Atual

A aplicação Whosfy está atualmente com o status `running:unhealthy` no servidor Coolify (IP: 129.146.146.242). Para corrigir este problema, é necessário realizar as seguintes configurações:

## Correções Necessárias

### 1. Atualizar Variáveis de Ambiente

Acesse o Coolify através do navegador em `http://localhost:8000` (após estabelecer o túnel SSH) e adicione as seguintes variáveis de ambiente:

#### Supabase Configuration
```
NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0
```

#### Expo/Mobile Configuration
```
EXPO_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321
EXPO_PUBLIC_SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0
```

#### Database Configuration
```
DATABASE_URL=postgresql://postgres:26Mn1597+1709@localhost:5432/postgres
DIRECT_URL=postgresql://postgres:26Mn1597+1709@localhost:5432/postgres
```

#### NextAuth Configuration
```
NEXTAUTH_URL=https://whosfy.com
NEXTAUTH_SECRET=whosfy-nextauth-secret-production-2024
```

#### Application Configuration
```
NODE_ENV=production
PORT=3000
CORS_ORIGIN=https://whosfy.com
```

**Importante:** Para as variáveis que começam com `NEXT_PUBLIC_`, marque a opção **Is Build Time**.

### 2. Habilitar Health Check

1. Acesse as configurações da aplicação no Coolify
2. Configure o Health Check com os seguintes parâmetros:
   - Path: `/api/health`
   - Port: `3000`
   - Method: `GET`
   - Status Code: `200`
   - Habilite a opção de Health Check

### 3. Atualizar FQDN

1. Altere o FQDN de `http://whosfy.com` para `https://whosfy.com`
2. Habilite a opção de SSL automático

### 4. Fazer Redeploy

Após realizar todas as configurações acima, faça o redeploy da aplicação para aplicar as mudanças.

## Verificação Pós-Configuração

Após o redeploy, verifique:

1. Se o status da aplicação mudou para `running:healthy`
2. Se o Health Check está funcionando corretamente em `https://whosfy.com/api/health`
3. Se a aplicação está acessível em `https://whosfy.com`

## Estabelecendo Túnel SSH

Para acessar o Coolify na VPS Oracle, utilize o seguinte comando para estabelecer um túnel SSH:

```bash
ssh -i "caminho/para/sua/chave_privada" -L 8000:localhost:8000 ubuntu@129.146.146.242
```

Substitua "caminho/para/sua/chave_privada" pelo caminho correto da sua chave SSH privada.

## Informações Adicionais

### Credenciais do Banco de Dados
- **Usuário**: `postgres`
- **Senha**: `26Mn1597+1709`
- **Host**: `localhost`
- **Porta**: `5432`
- **Database**: `postgres`

### Supabase Local
- **URL**: `http://127.0.0.1:54321`
- **Porta**: `54321`

---

**Tempo estimado para aplicação das correções**: 15-20 minutos
**Prioridade**: URGENTE