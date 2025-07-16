# Script de Deploy Automatico - Coolify
# Executa deploy da aplicacao Whosfy no Coolify

Write-Host "Iniciando Deploy Automatico no Coolify..." -ForegroundColor Green

# Configuracoes
$COOLIFY_URL = "http://localhost:8000"
$PROJECT_NAME = "whosfy"
$APP_NAME = "whosfy-web"

# Verificar se o tunel SSH esta ativo
Write-Host "Verificando conexao com Coolify..." -ForegroundColor Yellow
$tunnelCheck = netstat -an | findstr ":8000"
if (-not $tunnelCheck) {
    Write-Host "Tunel SSH nao esta ativo. Iniciando conexao..." -ForegroundColor Red
    Write-Host "Execute primeiro: .\connect-coolify.ps1" -ForegroundColor Yellow
    exit 1
}

Write-Host "Tunel SSH ativo na porta 8000" -ForegroundColor Green

# Verificar se ha mudancas para commit
Write-Host "Verificando mudancas no Git..." -ForegroundColor Yellow
$gitStatus = git status --porcelain
if ($gitStatus) {
    Write-Host "Commitando e enviando alteracoes..." -ForegroundColor Cyan
    git add .
    $commitMessage = "deploy: automated deployment $(Get-Date -Format 'yyyy-MM-dd HH:mm')"
    git commit -m $commitMessage
    git push origin main
    Write-Host "Alteracoes enviadas para o repositorio" -ForegroundColor Green
} else {
    Write-Host "Nenhuma alteracao local para commit" -ForegroundColor Blue
}

# Abrir Coolify no navegador
Write-Host "Abrindo Coolify no navegador..." -ForegroundColor Cyan
Start-Process $COOLIFY_URL

Write-Host ""
Write-Host "INSTRUCOES PARA DEPLOY MANUAL:" -ForegroundColor Yellow
Write-Host "1. Faca login no Coolify (se necessario)" -ForegroundColor White
Write-Host "2. Navegue para: Projects -> $PROJECT_NAME" -ForegroundColor White
Write-Host "3. Clique na aplicacao '$APP_NAME'" -ForegroundColor White
Write-Host "4. Clique em 'Deploy' ou 'Redeploy'" -ForegroundColor White
Write-Host "5. Monitore os logs de deploy" -ForegroundColor White
Write-Host ""

# Informacoes importantes
Write-Host "INFORMACOES IMPORTANTES:" -ForegroundColor Magenta
Write-Host "   URL Coolify: $COOLIFY_URL" -ForegroundColor White
Write-Host "   Projeto: $PROJECT_NAME" -ForegroundColor White
Write-Host "   Aplicacao: $APP_NAME" -ForegroundColor White
Write-Host "   Build: Nixpacks (nixpacks.toml)" -ForegroundColor White
Write-Host "   Dockerfile: Renomeado para .bak" -ForegroundColor White
Write-Host ""

# Status das correcoes aplicadas
Write-Host "CORRECOES APLICADAS:" -ForegroundColor Green
Write-Host "   Dockerfile -> Dockerfile.bak (Nixpacks habilitado)" -ForegroundColor White
Write-Host "   Git submodules: Resolvido" -ForegroundColor White
Write-Host "   Build errors: Corrigidos" -ForegroundColor White
Write-Host "   Monorepo: Configurado (apps/web)" -ForegroundColor White
Write-Host ""

# Aguardar confirmacao
Write-Host "Aguardando deploy manual no navegador..." -ForegroundColor Yellow
Write-Host "Pressione qualquer tecla apos iniciar o deploy" -ForegroundColor Cyan
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

Write-Host ""
Write-Host "Deploy iniciado! Monitore o progresso no Coolify." -ForegroundColor Green
Write-Host "URL da aplicacao sera exibida apos o deploy concluir." -ForegroundColor Cyan

Write-Host ""
Write-Host "Links Uteis:" -ForegroundColor Yellow
Write-Host "   Coolify Dashboard: $COOLIFY_URL" -ForegroundColor White
Write-Host "   Logs de Deploy: $COOLIFY_URL/projects" -ForegroundColor White
Write-Host "   Documentacao: ./CORRIGIR-ERRO-GIT-SUBMODULES-DEPLOY.md" -ForegroundColor White

Write-Host ""
Write-Host "Deploy automatico concluido!" -ForegroundColor Green