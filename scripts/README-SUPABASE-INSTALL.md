# 🚀 Scripts de Instalação do Supabase na VPS

Este diretório contém scripts automatizados para instalar e configurar o Supabase na VPS Oracle.

## 📋 Informações da VPS

- **IP:** 129.146.146.242
- **Usuário:** ubuntu
- **Chave SSH:** C:\Users\Micael\.ssh\oracle_new
- **Docker:** ✅ Já instalado
- **Supabase:** ✅ **INSTALADO E FUNCIONANDO**

## 🛠️ Scripts Disponíveis

### 1. Script PowerShell (Windows) - `install-supabase-vps.ps1`

**Instalação completa (recomendado):**
```powershell
.\scripts\install-supabase-vps.ps1
```

**Opções disponíveis:**
```powershell
# Apenas instalar (sem iniciar túnel)
.\scripts\install-supabase-vps.ps1 -InstallOnly

# Iniciar túnel SSH para Supabase Studio
.\scripts\install-supabase-vps.ps1 -StartTunnel

# Verificar status do Supabase
.\scripts\install-supabase-vps.ps1 -CheckStatus
```

### 2. Script Bash (Linux/Mac) - `install-supabase-vps.sh`

```bash
# Executar na VPS via SSH
ssh -i "C:\Users\Micael\.ssh\oracle_new" ubuntu@129.146.146.242 'bash -s' < ./scripts/install-supabase-vps.sh
```

## 🔧 O que os scripts fazem

1. **Verificam conexão SSH** com a VPS
2. **Instalam Node.js/npm** (se necessário)
3. **Instalam Supabase CLI** globalmente
4. **Criam diretório do projeto** (/home/ubuntu/whosfy)
5. **Inicializam projeto Supabase** (supabase init)
6. **Verificam Docker** (pré-requisito)
7. **Iniciam Supabase local** (supabase start)

## 🌐 Acessar Supabase Studio

Após a instalação, para acessar o Supabase Studio:

1. **Iniciar túnel SSH:**
   ```powershell
   .\scripts\install-supabase-vps.ps1 -StartTunnel
   ```

2. **Acessar no navegador:**
   - Studio: http://localhost:54323
   - API: http://localhost:54321
   - DB: localhost:54322

## 🔍 Verificar Status

```powershell
# Via script PowerShell
.\scripts\install-supabase-vps.ps1 -CheckStatus

# Via SSH direto
ssh -i "C:\Users\Micael\.ssh\oracle_new" ubuntu@129.146.146.242 "cd /home/ubuntu/whosfy && supabase status"
```

## 🚨 Solução de Problemas

### Erro de conexão SSH
- Verificar se a chave SSH está no local correto: `C:\Users\Micael\.ssh\oracle_new`
- Verificar se a VPS está acessível: `129.146.146.242`
- Verificar permissões da chave SSH

### Erro na instalação do Supabase
- Verificar se o Docker está rodando na VPS
- Verificar se há espaço suficiente em disco
- Verificar logs de erro no output do script

### Túnel SSH não funciona
- Verificar se o Supabase está rodando: `supabase status`
- Verificar se as portas não estão em uso localmente
- Tentar reiniciar o Supabase: `supabase stop && supabase start`

## 📝 Comandos Úteis

```bash
# Conectar na VPS
ssh -i "C:\Users\Micael\.ssh\oracle_new" ubuntu@129.146.146.242

# Comandos Supabase na VPS
cd /home/ubuntu/whosfy
supabase status    # Ver status
supabase stop      # Parar serviços
supabase start     # Iniciar serviços
supabase logs      # Ver logs

# Túnel SSH manual
ssh -i "C:\Users\Micael\.ssh\oracle_new" -L 54323:127.0.0.1:54323 -L 54321:127.0.0.1:54321 -L 54322:127.0.0.1:54322 -N ubuntu@129.146.146.242
```

## ✅ Próximos Passos

Após instalar o Supabase:

1. ✅ **Supabase instalado e rodando**
2. ✅ **Túnel SSH configurado e funcionando**
3. ✅ **Supabase Studio acessível em http://localhost:54323**
4. 🔄 **Clonar repositório do projeto na VPS**
5. 🔄 **Configurar variáveis de ambiente**
6. 🔄 **Aplicar migrations do banco**
7. 🔄 **Configurar deploy via Coolify**

---

**Status:** ✅ **SUPABASE INSTALADO E FUNCIONANDO** - Projeto inicializado em `/home/ubuntu/whosfy`

**Serviços ativos:**
- PostgreSQL: localhost:54322
- API Supabase: localhost:54321
- Supabase Studio: localhost:54323
- Storage API: localhost:54324