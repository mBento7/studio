# Guia de Desenvolvimento - Whosfy

## 🚀 Iniciando o Desenvolvimento

### Pré-requisitos
- Node.js 18+
- pnpm
- Acesso SSH ao VPS Oracle

### Comandos de Desenvolvimento

```bash
# Instalar dependências
pnpm install

# Iniciar servidor de desenvolvimento (porta 9002)
pnpm run dev
```

**Importante:** A aplicação roda na porta **9002** em modo de desenvolvimento.

## 🔗 Conexões SSH

### Supabase (Túnel SSH)
```bash
ssh -i "C:\Users\Micael\.ssh\oracle_new" -L 54321:127.0.0.1:54321 -L 54323:127.0.0.1:54323 -N ubuntu@129.146.146.242
```

**Portas:**
- `54321`: API do Supabase
- `54323`: Dashboard do Supabase

### Coolify (Túnel SSH)
```bash
ssh -i "C:\Users\Micael\.ssh\oracle_new" -L 8000:localhost:8000 ubuntu@129.146.146.242
```

**Porta:**
- `8000`: Dashboard do Coolify

### VPS (Acesso Direto)
```bash
ssh -i "C:\Users\Micael\.ssh\oracle_new" ubuntu@129.146.146.242
```

## 📋 Fluxo de Desenvolvimento

1. **Conectar ao Supabase:**
   ```bash
   ssh -i "C:\Users\Micael\.ssh\oracle_new" -L 54321:127.0.0.1:54321 -L 54323:127.0.0.1:54323 -N ubuntu@129.146.146.242
   ```

2. **Iniciar aplicação:**
   ```bash
   pnpm run dev
   ```

3. **Acessar aplicação:**
   - Aplicação: http://localhost:9002
   - Health Check: http://localhost:9002/api/health

4. **Acessar Supabase Dashboard (opcional):**
   - Dashboard: http://localhost:54323

5. **Acessar Coolify (quando necessário):**
   ```bash
   ssh -i "C:\Users\Micael\.ssh\oracle_new" -L 8000:localhost:8000 ubuntu@129.146.146.242
   ```
   - Dashboard: http://localhost:8000

## 🔧 Configuração de Ambiente

### Variáveis de Ambiente (.env)
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://wkwhvjsnqsognjorjsgf.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anonima

# Desenvolvimento Local
SUPABASE_LOCAL_URL=http://localhost:54321
MCP_API_URL=http://localhost:54321
```

## 🐳 Deploy

### Build Local
```bash
# Limpar cache
Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue

# Build
pnpm build

# Testar build
pnpm start
```

### Deploy no Coolify
1. Conectar ao Coolify:
   ```bash
   ssh -i "C:\Users\Micael\.ssh\oracle_new" -L 8000:localhost:8000 ubuntu@129.146.146.242
   ```

2. Acessar http://localhost:8000

3. Fazer deploy da aplicação `m-bento7/studio:main`

4. Configurar Health Check:
   - Método: GET
   - Path: /api/health
   - Porta: 3000
   - Timeout: 5 segundos
   - Retries: 3

## 🔍 Troubleshooting

### Porta em Uso
Se a porta 9002 estiver em uso:
```bash
# Verificar processos na porta
netstat -ano | findstr :9002

# Matar processo (substitua PID)
taskkill /PID <PID> /F
```

### Problemas de Permissão
```bash
# Limpar cache do Next.js
Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue

# Reinstalar dependências
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
pnpm install
```

### Conexão SSH
- Verificar se a chave SSH está no local correto: `C:\Users\Micael\.ssh\oracle_new`
- Verificar permissões da chave SSH
- Testar conexão: `ssh -i "C:\Users\Micael\.ssh\oracle_new" ubuntu@129.146.146.242`

## 📚 Links Úteis

- **Aplicação Local:** http://localhost:9002
- **Health Check:** http://localhost:9002/api/health
- **Supabase Dashboard:** http://localhost:54323 (com túnel)
- **Coolify Dashboard:** http://localhost:8000 (com túnel)
- **Aplicação Produção:** https://studio.whosfy.com