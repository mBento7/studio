# Script para desinstalar Coolify da VPS
param(
    [string]$VPSHost = "194.164.72.183",
    [string]$Username = "root",
    [string]$Password = "26Mn1597+1709"
)

Write-Host "🗑️ Iniciando desinstalação do Coolify..." -ForegroundColor Red
Write-Host "⚠️ ATENÇÃO: Este processo removerá TODOS os dados do Coolify!" -ForegroundColor Yellow

# Confirmar desinstalação
$confirm = Read-Host "Tem certeza que deseja continuar? (digite 'SIM' para confirmar)"
if ($confirm -ne "SIM") {
    Write-Host "❌ Desinstalação cancelada" -ForegroundColor Yellow
    exit
}

# Comandos de desinstalação
$commands = @(
    "# 1. Parar e remover containers",
    "sudo docker stop -t 0 coolify coolify-realtime coolify-db coolify-redis coolify-proxy",
    "sudo docker rm coolify coolify-realtime coolify-db coolify-redis coolify-proxy",
    "",
    "# 2. Remover volumes Docker",
    "sudo docker volume rm coolify-db coolify-redis",
    "",
    "# 3. Remover rede Docker",
    "sudo docker network rm coolify",
    "",
    "# 4. Remover diretório de dados",
    "sudo rm -rf /data/coolify",
    "",
    "# 5. Remover imagens Docker",
    "sudo docker rmi ghcr.io/coollabsio/coolify:latest",
    "sudo docker rmi ghcr.io/coollabsio/coolify-helper:latest",
    "sudo docker rmi quay.io/soketi/soketi:1.6-16-alpine",
    "sudo docker rmi postgres:15-alpine",
    "sudo docker rmi redis:alpine",
    "sudo docker rmi traefik:v3.1",
    "",
    "# 6. Limpeza adicional",
    "sudo docker system prune -f",
    "sudo docker volume prune -f"
)

# Executar comandos via SSH
foreach ($cmd in $commands) {
    if ($cmd.StartsWith("#") -or $cmd -eq "") {
        Write-Host $cmd -ForegroundColor Cyan
        continue
    }
    
    Write-Host "Executando: $cmd" -ForegroundColor Yellow
    
    # Usar plink para executar comando SSH
    $sshCmd = "echo y | plink -ssh $Username@$VPSHost -pw $Password `"$cmd`""
    Invoke-Expression $sshCmd
    
    Start-Sleep -Seconds 2
}

Write-Host "✅ Desinstalação do Coolify concluída!" -ForegroundColor Green
Write-Host "🧹 Todos os containers, volumes, redes e dados foram removidos" -ForegroundColor Green