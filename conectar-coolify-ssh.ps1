# Script para conectar ao Coolify via SSH e aplicar correções

# Configurações
$vpsIp = "129.146.146.242"
$sshKeyPath = "C:\Users\Micael\.ssh\oracle_new"
$coolifyPort = 8000
$supabasePort = 54321

# Função para verificar se a chave SSH existe
function Test-SSHKey {
    if (-not (Test-Path $sshKeyPath)) {
        Write-Host "ERRO: A chave SSH não foi encontrada em: $sshKeyPath" -ForegroundColor Red
        Write-Host "Por favor, verifique o caminho da chave ou crie uma nova chave SSH." -ForegroundColor Yellow
        return $false
    }
    return $true
}

# Função para estabelecer o túnel SSH
function Start-SSHTunnel {
    Write-Host "\nEstabelecendo túnel SSH para Coolify (porta $coolifyPort)..." -ForegroundColor Cyan
    Write-Host "Comando: ssh -i `"$sshKeyPath`" -L ${coolifyPort}:localhost:${coolifyPort} ubuntu@${vpsIp}" -ForegroundColor Gray
    
    Write-Host "\n=============================================" -ForegroundColor Yellow
    Write-Host "INSTRUÇÕES APÓS CONECTAR:" -ForegroundColor Yellow
    Write-Host "=============================================" -ForegroundColor Yellow
    Write-Host "1. Acesse o Coolify em: http://localhost:$coolifyPort" -ForegroundColor White
    Write-Host "2. Vá para Applications → whosfy" -ForegroundColor White
    Write-Host "3. Aplique as seguintes correções:" -ForegroundColor White
    Write-Host "   a. Adicione as variáveis de ambiente (veja INSTRUCOES-ATUALIZACAO-COOLIFY.md)" -ForegroundColor White
    Write-Host "   b. Habilite o Health Check em /api/health (porta 3000)" -ForegroundColor White
    Write-Host "   c. Atualize o FQDN para https://whosfy.com" -ForegroundColor White
    Write-Host "   d. Faça o redeploy da aplicação" -ForegroundColor White
    Write-Host "4. Verifique se o status mudou para running:healthy" -ForegroundColor White
    Write-Host "=============================================" -ForegroundColor Yellow
    Write-Host "Para sair do SSH: pressione Ctrl+C" -ForegroundColor Gray
    Write-Host "=============================================\n" -ForegroundColor Yellow
    
    # Inicia o túnel SSH
    ssh -i "$sshKeyPath" -L ${coolifyPort}:localhost:${coolifyPort} ubuntu@${vpsIp}
}

# Função principal
function Main {
    Clear-Host
    Write-Host "=================================================" -ForegroundColor Green
    Write-Host "FERRAMENTA DE CONEXÃO AO COOLIFY - WHOSFY" -ForegroundColor Green
    Write-Host "=================================================" -ForegroundColor Green
    
    Write-Host "\nVerificando chave SSH..." -ForegroundColor Cyan
    if (Test-SSHKey) {
        Write-Host "Chave SSH encontrada!" -ForegroundColor Green
        Start-SSHTunnel
    }
}

# Executa o script
Main