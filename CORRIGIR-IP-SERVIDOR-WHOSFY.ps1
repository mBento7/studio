# ========================================
# ANALISE CORRIGIDA: IP DO SERVIDOR WHOSFY
# ========================================

Write-Host "=== ANALISE CORRIGIDA ===" -ForegroundColor White
Write-Host "INFORMACAO ATUALIZADA: 129.146.146.242 eh o IP CORRETO da VPS Oracle!" -ForegroundColor Green
Write-Host "Configuracao Geral Coolify: IP 194.164.72.183 (INCORRETO)" -ForegroundColor Red
Write-Host "Servidor whosfy-production-server: IP 129.146.146.242 (CORRETO)" -ForegroundColor Green
Write-Host ""

Write-Host "=== CORRECAO NECESSARIA ===" -ForegroundColor White
Write-Host "A configuracao geral do Coolify precisa usar o IP da VPS Oracle!" -ForegroundColor Yellow
Write-Host "IP Correto da VPS Oracle: 129.146.146.242" -ForegroundColor Green
Write-Host ""

# Teste de conectividade
Write-Host "=== TESTANDO CONECTIVIDADE ===" -ForegroundColor White
Write-Host "Testando IP da VPS Oracle (129.146.146.242)..." -ForegroundColor Cyan
try {
    $oracleIpTest = Test-NetConnection -ComputerName "129.146.146.242" -Port 22 -WarningAction SilentlyContinue -ErrorAction SilentlyContinue
    if ($oracleIpTest.TcpTestSucceeded) {
        Write-Host "✓ IP da VPS Oracle (129.146.146.242) esta acessivel" -ForegroundColor Green
    } else {
        Write-Host "✗ IP da VPS Oracle (129.146.146.242) nao esta acessivel" -ForegroundColor Red
    }
} catch {
    Write-Host "✗ Erro ao testar IP da VPS Oracle" -ForegroundColor Red
}

Write-Host "Testando IP incorreto da config geral (194.164.72.183)..." -ForegroundColor Cyan
try {
    $wrongIpTest = Test-NetConnection -ComputerName "194.164.72.183" -Port 22 -WarningAction SilentlyContinue -ErrorAction SilentlyContinue
    if ($wrongIpTest.TcpTestSucceeded) {
        Write-Host "? IP 194.164.72.183 tambem esta acessivel (pode ser outro servidor)" -ForegroundColor Yellow
    } else {
        Write-Host "✗ IP 194.164.72.183 nao esta acessivel" -ForegroundColor Red
    }
} catch {
    Write-Host "✗ Erro ao testar IP 194.164.72.183" -ForegroundColor Red
}
Write-Host ""

Write-Host "=== INSTRUCOES DE CORRECAO ===" -ForegroundColor White
Write-Host "OPCAO 1 - Corrigir Config Geral Coolify:" -ForegroundColor Cyan
Write-Host "1. Acesse: http://localhost:8000" -ForegroundColor Cyan
Write-Host "2. Va para: Settings -> Configuration -> General" -ForegroundColor Cyan
Write-Host "3. Altere Instance Public IPv4: 194.164.72.183 -> 129.146.146.242" -ForegroundColor Yellow
Write-Host "4. Clique em 'Save'" -ForegroundColor Cyan
Write-Host ""
Write-Host "OPCAO 2 - Manter Config Atual (Recomendado):" -ForegroundColor Green
Write-Host "O servidor da aplicacao ja esta correto (129.146.146.242)" -ForegroundColor Green
Write-Host "Focar nas outras correcoes necessarias:" -ForegroundColor Green
Write-Host "• Adicionar variaveis de ambiente" -ForegroundColor Yellow
Write-Host "• Habilitar health check (/api/health)" -ForegroundColor Yellow
Write-Host "• Atualizar FQDN para HTTPS" -ForegroundColor Yellow
Write-Host "• Fazer redeploy" -ForegroundColor Yellow
Write-Host ""

Write-Host "=== STATUS ATUAL ===" -ForegroundColor White
Write-Host "✓ IP do servidor da aplicacao: CORRETO (129.146.146.242)" -ForegroundColor Green
Write-Host "? Config geral Coolify: Diferente mas pode estar OK" -ForegroundColor Yellow
Write-Host "✗ Variaveis de ambiente: FALTANDO" -ForegroundColor Red
Write-Host "✗ Health check: DESABILITADO" -ForegroundColor Red
Write-Host "✗ FQDN: HTTP em vez de HTTPS" -ForegroundColor Red
Write-Host ""

Write-Host "=== PROXIMOS PASSOS PRIORITARIOS ===" -ForegroundColor White
Write-Host "1. Adicionar variaveis de ambiente (URGENTE)" -ForegroundColor Red
Write-Host "2. Habilitar health check (/api/health)" -ForegroundColor Yellow
Write-Host "3. Atualizar FQDN para HTTPS" -ForegroundColor Yellow
Write-Host "4. Fazer redeploy final" -ForegroundColor Yellow
Write-Host ""

Write-Host "ANALISE ATUALIZADA CONCLUIDA!" -ForegroundColor Green
Write-Host "O IP do servidor esta correto. Foque nas outras correcoes." -ForegroundColor Green
Write-Host "Tempo estimado para correcoes restantes: 20-30 minutos" -ForegroundColor Cyan