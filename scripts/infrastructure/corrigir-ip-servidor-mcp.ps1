# Script para Corrigir IP do Servidor no Coolify
Write-Host "=== CORRECAO DE IP DO SERVIDOR COOLIFY ===" -ForegroundColor Green
Write-Host ""

# Informacoes do servidor identificado
Write-Host "SERVIDOR IDENTIFICADO:" -ForegroundColor Yellow
Write-Host "• UUID: v4840soos0wwgcsokco8w0sg"
Write-Host "• Nome: whosfy-production-server"
Write-Host "• IP Atual: 129.146.146.242 (INCORRETO)"
Write-Host "• IP Correto: 194.164.72.183"
Write-Host ""

# Verificacao de conectividade
Write-Host "VERIFICANDO CONECTIVIDADE:" -ForegroundColor Blue
Write-Host "Testando IP atual (incorreto)..."
try {
    $ping1 = Test-NetConnection -ComputerName "129.146.146.242" -Port 22 -WarningAction SilentlyContinue -ErrorAction SilentlyContinue
    if ($ping1.TcpTestSucceeded) {
        Write-Host "IP 129.146.146.242:22 - ACESSIVEL" -ForegroundColor Green
    } else {
        Write-Host "IP 129.146.146.242:22 - NAO ACESSIVEL" -ForegroundColor Red
    }
} catch {
    Write-Host "IP 129.146.146.242:22 - ERRO DE TESTE" -ForegroundColor Red
}

Write-Host "Testando IP correto..."
try {
    $ping2 = Test-NetConnection -ComputerName "194.164.72.183" -Port 22 -WarningAction SilentlyContinue -ErrorAction SilentlyContinue
    if ($ping2.TcpTestSucceeded) {
        Write-Host "IP 194.164.72.183:22 - ACESSIVEL" -ForegroundColor Green
    } else {
        Write-Host "IP 194.164.72.183:22 - NAO ACESSIVEL" -ForegroundColor Red
    }
} catch {
    Write-Host "IP 194.164.72.183:22 - ERRO DE TESTE" -ForegroundColor Red
}
Write-Host ""

# Instrucoes manuais
Write-Host "CORRECAO MANUAL NECESSARIA:" -ForegroundColor Red
Write-Host "O MCP Coolify nao possui funcao para atualizar servidores."
Write-Host "Voce deve fazer esta correcao manualmente:"
Write-Host ""

Write-Host "PASSOS PARA CORRECAO:" -ForegroundColor Cyan
Write-Host "1. Acesse: http://localhost:8000"
Write-Host "2. Va para: Settings -> Servers"
Write-Host "3. Clique em 'whosfy-production-server'"
Write-Host "4. Altere IP de '129.146.146.242' para '194.164.72.183'"
Write-Host "5. Clique em 'Validate' para testar conexao"
Write-Host "6. Clique em 'Save' para salvar"
Write-Host ""

Write-Host "APOS CORRIGIR O IP:" -ForegroundColor Yellow
Write-Host "1. Validar servidor no Coolify"
Write-Host "2. Fazer redeploy da aplicacao"
Write-Host "3. Verificar se status muda para 'running:healthy'"
Write-Host ""

Write-Host "Script de correcao de IP preparado!" -ForegroundColor Green
Write-Host "Execute as instrucoes manuais acima para corrigir o IP do servidor."
Write-Host ""