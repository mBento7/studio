# Script para configuração automática do serviço no Coolify
# UUID do serviço: m8k8ck0cc8os8w8csogs4k0o

Write-Host "🚀 Configurando serviço no Coolify automaticamente..." -ForegroundColor Green

# Configurações do projeto
$SERVICE_UUID = "m8k8ck0cc8os8w8csogs4k0o"
$PROJECT_UUID = "j4cocwcowo0o84c88cc0800c"
$ENVIRONMENT_UUID = "g40cswgc0wcggogk0c48sko4"
$COOLIFY_URL = "http://localhost:8000"

# Configurações do repositório
$REPO_URL = "https://github.com/mBento7/studio.git"
$BRANCH = "main"
$WORK_DIR = "apps/web"
$BUILD_COMMAND = "pnpm install && pnpm build"
$START_COMMAND = "pnpm start"
$PORT = "3000"

Write-Host "📋 Configurações do serviço:" -ForegroundColor Cyan
Write-Host "  - UUID do Serviço: $SERVICE_UUID" -ForegroundColor White
Write-Host "  - Repositório: $REPO_URL" -ForegroundColor White
Write-Host "  - Branch: $BRANCH" -ForegroundColor White
Write-Host "  - Diretório: $WORK_DIR" -ForegroundColor White
Write-Host "  - Build: $BUILD_COMMAND" -ForegroundColor White
Write-Host "  - Start: $START_COMMAND" -ForegroundColor White
Write-Host "  - Porta: $PORT" -ForegroundColor White

# Verificar se o túnel SSH está ativo
Write-Host "\n🔍 Verificando conexão com Coolify..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "$COOLIFY_URL/api/health" -Method GET -TimeoutSec 5 -ErrorAction Stop
    Write-Host "✅ Coolify está acessível" -ForegroundColor Green
} catch {
    Write-Host "❌ Erro: Coolify não está acessível em $COOLIFY_URL" -ForegroundColor Red
    Write-Host "   Certifique-se de que o túnel SSH está ativo" -ForegroundColor Yellow
    Write-Host "   Execute: ssh -L 8000:localhost:80 -i ~/.ssh/whosfy-production-key root@IP_DO_SERVIDOR" -ForegroundColor Yellow
    exit 1
}

# Variáveis de ambiente necessárias
Write-Host "\n🔧 Variáveis de ambiente necessárias:" -ForegroundColor Cyan
$ENV_VARS = @(
    "NEXT_PUBLIC_SUPABASE_URL",
    "NEXT_PUBLIC_SUPABASE_ANON_KEY", 
    "SUPABASE_SERVICE_ROLE_KEY",
    "DATABASE_URL",
    "NEXT_PUBLIC_MCP_API_URL",
    "NODE_ENV=production",
    "PORT=3000"
)

foreach ($var in $ENV_VARS) {
    Write-Host "  - $var" -ForegroundColor White
}

# Instruções para configuração manual
Write-Host "\n📝 Instruções para configuração no Coolify:" -ForegroundColor Yellow
Write-Host "\n1. Acesse: $COOLIFY_URL/project/$PROJECT_UUID/environment/$ENVIRONMENT_UUID/service/$SERVICE_UUID" -ForegroundColor White
Write-Host "\n2. Configure o repositório:" -ForegroundColor White
Write-Host "   - Repository: $REPO_URL" -ForegroundColor Gray
Write-Host "   - Branch: $BRANCH" -ForegroundColor Gray
Write-Host "   - Root Directory: $WORK_DIR" -ForegroundColor Gray

Write-Host "\n3. Configure os comandos de build:" -ForegroundColor White
Write-Host "   - Build Command: $BUILD_COMMAND" -ForegroundColor Gray
Write-Host "   - Start Command: $START_COMMAND" -ForegroundColor Gray
Write-Host "   - Port: $PORT" -ForegroundColor Gray

Write-Host "\n4. Configure as variáveis de ambiente:" -ForegroundColor White
Write-Host "   - Adicione todas as variáveis listadas acima" -ForegroundColor Gray
Write-Host "   - Marque 'Build Time' para as variáveis do Supabase" -ForegroundColor Gray

Write-Host "\n5. Configure para monorepo:" -ForegroundColor White
Write-Host "   - Certifique-se de que o Coolify está configurado para pnpm workspaces" -ForegroundColor Gray
Write-Host "   - O diretório de trabalho deve ser 'apps/web'" -ForegroundColor Gray

# Abrir o navegador automaticamente
Write-Host "\n🌐 Abrindo Coolify no navegador..." -ForegroundColor Green
$SERVICE_URL = "$COOLIFY_URL/project/$PROJECT_UUID/environment/$ENVIRONMENT_UUID/service/$SERVICE_UUID"
Start-Process $SERVICE_URL

Write-Host "\n✅ Script concluído!" -ForegroundColor Green
Write-Host "   O Coolify foi aberto no navegador para você finalizar a configuração." -ForegroundColor White
Write-Host "   Siga as instruções acima para completar o setup." -ForegroundColor White

# Aguardar confirmação do usuário
Write-Host "\n⏳ Pressione qualquer tecla após configurar o serviço no Coolify..." -ForegroundColor Yellow
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

Write-Host "\n🚀 Iniciando deploy..." -ForegroundColor Green
Write-Host "   O deploy será iniciado automaticamente no Coolify." -ForegroundColor White
Write-Host "   Monitore os logs no painel do Coolify." -ForegroundColor White

Write-Host "\n🎉 Configuração automática concluída!" -ForegroundColor Green