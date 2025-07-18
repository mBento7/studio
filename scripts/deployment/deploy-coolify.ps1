# Script para deploy automatizado no Coolify
Write-Host "🚀 Iniciando deploy no Coolify..." -ForegroundColor Green

# Verificar se há mudanças para commit
$gitStatus = git status --porcelain
if ($gitStatus) {
    Write-Host "📝 Commitando alterações..." -ForegroundColor Yellow
    git add .
    git commit -m "fix: adicionar configurações Docker para deploy"
    git push origin main
    Write-Host "✅ Alterações enviadas para o repositório" -ForegroundColor Green
} else {
    Write-Host "ℹ️ Nenhuma alteração para commit" -ForegroundColor Blue
}

Write-Host "🔧 Configurações aplicadas:" -ForegroundColor Cyan
Write-Host "  - Dockerfile otimizado para monorepo" -ForegroundColor White
Write-Host "  - Next.js configurado para standalone" -ForegroundColor White
Write-Host "  - .dockerignore para otimizar build" -ForegroundColor White
Write-Host "  - nixpacks.toml como alternativa" -ForegroundColor White

Write-Host "\n📋 Próximos passos no Coolify:" -ForegroundColor Yellow
Write-Host "  1. Alterar Build Pack para 'Docker'" -ForegroundColor White
Write-Host "  2. Ou manter Nixpacks e usar Root Directory: /apps/web" -ForegroundColor White
Write-Host "  3. Executar novo deploy" -ForegroundColor White
Write-Host "  4. Monitorar logs em tempo real" -ForegroundColor White

Write-Host "\n🌐 Acesso ao Coolify: http://localhost:8080" -ForegroundColor Green