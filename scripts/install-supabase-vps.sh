#!/bin/bash

# Script para instalar e configurar Supabase na VPS Oracle
# VPS: 129.146.146.242
# Usuário: ubuntu
# Chave SSH: C:\Users\Micael\.ssh\oracle_new

set -e

# Configurações da VPS
VPS_IP="129.146.146.242"
SSH_KEY="C:\Users\Micael\.ssh\oracle_new"
SSH_USER="ubuntu"

echo "🚀 Instalando Supabase CLI na VPS Oracle..."
echo "📍 VPS: $VPS_IP"
echo "👤 Usuário: $SSH_USER"
echo ""

# Função para executar comandos na VPS
execute_on_vps() {
    ssh -i "$SSH_KEY" "$SSH_USER@$VPS_IP" "$1"
}

# Testar conexão SSH
echo "🔍 Testando conexão SSH..."
if execute_on_vps "echo 'Conexão SSH estabelecida'"; then
    echo "✅ Conexão SSH funcionando!"
else
    echo "❌ Falha na conexão SSH. Verifique as configurações."
    exit 1
fi

# Verificar se Node.js está instalado
echo "📦 Verificando Node.js na VPS..."
if execute_on_vps "command -v node"; then
    NODE_VERSION=$(execute_on_vps "node --version")
    echo "✅ Node.js já instalado: $NODE_VERSION"
else
    echo "❌ Node.js não encontrado. Instalando..."
    execute_on_vps "curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -"
    execute_on_vps "sudo apt-get install -y nodejs"
    echo "✅ Node.js instalado!"
fi

# Verificar se npm está instalado
echo "📦 Verificando npm na VPS..."
if execute_on_vps "command -v npm"; then
    NPM_VERSION=$(execute_on_vps "npm --version")
    echo "✅ npm já instalado: $NPM_VERSION"
else
    echo "❌ npm não encontrado. Instalando..."
    execute_on_vps "sudo apt-get install -y npm"
    echo "✅ npm instalado!"
fi

# Instalar Supabase CLI
echo "📦 Instalando Supabase CLI na VPS..."
execute_on_vps "npm install -g supabase"

# Verificar instalação
echo "🔍 Verificando instalação do Supabase CLI..."
if execute_on_vps "command -v supabase"; then
    SUPABASE_VERSION=$(execute_on_vps "supabase --version")
    echo "✅ Supabase CLI instalado com sucesso!"
    echo "📋 Versão: $SUPABASE_VERSION"
else
    echo "❌ Erro na instalação do Supabase CLI"
    exit 1
fi

# Criar diretório do projeto
echo "📁 Criando diretório do projeto na VPS..."
execute_on_vps "mkdir -p /home/ubuntu/whosfy"

# Inicializar projeto Supabase
echo "🔧 Inicializando projeto Supabase na VPS..."
if execute_on_vps "test -f /home/ubuntu/whosfy/supabase/config.toml"; then
    echo "ℹ️ Projeto Supabase já existe"
else
    execute_on_vps "cd /home/ubuntu/whosfy && supabase init"
    echo "✅ Projeto Supabase inicializado!"
fi

# Verificar Docker
echo "🐳 Verificando Docker na VPS..."
if execute_on_vps "command -v docker"; then
    DOCKER_VERSION=$(execute_on_vps "docker --version")
    echo "✅ Docker encontrado: $DOCKER_VERSION"
else
    echo "❌ Docker não encontrado. Por favor, instale o Docker primeiro."
    exit 1
fi

# Iniciar Supabase local
echo "🚀 Iniciando Supabase local na VPS..."
execute_on_vps "cd /home/ubuntu/whosfy && supabase start"

echo ""
echo "🎉 Instalação concluída com sucesso!"
echo ""
echo "📋 Próximos passos:"
echo "1. Configurar túnel SSH para acessar o Supabase Studio:"
echo "   ssh -i \"C:\\Users\\Micael\\.ssh\\oracle_new\" -L 54323:127.0.0.1:54323 -L 54321:127.0.0.1:54321 -L 54322:127.0.0.1:54322 -N ubuntu@129.146.146.242"
echo ""
echo "2. Acessar Supabase Studio no navegador:"
echo "   http://localhost:54323"
echo ""
echo "3. Comandos úteis:"
echo "   supabase status  # Ver status dos serviços"
echo "   supabase stop    # Parar serviços"
echo "   supabase start   # Iniciar serviços"
echo "   supabase logs    # Ver logs"
echo ""
echo "✅ Supabase está pronto para uso!"