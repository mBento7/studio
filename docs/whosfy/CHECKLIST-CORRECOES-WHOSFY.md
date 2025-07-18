# Checklist de Correções para Whosfy

## Status Atual
- [x] Aplicação identificada: `m-bento7/studio:main-dcokoooo0k8s4scgogcog40g`
- [x] Status atual: `running:unhealthy`
- [x] Servidor: `whosfy-production-server` (IP: `129.146.146.242`)
- [x] FQDN atual: `http://whosfy.com`
- [x] Health Check: Desabilitado

## Correções Necessárias

### 1. Variáveis de Ambiente

#### Supabase Configuration
- [ ] `NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321` (Is Build Time: ✅)
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0` (Is Build Time: ✅)

#### Expo/Mobile Configuration
- [ ] `EXPO_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321`
- [ ] `EXPO_PUBLIC_SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0`

#### Database Configuration
- [ ] `DATABASE_URL=postgresql://postgres:26Mn1597+1709@localhost:5432/postgres`
- [ ] `DIRECT_URL=postgresql://postgres:26Mn1597+1709@localhost:5432/postgres`

#### NextAuth Configuration
- [ ] `NEXTAUTH_URL=https://whosfy.com`
- [ ] `NEXTAUTH_SECRET=whosfy-nextauth-secret-production-2024`

#### Application Configuration
- [ ] `NODE_ENV=production`
- [ ] `PORT=3000`
- [ ] `CORS_ORIGIN=https://whosfy.com`

### 2. Health Check
- [ ] Habilitar Health Check
- [ ] Path: `/api/health`
- [ ] Port: `3000`
- [ ] Method: `GET`
- [ ] Status Code: `200`

### 3. FQDN
- [ ] Atualizar FQDN para: `https://whosfy.com`
- [ ] Habilitar SSL automático

### 4. Redeploy
- [ ] Fazer redeploy da aplicação

## Verificação Pós-Correções
- [ ] Status alterado para: `running:healthy`
- [ ] Health Check funcionando: `https://whosfy.com/api/health`
- [ ] Site acessível: `https://whosfy.com`

---

## Instruções de Acesso

### Conectar via SSH
```bash
ssh -i "C:\Users\Micael\.ssh\oracle_new" -L 8000:localhost:8000 ubuntu@129.146.146.242
```

### Acessar Coolify
```
URL: http://localhost:8000
```

### Credenciais do Banco de Dados
- **Usuário**: `postgres`
- **Senha**: `26Mn1597+1709`
- **Host**: `localhost`
- **Porta**: `5432`
- **Database**: `postgres`

---

**Tempo estimado**: 15-20 minutos  
**Prioridade**: 🔴 URGENTE