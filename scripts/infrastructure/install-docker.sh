#!/bin/bash

# Script de Instalação Automatizada do Docker e Docker Compose
# Para Ubuntu 22.04 LTS
# Autor: Assistente AI
# Data: $(date +%Y-%m-%d)

set -e  # Parar execução em caso de erro

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Função para log
log() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')] $1${NC}"
}

warn() {
    echo -e "${YELLOW}[$(date +'%Y-%m-%d %H:%M:%S')] WARNING: $1${NC}"
}

error() {
    echo -e "${RED}[$(date +'%Y-%m-%d %H:%M:%S')] ERROR: $1${NC}"
    exit 1
}

info() {
    echo -e "${BLUE}[$(date +'%Y-%m-%d %H:%M:%S')] INFO: $1${NC}"
}

# Verificar se é Ubuntu
if [[ ! -f /etc/os-release ]] || ! grep -q "Ubuntu" /etc/os-release; then
    error "Este script é destinado apenas para Ubuntu."
fi

# Verificar se tem privilégios sudo
if ! sudo -n true 2>/dev/null; then
    error "Este script requer privilégios sudo."
fi

log "Iniciando instalação do Docker e Docker Compose..."

# Passo 1: Atualizar sistema
log "Atualizando sistema..."
sudo apt update && sudo apt upgrade -y

# Passo 2: Instalar dependências
log "Instalando dependências..."
sudo apt install -y \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg \
    lsb-release \
    software-properties-common

# Passo 3: Remover versões antigas do Docker (se existirem)
log "Removendo versões antigas do Docker..."
sudo apt remove -y docker docker-engine docker.io containerd runc 2>/dev/null || true

# Passo 4: Adicionar chave GPG do Docker
log "Adicionando chave GPG do Docker..."
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# Passo 5: Adicionar repositório do Docker
log "Adicionando repositório do Docker..."
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Passo 6: Atualizar lista de pacotes
log "Atualizando lista de pacotes..."
sudo apt update

# Passo 7: Instalar Docker Engine
log "Instalando Docker Engine..."
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin

# Passo 8: Iniciar e habilitar Docker
log "Iniciando e habilitando Docker..."
sudo systemctl start docker
sudo systemctl enable docker

# Passo 9: Instalar Docker Compose Plugin
log "Instalando Docker Compose Plugin..."
sudo apt install -y docker-compose-plugin

# Passo 10: Adicionar usuário atual ao grupo docker
log "Adicionando usuário $USER ao grupo docker..."
sudo usermod -aG docker $USER

# Passo 11: Configurar Docker daemon
log "Configurando Docker daemon..."
sudo mkdir -p /etc/docker
sudo tee /etc/docker/daemon.json > /dev/null << EOF
{
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "10m",
    "max-file": "3"
  },
  "live-restore": true,
  "storage-driver": "overlay2"
}
EOF

# Passo 12: Reiniciar Docker
log "Reiniciando Docker..."
sudo systemctl restart docker

# Passo 13: Configurar firewall básico
log "Configurando firewall básico..."
sudo ufw allow ssh
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw --force enable

# Passo 14: Verificar instalação
log "Verificando instalação..."

# Verificar Docker
if docker --version > /dev/null 2>&1; then
    info "Docker instalado com sucesso: $(docker --version)"
else
    error "Falha na instalação do Docker"
fi

# Verificar Docker Compose
if docker compose version > /dev/null 2>&1; then
    info "Docker Compose instalado com sucesso: $(docker compose version)"
else
    error "Falha na instalação do Docker Compose"
fi

# Verificar se Docker está rodando
if sudo systemctl is-active --quiet docker; then
    info "Docker está rodando"
else
    error "Docker não está rodando"
fi

# Passo 15: Teste básico
log "Executando teste básico..."
if sudo docker run --rm hello-world > /dev/null 2>&1; then
    info "Teste do Docker executado com sucesso"
else
    warn "Teste do Docker falhou, mas a instalação pode estar correta"
fi

# Passo 16: Criar arquivo de teste do Docker Compose
log "Testando Docker Compose..."
cat > /tmp/docker-compose-test.yml << EOF
version: '3.8'
services:
  test:
    image: alpine:latest
    command: echo "Docker Compose está funcionando!"
EOF

if sudo docker compose -f /tmp/docker-compose-test.yml up > /dev/null 2>&1; then
    info "Teste do Docker Compose executado com sucesso"
else
    warn "Teste do Docker Compose falhou, mas a instalação pode estar correta"
fi

# Limpar arquivo de teste
rm -f /tmp/docker-compose-test.yml

# Informações finais
log "Instalação concluída com sucesso!"
info "Versões instaladas:"
info "  - $(docker --version)"
info "  - $(docker compose version)"
info ""
warn "IMPORTANTE: Faça logout e login novamente para usar Docker sem sudo"
warn "Ou execute: newgrp docker"
info ""
info "Para verificar o status do Docker: sudo systemctl status docker"
info "Para ver logs do Docker: sudo journalctl -u docker.service"
info "Para testar sem sudo (após relogin): docker run hello-world"
info ""
log "Próximos passos sugeridos:"
info "1. Instalar Coolify para gerenciamento de aplicações"
info "2. Configurar Nginx como proxy reverso"
info "3. Instalar Supabase self-hosted"
info "4. Configurar SSL/TLS com Let's Encrypt"

log "Script de instalação finalizado!"