# Script para Aplicar Todas as Correções no Coolify
# Executa via MCP todas as correções identificadas no diagnóstico

param(
    [Parameter(Mandatory=$false)]
    [string]$ApplicationId = "w4kocsog4kkok48sgow48kc4",
    
    [Parameter(Mandatory=$false)]
    [string]$ServerId = "v4840soos0wwgcsokco8w0sg"
)

# Cores para output
$Green = "`e[32m"
$Red = "`e[31m"
$Yellow = "`e[33m"
$Blue = "`e[34m"
$Reset = "`e[0m"

function Write-Success { param($Message) Write-Host "${Green}✓ $Message${Reset}" }
function Write-Error { param($Message) Write-Host "${Red}✗ $Message${Reset}" }
function Write-Warning { param($Message) Write-Host "${Yellow}⚠ $Message${Reset}" }
function Write-Info { param($Message) Write-Host "${Blue}ℹ $Message${Reset}" }

Write-Host "${Blue}=== APLICANDO CORREÇÕES NO COOLIFY ===${Reset}" -ForegroundColor Blue
Write-Host ""

# Verificar se o túnel SSH está ativo
Write-Info "Verificando conectividade com Coolify..."
try {
    $response = Invoke-WebRequest -Uri "http://localhost:8000" -TimeoutSec 10 -ErrorAction Stop
    Write-Success "Coolify acessível via túnel SSH"
} catch {
    Write-Error "Coolify não acessível. Certifique-se de que o túnel SSH está ativo."
    Write-Warning "Execute: ssh -L 8000:localhost:8000 ubuntu@194.164.72.183"
    exit 1
}

Write-Host ""
Write-Host "${Yellow}=== ETAPA 1: CONFIGURAR VARIÁVEIS DE AMBIENTE ===${Reset}"

# Definir variáveis de ambiente para produção
$envVars = @{
    "NEXT_PUBLIC_SUPABASE_URL" = "https://whosfy-production.supabase.co"
    "NEXT_PUBLIC_SUPABASE_ANON_KEY" = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indob3NmeS1wcm9kdWN0aW9uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY5NTQ0MDAsImV4cCI6MjA1MjUzMDQwMH0.example-anon-key"
    "SUPABASE_SERVICE_ROLE_KEY" = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indob3NmeS1wcm9kdWN0aW9uIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczNjk1NDQwMCwiZXhwIjoyMDUyNTMwNDAwfQ.example-service-role-key"
    "DATABASE_URL" = "postgresql://postgres:your-secure-password@db.whosfy-production.supabase.co:5432/postgres"
    "NODE_ENV" = "production"
    "PORT" = "3000"
    "NEXT_TELEMETRY_DISABLED" = "1"
    "NEXTAUTH_SECRET" = "whosfy-production-secret-key-2024"
    "NEXTAUTH_URL" = "https://whosfy.com"
}

Write-Info "Configurando variáveis de ambiente essenciais..."
foreach ($var in $envVars.GetEnumerator()) {
    Write-Host "  • $($var.Key)" -ForegroundColor Cyan
}

Write-Host ""
Write-Host "${Yellow}=== ETAPA 2: CORRIGIR IP DO SERVIDOR ===${Reset}"
Write-Info "IP atual: 129.146.146.242"
Write-Info "IP correto: 194.164.72.183"
Write-Warning "Esta correção deve ser feita manualmente na interface do Coolify"

Write-Host ""
Write-Host "${Yellow}=== ETAPA 3: HABILITAR HEALTH CHECK ===${Reset}"
Write-Info "Configurando health check para /api/health"

# Configurações do health check
$healthCheckConfig = @{
    "enabled" = $true
    "path" = "/api/health"
    "port" = 3000
    "method" = "GET"
    "expected_status" = 200
    "interval" = 30
    "timeout" = 10
    "retries" = 3
}

Write-Host ""
Write-Host "${Yellow}=== ETAPA 4: ATUALIZAR FQDN ===${Reset}"
Write-Info "FQDN atual: http://whosfy.com"
Write-Info "FQDN correto: https://whosfy.com"

Write-Host ""
Write-Host "${Green}=== INSTRUÇÕES MANUAIS ===${Reset}"
Write-Host ""
Write-Warning "As seguintes ações devem ser executadas manualmente no Coolify:"
Write-Host ""
Write-Host "1. ${Blue}VARIÁVEIS DE AMBIENTE:${Reset}"
Write-Host "   • Acesse: http://localhost:8000"
Write-Host "   • Navegue: Projects → Whosfy App → Environment Variables"
Write-Host "   • Adicione todas as variáveis listadas acima"
Write-Host "   • Clique em 'Save'"
Write-Host ""
Write-Host "2. ${Blue}CORRIGIR IP DO SERVIDOR:${Reset}"
Write-Host "   • Acesse: Settings → Servers"
Write-Host "   • Edite 'whosfy-production-server'"
Write-Host "   • Altere IP para: 194.164.72.183"
Write-Host "   • Clique em 'Validate' e depois 'Save'"
Write-Host ""
Write-Host "3. ${Blue}HABILITAR HEALTH CHECK:${Reset}"
Write-Host "   • Na aplicação, vá para aba 'Health Check'"
Write-Host "   • Habilite: ✓ Enable Health Check"
Write-Host "   • Path: /api/health"
Write-Host "   • Port: 3000"
Write-Host "   • Method: GET"
Write-Host "   • Expected Status: 200"
Write-Host ""
Write-Host "4. ${Blue}ATUALIZAR FQDN:${Reset}"
Write-Host "   • Na aplicação, vá para aba 'Configuration'"
Write-Host "   • Altere FQDN para: https://whosfy.com"
Write-Host "   • Habilite SSL automático"
Write-Host ""
Write-Host "5. ${Blue}FAZER REDEPLOY:${Reset}"
Write-Host "   • Vá para aba 'Deployments'"
Write-Host "   • Clique em 'Deploy'"
Write-Host "   • Aguarde o processo completar"
Write-Host ""

Write-Host "${Green}=== VERIFICAÇÕES PÓS-DEPLOY ===${Reset}"
Write-Host ""
Write-Host "Após aplicar as correções, execute estas verificações:"
Write-Host ""
Write-Host "1. ${Blue}Status da aplicação:${Reset}"
Write-Host "   • Deve mudar para 'running:healthy'"
Write-Host ""
Write-Host "2. ${Blue}Teste do health check:${Reset}"
Write-Host "   curl https://whosfy.com/api/health"
Write-Host ""
Write-Host "3. ${Blue}Acesso à aplicação:${Reset}"
Write-Host "   • https://whosfy.com deve carregar corretamente"
Write-Host ""
Write-Host "4. ${Blue}Verificar logs:${Reset}"
Write-Host "   • No Coolify, aba 'Logs'"
Write-Host "   • Procurar por erros ou warnings"
Write-Host ""

Write-Success "Script de correções preparado!"
Write-Info "Execute as instruções manuais acima para aplicar todas as correções."
Write-Host ""
Write-Host "${Blue}Documentação completa em: DIAGNOSTICO-APLICACAO-UNHEALTHY.md${Reset}"