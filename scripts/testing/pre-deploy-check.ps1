#!/usr/bin/env pwsh

# Script de analise pre-deploy para Windows
# Executa verificacoes antes do deploy para evitar erros

Write-Host "Iniciando analise pre-deploy..." -ForegroundColor Blue
Write-Host ""

# Verificar se Node.js esta instalado
try {
    $nodeVersion = node --version
    Write-Host "Node.js encontrado: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "Node.js nao encontrado. Instale Node.js primeiro." -ForegroundColor Red
    exit 1
}

# Verificar se pnpm esta instalado
try {
    $pnpmVersion = pnpm --version
    Write-Host "pnpm encontrado: $pnpmVersion" -ForegroundColor Green
} catch {
    Write-Host "pnpm nao encontrado. Instale com: npm install -g pnpm" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "Executando verificacoes..." -ForegroundColor Yellow
Write-Host ""

# Navegar para o diretorio do projeto
$projectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $projectRoot

# Executar o script de analise
try {
    node scripts/pre-deploy-check.js
    $exitCode = $LASTEXITCODE
    
    if ($exitCode -eq 0) {
        Write-Host ""
        Write-Host "Analise concluida com sucesso! Projeto pronto para deploy." -ForegroundColor Green
        Write-Host ""
        Write-Host "Para fazer o deploy:" -ForegroundColor Cyan
        Write-Host "1. Commit suas alteracoes: git add . ; git commit -m 'sua mensagem'" -ForegroundColor White
        Write-Host "2. Push para o repositorio: git push" -ForegroundColor White
        Write-Host "3. Inicie o deploy no Coolify" -ForegroundColor White
    } else {
        Write-Host ""
        Write-Host "Problemas encontrados. Corrija os erros antes do deploy." -ForegroundColor Red
        exit $exitCode
    }
} catch {
    Write-Host "Erro ao executar analise: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}