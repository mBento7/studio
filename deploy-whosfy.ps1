#!/usr/bin/env pwsh
# Script de Deploy Automatizado para Whosfy App no Coolify

Write-Host "🚀 Iniciando deploy do Whosfy App..." -ForegroundColor Green

# Verificar se estamos no diretório correto
if (-not (Test-Path "package.json")) {
    Write-Host "❌ Erro: Execute este script no diretório raiz do projeto" -ForegroundColor Red
    exit 1
}

# Verificar se há mudanças não commitadas
$gitStatus = git status --porcelain
if ($gitStatus) {
    Write-Host "📝 Commitando mudanças..." -ForegroundColor Yellow
    git add .
    git commit -m "feat: atualizações para deploy no Coolify - $(Get-Date -Format 'yyyy-MM-dd HH:mm')"
else {
    Write-Host "✅ Repositório limpo, sem mudanças para commitar" -ForegroundColor Green
}

# Push para a branch main
Write-Host "📤 Fazendo push para a branch main..." -ForegroundColor Yellow
git push origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Push realizado com sucesso!" -ForegroundColor Green
    Write-Host "🔄 O Coolify irá detectar automaticamente as mudanças e iniciar o deploy" -ForegroundColor Cyan
    Write-Host "🌐 URL da aplicação: http://w4kocsog4kkok48sgow48kc4.129.146.146.242.sslip.io" -ForegroundColor Cyan
    Write-Host "📊 Painel do Coolify: http://129.146.146.242:8000" -ForegroundColor Cyan
else {
    Write-Host "❌ Erro no push. Verifique as configurações do Git" -ForegroundColor Red
    exit 1
}

Write-Host "🎉 Deploy iniciado com sucesso!" -ForegroundColor Green