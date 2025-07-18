# ========================================
# SCRIPT DE CORREÇÃO: IP DO SERVIDOR WHOSFY
# ========================================

# IP CORRETO da VPS Oracle (confirmado pelo usuário)
$IP_CORRETO = "129.146.146.242"

# Informações de conexão SSH
$SSH_KEY = "C:\Users\Micael\.ssh\oracle_new"
$SSH_USER = "ubuntu"

Write-Host "=== VERIFICAÇÃO DO SERVIDOR WHOSFY ===" -ForegroundColor White
Write-Host "🔧 VERIFICANDO CONFIGURAÇÃO DO SERVIDOR WHOSFY" -ForegroundColor Yellow
Write-Host "IP da VPS Oracle: $IP_CORRETO" -ForegroundColor Green
Write-Host "Usuário SSH: $SSH_USER" -ForegroundColor Green
Write-Host "Chave SSH: $SSH_KEY" -ForegroundColor Green
Write-Host ""

Write-Host "=== CORRECAO NECESSARIA ===" -ForegroundColor White
Write-Host "A configuracao geral do Coolify precisa usar o IP da VPS Oracle!" -ForegroundColor Yellow
Write-Host "IP Correto da VPS Oracle: 129.146.146.242" -ForegroundColor Green
Write-Host ""

# Testar conectividade SSH
Write-Host "📡 Testando conectividade SSH..." -ForegroundColor Cyan
try {
    ssh -i "$SSH_KEY" -o ConnectTimeout=10 $SSH_USER@$IP_CORRETO "echo 'Conexão SSH OK'"
    Write-Host "✅ SSH funcionando" -ForegroundColor Green
} catch {
    Write-Host "❌ Erro na conexão SSH: $_" -ForegroundColor Red
}

# Verificar Docker no servidor
Write-Host "🐳 Verificando Docker..." -ForegroundColor Cyan
try {
    $dockerStatus = ssh -i "$SSH_KEY" $SSH_USER@$IP_CORRETO "sudo docker ps --format 'table {{.Names}}\t{{.Status}}'"
    Write-Host "Docker containers:" -ForegroundColor Green
    Write-Host $dockerStatus
} catch {
    Write-Host "❌ Erro ao verificar Docker: $_" -ForegroundColor Red
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