# Script PowerShell para instalar Supabase na VPS Oracle
# VPS: 129.146.146.242
# Usuário: ubuntu
# Chave SSH: C:\Users\Micael\.ssh\oracle_new

Param(
    [switch]$InstallOnly,
    [switch]$StartTunnel,
    [switch]$CheckStatus
)

$VPS_IP = "129.146.146.242"
$SSH_KEY = "C:\Users\Micael\.ssh\oracle_new"
$SSH_USER = "ubuntu"

function Write-ColorOutput($ForegroundColor) {
    $fc = $host.UI.RawUI.ForegroundColor
    $host.UI.RawUI.ForegroundColor = $ForegroundColor
    if ($args) {
        Write-Output $args
    } else {
        $input | Write-Output
    }
    $host.UI.RawUI.ForegroundColor = $fc
}

function Show-Header {
    Write-ColorOutput Green "🚀 INSTALAÇÃO SUPABASE - VPS ORACLE"
    Write-ColorOutput Yellow "📍 VPS: $VPS_IP"
    Write-ColorOutput Yellow "👤 Usuário: $SSH_USER"
    Write-ColorOutput Yellow "🔑 Chave SSH: $SSH_KEY"
    Write-Output ""
}

function Test-SSHConnection {
    Write-ColorOutput Cyan "🔍 Testando conexão SSH..."
    
    try {
        $result = ssh -i "$SSH_KEY" -o ConnectTimeout=10 -o BatchMode=yes $SSH_USER@$VPS_IP 'echo conexao_ok' 2>$null
        if ($result -eq "conexao_ok") {
            Write-ColorOutput Green "✅ Conexão SSH estabelecida com sucesso!"
            return $true
        } else {
            Write-ColorOutput Red "❌ Falha na conexão SSH"
            return $false
        }
    } catch {
        Write-ColorOutput Red "❌ Erro na conexão SSH: $($_.Exception.Message)"
        return $false
    }
}

function Install-Supabase {
    Write-ColorOutput Cyan "📦 Instalando Supabase CLI na VPS..."
    
    Write-ColorOutput Yellow "📤 Executando comandos de instalação na VPS..."
    
    try {
        # Verificar Node.js
        Write-ColorOutput Yellow "📦 Verificando Node.js..."
        $nodeCheck = "ssh -i '$SSH_KEY' $SSH_USER@$VPS_IP 'command -v node'"
        $nodeResult = Invoke-Expression $nodeCheck 2>$null
        
        if (-not $nodeResult) {
            Write-ColorOutput Yellow "❌ Node.js não encontrado. Instalando..."
            $installNode1 = "ssh -i '$SSH_KEY' $SSH_USER@$VPS_IP 'curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -'"
            Invoke-Expression $installNode1
            $installNode2 = "ssh -i '$SSH_KEY' $SSH_USER@$VPS_IP 'sudo apt-get install -y nodejs'"
            Invoke-Expression $installNode2
        } else {
            Write-ColorOutput Green "✅ Node.js já instalado"
        }
        
        # Verificar npm
        Write-ColorOutput Yellow "📦 Verificando npm..."
        $npmCheck = "ssh -i '$SSH_KEY' $SSH_USER@$VPS_IP 'command -v npm'"
        $npmResult = Invoke-Expression $npmCheck 2>$null
        
        if (-not $npmResult) {
            Write-ColorOutput Yellow "❌ npm não encontrado. Instalando..."
            $installNpm = "ssh -i '$SSH_KEY' $SSH_USER@$VPS_IP 'sudo apt-get install -y npm'"
            Invoke-Expression $installNpm
        } else {
            Write-ColorOutput Green "✅ npm já instalado"
        }
        
        # Instalar Supabase CLI
        Write-ColorOutput Yellow "📦 Instalando Supabase CLI..."
        $installSupabase = "ssh -i '$SSH_KEY' $SSH_USER@$VPS_IP 'npm install -g supabase'"
        Invoke-Expression $installSupabase
        
        # Criar diretório
        Write-ColorOutput Yellow "📁 Criando diretório do projeto..."
        $createDir = "ssh -i '$SSH_KEY' $SSH_USER@$VPS_IP 'mkdir -p /home/ubuntu/whosfy'"
        Invoke-Expression $createDir
        
        # Inicializar projeto Supabase
        Write-ColorOutput Yellow "🔧 Inicializando projeto Supabase..."
        $cdDir = "ssh -i '$SSH_KEY' $SSH_USER@$VPS_IP 'cd /home/ubuntu/whosfy'"
        Invoke-Expression $cdDir
        $checkConfig = "ssh -i '$SSH_KEY' $SSH_USER@$VPS_IP 'test -f /home/ubuntu/whosfy/supabase/config.toml'"
        $configExists = Invoke-Expression $checkConfig 2>$null
        
        if (-not $configExists) {
            $initProject = "ssh -i '$SSH_KEY' $SSH_USER@$VPS_IP 'cd /home/ubuntu/whosfy; supabase init'"
            Invoke-Expression $initProject
        }
        
        # Verificar Docker
        Write-ColorOutput Yellow "🐳 Verificando Docker..."
        $dockerCheck = "ssh -i '$SSH_KEY' $SSH_USER@$VPS_IP 'command -v docker'"
        $dockerResult = Invoke-Expression $dockerCheck 2>$null
        
        if (-not $dockerResult) {
            Write-ColorOutput Red "❌ Docker não encontrado. Por favor, instale o Docker primeiro."
            return
        } else {
            Write-ColorOutput Green "✅ Docker encontrado"
        }
        
        # Iniciar Supabase
        Write-ColorOutput Yellow "🚀 Iniciando Supabase local..."
        $startSupabase = "ssh -i '$SSH_KEY' $SSH_USER@$VPS_IP 'cd /home/ubuntu/whosfy; supabase start'"
        Invoke-Expression $startSupabase
        
        Write-ColorOutput Green "✅ Supabase instalado e iniciado com sucesso!"
    } catch {
        Write-ColorOutput Red "❌ Erro durante a instalação: $($_.Exception.Message)"
    }
}

function Start-SupabaseTunnel {
    Write-ColorOutput Cyan "🔗 Iniciando túnel SSH para Supabase Studio..."
    Write-ColorOutput Yellow "📋 Portas:"
    Write-ColorOutput Yellow "   - Studio: http://localhost:54323"
    Write-ColorOutput Yellow "   - API: http://localhost:54321"
    Write-ColorOutput Yellow "   - DB: localhost:54322"
    Write-Output ""
    Write-ColorOutput Green "🌐 Pressione Ctrl+C para parar o túnel"
    
    $tunnelCommand = "ssh -i '$SSH_KEY' -L 54323:127.0.0.1:54323 -L 54321:127.0.0.1:54321 -L 54322:127.0.0.1:54322 -N $SSH_USER@$VPS_IP"
    Invoke-Expression $tunnelCommand
}

function Check-SupabaseStatus {
    Write-ColorOutput Cyan "🔍 Verificando status do Supabase..."
    
    $statusCommand = "ssh -i '$SSH_KEY' $SSH_USER@$VPS_IP 'cd /home/ubuntu/whosfy; supabase status'"
    Invoke-Expression $statusCommand
}

# Main execution
Show-Header

if (-not (Test-SSHConnection)) {
    Write-ColorOutput Red "❌ Não foi possível conectar à VPS. Verifique:"
    Write-ColorOutput Yellow "   1. Se a chave SSH está no local correto: $SSH_KEY"
    Write-ColorOutput Yellow "   2. Se a VPS está acessível: $VPS_IP"
    Write-ColorOutput Yellow "   3. Se as permissões da chave SSH estão corretas"
    exit 1
}

if ($CheckStatus) {
    Check-SupabaseStatus
} elseif ($StartTunnel) {
    Start-SupabaseTunnel
} elseif ($InstallOnly) {
    Install-Supabase
} else {
    # Instalação completa
    Install-Supabase
    
    Write-Output ""
    Write-ColorOutput Green "🎉 Instalação concluída!"
    Write-Output ""
    Write-ColorOutput Cyan "📋 Próximos passos:"
    Write-ColorOutput Yellow "1. Para iniciar o túnel SSH:"
    Write-ColorOutput White "   .\\scripts\\install-supabase-vps.ps1 -StartTunnel"
    Write-Output ""
    Write-ColorOutput Yellow "2. Para verificar status:"
    Write-ColorOutput White "   .\\scripts\\install-supabase-vps.ps1 -CheckStatus"
    Write-Output ""
    Write-ColorOutput Yellow "3. Acessar Supabase Studio:"
    Write-ColorOutput White "   http://localhost:54323"
    Write-Output ""
}