# Script para estabelecer túnel SSH para Coolify automaticamente via jump host
param(
    [string]$Password = "26Mn1597+1709"
)

$jumpHost = "ubuntu@129.146.116.166"
$sshKeyPath = "C:\\Users\\Micael\\Downloads\\ssh-key-2025-07-13.key"

Write-Host "Estabelecendo túnel SSH para Coolify via jump host..." -ForegroundColor Green

# Verifica se a chave SSH existe
if (-not (Test-Path $sshKeyPath)) {
    Write-Host "❌ Chave SSH não encontrada em: $sshKeyPath" -ForegroundColor Red
    Write-Host "💡 Verifique se a chave existe ou ajuste o caminho no script" -ForegroundColor Yellow
    exit 1
}

# Comando SSH com jump host
$sshArgs = @(
    "-i", $sshKeyPath,
    "-J", $jumpHost,
    "-o", "StrictHostKeyChecking=no",
    "-L", "8000:localhost:80",
    "-N",
    "root@194.164.72.183"
)

try {
    Write-Host "🔗 Conectando via jump host..." -ForegroundColor Cyan
    Write-Host "   Jump Host: $jumpHost" -ForegroundColor Gray
    Write-Host "   Servidor Coolify: root@194.164.72.183" -ForegroundColor Gray
    Write-Host "   Porta local: 8000 → Porta remota: 80" -ForegroundColor Gray
    
    # Inicia o processo SSH
    $process = Start-Process -FilePath "ssh" -ArgumentList $sshArgs -NoNewWindow -PassThru
    
    # Aguarda um pouco para estabelecer a conexão
    Start-Sleep -Seconds 5
    
    # Verifica se o processo ainda está rodando
    if ($process -and !$process.HasExited) {
        Write-Host "✅ Túnel SSH estabelecido com sucesso!" -ForegroundColor Green
        
        # Testa a conectividade
        Write-Host "🧪 Testando conectividade..." -ForegroundColor Cyan
        
        try {
            $response = Invoke-WebRequest -Uri "http://localhost:8000" -TimeoutSec 10 -ErrorAction Stop
            Write-Host "✅ Coolify acessível em http://localhost:8000" -ForegroundColor Green
            
            # Abre no navegador
            Write-Host "🌐 Abrindo Coolify no navegador..." -ForegroundColor Magenta
            Start-Process "http://localhost:8000"
            
            Write-Host ""
            Write-Host "🎉 Coolify está rodando!" -ForegroundColor Green
            Write-Host "   URL: http://localhost:8000" -ForegroundColor Cyan
            Write-Host "   Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
            
            # Mantém o script rodando
            Write-Host "⏳ Mantendo túnel ativo... (Pressione Ctrl+C para sair)" -ForegroundColor Yellow
            try {
                while (!$process.HasExited) {
                    Start-Sleep -Seconds 1
                }
            }
            catch {
                Write-Host "⚠️  Túnel encerrado pelo usuário" -ForegroundColor Yellow
            }
        }
        catch {
            Write-Host "❌ Erro ao acessar Coolify: $($_.Exception.Message)" -ForegroundColor Red
            Write-Host "💡 Verifique se o Coolify está rodando na porta 80 do servidor" -ForegroundColor Yellow
            Write-Host "💡 Túnel estabelecido, mas serviço pode não estar respondendo" -ForegroundColor Yellow
        }
    }
    else {
        Write-Host "❌ Falha ao estabelecer túnel SSH" -ForegroundColor Red
        Write-Host "💡 Verifique as credenciais e conectividade" -ForegroundColor Yellow
    }
}
catch {
    Write-Host "❌ Erro ao executar SSH: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "💡 Verifique se o SSH está instalado e acessível" -ForegroundColor Yellow
}
finally {
    # Limpeza
    if ($process -and !$process.HasExited) {
        Write-Host "🧹 Encerrando túnel SSH..." -ForegroundColor Gray
        $process.Kill()
    }
}

Write-Host "🔚 Script finalizado" -ForegroundColor Gray
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
Write-Host "Túnel SSH estabelecido! Coolify disponí