#!/usr/bin/env pwsh

# Script de análise pré-deploy para Windows
# Executa verificações antes do deploy para evitar erros

Write-Host "🚀 Iniciando análise pré-deploy..." -ForegroundColor Blue
Write-Host ""

# Verificar se Node.js está instalado
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js encontrado: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js não encontrado. Instale Node.js primeiro." -ForegroundColor Red
    exit 1
}

# Verificar se pnpm está instalado
try {
    $pnpmVersion = pnpm --version
    Write-Host "✅ pnpm encontrado: $pnpmVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ pnpm não encontrado. Instale com: npm install -g pnpm" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "📋 Executando verificações..." -ForegroundColor Yellow
Write-Host ""

# Navegar para o diretório do projeto
$projectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $projectRoot

# Executar o script de análise
try {
    node scripts/pre-deploy-check.js
    $exitCode = $LASTEXITCODE
    
    if ($exitCode -eq 0) {
        Write-Host ""
        Write-Host "🎉 Análise concluída com sucesso! Projeto pronto para deploy." -ForegroundColor Green
        Write-Host ""
        Write-Host "Para fazer o deploy:" -ForegroundColor Cyan
        Write-Host "1. Commit suas alterações: git add . && git commit -m 'sua mensagem'" -ForegroundColor White
        Write-Host "2. Push para o repositório: git push" -ForegroundColor White
        Write-Host "3. Inicie o deploy no Coolify" -ForegroundColor White
    } else {
        Write-Host ""
        Write-Host "🚫 Problemas encontrados. Corrija os erros antes do deploy." -ForegroundColor Red
        exit $exitCode
    }
} catch {
    Write-Host "❌ Erro ao executar análise: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}