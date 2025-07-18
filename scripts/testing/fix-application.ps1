#!/usr/bin/env pwsh
# Script para corrigir problemas da aplicação Whosfy

Write-Host "🔧 Iniciando correção da aplicação Whosfy..." -ForegroundColor Green

# 1. Verificar se estamos no diretório correto
if (!(Test-Path "apps/web/package.json")) {
    Write-Host "❌ Erro: Execute este script na raiz do projeto studio-master" -ForegroundColor Red
    exit 1
}

# 2. Limpar cache e dependências
Write-Host "🧹 Limpando cache e dependências..." -ForegroundColor Yellow
Remove-Item -Recurse -Force "node_modules" -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force "apps/web/node_modules" -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force "apps/web/.next" -ErrorAction SilentlyContinue
Remove-Item -Force "pnpm-lock.yaml" -ErrorAction SilentlyContinue

# 3. Reinstalar dependências
Write-Host "📦 Reinstalando dependências..." -ForegroundColor Yellow
pnpm install

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erro ao instalar dependências" -ForegroundColor Red
    exit 1
}

# 4. Verificar variáveis de ambiente
Write-Host "🔍 Verificando variáveis de ambiente..." -ForegroundColor Yellow
$envFile = "apps/web/.env"
if (!(Test-Path $envFile)) {
    Write-Host "❌ Arquivo .env não encontrado em apps/web/" -ForegroundColor Red
    exit 1
}

$envContent = Get-Content $envFile
$hasSupabaseUrl = $envContent | Where-Object { $_ -match "NEXT_PUBLIC_SUPABASE_URL=" }
$hasSupabaseKey = $envContent | Where-Object { $_ -match "NEXT_PUBLIC_SUPABASE_ANON_KEY=" }

if (!$hasSupabaseUrl -or !$hasSupabaseKey) {
    Write-Host "❌ Variáveis de ambiente do Supabase não configuradas" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Variáveis de ambiente configuradas" -ForegroundColor Green

# 5. Build da aplicação
Write-Host "🏗️ Fazendo build da aplicação..." -ForegroundColor Yellow
Set-Location "apps/web"
pnpm build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erro no build da aplicação" -ForegroundColor Red
    Set-Location "../.."
    exit 1
}

Set-Location "../.."
Write-Host "✅ Build concluído com sucesso" -ForegroundColor Green

# 6. Testar a aplicação localmente
Write-Host "🧪 Testando aplicação localmente..." -ForegroundColor Yellow
Write-Host "Para testar localmente, execute: cd apps/web; pnpm start" -ForegroundColor Cyan

# 7. Verificar se o Dockerfile está correto
Write-Host "🐳 Verificando Dockerfile..." -ForegroundColor Yellow
if (!(Test-Path "Dockerfile")) {
    Write-Host "❌ Dockerfile não encontrado" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Dockerfile encontrado" -ForegroundColor Green

# 8. Instruções finais
Write-Host ""
Write-Host "🎉 Correção da aplicação concluída!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Próximos passos:" -ForegroundColor Cyan
Write-Host "1. Teste localmente: cd apps/web; pnpm start" -ForegroundColor White
Write-Host "2. Acesse http://localhost:3000 para verificar se está funcionando" -ForegroundColor White
Write-Host "3. Acesse http://localhost:3000/api/health para verificar o health check" -ForegroundColor White
Write-Host "4. Se tudo estiver funcionando, faça o deploy no Coolify" -ForegroundColor White
Write-Host ""
Write-Host "🔧 Para resolver o status 'unhealthy' no Coolify:" -ForegroundColor Cyan
Write-Host "1. Acesse o painel do Coolify" -ForegroundColor White
Write-Host "2. Vá para a aplicação m-bento7/studio:main" -ForegroundColor White
Write-Host "3. Habilite o Health Check com as configurações:" -ForegroundColor White
Write-Host "   - Método: GET" -ForegroundColor White
Write-Host "   - Path: /api/health" -ForegroundColor White
Write-Host "   - Porta: 3000" -ForegroundColor White
Write-Host "   - Timeout: 5 segundos" -ForegroundColor White
Write-Host "   - Retries: 3" -ForegroundColor White
Write-Host ""