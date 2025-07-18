# Script para estabelecer tunel SSH com Coolify
# Configurações
$SSH_KEY = "C:\Users\Micael\.ssh\oracle_new"
$VPS_IP = "129.146.146.242"
$VPS_USER = "ubuntu"
$LOCAL_PORT = 8000
$REMOTE_PORT = 8000

Write-Host "🔗 Criando túnel SSH para Coolify..." -ForegroundColor Cyan
Write-Host "VPS Oracle: $VPS_USER@$VPS_IP" -ForegroundColor Yellow
Write-Host "Túnel: localhost:$LOCAL_PORT -> $VPS_IP:$REMOTE_PORT" -ForegroundColor Yellow
Write-Host "Acesse: http://localhost:$LOCAL_PORT" -ForegroundColor Green

# Verificar se a chave SSH existe
if (!(Test-Path $SSH_KEY)) {
    Write-Host "Chave SSH nao encontrada: $SSH_KEY" -ForegroundColor Red
    Write-Host "Verifique o caminho da chave SSH" -ForegroundColor Yellow
    exit 1
}

try {
    Write-Host "Conectando ao servidor..." -ForegroundColor Yellow
    
    # Comando SSH
    $sshCommand = "ssh -i `"$SSH_KEY`" -L $LOCAL_PORT`:localhost:$REMOTE_PORT -N $VPS_USER@$VPS_IP"
    
    Write-Host "Comando: $sshCommand" -ForegroundColor Gray
    
    # Executar tunel SSH
    Start-Process -FilePath "ssh" -ArgumentList "-L", "${LOCAL_PORT}:localhost:${REMOTE_PORT}", "-i", "$SSH_KEY", "-o", "StrictHostKeyChecking=no", "root@$SERVER_IP" -NoNewWindow
    
    Start-Sleep -Seconds 3
    
    # Verificar se o tunel esta funcionando
    try {
        $response = Invoke-WebRequest -Uri "http://localhost:$LOCAL_PORT" -TimeoutSec 5 -ErrorAction Stop
        Write-Host "Tunel SSH estabelecido com sucesso!" -ForegroundColor Green
        Write-Host "Coolify disponivel em: http://localhost:$LOCAL_PORT" -ForegroundColor Green
        
        # Abrir Coolify no navegador
        Start-Process "http://localhost:$LOCAL_PORT"
        
        Write-Host "Instrucoes:" -ForegroundColor Cyan
        Write-Host "  1. O Coolify esta agora acessivel no navegador" -ForegroundColor White
        Write-Host "  2. Configure o servico Next.js conforme necessario" -ForegroundColor White
        Write-Host "  3. Pressione Ctrl+C para encerrar o tunel" -ForegroundColor White
        
    } catch {
        Write-Host "Tunel iniciado, mas Coolify pode ainda estar carregando..." -ForegroundColor Yellow
        Write-Host "Tente acessar: http://localhost:$LOCAL_PORT" -ForegroundColor Yellow
        Start-Process "http://localhost:$LOCAL_PORT"
    }
    
} catch {
    Write-Host "Erro ao estabelecer tunel SSH: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "Verifique se o SSH esta instalado e a chave esta correta" -ForegroundColor Yellow
}

Write-Host "Tunel SSH ativo. Pressione Ctrl+C para encerrar." -ForegroundColor Gray

# Manter o script rodando
try {
    while ($true) {
        Start-Sleep -Seconds 10
        # Verificar se o tunel ainda esta ativo
        try {
            $null = Invoke-WebRequest -Uri "http://localhost:$LOCAL_PORT" -TimeoutSec 2 -ErrorAction Stop
        } catch {
            Write-Host "Tunel pode ter sido desconectado" -ForegroundColor Yellow
        }
    }
} catch {
    Write-Host "Encerrando tunel SSH..." -ForegroundColor Gray
}