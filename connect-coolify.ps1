# Script para conectar ao Coolify via túnel SSH
# Autor: Assistente AI
# Data: $(Get-Date -Format 'yyyy-MM-dd')

Write-Host "🚀 Conectando ao Coolify..." -ForegroundColor Green

# Configurações
$COOLIFY_SERVER = "194.164.72.183"
$LOCAL_PORT = "8000"
$REMOTE_PORT = "80"
$USERNAME = "root"
$PASSWORD = "26Mn1597+1709"

# Função para verificar se a porta está em uso
function Test-Port {
    param([int]$Port)
    try {
        $listener = [System.Net.Sockets.TcpListener]::new([System.Net.IPAddress]::Any, $Port)
        $listener.Start()
        $listener.Stop()
        return $false
    }
    catch {
        return $true
    }
}

# Verificar se a porta local está disponível
if (Test-Port -Port $LOCAL_PORT) {
    Write-Host "⚠️  Porta $LOCAL_PORT já está em uso. Tentando encerrar processos..." -ForegroundColor Yellow
    
    # Tentar encerrar processos na porta
    $processes = netstat -ano | findstr ":$LOCAL_PORT"
    if ($processes) {
        $processes | ForEach-Object {
            $pid = ($_ -split '\s+')[-1]
            if ($pid -match '^\d+$') {
                try {
                    Stop-Process -Id $pid -Force -ErrorAction SilentlyContinue
                    Write-Host "✅ Processo $pid encerrado" -ForegroundColor Green
                }
                catch {
                    Write-Host "❌ Não foi possível encerrar processo $pid" -ForegroundColor Red
                }
            }
        }
    }
    
    Start-Sleep -Seconds 2
}

# Criar arquivo temporário com a senha
$tempFile = [System.IO.Path]::GetTempFileName()
Set-Content -Path $tempFile -Value $PASSWORD

Write-Host "🔗 Estabelecendo túnel SSH..." -ForegroundColor Cyan
Write-Host "   Servidor: $COOLIFY_SERVER" -ForegroundColor Gray
Write-Host "   Porta local: $LOCAL_PORT" -ForegroundColor Gray
Write-Host "   Porta remota: $REMOTE_PORT" -ForegroundColor Gray

# Comando SSH com túnel
$sshCommand = "ssh"
$sshArgs = @(
    "-L", "${LOCAL_PORT}:localhost:${REMOTE_PORT}",
    "-N",
    "-o", "StrictHostKeyChecking=no",
    "-o", "UserKnownHostsFile=/dev/null",
    "-o", "LogLevel=ERROR",
    "${USERNAME}@${COOLIFY_SERVER}"
)

# Iniciar túnel SSH em background
try {
    Write-Host "🔐 Conectando com senha..." -ForegroundColor Yellow
    
    # Usar expect-like functionality com PowerShell
    $psi = New-Object System.Diagnostics.ProcessStartInfo
    $psi.FileName = "ssh"
    $psi.Arguments = "-L ${LOCAL_PORT}:localhost:${REMOTE_PORT} -N -o StrictHostKeyChecking=no ${USERNAME}@${COOLIFY_SERVER}"
    $psi.UseShellExecute = $false
    $psi.RedirectStandardInput = $true
    $psi.RedirectStandardOutput = $true
    $psi.RedirectStandardError = $true
    $psi.CreateNoWindow = $true
    
    $process = [System.Diagnostics.Process]::Start($psi)
    
    # Aguardar prompt de senha e enviar
    Start-Sleep -Seconds 2
    $process.StandardInput.WriteLine($PASSWORD)
    $process.StandardInput.Flush()
    
    # Aguardar estabelecimento da conexão
    Start-Sleep -Seconds 3
    
    if (!$process.HasExited) {
        Write-Host "✅ Túnel SSH estabelecido com sucesso!" -ForegroundColor Green
        
        # Testar conectividade local
        Write-Host "🧪 Testando conectividade..." -ForegroundColor Cyan
        
        try {
            $response = Invoke-WebRequest -Uri "http://localhost:$LOCAL_PORT" -TimeoutSec 10 -ErrorAction Stop
            Write-Host "✅ Coolify acessível em http://localhost:$LOCAL_PORT" -ForegroundColor Green
            
            # Abrir no navegador
            Write-Host "🌐 Abrindo Coolify no navegador..." -ForegroundColor Magenta
            Start-Process "http://localhost:$LOCAL_PORT"
            
            Write-Host ""
            Write-Host "🎉 Coolify está rodando!" -ForegroundColor Green
            Write-Host "   URL: http://localhost:$LOCAL_PORT" -ForegroundColor Cyan
            Write-Host "   Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow
            
            # Manter o script rodando
            try {
                $process.WaitForExit()
            }
            catch {
                Write-Host "⚠️  Túnel encerrado" -ForegroundColor Yellow
            }
        }
        catch {
            Write-Host "❌ Erro ao acessar Coolify: $($_.Exception.Message)" -ForegroundColor Red
            Write-Host "💡 Verifique se o Coolify está rodando na porta $REMOTE_PORT do servidor" -ForegroundColor Yellow
        }
    }
    else {
        Write-Host "❌ Falha ao estabelecer túnel SSH" -ForegroundColor Red
        Write-Host "💡 Verifique as credenciais e conectividade" -ForegroundColor Yellow
    }
}
catch {
    Write-Host "❌ Erro ao executar SSH: $($_.Exception.Message)" -ForegroundColor Red
}
finally {
    # Limpeza
    if (Test-Path $tempFile) {
        Remove-Item $tempFile -Force
    }
    
    if ($process -and !$process.HasExited) {
        $process.Kill()
    }
}

Write-Host "🔚 Script finalizado" -ForegroundColor Gray