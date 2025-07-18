# Test script for Coolify MCP Server
Write-Host "=== Testando Coolify MCP Server ===" -ForegroundColor Green
Write-Host ""

# Test 1: Check MCP configuration
Write-Host "1. Verificando configuracao MCP..." -ForegroundColor Yellow
$mcpConfigPath = ".cursor\mcp.json"
if (Test-Path $mcpConfigPath) {
    $mcpConfig = Get-Content $mcpConfigPath | ConvertFrom-Json
    
    if ($mcpConfig.mcpServers.coolify) {
        $coolifyConfig = $mcpConfig.mcpServers.coolify
        
        Write-Host "   [OK] Configuracao MCP encontrada" -ForegroundColor Green
        Write-Host "   - Comando: $($coolifyConfig.command)" -ForegroundColor Cyan
        Write-Host "   - Pacote: $($coolifyConfig.args -join ' ')" -ForegroundColor Cyan
        Write-Host "   - API URL: $($coolifyConfig.env.COOLIFY_API_URL)" -ForegroundColor Cyan
        Write-Host "   - Token configurado: $(if($coolifyConfig.env.COOLIFY_API_TOKEN) {'Sim'} else {'Nao'})" -ForegroundColor Cyan
    } else {
        Write-Host "   [ERRO] Configuracao Coolify nao encontrada no MCP" -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "   [ERRO] Arquivo mcp.json nao encontrado" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "2. Testando instalacao do pacote MCP..." -ForegroundColor Yellow

# Set environment variables
$env:COOLIFY_API_URL = "https://coolify.micaelomota.com"
$env:COOLIFY_API_TOKEN = "0|1TDGFbAhLLBdGCHhidrqp6zQSdmQOBjOkBVBKOtKe4b4c4b0"

try {
    # Test if package can be downloaded
    $testProcess = Start-Process -FilePath "npx" -ArgumentList "-y", "@joshuarileydev/coolify-mcp-server", "--help" -Wait -PassThru -NoNewWindow -RedirectStandardOutput "test-out.txt" -RedirectStandardError "test-err.txt"
    
    if ($testProcess.ExitCode -eq 0) {
        Write-Host "   [OK] Pacote MCP instalado com sucesso" -ForegroundColor Green
    } else {
        Write-Host "   [AVISO] Pacote MCP pode ter problemas (exit code: $($testProcess.ExitCode))" -ForegroundColor Yellow
    }
    
    # Cleanup
    if (Test-Path "test-out.txt") { Remove-Item "test-out.txt" -Force }
    if (Test-Path "test-err.txt") { Remove-Item "test-err.txt" -Force }
} catch {
    Write-Host "   [ERRO] Erro ao testar pacote MCP: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""
Write-Host "3. Verificando conectividade com Coolify..." -ForegroundColor Yellow

# Test both localhost and external URL
$testUrls = @("http://localhost:8000", "https://coolify.micaelomota.com")

foreach ($testUrl in $testUrls) {
    try {
        Write-Host "   Testando: $testUrl" -ForegroundColor Gray
        $response = Invoke-WebRequest -Uri $testUrl -Method HEAD -TimeoutSec 5 -UseBasicParsing
        
        if ($response.StatusCode -eq 200) {
            Write-Host "   [OK] Coolify acessivel em $testUrl" -ForegroundColor Green
            break
        } else {
            Write-Host "   [AVISO] $testUrl respondeu com status: $($response.StatusCode)" -ForegroundColor Yellow
        }
    } catch {
        Write-Host "   [INFO] $testUrl nao acessivel: $($_.Exception.Message.Split(':')[0])" -ForegroundColor Gray
    }
}

Write-Host ""
Write-Host "=== Resumo do Teste ===" -ForegroundColor Green
Write-Host ""
Write-Host "Configuracao MCP atualizada com:" -ForegroundColor White
Write-Host "- Pacote: @joshuarileydev/coolify-mcp-server (v1.0.4)" -ForegroundColor Cyan
Write-Host "- API URL: https://coolify.micaelomota.com" -ForegroundColor Cyan
Write-Host "- Token: Configurado" -ForegroundColor Cyan
Write-Host ""
Write-Host "Proximos passos:" -ForegroundColor Yellow
Write-Host "1. Reinicie o Cursor/Trae AI para carregar a nova configuracao" -ForegroundColor White
Write-Host "2. Teste comandos como:" -ForegroundColor White
Write-Host "   - 'Liste todos os projetos Coolify'" -ForegroundColor Gray
Write-Host "   - 'Mostre o status dos servidores'" -ForegroundColor Gray
Write-Host "   - 'Crie um novo projeto chamado teste'" -ForegroundColor Gray
Write-Host ""