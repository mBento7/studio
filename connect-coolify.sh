#!/bin/bash
# Script para conectar ao Coolify via túnel SSH
# Para uso no servidor Ubuntu

echo "🚀 Conectando ao Coolify..."

# Configurações
COOLIFY_SERVER="194.164.72.183"
LOCAL_PORT="8000"
REMOTE_PORT="80"
USERNAME="root"
PASSWORD="26Mn1597+1709"

# Função para verificar se a porta está em uso
check_port() {
    local port=$1
    if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null 2>&1; then
        return 0  # Porta em uso
    else
        return 1  # Porta livre
    fi
}

# Verificar se a porta local está disponível
if check_port $LOCAL_PORT; then
    echo "⚠️  Porta $LOCAL_PORT já está em uso. Encerrando processos..."
    
    # Encerrar processos na porta
    fuser -k ${LOCAL_PORT}/tcp 2>/dev/null
    sleep 2
fi

echo "🔗 Estabelecendo túnel SSH..."
echo "   Servidor: $COOLIFY_SERVER"
echo "   Porta local: $LOCAL_PORT"
echo "   Porta remota: $REMOTE_PORT"

# Verificar se sshpass está instalado
if ! command -v sshpass &> /dev/null; then
    echo "📦 Instalando sshpass..."
    sudo apt-get update -qq
    sudo apt-get install -y sshpass
fi

# Estabelecer túnel SSH com sshpass
echo "🔐 Conectando com senha..."

# Executar túnel SSH em background
sshpass -p "$PASSWORD" ssh -L ${LOCAL_PORT}:localhost:${REMOTE_PORT} \
    -N \
    -o StrictHostKeyChecking=no \
    -o UserKnownHostsFile=/dev/null \
    -o LogLevel=ERROR \
    ${USERNAME}@${COOLIFY_SERVER} &

SSH_PID=$!

# Aguardar estabelecimento da conexão
echo "⏳ Aguardando estabelecimento da conexão..."
sleep 5

# Verificar se o processo SSH ainda está rodando
if kill -0 $SSH_PID 2>/dev/null; then
    echo "✅ Túnel SSH estabelecido com sucesso!"
    
    # Testar conectividade local
    echo "🧪 Testando conectividade..."
    
    if curl -s --connect-timeout 10 http://localhost:$LOCAL_PORT >/dev/null 2>&1; then
        echo "✅ Coolify acessível em http://localhost:$LOCAL_PORT"
        echo ""
        echo "🎉 Coolify está rodando!"
        echo "   URL: http://localhost:$LOCAL_PORT"
        echo "   PID do túnel: $SSH_PID"
        echo ""
        echo "📋 Para acessar de outro terminal:"
        echo "   curl http://localhost:$LOCAL_PORT"
        echo ""
        echo "🛑 Para encerrar o túnel:"
        echo "   kill $SSH_PID"
        echo ""
        echo "⌨️  Pressione Ctrl+C para encerrar"
        
        # Manter o script rodando
        trap "echo '🔚 Encerrando túnel...'; kill $SSH_PID 2>/dev/null; exit 0" INT TERM
        
        # Loop para manter o script ativo
        while kill -0 $SSH_PID 2>/dev/null; do
            sleep 5
        done
        
        echo "⚠️  Túnel SSH foi encerrado"
    else
        echo "❌ Erro ao acessar Coolify"
        echo "💡 Verifique se o Coolify está rodando na porta $REMOTE_PORT do servidor"
        echo "🔍 Testando outras portas comuns..."
        
        # Testar outras portas
        for port in 8080 3000 443; do
            echo "   Testando porta $port..."
            if timeout 5 bash -c "</dev/tcp/$COOLIFY_SERVER/$port" 2>/dev/null; then
                echo "   ✅ Porta $port está aberta"
            else
                echo "   ❌ Porta $port não responde"
            fi
        done
        
        kill $SSH_PID 2>/dev/null
    fi
else
    echo "❌ Falha ao estabelecer túnel SSH"
    echo "💡 Verifique as credenciais e conectividade"
fi

echo "🔚 Script finalizado"

## Problema identificado:

Você está no servidor Ubuntu e tentou executar um script PowerShell (`.ps1`), mas precisa de um script bash (`.sh`) para Linux.

## Solução: Script bash para Ubuntu

Vou criar um script bash que funcione no servidor Ubuntu:
```bash
#!/bin/bash
# Script para conectar ao Coolify via túnel SSH
# Para uso no servidor Ubuntu

echo "🚀 Conectando ao Coolify..."

# Configurações
COOLIFY_SERVER="194.164.72.183"
LOCAL_PORT="8000"
REMOTE_PORT="80"
USERNAME="root"
PASSWORD="26Mn1597+1709"

# Função para verificar se a porta está em uso
check_port() {
    local port=$1
    if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null 2>&1; then
        return 0  # Porta em uso
    else
        return 1  # Porta livre
    fi
}

# Verificar se a porta local está disponível
if check_port $LOCAL_PORT; then
    echo "⚠️  Porta $LOCAL_PORT já está em uso. Encerrando processos..."
    
    # Encerrar processos na porta
    fuser -k ${LOCAL_PORT}/tcp 2>/dev/null
    sleep 2
fi

echo "🔗 Estabelecendo túnel SSH..."
echo "   Servidor: $COOLIFY_SERVER"
echo "   Porta local: $LOCAL_PORT"
echo "   Porta remota: $REMOTE_PORT"

# Verificar se sshpass está instalado
if ! command -v sshpass &> /dev/null; then
    echo "📦 Instalando sshpass..."
    sudo apt-get update -qq
    sudo apt-get install -y sshpass
fi

# Estabelecer túnel SSH com sshpass
echo "🔐 Conectando com senha..."

# Executar túnel SSH em background
sshpass -p "$PASSWORD" ssh -L ${LOCAL_PORT}:localhost:${REMOTE_PORT} \
    -N \
    -o StrictHostKeyChecking=no \
    -o UserKnownHostsFile=/dev/null \
    -o LogLevel=ERROR \
    ${USERNAME}@${COOLIFY_SERVER} &

SSH_PID=$!

# Aguardar estabelecimento da conexão
echo "⏳ Aguardando estabelecimento da conexão..."
sleep 5

# Verificar se o processo SSH ainda está rodando
if kill -0 $SSH_PID 2>/dev/null; then
    echo "✅ Túnel SSH estabelecido com sucesso!"
    
    # Testar conectividade local
    echo "🧪 Testando conectividade..."
    
    if curl -s --connect-timeout 10 http://localhost:$LOCAL_PORT >/dev/null 2>&1; then
        echo "✅ Coolify acessível em http://localhost:$LOCAL_PORT"
        echo ""
        echo "🎉 Coolify está rodando!"
        echo "   URL: http://localhost:$LOCAL_PORT"
        echo "   PID do túnel: $SSH_PID"
        echo ""
        echo "📋 Para acessar de outro terminal:"
        echo "   curl http://localhost:$LOCAL_PORT"
        echo ""
        echo "🛑 Para encerrar o túnel:"
        echo "   kill $SSH_PID"
        echo ""
        echo "⌨️  Pressione Ctrl+C para encerrar"
        
        # Manter o script rodando
        trap "echo '🔚 Encerrando túnel...'; kill $SSH_PID 2>/dev/null; exit 0" INT TERM
        
        # Loop para manter o script ativo
        while kill -0 $SSH_PID 2>/dev/null; do
            sleep 5
        done
        
        echo "⚠️  Túnel SSH foi encerrado"
    else
        echo "❌ Erro ao acessar Coolify"
        echo "💡 Verifique se o Coolify está rodando na porta $REMOTE_PORT do servidor"
        echo "🔍 Testando outras portas comuns..."
        
        # Testar outras portas
        for port in 8080 3000 443; do
            echo "   Testando porta $port..."
            if timeout 5 bash -c "</dev/tcp/$COOLIFY_SERVER/$port" 2>/dev/null; then
                echo "   ✅ Porta $port está aberta"
            else
                echo "   ❌ Porta $port não responde"
            fi
        done
        
        kill $SSH_PID 2>/dev/null
    fi
else
    echo "❌ Falha ao estabelecer túnel SSH"
    echo "💡 Verifique as credenciais e conectividade"
fi

echo "🔚 Script finalizado"