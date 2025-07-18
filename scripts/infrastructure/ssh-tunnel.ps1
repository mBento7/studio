# Script para estabelecer túnel SSH para Coolify
$password = "26Mn1597+1709"
$server = "194.164.72.183"
$localPort = "8000"
$remotePort = "80"

# Criar arquivo temporário com senha
$tempFile = [System.IO.Path]::GetTempFileName()
Set-Content -Path $tempFile -Value $password

# Executar SSH com túnel
try {
    Write-Host "Estabelecendo túnel SSH para Coolify..."
    Write-Host "Túnel: localhost:$localPort -> $server port $remotePort"
    
    # Usar ssh com redirecionamento de entrada
    $process = Start-Process -FilePath "ssh" -ArgumentList "-L", "${localPort}:localhost:${remotePort}", "-o", "StrictHostKeyChecking=no", "root@$server" -RedirectStandardInput $tempFile -NoNewWindow -PassThru
    
    Write-Host "Túnel SSH estabelecido. PID: $($process.Id)"
    Write-Host "Acesse o Coolify em: http://localhost:$localPort"
    Write-Host "Pressione Ctrl+C para encerrar o túnel"
    
    # Aguardar o processo
    $process.WaitForExit()
}
finally {
    # Limpar arquivo temporário
    if (Test-Path $tempFile) {
        Remove-Item $tempFile -Force
    }
}