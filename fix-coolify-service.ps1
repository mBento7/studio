# Script para Diagnosticar e Corrigir o Coolify
# Autor: Assistente AI
# Data: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')

Write-Host "=== DIAGNÓSTICO E CORREÇÃO DO COOLIFY ===" -ForegroundColor Cyan
Write-Host ""

# Função para verificar se um comando existe
function Test-Command($cmdname) {
    return [bool](Get-Command -Name $cmdname -ErrorAction SilentlyContinue)
}

# 1. Verificar se Docker Desktop está instalado
Write-Host "1. Verificando instalação do Docker Desktop..." -ForegroundColor Yellow
$dockerDesktopPath = "C:\Program Files\Docker\Docker\Docker Desktop.exe"
if (Test-Path $dockerDesktopPath) {
    Write-Host "   ✅ Docker Desktop encontrado em: $dockerDesktopPath" -ForegroundColor Green
} else {
    Write-Host "   ❌ Docker Desktop não encontrado!" -ForegroundColor Red
    Write-Host "   📥 Baixe e instale o Docker Desktop em: https://www.docker.com/products/docker-desktop" -ForegroundColor Yellow
    Write-Host "   ⚠️  Após a instalação, reinicie o computador e execute este script novamente." -ForegroundColor Yellow
    exit 1
}

# 2. Verificar se Docker Desktop está rodando
Write-Host "\n2. Verificando se Docker Desktop está rodando..." -ForegroundColor Yellow
$dockerProcess = Get-Process -Name "Docker Desktop" -ErrorAction SilentlyContinue
if ($dockerProcess) {
    Write-Host "   ✅ Docker Desktop está rodando (PID: $($dockerProcess.Id))" -ForegroundColor Green
} else {
    Write-Host "   ⚠️  Docker Desktop não está rodando. Tentando iniciar..." -ForegroundColor Yellow
    try {
        Start-Process -FilePath $dockerDesktopPath -WindowStyle Hidden
        Write-Host "   🚀 Docker Desktop iniciado. Aguardando inicialização..." -ForegroundColor Green
        Start-Sleep -Seconds 30
    } catch {
        Write-Host "   ❌ Erro ao iniciar Docker Desktop: $($_.Exception.Message)" -ForegroundColor Red
        exit 1
    }
}

# 3. Verificar se o comando docker está disponível
Write-Host "\n3. Verificando comando docker..." -ForegroundColor Yellow
$maxAttempts = 12
$attempt = 0
do {
    $attempt++
    if (Test-Command "docker") {
        Write-Host "   ✅ Comando docker disponível" -ForegroundColor Green
        break
    } else {
        Write-Host "   ⏳ Aguardando Docker ficar disponível... (tentativa $attempt/$maxAttempts)" -ForegroundColor Yellow
        Start-Sleep -Seconds 10
    }
} while ($attempt -lt $maxAttempts)

if (-not (Test-Command "docker")) {
    Write-Host "   ❌ Comando docker não está disponível após $maxAttempts tentativas" -ForegroundColor Red
    Write-Host "   💡 Tente reiniciar o Docker Desktop manualmente" -ForegroundColor Yellow
    exit 1
}

# 4. Verificar status do Docker
Write-Host "\n4. Verificando status do Docker..." -ForegroundColor Yellow
try {
    $dockerInfo = docker info 2>$null
    if ($LASTEXITCODE -eq 0) {
        Write-Host "   ✅ Docker está funcionando corretamente" -ForegroundColor Green
    } else {
        Write-Host "   ❌ Docker não está respondendo corretamente" -ForegroundColor Red
        exit 1
    }
} catch {
    Write-Host "   ❌ Erro ao verificar status do Docker: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

# 5. Verificar containers do Coolify
Write-Host "\n5. Verificando containers do Coolify..." -ForegroundColor Yellow
try {
    $coolifyContainers = docker ps -a --filter "name=coolify" --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
    if ($coolifyContainers -and $coolifyContainers.Count -gt 1) {
        Write-Host "   📋 Containers do Coolify encontrados:" -ForegroundColor Green
        $coolifyContainers | ForEach-Object { Write-Host "      $_" -ForegroundColor White }
    } else {
        Write-Host "   ⚠️  Nenhum container do Coolify encontrado" -ForegroundColor Yellow
        Write-Host "   🔧 Tentando iniciar o Coolify..." -ForegroundColor Yellow
        
        # Verificar se existe docker-compose.yml do Coolify
        if (Test-Path "docker-compose.yml") {
            Write-Host "   📄 Arquivo docker-compose.yml encontrado" -ForegroundColor Green
            docker-compose up -d
        } else {
            Write-Host "   ❌ Arquivo docker-compose.yml não encontrado" -ForegroundColor Red
            Write-Host "   💡 Execute o comando de instalação do Coolify primeiro" -ForegroundColor Yellow
        }
    }
} catch {
    Write-Host "   ❌ Erro ao verificar containers: $($_.Exception.Message)" -ForegroundColor Red
}

# 6. Verificar se o Coolify está acessível
Write-Host "\n6. Verificando acesso ao Coolify..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:8000" -TimeoutSec 10 -ErrorAction SilentlyContinue
    if ($response.StatusCode -eq 200) {
        Write-Host "   ✅ Coolify está acessível em http://localhost:8000" -ForegroundColor Green
    } else {
        Write-Host "   ⚠️  Coolify não está respondendo (Status: $($response.StatusCode))" -ForegroundColor Yellow
    }
} catch {
    Write-Host "   ❌ Coolify não está acessível em http://localhost:8000" -ForegroundColor Red
    Write-Host "   🔧 Verificando se o container está rodando..." -ForegroundColor Yellow
    
    $coolifyRunning = docker ps --filter "name=coolify" --filter "status=running" --quiet
    if ($coolifyRunning) {
        Write-Host "   ✅ Container do Coolify está rodando" -ForegroundColor Green
        Write-Host "   ⏳ Aguarde alguns minutos para o serviço inicializar completamente" -ForegroundColor Yellow
    } else {
        Write-Host "   ❌ Container do Coolify não está rodando" -ForegroundColor Red
        Write-Host "   🔧 Tentando reiniciar o Coolify..." -ForegroundColor Yellow
        docker-compose restart 2>$null
    }
}

# 7. Comandos úteis para troubleshooting
Write-Host "\n=== COMANDOS ÚTEIS PARA TROUBLESHOOTING ===" -ForegroundColor Cyan
Write-Host "📋 Ver logs do Coolify:" -ForegroundColor Yellow
Write-Host "   docker-compose logs -f coolify" -ForegroundColor White
Write-Host "\n🔄 Reiniciar Coolify:" -ForegroundColor Yellow
Write-Host "   docker-compose restart" -ForegroundColor White
Write-Host "\n🛑 Parar Coolify:" -ForegroundColor Yellow
Write-Host "   docker-compose down" -ForegroundColor White
Write-Host "\n🚀 Iniciar Coolify:" -ForegroundColor Yellow
Write-Host "   docker-compose up -d" -ForegroundColor White
Write-Host "\n🌐 Acessar Coolify:" -ForegroundColor Yellow
Write-Host "   http://localhost:8000" -ForegroundColor White

Write-Host "\n=== DIAGNÓSTICO CONCLUÍDO ===" -ForegroundColor Cyan
Write-Host "Se o problema persistir, verifique os logs do Docker e do Coolify." -ForegroundColor Yellow