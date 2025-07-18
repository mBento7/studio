# Script para conectar ao Coolify e Supabase via SSH

# Configurações
$vpsIp = "129.146.146.242"
$sshKeyPath = "C:\Users\Micael\.ssh\oracle_new"
$coolifyPort = 8000
$supabasePort = 54321
$supabaseStudioPort = 54323

# Função para verificar se a chave SSH existe
function Test-SSHKey {
    if (-not (Test-Path $sshKeyPath)) {
        Write-Host "ERRO: A chave SSH não foi encontrada em: $sshKeyPath" -ForegroundColor Red
        Write-Host "Por favor, verifique o caminho da chave ou crie uma nova chave SSH." -ForegroundColor Yellow
        return $false
    }
    return $true
}

# Função para estabelecer o túnel SSH apenas para Coolify
function Start-CoolifySSHTunnel {
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

# Função para estabelecer o túnel SSH para Coolify e Supabase
function Start-FullSSHTunnel {
    Write-Host "\nEstabelecendo túnel SSH para Coolify (porta $coolifyPort) e Supabase (portas $supabasePort, $supabaseStudioPort)..." -ForegroundColor Cyan
    Write-Host "Comando: ssh -i `"$sshKeyPath`" -L ${coolifyPort}:localhost:${coolifyPort} -L ${supabasePort}:localhost:${supabasePort} -L ${supabaseStudioPort}:localhost:${supabaseStudioPort} ubuntu@${vpsIp}" -ForegroundColor Gray
    
    Write-Host "\n=============================================" -ForegroundColor Yellow
    Write-Host "INSTRUÇÕES APÓS CONECTAR:" -ForegroundColor Yellow
    Write-Host "=============================================" -ForegroundColor Yellow
    Write-Host "1. Acesse o Coolify em: http://localhost:$coolifyPort" -ForegroundColor White
    Write-Host "2. Acesse o Supabase em: http://localhost:$supabaseStudioPort" -ForegroundColor White
    Write-Host "3. Vá para Applications → whosfy no Coolify" -ForegroundColor White
    Write-Host "4. Aplique as seguintes correções:" -ForegroundColor White
    Write-Host "   a. Adicione as variáveis de ambiente (veja INSTRUCOES-ATUALIZACAO-COOLIFY.md)" -ForegroundColor White
    Write-Host "   b. Habilite o Health Check em /api/health (porta 3000)" -ForegroundColor White
    Write-Host "   c. Atualize o FQDN para https://whosfy.com" -ForegroundColor White
    Write-Host "   d. Faça o redeploy da aplicação" -ForegroundColor White
    Write-Host "5. Verifique se o status mudou para running:healthy" -ForegroundColor White
    Write-Host "=============================================" -ForegroundColor Yellow
    Write-Host "Para sair do SSH: pressione Ctrl+C" -ForegroundColor Gray
    Write-Host "=============================================\n" -ForegroundColor Yellow
    
    # Inicia o túnel SSH
    ssh -i "$sshKeyPath" -L ${coolifyPort}:localhost:${coolifyPort} -L ${supabasePort}:localhost:${supabasePort} -L ${supabaseStudioPort}:localhost:${supabaseStudioPort} ubuntu@${vpsIp}
}

# Função principal
function Main {
    Clear-Host
    Write-Host "=================================================" -ForegroundColor Green
    Write-Host "FERRAMENTA DE CONEXÃO AO COOLIFY E SUPABASE - WHOSFY" -ForegroundColor Green
    Write-Host "=================================================" -ForegroundColor Green
    
    Write-Host "\nVerificando chave SSH..." -ForegroundColor Cyan
    if (Test-SSHKey) {
        Write-Host "Chave SSH encontrada!" -ForegroundColor Green
        
        $option = Read-Host "\nEscolha uma opção:\n1 - Conectar apenas ao Coolify\n2 - Conectar ao Coolify e Supabase\nOpção"
        
        switch ($option) {
            "1" { Start-CoolifySSHTunnel }
            "2" { Start-FullSSHTunnel }
            default { 
                Write-Host "Opção inválida. Conectando apenas ao Coolify..." -ForegroundColor Yellow
                Start-CoolifySSHTunnel 
            }
        }
    }
}

# Executa o script
Main