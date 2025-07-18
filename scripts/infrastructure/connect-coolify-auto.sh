#!/bin/bash
# Script AUTOMATIZADO para conectar ao Coolify
# Executa tudo sem interação manual

set -e  # Parar se houver erro

echo "🚀 Iniciando conexão automatizada ao Coolify..."

# Configurações
COOLIFY_SERVER="194.164.72.183"
LOCAL_PORT="8000"
REMOTE_PORT="80"
USERNAME="root"
PASSWORD="26Mn1597+1709"

# Função para limpar ao sair
cleanup() {
    echo "🧹 Limpando processos..."
    if [ ! -z "$SSH_PID" ]; then
        kill $SSH_PID 2>/dev/null || true
    fi
    exit 0
}

trap cleanup INT TERM

# 1. Verificar e instalar dependências
echo "📦 Verificando dependências..."
if ! command -v sshpass &> /dev/null; then
    echo "📥 Instalando sshpass..."
    sudo apt-get update -qq
    sudo apt-get install -y sshpass
fi

if ! command -v lsof &> /dev/null; then
    echo "📥 Instalando lsof..."
    sudo apt-get install -y lsof
fi

# 2. Liberar porta se estiver em uso
echo "🔍 Verificando porta $LOCAL_PORT..."
if lsof -Pi :$LOCAL_PORT -sTCP:LISTEN -t >/dev/null 2>&1; then
    echo "⚠️  Liberando porta $LOCAL_PORT..."
    sudo fuser -k ${LOCAL_PORT}/tcp 2>/dev/null || true
    sleep 2
fi

# 3. Testar conectividade com o servidor
echo "🌐 Testando conectividade com $COOLIFY_SERVER..."
if ! ping -c 1 -W 5 $COOLIFY_SERVER >/dev/null 2>&1; then
    echo "❌ Servidor $COOLIFY_SERVER não responde ao ping"
    echo "💡 Verificando portas disponíveis..."
    nmap -p 22,80,443,8080,3000 $COOLIFY_SERVER 2>/dev/null || echo "nmap não disponível"
    echo "⚠️  Continuando mesmo assim..."
fi

# 4. Estabelecer túnel SSH
echo "🔗 Estabelecendo túnel SSH..."
echo "   Servidor: $COOLIFY_SERVER"
echo "   Porta local: $LOCAL_PORT"
echo "   Porta remota: $REMOTE_PORT"
echo "   Usuário: $USERNAME"

# Executar túnel SSH em background
sshpass -p "$PASSWORD" ssh -L ${LOCAL_PORT}:localhost:${REMOTE_PORT} \
    -N \
    -o StrictHostKeyChecking=no \
    -o UserKnownHostsFile=/dev/null \
    -o LogLevel=ERROR \
    -o ConnectTimeout=10 \
    ${USERNAME}@${COOLIFY_SERVER} &

SSH_PID=$!

# 5. Aguardar e verificar conexão
echo "⏳ Aguardando estabelecimento da conexão..."
sleep 8

if kill -0 $SSH_PID 2>/dev/null; then
    echo "✅ Túnel SSH estabelecido! PID: $SSH_PID"
    
    # 6. Testar conectividade local
    echo "🧪 Testando conectividade local..."
    sleep 2
    
    if curl -s --connect-timeout 10 http://localhost:$LOCAL_PORT >/dev/null 2>&1; then
        echo "🎉 SUCESSO! Coolify está acessível!"
        echo ""
        echo "🌐 URLs disponíveis:"
        echo "   Local: http://localhost:$LOCAL_PORT"
        echo "   Túnel ativo com PID: $SSH_PID"
        echo ""
        echo "📋 Comandos úteis:"
        echo "   Testar: curl http://localhost:$LOCAL_PORT"
        echo "   Parar: kill $SSH_PID"
        echo ""
        echo "⌨️  Pressione Ctrl+C para encerrar o túnel"
        echo "🔄 Mantendo túnel ativo..."
        
        # Manter ativo e monitorar
        while kill -0 $SSH_PID 2>/dev/null; do
            sleep 10
            echo "💓 Túnel ativo ($(date '+%H:%M:%S'))"
        done
        
        echo "⚠️  Túnel SSH foi encerrado"
    else
        echo "❌ Túnel criado mas Coolify não responde"
        echo "🔍 Possíveis causas:"
        echo "   - Coolify não está rodando na porta $REMOTE_PORT"
        echo "   - Firewall bloqueando"
        echo "   - Credenciais incorretas"
        
        # Testar outras portas
        echo "🔍 Testando outras portas..."
        for test_port in 8080 3000 443; do
            echo "   Testando $COOLIFY_SERVER:$test_port..."
            if timeout 5 bash -c "</dev/tcp/$COOLIFY_SERVER/$test_port" 2>/dev/null; then
                echo "   ✅ Porta $test_port está aberta!"
            else
                echo "   ❌ Porta $test_port fechada"
            fi
        done
        
        kill $SSH_PID 2>/dev/null
    fi
else
    echo "❌ Falha ao estabelecer túnel SSH"
    echo "🔍 Diagnóstico:"
    
    # Testar SSH manual
    echo "   Testando SSH manual..."
    timeout 10 sshpass -p "$PASSWORD" ssh -o StrictHostKeyChecking=no \
        -o ConnectTimeout=5 ${USERNAME}@${COOLIFY_SERVER} "echo 'SSH OK'" 2>/dev/null \
        && echo "   ✅ SSH funciona" || echo "   ❌ SSH falhou"
    
    echo "💡 Possíveis soluções:"
    echo "   - Verificar credenciais: $USERNAME@$COOLIFY_SERVER"
    echo "   - Testar outros usuários: coolify, ubuntu, admin"
    echo "   - Verificar se SSH está habilitado no servidor"
    echo "   - Verificar firewall/rede"
fi

echo "🔚 Script finalizado"