# Script para aplicar correções automaticamente na aplicação Whosfy

# Configurações
$vpsIp = "129.146.146.242"
$sshKeyPath = "C:\Users\Micael\.ssh\oracle_new"
$coolifyPort = 8000
$supabasePort = 54321

# Função para estabelecer o túnel SSH
function Start-SSHTunnel {
    Write-Host "\nEstabelecendo túnel SSH para Coolify (porta $coolifyPort)..." -ForegroundColor Cyan
    Write-Host "Comando: ssh -i `"$sshKeyPath`" -L ${coolifyPort}:localhost:${coolifyPort} ubuntu@${vpsIp}" -ForegroundColor Gray
    
    # Inicia o túnel SSH usando o comando fornecido pelo usuário
    ssh -i "$sshKeyPath" -L ${coolifyPort}:localhost:${coolifyPort} ubuntu@${vpsIp}
}

# Função principal
function Main {
    Clear-Host
    Write-Host "=================================================" -ForegroundColor Green
    Write-Host "APLICAÇÃO AUTOMÁTICA DE CORREÇÕES - WHOSFY" -ForegroundColor Green
    Write-Host "=================================================" -ForegroundColor Green
    
    Write-Host "\nEste script irá ajudá-lo a aplicar as correções necessárias na aplicação Whosfy." -ForegroundColor Cyan
    Write-Host "Será estabelecido um túnel SSH para o servidor Coolify." -ForegroundColor Cyan
    Write-Host "Após a conexão, você precisará acessar o Coolify manualmente em http://localhost:8000" -ForegroundColor Cyan
    Write-Host "e aplicar as correções conforme o checklist." -ForegroundColor Cyan
    
    $confirm = Read-Host "\nDeseja continuar? (S/N)"
    
    if ($confirm -eq "S" -or $confirm -eq "s") {
        Write-Host "\n=============================================" -ForegroundColor Yellow
        Write-Host "CHECKLIST DE CORREÇÕES:" -ForegroundColor Yellow
        Write-Host "=============================================" -ForegroundColor Yellow
        Write-Host "1. Adicionar Variáveis de Ambiente:" -ForegroundColor White
        Write-Host "   - Supabase Configuration (2 variáveis)" -ForegroundColor White
        Write-Host "   - Expo/Mobile Configuration (2 variáveis)" -ForegroundColor White
        Write-Host "   - Database Configuration (2 variáveis)" -ForegroundColor White
        Write-Host "   - NextAuth Configuration (2 variáveis)" -ForegroundColor White
        Write-Host "   - Application Configuration (3 variáveis)" -ForegroundColor White
        Write-Host "2. Habilitar Health Check:" -ForegroundColor White
        Write-Host "   - Path: /api/health" -ForegroundColor White
        Write-Host "   - Port: 3000" -ForegroundColor White
        Write-Host "   - Method: GET" -ForegroundColor White
        Write-Host "   - Status Code: 200" -ForegroundColor White
        Write-Host "3. Atualizar FQDN:" -ForegroundColor White
        Write-Host "   - Mudar para: https://whosfy.com" -ForegroundColor White
        Write-Host "   - Habilitar SSL automático" -ForegroundColor White
        Write-Host "4. Fazer Redeploy da aplicação" -ForegroundColor White
        Write-Host "5. Verificar se o status mudou para running:healthy" -ForegroundColor White
        Write-Host "=============================================" -ForegroundColor Yellow
        
        # Inicia o túnel SSH
        Start-SSHTunnel
    }
    else {
        Write-Host "Operação cancelada pelo usuário." -ForegroundColor Yellow
    }
}

# Executa o script
Main