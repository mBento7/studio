# Script PowerShell para Deploy do Docker na VPS
# Executa a instalação do Docker remotamente via SSH

param(
    [Parameter(Mandatory=$false)]
    [string]$VPSHost = "129.146.116.166",
    
    [Parameter(Mandatory=$false)]
    [string]$Username = "ubuntu",
    
    [Parameter(Mandatory=$false)]
    [string]$KeyPath = ""
)

# Cores para output
$Red = "`e[31m"
$Green = "`e[32m"
$Yellow = "`e[33m"
$Blue = "`e[34m"
$Reset = "`e[0m"

function Write-Log {
    param([string]$Message, [string]$Color = $Green)
    Write-Host "${Color}[$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')] $Message${Reset}"
}

function Write-Error-Log {
    param([string]$Message)
    Write-Host "${Red}[$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')] ERROR: $Message${Reset}"
}

function Write-Warning-Log {
    param([string]$Message)
    Write-Host "${Yellow}[$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')] WARNING: $Message${Reset}"
}

function Write-Info-Log {
    param([string]$Message)
    Write-Host "${Blue}[$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')] INFO: $Message${Reset}"
}

Write-Log "Iniciando deploy do Docker na VPS $VPSHost..."

# Verificar se o SSH está disponível
try {
    $sshTest = ssh -o ConnectTimeout=5 -o StrictHostKeyChecking=no $Username@$VPSHost "echo 'SSH OK'"
    if ($LASTEXITCODE -ne 0) {
        throw "Falha na conexão SSH"
    }
    Write-Log "Conexão SSH estabelecida com sucesso"
} catch {
    Write-Error-Log "Não foi possível conectar à VPS via SSH"
    Write-Info-Log "Verifique se:"
    Write-Info-Log "1. A VPS está online e acessível"
    Write-Info-Log "2. As credenciais SSH estão corretas"
    Write-Info-Log "3. A porta SSH (22) está aberta"
    exit 1
}

# Script de instalação do Docker
$dockerInstallScript = @'
#!/bin/bash
set -e

echo "[INFO] Iniciando instalação do Docker..."

# Atualizar sistema
echo "[INFO] Atualizando sistema..."
sudo apt update && sudo apt upgrade -y

# Instalar dependências
echo "[INFO] Instalando dependências..."
sudo apt install -y apt-transport-https ca-certificates curl gnupg lsb-release

# Remover versões antigas
echo "[INFO] Removendo versões antigas do Docker..."
sudo apt remove -y docker docker-engine docker.io containerd runc 2>/dev/null || true

# Adicionar chave GPG
echo "[INFO] Adicionando chave GPG do Docker..."
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# Adicionar repositório
echo "[INFO] Adicionando repositório do Docker..."
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Atualizar e instalar Docker
echo "[INFO] Instalando Docker Engine..."
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# Iniciar Docker
echo "[INFO] Iniciando Docker..."
sudo systemctl start docker
sudo systemctl enable docker

# Adicionar usuário ao grupo docker
echo "[INFO] Adicionando usuário ao grupo docker..."
sudo usermod -aG docker $USER

# Configurar Docker daemon
echo "[INFO] Configurando Docker daemon..."
sudo mkdir -p /etc/docker
sudo tee /etc/docker/daemon.json > /dev/null << EOF
{
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "10m",
    "max-file": "3"
  },
  "live-restore": true
}
EOF

sudo systemctl restart docker

# Configurar firewall
echo "[INFO] Configurando firewall..."
sudo ufw allow ssh
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw --force enable

# Verificar instalação
echo "[INFO] Verificando instalação..."
docker --version
docker compose version
sudo systemctl status docker --no-pager

# Teste básico
echo "[INFO] Executando teste básico..."
sudo docker run --rm hello-world

echo "[SUCCESS] Docker instalado com sucesso!"
echo "[INFO] Faça logout e login novamente para usar Docker sem sudo"
'@

Write-Log "Enviando script de instalação para a VPS..."

try {
    # Enviar script para a VPS
    $dockerInstallScript | ssh -o StrictHostKeyChecking=no $Username@$VPSHost "cat > /tmp/install-docker.sh"
    
    if ($LASTEXITCODE -ne 0) {
        throw "Falha ao enviar script"
    }
    
    Write-Log "Script enviado com sucesso"
    
    # Tornar o script executável
    ssh -o StrictHostKeyChecking=no $Username@$VPSHost "chmod +x /tmp/install-docker.sh"
    
    Write-Log "Executando instalação do Docker na VPS..."
    Write-Warning-Log "Este processo pode levar alguns minutos..."
    
    # Executar o script
    ssh -o StrictHostKeyChecking=no $Username@$VPSHost "/tmp/install-docker.sh"
    
    if ($LASTEXITCODE -eq 0) {
        Write-Log "Docker instalado com sucesso na VPS!"
        
        # Verificar versões instaladas
        Write-Info-Log "Verificando versões instaladas..."
        $dockerVersion = ssh -o StrictHostKeyChecking=no $Username@$VPSHost "docker --version"
        $composeVersion = ssh -o StrictHostKeyChecking=no $Username@$VPSHost "docker compose version"
        
        Write-Info-Log "Docker: $dockerVersion"
        Write-Info-Log "Docker Compose: $composeVersion"
        
        # Limpar arquivo temporário
        ssh -o StrictHostKeyChecking=no $Username@$VPSHost "rm -f /tmp/install-docker.sh"
        
        Write-Log "Instalação concluída com sucesso!"
        Write-Warning-Log "IMPORTANTE: O usuário precisa fazer logout e login novamente para usar Docker sem sudo"
        
        Write-Info-Log "Próximos passos sugeridos:"
        Write-Info-Log "1. Instalar Coolify: curl -fsSL https://cdn.coollabs.io/coolify/install.sh | bash"
        Write-Info-Log "2. Configurar Nginx como proxy reverso"
        Write-Info-Log "3. Instalar Supabase self-hosted"
        Write-Info-Log "4. Configurar SSL/TLS com Let's Encrypt"
        
    } else {
        throw "Falha na instalação do Docker"
    }
    
} catch {
    Write-Error-Log "Erro durante a instalação: $($_.Exception.Message)"
    Write-Info-Log "Verifique os logs da VPS para mais detalhes"
    exit 1
}

Write-Log "Deploy finalizado com sucesso!"