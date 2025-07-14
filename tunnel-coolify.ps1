# Script para estabelecer túnel SSH para Coolify automaticamente via jump host
param(
    [string]$Password = "26Mn1597+1709"
)

$jumpHost = "ubuntu@129.146.116.166"
$sshKeyPath = "C:\\Users\\Micael\\Downloads\\ssh-key-2025-07-13.key"

Write-Host "Estabelecendo túnel SSH para Coolify via jump host..." -ForegroundColor Green

# Cria processo SSH
$psi = New-Object System.Diagnostics.ProcessStartInfo
$psi.FileName = "ssh"
$psi.Arguments = "-i $sshKeyPath -J $jumpHost -v -o StrictHostKeyChecking=no -L 8000:localhost:80 -N root@194.164.72.183"
$psi.UseShellExecute = $false
$psi.RedirectStandardInput = $true
$psi.RedirectStandardOutput = $true
$psi.RedirectStandardError = $true
$psi.CreateNoWindow = $false

$process = New-Object System.Diagnostics.Process
$process.StartInfo = $psi

try {
    $process.Start()
    
    # Aguarda um pouco para o SSH solicitar a senha
    Start-Sleep -Seconds 5
    
    # Envia a senha
    $process.StandardInput.WriteLine($Password)
    $process.StandardInput.Flush()
    
    # Lê e exibe output e error
    $output = $process.StandardOutput.ReadToEndAsync()
    $errorOutput = $process.StandardError.ReadToEndAsync()
    
    Write-Host "Senha enviada." -ForegroundColor Green
    
    # Aguarda o processo
    $process.WaitForExit()
    
    # Exibe outputs
    Write-Host "Output: " + (Wait-Task $output)
    Write-Host "Error: " + (Wait-Task $errorOutput)
    
} catch {
    Write-Error "Erro ao estabelecer túnel: $($_.Exception.Message)"
} finally {
    if ($process -and !$process.HasExited) {
        $process.Kill()
    }
}

Write-Host "Túnel SSH estabelecido! Coolify disponível em: http://localhost:8000" -ForegroundColor Green
Write-Host "Pressione Ctrl+C para encerrar o túnel" -ForegroundColor Yellow